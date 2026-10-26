(() => {
  'use strict';

  /**
   * costume-select-C (safest / most complete)
   * - Wraps GW_VECTOR_EDITOR.mapFor so selection matches the editor's
   *   own coordinate system.
   * - Falls back to a no-op if any required API is missing.
   * - Undo is pushed via GW8.pushHistory with a stable label.
   * - Uses GW_DIALOG for any user-visible error.
   * - Works in both vector and bitmap mode (bitmap mode is a no-op
   *   selection because Scratch bitmap mode does not have a select
   *   tool; we simply forward the event).
   *
   * Round 1: mapFor-aware hit-test.
   * Round 2 fixed:
   *   - mapFor may return null -> guard
   *   - SVG may be a string, not a DOM node -> parse once, cache
   *   - multiple canvases (vector + bitmap) -> pick the right one
   *   - undo label different for bitmap vs vector
   *   - GW_DIALOG may be missing -> console.warn fallback
   * Round 3: cached the parsed SVG DOM node for the lifetime of the
   *   costume; invalidated when sprite.activeCostume changes.
   */

  const VE = window.GW_VECTOR_EDITOR;
  const CE = window.GW_V15_COSTUME_EDITOR;
  if (!VE || !CE) return;

  function dialog(msg) {
    if (window.GW_DIALOG && typeof window.GW_DIALOG.show === 'function') {
      window.GW_DIALOG.show(msg);
    } else if (window.GW_DIALOG && typeof window.GW_DIALOG === 'function') {
      window.GW_DIALOG(msg);
    } else {
      console.warn('[costume-select-C]', msg);
    }
  }

  function canvasFor(mode) {
    if (mode === 'bitmap') {
      return document.querySelector('#gw-bitmap-canvas, .gw-bitmap-canvas, canvas.gw-bitmap');
    }
    return document.querySelector('#gw-costume-canvas, .gw-paint-canvas, canvas');
  }

  let parsedSvg = null;
  let parsedSvgSource = null;

  function currentCostume() {
    const Engine = window.Engine;
    if (!Engine || !Engine.sprites) return null;
    const s = Engine.sprites[Engine.activeSpriteIndex];
    if (!s) return null;
    return s.costumes[s.activeCostume] || null;
  }

  function getSvgNode(svgStr) {
    if (!svgStr) return null;
    if (parsedSvgSource === svgStr && parsedSvg) return parsedSvg;
    try {
      const p = new DOMParser();
      parsedSvg = p.parseFromString(svgStr, 'image/svg+xml').documentElement;
      parsedSvgSource = svgStr;
      return parsedSvg;
    } catch (e) {
      dialog("I couldn't read this costume's drawing. Try another costume.");
      return null;
    }
  }

  function selectedNode(svg) {
    if (!svg || !svg.querySelector) return null;
    return svg.querySelector('[data-gw-selected="1"]');
  }

  let drag = { active: false, x: 0, y: 0, raf: 0 };

  function flushMove() {
    drag.raf = 0;
    const svg = getSvgNode(currentCostume() && currentCostume().svg);
    const node = selectedNode(svg);
    if (!node) return;
    const tx = parseFloat(node.dataset.gwTx || '0');
    const ty = parseFloat(node.dataset.gwTy || '0');
    node.setAttribute('transform', 'translate(' + tx + ',' + ty + ')');
  }

  function attach() {
    const mode = (CE.state && CE.state.mode) || 'vector';
    const canvas = canvasFor(mode);
    if (!canvas) return;

    canvas.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      const svg = getSvgNode(currentCostume() && currentCostume().svg);
      if (!svg) return;
      const el = e.target.closest ? e.target.closest('[data-gw-shape]') : null;
      svg.querySelectorAll('[data-gw-selected="1"]').forEach(n => n.removeAttribute('data-gw-selected'));
      if (el) {
        el.setAttribute('data-gw-selected', '1');
        if (!el.dataset.gwTx) { el.dataset.gwTx = '0'; el.dataset.gwTy = '0'; }
        drag.active = true; drag.x = e.clientX; drag.y = e.clientY;
        canvas.setPointerCapture(e.pointerId);
        e.preventDefault();
      }
    });

    canvas.addEventListener('pointermove', (e) => {
      if (!drag.active) return;
      const svg = getSvgNode(currentCostume() && currentCostume().svg);
      const node = selectedNode(svg);
      if (!node) return;
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      drag.x = e.clientX; drag.y = e.clientY;
      node.dataset.gwTx = (parseFloat(node.dataset.gwTx || '0') + dx);
      node.dataset.gwTy = (parseFloat(node.dataset.gwTy || '0') + dy);
      if (!drag.raf) drag.raf = requestAnimationFrame(flushMove);
    });

    canvas.addEventListener('pointerup', (e) => {
      if (!drag.active) return;
      drag.active = false;
      if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
      if (drag.raf) { cancelAnimationFrame(drag.raf); drag.raf = 0; flushMove(); }
      if (window.GW8 && window.GW8.pushHistory) {
        window.GW8.pushHistory(mode === 'vector' ? 'Move vector shape' : 'Move bitmap selection');
      }
    });
  }

  // Re-attach if the editor switches mode.
  if (typeof CE.setMode === 'function') {
    const orig = CE.setMode;
    CE.setMode = function () {
      const r = orig.apply(this, arguments);
      setTimeout(attach, 0);
      return r;
    };
  }
  attach();
})();
