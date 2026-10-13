(() => {
  'use strict';

  /**
   * speed-collision-A (G-Warp Engine build)
   * Simplest collision cache.
   * Caches the result of the engine's collision function for one frame
   * so repeated identical queries inside the same frame are free.
   *
   * Round 1: Wrapped Engine.touching (if present) with a per-frame Map.
   * Round 2 attacks fixed:
   *   - frame counter could be missing  -> own rAF tick counter
   *   - null/undefined args             -> guarded, return false
   *   - renderer threw                  -> result not cached
   *   - Map grew unbounded              -> cleared each frame
   *   - function name might differ      -> tries several names
   * Round 3 optimisation: single flat Map keyed by "aId|bId" instead of
   *   a nested Map (fewer allocations), plus a fast-path early-out
   *   when a === b (a sprite never touches itself).
   */

  const Engine = window.Engine;
  if (!Engine) { console.warn('[speed-collision-A] window.Engine missing; doing nothing.'); return; }

  // --- frame counter (our own, so we never depend on Engine internals) ---
  let gwFrame = 0;
  (function tick() { gwFrame++; requestAnimationFrame(tick); })();

  // --- resolve the collision function --------------------------------
  // UNSURE: the real name. We try the most likely candidates.
  let collisionFn = null;
  let collisionThis = null;
  if (typeof Engine.touching === 'function') {
    collisionFn = Engine.touching; collisionThis = Engine;
  } else if (typeof Engine.checkTouching === 'function') {
    collisionFn = Engine.checkTouching; collisionThis = Engine;
  } else if (typeof Engine.touchingSprite === 'function') {
    collisionFn = Engine.touchingSprite; collisionThis = Engine;
  } else if (Engine.renderer && typeof Engine.renderer.isTouchingDrawables === 'function') {
    collisionFn = Engine.renderer.isTouchingDrawables; collisionThis = Engine.renderer;
  }
  if (!collisionFn) {
    // UNSURE: Engine has no known collision entry point.
    // Fail safe: do nothing.
    return;
  }

  const cache = new Map();
  let cacheFrame = -1;

  function idOf(s) {
    if (s == null) return -1;
    if (typeof s === 'number') return s;
    if (typeof s.id === 'number') return s.id;
    if (typeof s.drawableID === 'number') return s.drawableID;
    return -1; // UNSURE: unknown id shape
  }

  const wrapped = function (a, b) {
    if (gwFrame !== cacheFrame) { cacheFrame = gwFrame; cache.clear(); }
    if (a == null || b == null) return false;
    const ai = idOf(a), bi = idOf(b);
    if (ai === bi && ai !== -1) return false; // sprite never touches itself
    const key = ai + '|' + bi;
    if (cache.has(key)) return cache.get(key);
    let result;
    try {
      result = collisionFn.call(collisionThis, a, b);
    } catch (e) {
      // Do not cache errors.
      return false;
    }
    cache.set(key, result);
    return result;
  };

  // Re-install under whatever name we found.
  if (collisionThis === Engine) {
    if (typeof Engine.touching === 'function') Engine.touching = wrapped;
    else if (typeof Engine.checkTouching === 'function') Engine.checkTouching = wrapped;
    else if (typeof Engine.touchingSprite === 'function') Engine.touchingSprite = wrapped;
  } else if (collisionThis && collisionThis.isTouchingDrawables) {
    collisionThis.isTouchingDrawables = wrapped;
  }
})();
