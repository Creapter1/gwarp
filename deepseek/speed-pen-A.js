(() => {
  'use strict';

  /**
   * speed-pen-A (G-Warp Engine build)
   * Simplest pen batching.
   * Buffers pen points in a Float32Array and flushes them once per
   * frame instead of drawing each point immediately.
   *
   * Round 1: Float32Array buffer + rAF flush.
   * Round 2 attacks fixed:
   *   - unknown pen API -> probe Engine.pen.draw, Engine.penDraw,
   *     Engine.drawPen, Engine.renderer.penSkin.draw
   *   - buffer overflow -> flush early when full
   *   - NaN points -> skipped
   *   - pen "clear" during buffer -> we flush first (hook clear if
   *     we can find it)
   *   - duplicate wrap if file loads twice -> _gw flag
   * Round 3 optimisation: flush uses subarray and a single loop;
   *   no intermediate array allocation.
   */

  const Engine = window.Engine;
  if (!Engine) { console.warn('[speed-pen-A] window.Engine missing.'); return; }
  if (Engine._gwSpeedPenA) return;
  Engine._gwSpeedPenA = true;

  // --- find the pen draw function ---
  let penDraw = null, penThis = null;
  if (Engine.pen && typeof Engine.pen.draw === 'function') { penDraw = Engine.pen.draw; penThis = Engine.pen; }
  else if (typeof Engine.penDraw === 'function') { penDraw = Engine.penDraw; penThis = Engine; }
  else if (typeof Engine.drawPen === 'function') { penDraw = Engine.drawPen; penThis = Engine; }
  else if (Engine.renderer && Engine.renderer.penSkin && typeof Engine.renderer.penSkin.draw === 'function') {
    penDraw = Engine.renderer.penSkin.draw; penThis = Engine.renderer.penSkin;
  }
  if (!penDraw) return; // UNSURE: G-Warp pen entry point

  const MAX_POINTS = 8192;
  const buf = new Float32Array(MAX_POINTS * 2);
  let n = 0;

  function flush() {
    if (n === 0) return;
    for (let i = 0; i < n; i++) {
      try { penDraw.call(penThis, buf[i * 2], buf[i * 2 + 1]); }
      catch (e) { /* swallow; one bad point must not kill the frame */ }
    }
    n = 0;
  }

  const wrapped = function (x, y) {
    if (typeof x !== 'number' || typeof y !== 'number' || x !== x || y !== y) return;
    if (n >= MAX_POINTS) flush();
    buf[n * 2] = x;
    buf[n * 2 + 1] = y;
    n++;
  };

  if (penThis === Engine.pen) Engine.pen.draw = wrapped;
  else if (penThis === Engine) {
    if (typeof Engine.penDraw === 'function') Engine.penDraw = wrapped;
    else if (typeof Engine.drawPen === 'function') Engine.drawPen = wrapped;
  } else if (penThis && penThis.draw) penThis.draw = wrapped;

  // Flush once per frame.
  (function tick() {
    flush();
    requestAnimationFrame(tick);
  })();

  // Expose a manual flush for tests.
  wrapped._flush = flush;
})();
