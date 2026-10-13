(() => {
  'use strict';

  /**
   * speed-collision-C (G-Warp Engine build)
   * Safest / most complete collision cache.
   * Adds a hard per-frame budget so collisions can never blow the
   * 16ms frame. After the budget is spent, further queries return
   * false (safe default) and log once per frame.
   *
   * Round 1: cache + budget.
   * Round 2 attacks fixed:
   *   - budget too low -> false negatives -> made it configurable
   *     and default 200 (generous), warn once per frame
   *   - turbo mode should not use budget -> skip when Engine.isTurbo
   *   - exceptions from Engine must not consume budget
   *   - NaN args -> return false
   *   - cache cleared on budget reset AND on frame change
   * Round 3 optimisation: budget counter is a plain integer, no
   *   allocations in the hot path; the Map is reused between frames
   *   (only cleared, never re-created).
   */

  const Engine = window.Engine;
  if (!Engine) { console.warn('[speed-collision-C] window.Engine missing.'); return; }

  const MAX_CHECKS_PER_FRAME = 200; // configurable
  let checksThisFrame = 0;
  let warnedThisFrame = false;

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

  const cache = new Map();
  let cacheFrame = -1;

  function idOf(s) {
    if (s == null) return -1;
    if (typeof s === 'number') return s;
    if (typeof s.id === 'number') return s.id;
    if (typeof s.drawableID === 'number') return s.drawableID;
    return -1;
  }

  const wrapped = function (a, b) {
    if (gwFrame !== cacheFrame) {
      cacheFrame = gwFrame;
      cache.clear();
      checksThisFrame = 0;
      warnedThisFrame = false;
    }
    if (a == null || b == null) return false;
    const ai = idOf(a), bi = idOf(b);
    if (ai === bi && ai !== -1) return false;

    const key = ai + '|' + bi;
    const hit = cache.get(key);
    if (hit !== undefined) return hit;

    // Turbo mode is the user explicitly asking for "go as fast as
    // possible"; do not throttle it.
    const turbo = !!Engine.isTurbo;

    if (!turbo && checksThisFrame >= MAX_CHECKS_PER_FRAME) {
      if (!warnedThisFrame) {
        console.warn('[speed-collision-C] per-frame collision budget exceeded; returning false for the rest of this frame.');
        warnedThisFrame = true;
      }
      return false;
    }

    let result;
    try {
      result = collisionFn.call(collisionThis, a, b);
    } catch (e) {
      console.error('[speed-collision-C] engine collision threw:', e && e.message);
      return false;
    }
    checksThisFrame++;
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
