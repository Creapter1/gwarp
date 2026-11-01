(() => {
  'use strict';
  /* ===================================================================
     G-Warp — Addons pack (Buffy, 2026-10-17)
     Three more on/off helpers for More -> App -> Addons..., built the
     same way as the app's own addons (window.GW_ADDONS):
       1. Block counter  - how many blocks and scripts are in the code area
       2. Press P to pause - pause / resume while playing
       3. Number keys pick a sprite - 1..9 jumps to that sprite
     It does not change app.html: the app's Addons dialog builds its rows
     from window.GW_ADDONS.list when it opens, so the three helpers show
     up there on their own, with the app's real switches and saved choices.
     Nothing is on until the user turns it on.
     =================================================================== */
  if (window.GW_ADDONS_PACK) return; // loaded twice: do nothing
  if (typeof window.GW_FEATURE_OFF === 'function' && window.GW_FEATURE_OFF('addonsPack')) return;

  const by = id => document.getElementById(id);
  const toast = m => { try { window.GW?.toast?.(m); } catch {} };
  const h = (tag, props = {}, ...kids) => {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(props)) {
      if (k === 'class') el.className = v;
      else if (k === 'text') el.textContent = v;
      else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
      else if (v != null) el.setAttribute(k, v);
    }
    kids.flat().forEach(c => c != null && el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c));
    return el;
  };

  /* The helpers, in the same shape the app's Addons dialog already uses.
     def:false = off until the user turns it on. */
  const MY = [
    { id: 'blockcount', def: false, name: 'Block counter',
      text: 'Shows how many blocks and scripts are in the code area, so a project that has grown huge is easy to spot.' },
    { id: 'pausekey', def: false, name: 'Press P to pause',
      text: 'Press P while a project runs to pause or resume it, like a game. Typing in a text box is never paused.' },
    { id: 'spritenums', def: false, name: 'Number keys pick a sprite',
      text: 'Press 1–9 to jump to that sprite in “Your sprites”. Handy when a project has lots of sprites.' }
  ];

  /* ---------- register with the app's Addons dialog ---------- */
  const state = id => { try { return !!window.GW_ADDONS?.on?.(id); } catch { return false; } };
  let registered = false;
  function register(tries = 0) {
    const A = window.GW_ADDONS;
    if (!A || !Array.isArray(A.list)) { if (tries < 60) setTimeout(() => register(tries + 1), 250); return false; }
    MY.forEach(a => { if (!A.list.some(x => x && x.id === a.id)) A.list.push({ ...a }); });
    registered = true;
    return true;
  }
  register();

  window.GW_ADDONS_PACK = {
    list: () => MY.map(a => ({ ...a })),
    isRegistered: () => registered,
    on: id => (registered ? state(id) : false),
    set: (id, v) => { try { window.GW_ADDONS?.setOn?.(id, !!v); } catch {} }
  };

  /* ---------- styles (one small stylesheet, removed by off()) ---------- */
  const CSS = `
  .gwAP-count{position:absolute;right:12px;top:10px;z-index:8;padding:3px 9px;border-radius:999px;background:rgba(15,23,42,.82);color:#a7f3d0;border:1px solid #2b3253;font:800 10.5px/1.7 ui-monospace,Menlo,Consolas,monospace;pointer-events:none;white-space:nowrap}
  .gwAP-count[hidden]{display:none}
  `;
  function addCss() {
    if (by('gwAddonsPackCss')) return;
    document.head.appendChild(h('style', { id: 'gwAddonsPackCss', text: CSS }));
  }

  /* ---------- 1. block counter ---------- */
  let countTag = null, countTimer = 0;
  const codeHost = () => by('workspace')?.parentElement || null;
  function paintCount() {
    const on = state('blockcount');
    const host = codeHost();
    if (!on || !host) { if (countTag) countTag.hidden = true; return; }
    const ws = by('workspaceCanvas');
    if (!ws) { if (countTag) countTag.hidden = true; return; }
    const scripts = ws.querySelectorAll(':scope > .block-stack').length;
    const blocks = ws.querySelectorAll('.scratch-block').length;
    if (!countTag) {
      if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
      countTag = h('div', { id: 'gwAPBlockCount', class: 'gwAP-count', 'aria-live': 'off', title: 'Blocks and scripts in the code area (Addons: block counter)' });
      host.appendChild(countTag);
    }
    const blocked = !!(by('gw8WarpAlert') || host.offsetParent === null);
    countTag.hidden = blocks === 0 || blocked;
    const txt = `${blocks} block${blocks === 1 ? '' : 's'} · ${scripts} script${scripts === 1 ? '' : 's'}`;
    if (countTag.textContent !== txt) countTag.textContent = txt;
  }
  function watchCode() {
    addCss();
    const ws = by('workspaceCanvas');
    if (ws && !ws.__gwAPWatch) {
      ws.__gwAPWatch = true;
      new MutationObserver(() => { clearTimeout(countTimer); countTimer = setTimeout(paintCount, 120); }).observe(ws, { childList: true, subtree: true });
    }
    if (!ws) setTimeout(watchCode, 400);
  }
  setInterval(paintCount, 700); // also catches the pill being removed by a tab switch
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', watchCode, { once: true }); else watchCode();

  /* ---------- 2. press P to pause ---------- */
  const typing = t => !!(t && t.closest && t.closest('input,textarea,select,[contenteditable="true"]'));
  function togglePause() {
    const E = window.Engine;
    if (!E || !E.isRunning) return false;
    const btn = by('pauseBtn');
    if (!btn) return false;
    btn.click();
    toast(E.isPaused ? 'Paused — press P to keep playing' : 'Playing — press P to pause');
    return true;
  }

  /* ---------- 3. number keys pick a sprite ---------- */
  function pickSprite(n) {
    const grid = by('spritesGrid'); if (!grid) return false;
    const card = grid.children[n]; if (!card) return false;
    card.click();
    return true;
  }

  addEventListener('keydown', e => {
    if (e.ctrlKey || e.metaKey || e.altKey || e.repeat) return;
    if (typing(e.target)) return;
    if (document.querySelector('.gw8-dlg-ov')) return; // never behind an open dialog
    const key = e.key;
    if (state('pausekey') && (key === 'p' || key === 'P')) { if (togglePause()) e.preventDefault(); return; }
    if (state('spritenums') && /^[1-9]$/.test(key)) {
      if (pickSprite(Number(key) - 1)) { e.preventDefault(); }
    }
  }, true);

  /* ---------- clean off() (for tests / the owner) ---------- */
  window.GW_ADDONS_PACK.off = () => {
    ['blockcount', 'pausekey', 'spritenums'].forEach(id => { try { window.GW_ADDONS?.setOn?.(id, false); } catch {} });
    if (countTag) { countTag.remove(); countTag = null; }
    by('gwAddonsPackCss')?.remove();
  };
})();
