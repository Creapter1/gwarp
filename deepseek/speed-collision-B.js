(() => {
'use strict';

/**
 * speed-collision-B: Bounding-box early-out before pixel collision.
 * UNSURE: _getBoundingBox / _drawables names in G-Warp renderer.
 */
let currentFrame = 0;

function getFrame() {
  return (window.vm && window.vm.runtime && window.vm.runtime.frame) || 0;
}

const renderer = window.vm?.runtime?.renderer;

if (renderer && renderer.isTouchingDrawables) {
  const original = renderer.isTouchingDrawables.bind(renderer);
  renderer.isTouchingDrawables = function (drawableID, candidateIDs) {
    const frame = getFrame();
    if (frame !== currentFrame) currentFrame = frame;

    try {
      const drawable = renderer._drawables && renderer._drawables[drawableID];
      if (!drawable || !drawable._visible) return false;
      if (typeof drawable._getBoundingBox !== 'function') {
        return original(drawableID, candidateIDs);
      }
      const dBB = drawable._getBoundingBox();
      let anyCandidateVisible = false;
      for (const id of (candidateIDs || [])) {
        const c = renderer._drawables[id];
        if (c && c._visible) {
          anyCandidateVisible = true;
          const cBB = c._getBoundingBox();
          if (dBB.left < cBB.right && dBB.right > cBB.left &&
              dBB.bottom < cBB.top && dBB.top > cBB.bottom) {
            return original(drawableID, candidateIDs);
          }
        }
      }
      if (!anyCandidateVisible) return false;
      return false;
    } catch (e) {
      return original(drawableID, candidateIDs);
    }
  };
}

if (renderer && renderer.isTouchingColor) {
  const original = renderer.isTouchingColor.bind(renderer);
  const CACHE = new Map();
  let cacheFrame = -1;
  renderer.isTouchingColor = function (drawableID, color3b, mask3b) {
    const frame = getFrame();
    if (frame !== cacheFrame) {
      cacheFrame = frame;
      CACHE.clear();
    }
    const k = drawableID + ':' + (color3b || []).join(',') + ':' + (mask3b || []).join(',');
    if (CACHE.has(k)) return CACHE.get(k);
    const result = original(drawableID, color3b, mask3b);
    CACHE.set(k, result);
    return result;
  };
}
})();
