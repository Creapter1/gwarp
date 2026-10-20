<script id="gw-v4950-editor-fixes">
(() => {
  'use strict';
  /* G-Warp v15.50.0 - editor fixes from claude/REVIEW-CLICKS-2026-10-19.txt (written by Claude):
     BUG 5  variable / list monitors were hidden under the stage picture
     BUG 6  Undo after dropping a new block did nothing (two history entries both had the block)
     BUG 7  Ctrl+Shift+Z did undo instead of redo
     BUG 10 "when this sprite clicked" now works while the project is stopped (like Scratch)
     BUG 11 right-click on a comment: a small menu with Delete (not the code-area menu)
     BUG 12-14 block menu: only one menu at a time, stays inside the window, Escape closes it
     MISSING click a script to run it (it glows while running; click again stops it), Delete key deletes the
            clicked block. */
  const by = id => document.getElementById(id);
  const css = document.createElement('style'); css.id = 'gw4950css';
  css.textContent = `#gw154StageFrame [data-var-monitor],#gw154StageFrame [data-list-monitor]{z-index:6!important}
#workspaceCanvas > .block-stack.gw4950-run > .scratch-block:first-child,#workspaceCanvas > .block-stack.gw4950-run{filter:drop-shadow(0 0 4px #fde047) drop-shadow(0 0 2px #fde047)}
.gw4950-menu{position:fixed;z-index:10050;min-width:150px;padding:4px;border:1px solid #2b2f55;border-radius:10px;background:#14162a;box-shadow:0 10px 30px rgba(0,0,0,.45)}
.gw4950-menu button{display:flex;gap:8px;align-items:center;width:100%;padding:7px 10px;border:0;border-radius:7px;background:transparent;color:#e5e7eb;font-size:12px;font-weight:700;text-align:left;cursor:pointer}
.gw4950-menu button:hover,.gw4950-menu button:focus-visible{background:#26294a;outline:none}`;
  document.head.appendChild(css);

  const typing = e => e.target?.closest?.('input,textarea,select,[contenteditable="true"]');
  const hideMenus = () => { const m = by('blockContextMenu'); if (m) m.style.display = 'none'; document.querySelectorAll('.gw4950-menu').forEach(x => x.remove()); };
  const clamp = el => { if (!el || el.style.display === 'none') return; const r = el.getBoundingClientRect(), W = innerWidth, H = innerHeight;
    if (r.bottom > H - 4) el.style.top = Math.max(4, H - r.height - 4) + 'px'; if (r.right > W - 4) el.style.left = Math.max(4, W - r.width - 4) + 'px'; };

  /* ---- menus: one at a time, inside the window, Escape ---- */
  document.addEventListener('contextmenu', e => {
    hideMenus();
    const com = e.target.closest?.('#workspaceCanvas .gw38-comment');
    if (com) { e.preventDefault(); e.stopPropagation(); smallMenu(e.clientX, e.clientY, [['🗑️ Delete comment', () => com.querySelector('.gw38-x')?.click()]]); return; }
    setTimeout(() => clamp(by('blockContextMenu')), 0);
  }, true);
  document.addEventListener('pointerdown', e => { if (!e.target.closest?.('.gw4950-menu')) document.querySelectorAll('.gw4950-menu').forEach(x => x.remove()); }, true);
  function smallMenu(x, y, items) {
    const m = document.createElement('div'); m.className = 'gw4950-menu'; m.setAttribute('role', 'menu');
    items.forEach(([t, f]) => { const b = document.createElement('button'); b.type = 'button'; b.setAttribute('role', 'menuitem'); b.textContent = t; b.onclick = () => { m.remove(); f(); }; m.appendChild(b); });
    m.style.left = x + 'px'; m.style.top = y + 'px'; document.body.appendChild(m); clamp(m); m.querySelector('button')?.focus(); return m;
  }

  /* ---- keys: Escape, Ctrl+Shift+Z = redo, Delete = delete the clicked block ---- */
  let lastBlock = null;
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { const open = (by('blockContextMenu')?.style.display === 'block') || document.querySelector('.gw4950-menu'); if (open) { hideMenus(); e.stopPropagation(); } return; }
    if (typing(e)) return;
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && String(e.key).toLowerCase() === 'z') { e.preventDefault(); e.stopImmediatePropagation(); try { window.GW8?.redo?.(); } catch {} return; }
    if ((e.key === 'Delete' || e.key === 'Backspace') && lastBlock?.isConnected && lastBlock.closest('#workspaceCanvas')) {
      e.preventDefault(); const r = lastBlock.getBoundingClientRect();
      lastBlock.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX: r.left + 5, clientY: r.top + 5 }));
      by('ctxDeleteBlock')?.click(); hideMenus(); lastBlock = null;
    }
  }, true);

  /* ---- Undo skips history entries that look the same as now (a drop made two entries) ---- */
  const shape = html => String(html || '').replace(/style="[^"]*"/g, '').replace(/\s+/g, ' ');
  function wrapUndo() {
    const G = window.GW8; if (!G?.undo || G.undo.__gw4950) return !!G?.undo;
    const old = G.undo;
    G.undo = async function () {
      try { const now = shape(by('workspaceCanvas')?.innerHTML);
        while (G.history.length > 2 && shape(G.history[G.history.length - 2]?.state?.workspace) === now) G.future.push(G.history.pop());
      } catch {}
      return old.apply(this, arguments);
    };
    G.undo.__gw4950 = true; return true;
  }

  /* ---- stage click while stopped ---- */
  function wrapStageClick() {
    const GW = window.GW; if (!GW?.stageClick || GW.stageClick.__gw4950) return !!GW?.stageClick;
    const old = GW.stageClick;
    GW.stageClick = function () {
      const E = window.Engine;
      if (E && !E.isRunning && document.querySelector('#workspaceCanvas > .block-stack > .scratch-block[data-type="when_clicked"]:first-child')) { E.isRunning = true; E.isPaused = false; }
      return old.apply(this, arguments);
    };
    GW.stageClick.__gw4950 = true; return true;
  }

  /* ---- click a script to run it; it glows; click again to stop ---- */
  let down = null;
  document.addEventListener('pointerdown', e => { if (e.button === 0) down = { x: e.clientX, y: e.clientY, t: e.target }; const b = e.target.closest?.('#workspaceCanvas .scratch-block'); if (b) lastBlock = b; }, true);
  document.addEventListener('click', e => {
    if (!down || Math.hypot(e.clientX - down.x, e.clientY - down.y) > 4) return;
    const t = e.target; if (t.closest('input,select,textarea,button,.gw-input-slot,.gw7-chip,.gw38-comment,[contenteditable="true"]')) return;
    const block = t.closest('#workspaceCanvas .scratch-block'); const st = block?.closest('#workspaceCanvas > .block-stack'); if (!st) return;
    toggleRun(st);
  });
  const HATS = new Set(['when_flag', 'when_key', 'when_clicked', 'when_broadcast', 'when_clone', 'when_backdrop', 'define_custom']);
  const threadsOf = st => (window.Engine?.threads || []).filter(th => !th.finished && th.__gw4950 === st);
  function toggleRun(st) {
    const E = window.Engine, GW = window.GW; if (!E || !GW) return;
    const running = threadsOf(st); if (running.length) { running.forEach(th => { th.finished = true; }); E.threads = E.threads.filter(th => !th.finished); st.classList.remove('gw4950-run'); return; }
    const kids = [...st.children].filter(c => c.classList.contains('scratch-block')); if (!kids.length) return;
    const first = kids[0].dataset.type; if (first === 'define_custom' || first === 'when_clone') return;
    const blocks = HATS.has(first) ? kids.slice(1) : kids; if (!blocks.length) return;
    const sprite = E.sprites[GW.stackOwner ? GW.stackOwner(st) : E.activeSpriteIndex] || E.sprites[E.activeSpriteIndex];
    const before = E.threads.length; GW.runHat ? GW.runHat({ children: [document.createElement('i'), ...blocks] }, sprite) : null;
    E.threads.slice(before).forEach(th => { th.__gw4950 = st; });
    if (E.threads.length > before) { if (!E.isRunning) { E.isRunning = true; E.isPaused = false; } st.classList.add('gw4950-run'); }
  }
  setInterval(() => document.querySelectorAll('#workspaceCanvas > .block-stack.gw4950-run').forEach(st => { if (!threadsOf(st).length) st.classList.remove('gw4950-run'); }), 120);

  (function boot(n = 0) { const a = wrapUndo(), b = wrapStageClick(); if ((!a || !b) && n < 120) setTimeout(() => boot(n + 1), 500); })();
  window.GW_4950 = { toggleRun, smallMenu };
})();
</script>
