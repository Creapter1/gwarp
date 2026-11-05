// G-Warp LAN share: host a project or join a host on the same Wi-Fi.
// Joiners whose G-Warp is older than the host's are asked to update before the project is loaded.
(() => {
  'use strict';
  const api = window.gwLan;
  if (!api) return; // not running inside the desktop app

  function el(tag, attrs, html) {
    const n = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([k, v]) => n.setAttribute(k, v));
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
  function toast(m) { (window.GW && GW.toast) ? GW.toast(m) : alert(m); }
  // Compare x.y.z versions numerically
  function newer(a, b) {
    const pa = String(a).split('.').map(Number), pb = String(b).split('.').map(Number);
    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
      const d = (pa[i] || 0) - (pb[i] || 0); if (d) return d > 0;
    }
    return false;
  }
  function projectFile(project) {
    const json = JSON.stringify(project);
    return new File([json], (project.title || 'shared').replace(/[^a-z0-9_-]+/gi, '_') + '.gwarp.json', { type: 'application/json' });
  }
  function captureProject() {
    // Same data the Save button writes, without downloading it
    const saved = { click: HTMLAnchorElement.prototype.click, toast: GW.toast };
    let captured = null;
    HTMLAnchorElement.prototype.click = function () { captured = this.href; };
    GW.toast = () => {}; // keep the background refresh from showing "saved" toasts
    try { GW.saveProject(); } finally { HTMLAnchorElement.prototype.click = saved.click; GW.toast = saved.toast; }
    return captured;
  }
  async function currentProjectJson() {
    const href = captureProject();
    if (!href) throw new Error('Could not read the project');
    const text = await (await fetch(href)).text();
    return JSON.parse(text);
  }

  function close() { document.getElementById('lanShareModal')?.remove(); }

  // While hosting, keep the shared project in step with the host's edits so joiners get the latest version
  let hostTimer = null;
  async function refreshHostedProject() {
    try { await api.setProject(await currentProjectJson()); } catch (e) { /* keep the last good copy */ }
  }
  function stopHostTimer() { if (hostTimer) clearInterval(hostTimer); hostTimer = null; }

  // Ghost mice: each joiner reports their name, sprite, view and pointer; the host draws them
  const myId = Math.random().toString(36).slice(2) + Date.now().toString(36);
  // The name other players see. Settings can change it; otherwise the computer's user name is used,
  // so a joiner reads "Host: Mario" instead of "Host: Guest-3f2a".
  let myName = localStorage.getItem('gwLanName') || '';
  if (!myName) window.gwApp?.userName?.().then(n => { if (!myName && n) myName = String(n).replace(/\s+/g, ' ').trim().slice(0, 40); }).catch(() => {});
  const shownName = () => myName || ('Guest-' + myId.slice(0, 4));
  let myPointer = { x: 0.5, y: 0.5 };
  let joinedHost = null, presenceTimer = null, ghostLayer = null, ghostTimer = null;
  document.addEventListener('mousemove', e => {
    const w = window.innerWidth || 1, h = window.innerHeight || 1;
    myPointer = { x: e.clientX / w, y: e.clientY / h };
  }, { passive: true });
  function currentFocus() {
    try {
      const spr = Engine.sprites[Engine.activeSpriteIndex];
      return { sprite: spr?.name || '', view: document.querySelector('.gw-main-tab[aria-selected="true"]')?.textContent?.trim()?.slice(0, 40) || '' };
    } catch (e) { return { sprite: '', view: '' }; }
  }
  let joinedGuests = [];
  async function sendPresence() {
    if (!joinedHost) return;
    try { joinedGuests = await api.sendPresence(joinedHost, { id: myId, name: shownName(), ...currentFocus(), x: myPointer.x, y: myPointer.y }); } catch (e) {}
  }
  function startJoinPresence(host) {
    joinedHost = host;
    clearInterval(presenceTimer);
    presenceTimer = setInterval(sendPresence, 1000);
    sendPresence();
  }
  function ensureGhostLayer() {
    if (ghostLayer) return ghostLayer;
    ghostLayer = el('div', { id: 'lanGhostLayer', style: 'position:fixed;inset:0;pointer-events:none;z-index:99998;' });
    document.body.appendChild(ghostLayer);
    return ghostLayer;
  }
  async function drawGhosts() {
    let list = [];
    try { list = joinedHost ? joinedGuests : await api.guests(); } catch (e) {}
    const layer = ensureGhostLayer();
    layer.innerHTML = '';
    const w = window.innerWidth || 1, h = window.innerHeight || 1;
    for (const g of list) {
      if (g.id === myId) continue; // don't draw our own pointer
      const d = el('div', { style: `position:absolute;left:${g.x * w}px;top:${g.y * h}px;transition:left .3s linear,top .3s linear;` },
        `<div style="width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:14px solid #f472b6;opacity:.75;transform:rotate(-20deg)"></div>` +
        `<div style="margin-left:12px;margin-top:-4px;padding:2px 6px;border-radius:6px;background:rgba(17,24,39,.85);color:#fbcfe8;font:12px system-ui,sans-serif;white-space:nowrap">${esc(g.name)} · ${esc(g.sprite || 'no sprite')}${g.view ? ' · ' + esc(g.view) : ''}</div>`);
      layer.appendChild(d);
    }
  }
  function startGhostDisplay() {
    clearInterval(ghostTimer);
    ghostTimer = setInterval(drawGhosts, 500);
  }
  function stopGhostDisplay() {
    clearInterval(ghostTimer); ghostTimer = null;
    if (ghostLayer) ghostLayer.innerHTML = '';
  }

  function showPanel(html, bind) {
    close();
    const wrap = el('div', { id: 'lanShareModal', style: 'position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;' });
    const box = el('div', { style: 'background:#111827;color:#e5e7eb;border:1px solid #374151;border-radius:12px;padding:20px;min-width:340px;max-width:460px;font:14px system-ui,sans-serif;' }, html);
    wrap.appendChild(box);
    wrap.addEventListener('click', e => { if (e.target === wrap) close(); });
    document.body.appendChild(wrap);
    bind && bind(box);
  }

  const btn = 'style="padding:8px 14px;border-radius:8px;border:1px solid #374151;background:#1f2937;color:#e5e7eb;cursor:pointer;margin:4px 4px 0 0;font-weight:600"';
  const btnPrimary = 'style="padding:8px 14px;border-radius:8px;border:0;background:#0ea5e9;color:#fff;cursor:pointer;margin:4px 4px 0 0;font-weight:600"';

  // The Share button opens the Join list straight away: a kid sees the projects on the Wi-Fi,
  // presses Join, and never has to type or read an IP address. Hosting lives in the File menu.
  function openMenu() { askJoin(); }

  async function startHost() {
    let project;
    try { project = await currentProjectJson(); } catch (e) { toast('Could not read the project to share.'); return; }
    let info;
    try { info = await api.host(project, myName); } catch (e) { toast('Could not start hosting. Close other G-Warp hosts and try again.'); return; }
    stopHostTimer();
    hostTimer = setInterval(refreshHostedProject, 3000);
    startGhostDisplay();
    showPanel(`
      <h3 style="margin:0 0 10px;font-size:17px">Hosting</h3>
      <p style="margin:0 0 6px">Project: <b>${esc(project.title || 'Untitled project')}</b></p>
      <p style="margin:0 0 12px">Host: <b>${esc(shownName())}</b></p>
      <p style="margin:0 0 12px;opacity:.8">Others on this Wi-Fi see this project in their Join list. G-Warp ${esc(info.version)}. Joiners on an older version are asked to update first.</p>
      <button id="lanStopBtn" ${btn}>Stop hosting</button>
      <button id="lanCloseBtn" ${btn}>Close</button>`, box => {
      box.querySelector('#lanCloseBtn').onclick = close;
      box.querySelector('#lanStopBtn').onclick = async () => { stopHostTimer(); stopGhostDisplay(); await api.stop(); toast('Stopped hosting.'); close(); };
    });
  }

  async  function askJoin() {
    showPanel(`
      <h3 style="margin:0 0 6px;font-size:17px">Join a project</h3>
      <p style="margin:0 0 10px;opacity:.75">Projects shared by other G-Warp players on this Wi-Fi. Pick one, then press Join.</p>
      <div id="lanJoinList" style="min-height:40px"><p style="margin:0;opacity:.8">Looking for projects on this Wi-Fi…</p></div>
      <div id="lanJoinMsg" style="margin:10px 0 0;min-height:18px;opacity:.85"></div>
      <button id="lanRefreshBtn" ${btn}>Refresh</button>
      <button id="lanCloseBtn" ${btn}>Cancel</button>`, box => {
      const list = box.querySelector('#lanJoinList');
      const msg = box.querySelector('#lanJoinMsg');
      box.querySelector('#lanCloseBtn').onclick = close;
      box.querySelector('#lanRefreshBtn').onclick = () => askJoin();
      const join = async (h) => {
        msg.textContent = 'Joining…';
        try {
          const mine = await api.version();
          if (newer(h.version, mine)) { msg.innerHTML = `This project is on G-Warp ${esc(h.version)} and you have ${esc(mine)}. <br>Update G-Warp before you join.`; return; }
          const got = await api.fetchProject(h.host);
          if (!got.project) { msg.textContent = 'This project is not ready to share yet.'; return; }
          close();
          GW.loadProject(projectFile(got.project));
          startJoinPresence(h.host);
          startGhostDisplay();
          toast('Joined ' + (got.project.title || 'the project') + '.');
        } catch (e) { msg.textContent = 'Could not reach this project. Make sure both computers are on the same Wi-Fi.'; }
      };
      api.discover().then(found => {
        if (!list) return;
        if (!found.length) { list.innerHTML = '<p style="margin:0;opacity:.8">No shared projects found on this Wi-Fi. Ask the host to choose <b>File → Host this project on Wi-Fi</b>, then press Refresh.</p>'; return; }
        list.innerHTML = '';
        found.forEach(h => {
          const row = el('div', { style: 'display:flex;align-items:center;justify-content:space-between;gap:10px;padding:8px 0;border-bottom:1px solid #1f2937' },
            `<div><div style="font-weight:700">${esc(h.title)}</div><div style="opacity:.7;font-size:12px">Host: ${esc(h.hostName)}</div></div>`);
          const b = el('button', {}, 'Join');
          b.setAttribute('style', btnPrimary.slice(7, -1));
          b.onclick = () => join(h);
          row.appendChild(b);
          list.appendChild(row);
        });
      }).catch(() => { if (list) list.innerHTML = '<p style="margin:0;opacity:.8">Could not search the Wi-Fi. Try again.</p>'; });
    });
  }

  window.GW = window.GW || {};
  GW.openLanShare = openMenu;      // Share button → the Join list
  GW.openLanShareHost = startHost; // File menu → Host this project on Wi-Fi…
  GW.setLanName = n => { const v = String(n || '').replace(/\s+/g, ' ').trim().slice(0, 40); if (v) { myName = v; try { localStorage.setItem('gwLanName', v); } catch (e) {} } };
})();
