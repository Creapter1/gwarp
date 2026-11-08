"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const tools = require("../code/anim-centre.js");

test("centre translation moves bounds to the fixed rotation centre", function () {
  const result = tools.translationToCentre(
    { left: 10, top: 20, right: 30, bottom: 60 },
    { x: 50, y: 100 }
  );
  assert.deepEqual({ x: result.dx, y: result.dy }, { x: 30, y: 60 });
  assert.deepEqual(result.after, { left: 40, top: 80, right: 60, bottom: 120 });
  assert.equal(result.mode, "bounds-centre");
});

test("click centre coordinates are cloned and validated in costume-local units", function () {
  const click = { x: 12.5, y: 6 };
  const centre = tools.rotationCentreFromPoint(click);
  click.x = 99;
  assert.deepEqual(centre, { x: 12.5, y: 6 });
  assert.throws(function () {
    tools.rotationCentreFromPoint({ x: NaN, y: 0 });
  }, TypeError);
});

test("feet-line option keeps horizontal centering and aligns the bottom", function () {
  const result = tools.translationToCentre(
    { x: 10, y: 20, width: 20, height: 40 },
    { x: 20, y: 40 },
    { feetLineY: 100 }
  );
  assert.deepEqual({ x: result.dx, y: result.dy }, { x: 0, y: 40 });
  assert.equal(result.after.bottom, 100);
  assert.equal(result.mode, "feet-line");
  assert.throws(function () {
    tools.translationToCentre(
      { left: 0, top: 0, right: 10, bottom: 10 },
      { x: 5, y: 5 },
      { feetLineY: "10" }
    );
  }, TypeError);
});

test("generated frames are selected by metadata and sorted by frame index", function () {
  const frame2 = { name: "walk//frame 2", gwAnimFrame: { anim: "a1", frame: 1 } };
  const other = { name: "walk//frame 1", gwAnimFrame: { anim: "other", frame: 0 } };
  const frame1 = { name: "renamed", gwAnimFrame: { anim: "a1", frame: 0 } };
  assert.deepEqual(tools.selectGeneratedFrames([frame2, other, frame1], "a1", 2), [frame1, frame2]);
  assert.deepEqual(tools.selectGeneratedFrames([frame1], "missing"), []);
  assert.throws(function () {
    tools.selectGeneratedFrames([frame1, frame2], "a1", 3);
  }, RangeError);
  assert.throws(function () {
    tools.selectGeneratedFrames([
      frame1,
      { name: "duplicate", gwAnimFrame: { anim: "a1", frame: 0 } }
    ], "a1", 2);
  }, RangeError);
  assert.throws(function () {
    tools.selectGeneratedFrames([
      frame1,
      { name: "fractional", gwAnimFrame: { anim: "a1", frame: 1.5 } }
    ], "a1", 2);
  }, RangeError);
  assert.throws(function () {
    tools.selectGeneratedFrames([
      frame1,
      { name: "negative", gwAnimFrame: { anim: "a1", frame: -1 } }
    ], "a1", 2);
  }, RangeError);
});

test("all frame-centre assignments use frame one's root without mutating frames", function () {
  const first = { art: "first", rc: { x: 3, y: 4 } };
  const second = { art: "second", rc: { x: 8, y: 9 } };
  const result = tools.sharedCentreAssignments([first, second], { x: 12.5, y: 6 });
  assert.deepEqual(result.map(function (entry) { return entry.centre; }), [
    { x: 12.5, y: 6 }, { x: 12.5, y: 6 }
  ]);
  assert.deepEqual(first.rc, { x: 3, y: 4 });
  assert.deepEqual(second.rc, { x: 8, y: 9 });
});

test("root point reads the orange-base joint from a solved bone", function () {
  const solved = new Map([["body", { jx: 6, jy: 7, ex: 8, ey: 9 }]]);
  assert.deepEqual(tools.rootPointFromSolved(solved, "body"), { x: 6, y: 7 });
});

test("body drift warns above 2 px only while the root stays in place", function () {
  const frames = [
    { root: { x: 0, y: 0 }, bodyBounds: { left: 10, top: 10, right: 30, bottom: 30 } },
    { root: { x: 0, y: 0 }, bodyBounds: { left: 13, top: 10, right: 33, bottom: 30 } },
    { root: { x: 0, y: 0 }, bodyBounds: { left: 12, top: 10, right: 32, bottom: 30 } },
    { root: { x: 5, y: 0 }, bodyBounds: { left: 18, top: 10, right: 38, bottom: 30 } }
  ];
  const warnings = tools.detectBodyDrift(frames);
  assert.equal(warnings.length, 1);
  assert.equal(warnings[0].frameNumber, 2);
  assert.equal(warnings[0].driftPx, 3);
});

test("made-frame invariant requires exact canvas size and centre tolerance <=1 px", function () {
  const good = tools.validateMadeFrames([
    { width: 40, height: 50, rc: { x: 10, y: 20 } },
    { width: 40, height: 50, rc: { x: 11, y: 20 } }
  ]);
  assert.equal(good.ok, true);
  const sizeMismatch = tools.validateMadeFrames([
    { width: 40, height: 50, rc: { x: 10, y: 20 } },
    { width: 41, height: 50, rc: { x: 10, y: 20 } }
  ]);
  assert.equal(sizeMismatch.ok, false);
  assert.deepEqual(sizeMismatch.violations.map(function (v) { return v.kind; }), ["canvas-size"]);
  const bad = tools.validateMadeFrames([
    { width: 40, height: 50, rc: { x: 10, y: 20 } },
    { width: 42, height: 50, rc: { x: 13, y: 20 } }
  ]);
  assert.equal(bad.ok, false);
  assert.deepEqual(bad.violations.map(function (v) { return v.kind; }), ["canvas-size", "rotation-centre"]);
  const diagonal = tools.validateMadeFrames([
    { width: 40, height: 50, rc: { x: 10, y: 20 } },
    { width: 40, height: 50, rc: { x: 11, y: 21 } }
  ]);
  assert.equal(diagonal.ok, false);
  assert.deepEqual(diagonal.violations.map(function (v) { return v.kind; }), ["rotation-centre"]);
  assert.throws(function () {
    tools.validateMadeFrames([{ width: 0, height: 0, rc: { x: 0, y: 0 } }]);
  }, RangeError);
  assert.throws(function () {
    tools.validateMadeFrames([
      { width: 40, height: 50, rc: { x: 10, y: 20 } },
      { width: 40, height: 50, rc: { x: 10.5, y: 20 } }
    ], 1.01);
  }, RangeError);
});

test("invalid bounds fail instead of silently normalizing bad geometry", function () {
  assert.throws(function () {
    tools.centreOfBounds({ left: 10, top: 0, right: 5, bottom: 10 });
  }, RangeError);
});
