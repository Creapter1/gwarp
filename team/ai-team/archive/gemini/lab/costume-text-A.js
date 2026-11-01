(() => {
  'use strict';

  /**
   * costume-text-A (simplest)
   * Adds a floating text input over the canvas. When the user
   * presses Enter, the text is turned into an SVG <text> element
   * appended to the costume's SVG.
   *
   * Round 1: overlay input + SVG <text>.
   * Round 2 fixed:
   *   - input is removed when the user clicks away
   *   - font family is read from CE.state (fallback to sans-serif)
   *   - font size is read from CE.state or defaults to 24
   *   - text colour matches the current fill colour
   *   - history pushed once per committed text
   *   - empty text does not create an element
   * Round 3: uses a single textarea element created once and reused,
   *   so no DOM churn per commit.
   */

  const CE = window.GW_V15_COSTUME_EDITOR;
  if (!CE) return;

  const ta = document.createElement('textarea');
  ta.style.cssText = 'position:fixed;z-index:99999;background:#0b0b14;color:#4ade80;border:2px solid #8b5cf6;border-radius:6px;padding:6px;font-size:16px;display:none;';
  ta.rows = 2;
  document.body.appendChild(ta);

  let anchor = { x: 0, y: 0 };

  function currentCostume() {
    const E = window.Engine;
    if (!E || !E.sprites) return null;
    const sp = E.sprites[E.activeSpriteIndex];
    return sp ? sp.costumes[sp.activeCostume] : null;
  }

  function commitText() {
    const txt = ta.value.trim();
    if (!txt) { ta.style.display = 'none'; ta.value = ''; return; }
    const c = currentCostume();
    if (!c || !c.svg) { ta.style.display = 'none'; return; }

    const doc = new DOMParser().parseFromString(c.svg, 'image/svg+xml');
    const svg = doc.documentElement;
    const el = doc.createElementNS('http://www.w3.org/2000/svg', 'text');
    el.setAttribute('x', String(anchor.x));
    el.setAttribute('y', String(anchor.y));
    el.setAttribute('font-family', (CE.state && CE.state.font) || 'sans-serif');
    el.setAttribute('font-size', String((CE.state && CE.state.fontSize) || 24));
    el.setAttribute('fill', (CE.state && (CE.state.fillColor || CE.state.fill)) || '#000000');
    el.setAttribute('data-gw-shape', '1');
    el.textContent = txt;
    svg.appendChild(el);
    c.svg = new XMLSerializer().serializeToString(svg);

    ta.style.display = 'none';
    ta.value = '';
    if (window.GW8 && window.GW8.pushHistory) window.GW8.pushHistory('Add text');
  }

  ta.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); commitText(); }
    if (e.key === 'Escape') { ta.style.display = 'none'; ta.value = ''; }
  });

  document.addEventListener('click', (e) => {
    const canvas = document.querySelector('canvas');
    if (!canvas || e.target !== canvas) { ta.style.display = 'none'; return; }
    // Place the text input near the click.
    anchor.x = e.offsetX || e.clientX;
    anchor.y = e.offsetY || e.clientY;
    ta.style.left = e.clientX + 'px';
    ta.style.top = e.clientY + 'px';
    ta.style.display = 'block';
    ta.focus();
  });
})();
