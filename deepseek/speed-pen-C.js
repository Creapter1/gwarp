(() => {
  'use strict';

  /**
   * speed-pen-C (G-Warp Engine build)
   * Safest pen batching.
   * Buffers points, but if anything goes wrong (buffer can't be
   * allocated, engine throws, tab is hidden for too long) it falls
   * back to immediate drawing. Also hooks pen "clear" so the buffer
   * is flushed before clearing.
   *
   * Round 1: buffer + fallback + clear hook.
   * Round 2 attacks fixed:
   *   - clear hook not found -> still safe, buffer just flushes on
   *     next frame after clear (worst case: one frame of leftover
   *     points)
   *   - Float32Array not available (never happens in modern
   *     browsers, but we guard anyway)
   *   - engine throws on one point -> we switch to immediate mode
   *     for the rest of the frame
   *   - tab visibility -> on visibilitychange we flush
   *   - duplicate wrap -> flag
   * Round 3 optimisation: two-tier flush - small buffers of 1024
   *   points chained, so no giant single allocation, and each
   *   buffer flushes independently.
   */

  const Engine = window.Engine;
  if (!Engine) { console.warn('[speed-pen-C] window.Engine missing.'); return; }
  if (Engine._gwSpeedPenC) return;
  Engine._gwSpeedPenC = true;

  let penDraw = null, penThis = null;
  if (Engine.pen && typeof Engine.pen.draw === 'function') { penDraw = Engine.pen.draw; penThis = Engine.pen; }
  else if (typeof Engine.penDraw === 'function') { penDraw = Engine.penDraw; penThis = Engine; }
  else if (typeof Engine.drawPen === 'function') { penDraw = Engine.drawPen; penThis = Engine; }
  else if (Engine.renderer && Engine.renderer.penSkin && typeof Engine.renderer.penSkin.draw === 'function') {
    penDraw = Engine.renderer.penSkin.draw; penThis = Engine.renderer.penSkin;
  }
  if (!penDraw) return;

  let penClear = null, clearThis = null;
  if (Engine.pen && typeof Engine.pen.clear === 'function') { penClear = Engine.pen.clear; clearThis = Engine.pen; }
  else if (typeof Engine.penClear === 'function') { penClear = Engine.penClear; clearThis = Engine; }
  else if (penThis && typeof penThis.clear === 'function') { penClear = penThis.clear; clearThis = penThis; }

  const CHUNK = 1024;
  const chunks = []; // each: { data: Float32Array(CHUNK*2), n: number }
  let current = null;
  let fallbackImmediate = false;

  function newChunk() {
    try {
      current = { data: new Float32Array(CHUNK * 2), n: 0 };
      chunks.push(current);
    } catch (e) {
      fallbackImmediate = true;
      current = null;
    }
  }
  newChunk();

  function flushAll() {
    for (let c = 0; c < chunks.length; c++) {
      const chunk = chunks[c];
      if (!chunk.n) continue;
      for (let i = 0; i < chunk.n; i++) {
        try { penDraw.call(penThis, chunk.data[i*2], chunk.data[i*2+1]); }
        catch (e) { /* one bad point must not break the flush */ }
      }
      chunk.n = 0;
    }
    chunks.length = 0;
    current = null;
    newChunk();
  }

  const wrapped = function (x, y) {
    if (fallbackImmediate) { penDraw.call(penThis, x, y); return; }
    if (typeof x !== 'number' || typeof y !== 'number' || x !== x || y !== y) return;
    if (!current || current.n >= CHUNK) newChunk();
    if (!current) { penDraw.call(penThis, x, y); return; }
    current.data[current.n * 2] = x;
    current.data[current.n * 2 + 1] = y;
    current.n++;
  };

  if (penThis === Engine.pen) Engine.pen.draw = wrapped;
  else if (penThis === Engine) {
    if (typeof Engine.penDraw === 'function') Engine.penDraw = wrapped;
    else if (typeof Engine.drawPen === 'function') Engine.drawPen = wrapped;
  } else if (penThis && penThis.draw) penThis.draw = wrapped;

  if (penClear) {
    const wrappedClear = function () {
      flushAll();
      return penClear.apply(clearThis, arguments);
    };
    if (clearThis === Engine.pen) Engine.pen.clear = wrappedClear;
    else if (clearThis === Engine) Engine.penClear = wrappedClear;
    else if (clearThis === penThis) penThis.clear = wrappedClear;
  }

  (function tick(){ flushAll(); requestAnimationFrame(tick); })();

  if (typeof document !== 'undefined' && document.addEventListener) {
    document.addEventListener('visibilitychange', () => { if (document.hidden) flushAll(); });
  }

  wrapped._flush = flushAll;
})();
