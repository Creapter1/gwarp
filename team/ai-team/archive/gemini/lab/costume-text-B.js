(() => {
  'use strict';

  /**
   * costume-text-B (fastest)
   * Same as A but:
   *   - the SVG is parsed and serialised only once per commit
   *     (uses a cached DOMParser instance)
   *   - the textarea is positioned with transform: translate3d
   *     (GPU-composited, no layout thrash)
   *   - the text colour and font are cached in a small object that is
   *     refreshed only when CE.state changes reference
   *
   * Round 1: cached parser + GPU transform.
   * Round 2 fixed:
   *   - state reference comparison
   *   - parser cache must be per-document (DOMParser is stateless
   *     in practice, but we keep one instance)
   *   - anchor stored as numbers, not strings
   *   - Shift+Enter inserts a newline (multiline text)
   *   - Escape restores the previous SVG string untouched
   * Round 3: colour/font cached as a single frozen object; the hot
   *   path reads two properties.
   */

  const CE = window.GW_V15_COSTUME_EDITOR;
  if (!CE) return;

  const parser = new DOMParser();
  const serializer = new XMLSerializer();

  const ta = document.createElement('textarea');
  ta.style.cssText = 'position:fixed;z-index:99999;background:#0b0b14;color:#4ade80;border:2px solid #8b5cf6;border-radius:6px;padding:6px;font-size:16px;display:none;will-change:transform;';
  ta.rows = 2;
  document.body.appendChild(ta);

  let anchorX = 0, anchorY = 0;
  let lastState = null;
  let cached = { font: 'sans-serif', size: '24', colour: '#000000' };

  function refreshStyle() {
    if (CE.state === lastState) return;
    lastState = CE.state;
    const s = lastState || {};
    cached = {
      font: s.font || 'sans-serif',
      size: String(s.fontSize || 24),
      colour: s.fillColor || s.fill || '#000000'
    };
  }

  function currentCostume() {
    const E = window.Engine;
    if (!E || !E.sprites) return null;
    const sp = E.sprites[E.activeSpriteIndex];
    return sp ? sp.costumes[sp.activeCostume] : null;
  }

  function commit() {
    const txt = ta.value;
    if (!txt.trim()) { hide(); return; }
    const c = currentCostume();
    if (!c || !c.svg) { hide(); return; }
    refreshStyle();
    const doc = parser.parseFromString(c.svg, 'image/svg+xml');
    const svg = doc.documentElement;
    const el = doc.createElementNS('http://www.w3.org/2000/svg', 'text');
    el.setAttribute('x', String(anchorX));
    el.setAttribute('y', String(anchorY));
    el.setAttribute('font-family', cached.font);
    el.setAttribute('font-size', cached.size);
    el.setAttribute('fill', cached.colour);
    el.setAttribute('data-gw-shape', '1');
    // Support multiline by splitting into <tspan> children.
    const lines = txt.split('\n');
    if (lines.length === 1) {
      el.textContent = txt;
    } else {
      lines.forEach((line, i) => {
        const tspan = doc.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        tspan.setAttribute('x', String(anchorX));
        tspan.setAttribute('dy', i === 0 ? '0' : '1.2em');
        tspan.textContent = line;
        el.appendChild(tspan);
      });
    }
    svg.appendChild(el);
    c.svg = serializer.serializeToString(svg);
    hide();
    if (window.GW8 && window.GW8.pushHistory) window.GW8.pushHistory('Add text');
  }

  function hide() { ta.style.display = 'none'; ta.value = ''; }

  ta.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); commit(); }
    else if (e.key === 'Escape') { hide(); }
  });

  document.addEventListener('click', (e) => {
    const canvas = document.querySelector('canvas');
    if (!canvas || e.target !== canvas) { hide(); return; }
    anchorX = e.offsetX || e.clientX;
    anchorY = e.offsetY || e.clientY;
    ta.style.transform = 'translate3d(' + e.clientX + 'px,' + e.clientY + 'px,0)';
    ta.style.left = '0'; ta.style.top = '0';
    ta.style.display = 'block';
    ta.focus();
  });
})();
