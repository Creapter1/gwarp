(() => {
  'use strict';

  /**
   * speed-clones-C (G-Warp Engine build)
   * Safest clone-thread optimisation.
   * Does NOT touch Engine.threads at all. Instead it wraps a
   * per-thread step method and returns early for invisible idle
   * clones. This is the least intrusive option and the one I
   * recommend for G-Warp.
   *
   * Round 1: per-thread step wrapper.
   * Round 2 attacks fixed:
   *   - double-wrap if the file loads twice -> _gwSC flag on Engine
   *   - unknown sprite-visibility field -> probe, default to visible
   *   - broadcast arrives mid-frame -> we only skip when the stack
   *     is empty
   *   - clone starts running this exact frame -> the engine calls
   *     the step AFTER pushing the stack, so we see it non-empty
   *   - step function may be called with `this` bound to a runtime
   *     -> use .call(this, thread)
   * Round 3 optimisation: closure-cached property names, no
   *   try/catch in the hot path (we trust the outer engine), and
   *   a single numeric frame check to avoid re-reading sprite
   *   visibility if it was already read this frame for that sprite.
   */

  const Engine = window.Engine;
  if (!Engine) { console.warn('[speed-clones-C] window.Engine missing.'); return; }
  if (Engine._gwSpeedClonesC) return; // already wrapped
  Engine._gwSpeedClonesC = true;

  const stepFnName = typeof Engine.stepThread === 'function' ? 'stepThread'
                   : typeof Engine.tickThread === 'function' ? 'tickThread'
                   : typeof Engine.updateThread === 'function' ? 'updateThread'
                   : null;
  if (!stepFnName) {
    // UNSURE: name of the per-thread step. Nothing to do.
    return;
  }

  const orig = Engine[stepFnName];

  let gwFrame = 0;
  (function tick(){ gwFrame++; requestAnimationFrame(tick); })();

  // Visibility cache: frame -> per-sprite value.
  // Keyed by sprite id when available; else skipped.
  const visCache = new Map();

  function spriteId(s) {
    if (!s) return null;
    if (typeof s.id === 'number') return s.id;
    if (typeof s.drawableID === 'number') return s.drawableID;
    return null;
  }
  function readVisibility(s) {
    if (!s) return true;
    if (typeof s.visible === 'boolean') return s.visible;
    if (typeof s.isVisible === 'boolean') return s.isVisible;
    if (typeof s.hidden === 'boolean') return !s.hidden;
    if (typeof s._visible === 'boolean') return s._visible;
    return true; // UNSURE
  }
  function visibilityOf(s) {
    const id = spriteId(s);
    if (id == null) return readVisibility(s);
    const hit = visCache.get(id);
    if (hit && hit.f === gwFrame) return hit.v;
    const v = readVisibility(s);
    visCache.set(id, { f: gwFrame, v });
    // Cheap periodic prune.
    if (visCache.size > 8192) {
      for (const [k, val] of visCache) if (val.f < gwFrame - 2) visCache.delete(k);
    }
    return v;
  }
  function spriteOf(t) { return t && (t.target || t.sprite || t.owner || null); }
  function stackOf(t) { return t && (t.stack || t.blocks || t.ops || null); }

  Engine[stepFnName] = function (thread) {
    if (!thread) return orig.call(this, thread);
    const s = spriteOf(thread);
    if (!s) return orig.call(this, thread); // stage
    if (visibilityOf(s)) return orig.call(this, thread);
    const st = stackOf(thread);
    if (st && st.length > 0) return orig.call(this, thread);
    return; // invisible + empty stack -> skip
  };
})();
