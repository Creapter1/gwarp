(() => {
  'use strict';
  /*
   * G-Warp fast clone cleanup.
   *
   * WHY: app.html has a document-level click listener that walks every sprite
   * on Start/Stop. After a runaway project creates tens of thousands of
   * clones, Stop can be slow before the old cleanup runs. This module removes
   * clones in-place during the document capture phase, before button handlers
   * and later document listeners can walk the huge clone array.
   *
   * It also replaces the current GW.removeAllClones implementation with a
   * stable in-place compaction pass. Current app.html defines that API to
   * filter Engine.sprites and Engine.threads, and a later wrapper increments
   * GW.__sprEpoch. This replacement preserves those effects without allocating
   * two new arrays.
   *
   * Switch off before this file loads:
   *   window.GW_DISABLE_CHATGPT_FAST_CLONE_CLEANUP = true;
   */
  const DISABLE_KEY = 'GW_DISABLE_CHATGPT_FAST_CLONE_CLEANUP';
  const INSTALL_KEY = '__GW_CHATGPT_FAST_CLONE_CLEANUP_V1__';

  if (window[DISABLE_KEY] === true || window[INSTALL_KEY]) return;

  const GW = window.GW;
  const Engine = window.Engine;

  if (!GW || !Engine || !Array.isArray(Engine.sprites) ||
      !Array.isArray(Engine.threads) ||
      typeof GW.removeAllClones !== 'function') {
    console.warn(
      '[G-Warp fast clone cleanup] Not installed: expected window.GW, ' +
      'window.Engine, Engine.sprites, Engine.threads, and GW.removeAllClones.'
    );
    return;
  }

  const originalRemoveAllClones = GW.removeAllClones;
  const state = {
    installed: true,
    lastRemovedSprites: 0,
    lastRemovedThreads: 0,
    lastDurationMs: 0,
    lastTrigger: 'install'
  };
  window[INSTALL_KEY] = state;

  function compactClones(trigger) {
    const started = performance.now();
    const sprites = Engine.sprites;
    const threads = Engine.threads;
    if (!Array.isArray(sprites) || !Array.isArray(threads)) {
      return originalRemoveAllClones.apply(GW, []);
    }

    const oldActiveIndex = Number.isInteger(Engine.activeSpriteIndex)
      ? Engine.activeSpriteIndex
      : -1;
    let write = 0;
    let removedSprites = 0;
    let nextActiveIndex = -1;

    for (let read = 0, length = sprites.length; read < length; read++) {
      const sprite = sprites[read];
      if (sprite && sprite.isClone) {
        removedSprites++;
        continue;
      }
      if (read === oldActiveIndex) nextActiveIndex = write;
      sprites[write++] = sprite;
    }
    if (write < sprites.length) sprites.length = write;

    let threadWrite = 0;
    let removedThreads = 0;
    for (let read = 0, length = threads.length; read < length; read++) {
      const thread = threads[read];
      if (thread?.sprite?.isClone) {
        removedThreads++;
        continue;
      }
      threads[threadWrite++] = thread;
    }
    if (threadWrite < threads.length) threads.length = threadWrite;

    if (nextActiveIndex >= 0) {
      Engine.activeSpriteIndex = nextActiveIndex;
    } else if (sprites.length) {
      Engine.activeSpriteIndex = Math.max(
        0,
        Math.min(oldActiveIndex < 0 ? 0 : oldActiveIndex, sprites.length - 1)
      );
    } else {
      Engine.activeSpriteIndex = 0;
    }

    if (typeof GW.__sprEpoch === 'number') GW.__sprEpoch++;

    state.lastRemovedSprites = removedSprites;
    state.lastRemovedThreads = removedThreads;
    state.lastDurationMs = performance.now() - started;
    state.lastTrigger = trigger;

    // Notify optional tools such as clone-limit.js. They can refresh counters
    // after this in-place compaction without polling or changing array identity.
    try {
      window.dispatchEvent(new CustomEvent('gwarp-clones-cleaned', {
        detail: { removedSprites, removedThreads, trigger, durationMs: state.lastDurationMs }
      }));
    } catch (_) {}

    return removedSprites;
  }

  function removeAllClonesFast() {
    return compactClones('GW.removeAllClones');
  }
  removeAllClonesFast.__gwChatGPTFastCloneCleanup = true;
  GW.removeAllClones = removeAllClonesFast;

  function onStartStopCapture(event) {
    const target = event.target;
    if (!target || typeof target.closest !== 'function') return;
    const button = target.closest('#stopBtn, #greenFlagBtn');
    if (!button) return;

    try {
      compactClones(button.id === 'stopBtn' ? 'stop-capture' : 'green-flag-capture');
    } catch (error) {
      console.error('[G-Warp fast clone cleanup] Cleanup failed:', error);
      try { originalRemoveAllClones.call(GW); } catch (_) {}
    }
  }

  window.addEventListener('click', onStartStopCapture, true);

  // The "stop all" Scratch block uses GW.extraBlock rather than a button click.
  // Wrap it before the current stop-block dispatcher runs so the expensive
  // clone/thread arrays are compacted before stopAllLikeScratch visits threads.
  const originalExtraBlock = typeof GW.extraBlock === 'function' ? GW.extraBlock : null;
  function extraBlockWithFastStop(th, block) {
    if (block?.dataset?.type === 'stop') {
      const option = [...(block.querySelectorAll?.('.block-select') || [])]
        .find(select => select.closest?.('.scratch-block') === block)?.value || 'all';
      if (option === 'all') compactClones('stop-block');
    }
    return originalExtraBlock.apply(this, arguments);
  }
  if (originalExtraBlock) {
    extraBlockWithFastStop.__gwChatGPTFastStopBlock = true;
    GW.extraBlock = extraBlockWithFastStop;
  }

  state.removeAllClonesFast = removeAllClonesFast;
  state.dispose = () => {
    window.removeEventListener('click', onStartStopCapture, true);
    if (GW.removeAllClones === removeAllClonesFast) {
      GW.removeAllClones = originalRemoveAllClones;
    }
    if (originalExtraBlock && GW.extraBlock === extraBlockWithFastStop) {
      GW.extraBlock = originalExtraBlock;
    }
    delete window[INSTALL_KEY];
  };

  state.getStats = () => ({
    lastRemovedSprites: state.lastRemovedSprites,
    lastRemovedThreads: state.lastRemovedThreads,
    lastDurationMs: state.lastDurationMs,
    lastTrigger: state.lastTrigger
  });
})();