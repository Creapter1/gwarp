(() => {
  'use strict';
  /**
   * G-Warp Lab L2 (GL2 / legacy DA2): Auto-Rig SVG Costume -> { bones, parts }
   * Option C: Semantic Anatomical Heuristic + Joint-Circle Detector (RECOMMENDED PICK)
   * Recognizes <g id="head|body|armL|armR|legL|legR"> AND detects joint pivot <circle> anchors
   * (or falls back to anatomical quadrant heuristics for unlabelled kid drawings).
   */
  if (typeof window !== 'undefined' && window.GW_FEATURE_OFF?.('autoRigC')) return;

  const helperA = (typeof window !== 'undefined' && window.GW_AUTO_RIG_A) ||
    (typeof require === 'function' ? require('./auto-rig-A.js') : null);

  function findFirstJointCircle(snippet, box, role) {
    const circRe = /<circle\b([^>]*)\/?>/gi;
    let m;
    const candidates = [];
    while ((m = circRe.exec(snippet))) {
      const a = m[1];
      const cx = Number((a.match(/\bcx="([^"]+)"/) || [])[1]);
      const cy = Number((a.match(/\bcy="([^"]+)"/) || [])[1]);
      const r = Number((a.match(/\br="([^"]+)"/) || [])[1] || 0);
      if (Number.isFinite(cx) && Number.isFinite(cy) && r <= 6) {
        candidates.push({ cx, cy, r });
      }
    }
    if (candidates.length && (role === 'armL' || role === 'armR' || role === 'legL' || role === 'legR')) {
      return { x: candidates[0].cx, y: candidates[0].cy };
    }
    if (role === 'head') return { x: Math.round(box.cx), y: Math.round(box.maxY) };
    if (role === 'body') return { x: Math.round(box.cx), y: Math.round(box.cy) };
    if (role === 'armL') return { x: Math.round(box.maxX), y: Math.round(box.minY + 4) };
    if (role === 'armR') return { x: Math.round(box.minX), y: Math.round(box.minY + 4) };
    if (role === 'legL' || role === 'legR') return { x: Math.round(box.cx), y: Math.round(box.minY) };
    return { x: Math.round(box.cx), y: Math.round(box.cy) };
  }

  function classifyRole(id, box, torsoBox) {
    const clean = String(id || '').toLowerCase();
    if (clean.includes('head')) return 'head';
    if (clean.includes('body') || clean.includes('torso')) return 'body';
    if (clean.includes('arml') || clean === 'leftarm') return 'armL';
    if (clean.includes('armr') || clean === 'rightarm') return 'armR';
    if (clean.includes('legl') || clean === 'leftleg') return 'legL';
    if (clean.includes('legr') || clean === 'rightleg') return 'legR';
    if (!torsoBox) return 'body';
    if (box.cy < torsoBox.minY) return 'head';
    if (box.cy > torsoBox.maxY - 4) return box.cx <= torsoBox.cx ? 'legL' : 'legR';
    return box.cx < torsoBox.cx ? 'armL' : 'armR';
  }

  function autoRigC(svgText) {
    const src = String(svgText || '');
    const groupRe = /<g\b[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/g>/gi;
    const rawGroups = [];
    let m;
    while ((m = groupRe.exec(src))) {
      rawGroups.push({ id: m[1], inner: m[2], box: helperA.bboxFromSnippet(m[2]) });
    }
    if (!rawGroups.length) return { bones: [], parts: {}, count: 0 };

    const bodyGrp = rawGroups.find(g => g.id === 'body') ||
      rawGroups.slice().sort((a, b) => (b.box.w * b.box.h) - (a.box.w * a.box.h))[0];

    const bones = [];
    const parts = {};
    const pivots = {};

    for (const g of rawGroups) {
      const role = classifyRole(g.id, g.box, bodyGrp.box);
      const piv = findFirstJointCircle(g.inner, g.box, role);
      pivots[g.id] = piv;

      let endX = g.box.cx;
      let endY = g.box.cy;
      if (role === 'head') { endX = piv.x; endY = g.box.minY; }
      else if (role === 'body') { endX = piv.x; endY = g.box.minY; }
      else if (role === 'armL') { endX = g.box.minX; endY = g.box.maxY; }
      else if (role === 'armR') { endX = g.box.maxX; endY = g.box.maxY; }
      else if (role === 'legL' || role === 'legR') { endX = piv.x; endY = g.box.maxY; }

      const len = Math.max(12, Math.round(Math.hypot(endX - piv.x, endY - piv.y)));
      const angle = Math.round(Math.atan2(endY - piv.y, endX - piv.x) * 180 / Math.PI);

      bones.push({
        id: g.id,
        name: g.id,
        parent: role === 'body' ? null : bodyGrp.id,
        at: role === 'head' ? 1 : (role === 'legL' || role === 'legR') ? 0 : 0.75,
        off: Math.round(piv.x - bodyGrp.box.cx),
        x: Math.round(piv.x),
        y: Math.round(piv.y),
        len,
        angle
      });
      parts[`g#${g.id}`] = g.id;
    }

    return { bones, parts, pivots, count: bones.length };
  }

  const api = { name: 'Option C (Semantic + Joint Pivot Detector)', autoRig: autoRigC };
  if (typeof window !== 'undefined') window.GW_AUTO_RIG_C = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})();
