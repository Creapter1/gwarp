(() => {
  'use strict';

  /*
   * Shorten uninterrupted warp-script execution using G-Warp's own retry path.
   *
   * The v15.8 runner already supports GW.RETRY_BLOCK: throwing that exact
   * sentinel causes the runner to rewind the current block and return, so it
   * can resume next animation frame without re-running completed blocks.
   *
   * This is a soft block-boundary budget, not an interrupt for synchronous JS.
   * See NOTES-frame-budget.txt for uncovered control-only and native-block cases.
   *
   * Switch off before loading:
   *   window.GW_DISABLE_CHATGPT_FRAME_BUDGET = true;
   */
  const DISABLE_KEY = 'GW_DISABLE_CHATGPT_FRAME_BUDGET';
  const INSTALL_KEY = '__GW_CHATGPT_FRAME_BUDGET_V1__';
  const BUDGET_MS = 200;

  if (window[DISABLE_KEY] === true || window[INSTALL_KEY]) return;

  const GW = window.GW;
  const Engine = window.Engine;
  const GW8 = window.GW8;
  const GW9 = window.GW9;
  let ThreadClass = null;
  try { ThreadClass = typeof ScriptThread !== 'undefined' ? ScriptThread : null; }
  catch (_) {}

  if (!GW || !Engine || !GW.RETRY_BLOCK ||
      typeof GW.frameGate !== 'function' ||
      typeof GW.extraBlock !== 'function' ||
      typeof GW8?.resolveInput !== 'function' ||
      typeof GW9?.evalNode !== 'function' ||
      typeof ThreadClass?.prototype?.step !== 'function' ||
      typeof ThreadClass?.prototype?.executeBlock !== 'function') {
    console.warn(
      '[G-Warp frame budget] Not installed: expected the current runner, ' +
      'GW.RETRY_BLOCK, frameGate, extraBlock, GW8.resolveInput and GW9.evalNode.'
    );
    return;
  }

  const state = {
    installed: true,
    budgetMs: BUDGET_MS,
    checks: 0,
    yields: 0,
    lastYieldAt: 0,
    lastYieldPath: '',
    lastBlockType: '',
    dispose: null
  };
  window[INSTALL_KEY] = state;

  let frameStartedAt = null;
  const stepStartedAt = new WeakMap();
  const wrapped = [];

  const now = () => performance.now();
  const inWarp = thread =>
    !!thread?.callStack?.some(frame => frame?.type === 'custom' && frame.warp === true);

  function shouldYield(thread, path, block) {
    state.checks++;
    // RETRY_BLOCK is caught by the runner inside ScriptThread.step(). Never
    // throw it for editor/debugger/helper calls made outside that runner frame.
    if (!stepStartedAt.has(thread) || !inWarp(thread) ||
        thread.finished || !Engine.isRunning || Engine.isPaused) return false;

    const t = now();
    const stepStart = stepStartedAt.get(thread);
    const frameStart = frameStartedAt !== null ? frameStartedAt : (stepStart ?? t);
    if (t - frameStart < BUDGET_MS && (!stepStart || t - stepStart < BUDGET_MS)) {
      return false;
    }

    // Do not throw after calling the block: the runner rewinds the current
    // block when RETRY_BLOCK is thrown. Every hook therefore checks first.
    state.yields++;
    state.lastYieldAt = t;
    state.lastYieldPath = path;
    state.lastBlockType = String(block?.dataset?.type || 'unknown');
    return true;
  }

  function beforeBlock(thread, path, block) {
    if (shouldYield(thread, path, block)) throw GW.RETRY_BLOCK;
  }

  function wrap(object, key, makeWrapper) {
    const original = object?.[key];
    if (typeof original !== 'function') return false;
    const wrapper = makeWrapper(original);
    object[key] = wrapper;
    wrapped.push(() => {
      if (object[key] === wrapper) object[key] = original;
    });
    return true;
  }

  // frameGate runs before the render loop steps project threads, making its
  // timestamp a shared budget across threads in the same animation frame.
  wrap(GW, 'frameGate', original => function () {
    frameStartedAt = now();
    return original.apply(this, arguments);
  });

  // Track each call to ScriptThread.step for cases where the render loop isn't
  // the caller. These hooks never change block state or runner flags.
  wrap(ThreadClass.prototype, 'step', original => function () {
    const thread = this;
    stepStartedAt.set(thread, now());
    try {
      return original.apply(thread, arguments);
    } finally {
      stepStartedAt.delete(thread);
    }
  });

  // Check before the app's extension/core command dispatcher can cause effects.
  wrap(GW, 'extraBlock', original => function (thread, block) {
    beforeBlock(thread, 'GW.extraBlock', block);
    return original.apply(this, arguments);
  });

  // Control blocks such as repeat/if evaluate their inputs inside runOne().
  // Its RETRY_BLOCK catch rewinds that whole current block before re-running.
  wrap(GW8, 'resolveInput', original => function (thread, block) {
    beforeBlock(thread, 'GW8.resolveInput', block);
    return original.apply(this, arguments);
  });

  // Nested reporter expressions also occur inside control-block conditions.
  wrap(GW9, 'evalNode', original => function (thread, node, expected, ownerBlock) {
    beforeBlock(thread, 'GW9.evalNode', ownerBlock || null);
    return original.apply(this, arguments);
  });

  // Legacy direct block execution may bypass GW.extraBlock.
  wrap(ThreadClass.prototype, 'executeBlock', original => function (block) {
    beforeBlock(this, 'ScriptThread.executeBlock', block);
    return original.apply(this, arguments);
  });

  state.getStats = () => ({
    budgetMs: state.budgetMs,
    checks: state.checks,
    yields: state.yields,
    lastYieldAt: state.lastYieldAt,
    lastYieldPath: state.lastYieldPath,
    lastBlockType: state.lastBlockType
  });

  state.dispose = () => {
    for (const undo of wrapped.reverse()) {
      try { undo(); } catch (_) {}
    }
    wrapped.length = 0;
    delete window[INSTALL_KEY];
  };
})();