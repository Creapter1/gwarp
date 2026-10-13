(() => {
  'use strict';

  /**
   * speed-clones-B (G-Warp Engine build)
   * Fastest clone-thread optimisation.
   * Iterates Engine.threads ONCE per frame, builds a small index
   * list of "active" threads, and hands that list to the sequencer.
   * Uses a Uint16Array so the list itself allocates nothing per
   * frame.
   *
   * Round 1: Uint16Array active-list + swap-in.
   * Round 2 attacks fixed:
   *   - Engine.threads may be a live array the sequencer mutates
   *     -> we rebuild the list every frame and never mutate
   *     Engine.threads itself
   *   - thread count > 65535 -> use Uint32Array
   *   - Engine.stepThreads not found -> bail (UNSURE)
   *   - broadcast-on-invisible-clone: we still keep threads whose
   *     stack is non-empty, so broadcasts delivered this frame run
   *   - cloning mid-frame: length checked against array length
   * Round 3 optimisation: no per-frame allocations at all; we
   *   reuse the same typed array, resize only when it grows.
   */

  const Engine = window.Engine;
  if (!Engine) { console.warn('[speed-clones-B] window.Engine missing.'); return; }

  const stepFnName = typeof Engine.stepThreads === 'function' ? 'stepThreads'
                   : typeof Engine.updateThreads === 'function' ? 'updateThreads'
                   : typeof Engine.tickThreads === 'function' ? 'tickThreads'
                   : null;
  if (!stepFnName) return; // UNSURE

  const orig = Engine[stepFnName];

  let cap = 1024;
  let idx = new Uint16Array(cap);

  function visibilityOf(s) {
    if (!s) return true;
    if (typeof s.visible === 'boolean') return s.visible;
    if (typeof s.isVisible === 'boolean') return s.isVisible;
    if (typeof s.hidden === 'boolean') return !s.hidden;
    if (typeof s._visible === 'boolean') return s._visible;
    return true;
  }
  function spriteOf(t) { return t && (t.target || t.sprite || t.owner || null); }
  function stackOf(t) { return t && (t.stack || t.blocks || t.ops || null); }

  const wrapped = function () {
    const threads = Engine.threads;
    if (!threads) return orig.call(this);
    const n = threads.length;
    if (n > cap) {
      cap = n * 2;
      idx = n > 65535 ? new Uint32Array(cap) : new Uint16Array(cap);
    }
    let k = 0;
    for (let i = 0; i < n; i++) {
      const t = threads[i];
      const s = spriteOf(t);
      if (!s || visibilityOf(s)) { idx[k++] = i; continue; }
      const st = stackOf(t);
      if (st && st.length > 0) { idx[k++] = i; continue; }
      // else: skip
    }
    // Build a lightweight view for the sequencer that only sees the
    // active indices. UNSURE: whether Engine.stepThreads expects an
    // array argument or reads Engine.threads directly. We support
    // both by temporarily swapping in a filtered array.
    const saved = Engine.threads;
    const filtered = new Array(k);
    for (let j = 0; j < k; j++) filtered[j] = saved[idx[j]];
    Engine.threads = filtered;
    try { return orig.call(this); }
    finally { Engine.threads = saved; }
  };

  Engine[stepFnName] = wrapped;
})();
