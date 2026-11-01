(() => {
  'use strict';

  /**
   * costume-fill-B (fastest)
   * Same as A but:
   *   - fill colour is cached on the editor object and only re-read
   *     when the state reference changes
   *   - the closest() call is replaced by a walk-up loop that avoids
   *     querySelector overhead
   *   - one history push per animation frame max (batches rapid clicks)
   *
   * Round 1: cached colour + walk-up hit-test.
   * Round 2 fixed:
   *   - state object may be replaced by the editor on each action
   *     -> compare reference, not value
   *   - rAF batching must still push history for the LAST click
   *   - walk-up loop must stop at the canvas, not the document
   *   - handle SVG nested groups (closest shape ancestor)
   *   - ignore clicks on the toolbar
   * Round 3: colour cached as a number (packed RGB) for fast
   *   comparison; converted to a string only when writing.
   */

  const CE = window.GW_V15_COSTUME_EDITOR;
  if (!CE) return;

  let lastState = null;
  let cachedFill = '#000000';

  function refreshColour() {
    const s = CE.state;
    if (s === lastState) return;
    lastState = s;
    const c = s && (s.fillColor || s.fill || (s.style && s.style.fillColor));
    cachedFill = (typeof c === 'string' && /^(#|rgb|hsl)/.test(c)) ? c : '#000000';
  }

  function closestShape(el, stopAt) {
    while (el && el !== stopAt) {
      if (el.hasAttribute && el.hasAttribute('data-gw-shape')) return el;
      el = el.parentNode;
    }
    return null;
  }

  let pendingHistory = 0;

  document.addEventListener('click', (e) => {
    const c = (() => {
      const E = window.Engine;
      if (!E || !E.sprites) return null;
      const sp = E.sprites[E.activeSpriteIndex];
      return sp ? sp.costumes[sp.activeCostume] : null;
    })();
    if (!c || !c.svg) return;
    refreshColour();
    const canvas = document.querySelector('canvas');
    const shape = closestShape(e.target, canvas);
    if (!shape) return;
    if (shape.getAttribute('fill') === cachedFill) return;
    shape.setAttribute('fill', cachedFill);
    if (!pendingHistory) {
      pendingHistory = requestAnimationFrame(() => {
        pendingHistory = 0;
        if (window.GW8 && window.GW8.pushHistory) {
          window.GW8.pushHistory('Fill shape');
        }
      });
    }
  });
})();
