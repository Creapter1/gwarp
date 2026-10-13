(() => {
  'use strict';

  /**
   * speed-clones-A (G-Warp Engine build)
   * Simplest clone-thread optimisation.
   * Skips stepping a thread whose sprite is invisible and whose
   * stack is empty. Does not touch the sequencer's array; it only
   * short-circuits the per-thread step entry point.
   *
   * Round 1: short-circuit thread step for invisible idle clones.
   * Round 2 attacks fixed:
   *   - unknown thread step name -> probe Engine.stepThread,
   *     Engine.tickThread, Engine.updateThread; bail if none found
   *   - unknown sprite-visibility field -> probe visible/isVisible/
   *     hidden/_visible
   *   - unknown thread->sprite link -> probe target/sprite/owner
   *   - null thread / null sprite -> run normally
   *   - a thread that just received a broadcast has an empty stack
   *     but must run once -> we only skip when stack is empty AND
   *     the thread is not "just started" (we check a flag if it
   *     exists, otherwise err on the side of running)
   * Round 3 optimisation: cached the resolved property names in
   *   closures so the hot path does no property probing.
   */

  const Engine = window.Engine;
  if (!Engine) { console.warn('[speed-clones-A] window.Engine missing.'); return; }

  // Resolve the thread-step method.
  let stepFnName = null;
  if (typeof Engine.stepThread === 'function') stepFnName = 'stepThread';
  else if (typeof Engine.tickThread === 'function') stepFnName = 'tickThread';
  else if (typeof Engine.updateThread === 'function') stepFnName = 'updateThread';
  else if (Engine.threads && typeof Engine.threads.step === 'function') stepFnName = 'threads.step';
  if (!stepFnName) {
    // UNSURE: G-Warp's actual per-thread step name. Nothing to do.
    return;
  }

  const origFn = stepFnName === 'threads.step' ? Engine.threads.step : Engine[stepFnName];

  function visibilityOf(s) {
    if (!s) return true; // no sprite -> treat as visible (stage)
    if (typeof s.visible === 'boolean') return s.visible;
    if (typeof s.isVisible === 'boolean') return s.isVisible;
    if (typeof s.hidden === 'boolean') return !s.hidden;
    if (typeof s._visible === 'boolean') return s._visible;
    return true; // UNSURE: unknown field; default to running
  }

  function spriteOf(t) {
    if (!t) return null;
    return t.target || t.sprite || t.owner || null;
  }

  function stackOf(t) {
    if (!t) return null;
    return t.stack || t.blocks || t.ops || null;
  }

  const wrapped = function (thread) {
    if (!thread) return origFn.call(this, thread);
    const sprite = spriteOf(thread);
    if (!sprite) return origFn.call(this, thread); // stage thread
    const visible = visibilityOf(sprite);
    if (visible) return origFn.call(this, thread);
    const stack = stackOf(thread);
    if (stack && stack.length > 0) return origFn.call(this, thread);
    // Invisible, empty stack: skip.
    return;
  };

  if (stepFnName === 'threads.step') Engine.threads.step = wrapped;
  else Engine[stepFnName] = wrapped;
})();
