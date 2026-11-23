/* G-Warp Turbo Player - connection to the editor (v15.61.0, Claude).
   - Importing an .sb3 keeps a copy of it; with Turbo on, Start plays that copy in GWTurbo (compiled, 30 or 60 FPS).
   - Developer mode (22 Nov, not approved yet): projects made or changed in the editor are written to an .sb3 in memory first
     and Turbo plays them too. If the project uses a block Turbo doesn't know yet, Start uses G-Warp's normal engine and says why (nothing is lost).
   - The Turbo (bolt icon) button next to Start cycles: Turbo 30 FPS -> Turbo 60 FPS -> Off. Saved in localStorage 'gw-turbo'. */
(() => {
  'use strict';
  const by = id => document.getElementById(id);
  const toast = m => { try { (window.GW?.toast || window.showToast || console.log)(m); } catch (e) { console.log(m); } };
  const MODES = ['30', '60', 'off'];
  let mode = localStorage.getItem('gw-turbo') || '30';
  let player = null, overlay = null, src = null, runId = 0;
  window.GW_TURBO = { get mode() { return mode; }, get player() { return player; }, get running() { return !!player?.running; }, unsupported: [] };

  function boot(n = 0) {
    const flag = by('greenFlagBtn'), stop = by('stopBtn'), stage = by('stageCanvas');
    if (!flag || !stop || !stage || !window.GW8?.importSB3 || !window.GWTurbo) return n < 200 && setTimeout(() => boot(n + 1), 150);
    // 1. keep the imported .sb3
    const imp = GW8.importSB3;
    GW8.importSB3 = async function (file, ...rest) {
      const buf = await file.arrayBuffer();
      src = { buf, name: file.name || 'project.sb3', epoch: null };
      const r = await imp.call(this, new File([buf], src.name), ...rest);
      setTimeout(() => { if (src) src.epoch = window.GW?.__wsEpoch; }, 2500);
      paint(); return r;
    };
    // 2. the Turbo button
    const btn = document.createElement('button');
    btn.id = 'gwTurboBtn'; btn.className = 'ctrl-btn'; btn.type = 'button';
    btn.style.cssText = 'margin-left:6px;padding:0 10px;font-weight:800;border-radius:10px;border:1px solid #7c3aed;background:#1b0b3a;color:#ffe14a;min-width:74px';
    btn.onclick = () => { mode = MODES[(MODES.indexOf(mode) + 1) % MODES.length]; localStorage.setItem('gw-turbo', mode); paint(); toast(mode === 'off' ? 'Turbo off - Start uses the normal engine' : `Turbo ${mode} FPS - imported .sb3 projects run compiled`); };
    flag.after(btn);
    function paint() {
      btn.innerHTML = '<i class="fa-solid fa-bolt" aria-hidden="true"></i> ' + (mode === 'off' ? 'Off' : `${mode} FPS`);
      btn.title = mode === 'off' ? 'Turbo Player is off' : (src ? `Turbo Player: Start plays “${src.name}” compiled at ${mode} FPS` : 'Turbo Player: import an .sb3 to use it') + (devOn() ? ' (Developer mode: every project)' : '') + ' - click to change';
      btn.style.opacity = mode === 'off' ? '0.6' : '1';
    }
    paint();
    // 3. Start / Stop
    flag.addEventListener('click', e => {
      if (mode === 'off' || window.GW_TURBO_SKIP) return;
      if (!imported() && !devOn()) { if (src && !src.told) { src.told = true; toast('You changed the project since importing - Start uses the normal engine (Turbo plays an unchanged imported .sb3; Developer mode: every project).'); } return; }
      e.stopImmediatePropagation(); e.preventDefault(); start();
    }, true);
    stop.addEventListener('click', () => stopTurbo(), true);
    addEventListener('keydown', e => { if (e.key === 'Escape' && player?.running) stopTurbo(); });

    /* 22 Nov (Claude): the project in the editor (made in G-Warp, or changed after importing) is written to an .sb3 in memory
       first, so Turbo can play every project - not only an unchanged imported file. G-Warp-only or extension blocks -> normal engine. */
    function devOn() { try { return !!window.GW_DEV_MODE?.isOn?.(); } catch (e) { return false; } }
    function imported() { return !!src && (src.epoch == null || window.GW?.__wsEpoch === src.epoch); }
    async function sourceBuffer() {
      if (imported()) return src.buf.slice(0);
      if (!window.GW8?.exportSB3) return null;
      const rep = await window.GW8.exportSB3({ silent: true, noDownload: true });
      const blob = window.GW_LAST_SB3_EXPORT?.blob; if (!rep || !blob) return null;
      const exts = (window.GW_LAST_SB3_EXPORT.pj?.extensions || []).filter(x => x !== 'pen');
      if (rep.dropped?.length || exts.length) { toast('Turbo can’t play ' + (exts.length ? 'extension blocks' : 'G-Warp-only blocks') + ' yet - using the normal engine.'); return 'normal'; }
      return blob.arrayBuffer();
    }
    async function start() {
      stopTurbo(); const my = runId; // Stop (or another Start) while the project is still loading cancels this start
      let buf; try { buf = await sourceBuffer(); } catch (e) { console.warn('[turbo] export failed', e); buf = null; }
      if (my !== runId) return;
      if (!buf || buf === 'normal') { if (!buf) toast('Turbo could not read this project - using the normal engine.'); fallback(); return; }
      try { window.Engine && (window.Engine.isRunning = false); } catch (e) {}
      overlay = document.createElement('canvas'); overlay.id = 'gwTurboCanvas';
      overlay.style.cssText = 'position:absolute;z-index:5;image-rendering:auto;border-radius:inherit;background:#fff';
      const host = stage.parentElement; if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
      host.appendChild(overlay); place();
      player = new GWTurbo(overlay); player.fps = Number(mode) || 30;
      const pl = player;
      let lastP = 0; pl.progress = (done, all) => { const now = performance.now(); if (now - lastP < 100 && done < all) return; lastP = now; const c = pl.ctx, w = pl.canvas.width, h = pl.canvas.height; c.setTransform(1, 0, 0, 1, 0, 0); c.fillStyle = '#0b1020'; c.fillRect(0, 0, w, h); c.fillStyle = '#7c3aed'; c.fillRect(w * 0.2, h * 0.52, w * 0.6 * (all ? done / all : 0), Math.max(4, h * 0.012)); c.fillStyle = '#e9e5ff'; c.font = `700 ${Math.round(h * 0.045)}px ui-sans-serif, system-ui, sans-serif`; c.textAlign = 'center'; c.fillText('Turbo is loading the pictures… ' + done + ' / ' + all, w / 2, h * 0.47); };
      pl.progress(0, 0);
      try { await pl.load(buf); } catch (e) { if (my !== runId) return; console.warn('[turbo] load failed', e); toast('Turbo could not open this project - using the normal engine.'); stopTurbo(); fallback(); return; }
      if (my !== runId || player !== pl) return;
      pl.ready = true;
      window.GW_TURBO.unsupported = [...player.unsupported];
      if (player.unsupported.size) {
        toast('Turbo doesn’t know these blocks yet: ' + [...player.unsupported].slice(0, 4).join(', ') + ' - using the normal engine.');
        stopTurbo(); fallback(); return;
      }
      player.resize(); player.attachInput(overlay); window.GW_TURBO_RUNNING = true; document.body.classList.add('gw-turbo-on');
      player.greenFlag(); overlay.focus?.();
    }
    function fallback() { window.GW_TURBO_SKIP = true; try { flag.click(); } finally { window.GW_TURBO_SKIP = false; } }
    function place() {
      if (!overlay) return; const r = stage.getBoundingClientRect(), h = stage.parentElement.getBoundingClientRect();
      Object.assign(overlay.style, { left: (r.left - h.left + stage.parentElement.scrollLeft) + 'px', top: (r.top - h.top + stage.parentElement.scrollTop) + 'px', width: r.width + 'px', height: r.height + 'px' });
    }
    new ResizeObserver(() => { place(); if (player) player.resize(); }).observe(stage);
    addEventListener('resize', place);
    /* 22 Nov (Claude): like Scratch, when the project stops the sprites stay where they ended, variables keep their values
       and the pen drawing stays - Turbo ran on a copy, so its final state is written back into the editor. */
    function writeBack(pl) {
      const E = window.Engine; if (!E || !pl?.ready || !pl.targets) return;
      const G = window.GW_VARS ? window.GW_VARS.globals() : E.variables, GL = window.GW_VARS ? window.GW_VARS.globalLists() : E.lists;
      for (const v of Object.values(pl.globals?.vars || {})) if (G && v.name in G) G[v.name] = v.value;
      for (const v of Object.values(pl.globals?.lists || {})) if (GL && v.name in GL) GL[v.name] = v.value.slice();
      for (const t of pl.targets) {
        if (t.isClone) continue;
        if (t.isStage) { if (E.backdrops?.length) E.activeBackdrop = Math.min(t.costume, E.backdrops.length - 1); continue; }
        const s = E.sprites.find(x => !x.isClone && !x.stageProxy && x.name === t.name); if (!s) continue;
        Object.assign(s, { x: t.x, y: t.y, direction: t.dir, size: t.size, visible: t.visible, volume: t.volume });
        if (s.costumes?.length) s.activeCostume = Math.min(t.costume, s.costumes.length - 1);
        for (const v of Object.values(t.vars)) if (s.localVars && v.name in s.localVars) s.localVars[v.name] = v.value;
        for (const v of Object.values(t.lists)) if (s.localLists && v.name in s.localLists) s.localLists[v.name] = v.value.slice();
      }
      const pc = by('penCanvas'); if (pc && pl.pen) { const c = pc.getContext('2d'); c.clearRect(0, 0, pc.width, pc.height); c.drawImage(pl.pen, 0, 0, pc.width, pc.height); if (window.GW) window.GW.__penUsed = true; }
      try { window.GW?.refreshVariableMonitors?.(); window.GW_LIST_MONITORS?.refresh?.(); } catch (e) {}
    }
    function stopTurbo() {
      runId++;
      if (player) { try { writeBack(player); } catch (e) { console.warn('[turbo] write back', e); } try { player.stop(); player.detach?.(); } catch (e) {} player = null; }
      if (overlay) { overlay.remove(); overlay = null; }
      window.GW_TURBO_RUNNING = false; document.body.classList.remove('gw-turbo-on');
    }
    window.GW_TURBO.start = start; window.GW_TURBO.stop = stopTurbo; window.GW_TURBO.source = () => src;
  }
  boot();
})();
