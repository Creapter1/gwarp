(() => {
'use strict';

/**
 * speed-collision-C: Safest collision cache + per-frame budget.
 * After MAX_CHECKS_PER_FRAME full pixel checks, returns false.
 */
const MAX_CHECKS_PER_FRAME = 50;
let checksThisFrame = 0;
let currentFrame = -1;
const CACHE = new Map();

function frameKey() {
  return (window.vm && window.vm.runtime && window.vm.runtime.frame) || 0;
}

function resetIfNewFrame() {
  const f = frameKey();
  if (f !== currentFrame) {
    currentFrame = f;
    checksThisFrame = 0;
    CACHE.clear();
  }
}

const renderer = window.vm?.runtime?.renderer;

if (renderer) {
  const origTouchDrawables = renderer.isTouchingDrawables;
  const origTouchColor = renderer.isTouchingColor;

  if (origTouchDrawables) {
    renderer.isTouchingDrawables = function (drawableID, candidateIDs) {
      resetIfNewFrame();
      const key = 'd:' + drawableID + ':' + (candidateIDs || []).join(',');
      if (CACHE.has(key)) return CACHE.get(key);
      if (checksThisFrame >= MAX_CHECKS_PER_FRAME) {
        return false;
      }
      let result;
      try {
        result = origTouchDrawables.call(this, drawableID, candidateIDs);
      } catch (e) {
        result = false;
      }
      checksThisFrame++;
      CACHE.set(key, result);
      return result;
    };
  }

  if (origTouchColor) {
    renderer.isTouchingColor = function (drawableID, color3b, mask3b) {
      resetIfNewFrame();
      const key = 'c:' + drawableID + ':' + (color3b || []).join(',') + ':' + (mask3b || []).join(',');
      if (CACHE.has(key)) return CACHE.get(key);
      if (checksThisFrame >= MAX_CHECKS_PER_FRAME) {
        return false;
      }
      let result;
      try {
        result = origTouchColor.call(this, drawableID, color3b, mask3b);
      } catch (e) {
        result = false;
      }
      checksThisFrame++;
      CACHE.set(key, result);
      return result;
    };
  }
}
})();
