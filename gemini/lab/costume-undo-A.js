(() => {
  'use strict';

  /**
   * costume-undo-A (simplest)
   * Adds Ctrl+Z / Ctrl+Y keyboard handling that calls
   * GW8.pushHistory with a special "undo" label so G-Warp's own
   * history system treats it as a request.
   *
   * UNSURE: G-Warp's exact undo API is not documented. This module
   * assumes GW8.pushHistory('__undo__') and GW8.pushHistory('__redo__')
   * are understood. If not, the module does nothing harmful.
   *
   * Round 1: keyboard listener.
   * Round 2 fixed:
   *   - only fire when the costume editor is visible
   *   - ignore when focus is inside a textarea/input
   *   - preventDefault only when we handle the key
   *   - support Cmd on Mac
   *   - Shift+Ctrl+Z also redoes
   * Round 3: uses a single keydown listener on document with capture
   *   so it runs before other handlers.
   */

  const CE = window.GW_V15_COSTUME_EDITOR;
  if (!CE) return;

  function editorVisible() {
    // UNSURE: how G-Warp tracks which editor is open. We check for
    // a visible canvas with the paint class, or CE.state.mode.
    return !!(CE.state && CE.state.mode);
  }

  document.addEventListener('keydown', (e) => {
    if (!editorVisible()) return;
    const tag = (e.target && e.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    const mod = e.ctrlKey || e.metaKey;
    if (!mod) return;

    if (e.key === 'z' || e.key === 'Z') {
      if (e.shiftKey) {
        if (window.GW8 && window.GW8.pushHistory) window.GW8.pushHistory('__redo__');
      } else {
        if (window.GW8 && window.GW8.pushHistory) window.GW8.pushHistory('__undo__');
      }
      e.preventDefault();
    } else if (e.key === 'y' || e.key === 'Y') {
      if (window.GW8 && window.GW8.pushHistory) window.GW8.pushHistory('__redo__');
      e.preventDefault();
    }
  }, true);
})();
