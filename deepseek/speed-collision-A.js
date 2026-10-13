(() => {
'use strict';

/**
 * speed-collision-A: Simplest collision cache.
 * Caches isTouchingDrawables / isTouchingColor for ONE frame.
 * UNSURE: window.vm.runtime.frame may not exist in G-Warp.
 */
const CACHE = new Map();
let currentFrame = 0;

function getFrame() {
  return (window.vm && window.vm.runtime && window.vm.runtime.frame) || currentFrame;
}

function key(a, b) {
  return a + '|' + b;
}

const originalIsTouchingDrawables = window.vm?.runtime?.renderer?.isTouchingDrawables?.bind(window.vm.runtime.renderer);
const originalIsTouchingColor = window.vm?.runtime?.renderer?.isTouchingColor?.bind(window.vm.runtime.renderer);

if (originalIsTouchingDrawables) {
  window.vm.runtime.renderer.isTouchingDrawables = function (drawableID, candidateIDs) {
    const frame = getFrame();
    if (frame !== currentFrame) {
      currentFrame = frame;
      CACHE.clear();
    }
    const k = key(drawableID, (candidateIDs || []).join(','));
    if (CACHE.has(k)) return CACHE.get(k);
    const result = originalIsTouchingDrawables(drawableID, candidateIDs);
    CACHE.set(k, result);
    return result;
  };
}

if (originalIsTouchingColor) {
  window.vm.runtime.renderer.isTouchingColor = function (drawableID, color3b, mask3b) {
    const frame = getFrame();
    if (frame !== currentFrame) {
      currentFrame = frame;
      CACHE.clear();
    }
    const k = key(drawableID, (color3b || []).join(',') + '|' + (mask3b || []).join(','));
    if (CACHE.has(k)) return CACHE.get(k);
    const result = originalIsTouchingColor(drawableID, color3b, mask3b);
    CACHE.set(k, result);
    return result;
  };
}
})();
