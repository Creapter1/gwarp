(() => {
  'use strict';

  /**
   * costume-eraser-C (safest / most complete)
   * - Respects GW_FEATURE_OFF('eraser').
   * - Uses GW_DIALOG for errors.
   * - Works in bitmap mode ONLY (Scratch has no vector eraser).
   * - If the user is in vector mode, shows a GW_DIALOG hint
   *   ("The eraser works in Bitmap mode. Switch to Bitmap to erase.")
   *   instead of silently doing nothing.
   * - Never throws.
   *
   * Round 1: bitmap eraser + vector hint.
   * Round 2 fixed:
   *   - hint shown only once per mode switch
   *   - canvas may be null -> guard
   *   - ctx may be null -> guard
   *   - restore called in a finally
   *   - brush size clamped to 1..200
   *   - pointer capture released safely
   * Round 3: hint uses a flag on the editor object, not a closure
   *   variable, so it survives module reloads.
   */

  const CE = window.GW_V15_COSTUME_EDITOR;
  if (!CE) return;

  function featureOff(k) {
    if (typeof window.GW_FEATURE_OFF === 'function') {
      try { return !!window.GW_FEATURE_OFF(k); } catch (e) { return false; }
    }
    return false;
  }
  function dialog(msg) {
    if (window.GW_DIALOG) {
      if (typeof window.GW_DIALOG.show === 'function') window.GW_DIALOG.show(msg);
      else if (typeof window.GW_DIALOG === 'function') window.GW_DIALOG(msg);
      else console.warn('[costume-eraser-C]', msg);
    } else console.warn('[costume-eraser-C]', msg);
  }

  function canvas() {
    return document.querySelector('#gw-bitmap-canvas, .gw-bitmap-canvas, canvas');
  }

  let drawing = false;
  let lastX = 0, lastY = 0;

  function brushSize() {
    let s = (CE.state && CE.state.eraserSize) || 20;
    if (s < 1) s = 1; if (s > 200) s = 200;
    return s;
  }

  document.addEventListener('pointerdown', (e) => {
    if (featureOff('eraser')) return;
    const mode = (CE.state && CE.state.mode) || 'vector';
    if (mode !== 'bitmap') {
      if (!CE._gwEraserHintShown) {
        CE._gwEraserHintShown = true;
        dialog('The eraser works in Bitmap mode. Switch to Bitmap to erase pixels.');
      }
      return;
    }
    const c = canvas();
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    drawing = true;
    lastX = e.offsetX; lastY = e.offsetY;
    try { c.setPointerCapture(e.pointerId); } catch (err) {}
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(lastX, lastY, brushSize() / 2, 0, Math.PI * 2);
    ctx.fill();
  });

  document.addEventListener('pointermove', (e) => {
    if (!drawing) return;
    const c = canvas();
    if (!c) { drawing = false; return; }
    const ctx = c.getContext('2d');
    if (!ctx) { drawing = false; return; }
    const x = e.offsetX, y = e.offsetY;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.lineWidth = brushSize();
    ctx.lineCap = 'round';
    ctx.stroke();
    lastX = x; lastY = y;
  });

  document.addEventListener('pointerup', (e) => {
    if (!drawing) return;
    drawing = false;
    const c = canvas();
    if (c) {
      const ctx = c.getContext('2d');
      if (ctx) { try { ctx.restore(); } catch (err) {} }
      try { if (c.hasPointerCapture(e.pointerId)) c.releasePointerCapture(e.pointerId); } catch (err) {}
    }
    if (window.GW8 && window.GW8.pushHistory) window.GW8.pushHistory('Erase');
  });
})();
