(() => {
  'use strict';
  /* v15.46.4 (Claude): "Power lines" — G-Warp's own animation idea (owner's TODO).
     While a project runs, ghosted electric wires in the code area show which script starts which:
       broadcast  →  when I receive   (electric green)
       My Block   →  define           (violet)
     Every event hat gets a small electric pole that sparks when its script starts, and a wire flashes with a
     travelling spark each time it carries a message. A broadcast heard by OTHER sprites gets a short wire that
     names them.
     Safe by design: pure drawing on two SVG layers next to #workspaceCanvas (never inside it, so the code-area
     caches are not disturbed), pointer-events none, nothing in the project changes. On/off: More → Settings →
     "Power lines" (on by default). Respects "reduce motion". */
  if (window.GW_POWER_LINES) return;
  const by = id => document.getElementById(id);
  const NS = 'http://www.w3.org/2000/svg';
  const KEY = 'gwarp-power-lines';
  const E = () => window.Engine;
  const mk = (tag, attrs, parent) => { const n = document.createElementNS(NS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); if (parent) parent.appendChild(n); return n; };
  const norm = v => String(v ?? '').trim().toLowerCase();
  const reduce = (() => { try { return matchMedia('(prefers-reduced-motion: reduce)'); } catch { return { matches: false }; } })();

  const PL = window.GW_POWER_LINES = {
    on: true, live: false,
    wires: [], poles: [], sparks: [],
    stats: { layouts: 0, fires: 0, hatFires: 0, layoutMs: 0 },
    set(v) { PL.on = !!v; try { localStorage.setItem(KEY, PL.on ? 'on' : 'off'); } catch {} if (!PL.on) hide(); paintBtn(); },
    relayout() { last = 0; sig = ''; }
  };
  try { PL.on = localStorage.getItem(KEY) !== 'off'; } catch {}

  /* ---------- look ---------- */
  const css = document.createElement('style'); css.id = 'gw-v4640-power-lines-css';
  css.textContent = `
#gwPLBack,#gwPLFront{position:absolute;left:0;top:0;width:1px;height:1px;overflow:visible;pointer-events:none;display:none}
#gwPLFront{z-index:1}
.gw-pl-on #gwPLBack,.gw-pl-on #gwPLFront{display:block}
.gw-pl-w path{fill:none;stroke-linecap:round;stroke-linejoin:round}
.gw-pl-w .glow{stroke-width:8;opacity:.07;transition:opacity .25s}
.gw-pl-w .core{stroke-width:2.2;opacity:.34;stroke-dasharray:3 9;animation:gwPLflow .9s linear infinite;transition:opacity .25s,stroke-width .25s}
.gw-pl-w.hot .glow{opacity:.32}
.gw-pl-w.hot .core{opacity:1;stroke-width:2.8;stroke-dasharray:16 5;animation-duration:.3s}
.gw-pl-bc .core,.gw-pl-bc .glow{stroke:#4ade80}
.gw-pl-mb .core{stroke:#a78bfa}.gw-pl-mb .glow{stroke:#8b5cf6}
.gw-pl-plug{opacity:.5;transition:opacity .25s}.gw-pl-w.hot .gw-pl-plug{opacity:1}
.gw-pl-bc .gw-pl-plug{fill:#4ade80}.gw-pl-mb .gw-pl-plug{fill:#a78bfa}
.gw-pl-tag{font:700 10px Inter,system-ui,sans-serif;fill:#4ade80;opacity:.55;paint-order:stroke;stroke:#0b0b14;stroke-width:3px;transition:opacity .25s}
.gw-pl-w.hot .gw-pl-tag{opacity:1}
@keyframes gwPLflow{to{stroke-dashoffset:-12}}
.gw-pl-pole line,.gw-pl-pole path{fill:none;stroke-linecap:round;stroke-linejoin:round}
.gw-pl-pole .wood{stroke:#8b5cf6;stroke-width:2;opacity:.6}
.gw-pl-pole .cap{fill:#8b5cf6;opacity:.6}
.gw-pl-pole .zap{stroke:#eafff1;stroke-width:1.6;opacity:0}
.gw-pl-pole .ring{fill:none;stroke:#4ade80;stroke-width:2;opacity:0}
.gw-pl-pole.hot .wood{stroke:#4ade80;opacity:1;filter:drop-shadow(0 0 3px #4ade80)}
.gw-pl-pole.hot .cap{fill:#4ade80;opacity:1}
.gw-pl-pole.hot .zap{opacity:1;filter:drop-shadow(0 0 3px #4ade80)}
.gw-pl-pole.hot .ring{opacity:.85;filter:drop-shadow(0 0 5px #4ade80)}
.gw-pl-spark{fill:#f0fff4;filter:drop-shadow(0 0 4px #4ade80) drop-shadow(0 0 2px #4ade80)}
.gw-pl-mb.gw-pl-spark{filter:drop-shadow(0 0 4px #a78bfa) drop-shadow(0 0 2px #8b5cf6)}
@media (prefers-reduced-motion: reduce){.gw-pl-w .core{animation:none}}
`;
  document.head.appendChild(css);

  /* ---------- layers (next to the code canvas, never inside it) ---------- */
  let back = null, front = null, wireG = null, tagG = null, poleG = null, sparkG = null;
  function layers() {
    const ws = by('workspace'), cv = by('workspaceCanvas'); if (!ws || !cv) return false;
    if (!back || !back.isConnected || back.parentNode !== ws) {
      back = mk('svg', { id: 'gwPLBack', 'aria-hidden': 'true' }); wireG = mk('g', {}, back);
      front = mk('svg', { id: 'gwPLFront', 'aria-hidden': 'true' }); tagG = mk('g', {}, front); poleG = mk('g', {}, front); sparkG = mk('g', {}, front);
      ws.insertBefore(back, cv); cv.after(front); sig = '';
    }
    return true;
  }
  function hide() {
    by('workspace')?.classList.remove('gw-pl-on');
    PL.live = false; sig = '';
    if (wireG) wireG.textContent = ''; if (tagG) tagG.textContent = ''; if (poleG) poleG.textContent = ''; if (sparkG) sparkG.textContent = '';
    PL.wires = []; PL.poles = []; PL.sparks = []; fromBlock = new Map(); toHat = new Map();
  }

  /* ---------- reading the code area ---------- */
  const isHat = b => { const t = b?.dataset?.type || ''; return t !== 'define_custom' && (/^when/.test(t) || b.classList?.contains('gw-hat-block')); };
  const ownSel = b => { try { const p = window.GW?.ownParts?.(b); if (p) return p.selects[0] || null; } catch {} return b.querySelector('.block-select'); };
  const msgOf = b => {
    // a reporter dropped into the message slot: the name is only known while running, so no fixed wire
    const slot = b.querySelector('.gw-input-slot'); if (slot && slot.closest('.scratch-block') === b && slot.querySelector('.scratch-block')) return null;
    const s = ownSel(b); return s ? norm(s.value) : null;
  };
  const procOf = b => {
    if (b.dataset.proc) return norm(b.dataset.proc);
    const i = b.dataset.type === 'define_custom' ? b.querySelector(':scope > .block-c-header .block-input') : [...b.querySelectorAll('.block-input')].find(x => x.closest('.scratch-block') === b && x.dataset.slotProxy !== '1');
    return i ? norm(i.value) : null;
  };
  const ownerName = idx => { const s = E()?.sprites?.[idx]; return s ? (s.stageProxy || s.isStage ? 'Stage' : String(s.name || 'sprite')) : null; };

  /* which sprites (other than the one on screen) have a "when I receive <msg>" script */
  function otherReceivers(msg, me) {
    const names = new Set();
    let hats = []; try { hats = window.GW?.hatStacks?.('when_broadcast') || []; } catch {}
    hats.forEach(st => { const o = Number(st.dataset.owner ?? -1); if (String(o) === String(me)) return; if (msgOf(st.firstElementChild) !== msg) return; const n = ownerName(o); if (n) names.add(n); });
    return [...names];
  }

  /* ---------- firing ---------- */
  let fromBlock = new Map();  // sender/call block -> wires
  let toHat = new Map();      // hat/define block -> pole record
  const heat = new WeakMap(); // block -> last fire time (kept across re-layouts)
  function fired(b) {
    const now = performance.now(); heat.set(b, now); PL.stats.fires++;
    const ws = fromBlock.get(b); if (!ws) return;
    for (const w of ws) { w.hotAt = now; if (now - (w.sparkAt || 0) > 260) { w.sparkAt = now; spark(w, now); } if (w.to) { const p = toHat.get(w.to); if (p) p.hotAt = now; } }
  }
  function hatFired(hat) { const p = toHat.get(hat); const now = performance.now(); heat.set(hat, now); PL.stats.hatFires++; if (p) p.hotAt = now; }
  // the runner writes block.__thread just before it runs a block; on the few wire blocks we listen to that write
  function arm(b) {
    if (b.__gwPLArmed) return; let v = b.__thread;
    try { Object.defineProperty(b, '__thread', { configurable: true, enumerable: false, get() { return v; }, set(x) { v = x; if (PL.live) fired(b); } }); b.__gwPLArmed = true; } catch {}
  }
  // receivers of a broadcast (also when the sender is in another sprite)
  function wrapBroadcast(n = 0) {
    const G = window.GW; if (!G?.broadcastThreads) return n < 80 && setTimeout(() => wrapBroadcast(n + 1), 250);
    if (G.broadcastThreads.__gwPL) return;
    const base = G.broadcastThreads;
    const w = function (name) { const out = base.apply(this, arguments); if (PL.live && Array.isArray(out)) for (const t of out) { const hat = t?.blocks?.[0]?.parentElement?.firstElementChild; if (hat) hatFired(hat); } return out; };
    w.__gwPL = true; G.broadcastThreads = w;
  }
  // other hats (green flag, keys, clicks, clones, …): a new script object appears in Engine.threads
  let seen = new WeakSet();
  function scanThreads() {
    const th = E()?.threads; if (!th) return;
    for (let i = 0; i < th.length; i++) { const t = th[i]; if (!t || seen.has(t)) continue; seen.add(t); const hat = t.blocks?.[0]?.parentElement?.firstElementChild; if (hat && toHat.has(hat)) hatFired(hat); }
  }

  /* ---------- layout ---------- */
  let sig = '', last = 0, lastEpoch = -1, lastZoom = 0;
  function layout(now) {
    const t0 = performance.now(); try { layout2(now); } finally { PL.stats.layoutMs += performance.now() - t0; }
  }
  function layout2(now) {
    last = now; lastEpoch = window.GW?.__wsEpoch; lastZoom = window.GW_WSZOOM?.() || 1;
    const ws = by('workspace'), cv = by('workspaceCanvas'); if (!ws || !cv || !layers()) return;
    const wr = ws.getBoundingClientRect(), ox = wr.left + ws.clientLeft - ws.scrollLeft, oy = wr.top + ws.clientTop - ws.scrollTop;
    const box = el => { const r = el.getBoundingClientRect(); return { x: r.left - ox, y: r.top - oy, w: r.width, h: r.height }; };
    const stacks = [...cv.children].filter(st => st.classList?.contains('block-stack') && st.offsetWidth > 0);
    const me = stacks[0]?.dataset.owner ?? '';
    const recv = new Map(), defs = new Map(), senders = [], calls = [], hats = [];
    for (const st of stacks) {
      const f = st.firstElementChild; if (!f) continue;
      if (isHat(f)) { hats.push(f); if (f.dataset.type === 'when_broadcast') { const m = msgOf(f); if (m != null) { if (!recv.has(m)) recv.set(m, []); recv.get(m).push(f); } } }
      if (f.dataset.type === 'define_custom') { const p = procOf(f); if (p) { if (!defs.has(p)) defs.set(p, f); hats.push(f); } }
      st.querySelectorAll('.scratch-block[data-type="broadcast"],.scratch-block[data-type="broadcast_wait"]').forEach(b => senders.push(b));
      st.querySelectorAll('.scratch-block[data-type="call_custom"]').forEach(b => calls.push(b));
    }
    const plan = [];
    for (const b of senders) {
      const m = msgOf(b); if (m == null) continue; const bb = box(b); if (!bb.w) continue;
      (recv.get(m) || []).forEach(h => plan.push({ kind: 'bc', from: b, to: h, a: bb, b: box(h) }));
      const others = otherReceivers(m, me);
      if (others.length) plan.push({ kind: 'bc', from: b, to: null, a: bb, tag: others.length === 1 ? others[0] : others.length + ' sprites', title: others.join(', ') });
    }
    for (const b of calls) { const p = procOf(b), d = p && defs.get(p); if (!d) continue; const bb = box(b); if (bb.w) plan.push({ kind: 'mb', from: b, to: d, a: bb, b: box(d) }); }
    const hatBoxes = hats.map(h => ({ h, r: box(h) })).filter(x => x.r.w);
    const r = v => Math.round(v);
    const s2 = plan.map(p => p.kind + r(p.a.x) + ',' + r(p.a.y) + ',' + r(p.a.w) + (p.b ? ':' + r(p.b.x) + ',' + r(p.b.y) : '#' + p.tag)).join('|') + '/' + hatBoxes.map(x => r(x.r.x) + ',' + r(x.r.y) + ',' + r(x.r.w)).join('|');
    PL.stats.layouts++;
    if (s2 === sig) return; sig = s2;
    draw(plan, hatBoxes);
  }

  function wirePath(a, b) {
    const x1 = a.x + a.w, y1 = a.y + Math.min(a.h / 2, 18), x2 = b.x, y2 = b.y + Math.min(b.h / 2, 18);
    const dx = Math.max(50, Math.abs(x2 - x1) / 2);
    return `M${x1.toFixed(1)} ${y1.toFixed(1)} C${(x1 + dx).toFixed(1)} ${y1.toFixed(1)} ${(x2 - dx).toFixed(1)} ${y2.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  }
  function draw(plan, hatBoxes) {
    const now = performance.now();
    wireG.textContent = ''; tagG.textContent = ''; poleG.textContent = '';
    fromBlock = new Map(); toHat = new Map(); PL.wires = []; PL.poles = [];
    for (const p of plan) {
      const g = mk('g', { class: 'gw-pl-w gw-pl-' + p.kind }, p.to ? wireG : tagG);
      let d;
      if (p.to) d = wirePath(p.a, p.b);
      else { const x1 = p.a.x + p.a.w, y1 = p.a.y + Math.min(p.a.h / 2, 18); d = `M${x1.toFixed(1)} ${y1.toFixed(1)} l34 0`; mk('circle', { class: 'gw-pl-plug', cx: (x1 + 37).toFixed(1), cy: y1.toFixed(1), r: 3 }, g); const t = mk('text', { class: 'gw-pl-tag', x: (x1 + 44).toFixed(1), y: (y1 + 3.5).toFixed(1) }, g); t.textContent = '⚡ ' + p.tag; mk('title', {}, t).textContent = 'Also heard by: ' + p.title; }
      mk('path', { class: 'glow', d }, g); const core = mk('path', { class: 'core', d }, g);
      if (p.to) { const x2 = p.b.x, y2 = p.b.y + Math.min(p.b.h / 2, 18); mk('circle', { class: 'gw-pl-plug', cx: x2.toFixed(1), cy: y2.toFixed(1), r: 3 }, g); }
      const w = { kind: p.kind, g, core, from: p.from, to: p.to, hotAt: heat.get(p.from) || 0, shown: false };
      if (!fromBlock.has(p.from)) fromBlock.set(p.from, []); fromBlock.get(p.from).push(w); PL.wires.push(w); arm(p.from);
    }
    // a little electric pole on top of every start block (hat), near its left end (the right end has the sprite badge)
    const k = Math.max(0.6, Math.min(1.2, window.GW_WSZOOM?.() || 1)); // poles grow and shrink with the code zoom
    for (const { h, r } of hatBoxes) {
      const x = r.x + Math.min(30 * k, r.w / 2), y = r.y + 1, g = mk('g', { class: 'gw-pl-pole', transform: `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${k.toFixed(2)})` }, poleG);
      mk('circle', { class: 'ring', cx: 0, cy: -9, r: 7 }, g);
      mk('line', { class: 'wood', x1: 0, y1: 0, x2: 0, y2: -16 }, g);
      mk('line', { class: 'wood', x1: -6, y1: -12, x2: 6, y2: -12 }, g);
      mk('circle', { class: 'cap', cx: -6, cy: -13.5, r: 1.6 }, g); mk('circle', { class: 'cap', cx: 6, cy: -13.5, r: 1.6 }, g);
      const zap = mk('path', { class: 'zap', d: ZAP[0] }, g);
      const rec = { h, g, zap, hotAt: heat.get(h) || 0, shown: false };
      PL.poles.push(rec); toHat.set(h, rec);
    }
    for (const w of PL.wires) if (w.to && !toHat.has(w.to)) toHat.set(w.to, { h: w.to, g: null, hotAt: 0 });
    tick(now, true);
  }

  /* ---------- sparks running along a wire ---------- */
  function spark(w, now) {
    if (reduce.matches || !w.core || PL.sparks.length > 40) return;
    let len = 0; try { len = w.core.getTotalLength(); } catch {} if (!len) return;
    const c = mk('circle', { class: 'gw-pl-spark gw-pl-' + w.kind, r: 3.4, cx: -99, cy: -99 }, sparkG);
    PL.sparks.push({ c, w, len, t0: now, dur: Math.min(700, 240 + len * 0.9) });
  }

  /* ---------- every frame ---------- */
  const HOT = 650;
  const ZAP = ['M0 -17 l-3 -4 l4 -1 l-3 -5', 'M0 -17 l3 -3 l-4 -2 l3 -4', 'M0 -17 l-2 -5 l4 0 l-2 -4'];
  function tick(now, force) {
    for (const w of PL.wires) { const hot = now - w.hotAt < HOT; if (hot !== w.shown || force) { w.shown = hot; w.g.classList.toggle('hot', hot); } }
    for (const p of PL.poles) {
      const hot = now - p.hotAt < HOT;
      if (hot !== p.shown || force) { p.shown = hot; p.g.classList.toggle('hot', hot); }
      if (hot && !reduce.matches) { // flicker like a real spark
        p.zap.setAttribute('d', ZAP[Math.floor(now / 70) % 3]);
        const ring = p.g.firstChild, f = ((now - p.hotAt) % 420) / 420; ring.setAttribute('r', (4 + f * 9).toFixed(1)); ring.style.opacity = String(0.9 * (1 - f));
      }
    }
    for (let i = PL.sparks.length - 1; i >= 0; i--) {
      const s = PL.sparks[i], f = (now - s.t0) / s.dur;
      if (f >= 1 || !s.w.core.isConnected) { s.c.remove(); PL.sparks.splice(i, 1); continue; }
      try { const pt = s.w.core.getPointAtLength(s.len * f); s.c.setAttribute('cx', pt.x.toFixed(1)); s.c.setAttribute('cy', pt.y.toFixed(1)); } catch {}
    }
  }
  function visible() { const ws = by('workspace'); return !!ws && ws.offsetWidth > 0 && ws.offsetHeight > 0; }
  function loop(now) {
    requestAnimationFrame(loop);
    const e = E(), live = PL.on && !!e?.isRunning && visible();
    if (!live) { if (PL.live || PL.wires.length || PL.poles.length) hide(); return; }
    if (!PL.live) { PL.live = true; seen = new WeakSet(); (e.threads || []).forEach(t => seen.add(t)); by('workspace')?.classList.add('gw-pl-on'); last = 0; sig = ''; }
    const ep = window.GW?.__wsEpoch, z = window.GW_WSZOOM?.() || 1;
    if (now - last > 500 || ((ep !== lastEpoch || z !== lastZoom) && now - last > 120)) layout(now);
    scanThreads();
    tick(now, false);
  }
  // the very first scripts after Start: mark them as fired once the wires exist
  document.addEventListener('click', ev => { if (!ev.target.closest?.('#greenFlagBtn')) return; setTimeout(() => { if (!PL.live) return; const th = E()?.threads || []; th.forEach(t => { const hat = t?.blocks?.[0]?.parentElement?.firstElementChild; if (hat && toHat.has(hat)) hatFired(hat); }); }, 140); }, true);

  /* ---------- More → Settings switch ---------- */
  let btn = null;
  function paintBtn() { if (!btn) return; btn.setAttribute('aria-checked', String(PL.on)); btn.innerHTML = `<i class="fa-solid fa-bolt"></i><span>Power lines</span><span class="gw8-state">${PL.on ? 'On' : 'Off'}</span>`; }
  function addBtn(n = 0) {
    const anchor = by('gw44LookBtn') || by('gw9AdvancedBtn'); if (!anchor) return n < 80 && setTimeout(() => addBtn(n + 1), 300);
    if (by('gw464PowerBtn')) return;
    btn = anchor.cloneNode(false); btn.id = 'gw464PowerBtn'; btn.classList.add('gw8-dev-toggle'); btn.setAttribute('role', 'menuitemcheckbox');
    btn.title = 'While a project runs, show glowing wires from "broadcast" to "when I receive" and from your blocks to their "define". Start blocks spark when they start.';
    btn.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); PL.set(!PL.on); });
    paintBtn(); anchor.after(btn);
    const keep = () => { const a = by('gw44LookBtn') || by('gw9AdvancedBtn'); if (a && a.nextElementSibling !== btn) a.after(btn); };
    by('extra-menu-trigger')?.addEventListener('click', () => setTimeout(keep, 0), true); let k = 0; const t = setInterval(() => { keep(); if (++k > 24) clearInterval(t); }, 500);
  }

  function start() { wrapBroadcast(); addBtn(); requestAnimationFrame(loop); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
