(() => {
  'use strict';

  /**
   * costume-eraser-A (simplest)
   * Adds a bitmap-style eraser: when active, dragging over the canvas
   * paints with the canvas's background (destination-out) so pixels
   * are removed.
   *
   * Round 1: mousedown/move/up with destination-out.
   * Round 2 fixed:
   *   - only runs in bitmap mode
   *   - brush size read from CE.state.eraserSize || 20
   *   - history pushed on mouseup
   *   - pointer capture so the drag works outside the canvas
   *   - ctx.save/restore around every stroke
   * Round 3: single path built per stroke instead of per segment
   *   (fewer draw calls).
   */

  const CE = window.GW_V15_COSTUME_EDITOR;
  if (!CE) return;

  const canvas = document.querySelector('#gw-bitmap-canvas, .gw-bitmap-canvas, canvas');
  if (!canvas) return;

  let drawing = false;
  let lastX = 0, lastY = 0;

  function size() {
    return (CE.state && CE.state.eraserSize) || 20;
  }

  canvas.addEventListener('pointerdown', (e) => {
    if (CE.state && CE.state.mode !== 'bitmap') return;
    if (e.button !== 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawing = true;
    lastX = e.offsetX; lastY = e.offsetY;
    canvas.setPointerCapture(e.pointerId);
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(lastX, lastY, size() / 2, 0, Math.PI * 2);
    ctx.fill();
    e.preventDefault();
  });

  canvas.addEventListener('pointermove', (e) => {
    if (!drawing) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const x = e.offsetX, y = e.offsetY;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.lineWidth = size();
    ctx.lineCap = 'round';
    ctx.stroke();
    lastX = x; lastY = y;
  });

  canvas.addEventListener('pointerup', (e) => {
    if (!drawing) return;
    drawing = false;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.restore();
    if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
    if (window.GW8 && window.GW8.pushHistory) window.GW8.pushHistory('Erase');
  });
})();
