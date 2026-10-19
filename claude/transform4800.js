(() => {
  'use strict';
  /* v15.48.0 (Claude): the Select tool of the vector costume editor, rebuilt to work like Scratch 3's paint editor.
     Owner (emergency): "when you move a letter it jumps to a completely different location; shapes go somewhere else
     when you reshape them; Scratch lets you grab them by the points and everything follows inside the square".
     Why things jumped before: moving text / paths / groups ADDED a new translate on every mouse move (so it piled up),
     the box was measured without the shape's own transform, and resize / rotate threw the old transform away.
     Now every change is one clean matrix put in front of the transform the shape had when the drag started:
       • click a shape: a box with 8 handles + a rotate handle (G-Warp violet). Drag inside the box to move it
         (Shift = straight line), a corner to resize from the opposite corner (Shift = keep the shape), a side to
         stretch, the round handle to rotate (Shift = 15° steps).
       • Shift-click adds / removes shapes; drag on empty space for a selection box; Esc or a click on empty space
         deselects; arrow keys move 1 (Shift 10); Delete removes.
       • Each change is one undo step and is saved into the costume.
     The handles live in their own layer over the canvas, so they can never be saved into a costume. */
  if (window.GW_TRANSFORM) return;
  const by = id => document.getElementById(id);
  const NS = 'http://www.w3.org/2000/svg';
  const CE = () => window.GW_V15_COSTUME_EDITOR;
  const svgEl = () => by('gwVectorCanvasV15');
  const wrapEl = () => by('gwCostumeCanvasWrapV15');
  const mode = () => CE()?.state?.costumeMode || 'vector';
  const isArt = n => { const s = svgEl(); return !!n && n.nodeType === 1 && n.parentNode === s && !/^(defs|style|title|metadata)$/i.test(n.localName) && !/^(gwV153|gwpe|gwTx|gwEr)/.test(n.id || '') && !n.classList?.contains('gw-svg-selection') && !n.classList?.contains('gw-svg-handle'); };
  const topArt = t => { const s = svgEl(); while (t && t.parentNode && t.parentNode !== s) t = t.parentNode; return isArt(t) ? t : null; };
  const selectToolOn = () => { if (mode() !== 'vector' || window.GW_VECTOR_TOOLS2?.tool) return false; const a = document.querySelector('#gwSvgToolsV15 button.active'); return !!a && (a.dataset.gwpe === 'select' || a.dataset.svgTool === 'select'); };
  const typing = e => !!e.target?.closest?.('input,textarea,select,[contenteditable="true"]');

  const T = window.GW_TRANSFORM = { sel: [], drag: null, marquee: null, stats: { moves: 0 } };

  /* ---------- geometry (all in the canvas's own units, 512 x 384) ---------- */
  const rootM = el => { const s = svgEl(); return s.getScreenCTM().inverse().multiply(el.getScreenCTM()); };
  const pt = e => { const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(svgEl().getScreenCTM().inverse()); return { x: p.x, y: p.y }; };
  function boxOf(el) {
    let b; try { b = el.getBBox(); } catch { return null; } if (!b) return null;
    const m = rootM(el); let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const [x, y] of [[b.x, b.y], [b.x + b.width, b.y], [b.x, b.y + b.height], [b.x + b.width, b.y + b.height]]) { const p = new DOMPoint(x, y).matrixTransform(m); x0 = Math.min(x0, p.x); y0 = Math.min(y0, p.y); x1 = Math.max(x1, p.x); y1 = Math.max(y1, p.y); }
    return Number.isFinite(x0) ? { x0, y0, x1, y1 } : null;
  }
  function unionBox(list) {
    let u = null; for (const el of list) { const b = boxOf(el); if (!b) continue; u = u ? { x0: Math.min(u.x0, b.x0), y0: Math.min(u.y0, b.y0), x1: Math.max(u.x1, b.x1), y1: Math.max(u.y1, b.y1) } : b; }
    if (u) { if (u.x1 - u.x0 < 1) { u.x0 -= 0.5; u.x1 += 0.5; } if (u.y1 - u.y0 < 1) { u.y0 -= 0.5; u.y1 += 0.5; } }
    return u;
  }
  const fmt = m => `matrix(${[m.a, m.b, m.c, m.d, m.e, m.f].map(v => +v.toFixed(5)).join(' ')})`;
  const apply = (D, list) => list.forEach(({ el, t0 }) => el.setAttribute('transform', (fmt(D) + ' ' + t0).trim()));
  function tidy(el) { try { const t = el.transform?.baseVal; if (t && t.numberOfItems > 1) t.consolidate(); } catch {} }

  /* ---------- selection ---------- */
  function setSel(list) {
    T.sel = [...new Set(list.filter(isArt))];
    const st = CE()?.state; if (st) st.selectedSvg = T.sel[0] || null;
    const V = window.GW_V153_VECTOR; if (V) { V.selected = T.sel.slice(); V.handles = null; }
    document.querySelectorAll('#gwVectorCanvasV15 > .gw-v153-selected').forEach(n => n.classList.remove('gw-v153-selected'));
    const info = by('gwSvgSelectionInfoV15'); if (info) info.textContent = T.sel.length ? `${T.sel.length} object${T.sel.length === 1 ? '' : 's'} selected` : 'Nothing selected';
    // the toolbar buttons that need a selection follow it right away
    const n = T.sel[0], dis = (q, off) => document.querySelectorAll(q).forEach(b => { b.disabled = off; });
    dis('#gwCosHead [data-sel]', !n); dis('#gwpeMode [data-sel]', !n); dis('#gwCosHead [data-a="group"]', !n);
    dis('#gwCosHead [data-a="ungroup"]', !T.sel.some(g => g.localName === 'g' && !g.hasAttribute('data-gw-orig') && !g.querySelector(':scope > svg')));
    draw();
  }
  const undoPush = () => { try { window.GW_COSTUME_UNDO?.push?.(); } catch {} };
  const save = () => { try { CE()?.save?.(true); } catch (e) { console.warn('[select tool] save', e); } };

  /* ---------- the handles layer (outside the costume) ---------- */
  const css = document.createElement('style'); css.id = 'gw-v4800-transform-css';
  css.textContent = `#gwV153Overlay{display:none!important}
#gwTxOverlay{position:absolute;left:0;top:0;width:1px;height:1px;overflow:visible;pointer-events:none;z-index:5}
#gwTxOverlay .box{fill:none;stroke:#8b5cf6;stroke-width:1.5;stroke-dasharray:5 3}
#gwTxOverlay .h{fill:#fff;stroke:#8b5cf6;stroke-width:1.5;pointer-events:all}
#gwTxOverlay .h:hover{fill:#ede9fe}
#gwTxOverlay .rot{fill:#fff;stroke:#4ade80;stroke-width:2;pointer-events:all;cursor:grab}
#gwTxOverlay .rotline{stroke:#8b5cf6;stroke-width:1.5}
#gwTxOverlay .marq{fill:rgba(139,92,246,.10);stroke:#8b5cf6;stroke-width:1;stroke-dasharray:4 3}
#gwTxOverlay .arrow{fill:none;stroke:#16a34a;stroke-width:1.6;stroke-linecap:round;pointer-events:none}`;
  document.head.appendChild(css);
  let ov = null;
  function layer() {
    const w = wrapEl(); if (!w) return null;
    if (!ov || ov.parentNode !== w) { ov = document.createElementNS(NS, 'svg'); ov.id = 'gwTxOverlay'; ov.setAttribute('aria-hidden', 'true'); w.appendChild(ov); }
    return ov;
  }
  const HANDLES = [['nw', 0, 0, 'nwse-resize'], ['n', .5, 0, 'ns-resize'], ['ne', 1, 0, 'nesw-resize'], ['e', 1, .5, 'ew-resize'], ['se', 1, 1, 'nwse-resize'], ['s', .5, 1, 'ns-resize'], ['sw', 0, 1, 'nesw-resize'], ['w', 0, .5, 'ew-resize']];
  function draw() {
    const o = layer(); if (!o) return; o.textContent = '';
    const s = svgEl(), w = wrapEl(), bmp = mode() === 'bitmap'; if (!s || !w || !w.offsetWidth) return;
    const wr = w.getBoundingClientRect(), ox = wr.left + w.clientLeft - w.scrollLeft, oy = wr.top + w.clientTop - w.scrollTop;
    let scr;
    if (bmp) { const c = by('gwBitmapCanvasV15'), r = c?.getBoundingClientRect(); if (!r || !r.width) return; scr = (x, y) => [r.left + x * r.width / c.width - ox, r.top + y * r.height / c.height - oy]; }
    else { T.sel = T.sel.filter(n => n.isConnected && isArt(n)); const S = s.getScreenCTM(); if (!S) return; scr = (x, y) => { const p = new DOMPoint(x, y).matrixTransform(S); return [p.x - ox, p.y - oy]; }; }
    const mk = (tag, a) => { const n = document.createElementNS(NS, tag); for (const k in a) n.setAttribute(k, a[k]); o.appendChild(n); return n; };
    if (T.marquee) { const m = T.marquee, [ax, ay] = scr(Math.min(m.a.x, m.b.x), Math.min(m.a.y, m.b.y)), [bx, by2] = scr(Math.max(m.a.x, m.b.x), Math.max(m.a.y, m.b.y)); mk('rect', { class: 'marq', x: ax, y: ay, width: Math.max(0, bx - ax), height: Math.max(0, by2 - ay) }); }
    const b = bmp ? BS.box() : (T.sel.length ? unionBox(T.sel) : null); if (!b) return;
    const [x0, y0] = scr(b.x0, b.y0), [x1, y1] = scr(b.x1, b.y1);
    mk('rect', { class: 'box', x: x0, y: y0, width: x1 - x0, height: y1 - y0 });
    const cx = (x0 + x1) / 2; mk('line', { class: 'rotline', x1: cx, y1: y0, x2: cx, y2: y0 - 22 });
    const r = mk('circle', { class: 'rot', cx, cy: y0 - 28, r: 8, 'data-h': 'rot' }); r.appendChild(Object.assign(document.createElementNS(NS, 'title'), { textContent: 'Rotate (Shift: 15° steps)' }));
    mk('path', { class: 'arrow', d: `M${cx - 3.5} ${y0 - 31} a4 4 0 1 1 1 5.5 M${cx - 4.5} ${y0 - 26} l1 -2.6 l2.4 1.4` });
    for (const [id, fx, fy, cur] of HANDLES) { const hx = x0 + (x1 - x0) * fx, hy = y0 + (y1 - y0) * fy; const h = mk('rect', { class: 'h', x: hx - 5, y: hy - 5, width: 10, height: 10, rx: 2, 'data-h': id }); h.style.cursor = cur; }
  }

  /* ---------- dragging ---------- */
  function begin(kind, e, extra = {}) {
    const p = pt(e), box = unionBox(T.sel); if (!box) return;
    T.drag = { kind, p0: p, box, items: T.sel.map(el => ({ el, t0: el.getAttribute('transform') || '' })), moved: false, ...extra };
  }
  function onMove(e) {
    const d = T.drag;
    if (T.marquee) { T.marquee.b = pt(e); draw(); return; }
    if (!d) return; e.preventDefault();
    const p = pt(e), D = deltaFor(d.kind, d.p0, p, d.box, e);
    apply(D, d.items); d.moved = true; T.stats.moves++; draw();
  }
  function deltaFor(kind, p0, p, b, e) {
    let D = new DOMMatrix(); const d = { kind, p0 };
    if (d.kind === 'move') {
      let dx = p.x - d.p0.x, dy = p.y - d.p0.y;
      if (e.shiftKey) { if (Math.abs(dx) > Math.abs(dy)) dy = 0; else dx = 0; }
      if (window.GW_V153_VECTOR?.snap) { dx = Math.round((b.x0 + dx) / 8) * 8 - b.x0; dy = Math.round((b.y0 + dy) / 8) * 8 - b.y0; }
      D = new DOMMatrix().translate(dx, dy);
    } else if (d.kind === 'rot') {
      const cx = (b.x0 + b.x1) / 2, cy = (b.y0 + b.y1) / 2;
      let a = (Math.atan2(p.y - cy, p.x - cx) - Math.atan2(d.p0.y - cy, d.p0.x - cx)) * 180 / Math.PI;
      if (e.shiftKey) a = Math.round(a / 15) * 15;
      D = new DOMMatrix().translate(cx, cy).rotate(a).translate(-cx, -cy);
    } else { // resize from the opposite side
      const h = d.kind, fx = h.includes('w') ? 0 : h.includes('e') ? 1 : 0.5, fy = h.includes('n') ? 0 : h.includes('s') ? 1 : 0.5;
      const ax = b.x0 + (b.x1 - b.x0) * (1 - fx), ay = b.y0 + (b.y1 - b.y0) * (1 - fy);
      const hx = b.x0 + (b.x1 - b.x0) * fx, hy = b.y0 + (b.y1 - b.y0) * fy;
      const lim = v => (Math.abs(v) < 0.02 ? (v < 0 ? -0.02 : 0.02) : v);
      let sx = fx === 0.5 ? 1 : lim((p.x - ax) / (hx - ax)), sy = fy === 0.5 ? 1 : lim((p.y - ay) / (hy - ay));
      if (e.shiftKey && fx !== 0.5 && fy !== 0.5) { const k = Math.max(Math.abs(sx), Math.abs(sy)); sx = Math.sign(sx) * k; sy = Math.sign(sy) * k; }
      D = new DOMMatrix().translate(ax, ay).scale(sx, sy).translate(-ax, -ay);
    }
    return D;
  }
  function onUp() {
    if (T.marquee) {
      const m = T.marquee; T.marquee = null; const x0 = Math.min(m.a.x, m.b.x), x1 = Math.max(m.a.x, m.b.x), y0 = Math.min(m.a.y, m.b.y), y1 = Math.max(m.a.y, m.b.y);
      if (x1 - x0 > 2 || y1 - y0 > 2) { const hit = [...svgEl().children].filter(isArt).filter(n => { const b = boxOf(n); return b && b.x0 <= x1 && b.x1 >= x0 && b.y0 <= y1 && b.y1 >= y0; }); setSel(m.add ? [...T.sel, ...hit] : hit); }
      else draw();
      return;
    }
    const d = T.drag; T.drag = null; if (!d) return;
    if (d.moved) { d.items.forEach(({ el }) => tidy(el)); save(); }
    draw();
  }

  function onDown(e) {
    if (e.button !== 0 || !selectToolOn()) return;
    const s = svgEl(), h = e.target.closest?.('#gwTxOverlay [data-h]');
    if (!h && !(s && (e.target === s || s.contains(e.target)))) return;
    e.stopPropagation(); e.preventDefault();
    try { wrapEl()?.focus?.({ preventScroll: true }); } catch {}
    if (h) { undoPush(); begin(h.dataset.h, e); return; }
    const t = topArt(e.target), p = pt(e);
    if (t) {
      if (e.shiftKey) { setSel(T.sel.includes(t) ? T.sel.filter(n => n !== t) : [...T.sel, t]); return; }
      if (!T.sel.includes(t)) setSel([t]);
      undoPush(); begin('move', e); return;
    }
    const b = T.sel.length && unionBox(T.sel);
    if (b && p.x >= b.x0 && p.x <= b.x1 && p.y >= b.y0 && p.y <= b.y1) { undoPush(); begin('move', e); return; } // inside the box: move, like Scratch
    if (!e.shiftKey) setSel([]);
    T.marquee = { a: p, b: p, add: e.shiftKey };
  }

  /* ---------- keys ---------- */
  let keyT = 0, keyUndo = false;
  function onKey(e) {
    if (BS.rect && bmpSelectOn() && !typing(e) && wrapEl()?.offsetWidth) {
      const k = e.key, step = e.shiftKey ? 10 : 1, dir = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[k];
      if (dir) { e.preventDefault(); e.stopPropagation(); if (!keyUndo) { undoPush(); keyUndo = true; } BS.lift(); BS.float.D = new DOMMatrix().translate(dir[0], dir[1]).multiply(BS.float.D); BS.render(); draw(); clearTimeout(keyT); keyT = setTimeout(() => { keyUndo = false; save(); }, 400); return; }
      if (k === 'Delete' || k === 'Backspace') { e.preventDefault(); e.stopPropagation(); BS.erase(); return; }
      if (k === 'Escape') { BS.clear(); return; }
    }
    if (!T.sel.length || typing(e) || mode() !== 'vector' || !wrapEl()?.offsetWidth || document.querySelector('#gw18Anim')) return;
    if (!selectToolOn()) return;
    const k = e.key, step = e.shiftKey ? 10 : 1;
    const dir = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[k];
    if (dir) {
      e.preventDefault(); e.stopPropagation();
      if (!keyUndo) { undoPush(); keyUndo = true; }
      const D = new DOMMatrix().translate(dir[0], dir[1]); T.sel.forEach(el => { el.setAttribute('transform', (fmt(D) + ' ' + (el.getAttribute('transform') || '')).trim()); tidy(el); });
      draw(); clearTimeout(keyT); keyT = setTimeout(() => { keyUndo = false; save(); }, 400); return;
    }
    if ((e.ctrlKey || e.metaKey) && k.toLowerCase() === 'g') { e.preventDefault(); e.stopPropagation(); if (e.shiftKey) ungroup(); else group(); return; }
    if (k === 'Escape') { setSel([]); return; }
    if (k === 'Delete' || k === 'Backspace') { e.preventDefault(); e.stopPropagation(); undoPush(); const gone = T.sel.slice(); setSel([]); gone.forEach(n => n.remove()); save(); }
  }

  /* ---------- Bitmap Select: drag a box, then move / resize / rotate those pixels (they used to stay put, and the
     dashed box was painted INTO the costume) ---------- */
  const bmpCanvas = () => by('gwBitmapCanvasV15');
  const bmpSelectOn = () => mode() === 'bitmap' && document.querySelector('#gwBitmapToolsV15 button.active')?.dataset.gwpe === 'marquee';
  const bpt = e => { const c = bmpCanvas(), r = c.getBoundingClientRect(); return { x: (e.clientX - r.left) * c.width / r.width, y: (e.clientY - r.top) * c.height / r.height }; };
  const BS = T.bitmap = {
    rect: null, float: null, // float: { img, base, r0, D }
    box() {
      if (!this.rect) return null; const r = this.rect; if (!this.float) return { x0: r.x, y0: r.y, x1: r.x + r.w, y1: r.y + r.h };
      const { r0, D } = this.float; let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      for (const [x, y] of [[r0.x, r0.y], [r0.x + r0.w, r0.y], [r0.x, r0.y + r0.h], [r0.x + r0.w, r0.y + r0.h]]) { const p = new DOMPoint(x, y).matrixTransform(D); x0 = Math.min(x0, p.x); y0 = Math.min(y0, p.y); x1 = Math.max(x1, p.x); y1 = Math.max(y1, p.y); }
      return { x0, y0, x1, y1 };
    },
    lift() {
      if (this.float || !this.rect) return; const c = bmpCanvas(), g = c.getContext('2d'), r = { x: Math.round(this.rect.x), y: Math.round(this.rect.y), w: Math.max(1, Math.round(this.rect.w)), h: Math.max(1, Math.round(this.rect.h)) };
      const img = document.createElement('canvas'); img.width = r.w; img.height = r.h; img.getContext('2d').drawImage(c, r.x, r.y, r.w, r.h, 0, 0, r.w, r.h);
      g.clearRect(r.x, r.y, r.w, r.h); const base = g.getImageData(0, 0, c.width, c.height);
      this.float = { img, base, r0: r, D: new DOMMatrix() }; this.rect = r; this.render();
    },
    render() { const f = this.float; if (!f) return; const c = bmpCanvas(), g = c.getContext('2d'); g.putImageData(f.base, 0, 0); g.save(); g.setTransform(f.D); g.imageSmoothingQuality = 'high'; g.drawImage(f.img, f.r0.x, f.r0.y); g.restore(); },
    clear() { this.rect = null; this.float = null; draw(); },
    erase() { if (!this.rect) return false; undoPush(); this.lift(); const f = this.float, c = bmpCanvas(); c.getContext('2d').putImageData(f.base, 0, 0); this.clear(); save(); return true; }
  };
  let bd = null;
  function bmpDown(e) {
    if (e.button !== 0 || !bmpSelectOn()) return; const c = bmpCanvas(), h = e.target.closest?.('#gwTxOverlay [data-h]');
    if (!h && e.target !== c) return;
    e.stopPropagation(); e.preventDefault(); const p = bpt(e), b = BS.box();
    if (h || (b && p.x >= b.x0 && p.x <= b.x1 && p.y >= b.y0 && p.y <= b.y1)) { undoPush(); BS.lift(); bd = { kind: h ? h.dataset.h : 'move', p0: p, box: BS.box(), D0: DOMMatrix.fromMatrix(BS.float.D), moved: false }; return; }
    BS.clear(); bd = { kind: 'marq', p0: p };
  }
  function bmpMove(e) {
    if (!bd) return; e.preventDefault(); const p = bpt(e);
    if (bd.kind === 'marq') { const a = bd.p0; BS.rect = { x: Math.min(a.x, p.x), y: Math.min(a.y, p.y), w: Math.abs(p.x - a.x), h: Math.abs(p.y - a.y) }; draw(); return; }
    const D = deltaFor(bd.kind, bd.p0, p, bd.box, e); BS.float.D = D.multiply(bd.D0); BS.render(); bd.moved = true; draw();
  }
  function bmpUp() { if (!bd) return; const d = bd; bd = null; if (d.kind === 'marq') { if (!BS.rect || BS.rect.w < 2 || BS.rect.h < 2) BS.clear(); else draw(); return; } if (d.moved) save(); draw(); }

  /* ---------- toolbar buttons that work on the whole selection (they only used to see one shape) ---------- */
  const prepend = (el, D) => { el.setAttribute('transform', (fmt(D) + ' ' + (el.getAttribute('transform') || '')).trim()); tidy(el); };
  function group() {
    if (!T.sel.length) return false; const s = svgEl(), list = [...s.children].filter(n => T.sel.includes(n)); if (!list.length) return false;
    undoPush(); const g = document.createElementNS(NS, 'g'); g.setAttribute('data-gwarp-group', '1');
    list[list.length - 1].after(g); list.forEach(n => g.appendChild(n)); setSel([g]); save(); return true;
  }
  function ungroup() {
    const gs = T.sel.filter(n => n.localName === 'g' && !n.hasAttribute('data-gw-orig') && !n.querySelector(':scope > svg')); if (!gs.length) return false;
    undoPush(); const out = [];
    gs.forEach(g => { const gt = g.getAttribute('transform') || ''; [...g.childNodes].forEach(k => { g.before(k); if (k.nodeType === 1) { if (gt) { k.setAttribute('transform', (gt + ' ' + (k.getAttribute('transform') || '')).trim()); tidy(k); } out.push(k); } }); g.remove(); });
    setSel([...T.sel.filter(n => !gs.includes(n)), ...out]); save(); return true;
  }
  function removeSel() { if (!T.sel.length) return false; undoPush(); const gone = T.sel.slice(); setSel([]); gone.forEach(n => n.remove()); save(); return true; }
  function flip(h) {
    const b = unionBox(T.sel); if (!b) return false; undoPush(); const cx = (b.x0 + b.x1) / 2, cy = (b.y0 + b.y1) / 2;
    const D = new DOMMatrix().translate(cx, cy).scale(h ? -1 : 1, h ? 1 : -1).translate(-cx, -cy); T.sel.forEach(el => prepend(el, D)); save(); draw(); return true;
  }
  const ACTIONS = [[/^Group \(/, group], [/^Ungroup/, ungroup], [/^Delete/, removeSel], [/^Flip Horizontal/, () => flip(true)], [/^Flip Vertical/, () => flip(false)]];
  document.addEventListener('click', e => {
    const b = e.target.closest?.('button'); if (!b || mode() !== 'vector' || !T.sel.length || !b.closest('#gwCostumeEditorV15, #gwCosHead, #gwCosStudio, #gwCostumeStudio')) return;
    const t = b.title || b.getAttribute('aria-label') || ''; const a = ACTIONS.find(([re]) => re.test(t)); if (!a) return;
    if (a[1]()) { e.preventDefault(); e.stopImmediatePropagation(); }
  }, true);
  T.group = group; T.ungroup = ungroup; T.flip = flip;

  /* ---------- text: double-click it with Select (or click it with the Text tool) to change the words ---------- */
  const textToolOn = () => mode() === 'vector' && document.querySelector('#gwSvgToolsV15 button.active')?.dataset.gwpe === 'gw:text';
  async function editText(t) {
    const D = window.GW_DIALOG; if (!D || !t) return;
    const inp = document.createElement('input'); inp.type = 'text'; inp.className = 'gw8-q-in'; inp.maxLength = 200; inp.value = t.textContent; inp.setAttribute('aria-label', 'Text');
    setTimeout(() => { inp.focus(); inp.select(); }, 40); inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); by('gwTxTextDlg')?.querySelector('.gw8-dlg-foot .primary')?.click(); } });
    const ok = await D({ id: 'gwTxTextDlg', title: 'Change text', body: inp, buttons: [{ text: 'Cancel', value: false }, { text: 'OK', value: true, cls: 'ai primary' }] });
    const v = inp.value; if (!ok || v === t.textContent) return;
    undoPush(); if (v.trim()) t.textContent = v; else { if (T.sel.includes(t)) setSel(T.sel.filter(n => n !== t)); t.remove(); } save(); draw();
  }
  T.editText = editText;

  /* ---------- wiring ---------- */
  function wire(n = 0) {
    const w = wrapEl(); if (!w) return n < 120 && setTimeout(() => wire(n + 1), 500);
    if (w.__gwTx) return; w.__gwTx = true;
    w.addEventListener('pointerdown', onDown, true);
    w.addEventListener('pointerdown', bmpDown, true); addEventListener('pointermove', bmpMove, true); addEventListener('pointerup', bmpUp, true);
    w.addEventListener('pointerdown', e => { if (e.button !== 0 || !textToolOn()) return; const t = topArt(e.target); if (t?.localName === 'text') { e.stopPropagation(); e.preventDefault(); editText(t); } }, true);
    w.addEventListener('dblclick', e => { if (!selectToolOn()) return; const t = topArt(e.target); if (t?.localName === 'text') { e.preventDefault(); editText(t); } }, true);
    addEventListener('pointermove', onMove, true); addEventListener('pointerup', onUp, true); addEventListener('pointercancel', onUp, true);
    addEventListener('keydown', onKey, true);
    document.addEventListener('click', e => { if (e.target.closest?.('#gwV153ClearSelection')) setSel([]); }, true);
    // other tools, costume switches, undo/redo, zoom: keep the box in the right place (or drop it)
    let sig = '';
    (function tick() {
      requestAnimationFrame(tick);
      const s = svgEl(); if (!s) return;
      if (BS.rect) { if (!bmpSelectOn()) BS.clear(); else { const c = bmpCanvas(), r = c?.getBoundingClientRect(); const k2 = r ? [r.left, r.top, r.width, wrapEl()?.scrollLeft, wrapEl()?.scrollTop].map(v => Math.round(v || 0)).join() : ''; if (k2 !== sig && !bd) { sig = k2; draw(); } } return; }
      if (T.sel.length && (!selectToolOn() || T.sel.some(n => !n.isConnected))) { setSel(T.sel.filter(n => n.isConnected && selectToolOn())); return; }
      if (!T.sel.length && !T.marquee) { if (ov && ov.firstChild) ov.textContent = ''; return; }
      const m = s.getScreenCTM(); const k = m ? [m.a, m.e, m.f].map(v => v.toFixed(2)).join() + '|' + T.sel.map(n => n.getAttribute('transform') || '').join('|') + '|' + (wrapEl()?.scrollLeft || 0) + ',' + (wrapEl()?.scrollTop || 0) : '';
      if (k !== sig && !T.drag) { sig = k; draw(); }
    })();
  }
  T.select = setSel; T.draw = draw; T.box = () => unionBox(T.sel); T.boxOf = boxOf;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => wire()); else wire();
})();
