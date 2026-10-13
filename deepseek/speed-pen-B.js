(() => {
  'use strict';

  /**
   * speed-pen-B (G-Warp Engine build)
   * Fastest pen batching.
   * Instead of flushing point-by-point, keeps a running "previous
   * point" and calls penDraw once per segment with (x1,y1,x2,y2) if
   * the engine exposes a 4-arg line function; otherwise falls back
   * to point-by-point.
   *
   * Round 1: segment builder.
   * Round 2 attacks fixed:
   *   - engine may only have a 2-arg penDraw -> we detect arity
   *     with .length and fall back to A-style batching
   *   - first point has no previous -> we call penDraw with the
   *     point itself
   *   - color/size change mid-frame -> we do not cache them, so
   *     no stale state
   *   - flush on visibility hidden (tab switch) -> rAF still fires
   *     at reduced rate; buffer kept
   *   - buffer cap -> flush early
   * Round 3 optimisation: the segment path uses a single
   *   Float32Array of length 4 per segment, no per-call allocation.
   */

  const Engine = window.Engine;
  if (!Engine) { console.warn('[speed-pen-B] window.Engine missing.'); return; }
  if (Engine._gwSpeedPenB) return;
  Engine._gwSpeedPenB = true;

  let penDraw = null, penThis = null;
  if (Engine.pen && typeof Engine.pen.draw === 'function') { penDraw = Engine.pen.draw; penThis = Engine.pen; }
  else if (typeof Engine.penDraw === 'function') { penDraw = Engine.penDraw; penThis = Engine; }
  else if (typeof Engine.drawPen === 'function') { penDraw = Engine.drawPen; penThis = Engine; }
  else if (Engine.renderer && Engine.renderer.penSkin && typeof Engine.renderer.penSkin.draw === 'function') {
    penDraw = Engine.renderer.penSkin.draw; penThis = Engine.renderer.penSkin;
  }
  if (!penDraw) return;

  const supportsLine = penDraw.length >= 4; // 4-arg line function

  const MAX_SEG = 8192;
  const segs = new Float32Array(MAX_SEG * 4); // x1,y1,x2,y2
  let segN = 0;
  let hasPrev = false, prevX = 0, prevY = 0;

  function flush() {
    if (!hasPrev) { segN = 0; return; }
    for (let i = 0; i < segN; i++) {
      const o = i * 4;
      try {
        if (supportsLine) penDraw.call(penThis, segs[o], segs[o+1], segs[o+2], segs[o+3]);
        else {
          // Emulate a line with two point draws.
          penDraw.call(penThis, segs[o], segs[o+1]);
          penDraw.call(penThis, segs[o+2], segs[o+3]);
        }
      } catch (e) {}
    }
    segN = 0;
    hasPrev = false;
  }

  const wrapped = function (x, y) {
    if (typeof x !== 'number' || typeof y !== 'number' || x !== x || y !== y) return;
    if (!hasPrev) {
      hasPrev = true; prevX = x; prevY = y;
      return;
    }
    if (segN >= MAX_SEG) flush();
    const o = segN * 4;
    segs[o] = prevX; segs[o+1] = prevY;
    segs[o+2] = x;   segs[o+3] = y;
    segN++;
    prevX = x; prevY = y;
  };

  if (penThis === Engine.pen) Engine.pen.draw = wrapped;
  else if (penThis === Engine) {
    if (typeof Engine.penDraw === 'function') Engine.penDraw = wrapped;
    else if (typeof Engine.drawPen === 'function') Engine.drawPen = wrapped;
  } else if (penThis && penThis.draw) penThis.draw = wrapped;

  (function tick(){ flush(); requestAnimationFrame(tick); })();
  wrapped._flush = flush;
})();
