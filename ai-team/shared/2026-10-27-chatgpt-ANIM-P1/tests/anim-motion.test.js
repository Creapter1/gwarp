/* ANIM-P1 isolated helper tests
 * Run from this folder with: node tests/anim-motion.test.js
 * These tests cover the data helper only, not G-Warp's editor/runtime integration.
 */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

global.window = {};
require('../code/anim-motion.js');
const M = global.window.GW_ANIM_MOTION;
const poseLibrary = JSON.parse(fs.readFileSync(path.join(__dirname, '../code/poses.json'), 'utf8'));

const tests = [];
function test(name, fn) {
  tests.push({ name, fn });
}
function close(actual, expected, epsilon = 1e-8) {
  assert.ok(Math.abs(actual - expected) <= epsilon, `expected ${actual} to be within ${epsilon} of ${expected}`);
}

test('API version and curve list', () => {
  assert.equal(M.version, 2);
  assert.deepEqual([...M.curves], ['linear', 'ease', 'bounce', 'snap']);
});
test('legacy frames use Ease without writing curve metadata', () => {
  const frame = {};
  assert.equal(M.curveFor(frame), 'ease');
  M.normalizeFrame(frame);
  assert.equal(Object.hasOwn(frame, 'easeToNext'), false);
});
test('all curves start at zero and end at one', () => {
  for (const curve of M.curves) {
    assert.equal(M.easeValue(curve, 0), 0);
    assert.equal(M.easeValue(curve, 1), 1);
  }
});
test('Linear, Ease and Snap are monotonic', () => {
  for (const curve of ['linear', 'ease', 'snap']) {
    let previous = -1;
    for (let i = 0; i <= 100; i++) {
      const value = M.easeValue(curve, i / 100);
      assert.ok(value >= previous);
      previous = value;
    }
  }
});
test('Bounce values remain bounded', () => {
  for (let i = 0; i <= 100; i++) {
    const value = M.easeValue('bounce', i / 100);
    assert.ok(value >= 0 && value <= 1);
  }
});
test('angle interpolation uses the shortest route', () => {
  const anim = { bones: [{ id: 0, angle: 0, parent: null }] };
  const result = M.interpolateFrame(anim, { angles: { 0: 350 } }, { angles: { 0: 10 } }, 0.5, 'linear');
  close(result.angles[0], 0);
});
test('root position and stretch interpolate', () => {
  const anim = { bones: [{ id: 'root', angle: 0, parent: null, x: 0, y: 0 }] };
  const result = M.interpolateFrame(
    anim,
    { roots: { root: { x: 0, y: 10 } }, stretch: { root: 0.8 } },
    { roots: { root: { x: 20, y: 30 } }, stretch: { root: 1.2 } },
    0.5,
    'linear'
  );
  assert.deepEqual(result.roots.root, { x: 10, y: 20 });
  assert.equal(result.stretch.root, 1);
});
test('hold values clamp to one through four', () => {
  const frame = {};
  assert.equal(M.setHold(frame, 10), 4);
  assert.equal(M.setHold(frame, 0), 1);
});
test('intermediate holds consume the exact number of ticks', () => {
  const frames = [{ hold: 3 }, { hold: 1 }];
  const clock = M.makePlaybackClock(0, frames);
  assert.equal(M.advancePlaybackClock(clock, frames, false), 0);
  assert.equal(M.advancePlaybackClock(clock, frames, false), 0);
  assert.equal(M.advancePlaybackClock(clock, frames, false), 1);
});
test('non-loop playback completes after the last held frame', () => {
  const frames = [{ hold: 1 }, { hold: 2 }];
  const clock = M.makePlaybackClock(0, frames);
  M.advancePlaybackClock(clock, frames, false);
  assert.equal(clock.frame, 1);
  assert.equal(clock.done, false);
  M.advancePlaybackClock(clock, frames, false);
  assert.equal(clock.done, false);
  assert.equal(M.advancePlaybackClock(clock, frames, false), 1);
  assert.equal(clock.done, true);
});
test('looping playback wraps without setting done', () => {
  const frames = [{ hold: 1 }, { hold: 1 }];
  const clock = M.makePlaybackClock(0, frames);
  M.advancePlaybackClock(clock, frames, true);
  assert.equal(M.advancePlaybackClock(clock, frames, true), 0);
  assert.equal(clock.done, false);
});
test('reset clears the completion flag', () => {
  const frames = [{ hold: 1 }, { hold: 1 }];
  const clock = { frame: 1, remaining: 0, done: true };
  M.resetPlaybackClock(clock, frames, 0);
  assert.equal(clock.frame, 0);
  assert.equal(clock.remaining, 0);
  assert.equal(clock.done, false);
});
test('Make costumes plan repeats holds with sequential names', () => {
  const plan = M.makeCostumePlan({ name: 'walk', frames: [{ hold: 2 }, { hold: 3 }] });
  assert.equal(plan.count, 5);
  assert.equal(plan.entries[4].costumeName, 'walk//frame 5');
  assert.equal(plan.entries[4].sourceFrame, 1);
});
test('960 generated costumes request confirmation without exceeding hard limit', () => {
  const plan = M.expandHeldFrames(Array.from({ length: 240 }, () => ({ hold: 4 })));
  assert.equal(plan.count, 960);
  assert.equal(plan.requiresLargeResultConfirmation, true);
  assert.equal(plan.exceedsHardLimit, false);
});
test('stretch clamps while preserving the rest-pose bone length', () => {
  const frame = {};
  const bone = { id: 0, len: 20 };
  M.setStretch(frame, 0, 2);
  assert.equal(M.getStretch(frame, 0), 1.4);
  assert.equal(M.effectiveBoneLength(bone, frame), 28);
  assert.equal(bone.len, 20);
});
test('follow-through supports parent ID zero without mutating keyframes', () => {
  const anim = {
    loop: false,
    bones: [
      { id: 0, parent: null, angle: 0 },
      { id: 1, parent: 0, angle: 0, followThrough: { enabled: true, delay: 1, amount: 0.5 } }
    ],
    frames: [
      { angles: { 0: 0, 1: 0 } },
      { angles: { 0: 40, 1: 0 } },
      { angles: { 0: 80, 1: 0 } }
    ]
  };
  const before = JSON.stringify(anim.frames);
  close(M.resolveFollowThrough(anim, 2).angles[1], 20);
  assert.equal(JSON.stringify(anim.frames), before);
});
test('root bones cannot enable follow-through', () => {
  const bone = { id: 0, parent: null };
  assert.equal(M.setFollowThrough(bone, { enabled: true }), false);
  assert.equal(bone.followThrough.enabled, false);
});
test('mirror reflects paired limbs and root position with ID zero', () => {
  const anim = {
    bones: [
      { id: 0, name: 'body', angle: 0, parent: null },
      { id: 1, name: 'left arm', angle: 0, parent: 0 },
      { id: 2, name: 'right arm', angle: 0, parent: 0 }
    ]
  };
  const result = M.mirrorFrame(anim, {
    roots: { 0: { x: 12, y: 7 } },
    angles: { 0: 10, 1: 30, 2: -20 }
  }, 0);
  close(result.frame.angles[0], -10);
  close(result.frame.angles[2], -30);
  close(result.frame.roots[0].x, -12);
});
test('missing mirror partner is reported', () => {
  const anim = { bones: [{ id: 0, name: 'left arm', parent: null }] };
  const result = M.mirrorFrame(anim, { angles: { 0: 10 } });
  assert.ok(result.skipped.includes('right_arm'));
});
test('copy and paste map by bone names across different IDs and preserve target timing', () => {
  const source = {
    bones: [
      { id: 'bodyA', name: 'body', angle: 10, parent: null, x: 0, y: 0 },
      { id: 'armA', name: 'left_arm', angle: 0, parent: 'bodyA' }
    ]
  };
  const clipboard = M.copyPose(source, {
    angles: { bodyA: 25, armA: 45 },
    roots: { bodyA: { x: 5, y: 2 } },
    stretch: { armA: 1.2 }
  });
  const target = {
    bones: [
      { id: 0, name: 'body', angle: 100, parent: null, x: 10, y: 10 },
      { id: 2, name: 'left_arm', angle: 10, parent: 0 }
    ]
  };
  const pasted = M.pastePose(target, { hold: 3, easeToNext: 'snap', angles: {}, roots: {} }, clipboard);
  assert.equal(pasted.frame.angles[0], 115);
  assert.equal(pasted.frame.angles[2], 55);
  assert.equal(pasted.frame.hold, 3);
  assert.equal(pasted.frame.easeToNext, 'snap');
  assert.equal(pasted.frame.stretch[2], 1.2);
  assert.equal(pasted.frame.roots[0].x, 15);
});
test('duplicate bone names are skipped rather than guessed', () => {
  const anim = { bones: [{ id: 1, name: 'left_arm' }, { id: 2, name: 'left arm' }] };
  const result = M.pastePose(anim, { angles: {}, roots: {} }, { anglesByName: { left_arm: 20 } });
  assert.equal(result.skipped, 1);
  assert.equal(result.angles, 0);
});
test('pose-library data has the expected clip groups and lengths', () => {
  const clips = new Map(poseLibrary.clips.map(clip => [clip.id, clip]));
  for (const id of ['idle-breath', 'walk-cycle', 'run-cycle', 'jump', 'punch', 'kick', 'wave', 'hurt', 'win']) {
    assert.ok(clips.has(id), `missing pose clip: ${id}`);
  }
  assert.equal(clips.get('walk-cycle').frames.length, 8);
  assert.equal(clips.get('run-cycle').frames.length, 6);
  assert.equal(clips.get('jump').frames.length, 6);
});
test('pose-library application maps names and reports missing bones', () => {
  const anim = { bones: [{ id: 0, name: 'body', angle: 10, parent: null }] };
  const result = M.applyLibraryPose(anim, { angles: {}, roots: {} }, { anglesByName: { body: 15, head: 10 } });
  assert.equal(result.frame.angles[0], 25);
  assert.equal(result.applied, 1);
  assert.equal(result.skipped, 1);
});

let failures = 0;
for (const item of tests) {
  try {
    item.fn();
    process.stdout.write('PASS ' + item.name + '\n');
  } catch (error) {
    failures++;
    process.stderr.write('FAIL ' + item.name + ': ' + error.message + '\n');
  }
}
process.stdout.write(`\nANIM-P1 helper tests: ${tests.length - failures}/${tests.length} PASS\n`);
if (failures) process.exitCode = 1;
