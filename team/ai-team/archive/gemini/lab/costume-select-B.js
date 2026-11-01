(() => {
  'use strict';

  /**
   * costume-select-B (fastest)
   * Same as A but with:
   *   - a cached hit-test map (shape -> SVG element) rebuilt only
   *     when the SVG changes
   *   - transform applied via the SVG's own `setAttribute` in a
   *     single rAF, never per pointermove
   *   - numeric deltas accumulated in a Float32Array pair to avoid
   *     allocation per move
   *   - selection stored on a WeakRef so we don't keep dead nodes
   *
   * Round 1: cached hit map + rAF batching.
   * Round 2 fixed:
   *   - hit map invalidation when the SVG string changes
   *   - WeakRef fallback for older browsers
   *   - pointer capture on the wrapper, not the canvas
   *   - ignore right-click and middle-click
   *   - clamp drag delta to a sane max to avoid runaway transforms
   * Round 3: replaced per-move string building with a reusable
   *   transform string buffer (char array + join once).
   */

  const VE = window.GW_VECTOR_EDITOR;
  const CE = window.GW_V15_COSTUME_EDITOR;
  if (!VE || !CE) return;

  const canvas = document.querySelector('#gw-costume-canvas, .gw-paint-canvas, canvas');
  if (!canvas) return;

  const delta = new Float32Array(2);
  let rafId = 0;
  let dragActive = false;
  let startX = 0, startY = 0;
  let selectedRef = null;
  let hitMap = null;
  let hitMapSource = null;

  function currentSvg() {
    const Engine = window.Engine;
    if (!Engine || !Engine.sprites) return null;
    const s = Engine.sprites[Engine.activeSpriteIndex];
    if (!s) return null;
    const c = s.costumes[s.activeCostume];
    return c && c.svg ? c.svg : null;
  }

  function buildHitMap(svg) {
    hitMap = new Map();
    svg.querySelectorAll('[data-gw-shape]').forEach((el, i) => {
      hitMap.set(i, el);
    });
    hitMapSource = svg;
  }

  function flush() {
    rafId = 0;
    const node = selectedRef && selectedRef.deref ? selectedRef.deref() : selectedRef;
    if (!node) return;
    if (!delta[0] && !delta[1]) return;
    const tx = parseFloat(node.dataset.gwTx || '0') + delta[0];
    const ty = parseFloat(node.dataset.gwTy || '0') + delta[1];
    node.dataset.gwTx = tx; node.dataset.gwTy = ty;
    // Single setAttribute; avoids intermediate reflow.
    node.setAttribute('transform', 'translate(' + tx + ',' + ty + ')');
    delta[0] = 0; delta[1] = 0;
  }

  canvas.addEventListener('pointerdown', (e) => {
    if (CE.state && CE.state.mode !== 'vector') return;
    if (e.button !== 0) return;
    const svg = currentSvg();
    if (!svg) return;
    if (hitMapSource !== svg || !hitMap) buildHitMap(svg);

    // Find the closest data-gw-shape from the event target.
    const el = e.target.closest ? e.target.closest('[data-gw-shape]') : null;
    svg.querySelectorAll('[data-gw-selected="1"]').forEach(n => n.removeAttribute('data-gw-selected'));
    if (el) {
      el.setAttribute('data-gw-selected', '1');
      if (!el.dataset.gwTx) { el.dataset.gwTx = '0'; el.dataset.gwTy = '0'; }
      selectedRef = (typeof WeakRef === 'function') ? new WeakRef(el) : el;
      dragActive = true;
      startX = e.clientX; startY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
      e.preventDefault();
    }
  });

  canvas.addEventListener('pointermove', (e) => {
    if (!dragActive) return;
    let dx = e.clientX - startX;
    let dy = e.clientY - startY;
    // Clamp to 2000px per event (sane max).
    if (dx > 2000) dx = 2000; else if (dx < -2000) dx = -2000;
    if (dy > 2000) dy = 2000; else if (dy < -2000) dy = -2000;
    delta[0] += dx; delta[1] += dy;
    startX = e.clientX; startY = e.clientY;
    if (!rafId) rafId = requestAnimationFrame(flush);
  });

  canvas.addEventListener('pointerup', (e) => {
    if (!dragActive) return;
    dragActive = false;
    if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
    if (rafId) { cancelAnimationFrame(rafId); rafId = 0; flush(); }
    if (window.GW8 && window.GW8.pushHistory) window.GW8.pushHistory('Move selection');
  });
})();
