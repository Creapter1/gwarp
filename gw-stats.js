// G-Warp visit counter (v15.58.0, Claude, owner 2026-10-26: "how many people visit and are active online, in the app or the web").
// Counts visits, people (one per browser) and who is online right now - on the website and in the app.
// Stores ONLY numbers and a random session code: no names, no IP address, no location, no cookies.
// Uses a free Firebase Realtime Database (rules: ai-team/stats/database.rules.json). Numbers: stats.html
(() => {
  const DB = 'https://gwarp-stats-16c00-default-rtdb.firebaseio.com'; // <- the owner's database link, e.g. 'https://gwarp-stats-default-rtdb.firebaseio.com' (empty = counter off)
  window.GW_STATS_DB = DB;
  if (!DB || !/(^|\.)github\.io$|(^|\.)gwarper\.com$/.test(location.hostname)) return; // only the real site: not tests, not downloaded copies
  if (/stats\.html$/.test(location.pathname)) return; // looking at the numbers is not a visit
  const where = /app\.html$/.test(location.pathname) ? 'app' : 'site';
  const send = (path, body, method = 'PUT') => fetch(`${DB}/${path}.json`, { method, body: body === undefined ? undefined : JSON.stringify(body), keepalive: true }).catch(() => {});
  const add1 = k => send('counts/' + k, { '.sv': { increment: 1 } });
  add1(where + 'Visits');
  try { if (!localStorage.getItem('gw-counted-' + where)) { localStorage.setItem('gw-counted-' + where, '1'); add1(where + 'People'); } } catch {}
  // "online now" = this tab is open and visible; a heartbeat every 30 s, gone when the tab closes
  const id = Math.random().toString(36).slice(2, 12), me = `online/${where}/${id}`;
  const beat = () => { if (document.visibilityState === 'visible') send(me, { '.sv': 'timestamp' }); };
  beat(); setInterval(beat, 30000); document.addEventListener('visibilitychange', beat);
  addEventListener('pagehide', () => send(me, undefined, 'DELETE'));
})();
