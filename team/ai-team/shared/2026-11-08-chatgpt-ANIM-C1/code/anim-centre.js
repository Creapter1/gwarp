(function (root, factory) {
  "use strict";
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.GW_ANIM_CENTRE_TOOLS = api;
})(typeof globalThis === "object" ? globalThis : this, function () {
  "use strict";

  // Normalize viewBox origin and raster resolution before calling: every point and bound
  // must share G-Warp costume-local logical units. Do not add Scratch SVG-origin offsets;
  // the existing SB3 serializer owns that conversion.
  function number(value, label) {
    if (typeof value !== "number" || !Number.isFinite(value)) {
      throw new TypeError(label + " must be a finite number");
    }
    return value;
  }

  function point(value, label) {
    if (!value || typeof value !== "object") throw new TypeError(label + " is required");
    return {
      x: number(value.x, label + ".x"),
      y: number(value.y, label + ".y")
    };
  }

  function bounds(value) {
    if (!value || typeof value !== "object") throw new TypeError("bounds are required");
    var left = value.left !== undefined ? value.left : value.x0 !== undefined ? value.x0 : value.x;
    var top = value.top !== undefined ? value.top : value.y0 !== undefined ? value.y0 : value.y;
    var right = value.right !== undefined ? value.right : value.x1 !== undefined ? value.x1 :
      (value.x !== undefined && value.width !== undefined ? value.x + value.width : undefined);
    var bottom = value.bottom !== undefined ? value.bottom : value.y1 !== undefined ? value.y1 :
      (value.y !== undefined && value.height !== undefined ? value.y + value.height : undefined);
    left = number(left, "bounds.left");
    top = number(top, "bounds.top");
    right = number(right, "bounds.right");
    bottom = number(bottom, "bounds.bottom");
    if (right < left || bottom < top) throw new RangeError("bounds must not be inverted");
    return { left: left, top: top, right: right, bottom: bottom };
  }

  function centreOfBounds(value) {
    var b = bounds(value);
    return { x: (b.left + b.right) / 2, y: (b.top + b.bottom) / 2 };
  }

  function rotationCentreFromPoint(value) {
    return point(value, "rotationCentre");
  }

  // Return a geometry change for the adapter to apply to every art layer.
  // The current rotation centre stays fixed; this function never edits a costume.
  function translationToCentre(value, rotationCentre, options) {
    var b = bounds(value);
    var target = point(rotationCentre, "rotationCentre");
    var centre = centreOfBounds(b);
    var alignFeet = !!options && Object.prototype.hasOwnProperty.call(options, "feetLineY");
    var feetLineY = alignFeet ? number(options.feetLineY, "feetLineY") : null;
    var dx = target.x - centre.x;
    var dy = alignFeet ? feetLineY - b.bottom : target.y - centre.y;
    return {
      dx: dx,
      dy: dy,
      mode: alignFeet ? "feet-line" : "bounds-centre",
      before: b,
      after: {
        left: b.left + dx,
        top: b.top + dy,
        right: b.right + dx,
        bottom: b.bottom + dy
      }
    };
  }

  function selectGeneratedFrames(costumes, animationId, expectedFrameCount) {
    if (!Array.isArray(costumes)) throw new TypeError("costumes must be an array");
    if (animationId == null || animationId === "") throw new TypeError("animationId is required");
    if (expectedFrameCount !== undefined &&
        (!Number.isInteger(expectedFrameCount) || expectedFrameCount < 1)) {
      throw new RangeError("expectedFrameCount must be a positive integer");
    }
    var selected = costumes.map(function (costume, order) {
      var meta = costume && costume.gwAnimFrame;
      return { costume: costume, order: order, frame: meta && meta.frame, anim: meta && meta.anim };
    }).filter(function (entry) {
      return entry.anim === animationId;
    });
    selected.forEach(function (entry) {
      if (!Number.isInteger(entry.frame) || entry.frame < 0) {
        throw new RangeError("generated frame metadata contains an invalid index");
      }
    });
    selected.sort(function (a, b) {
      return a.frame - b.frame || a.order - b.order;
    });
    var seen = new Set();
    selected.forEach(function (entry) {
      if (seen.has(entry.frame)) throw new RangeError("generated frame metadata contains a duplicate index");
      seen.add(entry.frame);
    });
    if (expectedFrameCount !== undefined) {
      for (var i = 0; i < expectedFrameCount; i++) {
        if (!seen.has(i)) throw new RangeError("generated frame group is incomplete");
      }
      if (selected.some(function (entry) { return entry.frame >= expectedFrameCount; })) {
        throw new RangeError("generated frame group contains an out-of-range index");
      }
    }
    return selected.map(function (entry) { return entry.costume; });
  }

  function rootPointFromSolved(solved, rootBoneId) {
    var bone = solved && typeof solved.get === "function" ? solved.get(rootBoneId) : solved && solved[rootBoneId];
    if (!bone) throw new TypeError("the solved root bone is missing");
    return { x: number(bone.jx, "root.jx"), y: number(bone.jy, "root.jy") };
  }

  // The adapter applies these assignments to rotation-centre metadata only.
  // Art and pose data are intentionally not translated.
  function sharedCentreAssignments(frames, firstRoot) {
    if (!Array.isArray(frames)) throw new TypeError("frames must be an array");
    var centre = point(firstRoot, "firstRoot");
    return frames.map(function (frame, index) {
      return { frame: frame, index: index, centre: { x: centre.x, y: centre.y } };
    });
  }

  function detectBodyDrift(frames, options) {
    if (!Array.isArray(frames) || frames.length < 2) return [];
    options = options || {};
    var threshold = options.thresholdPx === undefined ? 2 : number(options.thresholdPx, "thresholdPx");
    var rootTolerance = options.rootTolerancePx === undefined ? 0.5 : number(options.rootTolerancePx, "rootTolerancePx");
    if (threshold < 0 || rootTolerance < 0) throw new RangeError("drift tolerances must be non-negative");

    var firstRoot = point(frames[0].root, "frames[0].root");
    var firstBody = centreOfBounds(frames[0].bodyBounds);
    var firstOffset = { x: firstBody.x - firstRoot.x, y: firstBody.y - firstRoot.y };
    var warnings = [];

    frames.slice(1).forEach(function (frame, offset) {
      var index = offset + 1;
      var root = point(frame.root, "frames[" + index + "].root");
      if (Math.hypot(root.x - firstRoot.x, root.y - firstRoot.y) > rootTolerance) return;
      var body = centreOfBounds(frame.bodyBounds);
      var dx = (body.x - root.x) - firstOffset.x;
      var dy = (body.y - root.y) - firstOffset.y;
      var driftPx = Math.hypot(dx, dy);
      if (driftPx > threshold) {
        warnings.push({
          index: index,
          frameNumber: Number.isInteger(frame.frameNumber) ? frame.frameNumber : index + 1,
          dx: dx,
          dy: dy,
          driftPx: driftPx
        });
      }
    });
    return warnings;
  }

  function validateMadeFrames(outputs, tolerancePx) {
    if (!Array.isArray(outputs) || outputs.length === 0) {
      return { ok: false, reference: null, violations: ["no generated frames"] };
    }
    var tolerance = tolerancePx === undefined ? 1 : number(tolerancePx, "tolerancePx");
    if (tolerance < 0 || tolerance > 1) throw new RangeError("tolerancePx must be between 0 and 1");
    function dimensions(item, index) {
      var width = item && (item.canvasWidth !== undefined ? item.canvasWidth : item.width);
      var height = item && (item.canvasHeight !== undefined ? item.canvasHeight : item.height);
      width = number(width, "frames[" + index + "].width");
      height = number(height, "frames[" + index + "].height");
      if (width <= 0 || height <= 0) throw new RangeError("canvas dimensions must be positive");
      return { width: width, height: height };
    }
    function centre(item, index) {
      return point(item && (item.rotationCentre || item.centre || item.rc),
        "frames[" + index + "].rotationCentre");
    }

    var refSize = dimensions(outputs[0], 0);
    var refCentre = centre(outputs[0], 0);
    var violations = [];
    outputs.slice(1).forEach(function (item, offset) {
      var index = offset + 1;
      var size = dimensions(item, index);
      var c = centre(item, index);
      if (size.width !== refSize.width || size.height !== refSize.height) {
        violations.push({ index: index, kind: "canvas-size", width: size.width, height: size.height });
      }
      if (Math.hypot(c.x - refCentre.x, c.y - refCentre.y) > tolerance) {
        violations.push({ index: index, kind: "rotation-centre", x: c.x, y: c.y });
      }
    });
    return {
      ok: violations.length === 0,
      reference: { width: refSize.width, height: refSize.height, rotationCentre: refCentre },
      violations: violations
    };
  }

  return {
    bounds: bounds,
    centreOfBounds: centreOfBounds,
    rotationCentreFromPoint: rotationCentreFromPoint,
    translationToCentre: translationToCentre,
    selectGeneratedFrames: selectGeneratedFrames,
    rootPointFromSolved: rootPointFromSolved,
    sharedCentreAssignments: sharedCentreAssignments,
    detectBodyDrift: detectBodyDrift,
    validateMadeFrames: validateMadeFrames
  };
});