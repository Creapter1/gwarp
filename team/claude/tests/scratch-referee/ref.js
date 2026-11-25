// Runs an .sb3 in the real Scratch engine (headless) and prints the stage variables + sprite states.
// Usage: node ref.js project.sb3 [milliseconds]
const { chromium } = require('/opt/npm-tools/node_modules/playwright');
const fs = require('fs');
module.exports = async function (sb3, ms) {
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--use-angle=swiftshader'] });
  const p = await b.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
  await p.goto('file:///home/claude/ref/ref.html');
  const data = [...fs.readFileSync(sb3)];
  await p.evaluate(async d => { await window.boot(new Uint8Array(d).buffer); }, data);
  await p.waitForTimeout(500);
  await p.evaluate(() => window.vm.greenFlag());
  await p.waitForTimeout(ms || 4000);
  const out = await p.evaluate(() => ({ vars: window.vars(), sprites: window.sprites() }));
  out.errs = errs; await b.close(); return out;
};
if (require.main === module) module.exports(process.argv[2], +process.argv[3] || 4000).then(o => console.log(JSON.stringify(o)));
