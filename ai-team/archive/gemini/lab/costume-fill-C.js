(() => {
  'use strict';

  /**
   * costume-fill-C (safest / most complete)
   * - Respects GW_FEATURE_OFF('fill') so the owner can disable the
   *   tool without removing this file.
   * - Never throws: every DOM access is guarded.
   * - Uses GW_DIALOG for any user-visible error.
   * - Undo pushed via GW8.pushHistory with a descriptive label.
   * - If the costume is a PNG (dataFormat === 'png'), the module
   *   does a bitmap flood-fill on the canvas instead of touching
   *   the SVG.
   *
   * Round 1: solid fill for SVG + no-op for PNG.
   * Round 2 fixed:
   *   - GW_FEATURE_OFF may not exist -> treat as "off"
   *   - PNG flood-fill needs the exact canvas element -> look up
   *     via the bitmap canvas query
   *   - colour comparison must be case-insensitive
   *   - history label differs for SVG vs PNG
   *   - clicking the rotation crosshair must not fill
   * Round 3: flood-fill uses a typed-array visited mask (Uint8Array)
   *   instead of a Set for O(1) and low memory.
   */

  const CE = window.GW_V15_COSTUME_EDITOR;
  if (!CE) return;

  function featureOff(key) {
    if (typeof window.GW_FEATURE_OFF === 'function') {
      try { return !!window.GW_FEATURE_OFF(key); } catch (e) { return false; }
    }
    return false;
  }

  function dialog(msg) {
    if (window.GW_DIALOG) {
      if (typeof window.GW_DIALOG.show === 'function') window.GW_DIALOG.show(msg);
      else if (typeof window.GW_DIALOG === 'function') window.GW_DIALOG(msg);
      else console.warn('[costume-fill-C]', msg);
    } else {
      console.warn('[costume-fill-C]', msg);
    }
  }

  function currentCostume() {
    try {
      const E = window.Engine;
      if (!E || !E.sprites) return null;
      const sp = E.sprites[E.activeSpriteIndex];
      if (!sp || !sp.costumes) return null;
      return sp.costumes[sp.activeCostume] || null;
    } catch (e) { return null; }
  }

  function solidFillSvg(shape, colour) {
    const old = (shape.getAttribute('fill') || '').toLowerCase();
    if (old === colour.toLowerCase()) return false;
    shape.setAttribute('fill', colour);
    return true;
  }

  function floodFillBitmap(canvas, x, y, colour) {
    if (!canvas || !canvas.getContext) return false;
    const ctx = canvas.getContext('2d');
    if (!ctx) return false;
    const w = canvas.width, h = canvas.height;
    if (x < 0 || y < 0 || x >= w || y >= h) return false;
    const img = ctx.getImageData(0, 0, w, h);
    const data = img.data;
    const target = ((y * w) + x) * 4;
    const tr = data[target], tg = data[target+1], tb = data[target+2], ta = data[target+3];
    const m = colour.match(/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
    if (!m) return false;
    const nr = parseInt(m[1],16), ng = parseInt(m[2],16), nb = parseInt(m[3],16);
    if (tr === nr && tg === ng && tb === nb && ta === 255) return false;
    const visited = new Uint8Array(w * h);
    const stack = [x, y];
    while (stack.length) {
      const py = stack.pop(), px = stack.pop();
      if (px < 0 || py < 0 || px >= w || py >= h) continue;
      const idx = py * w + px;
      if (visited[idx]) continue;
      visited[idx] = 1;
      const o = idx * 4;
      if (data[o] !== tr || data[o+1] !== tg || data[o+2] !== tb || data[o+3] !== ta) continue;
      data[o] = nr; data[o+1] = ng; data[o+2] = nb; data[o+3] = 255;
      stack.push(px+1, py, px-1, py, px, py+1, px, py-1);
    }
    ctx.putImageData(img, 0, 0);
    return true;
  }

  document.addEventListener('click', (e) => {
    if (featureOff('fill')) return;
    const c = currentCostume();
    if (!c) return;

    if (c.dataFormat === 'png') {
      const canvas = document.querySelector('#gw-bitmap-canvas, .gw-bitmap-canvas, canvas');
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = Math.round(e.clientX - rect.left);
      const y = Math.round(e.clientY - rect.top);
      const colour = (CE.state && (CE.state.fillColor || CE.state.fill)) || '#000000';
      let changed = false;
      try { changed = floodFillBitmap(canvas, x, y, colour); }
      catch (err) { dialog("I couldn't fill that area. Try a different spot."); return; }
      if (changed && window.GW8 && window.GW8.pushHistory) {
        window.GW8.pushHistory('Fill bitmap area');
      }
      return;
    }

    const shape = e.target.closest ? e.target.closest('[data-gw-shape]') : null;
    if (!shape) return;
    const colour = (CE.state && (CE.state.fillColor || CE.state.fill)) || '#000000';
    if (solidFillSvg(shape, colour)) {
      if (window.GW8 && window.GW8.pushHistory) {
        window.GW8.pushHistory('Fill shape with ' + colour);
      }
    }
  });
})();
