(() => {
  'use strict';
  /**
   * G-Warp Lab L2 (GL2 / legacy DA2): Auto-Rig SVG Costume -> { bones, parts }
   * Option A: Longest-Axis Bounding Box Per Group/Shape
   * Creates one bone per top-level <g id="..."> (or leaf shape) aligned along its longest bounding-box axis.
   */
  if (typeof window !== 'undefined' && window.GW_FEATURE_OFF?.('autoRigA')) return;

  function extractNumbers(str) {
    return (String(str || '').match(/-?\d+(?:\.\d+)?/g) || []).map(Number);
  }

  function bboxFromSnippet(snippet) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    const expand = (x, y) => {
      if (!Number.isFinite(x) || !Number.isFinite(y)) return;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    };

    const rectRe = /<rect\b([^>]*)\/?>/gi;
    let m;
    while ((m = rectRe.exec(snippet))) {
      const a = m[1];
      const x = Number((a.match(/\bx="([^"]+)"/) || [])[1] || 0);
      const y = Number((a.match(/\by="([^"]+)"/) || [])[1] || 0);
      const w = Number((a.match(/\bwidth="([^"]+)"/) || [])[1] || 0);
      const h = Number((a.match(/\bheight="([^"]+)"/) || [])[1] || 0);
      expand(x, y);
      expand(x + w, y + h);
    }

    const circRe = /<circle\b([^>]*)\/?>/gi;
    while ((m = circRe.exec(snippet))) {
      const a = m[1];
      const cx = Number((a.match(/\bcx="([^"]+)"/) || [])[1] || 0);
      const cy = Number((a.match(/\bcy="([^"]+)"/) || [])[1] || 0);
      const r = Number((a.match(/\br="([^"]+)"/) || [])[1] || 0);
      expand(cx - r, cy - r);
      expand(cx + r, cy + r);
    }

    const ellRe = /<ellipse\b([^>]*)\/?>/gi;
    while ((m = ellRe.exec(snippet))) {
      const a = m[1];
      const cx = Number((a.match(/\bcx="([^"]+)"/) || [])[1] || 0);
      const cy = Number((a.match(/\bcy="([^"]+)"/) || [])[1] || 0);
      const rx = Number((a.match(/\brx="([^"]+)"/) || [])[1] || 0);
      const ry = Number((a.match(/\bry="([^"]+)"/) || [])[1] || 0);
      expand(cx - rx, cy - ry);
      expand(cx + rx, cy + ry);
    }

    const polyRe = /<(?:polygon|polyline)\b[^>]*\bpoints="([^"]+)"/gi;
    while ((m = polyRe.exec(snippet))) {
      const nums = extractNumbers(m[1]);
      for (let i = 0; i + 1 < nums.length; i += 2) expand(nums[i], nums[i + 1]);
    }

    const lineRe = /<line\b([^>]*)\/?>/gi;
    while ((m = lineRe.exec(snippet))) {
      const a = m[1];
      expand(Number((a.match(/\bx1="([^"]+)"/) || [])[1] || 0), Number((a.match(/\by1="([^"]+)"/) || [])[1] || 0));
      expand(Number((a.match(/\bx2="([^"]+)"/) || [])[1] || 0), Number((a.match(/\by2="([^"]+)"/) || [])[1] || 0));
    }

    const pathRe = /<path\b[^>]*\bd="([^"]+)"/gi;
    while ((m = pathRe.exec(snippet))) {
      const cmds = m[1].match(/[MLC]\s*-?\d+(?:\.\d+)?[\s,]+-?\d+(?:\.\d+)?/gi) || [];
      for (const c of cmds) {
        const nums = extractNumbers(c);
        if (nums.length >= 2) expand(nums[0], nums[1]);
      }
    }

    if (!Number.isFinite(minX)) return { minX: 45, minY: 45, maxX: 75, maxY: 75, cx: 60, cy: 60, w: 30, h: 30 };
    return {
      minX, minY, maxX, maxY,
      cx: (minX + maxX) / 2,
      cy: (minY + maxY) / 2,
      w: Math.max(4, maxX - minX),
      h: Math.max(4, maxY - minY)
    };
  }

  function autoRigA(svgText) {
    const src = String(svgText || '');
    const groupRe = /<g\b[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/g>/gi;
    const bones = [];
    const parts = {};
    let m;
    let idx = 0;
    while ((m = groupRe.exec(src))) {
      const id = m[1];
      const box = bboxFromSnippet(m[2]);
      const horizontal = box.w > box.h;
      const x = horizontal ? box.minX : box.cx;
      const y = horizontal ? box.cy : box.minY;
      const len = Math.round(horizontal ? box.w : box.h);
      const angle = horizontal ? (box.cx < 60 ? 180 : 0) : 90;
      bones.push({
        id,
        name: id,
        parent: id === 'body' ? null : 'body',
        at: 0.5,
        off: 0,
        x: Math.round(x),
        y: Math.round(y),
        len: Math.max(8, len),
        angle
      });
      parts[`g#${id}`] = id;
      idx++;
    }
    return { bones, parts, count: idx };
  }

  const api = { name: 'Option A (Longest-Axis BBox)', autoRig: autoRigA, bboxFromSnippet };
  if (typeof window !== 'undefined') window.GW_AUTO_RIG_A = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})();
