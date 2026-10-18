const { chromium } = require('playwright'); const { prep } = require('./harness'); const path = require('path');
const [file, tag] = process.argv.slice(2); const Z = '/tmp/claude-0/-home-claude/89a5354a-15ce-5dfe-8bd9-593b440e36e9/scratchpad/zombie/';
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); const net = new Set();
  await prep(p, { route: async (r, u) => { net.add(new URL(u).host); return false; } });
  await p.addInitScript(() => { delete window.showOpenFilePicker; });
  await p.goto('file://' + path.resolve(file)); await p.waitForTimeout(3500);
  const [fc] = await Promise.all([p.waitForEvent('filechooser'), p.evaluate(() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'o', ctrlKey: true, bubbles: true })))]);
  const t0 = Date.now(); await fc.setFiles(Z + 'zombie.sb3');
  await p.waitForFunction(() => Engine.sprites.some(s => /^Z1$/.test(s.name)), null, { timeout: 60000 }).catch(() => {});
  await p.waitForTimeout(2500); const loadS = (Date.now() - t0) / 1000;
  const report = await p.evaluate(() => (document.getElementById('gw8ImportReport')?.innerText || '').slice(0, 600));
  await p.screenshot({ path: Z + tag + '-1-loaded.png' });
  await p.keyboard.press('Escape');
  // remove the limiter
  await p.evaluate(() => { Engine.cloneLimit = Infinity; GW.CLONE_CEILING = Infinity;
    window.__gap = 0; window.__fr = 0; let last = performance.now(); (function f(){ const n = performance.now(); window.__gap = Math.max(window.__gap, n - last); window.__fr++; last = n; requestAnimationFrame(f); })(); });
  await p.evaluate(() => document.getElementById('greenFlagBtn').click());
  await p.waitForTimeout(500); await p.evaluate(() => [...document.querySelectorAll('#gw15CloudAsk .gw8-dlg-foot button')].find(x => /this computer/.test(x.textContent))?.click()).catch(() => {});
  await p.evaluate(() => setInterval(() => { const d = document.getElementById('gw46Stuck'); if (d) [...d.querySelectorAll('button')].find(x => x.textContent === 'Keep going')?.click(); }, 200));
  const c = await p.context().newCDPSession(p); if (process.env.PROF) { await c.send('Profiler.enable'); await c.send('Profiler.start'); }
  const samples = [];
  for (let i = 1; i <= 6; i++) {
    // play a little: hold arrow keys / space like a player
    await p.keyboard.down(['ArrowRight','ArrowUp','ArrowLeft','ArrowDown'][i % 4]); await p.keyboard.press('Space');
    await p.waitForTimeout(2500); await p.keyboard.up(['ArrowRight','ArrowUp','ArrowLeft','ArrowDown'][i % 4]);
    const r = await Promise.race([p.evaluate(() => { const o = { clones: Engine.sprites.filter(s => s.isClone).length, threads: Engine.threads.length, fps: Math.round(window.__fr / 2.5), worstGapMs: Math.round(window.__gap), running: Engine.isRunning }; window.__gap = 0; window.__fr = 0; return o; }), new Promise(r => setTimeout(() => r({ frozen: true }), 20000))]);
    samples.push({ s: i * 2.5, ...r }); if (i === 3) await p.screenshot({ path: Z + tag + '-2-playing.png' });
  }
  await p.screenshot({ path: Z + tag + '-3-later.png' });
  if (process.env.PROF) { const { profile } = await c.send('Profiler.stop'); const self = {}, idx = {}; profile.nodes.forEach(n => idx[n.id] = n); profile.samples.forEach((id, i) => { const n = idx[id]; const k = (n.callFrame.functionName || '(anon)') + ':' + n.callFrame.lineNumber + ':' + n.callFrame.columnNumber; self[k] = (self[k] || 0) + (profile.timeDeltas[i] || 0); }); const tot = Object.values(self).reduce((a, b) => a + b, 0); console.log(Object.entries(self).sort((a, b) => b[1] - a[1]).slice(0, 15).map(([k, v]) => (100 * v / tot).toFixed(1) + '% ' + k).join('\n')); }
  const stop = await Promise.race([p.evaluate(async () => { const a = performance.now(); document.getElementById('stopBtn').click(); await new Promise(r => { const c = () => (!Engine.sprites.some(s => s.isClone) ? r() : setTimeout(c, 10)); c(); }); return Math.round(performance.now() - a); }), new Promise(r => setTimeout(() => r('timeout>60s'), 60000))]);
  const unknown = await p.evaluate(() => [...new Set([...document.querySelectorAll('#workspaceCanvas [data-type]')].map(e => e.dataset.type).filter(t => /unknown|unsupported/i.test(t)))]);
  console.log(JSON.stringify({ tag, loadS, report: report.replace(/\s+/g, ' '), samples, stop_ms: stop, hostsAsked: [...net], errors: errs.slice(0, 4), unknown }, null, 1));
  await b.close(); process.exit(0);
})();
