// G-Warp LAN Live (Claude, 9 Nov 2026, owner: "LAN mode should work back and forth: you get a copy first, then you all
// work on the same project at the same time and share back and forth").
// Every window in a LAN session (the host too) sends what it changed and receives what the others changed:
//   stack:<id>    one script in the code area (its blocks, place, owner sprite, the values typed in it)
//   sprite:<uid>  one sprite (properties, costumes, sounds, its own variables, animations)
//   order         which sprites exist, in which order
//   stage         title, global variables and lists, backdrops, tile map, behaviors, extensions
// The newest change of a part wins. A part you are editing right now (dragging, typing) is never replaced under your
// hands: your edit is sent first. Plus a temporary chat that is never saved in the project.
(() => {
  'use strict';
  const api = window.gwLan;
  if (!api || !api.livePush) return; // desktop only
  const E = () => window.Engine || {};
  const by = id => document.getElementById(id);
  const newId = () => (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2));
  const myId = newId();
  // the old "LAN Live" button needed a separate server program that never shipped: on desktop the Share button does it all now
  try { const h = document.createElement('style'); h.textContent = '#gwLanButton{display:none!important}'; (document.head || document.documentElement).appendChild(h); } catch (e) {}
  const hash = s => { s = String(s); let a = 2166136261, b = 5381; for (let i = 0; i < s.length; i++) { const c = s.charCodeAt(i); a = Math.imul(a ^ c, 16777619); b = (Math.imul(b, 33) + c) | 0; } return (a >>> 0).toString(36) + (b >>> 0).toString(36) + s.length.toString(36); };
  const fp = s => { s = String(s || ''); if (s.length < 4096) return hash(s); let m = ''; const st = Math.floor(s.length / 256); for (let i = 0; i < s.length; i += st) m += s.charCodeAt(i).toString(36); return hash(s.slice(0, 512) + m + s.slice(-512)) + s.length.toString(36); };
  const S = { on: false, host: null, role: null, since: 0, chatN: 0, sent: new Map(), pending: new Map(), applying: false, down: false, timer: 0, fails: 0, people: [], log: [] };
  const name = () => { try { return localStorage.getItem('gwLanName') || window.GW_PRIVATE_NAME || 'Someone'; } catch (e) { return 'Someone'; } };
  const note = m => { (window.GW && GW.toast) ? GW.toast(m) : console.log(m); };
  const wc = () => by('workspaceCanvas');
  const sprites = () => (E().sprites || []).filter(s => !s.isClone);
  const running = () => !!E().isRunning;

  document.addEventListener('pointerdown', () => { S.down = true; }, true);
  document.addEventListener('pointerup', () => { S.down = false; }, true);
  document.addEventListener('pointercancel', () => { S.down = false; }, true);
  window.addEventListener('blur', () => { S.down = false; });

  /* ---------- ids ---------- */
  function sprUid(s) { if (!s.gwLiveId) s.gwLiveId = newId(); return s.gwLiveId; }
  function stackId(st) { if (!st.dataset.gwStackId) st.dataset.gwStackId = newId(); return st.dataset.gwStackId; }
  const stacks = () => [...(wc()?.querySelectorAll(':scope > .block-stack') || [])];
  const ownerUid = st => { const i = st.dataset.owner; const sp = sprites()[i != null && i !== '' ? +i : (E().activeSpriteIndex || 0)]; return sp ? sprUid(sp) : null; };
  const uidIndex = uid => sprites().findIndex(s => s.gwLiveId === uid);

  /* ---------- reading the local project ---------- */
  const fields = st => [...st.querySelectorAll('input,textarea,select,[contenteditable="true"]')];
  function stackVal(st) { return { left: st.style.left, top: st.style.top, owner: ownerUid(st), html: st.innerHTML, values: fields(st).map(f => f.isContentEditable ? f.textContent : (f.type === 'checkbox' ? !!f.checked : f.value)) }; }
  const stackSig = v => hash(v.left + '|' + v.top + '|' + v.owner + '|' + v.html + '|' + JSON.stringify(v.values));
  const cosCache = new WeakMap();
  function cosSig(c) {
    const cv = c && c.canvas; if (!cv) return 'none';
    const ep = Number(window.GW_ASSET_EDIT_EPOCH || 0); const k = cosCache.get(cv);
    if (k && k.ep === ep && k.svg === (c.svg || '')) return k.sig;
    let url = ''; try { url = cv.toDataURL(); } catch (e) {}
    const sig = fp(url) + '.' + fp(c.svg || '') + '.' + cv.width + 'x' + cv.height;
    cosCache.set(cv, { ep, svg: c.svg || '', sig }); return sig;
  }
  const PROPS = ['name', 'x', 'y', 'size', 'direction', 'visible', 'activeCostume', 'volume', 'rotationStyle', 'layer', 'draggable', 'stageProxy', 'collisionGroup', 'localVars', 'localLists', 'effects', 'behaviors', 'gwAnimations', 'gwTileSprite'];
  function spriteSig(s) {
    const p = {}; PROPS.forEach(k => { p[k] = s[k]; });
    const cos = (s.costumes || []).map(c => [c.name, cosSig(c), c.rc || null, c.res || 1, c.dataFormat || null, c.gwAnimFrame || null]);
    const snd = (s.sounds || []).map(a => { const o = {}; for (const [k, v] of Object.entries(a || {})) o[k] = typeof v === 'string' && v.length > 200 ? fp(v) : v; return o; });
    try { return hash(JSON.stringify([p, cos, snd])); } catch (e) { return 'x'; }
  }
  function stageVal() {
    const e = E(), G = window.GW || {};
    return { title: by('projectTitle')?.value || '', variables: window.GW_VARS ? GW_VARS.globals() : e.variables, variableVisible: e.variableVisible || {}, lists: window.GW_VARS ? GW_VARS.globalLists() : e.lists, listVisible: e.listVisible || {}, backdrops: e.backdrops || [], activeBackdrop: e.activeBackdrop || 0, tilemap: e.tilemap || null, behaviorSystem: e.behaviorSystem ? { definitions: e.behaviorSystem.definitions || {}, sceneAttachments: e.behaviorSystem.sceneAttachments || [] } : null, projectExt: G.__projectExt || null, notScratch: !!G.__notScratch };
  }
  function spriteFull(pd, i, s) {
    const d = pd.sprites[i] || {};
    return { ...d, uid: sprUid(s), costumes: (d.costumes || []).map((c, j) => ({ ...c, sig: cosSig(s.costumes[j]) })) };
  }

  /* ---------- what changed here since last time ---------- */
  function collect() {
    const changes = []; const ws = wc(); if (!ws) return changes;
    const seen = new Set();
    for (const st of stacks()) {
      if (st.dataset.dragging === 'true') continue;
      const id = stackId(st), k = 'stack:' + id; seen.add(k);
      const v = stackVal(st); if (!v.owner) continue;
      const sig = stackSig(v); if (S.sent.get(k) !== sig) { S.sent.set(k, sig); changes.push({ k, v }); }
    }
    for (const k of [...S.sent.keys()]) if (k.startsWith('stack:') && !seen.has(k) && !document.querySelector(`[data-gw-stack-id="${CSS.escape(k.slice(6))}"]`)) { S.sent.delete(k); changes.push({ k, v: null }); }
    if (running()) return changes; // a running project moves sprites and changes variables every frame: sent when it stops
    const list = sprites(); let pd = null;
    const order = list.map(sprUid), osig = hash(order.join(','));
    list.forEach((s, i) => {
      const k = 'sprite:' + s.gwLiveId, sig = spriteSig(s);
      if (S.sent.get(k) !== sig) { pd = pd || window.GW_PROJECT_DATA?.(); if (!pd) return; S.sent.set(k, sig); changes.push({ k, v: spriteFull(pd, i, s) }); }
    });
    if (S.sent.get('order') !== osig) { S.sent.set('order', osig); changes.push({ k: 'order', v: order }); }
    try { const sv = stageVal(), sig = hash(JSON.stringify(sv)); if (S.sent.get('stage') !== sig) { S.sent.set('stage', sig); changes.push({ k: 'stage', v: sv }); } } catch (e) {}
    return changes;
  }
  let pushing = Promise.resolve();
  function flush() {
    if (!S.on || S.applying) return pushing;
    const changes = collect(); if (!changes.length) return pushing;
    changes.forEach(c => S.pending.delete(c.k)); // ours is newer than anything still waiting for this part
    pushing = pushing.then(() => api.livePush(S.host, myId, name(), changes)).catch(() => { changes.forEach(c => S.sent.delete(c.k)); }); // failed: send again next time
    return pushing;
  }
  function tick() { if (!S.on || S.applying || S.down) return; flush(); applyPending(); }

  /* ---------- applying what the others changed ---------- */
  const busyStack = st => st && (st.dataset.dragging === 'true' || (S.down && st.matches(':hover')) || st.contains(document.activeElement));
  async function makeCostume(c, old) {
    if (old && old.canvas && old.canvas.__gwLiveSig === c.sig) return old;
    const src = c.svgOnly && c.svg ? URL.createObjectURL(new Blob([c.svg], { type: 'image/svg+xml' })) : null;
    const im = await new Promise(r => { const x = new Image(); x.onload = () => r(x); x.onerror = () => r(null); x.src = src || c.data || ''; });
    if (src) URL.revokeObjectURL(src);
    const cv = document.createElement('canvas'); cv.width = c.w || im?.naturalWidth || 80; cv.height = c.h || im?.naturalHeight || 80;
    if (im) cv.getContext('2d').drawImage(im, 0, 0, cv.width, cv.height);
    cv.__gwLiveSig = c.sig;
    const o = { name: c.name || 'costume', canvas: cv, natural: !!c.natural, rc: c.rc || null, res: c.res || 1, dataFormat: c.dataFormat || null };
    if (c.svg) o.svg = c.svg; if (c.gwAnimFrame) o.gwAnimFrame = c.gwAnimFrame;
    return o;
  }
  async function applySprite(v) {
    let s = sprites().find(x => x.gwLiveId === v.uid);
    if (!s) {
      if (typeof window.createDefaultSprite !== 'function') return false;
      s = window.createDefaultSprite(v.name || 'Sprite', '#8A2BE2'); s.gwLiveId = v.uid;
      const all = E().sprites; const firstClone = all.findIndex(x => x.isClone); all.splice(firstClone < 0 ? all.length : firstClone, 0, s);
    }
    PROPS.forEach(k => { if (k in v) s[k] = (v[k] && typeof v[k] === 'object') ? JSON.parse(JSON.stringify(v[k])) : v[k]; });
    if (Array.isArray(v.costumes) && v.costumes.length) { const old = s.costumes || []; const out = []; for (let j = 0; j < v.costumes.length; j++) out.push(await makeCostume(v.costumes[j], old[j])); s.costumes = out; }
    s.sounds = (v.sounds || []).map(a => ({ ...a }));
    return true;
  }
  function applyOrder(order) {
    const all = E().sprites, list = sprites(); if (!Array.isArray(order)) return;
    const active = list[E().activeSpriteIndex || 0]?.gwLiveId;
    const oldUid = stacks().map(st => ownerUid(st));
    const keep = order.map(u => list.find(s => s.gwLiveId === u)).filter(Boolean);
    const clones = all.filter(s => s.isClone);
    all.length = 0; keep.forEach(s => all.push(s)); clones.forEach(c => all.push(c));
    stacks().forEach((st, i) => { const j = uidIndex(oldUid[i]); if (j >= 0) st.dataset.owner = String(j); else st.remove(); });
    const ai = uidIndex(active); E().activeSpriteIndex = ai >= 0 ? ai : Math.max(0, Math.min(E().activeSpriteIndex || 0, keep.length - 1));
  }
  function applyStage(v) {
    const e = E(), G = window.GW || {};
    const t = by('projectTitle'); if (t && v.title != null && document.activeElement !== t) t.value = v.title;
    e.variables = v.variables || {}; e.variableVisible = v.variableVisible || {}; e.lists = v.lists || {}; e.listVisible = v.listVisible || {};
    if (Array.isArray(v.backdrops)) e.backdrops = v.backdrops; e.activeBackdrop = Number(v.activeBackdrop) || 0;
    if (v.tilemap !== undefined) e.tilemap = v.tilemap;
    if (v.behaviorSystem) { e.behaviorSystem = e.behaviorSystem || {}; e.behaviorSystem.definitions = v.behaviorSystem.definitions || {}; e.behaviorSystem.sceneAttachments = v.behaviorSystem.sceneAttachments || []; }
    G.__projectExt = v.projectExt || G.__projectExt || null; if (v.notScratch) G.__notScratch = true;
  }
  function applyStack(id, v) {
    const ws = wc(); if (!ws) return true;
    let st = ws.querySelector(`:scope > .block-stack[data-gw-stack-id="${CSS.escape(id)}"]`);
    if (busyStack(st)) return false; // the user is working on it: try again in a moment
    if (!v) { st?.remove(); return true; }
    const oi = uidIndex(v.owner); if (oi < 0) return false; // its sprite has not arrived yet
    if (!st) { st = document.createElement('div'); st.className = 'block-stack'; st.dataset.gwStackId = id; ws.appendChild(st); }
    st.style.left = v.left || '0px'; st.style.top = v.top || '0px'; st.dataset.owner = String(oi);
    st.innerHTML = window.GW_SAFE ? GW_SAFE.html(v.html || '') : '';
    const vals = v.values || []; fields(st).forEach((f, i) => { if (i >= vals.length) return; const x = vals[i]; if (f.isContentEditable) f.textContent = x; else if (f.type === 'checkbox') f.checked = !!x; else { f.value = x; if (f.tagName === 'INPUT') f.setAttribute('value', x); } });
    return true;
  }
  let applyBusy = false;
  async function apply(changes) {
    for (const c of changes) S.pending.set(c.k, c.v);
    await applyPending();
  }
  async function applyPending() {
    if (applyBusy || !S.pending.size || S.down) return; // never while a mouse button is held: the user may be dragging this very thing
    applyBusy = true;
    try {
      await flush(); // our own newest edits go out first
      if (!S.pending.size) return;
      const mustWait = running();
      S.applying = true;
      const items = [...S.pending.entries()];
      const rank = k => k.startsWith('sprite:') ? 0 : k === 'order' ? 1 : k === 'stage' ? 2 : 3;
      items.sort((a, b) => rank(a[0]) - rank(b[0]));
      let touchedSprites = false, touchedStacks = false, touchedStage = false;
      for (const [k, v] of items) {
        let done = true;
        try {
          if (k.startsWith('sprite:')) { if (mustWait) done = false; else { if (v) done = await applySprite(v); touchedSprites = true; } }
          else if (k === 'order') { if (mustWait) done = false; else { applyOrder(v); touchedSprites = true; } }
          else if (k === 'stage') { if (mustWait) done = false; else { applyStage(v || {}); touchedStage = true; } }
          else if (k.startsWith('stack:')) { done = applyStack(k.slice(6), v); if (done) touchedStacks = true; }
        } catch (e) { console.warn('[LAN Live] could not apply', k, e); }
        if (done) S.pending.delete(k);
      }
      try { if (touchedStacks || touchedSprites) { window.GW?.showSpriteScripts?.(E().activeSpriteIndex || 0); window.GW_V1571?.rehydrate?.(); } } catch (e) {}
      try { if (touchedSprites) { window.renderSpritesGrid?.(); window.updatePropertyInputs?.(); } } catch (e) {}
      try { if (touchedStage || touchedSprites) { window.GW?.refreshVariableMonitors?.(); window.GW?.refreshListMonitors?.(); window.GW?.refreshBlockMenus?.(); } } catch (e) {}
      // what we now have is what the others have: don't send it back
      for (const st of stacks()) { const v = stackVal(st); if (v.owner) S.sent.set('stack:' + stackId(st), stackSig(v)); }
      for (const k of [...S.sent.keys()]) if (k.startsWith('stack:') && !document.querySelector(`[data-gw-stack-id="${CSS.escape(k.slice(6))}"]`)) S.sent.delete(k);
      if (!running()) { sprites().forEach(s => S.sent.set('sprite:' + sprUid(s), spriteSig(s))); S.sent.set('order', hash(sprites().map(sprUid).join(','))); try { S.sent.set('stage', hash(JSON.stringify(stageVal()))); } catch (e) {} }
    } finally { S.applying = false; applyBusy = false; }
  }

  /* ---------- the pull loop ---------- */
  async function loop() {
    while (S.on) {
      let r;
      try { r = await api.livePull(S.host, S.since, myId, S.chatN, name()); S.fails = 0; }
      catch (e) { if (++S.fails >= 6) { stop(); note('Lost the connection to the host. Your copy is still here: save it, then join again.'); return; } await new Promise(z => setTimeout(z, 1500)); continue; }
      if (!S.on) return;
      if (r.reset) { stop(); note('The host started a new session. Join again to keep working together.'); return; }
      S.people = r.people || [];
      if (r.chat?.length) { r.chat.forEach(m => { S.chatN = Math.max(S.chatN, m.n); showChat(m); }); }
      if (r.changes?.length) await apply(r.changes);
      S.since = Math.max(S.since, r.rev || 0);
      renderPeople();
    }
  }

  /* ---------- temporary chat (never saved in the project) ---------- */
  let box = null;
  function ui() {
    if (box) return box;
    const st = document.createElement('style');
    st.textContent = `#gwLiveBox{position:fixed;left:84px;bottom:12px;z-index:9000;width:290px;background:#0b1224;border:1px solid #334155;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.45);color:#e2e8f0;font:12px/1.4 Inter,system-ui,sans-serif;display:flex;flex-direction:column;overflow:hidden}
#gwLiveBox.min .gwlv-body{display:none}#gwLiveBox .gwlv-head{display:flex;align-items:center;gap:8px;padding:7px 10px;background:#111a33;cursor:pointer;font-weight:800}
#gwLiveBox .gwlv-dot{width:8px;height:8px;border-radius:50%;background:#22c55e;box-shadow:0 0 8px #22c55e}#gwLiveBox .gwlv-people{margin-left:auto;font-weight:600;opacity:.75}
#gwLiveBox .gwlv-list{max-height:180px;overflow:auto;padding:6px 10px;display:flex;flex-direction:column;gap:4px}#gwLiveBox .gwlv-list b{color:#93c5fd}#gwLiveBox .gwlv-sys{opacity:.6;font-style:italic}
#gwLiveBox form{display:flex;gap:6px;padding:7px;border-top:1px solid #1f2937}#gwLiveBox input{flex:1;min-width:0;background:#020617;border:1px solid #334155;border-radius:8px;color:#e2e8f0;padding:6px 8px}
#gwLiveBox button{background:#4f46e5;border:0;border-radius:8px;color:#fff;font-weight:800;padding:6px 10px;cursor:pointer}#gwLanButton{display:none!important}`;
    document.head.appendChild(st);
    box = document.createElement('div'); box.id = 'gwLiveBox';
    box.innerHTML = `<div class="gwlv-head" title="Click to hide or show the chat"><span class="gwlv-dot"></span><span><i class="fa-solid fa-users" aria-hidden="true"></i> Working together</span><span class="gwlv-people"></span></div>
<div class="gwlv-body"><div class="gwlv-list" aria-live="polite"><div class="gwlv-sys">Everyone here edits the same project. This chat is temporary: it is not saved.</div></div>
<form><input maxlength="300" placeholder="Write a message…" aria-label="Message to everyone in this project"><button type="submit" aria-label="Send"><i class="fa-solid fa-paper-plane" aria-hidden="true"></i></button></form></div>`;
    box.querySelector('.gwlv-head').onclick = () => box.classList.toggle('min');
    box.querySelector('form').onsubmit = ev => { ev.preventDefault(); const i = box.querySelector('input'); const t = i.value.trim(); if (!t || !S.on) return; i.value = ''; api.liveChat(S.host, myId, name(), t).catch(() => note('The message could not be sent.')); };
    document.body.appendChild(box); return box;
  }
  function line(html, cls) { const l = ui().querySelector('.gwlv-list'); const d = document.createElement('div'); if (cls) d.className = cls; d.innerHTML = html; l.appendChild(d); while (l.children.length > 120) l.firstChild.remove(); l.scrollTop = l.scrollHeight; }
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function showChat(m) { line(`<b>${esc(m.from === myId ? 'You' : m.name)}:</b> ${esc(m.text)}`); }
  let lastPeople = '';
  function renderPeople() {
    if (!box) return; const names = S.people.filter(p => p.id !== myId).map(p => p.name);
    box.querySelector('.gwlv-people').textContent = names.length ? '+' + names.length : 'just you';
    box.querySelector('.gwlv-head').title = names.length ? 'With: ' + names.join(', ') : 'Nobody else yet';
    const k = names.slice().sort().join('|'); if (k !== lastPeople) { const before = new Set(lastPeople ? lastPeople.split('|') : []); names.filter(n => !before.has(n)).forEach(n => line(`${esc(n)} is here.`, 'gwlv-sys')); lastPeople = k; }
  }

  /* ---------- start / stop ---------- */
  function baseline() {
    S.sent.clear(); S.pending.clear();
    for (const st of stacks()) { const v = stackVal(st); if (v.owner) S.sent.set('stack:' + stackId(st), stackSig(v)); }
    sprites().forEach(s => S.sent.set('sprite:' + sprUid(s), spriteSig(s)));
    S.sent.set('order', hash(sprites().map(sprUid).join(',')));
    try { S.sent.set('stage', hash(JSON.stringify(stageVal()))); } catch (e) {}
  }
  // Called by the host when it shares the project: the ids travel with the copy so everyone means the same parts
  function stamp(project) {
    if (!project || typeof project !== 'object') return project;
    project.__live = { rev: S.on ? S.since : 0, uids: sprites().map(sprUid), stackIds: stacks().map(stackId) };
    return project;
  }
  // Called by a joiner right after the copy is loaded
  function adopt(project) {
    const L = project && project.__live; if (!L) return 0;
    sprites().forEach((s, i) => { if (L.uids?.[i]) s.gwLiveId = L.uids[i]; });
    stacks().forEach((st, i) => { if (L.stackIds?.[i]) st.dataset.gwStackId = L.stackIds[i]; });
    return Number(L.rev) || 0;
  }
  function start(role, host, rev) {
    stop(true);
    S.on = true; S.role = role; S.host = host; S.since = Number(rev) || 0; S.chatN = 0; S.fails = 0;
    baseline(); ui(); box.style.display = '';
    line(role === 'host' ? 'You are hosting. Others who join edit this project with you.' : 'You joined. Your changes go to everyone, and theirs come to you.', 'gwlv-sys');
    S.timer = setInterval(tick, 600);
    loop();
  }
  function stop(quiet) {
    if (!S.on) return; S.on = false; clearInterval(S.timer); S.timer = 0;
    if (box) { line('Working together has stopped. Your copy stays here.', 'gwlv-sys'); if (!quiet) setTimeout(() => { if (!S.on && box) box.style.display = 'none'; }, 8000); }
  }
  window.GW_LIVE = { start, stop, stamp, adopt, flush, get on() { return S.on; }, get since() { return S.since; }, get people() { return S.people.slice(); }, state: S, myId };
})();
