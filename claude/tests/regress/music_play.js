const { chromium } = require('playwright'); const { prep } = require('./harness'); const path = require('path');
(async () => { const b = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] }); const p = await b.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await prep(p); await p.goto('file://' + path.resolve(process.argv[2])); await p.waitForTimeout(3500);
  const r = await p.evaluate(async () => { const A = window.GW_SONG_ARRANGER; const out = [];
    for (const st of [{ genre: 'lofi', mood: 'chill', theme: 'vlog' }, { genre: 'trap', mood: 'dark', theme: 'horror' }, { genre: 'orchestra', mood: 'epic', theme: 'cinematic' }]) {
      A.setStyle(st); try { await A.play?.(); await new Promise(r => setTimeout(r, 1200)); A.stop?.(); out.push(st.genre + ' played'); } catch (e) { out.push(st.genre + ' ERROR ' + e.message); } }
    try { const t0 = performance.now(); const buf = await A.renderOffline?.(22050, 2); out.push('offline render ' + (buf ? (buf.duration || buf.length || 'ok') : 'none') + ' in ' + Math.round(performance.now() - t0) + ' ms'); } catch (e) { out.push('render ERROR ' + e.message); }
    return out; });
  console.log(r.join(' | '), '| page errors:', JSON.stringify(errs)); await b.close(); })();
