(() => {
  'use strict';
  /**
   * G-Warp Lab L2 (GL2 / legacy DA2): Auto-Rig SVG Costume -> { bones, parts }
   * Option B: Largest-Area Root + Proximity Overlap Chain
   * Picks the largest-area group as the root ('body') and chains smaller limbs by nearest joint distance.
   */
  if (typeof window !== 'undefined' && window.GW_FEATURE_OFF?.('autoRigB')) return;

  const helperA = (typeof window !== 'undefined' && window.GW_AUTO_RIG_A) ||
    (typeof require === 'function' ? require('./auto-rig-A.js') : null);

  function autoRigB(svgText) {
    const src = String(svgText || '');
    const groupRe = /<g\b[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/g>/gi;
    const items = [];
    let m;
    while ((m = groupRe.exec(src))) {
      const id = m[1];
      const box = helperA.bboxFromSnippet(m[2]);
      items.push({ id, box, area: box.w * box.h });
    }
    if (!items.length) return { bones: [], parts: {}, count: 0 };

    // Root = item explicitly named 'body' or largest bounding area
    let rootItem = items.find(it => it.id === 'body') || items.slice().sort((a, b) => b.area - a.area)[0];
    const bones = [];
    const parts = {};

    bones.push({
      id: rootItem.id,
      name: rootItem.id,
      parent: null,
      at: 0,
      off: 0,
      x: Math.round(rootItem.box.cx),
      y: Math.round(rootItem.box.cy),
      len: Math.round(Math.max(12, rootItem.box.h * 0.7)),
      angle: -90
    });
    parts[`g#${rootItem.id}`] = rootItem.id;

    for (const it of items) {
      if (it.id === rootItem.id) continue;
      const dx = it.box.cx - rootItem.box.cx;
      const dy = it.box.cy - rootItem.box.cy;
      // Shoulder/hip/neck attachment point on root border closest to limb center
      const jx = Math.max(rootItem.box.minX, Math.min(rootItem.box.maxX, it.box.cx));
      const jy = Math.max(rootItem.box.minY, Math.min(rootItem.box.maxY, it.box.cy));
      const farX = dx < -4 ? it.box.minX : dx > 4 ? it.box.maxX : it.box.cx;
      const farY = dy < -4 ? it.box.minY : it.box.maxY;
      const len = Math.max(10, Math.round(Math.hypot(farX - jx, farY - jy)));
      const angle = Math.round(Math.atan2(farY - jy, farX - jx) * 180 / Math.PI);

      bones.push({
        id: it.id,
        name: it.id,
        parent: rootItem.id,
        at: dy < 0 ? 1 : 0.2,
        off: Math.round(jx - rootItem.box.cx),
        x: Math.round(jx),
        y: Math.round(jy),
        len,
        angle
      });
      parts[`g#${it.id}`] = it.id;
    }

    return { bones, parts, count: bones.length };
  }

  const api = { name: 'Option B (Overlap Proximity Chain)', autoRig: autoRigB };
  if (typeof window !== 'undefined') window.GW_AUTO_RIG_B = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})();
