(() => {
  'use strict';
  /* v15.47.0 (Claude): Flipbook tools — costume animation, frame by frame (the way most Scratch animations are made:
     one costume per frame, then "next costume" in a loop). Same idea as the onion-skin add-on people use with
     Scratch / TurboWarp, in G-Warp's own look:
       • Onion skin (button in the paint editor's bottom bar, Vector and Bitmap): the costume before shows faintly in
         violet and the one after in green, BEHIND your drawing, lined up by rotation centre — so the next frame can be
         drawn in the right place. It is only a picture behind the editor; it is never saved into the costume.
         When it is on, a small strip lets you pick how many costumes before / after and how strong.
       • ▶ Play (under the costume list): a little player over the editor flips through the sprite's costumes in
         order, lined up by rotation centre like on the stage. Speed (frames per second), loop, and which costumes.
     Nothing in the project changes. Settings are remembered on this computer only. */
  if (window.GW_FLIPBOOK) return;
  const by = id => document.getElementById(id);
  const E = () => window.Engine;
  const spr = () => E()?.sprites?.[E()?.activeSpriteIndex] || null;
  const KEY = 'gwarp-flipbook';
  const S = { onion: false, before: 1, after: 0, strength: 35, fps: 8, loop: true };
  try { Object.assign(S, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const h = (tag, props = {}, ...kids) => { const el = document.createElement(tag); for (const [k, v] of Object.entries(props)) { if (k === 'class') el.className = v; else if (k === 'text') el.textContent = v; else if (k === 'html') el.innerHTML = v; else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v); else if (v != null) el.setAttribute(k, v); } kids.flat().forEach(c => c != null && el.append(c)); return el; };
  const ONION_ICON = '<svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"><rect x="2.5" y="6.5" width="11" height="11" rx="2.5" fill="none" stroke="#8b5cf6" stroke-width="1.8" opacity=".75"/><rect x="10.5" y="6.5" width="11" height="11" rx="2.5" fill="none" stroke="#4ade80" stroke-width="1.8" opacity=".75"/><rect x="6.5" y="4.5" width="11" height="15" rx="2.5" fill="currentColor" opacity=".9"/></svg>';

  const css = document.createElement('style'); css.id = 'gw-v4700-flipbook-css';
  css.textContent = `
#gwpeOnion svg{display:block}
#gwOnionBar{position:absolute;left:12px;bottom:6px;z-index:6;display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:5px 10px;border-radius:10px;background:rgba(11,11,20,.88);border:1px solid #3b2a77;color:#e5e7eb;font:700 11.5px Inter,system-ui,sans-serif;box-shadow:0 6px 18px rgba(0,0,0,.45)}
#gwOnionBar b{color:#c4b5fd}#gwOnionBar label{display:inline-flex;align-items:center;gap:4px}
#gwOnionBar select{background:#0b0b14;color:#fff;border:1px solid #34344a;border-radius:6px;padding:1px 4px;font:inherit}
#gwOnionBar input[type=range]{width:70px;accent-color:#8b5cf6}
#gwOnionBar .b{color:#c4b5fd}#gwOnionBar .a{color:#86efac}
#gwFlipbook{position:absolute;right:12px;top:12px;z-index:7;width:236px;padding:8px;border-radius:12px;background:#0d0f1c;border:1px solid #3b2a77;box-shadow:0 14px 40px rgba(0,0,0,.6);color:#e5e7eb;font:700 11.5px Inter,system-ui,sans-serif}
#gwFlipbook .fb-head{display:flex;align-items:center;gap:6px;margin-bottom:6px}
#gwFlipbook .fb-head b{flex:1;color:#fff;font-size:12.5px}#gwFlipbook .fb-head i.fa-bolt{color:#4ade80}
#gwFlipbook canvas{display:block;width:220px;height:165px;border-radius:8px;background:#fff;box-shadow:0 0 0 1px #34344a}
#gwFlipbook .fb-row{display:flex;align-items:center;gap:6px;margin-top:6px;flex-wrap:wrap}
#gwFlipbook button{height:26px;min-width:26px;padding:0 8px;border-radius:7px;border:1px solid #34344a;background:#1b1d33;color:#e5e7eb;font:inherit;cursor:pointer}
#gwFlipbook button:hover{background:#262a45}
#gwFlipbook button.go{background:linear-gradient(135deg,#7c3aed,#4f46e5);border-color:#8b5cf6;color:#fff}
#gwFlipbook input[type=number]{width:44px;background:#0b0b14;color:#fff;border:1px solid #34344a;border-radius:6px;padding:2px 4px;font:inherit}
#gwFlipbook .fb-info{color:#94a3b8;font-weight:600;min-height:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#gwFlipbook label{display:inline-flex;align-items:center;gap:4px}
#gwFlipbook input[type=checkbox]{accent-color:#8b5cf6}
`;
  document.head.appendChild(css);

  /* ================= onion skin ================= */
  const ids = new WeakMap(); let idN = 0; const idOf = o => { if (!o) return 0; let v = ids.get(o); if (!v) { v = ++idN; ids.set(o, v); } return v; };
  const sizeOf = c => ({ w: (c.canvas?.width || 0) / (c.res || 1), h: (c.canvas?.height || 0) / (c.res || 1) });
  const surfaces = () => [by('gwVectorCanvasV15'), by('gwBitmapCanvasV15')].filter(Boolean);
  const base = new WeakMap(); // the editor's own background (checkerboard), kept to put back
  let url = '', sig = '', busy = false;
  function clearOnion() {
    surfaces().forEach(el => { if (el.dataset.gwOnion) { ['background-image', 'background-size', 'background-repeat', 'background-position'].forEach(p => el.style.removeProperty(p)); delete el.dataset.gwOnion; } });
    if (url) { URL.revokeObjectURL(url); url = ''; } sig = '';
  }
  function neighbours(s) {
    const cs = s.costumes || [], i = s.activeCostume | 0, out = [];
    for (let k = S.before; k >= 1; k--) if (cs[i - k]?.canvas) out.push({ c: cs[i - k], k, side: 'b' });
    for (let k = S.after; k >= 1; k--) if (cs[i + k]?.canvas) out.push({ c: cs[i + k], k, side: 'a' });
    return out;
  }
  function tinted(c, color) {
    const t = document.createElement('canvas'); t.width = c.canvas.width; t.height = c.canvas.height; const x = t.getContext('2d');
    x.drawImage(c.canvas, 0, 0); x.globalCompositeOperation = 'source-atop'; x.globalAlpha = 0.55; x.fillStyle = color; x.fillRect(0, 0, t.width, t.height); return t;
  }
  function renderOnion() {
    const s = spr(), map = window.GW_VECTOR_EDITOR?.mapFor; const c = s?.costumes?.[s.activeCostume];
    if (!S.onion || !s || !c || !map || !editorShown()) { if (sig) clearOnion(); return; }
    const list = neighbours(s), m = map(c), rc = c.rc || { x: 0, y: 0 };
    const key = [E().activeSpriteIndex, s.activeCostume, idOf(c), c.canvas?.width, c.canvas?.height, rc.x, rc.y, S.before, S.after, S.strength, list.map(n => idOf(n.c) + ':' + idOf(n.c.canvas) + ':' + (n.c.rc?.x) + ',' + (n.c.rc?.y)).join(';')].join('|');
    const need = surfaces().some(el => !el.dataset.gwOnion);
    if (key === sig && !need) return;
    if (busy) return; sig = key;
    if (!list.length) { clearOnion(); sig = key; return; }
    const Z = 2, oc = document.createElement('canvas'); oc.width = 512 * Z; oc.height = 384 * Z; const x = oc.getContext('2d');
    for (const n of list) {
      const r = n.c.rc || { x: 0, y: 0 }, sz = sizeOf(n.c); if (!sz.w || !sz.h) continue;
      const fade = 1 - (n.k - 1) / ((n.side === 'b' ? S.before : S.after) + 1);
      x.globalAlpha = clamp(S.strength / 100, 0.05, 0.9) * fade;
      x.drawImage(tinted(n.c, n.side === 'b' ? '#8b5cf6' : '#22c55e'), (m.ox + (rc.x - r.x) * m.k) * Z, (m.oy + (rc.y - r.y) * m.k) * Z, sz.w * m.k * Z, sz.h * m.k * Z);
    }
    busy = true;
    oc.toBlob(b => {
      busy = false; if (!b || sig !== key) return;
      const old = url; url = URL.createObjectURL(b);
      surfaces().forEach(el => {
        if (!el.dataset.gwOnion || !base.has(el)) { const cs = getComputedStyle(el); base.set(el, { img: cs.backgroundImage, size: cs.backgroundSize, rep: cs.backgroundRepeat, pos: cs.backgroundPosition }); }
        const b0 = base.get(el), hasBase = b0.img && b0.img !== 'none';
        el.style.setProperty('background-image', `url("${url}")` + (hasBase ? ', ' + b0.img : ''), 'important');
        el.style.setProperty('background-size', '100% 100%' + (hasBase ? ', ' + b0.size : ''), 'important');
        el.style.setProperty('background-repeat', 'no-repeat' + (hasBase ? ', ' + b0.rep : ''), 'important');
        el.style.setProperty('background-position', '0 0' + (hasBase ? ', ' + b0.pos : ''), 'important');
        el.dataset.gwOnion = '1';
      });
      if (old) setTimeout(() => URL.revokeObjectURL(old), 500);
    }, 'image/png');
  }
  function editorShown() { const w = by('gwCostumeCanvasWrapV15'); return !!w && w.offsetWidth > 0 && w.offsetHeight > 0; }
  function setOnion(on) { S.onion = !!on; save(); if (!S.onion) clearOnion(); paint(); renderOnion(); }

  function paint() {
    const b = by('gwpeOnion'); if (b) { b.classList.toggle('on', S.onion); b.setAttribute('aria-pressed', String(S.onion)); }
    const wrap = by('gwCostumeCanvasWrapV15'); let bar = by('gwOnionBar');
    if (!S.onion || !wrap) { bar?.remove(); return; }
    if (!bar) {
      const num = (cls, key, max) => { const sel = h('select', { 'aria-label': key === 'before' ? 'Costumes before' : 'Costumes after' }); for (let i = 0; i <= max; i++) sel.append(h('option', { value: String(i), text: String(i) })); sel.value = String(S[key]); sel.addEventListener('change', () => { S[key] = +sel.value; save(); renderOnion(); }); return h('label', { class: cls }, key === 'before' ? 'before' : 'after', sel); };
      const rng = h('input', { type: 'range', min: '10', max: '80', value: String(S.strength), 'aria-label': 'Onion skin strength' }); rng.addEventListener('input', () => { S.strength = +rng.value; save(); renderOnion(); });
      bar = h('div', { id: 'gwOnionBar', role: 'group', 'aria-label': 'Onion skin settings' }, h('b', { text: 'Onion skin' }), num('b', 'before', 3), num('a', 'after', 3), h('label', {}, 'strength', rng),
        h('button', { type: 'button', title: 'Turn onion skin off', 'aria-label': 'Turn onion skin off', style: 'background:none;border:0;color:#94a3b8;cursor:pointer;font:inherit', onclick: () => setOnion(false), html: '<i class="fa-solid fa-xmark"></i>' }));
      wrap.appendChild(bar);
    }
  }
  function addOnionButton() {
    if (by('gwpeOnion')) return; const grid = by('gwpeGrid'); if (!grid) return;
    const b = h('button', { type: 'button', id: 'gwpeOnion', class: 'gwpe-tg', title: 'Onion skin: see the costume before (violet) and after (green) behind your drawing', 'aria-label': 'Onion skin', 'aria-pressed': 'false', html: ONION_ICON });
    b.addEventListener('click', () => setOnion(!S.onion));
    grid.before(b); paint();
  }

  /* ================= flipbook player ================= */
  const P = { timer: 0, i: 0, from: 1, to: 0, frames: [], box: null };
  function frameList(s) { const cs = s?.costumes || []; const a = clamp(P.from | 0, 1, cs.length || 1), b = clamp((P.to | 0) || cs.length, a, cs.length || 1); return cs.slice(a - 1, b).map((c, k) => ({ c, n: a + k })).filter(f => f.c?.canvas); }
  function unionBox(list) { let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity; for (const { c } of list) { const r = c.rc || { x: 0, y: 0 }, z = sizeOf(c); x0 = Math.min(x0, -r.x); y0 = Math.min(y0, -r.y); x1 = Math.max(x1, -r.x + z.w); y1 = Math.max(y1, -r.y + z.h); } return Number.isFinite(x0) ? { x0, y0, w: Math.max(1, x1 - x0), h: Math.max(1, y1 - y0) } : null; }
  function drawFrame() {
    const cv = by('gwFlipCanvas'), s = spr(); if (!cv || !s) return; const x = cv.getContext('2d'); x.setTransform(1, 0, 0, 1, 0, 0); x.clearRect(0, 0, cv.width, cv.height);
    const f = P.frames[P.i], B = P.box; const info = by('gwFlipInfo');
    if (!f || !B) { if (info) info.textContent = 'No costumes to play.'; return; }
    const k = Math.min((cv.width - 16) / B.w, (cv.height - 16) / B.h), ox = (cv.width - B.w * k) / 2 - B.x0 * k, oy = (cv.height - B.h * k) / 2 - B.y0 * k;
    const r = f.c.rc || { x: 0, y: 0 }, z = sizeOf(f.c); x.imageSmoothingQuality = 'high';
    x.drawImage(f.c.canvas, ox - r.x * k, oy - r.y * k, z.w * k, z.h * k);
    if (info) info.textContent = `${P.i + 1} / ${P.frames.length} · ${f.n}. ${f.c.name}`;
  }
  function stopPlay() { clearInterval(P.timer); P.timer = 0; const b = by('gwFlipGo'); if (b) b.innerHTML = '<i class="fa-solid fa-play"></i>'; }
  function startPlay() {
    stopPlay(); const s = spr(); P.frames = frameList(s); P.box = unionBox(P.frames); if (!P.frames.length) { drawFrame(); return; }
    if (P.i >= P.frames.length) P.i = 0; drawFrame();
    const b = by('gwFlipGo'); if (b) b.innerHTML = '<i class="fa-solid fa-stop"></i>';
    P.timer = setInterval(() => {
      if (!by('gwFlipbook') || spr() !== s) return closePlayer();
      if (P.i + 1 >= P.frames.length) { if (!S.loop) return stopPlay(); P.i = 0; } else P.i++;
      drawFrame();
    }, 1000 / clamp(S.fps, 1, 30));
  }
  // which costumes to play first: the frames of the animation / numbered group the selected costume belongs to
  // ("run 1"…"run 7", "walk1"…"walk4"), otherwise all of them
  function group(s) {
    const cs = s.costumes || [], i = s.activeCostume | 0, c = cs[i], all = [1, Math.max(1, cs.length)]; if (!c) return all;
    const same = c.gwAnimFrame ? (x => x?.gwAnimFrame?.anim === c.gwAnimFrame.anim) : (() => { const m = /^(.*?)\s*\d+$/.exec(c.name || ''); const stem = m && m[1].trim().toLowerCase(); return stem ? (x => { const k = /^(.*?)\s*\d+$/.exec(x?.name || ''); return !!k && k[1].trim().toLowerCase() === stem; }) : null; })();
    if (!same) return all; let a = i, b = i; while (a > 0 && same(cs[a - 1])) a--; while (b < cs.length - 1 && same(cs[b + 1])) b++;
    return b > a ? [a + 1, b + 1] : all;
  }
  function openPlayer() {
    const wrap = by('gwCostumeCanvasWrapV15'), s = spr(); if (!wrap || !s) return;
    by('gwFlipbook')?.remove(); const g = group(s); P.from = g[0]; P.to = g[1]; P.i = 0;
    const fps = h('input', { type: 'number', min: '1', max: '30', value: String(S.fps), 'aria-label': 'Frames per second' }); fps.addEventListener('change', () => { S.fps = clamp(Math.round(+fps.value || 8), 1, 30); fps.value = String(S.fps); save(); if (P.timer) startPlay(); });
    const from = h('input', { type: 'number', min: '1', value: String(P.from), 'aria-label': 'First costume' }), to = h('input', { type: 'number', min: '1', value: String(P.to), 'aria-label': 'Last costume' });
    const range = () => { const n = spr()?.costumes.length || 1; P.from = clamp(Math.round(+from.value || 1), 1, n); P.to = clamp(Math.round(+to.value || n), P.from, n); from.value = String(P.from); to.value = String(P.to); P.i = 0; P.frames = frameList(spr()); P.box = unionBox(P.frames); drawFrame(); if (P.timer) startPlay(); };
    from.addEventListener('change', range); to.addEventListener('change', range);
    const loop = h('input', { type: 'checkbox', 'aria-label': 'Loop' }); loop.checked = S.loop; loop.addEventListener('change', () => { S.loop = loop.checked; save(); });
    const step = d => { stopPlay(); if (!P.frames.length) { P.frames = frameList(spr()); P.box = unionBox(P.frames); } const n = P.frames.length || 1; P.i = (P.i + d + n) % n; drawFrame(); };
    const box = h('div', { id: 'gwFlipbook', role: 'dialog', 'aria-label': 'Flipbook: play the costumes' },
      h('div', { class: 'fb-head' }, h('i', { class: 'fa-solid fa-bolt', 'aria-hidden': 'true' }), h('b', { text: 'Flipbook' }), h('button', { type: 'button', title: 'Close', 'aria-label': 'Close', onclick: () => closePlayer(), html: '<i class="fa-solid fa-xmark"></i>' })),
      h('canvas', { id: 'gwFlipCanvas', width: '440', height: '330' }),
      h('div', { class: 'fb-info', id: 'gwFlipInfo', 'aria-live': 'off' }),
      h('div', { class: 'fb-row' },
        h('button', { type: 'button', title: 'Previous frame', 'aria-label': 'Previous frame', onclick: () => step(-1), html: '<i class="fa-solid fa-backward-step"></i>' }),
        h('button', { type: 'button', id: 'gwFlipGo', class: 'go', title: 'Play / stop', 'aria-label': 'Play or stop', onclick: () => (P.timer ? stopPlay() : startPlay()), html: '<i class="fa-solid fa-play"></i>' }),
        h('button', { type: 'button', title: 'Next frame', 'aria-label': 'Next frame', onclick: () => step(1), html: '<i class="fa-solid fa-forward-step"></i>' }),
        h('label', { title: 'Frames per second' }, fps, 'FPS'), h('label', { title: 'Start again after the last costume' }, loop, 'Loop')),
      h('div', { class: 'fb-row' }, h('span', { text: 'Costumes' }), from, h('span', { text: 'to' }), to));
    wrap.appendChild(box); startPlay();
  }
  function closePlayer() { stopPlay(); by('gwFlipbook')?.remove(); }
  function addPlayButton() {
    if (by('gwCosPlayBtn')) return; const add = by('gwCosAdd'), up = by('gwCosUploadBtn'); if (!add || !up) return;
    const b = h('button', { type: 'button', class: 'gw7-btn', id: 'gwCosPlayBtn', title: 'Flipbook: play the costumes in order, like an animation', html: '<i class="fa-solid fa-play"></i> Play' });
    b.addEventListener('click', () => (by('gwFlipbook') ? closePlayer() : openPlayer()));
    up.after(b);
  }

  /* ================= keep everything in place ================= */
  let lastSprite = -1;
  setInterval(() => {
    addOnionButton(); addPlayButton(); paint();
    const i = E()?.activeSpriteIndex; if (i !== lastSprite) { lastSprite = i; closePlayer(); }
    if (by('gwFlipbook') && !P.timer) { /* list may have changed while stopped */ }
    renderOnion();
  }, 250);
  window.GW_FLIPBOOK = { settings: S, setOnion, renderOnion, open: openPlayer, close: closePlayer, play: startPlay, stop: stopPlay, state: P };
})();
