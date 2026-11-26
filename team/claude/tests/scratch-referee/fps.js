// node fps.js project.sb3 [ms]  -> steps per second and script time per step, real Scratch vs G-Warp, same fake player
// fake player: after 2 s press space TAPS times (env TAPS, default 1), click the middle of the stage, then hold "w" and "right arrow" to the end.
const { chromium } = require('/opt/npm-tools/node_modules/playwright');
const fs = require('fs'); const sb3 = process.argv[2], ms = +process.argv[3] || 12000, app = process.argv[4] || '/home/claude/rel/app.html';
const TAPS = +process.env.TAPS || 1;
const stat = (t, w) => { const d = []; for (let i = 1; i < t.length; i++) d.push(t[i] - t[i - 1]); d.sort((a, b) => a - b); const ws = [...w].sort((a, b) => a - b), sum = w.reduce((a, b) => a + b, 0);
  return { steps: t.length, steps_per_s: +(t.length / ((t[t.length - 1] - t[0]) / 1000 || 1)).toFixed(1), gap_p50: Math.round(d[d.length >> 1] || 0), gap_p95: Math.round(d[(d.length * .95) | 0] || 0), gap_worst: Math.round(d[d.length - 1] || 0), script_ms_avg: +(sum / (w.length || 1)).toFixed(1), script_ms_p95: +(ws[(ws.length * .95) | 0] || 0).toFixed(1) }; };
(async () => {
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--use-angle=swiftshader'] });
  // ---- real Scratch
  let p = await b.newPage(); const e1 = []; p.on('pageerror', e => e1.push(e.message.slice(0, 120)));
  await p.goto('file:///home/claude/ref/ref.html'); const data = [...fs.readFileSync(sb3)];
  await p.evaluate(async d => { await window.boot(new Uint8Array(d).buffer); }, data); await p.waitForTimeout(800);
  await p.evaluate(() => { window.__t = []; window.__w = []; const r = vm.runtime, s = r._step.bind(r); r._step = function () { const a = performance.now(); s(); __t.push(a); __w.push(performance.now() - a); }; vm.greenFlag(); });
  const key = (k, d) => p.evaluate(([k, d]) => vm.postIOData('keyboard', { key: k, isDown: d }), [k, d]);
  await p.waitForTimeout(2000); for (let i = 0; i < TAPS; i++) { await key(' ', true); await p.waitForTimeout(200); await key(' ', false); await p.waitForTimeout(1300); }
  await p.evaluate(() => vm.postIOData('mouse', { x: 240, y: 180, canvasWidth: 480, canvasHeight: 360, isDown: true })); await p.waitForTimeout(200); await p.evaluate(() => vm.postIOData('mouse', { x: 240, y: 180, canvasWidth: 480, canvasHeight: 360, isDown: false }));
  await p.evaluate(() => { window.__t0 = __t.length; }); await key('w', true); await key('ArrowRight', true); await p.waitForTimeout(ms);
  const s1 = await p.evaluate(() => [__t.slice(__t0), __w.slice(__t0)]); await p.screenshot({ path: '/tmp/fps_scratch.png' }); await p.close();
  // ---- G-Warp
  p = await b.newPage({ viewport: { width: 1440, height: 900 } }); const e2 = []; p.on('pageerror', e => e2.push(e.message.slice(0, 120))); p.on('dialog', d => d.dismiss());
  await p.goto('file://' + app); await p.waitForTimeout(3500); await p.setInputFiles('#sb3ImportFile', sb3);
  await p.waitForFunction(() => window.GW && GW.__sb3Project === true && document.querySelectorAll('#workspaceCanvas .scratch-block').length > 0, null, { timeout: 180000 }); await p.waitForTimeout(6000);
  await p.evaluate(() => { window.__t = []; window.__w = []; let acc = 0; const g = GW.frameGate; GW.frameGate = function () { const r = g.apply(this, arguments); if (r) { if (__t.length) __w.push(acc); acc = 0; __t.push(performance.now()); } return r; };
    const P = Object.getPrototypeOf(Engine.threads[0] || {}); const T = (window.ScriptThread || (Engine.threads[0] && Engine.threads[0].constructor)); window.__hook = () => { const C = Engine.threads[0] && Engine.threads[0].constructor; if (!C || C.prototype.__fpsH) return; const st = C.prototype.step; C.prototype.step = function () { const a = performance.now(); try { return st.apply(this, arguments); } finally { acc += performance.now() - a; } }; C.prototype.__fpsH = 1; }; });
  await p.click('#greenFlagBtn'); await p.waitForTimeout(100); await p.evaluate(() => __hook());
  const box = await p.locator('#stageCanvas').boundingBox();
  await p.waitForTimeout(1900); await p.evaluate(() => __hook()); for (let i = 0; i < TAPS; i++) { await p.keyboard.down(' '); await p.waitForTimeout(200); await p.keyboard.up(' '); await p.waitForTimeout(1300); }
  await p.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await p.mouse.down(); await p.waitForTimeout(200); await p.mouse.up();
  await p.evaluate(() => { __hook(); window.__t0 = __t.length; }); await p.keyboard.down('w'); await p.keyboard.down('ArrowRight'); await p.waitForTimeout(ms);
  const s2 = await p.evaluate(() => [__t.slice(__t0), __w.slice(__t0)]); await p.screenshot({ path: '/tmp/fps_gwarp.png' });
  console.log('Scratch', JSON.stringify(stat(s1[0], s1[1])), e1.slice(0, 2)); console.log('G-Warp ', JSON.stringify(stat(s2[0], s2[1])), e2.slice(0, 2)); await b.close();
})();
