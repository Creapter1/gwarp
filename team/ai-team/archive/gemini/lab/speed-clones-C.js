(() => {
  'use strict';

  /**
   * speed-clones-C (G-Warp, wraps ScriptThread.prototype.step)
   * Safest / most complete.
   * - Does NOT keep cross-frame state that could go stale; checks
   *   visibility + stack on every call.
   * - Never skips a thread whose stack is missing (unknown shape),
   *   never skips a stage thread.
   * - Wraps with a marker so re-loading the file is a no-op.
   * - Never swallows errors from the original step.
   * - Per-frame visibility cache keyed by sprite id / object so we
   *   don't re-read properties for many clones of the same sprite.
   *
   * Round 1: per-thread check + per-sprite visibility cache.
   * Round 2 attacks fixed:
   *   - visibility cache growing unbounded -> pruned when large
   *   - sprite has no numeric id -> WeakMap keyed by object
   *   - broadcast delivered mid-frame -> we re-check stack on every
   *     call, so the skips only apply when the stack is empty NOW
   *   - unknown fields -> default to "run" (safe)
   *   - nested wrapping (A/B loaded before C) -> marker check
   * Round 3 optimisation: single per-frame reset of the visibility
   *   cache; hot path does two comparisons and one WeakMap lookup.
   */

  const Engine = window.Engine;
  if (!Engine || !Array.isArray(Engine.threads)) {
    console.warn('[speed-clones-C] Engine.threads not found; doing nothing.');
    return;
  }

  let proto = null;
  if (typeof window.ScriptThread === 'function' && window.ScriptThread.prototype) {
    proto = window.ScriptThread.prototype;
  } else {
    const t0 = Engine.threads[0];
    if (t0 && t0.constructor && t0.constructor.prototype) proto = t0.constructor.prototype;
  }
  if (!proto || typeof proto.step !== 'function') {
    console.warn('[speed-clones-C] ScriptThread.prototype.step not reachable; doing nothing.');
    return;
  }
  if (proto._gwSpeedClonesA || proto._gwSpeedClonesB || proto._gwSpeedClonesC) {
    console.warn('[speed-clones-C] step already wrapped; doing nothing.');
    return;
  }
  proto._gwSpeedClonesC = true;

  const orig = proto.step;

  let gwFrame = 0;
  (function tick() { gwFrame++; requestAnimationFrame(tick); })();

  let visFrame = -1;
  let visNum = new Map();        // sprite.id -> bool
  let visObj = new WeakMap();    // sprite object -> bool

  function spriteOf(t) { return t && (t.sprite || t.target || t.owner || null); }
  function readVisible(s) {
    if (typeof s.visible === 'boolean') return s.visible;
    if (typeof s.isVisible === 'boolean') return s.isVisible;
    if (typeof s.hidden === 'boolean') return !s.hidden;
    if (typeof s._visible === 'boolean') return s._visible;
    return true; // UNSURE
  }
  function numericId(s) {
    if (typeof s.id === 'number') return s.id;
    if (typeof s.drawableID === 'number') return s.drawableID;
    return -1; // UNSURE
  }
  function visible(s) {
    if (visFrame !== gwFrame) {
      visFrame = gwFrame;
      visNum.clear();
      visObj = new WeakMap();
    }
    const id = numericId(s);
    if (id >= 0) {
      const hit = visNum.get(id);
      if (hit !== undefined) return hit;
      const v = readVisible(s);
      if (visNum.size > 4096) visNum.clear(); // crude prune
      visNum.set(id, v);
      return v;
    }
    const hit = visObj.get(s);
    if (hit !== undefined) return hit;
    const v = readVisible(s);
    visObj.set(s, v);
    return v;
  }
  function stackOf(t) { return t && (t.stack || t.blocks || t.ops || null); }

  proto.step = function () {
    const s = spriteOf(this);
    if (!s) return orig.apply(this, arguments);          // stage
    if (visible(s)) return orig.apply(this, arguments);  // visible
    const st = stackOf(this);
    if (!st) return orig.apply(this, arguments);         // unknown shape
    if (st.length > 0) return orig.apply(this, arguments);
    return; // invisible + empty stack -> skip
  };
})();
