// P0: reproduce + measure the clone bomb. node p0_measure.js <html> <limit: 300|inf>
const { chromium } = require('playwright'); const { prep } = require('./harness'); const path = require('path');
const [file, lim='inf'] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await prep(p); await p.goto('file://' + path.resolve(file)); await p.waitForTimeout(3500);
  await p.evaluate((lim) => {
    if (lim === 'inf') Engine.cloneLimit = Infinity;
    const pal = t => document.querySelector(`#paletteContainer [data-type="${t}"]`).cloneNode(true);
    const ws = document.getElementById('workspaceCanvas');
    const mk = (hat, top) => { const st = document.createElement('div'); st.className = 'block-stack'; st.dataset.owner = '0'; st.style.left = '40px'; st.style.top = top + 'px'; const f = pal('forever'); f.querySelector('.block-c-body').innerHTML = ''; f.querySelector('.block-c-body').appendChild(pal('create_clone')); st.append(pal(hat), f); ws.appendChild(st); };
    mk('when_flag', 40); mk('when_clone', 200);
    // frame-gap meter: longest gap between animation frames (= how frozen the page is)
    window.__gap = 0; let last = performance.now(); (function f(){ const n = performance.now(); window.__gap = Math.max(window.__gap, n - last); last = n; requestAnimationFrame(f); })();
  }, lim);
  await p.waitForTimeout(500);
  await p.evaluate(() => document.getElementById('greenFlagBtn').click());
  await p.waitForTimeout(400);
  await p.evaluate(() => [...document.querySelectorAll('#gw15CloudAsk .gw8-dlg-foot button')].find(x => /this computer/.test(x.textContent))?.click()).catch(()=>{});
  const out = [];
  for (const t of [3, 6, 9]) {
    await p.waitForTimeout(3000);
    const t0 = Date.now();
    const r = await Promise.race([p.evaluate(() => { const g = window.__gap; window.__gap = 0; return { clones: Engine.sprites.filter(s => s.isClone).length, threads: Engine.threads.length, gap: Math.round(g) }; }), new Promise(r => setTimeout(() => r(null), 20000))]);
    out.push({ t, reply_ms: Date.now() - t0, ...(r || { frozen: true }) });
  }
  const s0 = Date.now();
  const stop = await Promise.race([p.evaluate(async () => { const a = performance.now(); document.getElementById('stopBtn').click(); await new Promise(r => { const c = () => (!Engine.sprites.some(s => s.isClone) ? r() : setTimeout(c, 10)); c(); }); return Math.round(performance.now() - a); }), new Promise(r => setTimeout(() => r('timeout>90s'), 90000))]);
  console.log(JSON.stringify({ file: path.basename(file), lim, samples: out, stop_ms_in_page: stop, stop_wall_ms: Date.now() - s0, errors: errs.slice(0,3) }));
  await b.close(); process.exit(0);
})();
