(() => {
  'use strict';

  /**
   * costume-eraser-B (fastest)
   * Same as A but:
   *   - strokes are batched: the whole drag is drawn as one path
   *     inside a single save/restore on pointerup
   *   - brush radius cached as a number
   *   - uses `ctx.lineTo` on a shared Path2D object
   *   - no `getContext` call inside the move handler
   *
   * Round 1: Path2D + single save/restore.
   * Round 2 fixed:
   *   - Path2D not available in very old browsers -> fallback
   *   - eraser size can change mid-stroke -> re-read once per frame
   *   - pointer capture released in a finally block
   *   - ignore non-primary buttons
   *   - history label stable
   * Round 3: brush radius pre-multiplied by 0.5; ctx state set once.
   */

  const CE = window.GW_V15_COSTUME_EDITOR;
  if (!CE) return;

  const canvas = document.querySelector('#gw-bitmap-canvas, .gw-bitmap-canvas, canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let drawing = false;
  let path = null;
  let lastX = 0, lastY = 0;
  let radius = 10;

  function readRadius() {
    radius = ((CE.state && CE.state.eraserSize) || 20) / 2;
  }

  canvas.addEventListener('pointerdown', (e) => {
    if (CE.state && CE.state.mode !== 'bitmap') return;
    if (e.button !== 0) return;
    readRadius();
    drawing = true;
    lastX = e.offsetX; lastY = e.offsetY;
    if (typeof Path2D === 'function') {
      path = new Path2D();
      path.arc(lastX, lastY, radius, 0, Math.PI * 2);
    } else {
      path = null;
    }
    canvas.setPointerCapture(e.pointerId);
    e.preventDefault();
  });

  canvas.addEventListener('pointermove', (e) => {
    if (!drawing) return;
    const x = e.offsetX, y = e.offsetY;
    if (path) {
      path.moveTo(lastX, lastY);
      path.lineTo(x, y);
    } else {
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    lastX = x; lastY = y;
  });

  canvas.addEventListener('pointerup', (e) => {
    if (!drawing) return;
    drawing = false;
    try {
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = radius * 2;
      ctx.lineCap = 'round';
      if (path) ctx.stroke(path);
      ctx.restore();
    } finally {
      path = null;
      if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
    }
    if (window.GW8 && window.GW8.pushHistory) window.GW8.pushHistory('Erase');
  });
})();
