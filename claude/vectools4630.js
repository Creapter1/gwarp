(() => {
  'use strict';
  /* v15.46.3 (Claude): the two vector tools that were "coming soon" now work, like Scratch 3's paint editor.
     RESHAPE (A): click a shape or line -> its points get handles; drag a handle to move that point (curves bend with it);
       click a handle then press Delete to remove that point. Boxes, circles and lines turn into editable paths (like Scratch).
     ERASER (E): rub over shapes to erase parts of them. Each touched shape gets its own see-through mask, so the erased part
       moves with the shape. Brush size sets the eraser size. Undo (Ctrl+Z) works for both.
     Built on DeepSeek's costume checklist + lab notes; written against the REAL editor (GW_V15_COSTUME_EDITOR). Switch off: "vectorTools2". */
  if (window.GW_VECTOR_TOOLS2) return;
  const NS = 'http://www.w3.org/2000/svg';
  const by = id => document.getElementById(id);
  const CE = () => window.GW_V15_COSTUME_EDITOR;
  const svgEl = () => by('gwVectorCanvasV15');
  const vector = () => CE()?.state?.costumeMode !== 'bitmap';
  const isArt = n => n && n.nodeType === 1 && n.parentNode === svgEl() && !/^(defs|style|mask)$/i.test(n.localName) && !/^gwV153|^gwpe|^gwrs/.test(n.id || '') && !n.classList?.contains('gw-svg-selection') && !n.classList?.contains('gw-svg-handle');
  const artOf = t => { const s = svgEl(); while (t && t.parentNode !== s) t = t.parentNode; return isArt(t) ? t : null; };
  const toast = m => { try { window.GW?.toast?.(m); } catch {} };
  const save = () => setTimeout(() => { try { CE()?.save?.(true); } catch (e) { console.warn('[vector tools] save', e); } }, 20);
  const pt = (e) => { const s = svgEl(), p = s.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(s.getScreenCTM().inverse()); };
  const toSvg = el => svgEl().getScreenCTM().inverse().multiply(el.getScreenCTM()); // element space -> canvas space
  const r1 = v => Math.round(v * 100) / 100;
  let tool = null; // 'reshape' | 'eraser' | null

  /* ---------------- path model ---------------- */
  function parsePath(d) {
    const tk = String(d || '').match(/[a-zA-Z]|-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/g) || []; const out = []; let i = 0, cmd = '', cx = 0, cy = 0, sx = 0, sy = 0, lc = null;
    const n = () => +tk[i++];
    while (i < tk.length) {
      if (/[a-zA-Z]/.test(tk[i])) cmd = tk[i++]; const rel = cmd === cmd.toLowerCase(), C = cmd.toUpperCase();
      const X = v => rel ? cx + v : v, Y = v => rel ? cy + v : v;
      if (C === 'Z') { out.push({ c: 'Z' }); cx = sx; cy = sy; lc = null; continue; }
      if (C === 'M') { const x = X(n()), y = Y(n()); out.push({ c: 'M', p: [x, y] }); cx = sx = x; cy = sy = y; cmd = rel ? 'l' : 'L'; lc = null; continue; }
      if (C === 'L') { const x = X(n()), y = Y(n()); out.push({ c: 'L', p: [x, y] }); cx = x; cy = y; lc = null; continue; }
      if (C === 'H') { const x = rel ? cx + n() : n(); out.push({ c: 'L', p: [x, cy] }); cx = x; lc = null; continue; }
      if (C === 'V') { const y = rel ? cy + n() : n(); out.push({ c: 'L', p: [cx, y] }); cy = y; lc = null; continue; }
      if (C === 'Q') { const a = [X(n()), Y(n())], p = [X(n()), Y(n())]; out.push({ c: 'Q', a, p }); cx = p[0]; cy = p[1]; lc = a; continue; }
      if (C === 'T') { const a = lc ? [2 * cx - lc[0], 2 * cy - lc[1]] : [cx, cy], p = [X(n()), Y(n())]; out.push({ c: 'Q', a, p }); cx = p[0]; cy = p[1]; lc = a; continue; }
      if (C === 'C') { const a = [X(n()), Y(n())], b = [X(n()), Y(n())], p = [X(n()), Y(n())]; out.push({ c: 'C', a, b, p }); cx = p[0]; cy = p[1]; lc = b; continue; }
      if (C === 'S') { const a = lc ? [2 * cx - lc[0], 2 * cy - lc[1]] : [cx, cy], b = [X(n()), Y(n())], p = [X(n()), Y(n())]; out.push({ c: 'C', a, b, p }); cx = p[0]; cy = p[1]; lc = b; continue; }
      if (C === 'A') { const rx = n(), ry = n(), rot = n(), la = n(), sw = n(), p = [X(n()), Y(n())]; out.push({ c: 'A', arc: [rx, ry, rot, la, sw], p }); cx = p[0]; cy = p[1]; lc = null; continue; }
      i++; // unknown token: skip
    }
    return out;
  }
  const pathText = segs => segs.map(s => s.c === 'Z' ? 'Z' : s.c === 'Q' ? `Q${r1(s.a[0])} ${r1(s.a[1])} ${r1(s.p[0])} ${r1(s.p[1])}` : s.c === 'C' ? `C${r1(s.a[0])} ${r1(s.a[1])} ${r1(s.b[0])} ${r1(s.b[1])} ${r1(s.p[0])} ${r1(s.p[1])}` : s.c === 'A' ? `A${s.arc.join(' ')} ${r1(s.p[0])} ${r1(s.p[1])}` : `${s.c}${r1(s.p[0])} ${r1(s.p[1])}`).join(' ');
  // boxes, circles, lines and polygons become paths (Scratch does the same when you reshape them)
  function toPath(el) {
    if (el.localName === 'path') return el;
    const g = k => +el.getAttribute(k) || 0; let d = '';
    if (el.localName === 'rect') { const x = g('x'), y = g('y'), w = g('width'), h = g('height'); d = `M${x} ${y} L${x + w} ${y} L${x + w} ${y + h} L${x} ${y + h} Z`; }
    else if (el.localName === 'ellipse' || el.localName === 'circle') { const cx = g('cx'), cy = g('cy'), rx = el.localName === 'circle' ? g('r') : g('rx'), ry = el.localName === 'circle' ? g('r') : g('ry'), k = 0.5523;
      d = `M${cx + rx} ${cy} C${cx + rx} ${cy + ry * k} ${cx + rx * k} ${cy + ry} ${cx} ${cy + ry} C${cx - rx * k} ${cy + ry} ${cx - rx} ${cy + ry * k} ${cx - rx} ${cy} C${cx - rx} ${cy - ry * k} ${cx - rx * k} ${cy - ry} ${cx} ${cy - ry} C${cx + rx * k} ${cy - ry} ${cx + rx} ${cy - ry * k} ${cx + rx} ${cy} Z`; }
    else if (el.localName === 'line') d = `M${g('x1')} ${g('y1')} L${g('x2')} ${g('y2')}`;
    else if (el.localName === 'polygon' || el.localName === 'polyline') { const p = (el.getAttribute('points') || '').trim().split(/[\s,]+/).map(Number); for (let i = 0; i + 1 < p.length; i += 2) d += (i ? ' L' : 'M') + p[i] + ' ' + p[i + 1]; if (el.localName === 'polygon') d += ' Z'; }
    else return null;
    const p = document.createElementNS(NS, 'path');
    for (const a of [...el.attributes]) if (!/^(x|y|width|height|cx|cy|r|rx|ry|x1|y1|x2|y2|points)$/.test(a.name)) p.setAttribute(a.name, a.value);
    p.setAttribute('d', d); el.replaceWith(p); return p;
  }

  /* ---------------- RESHAPE ---------------- */
  const RS = { el: null, segs: null, handles: [], pick: -1, drag: null };
  function clearHandles() { RS.handles.forEach(h => h.remove()); RS.handles = []; by('gwrsLine')?.remove(); }
  function showHandles() {
    clearHandles(); if (!RS.el || !RS.el.isConnected) return; const m = toSvg(RS.el), s = svgEl();
    const outline = document.createElementNS(NS, 'path'); outline.id = 'gwrsLine'; outline.setAttribute('class', 'gw-svg-handle'); outline.setAttribute('d', RS.el.getAttribute('d')); outline.setAttribute('transform', `matrix(${m.a} ${m.b} ${m.c} ${m.d} ${m.e} ${m.f})`);
    Object.entries({ fill: 'none', stroke: '#8b5cf6', 'stroke-width': 1.5, 'vector-effect': 'non-scaling-stroke', 'pointer-events': 'none' }).forEach(([k, v]) => outline.setAttribute(k, v)); s.appendChild(outline);
    RS.segs.forEach((sg, i) => { if (!sg.p) return; const q = new DOMPoint(sg.p[0], sg.p[1]).matrixTransform(m);
      const h = document.createElementNS(NS, 'circle'); h.setAttribute('class', 'gw-svg-handle'); h.dataset.gwrs = i;
      Object.entries({ cx: q.x, cy: q.y, r: 6, fill: i === RS.pick ? '#8b5cf6' : '#fff', stroke: '#8b5cf6', 'stroke-width': 2, 'vector-effect': 'non-scaling-stroke', style: 'cursor:move' }).forEach(([k, v]) => h.setAttribute(k, v));
      s.appendChild(h); RS.handles.push(h); });
  }
  function startReshape(el) {
    if (!el) { RS.el = null; clearHandles(); return; }
    if (/^(g|text|image|use)$/i.test(el.localName)) { toast('Reshape works on shapes and lines. Ungroup first, or use Select for text and pictures.'); return; }
    const p = toPath(el); if (!p) return; RS.el = p; RS.segs = parsePath(p.getAttribute('d')); RS.pick = -1; showHandles();
  }
  function moveNode(i, nx, ny) { // move point i; control points next to it move the same amount, so curves keep their shape
    const s = RS.segs[i]; if (!s?.p) return; const dx = nx - s.p[0], dy = ny - s.p[1]; s.p = [nx, ny];
    if (s.b) s.b = [s.b[0] + dx, s.b[1] + dy]; else if (s.a && s.c === 'Q') s.a = [s.a[0] + dx / 2, s.a[1] + dy / 2];
    const nxt = RS.segs[i + 1]; if (nxt?.c === 'C') nxt.a = [nxt.a[0] + dx, nxt.a[1] + dy]; else if (nxt?.c === 'Q') nxt.a = [nxt.a[0] + dx / 2, nxt.a[1] + dy / 2];
    // a closed shape's first point is also its last one
    if (s.c === 'M') { const zi = RS.segs.findIndex((g, k) => k > i && g.c === 'Z'); const last = RS.segs[zi - 1]; if (zi > 0 && last?.p && Math.hypot(last.p[0] - (nx - dx), last.p[1] - (ny - dy)) < 0.01) { last.p = [nx, ny]; if (last.b) last.b = [last.b[0] + dx, last.b[1] + dy]; } }
    RS.el.setAttribute('d', pathText(RS.segs));
  }
  function deleteNode() {
    const i = RS.pick, anchors = RS.segs.filter(s => s.p).length; if (i < 0 || anchors <= 2) return false;
    const s = RS.segs[i]; if (s.c === 'M') { const n = RS.segs[i + 1]; if (!n?.p) return false; RS.segs.splice(i + 1, 1); s.p = n.p; } else RS.segs.splice(i, 1);
    RS.el.setAttribute('d', pathText(RS.segs)); RS.pick = -1; showHandles(); save(); return true;
  }

  /* ---------------- ERASER ---------------- */
  let er = null; // { path, pts, w }
  const brushSize = () => Math.max(2, Math.min(100, +by('gwpeBrushSize')?.value || 20));
  function defs() { const s = svgEl(); let d = s.querySelector(':scope > defs#gwErDefs'); if (!d) { d = document.createElementNS(NS, 'defs'); d.id = 'gwErDefs'; s.insertBefore(d, s.firstChild?.nextSibling || null); } return d; }
  function maskFor(el) {
    const ref = (el.getAttribute('mask') || '').match(/url\(#([^)]+)\)/); let m = ref && document.getElementById(ref[1]);
    if (m && m.closest('svg') === svgEl()) return m;
    m = document.createElementNS(NS, 'mask'); m.id = 'gwEr' + Math.random().toString(36).slice(2, 9); m.setAttribute('maskUnits', 'userSpaceOnUse'); m.setAttribute('maskContentUnits', 'userSpaceOnUse');
    Object.entries({ x: -100000, y: -100000, width: 200000, height: 200000 }).forEach(([k, v]) => m.setAttribute(k, v));
    const bg = document.createElementNS(NS, 'rect'); Object.entries({ x: -100000, y: -100000, width: 200000, height: 200000, fill: '#fff' }).forEach(([k, v]) => bg.setAttribute(k, v)); m.appendChild(bg);
    defs().appendChild(m); el.setAttribute('mask', `url(#${m.id})`); return m;
  }
  const erD = P => P.map((p, i) => (i ? 'L' : 'M') + r1(p[0]) + ' ' + r1(p[1])).join(' ') + (P.length === 1 ? ' l0.1 0' : '');
  function finishErase() {
    const s = svgEl(), box = er.path.getBoundingClientRect(); let hit = 0;
    [...s.children].filter(isArt).forEach(el => { const b = el.getBoundingClientRect(); if (b.right < box.left || b.left > box.right || b.bottom < box.top || b.top > box.bottom) return;
      const inv = toSvg(el).inverse(), cut = document.createElementNS(NS, 'path');
      Object.entries({ d: er.path.getAttribute('d'), fill: 'none', stroke: '#000', 'stroke-width': er.w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', transform: `matrix(${inv.a} ${inv.b} ${inv.c} ${inv.d} ${inv.e} ${inv.f})` }).forEach(([k, v]) => cut.setAttribute(k, v));
      maskFor(el).appendChild(cut); hit++; });
    window.GW_VECTOR_TOOLS2.lastErase = { box: [box.left, box.top, box.right, box.bottom].map(Math.round), hit };
    er.path.remove(); er = null; if (hit) save();
  }

  /* ---------------- pointer + keys ---------------- */
  function down(e) {
    if (!tool || !vector() || e.button !== 0) return; const s = svgEl(); if (!s || !s.contains(e.target)) return;
    if (tool === 'reshape') {
      const h = e.target.closest?.('[data-gwrs]');
      e.stopImmediatePropagation(); // our tool owns this click (the Select tool must not start dragging)
      by('gwV153ClearSelection')?.click(); if (CE()?.state) CE().state.selectedSvg = null; // so the editor's own Delete key has nothing to delete
      if (h) { RS.pick = +h.dataset.gwrs; RS.drag = { id: e.pointerId, inv: toSvg(RS.el).inverse() }; try { s.setPointerCapture(e.pointerId); } catch {} showHandles(); e.preventDefault(); return; }
      startReshape(artOf(e.target)); return;
    }
    if (tool === 'eraser') {
      const p = pt(e); er = { pts: [[p.x, p.y]], w: brushSize(), id: e.pointerId, path: document.createElementNS(NS, 'path') };
      Object.entries({ fill: 'none', stroke: 'rgba(244,63,94,.45)', 'stroke-width': er.w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', class: 'gw-svg-handle', 'pointer-events': 'none' }).forEach(([k, v]) => er.path.setAttribute(k, v));
      e.stopImmediatePropagation();
      er.path.setAttribute('d', erD(er.pts)); s.appendChild(er.path); try { s.setPointerCapture(e.pointerId); } catch {} e.preventDefault();
    }
  }
  function move(e) {
    if (tool === 'reshape' && RS.drag && e.pointerId === RS.drag.id) { const q = new DOMPoint(pt(e).x, pt(e).y).matrixTransform(RS.drag.inv); moveNode(RS.pick, q.x, q.y); showHandles(); return; }
    if (tool === 'eraser' && er && e.pointerId === er.id) { const p = pt(e), l = er.pts[er.pts.length - 1]; if (Math.hypot(p.x - l[0], p.y - l[1]) < 1.5) return; er.pts.push([p.x, p.y]); er.path.setAttribute('d', erD(er.pts)); }
  }
  function up(e) {
    if (tool === 'reshape' && RS.drag && e.pointerId === RS.drag.id) { RS.drag = null; save(); return; }
    if (tool === 'eraser' && er && e.pointerId === er.id) finishErase();
  }
  function key(e) {
    if (tool !== 'reshape' || !vector() || /input|textarea|select/i.test(document.activeElement?.tagName || '')) return;
    if ((e.key === 'Delete' || e.key === 'Backspace') && RS.pick >= 0) { if (deleteNode()) { e.preventDefault(); e.stopImmediatePropagation(); } }
  }

  /* ---------------- the two palette buttons ---------------- */
  function setTool(t) {
    const row = by('gwSvgToolsV15');
    if (t) { tool = null; row?.querySelector('[data-gwpe="select"]')?.click(); if (CE()?.state) CE().state.svgTool = 'gw-' + t; }
    tool = t; if (t) { by('gwV153ClearSelection')?.click(); if (CE()?.state) CE().state.selectedSvg = null; }
    row?.querySelectorAll('button').forEach(b => { const mine = b.dataset.gwpe === 'gw:' + t; if (t) b.classList.toggle('active', mine); b.setAttribute('aria-pressed', String(b.classList.contains('active'))); });
    const ed = by('gwCostumeEditorV15'); if (ed) { ed.classList.toggle('gwpe-tool-reshape', t === 'reshape'); ed.classList.toggle('gwpe-tool-eraser', t === 'eraser'); }
    if (t !== 'reshape') { RS.el = null; clearHandles(); }
  }
  function wire() {
    let done = 0;
    for (const [id, name, letter] of [['gw:reshape', 'reshape', 'A'], ['gw:eraser', 'eraser', 'E']]) {
      const b = document.querySelector(`#gwSvgToolsV15 [data-gwpe="${id}"]`); if (!b) continue; done++;
      if (b.__gw4630) continue; b.__gw4630 = true; b.disabled = false; b.removeAttribute('aria-disabled');
      const tip = (name === 'reshape' ? 'Reshape' : 'Eraser') + ` (${letter})`; b.title = tip; b.setAttribute('aria-label', tip);
      b.addEventListener('click', () => setTool(name));
    }
    const row = by('gwSvgToolsV15'); if (row && !row.__gw4630) { row.__gw4630 = true; row.addEventListener('click', e => { const b = e.target.closest('button'); if (b && !/^gw:(reshape|eraser)$/.test(b.dataset.gwpe || '') && b.id !== 'gwV153ClearSelection' && tool) { tool = null; setTool(null); } }, true); }
    return done === 2;
  }
  function start(n = 0) {
    if (window.GW_FEATURE_OFF?.('vectorTools2')) return;
    if (!wire()) return n < 120 && setTimeout(() => start(n + 1), 250);
    new MutationObserver(() => wire()).observe(document.body, { childList: true, subtree: false });
    const hook = () => { const v = svgEl(); if (v && !v.__gw4630) { v.__gw4630 = true; v.addEventListener('pointerdown', down, true); } }; hook(); setInterval(hook, 1000);
    document.addEventListener('pointermove', move); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
    document.addEventListener('keydown', key, true);
    const st = document.createElement('style'); st.textContent = '.gwpe.gwpe-tool-eraser #gwVectorCanvasV15{cursor:cell}.gwpe.gwpe-tool-reshape #gwVectorCanvasV15{cursor:default}'; document.head.appendChild(st);
  }
  window.GW_VECTOR_TOOLS2 = { setTool, parsePath, pathText, get tool() { return tool; } };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => start()); else start();
})();
