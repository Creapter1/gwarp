/* gw-book.js - THE PROJECT BOOK (Claude Fable, 26 Nov 2026). Step 1a of team/claude/TURBO-STYLE-PLAN.md (owner's decision 26 Nov).

   What it is: the scripts of a project as plain data, not as page pieces. One table of blocks per sprite. Every block has an ID and a
   small record: its kind, the block after it, the block it sits in, the first block of each of its mouths (C blocks), its typed values
   and menu choices, and what sits in its slots. G-Warp's own design and code; the idea (project as data) is how Scratch-family
   editors work, no code was taken from them.

   Step 1a = build it and prove it. NOTHING in the app depends on the Book yet. The proof is the round trip:
       page -> Book -> page   must give the same page again, and   page -> Book -> page -> Book   must give the same Book.
   Check it:  GW_BOOK.check()   (Developer mode shows the result in More > Project Book check).

   Shape of the Book (all plain JSON):
     { v, kinds: [text], sprites: { owner: { scripts: [ {id, x, y, d} ], blocks: { id: {k, t, p, n, m, f, s} } } }, blocks, scripts }
     kinds   every different block form seen, stored once (the block's own page form with holes for values, slots and mouths)
     k kind number   t block type   p parent block ID or null   n next block ID or null
     m first block ID of each mouth (C blocks)   f typed values and menu choices, in order   s what sits in each slot (the slot's own data note, or null)
*/
(() => {
  'use strict';
  const escA = v => String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const escT = v => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const VOID = { input: 1, br: 1, img: 1, hr: 1 };
  // page details that are only "how it looks right now", never part of the project
  const LIVE_CLASS = new Set(['gw8-live', 'gw8-running-block', 'gw-dragging', 'ghost-delete', 'gw10-find-hit', 'gw8-bp-hit', 'gw-remote-drag', 'gw-remote-locked', 'gw8-other-sprite', 'gw-glow', 'has-expr']);
  const LIVE_ATTR = new Set(['data-gw9-opts', 'data-gw-thin', 'data-dragging', 'data-expr', 'data-reporter', 'value', 'data-gwz']);
  const DERIVED = el => el.classList.contains('gw-expr-chip'); // the picture of what sits in a slot: always drawn again from the slot's data note
  const ids = new WeakMap(); let nextId = 1;
  const idOf = el => { let i = ids.get(el); if (!i) { i = 'b' + (nextId++).toString(36); ids.set(el, i); } return i; };
  const isBlock = el => el.nodeType === 1 && el.classList.contains('scratch-block');
  const blocksIn = c => { const out = []; for (let x = c.firstElementChild; x; x = x.nextElementSibling) if (isBlock(x)) out.push(x); return out; };
  let sortCls = false; // undo steps: the same block with its class names in another order is still the same block
  const clsOf = el => { if (sortCls && el.classList.length > 1) { const a = []; for (const c of el.classList) if (!LIVE_CLASS.has(c)) a.push(c); return a.sort().join(' '); } let s = ''; for (const c of el.classList) if (!LIVE_CLASS.has(c)) s += (s ? ' ' : '') + c; return s; };

  /* one walk shared by the reader and the writer, so both always meet the holes in the same order.
     visit.field(el)  an own input / select / textarea        visit.slot(el)  an own slot        visit.mouth(el)  a mouth of a C block
     text: when given, the block's own page form is written into it (the "kind") */
  // a style is always written the way the browser itself spells it ("display: none;"), so the same block always gives the same kind
  function walkOwn(block, visit, text) {
    const open = el => { if (!text) return; let s = '<' + el.localName; for (const a of el.attributes) { if (a.name === 'class') { const c = clsOf(el); if (c) s += ' class="' + escA(c) + '"'; } else if (a.name === 'style') { const c = el.style.cssText; if (c) s += ' style="' + escA(c) + '"'; } else if (a.name === 'style') { const c = block.style.cssText; if (c) s += ' style="' + escA(c) + '"'; } else if (!LIVE_ATTR.has(a.name)) s += ' ' + a.name + '="' + escA(a.value) + '"'; } text.push(s + '>'); };
    const close = el => { if (text && !VOID[el.localName]) text.push('</' + el.localName + '>'); };
    const go = el => {
      for (let c = el.firstChild; c; c = c.nextSibling) {
        if (c.nodeType === 3) { if (text) text.push(escT(c.nodeValue)); continue; }
        if (c.nodeType !== 1) continue;
        const cl = c.classList, tag = c.localName;
        if (cl.contains('block-c-body') && c.parentNode === block) { open(c); visit.mouth(c); close(c); continue; }
        if (isBlock(c)) continue;                                   // a block is never part of another block's own form
        if (DERIVED(c)) continue;
        if (tag === 'select') { open(c); visit.field(c); close(c); continue; }
        if (tag === 'input' || tag === 'textarea') { open(c); visit.field(c); close(c); continue; }
        if (cl.contains('gw-input-slot')) { open(c); visit.slot(c); go(c); close(c); continue; }
        open(c); go(c); close(c);
      }
    };
    if (text) { let s = '<' + block.localName; for (const a of block.attributes) { if (a.name === 'class') { const c = clsOf(block); if (c) s += ' class="' + escA(c) + '"'; } else if (!LIVE_ATTR.has(a.name)) s += ' ' + a.name + '="' + escA(a.value) + '"'; } text.push(s + '>'); }
    go(block);
    if (text) text.push('</' + block.localName + '>');
  }
  /* a filled slot keeps a hidden helper box (data-slot-proxy). While a project runs it holds the slot's last worked-out answer:
     that is run-time state, never part of the project, so the Book always reads it as empty. */
  const liveProxy = el => el.hasAttribute('data-slot-proxy') && !!el.parentNode && el.parentNode.nodeType === 1 && el.parentNode.hasAttribute('data-expr');
  const fieldValue = el => liveProxy(el) ? '' : el.type === 'checkbox' || el.type === 'radio' ? (el.checked ? '1' : '') : String(el.value ?? '');
  const setField = (el, v) => {
    if (el.localName === 'select') { el.textContent = ''; const o = document.createElement('option'); o.value = v; o.textContent = v; o.setAttribute('selected', ''); el.appendChild(o); el.value = v; return; }
    if (el.type === 'checkbox' || el.type === 'radio') { el.checked = !!v; return; }
    if (el.localName === 'textarea') { el.textContent = v; el.value = v; return; }
    el.setAttribute('value', v); el.value = v;
  };

  /* ---------- reader: page -> Book ---------- */
  function read(root) {
    const ws = root || document.getElementById('workspaceCanvas');
    const book = { v: 1, kinds: [], sprites: {}, blocks: 0, scripts: 0 }, kindIx = new Map();
    if (!ws) return book;
    const readBlock = (b, T, parent) => {
      const id = idOf(b), rec = { k: 0, t: b.dataset.type || '', p: parent, n: null, m: [], f: [], s: [] }, text = [], mouths = [];
      walkOwn(b, {
        field: el => rec.f.push(fieldValue(el)),
        slot: el => { let e = null; const raw = el.getAttribute('data-expr'); if (raw) { try { e = JSON.parse(raw); } catch (x) { e = { type: 'literal', value: raw }; } } rec.s.push(e); },
        mouth: el => mouths.push(el)
      }, text);
      const key = text.join(''); let k = kindIx.get(key); if (k === undefined) { k = book.kinds.length; book.kinds.push(key); kindIx.set(key, k); } rec.k = k;
      if (!rec.f.length) delete rec.f; if (!rec.s.length) delete rec.s;
      T.blocks[id] = rec; book.blocks++;
      for (const m of mouths) rec.m.push(readRow(blocksIn(m), T, id));
      if (!rec.m.length) delete rec.m;
      return id;
    };
    const readRow = (row, T, parent) => { let first = null, prev = null; for (const b of row) { const id = readBlock(b, T, parent); if (prev) T.blocks[prev].n = id; else first = id; prev = id; } return first; };
    for (let st = ws.firstElementChild; st; st = st.nextElementSibling) {
      if (!st.classList.contains('block-stack')) continue;
      const row = blocksIn(st); if (!row.length) continue;
      const owner = st.dataset.owner ?? '0', T = book.sprites[owner] || (book.sprites[owner] = { scripts: [], blocks: {} });
      const d = {}; for (const a of st.attributes) if (a.name.startsWith('data-') && a.name !== 'data-owner' && !LIVE_ATTR.has(a.name)) d[a.name] = a.value;
      const sc = { id: readRow(row, T, null), x: st.style.left || '', y: st.style.top || '' }; if (Object.keys(d).length) sc.d = d;
      T.scripts.push(sc); book.scripts++;
    }
    return book;
  }

  /* ---------- writer: Book -> page pieces ---------- */
  const tplCache = new WeakMap();
  function makeBlock(book, T, id) {
    const rec = T.blocks[id]; let tpls = tplCache.get(book); if (!tpls) tplCache.set(book, tpls = []);
    let tpl = tpls[rec.k]; if (!tpl) { tpl = tpls[rec.k] = document.createElement('template'); tpl.innerHTML = book.kinds[rec.k]; }
    const b = tpl.content.firstElementChild.cloneNode(true); ids.set(b, id);
    let fi = 0, si = 0, mi = 0; const slots = [];
    walkOwn(b, {
      field: el => setField(el, rec.f ? rec.f[fi++] ?? '' : ''),
      slot: el => { const e = rec.s ? rec.s[si++] : null; if (e) slots.push([el, e]); },
      mouth: el => { let c = rec.m ? rec.m[mi++] : null; while (c) { el.appendChild(makeBlock(book, T, c)); c = T.blocks[c].n; } }
    });
    const set = window.GW9 && window.GW9.setSlotNode;
    for (const [el, e] of slots) { if (set) set(el, JSON.parse(JSON.stringify(e))); else { el.setAttribute('data-expr', JSON.stringify(e)); el.classList.add('has-expr'); } }
    return b;
  }
  function makeScript(book, owner, sc) {
    const T = book.sprites[owner], st = document.createElement('div'); st.className = 'block-stack'; st.dataset.owner = owner;
    if (sc.d) for (const k in sc.d) st.setAttribute(k, sc.d[k]);
    if (sc.x) st.style.left = sc.x; if (sc.y) st.style.top = sc.y;
    let c = sc.id; while (c) { st.appendChild(makeBlock(book, T, c)); c = T.blocks[c].n; }
    return st;
  }
  /* build every script of one sprite (or of all sprites) as page pieces inside `into` (a spare box, never the real code area in step 1a) */
  function write(book, into, owner) {
    for (const o of Object.keys(book.sprites)) { if (owner != null && String(owner) !== o) continue; for (const sc of book.sprites[o].scripts) into.appendChild(makeScript(book, o, sc)); }
    return into;
  }

  /* ---------- the proof: is a rebuilt page the same page? ---------- */
  const same = (a, b, path, out) => {
    if (out.length >= 12) return;
    if (a.nodeType !== b.nodeType) { out.push(path + ': different kind of node'); return; }
    if (a.nodeType === 3) { if (a.nodeValue !== b.nodeValue) out.push(path + ': text "' + a.nodeValue.slice(0, 30) + '" vs "' + b.nodeValue.slice(0, 30) + '"'); return; }
    if (a.nodeType !== 1) return;
    if (a.localName !== b.localName) { out.push(path + ': <' + a.localName + '> vs <' + b.localName + '>'); return; }
    const here = path + '/' + a.localName + (a.dataset && a.dataset.type ? '[' + a.dataset.type + ']' : a.classList[0] ? '.' + a.classList[0] : '');
    const attrs = el => { const m = {}; for (const at of el.attributes) { if (at.name === 'class') { const c = [...el.classList].filter(x => !LIVE_CLASS.has(x) || x === 'has-expr').sort().join(' '); if (c) m.class = c; } else if (at.name === 'style') { const s = at.value.replace(/\s+/g, '').replace(/z-index:[^;]*;?/g, '').replace(/;$/, ''); if (s) m.style = s; } /* z-index is only "which script is on top after a drag" */ else if (at.name === 'data-expr' || !LIVE_ATTR.has(at.name)) m[at.name] = at.value; } return m; };
    const A = attrs(a), B = attrs(b);
    for (const k of new Set([...Object.keys(A), ...Object.keys(B)])) if (A[k] !== B[k]) { out.push(here + ': ' + k + ' = "' + String(A[k]).slice(0, 60) + '" vs "' + String(B[k]).slice(0, 60) + '"'); if (out.length >= 12) return; }
    const tag = a.localName;
    if (tag === 'input' || tag === 'select' || tag === 'textarea') { if (fieldValue(a) !== fieldValue(b)) out.push(here + ': value "' + fieldValue(a).slice(0, 40) + '" vs "' + fieldValue(b).slice(0, 40) + '"'); if (tag === 'select') return; }
    const kids = el => [...el.childNodes].filter(n => n.nodeType === 1 || (n.nodeType === 3 && n.nodeValue.trim() !== ''));
    const ka = kids(a), kb = kids(b);
    if (ka.length !== kb.length) { out.push(here + ': ' + ka.length + ' parts vs ' + kb.length + ' (' + ka.map(n => n.localName || '#text').join(',').slice(0, 80) + ' | ' + kb.map(n => n.localName || '#text').join(',').slice(0, 80) + ')'); return; }
    for (let i = 0; i < ka.length; i++) same(ka[i], kb[i], here, out);
  };
  const plain = book => { // the Book without the IDs' own names, so two Books of the same scripts compare equal
    const out = { kinds: book.kinds, sprites: {} };
    for (const o of Object.keys(book.sprites)) { const T = book.sprites[o]; const tree = id => { const r = T.blocks[id], x = { k: book.kinds[r.k], t: r.t }; if (r.f) x.f = r.f; if (r.s) x.s = r.s; if (r.m) x.m = r.m.map(row); return x; }; const row = id => { const a = []; while (id) { a.push(tree(id)); id = T.blocks[id].n; } return a; }; out.sprites[o] = T.scripts.map(sc => ({ x: sc.x, y: sc.y, d: sc.d || null, b: row(sc.id) })); }
    return out;
  };
  function check(opts) {
    const o = opts || {}, t0 = performance.now(), ws = document.getElementById('workspaceCanvas');
    const mute = window.GW8 && 'historyMute' in window.GW8 ? window.GW8.historyMute : undefined;
    const book = read(), t1 = performance.now();
    const box = document.createElement('div'); write(book, box); const t2 = performance.now();
    const diffs = []; const onPage = [...ws.children].filter(s => s.classList.contains('block-stack') && blocksIn(s).length), made = [...box.children];
    const real = []; for (const ow of Object.keys(book.sprites)) for (const s of onPage) if ((s.dataset.owner ?? '0') === ow) real.push(s); // the Book keeps each sprite's scripts together; on the page they can be mixed
    if (real.length !== made.length) diffs.push('scripts: ' + real.length + ' on the page, ' + made.length + ' rebuilt');
    let scriptsSame = 0;
    for (let i = 0; i < Math.min(real.length, made.length); i++) { const before = diffs.length; if (diffs.length < 12) same(real[i], made[i], 'script ' + (i + 1), diffs); if (diffs.length === before) scriptsSame++; }
    const again = read(box), sameBook = JSON.stringify(plain(book).sprites) === JSON.stringify(plain(again).sprites);
    if (mute !== undefined) window.GW8.historyMute = mute;
    const text = JSON.stringify(book);
    const res = { ok: !diffs.length && sameBook, samePage: !diffs.length, sameBook, scripts: book.scripts, scriptsSame, blocks: book.blocks, kinds: book.kinds.length, bookKB: Math.round(text.length / 1024), pageKB: Math.round(ws.innerHTML.length / 1024), readMs: Math.round(t1 - t0), writeMs: Math.round(t2 - t1), diffs };
    if (!o.quiet) console.log('[Project Book]', res.ok ? 'OK' : 'NOT THE SAME', res);
    return res;
  }

  /* the Book of the page as it is now; read again only after something changed */
  let cur = null, curEp = -1, dirty = true;
  ['input', 'change'].forEach(t => addEventListener(t, e => { if (e.target && e.target.closest && e.target.closest('#workspaceCanvas')) dirty = true; }, true));
  const get = () => { const ep = window.GW && window.GW.__wsEpoch; if (!cur || dirty || ep !== curEp || ep === undefined) { cur = read(); curEp = ep; dirty = false; } return cur; };

  /* ---------- step 1b part a (26 Nov): Undo / Redo keep the Book, not the page text ----------
     An undo step is a list with one small text per script, in page order. A script that did not change between two steps is the SAME text
     in both (kept once in memory), so a step costs only the scripts that changed. Putting a step back rebuilds only the scripts that differ.
     Anything in the code area that is not a plain script (a comment, an empty box, a legacy slot) is kept as its own page text, as before. */
  const K = { list: [], ix: new Map(), tpl: [] };            // every block form seen in this session, stored once
  let pool = new Map();                                        // the texts of the newest step, so the next step can share them
  const treeOf = b => {
    const x = { k: 0 }, text = [], f = [], s = [], mouths = [];
    sortCls = true; try { walkOwn(b, { field: el => f.push(fieldValue(el)), slot: el => { let e = null; const raw = el.getAttribute('data-expr'); if (raw) { try { e = JSON.parse(raw); } catch (err) { e = { type: 'literal', value: raw }; } } s.push(e); }, mouth: el => mouths.push(el) }, text); } finally { sortCls = false; }
    const key = text.join(''); let k = K.ix.get(key); if (k === undefined) { k = K.list.length; const own = [], no = () => {}; walkOwn(b, { field: no, slot: no, mouth: no }, own); K.list.push(own.join('')); /* built again exactly as first seen */ K.ix.set(key, k); } x.k = k;
    if (f.length) x.f = f; if (s.length) x.s = s; if (mouths.length) x.m = mouths.map(m => blocksIn(m).map(treeOf));
    return x;
  };
  const plainScript = st => { if (!st.classList.contains('block-stack') || st.id) return false; let n = 0; for (let c = st.firstElementChild; c; c = c.nextElementSibling) { if (!isBlock(c)) return false; n++; } return n > 0 && !st.querySelector('.has-report'); };
  const itemOf = el => {
    if (!plainScript(el)) return 'R' + el.outerHTML;
    const o = { o: el.dataset.owner ?? null, y: el.style.cssText.replace(/\s*z-index:[^;]*;?/g, '').trim() /* z-index = which script is on top after a drag, not part of the project */, b: blocksIn(el).map(treeOf) }, c = clsOf(el), d = {}; let any = 0;
    if (c !== 'block-stack') o.c = c;
    for (const a of el.attributes) if (a.name.startsWith('data-') && a.name !== 'data-owner' && !LIVE_ATTR.has(a.name)) { d[a.name] = a.value; any = 1; }
    if (any) o.d = d;
    return 'S' + JSON.stringify(o);
  };
  const buildTree = x => {
    let tpl = K.tpl[x.k]; if (!tpl) { tpl = K.tpl[x.k] = document.createElement('template'); tpl.innerHTML = K.list[x.k]; }
    const b = tpl.content.firstElementChild.cloneNode(true); let fi = 0, si = 0, mi = 0; const slots = [];
    walkOwn(b, { field: el => setField(el, x.f ? x.f[fi++] ?? '' : ''), slot: el => { const e = x.s ? x.s[si++] : null; if (e) slots.push([el, e]); }, mouth: el => { const row = x.m ? x.m[mi++] : null; if (row) for (const c of row) el.appendChild(buildTree(c)); } });
    const set = window.GW9 && window.GW9.setSlotNode;
    for (const [el, e] of slots) { if (set) set(el, e); else { el.setAttribute('data-expr', JSON.stringify(e)); el.classList.add('has-expr'); } }
    return b;
  };
  const buildItem = s => {
    if (s[0] === 'R') { const t = document.createElement('template'); t.innerHTML = s.slice(1); return t.content.firstElementChild; }
    const o = JSON.parse(s.slice(1)), st = document.createElement('div'); st.className = o.c || 'block-stack'; if (o.o !== null) st.dataset.owner = o.o;
    if (o.d) for (const k in o.d) st.setAttribute(k, o.d[k]); if (o.y) st.style.cssText = o.y;
    for (const x of o.b) st.appendChild(buildTree(x));
    return st;
  };
  /* the code area as an undo step */
  function snap(root) {
    const ws = root || document.getElementById('workspaceCanvas'), items = [], next = new Map(); let fresh = 0;
    if (ws) for (let el = ws.firstElementChild; el; el = el.nextElementSibling) { let s = itemOf(el); const old = pool.get(s); if (old !== undefined) s = old; else if (!next.has(s)) fresh += s.length; else s = next.get(s); next.set(s, s); items.push(s); }
    pool = next;
    return { items, fresh, toJSON() { return 0; } };
  }
  /* put an undo step back: scripts that are already the same stay as they are, only the others are built */
  function unsnap(step, root, all) {
    const ws = root || document.getElementById('workspaceCanvas'), have = new Map(); let built = 0;
    if (!all) for (let el = ws.firstElementChild; el; el = el.nextElementSibling) { const s = itemOf(el); const q = have.get(s); if (q) q.push(el); else have.set(s, [el]); }
    const want = step.items.map(s => { const q = have.get(s); if (q && q.length) return q.shift(); built++; return buildItem(s); }), keep = new Set(want);
    for (const el of [...ws.children]) if (!keep.has(el)) el.remove();
    for (let i = 0; i < want.length; i++) if (ws.children[i] !== want[i]) ws.insertBefore(want[i], ws.children[i] || null);
    const next = new Map(); for (const s of step.items) next.set(s, s); pool = next; dirty = true;
    return built;
  }
  const stepHtml = step => { const box = document.createElement('div'); for (const s of step.items) box.appendChild(buildItem(s)); return box.innerHTML; };
  const sameStep = (a, b) => { if (a.items.length !== b.items.length) return false; for (let i = 0; i < a.items.length; i++) if (a.items[i] !== b.items[i]) return false; return true; };
  /* how many letters the given steps keep in memory together (a text shared by many steps counts once) */
  const stepChars = steps => { const seen = new Set(); let n = 0; for (const st of steps) if (st && st.items) for (const s of st.items) if (!seen.has(s)) { seen.add(s); n += s.length; } return n; };

  window.GW_BOOK = { version: 2, read, write, check, get, plain, idOf, same, last: null, touch: () => { dirty = true; }, snap, unsnap, stepHtml, sameStep, stepChars, itemOf, kindText: k => K.list[k] };

  /* Developer mode only: a quiet check a few seconds after a project is opened or the code changed a lot, in the browser's free time.
     The result is kept in GW_BOOK.last. Only a failure is shown (console + one small message), so step 1a can be watched on real projects. */
  const devOn = () => { try { const v = localStorage.getItem('gwarp-dev-mode'); const desk = !!(window.gwarpDesktop || window.electronAPI || /electron/i.test(navigator.userAgent)); return desk ? v !== 'off' : /[?&]dev=1\b/.test(location.search) && v !== 'off'; } catch (e) { return false; } };
  let seenBlocks = -1, timer = 0, lastRun = 0, lastTouch = 0;
  ['pointerdown', 'pointermove', 'keydown', 'wheel'].forEach(t => addEventListener(t, () => { lastTouch = performance.now(); }, { capture: true, passive: true }));
  const auto = () => {
    timer = 0; if (!devOn() || (window.Engine && window.Engine.isRunning) || window.GW_DRAG_AT > 0) return;
    const ws = document.getElementById('workspaceCanvas'); if (!ws) return; const n = ws.getElementsByClassName('scratch-block').length;
    const now = performance.now(); if (n === seenBlocks || !n || now - lastTouch < 5000 || (lastRun && now - lastRun < 300000)) return; seenBlocks = n; lastRun = now; // at most once in 5 minutes, and never while the user is busy (0.6 s on a 2,000-block project)
    const run = () => { try { const r = check({ quiet: 1 }); window.GW_BOOK.last = r; if (!r.ok) { console.warn('[Project Book] round trip is NOT the same', r); try { window.GW && window.GW.toast && window.GW.toast('Project Book check (Developer mode): ' + r.diffs.length + ' difference' + (r.diffs.length === 1 ? '' : 's') + '. Tell Claude: "book check failed".'); } catch (e) {} } } catch (e) { window.GW_BOOK.last = { ok: false, error: String(e && e.message || e) }; console.warn('[Project Book] check failed to run', e); } };
    (window.requestIdleCallback || (f => setTimeout(f, 50)))(run, { timeout: 4000 });
  };
  const poll = () => { if (!timer) timer = setTimeout(auto, 6000); };
  const tick = setInterval(poll, 15000); if (tick && tick.unref) tick.unref();
})();
