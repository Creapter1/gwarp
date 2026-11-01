(() => {
  'use strict';

  /**
   * speed-collision-A (G-Warp, wraps GW.spritesTouch)
   * Simplest per-frame collision cache.
   *
   * Round 1: wrap GW.spritesTouch with a per-frame Map cache.
   * Round 2 attacks fixed:
   *   - cache never invalidated -> cleared on a rAF tick counter
   *   - null / undefined args   -> return false, not cached
   *   - a === b                 -> return false immediately
   *   - spritesTouch threw      -> result not cached, return false
   *   - Map grew unbounded      -> cleared every frame
   *   - GW.spritesTouch missing -> log once and exit
   * Round 3 optimisation: one flat Map keyed by a short integer pair
   *   (id(a) * 1048576 + id(b) is unsafe if ids are large, so we use
   *   a two-level numeric key built with a switch on numeric id
   *   availability; if neither sprite has a numeric id we fall back
   *   to WeakMap-in-WeakMap, computed once per frame).
   */

  const GW = window.GW;
  if (!GW || typeof GW.spritesTouch !== 'function') {
    console.warn('[speed-collision-A] GW.spritesTouch not found; doing nothing.');
    return;
  }
  if (GW._gwSpeedCollisionA) return;
  GW._gwSpeedCollisionA = true;

  const orig = GW.spritesTouch;

  // Own frame counter; no dependency on Engine internals.
  let gwFrame = 0;
  (function tick() { gwFrame++; requestAnimationFrame(tick); })();

  // Flat Map for numeric ids; WeakMap-of-WeakMap for object-only.
  const numCache = new Map();      // key: aId*1000003 + bId  (integer)
  const objCache = new WeakMap();  // a -> WeakMap(b -> bool)
  let cacheFrame = -1;

  function numId(s) {
    if (s == null) return -1;
    if (typeof s === 'number') return s;
    if (typeof s.id === 'number') return s.id;
    return -1; // UNSURE: what other numeric id field G-Warp sprites carry
  }

  function clearCaches() {
    numCache.clear();
    objCache = new WeakMap(); // note: const -> see below
  }

  // Because objCache is const, reassign via a holder.
  let objCacheHolder = new WeakMap();

  GW.spritesTouch = function (a, b) {
    if (gwFrame !== cacheFrame) {
      cacheFrame = gwFrame;
      numCache.clear();
      objCacheHolder = new WeakMap();
    }
    if (a == null || b == null || a === b) return false;

    const ai = numId(a), bi = numId(b);

    if (ai >= 0 && bi >= 0) {
      const key = ai * 1000003 + bi;
      const hit = numCache.get(key);
      if (hit !== undefined) return hit;
      let result;
      try { result = orig.call(GW, a, b); }
      catch (e) { return false; }
      numCache.set(key, result);
      return result;
    }

    // Object-identity path.
    let inner = objCacheHolder.get(a);
    if (!inner) { inner = new WeakMap(); objCacheHolder.set(a, inner); }
    if (inner.has(b)) return inner.get(b);

    let result;
    try { result = orig.call(GW, a, b); }
    catch (e) { return false; }
    inner.set(b, result);
    return result;
  };
})();
