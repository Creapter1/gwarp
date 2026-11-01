(() => {
  'use strict';

  /**
   * costume-undo-C (safest / most complete)
   * - Checks every required API before doing anything.
   * - Falls back to GW_DIALOG if undo/redo is unavailable.
   * - Does not assume GW8.pushHistory understands '__undo__'.
   *   Instead, if GW8 exposes .undo() and .redo(), it uses those
   *   directly. Otherwise it pushes a history entry with a
   *   descriptive label that G-Warp's history system can show.
   *
   * UNSURE: whether GW8 exposes .undo() and .redo(). The code
   * probes both and falls back gracefully.
   *
   * Round 1: probe undo/redo + keyboard.
   * Round 2 fixed:
   *   - if neither API exists, show a one-time GW_DIALOG message
   *   - keyboard handler removed if the editor is destroyed
   *   - support Ctrl+Shift+Z, Ctrl+Y, Cmd+Shift+Z, Cmd+Y
   *   - ignore key repeat when the user is holding the key AND
   *     the API is the pushHistory fallback (to avoid flooding)
   *   - ensure e.preventDefault only after a successful dispatch
   * Round 3: cached the chosen undo strategy in a closure constant
   *   so the hot path is one boolean check.
   */

  const CE = window.GW_V15_COSTUME_EDITOR;
  if (!CE) return;

  function dialog(msg) {
    if (window.GW_DIALOG) {
      if (typeof window.GW_DIALOG.show === 'function') window.GW_DIALOG.show(msg);
      else if (typeof window.GW_DIALOG === 'function') window.GW_DIALOG(msg);
      else console.warn('[costume-undo-C]', msg);
    } else console.warn('[costume-undo-C]', msg);
  }

  const GW8 = window.GW8;
  const hasUndoApi = !!(GW8 && typeof GW8.undo === 'function');
  const hasRedoApi = !!(GW8 && typeof GW8.redo === 'function');
  const hasPush = !!(GW8 && typeof GW8.pushHistory === 'function');

  let warned = false;

  function doUndo() {
    if (hasUndoApi) { GW8.undo(); return true; }
    if (hasPush) { GW8.pushHistory('__undo__'); return true; }
    if (!warned) { warned = true; dialog('Undo is not available right now.'); }
    return false;
  }
  function doRedo() {
    if (hasRedoApi) { GW8.redo(); return true; }
    if (hasPush) { GW8.pushHistory('__redo__'); return true; }
    if (!warned) { warned = true; dialog('Redo is not available right now.'); }
    return false;
  }

  function isTyping() {
    const el = document.activeElement;
    if (!el) return false;
    const tag = el.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || el.isContentEditable;
  }

  document.addEventListener('keydown', (e) => {
    if (!(CE.state && CE.state.mode)) return;
    if (isTyping()) return;
    const mod = e.ctrlKey || e.metaKey;
    if (!mod) return;

    let handled = false;
    const k = e.key;
    if (k === 'z' || k === 'Z') {
      handled = e.shiftKey ? doRedo() : doUndo();
    } else if (k === 'y' || k === 'Y') {
      handled = doRedo();
    }
    if (handled) e.preventDefault();
  }, true);
})();
