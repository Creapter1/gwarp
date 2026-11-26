// Runs an .sb3 in the real Scratch engine (headless) and prints the stage variables + sprite states.
// Usage: node ref.js project.sb3 [milliseconds]
const { chromium } = require('/opt/npm-tools/node_modules/playwright');
const fs = require('fs');
// The same fake player in both engines: once the project sets "ready" to 1, press space for 0.3 s, then click the stage at
// Scratch position x 100, y 50 (canvas 340, 130). Projects without a "ready" variable just wait.
async function inputs(p, ms, key, mouse) {
  const t0 = Date.now(); let done = false;
  while (Date.now() - t0 < ms) { await p.waitForTimeout(100);
    if (!done && await p.evaluate(() => { try { return window.__ready(); } catch (e) { return false; } })) { done = true;
      await p.waitForTimeout(300); await key(true); await p.waitForTimeout(300); await key(false); await p.waitForTimeout(300); await mouse(true); await p.waitForTimeout(300); await mouse(false); } }
}
module.exports = async function (sb3, ms) {
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--use-angle=swiftshader'] });
  const p = await b.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto('file:///home/claude/ref/ref.html');
  const data = [...fs.readFileSync(sb3)];
  await p.evaluate(async d => { await window.boot(new Uint8Array(d).buffer); }, data);
  await p.waitForTimeout(500);
  await p.evaluate(() => window.vm.greenFlag());
  await inputs(p, ms || 4000, async (down) => p.evaluate(d => window.vm.postIOData('keyboard', { key: ' ', isDown: d }), down),
    async (down) => p.evaluate(d => window.vm.postIOData('mouse', { x: 340, y: 130, canvasWidth: 480, canvasHeight: 360, isDown: d }), down));
  const out = await p.evaluate(() => ({ vars: window.vars(), sprites: window.sprites() }));
  out.errs = errs; await b.close(); return out;
};
if (require.main === module) module.exports(process.argv[2], +process.argv[3] || 4000).then(o => console.log(JSON.stringify(o)));

module.exports.inputs = inputs;
