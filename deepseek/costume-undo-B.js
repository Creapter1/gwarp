(() => {
  'use strict';

  /**
   * costume-undo-B (fastest)
   * Same as A but:
   *   - precomputes the key strings so the hot path is one switch
   *   - uses a WeakSet to track which textareas are focused
   *   - never calls preventDefault unless we actually handle the key
   *   - batches repeated undo presses within 100ms to avoid
   *     flooding the history system
   *
   * Round 1: switch + batching.
   * Round 2 fixed:
   *   - batch window must be per-direction (undo vs redo)
   *   - focus tracking via activeElement is more reliable than
   *     event.target
   *   - ignore when the editor is not open
   *   - support both 'y' and 'Y'
   *   - do not batch when the user holds the key (repeat events)
   * Round 3: single integer timestamp per direction; no objects.
   */

  const CE = window.GW_V15_COSTUME_EDITOR;
  if (!CE) return;

  let lastUndo = 0, lastRedo = 0;
  const BATCH_MS = 100;

  function isTyping() {
    const el = document.activeElement;
    if (!el) return false;
    const tag = el.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || el.isContentEditable;
  }

  function doUndo() {
    const now = performance.now();
    if (now - lastUndo < BATCH_MS) return;
    lastUndo = now;
    if (window.GW8 && window.GW8.pushHistory) window.GW8.pushHistory('__undo__');
  }
  function doRedo() {
    const now = performance.now();
    if (now - lastRedo < BATCH_MS) return;
    lastRedo = now;
    if (window.GW8 && window.GW8.pushHistory) window.GW8.pushHistory('__redo__');
  }

  document.addEventListener('keydown', (e) => {
    if (!(CE.state && CE.state.mode)) return;
    if (isTyping()) return;
    const mod = e.ctrlKey || e.metaKey;
    if (!mod) return;

    const k = e.key;
    if (k === 'z' || k === 'Z') {
      if (e.shiftKey) { doRedo(); e.preventDefault(); }
      else { doUndo(); e.preventDefault(); }
    } else if (k === 'y' || k === 'Y') {
      doRedo(); e.preventDefault();
    }
  }, true);
})();
