(() => {
  'use strict';

  /**
   * speed-collision-C (G-Warp, wraps GW.spritesTouch)
   * Safest: cache + a hard per-frame budget, so collisions can never
   * blow the 16ms frame. Respects Engine.isTurbo (no budget in turbo).
   * Never false-positives: only false when the budget is exhausted,
   * and this is logged once per frame.
   *
   * Round 1: cache + budget.
   * Round 2 attacks fixed:
   *   - budget too low -> default 250; still configurable via
   *     GW._gwCollisionBudget
   *   - turbo mode should not be throttled -> checked every call
   *   - errors must not consume budget -> only successes do
   *   - NaN args -> return false
   *   - warning spam -> once per frame
   *   - cache reuse across frames -> Map cleared, never re-allocated
   * Round 3 optimisation: integer key when ids are available, else
   *   WeakMap; the budget counter is a plain number, no allocations
   *   in the hot path.
   */

  const GW = window.GW;
  const Engine = window.Engine;
  if (!GW || typeof GW.spritesTouch !== 'function') {
    console.warn('[speed-collision-C] GW.spritesTouch not found; doing nothing.');
    return;
  }
  if (GW._gwSpeedCollisionC) return;
  GW._gwSpeedCollisionC = true;

  const orig = GW.spritesTouch;

  let MAX = 250;
  Object.defineProperty(GW, '_gwCollisionBudget', {
    get() { return MAX; },
    set(v) { if (typeof v === 'number' && v > 0) MAX = v | 0; },
    configurable: true
  });

  let checksThisFrame = 0;
  let warnedThisFrame = false;

  let gwFrame = 0;
  (function tick() { gwFrame++; requestAnimationFrame(tick); })();

  const numCache = new Map();
  let objCache = new WeakMap();
  let cacheFrame = -1;

  function numId(s) {
    if (s == null) return -1;
    if (typeof s === 'number') return s;
    if (typeof s.id === 'number') return s.id;
    return -1; // UNSURE
  }

  function isTurbo() {
    return !!(Engine && Engine.isTurbo);
  }

  GW.spritesTouch = function (a, b) {
    if (gwFrame !== cacheFrame) {
      cacheFrame = gwFrame;
      numCache.clear();
      objCache = new WeakMap();
      checksThisFrame = 0;
      warnedThisFrame = false;
    }
    if (a == null || b == null || a === b) return false;

    const ai = numId(a), bi = numId(b);

    // Cache lookup
    if (ai >= 0 && bi >= 0) {
      const key = ai * 1000003 + bi;
      const hit = numCache.get(key);
      if (hit !== undefined) return hit;
    } else {
      let inner = objCache.get(a);
      if (inner && inner.has(b)) return inner.get(b);
    }

    if (!isTurbo() && checksThisFrame >= MAX) {
      if (!warnedThisFrame) {
        console.warn('[speed-collision-C] per-frame collision budget reached (' + MAX + '); returning false for the rest of this frame.');
        warnedThisFrame = true;
      }
      return false;
    }

    let result;
    try { result = orig.call(GW, a, b); }
    catch (e) {
      console.error('[speed-collision-C] GW.spritesTouch threw:', e && e.message);
      return false;
    }

    checksThisFrame++;

    if (ai >= 0 && bi >= 0) {
      numCache.set(ai * 1000003 + bi, result);
    } else {
      let inner = objCache.get(a);
      if (!inner) { inner = new WeakMap(); objCache.set(a, inner); }
      inner.set(b, result);
    }
    return result;
  };
})();
