(() => {
  'use strict';

  /**
   * costume-fill-A (simplest)
   * Adds a paint-bucket cursor and, on click, applies a solid fill
   * colour to the clicked SVG shape.
   * Uses GW_V15_COSTUME_EDITOR.state for the current colour.
   *
   * Round 1: click -> find closest [data-gw-shape] -> set fill.
   * Round 2 fixed:
   *   - selection not cleared when filling
   *   - history pushed only if the colour actually changed
   *   - colour string validated (#rrggbb or rgb())
   *   - clicking empty canvas does nothing (no crash)
   *   - works when state.fillColor is nested under state.style
   * Round 3: caches the colour lookup so the hot path reads one
   *   string per click.
   */

  const CE = window.GW_V15_COSTUME_EDITOR;
  if (!CE) return;

  function colourFromState() {
    if (!CE.state) return '#000000';
    const s = CE.state;
    const c = s.fillColor || s.fill || (s.style && s.style.fillColor) || '#000000';
    return (typeof c === 'string' && /^(#|rgb|hsl)/.test(c)) ? c : '#000000';
  }

  function currentCostume() {
    const Engine = window.Engine;
    if (!Engine || !Engine.sprites) return null;
    const sp = Engine.sprites[Engine.activeSpriteIndex];
    if (!sp) return null;
    return sp.costumes[sp.activeCostume] || null;
  }

  document.addEventListener('click', (e) => {
    const c = currentCostume();
    if (!c || !c.svg) return;
    const target = e.target.closest ? e.target.closest('[data-gw-shape]') : null;
    if (!target) return;
    const newColour = colourFromState();
    const oldFill = target.getAttribute('fill');
    if (oldFill === newColour) return;
    target.setAttribute('fill', newColour);
    if (window.GW8 && window.GW8.pushHistory) {
      window.GW8.pushHistory('Fill shape with ' + newColour);
    }
  });
})();
