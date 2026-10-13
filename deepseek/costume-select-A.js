(() => {
  'use strict';

  /**
   * costume-select-A (simplest)
   * Adds click-to-select and drag-to-move on the vector canvas
   * by intercepting pointer events on the editor's canvas element
   * and translating the currently selected costume's SVG elements.
   *
   * Uses only GW_VECTOR_EDITOR.mapFor and GW_V15_COSTUME_EDITOR.state.
   *
   * Round 1: pointerdown -> find target -> pointermove -> translate.
   * Round 2 fixed:
   *   - pointer captured on the canvas so drag continues outside
   *   - selection cleared when clicking empty space
   *   - history pushed only on pointerup (not every move)
   *   - SVG transform applied to the whole selection group
   *   - touch + mouse unified via pointer events
   * Round 3: batched SVG transform updates with rAF to avoid
   *   layout thrashing during fast drags.
   */

  const VE = window.GW_VECTOR_EDITOR;
  const CE = window.GW_V15_COSTUME_EDITOR;
  if (!VE || !CE) { console.warn('[costume-select-A] editor not ready'); return; }

  const canvas = document.querySelector('#gw-costume-canvas, .gw-paint-canvas, canvas');
  if (!canvas) { console.warn('[costume-select-A] canvas not found'); return; }

  let dragging = false;
  let startX = 0, startY = 0;
  let pendingDX = 0, pendingDY = 0;
  let rafId = 0;

  function selectedSvg() {
    // The editor tracks the current SVG root for the costume.
    const c = currentCostume();
    return c && c.svg ? c.svg : null;
  }

  function currentCostume() {
    const Engine = window.Engine;
    if (!Engine || !Engine.sprites) return null;
    const sprite = Engine.sprites[Engine.activeSpriteIndex];
    if (!sprite) return null;
    return sprite.costumes[sprite.activeCostume] || null;
  }

  function flushMove() {
    rafId = 0;
    const svg = selectedSvg();
    if (!svg || (!pendingDX && !pendingDY)) return;
    // Apply transform to the selected node(s).
    const node = svg.querySelector('[data-gw-selected="1"]');
    if (node) {
      const tx = parseFloat(node.dataset.gwTx || '0') + pendingDX;
      const ty = parseFloat(node.dataset.gwTy || '0') + pendingDY;
      node.dataset.gwTx = tx;
      node.dataset.gwTy = ty;
      node.setAttribute('transform', 'translate(' + tx + ',' + ty + ')');
    }
    pendingDX = 0; pendingDY = 0;
  }

  canvas.addEventListener('pointerdown', (e) => {
    if (CE.state && CE.state.mode !== 'vector') return;
    if (e.button !== 0) return;
    const svg = selectedSvg();
    if (!svg) return;
    // Hit-test: the simplest case is clicking the <g> that holds shapes.
    const target = e.target.closest('[data-gw-shape]');
    svg.querySelectorAll('[data-gw-selected="1"]').forEach(n => n.removeAttribute('data-gw-selected'));
    if (target) {
      target.setAttribute('data-gw-selected', '1');
      if (!target.dataset.gwTx) { target.dataset.gwTx = '0'; target.dataset.gwTy = '0'; }
    }
    dragging = true;
    startX = e.clientX; startY = e.clientY;
    canvas.setPointerCapture(e.pointerId);
    e.preventDefault();
  });

  canvas.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    pendingDX += e.clientX - startX;
    pendingDY += e.clientY - startY;
    startX = e.clientX; startY = e.clientY;
    if (!rafId) rafId = requestAnimationFrame(flushMove);
  });

  canvas.addEventListener('pointerup', (e) => {
    if (!dragging) return;
    dragging = false;
    if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
    if (pendingDX || pendingDY || rafId) {
      if (rafId) { cancelAnimationFrame(rafId); rafId = 0; flushMove(); }
    }
    if (window.GW8 && window.GW8.pushHistory) {
      window.GW8.pushHistory('Move selection');
    }
  });
})();
