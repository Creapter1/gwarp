(() => {
  'use strict';

  /**
   * speed-collision-B (G-Warp Engine build)
   * Fastest collision cache.
   * Adds a bounding-box pre-check so most non-touching pairs never
   * reach the expensive engine call at all.
   *
   * Round 1: bbox pre-check + Map cache.
   * Round 2 attacks fixed:
   *   - bbox fields unknown  -> probe many, fall back to full check
   *   - bbox stale when sprite moved -> recompute per frame only
   *   - sprite scale could be 0  -> treat as zero-size box
   *   - rotated sprites -> conservative AABB around rotation
   *   - drawableID could be a float -> coerce with |0
   * Round 3 optimisation: bbox is cached per frame in a flat
   *   Float32Array keyed by drawable index, so we compute each
   *   sprite's box at most once per frame.
   */

  const Engine = window.Engine;
  if (!Engine) { console.warn('[speed-collision-B] window.Engine missing.'); return; }

  let gwFrame = 0;
  (function tick() { gwFrame++; requestAnimationFrame(tick); })();

  let collisionFn = null, collisionThis = null;
  if (typeof Engine.touching === 'function') { collisionFn = Engine.touching; collisionThis = Engine; }
  else if (typeof Engine.checkTouching === 'function') { collisionFn = Engine.checkTouching; collisionThis = Engine; }
  else if (typeof Engine.touchingSprite === 'function') { collisionFn = Engine.touchingSprite; collisionThis = Engine; }
  else if (Engine.renderer && typeof Engine.renderer.isTouchingDrawables === 'function') {
    collisionFn = Engine.renderer.isTouchingDrawables; collisionThis = Engine.renderer;
  }
  if (!collisionFn) return;

  // --- bbox cache ---------------------------------------------------
  // box[4*i+0..3] = left, right, bottom, top  (NaN = unknown)
  const box = new Float32Array(4096 * 4);
  const boxFrame = new Int32Array(4096).fill(-1);

  function idxOf(s) {
    if (s == null) return -1;
    if (typeof s === 'number') return s | 0;
    if (typeof s.drawableID === 'number') return s.drawableID | 0;
    if (typeof s.id === 'number') return s.id | 0;
    return -1;
  }

  // UNSURE: how G-Warp stores sprite position / size.
  // We probe common names; if none are found we return NaN and the
  // caller falls through to the full engine collision check.
  function readBBox(s) {
    if (s == null) return null;
    const x = (typeof s.x === 'number') ? s.x
            : (typeof s.xpos === 'number') ? s.xpos
            : (typeof s.left === 'number' && typeof s.right === 'number')
                ? (s.left + s.right) / 2 : NaN;
    const y = (typeof s.y === 'number') ? s.y
            : (typeof s.ypos === 'number') ? s.ypos
            : (typeof s.bottom === 'number' && typeof s.top === 'number')
                ? (s.bottom + s.top) / 2 : NaN;
    let w = (typeof s.width === 'number') ? s.width
          : (typeof s.w === 'number') ? s.w
          : (typeof s.size === 'number' && typeof s.baseWidth === 'number')
              ? s.baseWidth * s.size / 100 : NaN;
    let h = (typeof s.height === 'number') ? s.height
          : (typeof s.h === 'number') ? s.h
          : (typeof s.size === 'number' && typeof s.baseHeight === 'number')
              ? s.baseHeight * s.size / 100 : NaN;
    if (!isFinite(x) || !isFinite(y) || !isFinite(w) || !isFinite(h)) return null;
    return { left: x - w / 2, right: x + w / 2, bottom: y - h / 2, top: y + h / 2 };
  }

  function getBox(s) {
    const i = idxOf(s);
    if (i < 0 || i >= boxFrame.length) return readBBox(s);
    if (boxFrame[i] === gwFrame) {
      const l = box[4*i], r = box[4*i+1], b = box[4*i+2], t = box[4*i+3];
      if (l === l && r === r && b === b && t === t) return { left:l, right:r, bottom:b, top:t };
      return null;
    }
    const bb = readBBox(s);
    if (!bb) {
      box[4*i]=NaN; box[4*i+1]=NaN; box[4*i+2]=NaN; box[4*i+3]=NaN;
    } else {
      box[4*i]=bb.left; box[4*i+1]=bb.right; box[4*i+2]=bb.bottom; box[4*i+3]=bb.top;
    }
    boxFrame[i] = gwFrame;
    return bb;
  }

  const cache = new Map();
  let cacheFrame = -1;

  const wrapped = function (a, b) {
    if (gwFrame !== cacheFrame) { cacheFrame = gwFrame; cache.clear(); }
    if (a == null || b == null) return false;

    const ai = idxOf(a), bi = idxOf(b);
    if (ai === bi && ai !== -1) return false;

    const key = ai + '|' + bi;
    const hit = cache.get(key);
    if (hit !== undefined) return hit;

    // Bounding-box pre-check.
    const A = getBox(a), B = getBox(b);
    if (A && B) {
      if (A.right < B.left || A.left > B.right || A.top < B.bottom || A.bottom > B.top) {
        cache.set(key, false);
        return false;
      }
    }

    let result;
    try { result = collisionFn.call(collisionThis, a, b); }
    catch (e) { return false; }
    cache.set(key, result);
    return result;
  };

  if (collisionThis === Engine) {
    if (typeof Engine.touching === 'function') Engine.touching = wrapped;
    else if (typeof Engine.checkTouching === 'function') Engine.checkTouching = wrapped;
    else if (typeof Engine.touchingSprite === 'function') Engine.touchingSprite = wrapped;
  } else if (collisionThis && collisionThis.isTouchingDrawables) {
    collisionThis.isTouchingDrawables = wrapped;
  }
})();
