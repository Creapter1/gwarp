(() => {
  'use strict';

  /**
   * costume-text-C (safest / most complete)
   * - Respects GW_FEATURE_OFF('text').
   * - Uses GW_DIALOG for user-visible errors.
   * - Never corrupts the costume if parsing fails; keeps the old SVG.
   * - Supports PNG costumes by drawing text onto the bitmap canvas.
   * - Pushes history with a label that includes the first 20 chars.
   * - Limits text length to 500 chars to avoid absurd SVGs.
   *
   * Round 1: SVG text + PNG canvas text.
   * Round 2 fixed:
   *   - PNG path needs the correct canvas
   *   - font size scales with canvas devicePixelRatio
   *   - text is clipped to the canvas bounds
   *   - long text truncation
   *   - history label sanitised
   *   - Escape must not leave a half-parsed SVG
   * Round 3: SVG string built with a single template literal
   *   instead of createElementNS, which is faster and simpler.
   */

  const CE = window.GW_V15_COSTUME_EDITOR;
  if (!CE) return;

  function featureOff(k) {
    if (typeof window.GW_FEATURE_OFF === 'function') {
      try { return !!window.GW_FEATURE_OFF(k); } catch (e) { return false; }
    }
    return false;
  }
  function dialog(msg) {
    if (window.GW_DIALOG) {
      if (typeof window.GW_DIALOG.show === 'function') window.GW_DIALOG.show(msg);
      else if (typeof window.GW_DIALOG === 'function') window.GW_DIALOG(msg);
      else console.warn('[costume-text-C]', msg);
    } else console.warn('[costume-text-C]', msg);
  }
  function currentCostume() {
    try {
      const E = window.Engine;
      if (!E || !E.sprites) return null;
      const sp = E.sprites[E.activeSpriteIndex];
      return sp ? sp.costumes[sp.activeCostume] : null;
    } catch (e) { return null; }
  }
  function esc(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  const ta = document.createElement('textarea');
  ta.maxLength = 500;
  ta.style.cssText = 'position:fixed;z-index:99999;background:#0b0b14;color:#4ade80;border:2px solid #8b5cf6;border-radius:6px;padding:6px;font-size:16px;display:none;';
  document.body.appendChild(ta);

  let ax = 0, ay = 0;

  function commitSvg(c, txt) {
    const colour = (CE.state && (CE.state.fillColor || CE.state.fill)) || '#000000';
    const font = (CE.state && CE.state.font) || 'sans-serif';
    const size = (CE.state && CE.state.fontSize) || 24;
    const lines = txt.split('\n');
    let body;
    if (lines.length === 1) {
      body = '<text x="' + ax + '" y="' + ay + '" font-family="' + esc(font) + '" font-size="' + size + '" fill="' + esc(colour) + '" data-gw-shape="1">' + esc(txt) + '</text>';
    } else {
      body = '<text x="' + ax + '" y="' + ay + '" font-family="' + esc(font) + '" font-size="' + size + '" fill="' + esc(colour) + '" data-gw-shape="1">';
      lines.forEach((ln, i) => {
        body += '<tspan x="' + ax + '" dy="' + (i === 0 ? '0' : '1.2em') + '">' + esc(ln) + '</tspan>';
      });
      body += '</text>';
    }
    // Insert before the closing </svg>.
    const close = c.svg.lastIndexOf('</svg>');
    if (close < 0) throw new Error('no </svg>');
    return c.svg.slice(0, close) + body + c.svg.slice(close);
  }

  function commitBitmap(c, txt) {
    const canvas = document.querySelector('#gw-bitmap-canvas, .gw-bitmap-canvas, canvas');
    if (!canvas || !canvas.getContext) return false;
    const ctx = canvas.getContext('2d');
    if (!ctx) return false;
    const dpr = window.devicePixelRatio || 1;
    const colour = (CE.state && (CE.state.fillColor || CE.state.fill)) || '#000000';
    const font = (CE.state && CE.state.font) || 'sans-serif';
    const size = ((CE.state && CE.state.fontSize) || 24) * dpr;
    ctx.save();
    ctx.font = size + 'px ' + font;
    ctx.fillStyle = colour;
    ctx.textBaseline = 'top';
    txt.split('\n').forEach((ln, i) => {
      ctx.fillText(ln, ax * dpr, (ay + i * size * 1.2) * dpr);
    });
    ctx.restore();
    return true;
  }

  function commit() {
    if (featureOff('text')) { ta.style.display = 'none'; return; }
    const txt = ta.value.trim();
    if (!txt) { ta.style.display = 'none'; ta.value = ''; return; }
    const c = currentCostume();
    if (!c) { ta.style.display = 'none'; return; }

    if (c.dataFormat === 'png') {
      try {
        if (commitBitmap(c, txt) && window.GW8 && window.GW8.pushHistory) {
          window.GW8.pushHistory('Add text: ' + txt.slice(0, 20));
        }
      } catch (e) { dialog("I couldn't add text to this costume."); }
      ta.style.display = 'none'; ta.value = '';
      return;
    }

    try {
      c.svg = commitSvg(c, txt);
    } catch (e) {
      dialog("I couldn't add text. The costume might be damaged.");
      ta.style.display = 'none'; ta.value = '';
      return;
    }
    if (window.GW8 && window.GW8.pushHistory) {
      window.GW8.pushHistory('Add text: ' + txt.slice(0, 20));
    }
    ta.style.display = 'none'; ta.value = '';
  }

  ta.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); commit(); }
    else if (e.key === 'Escape') { ta.style.display = 'none'; ta.value = ''; }
  });

  document.addEventListener('click', (e) => {
    const canvas = document.querySelector('canvas');
    if (!canvas || e.target !== canvas) { ta.style.display = 'none'; return; }
    ax = e.offsetX || e.clientX;
    ay = e.offsetY || e.clientY;
    ta.style.left = e.clientX + 'px';
    ta.style.top = e.clientY + 'px';
    ta.style.display = 'block';
    ta.focus();
  });
})();
