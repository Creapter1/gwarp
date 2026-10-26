// Run a .sb3 in the REAL Scratch 3 engine (scratch-vm + scratch-render + scratch-storage from npm) inside Chromium.
// This is the same engine scratch.mit.edu uses, so "it works here" is real evidence - but it is still NOT the website itself:
// say "TESTED in scratch-vm", never "tested on Scratch".
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');

const LIBS = ['scratch-vm/dist/web/scratch-vm.js', 'scratch-render/dist/web/scratch-render.js', 'scratch-storage/dist/web/scratch-storage.js', 'scratch-svg-renderer/dist/web/scratch-svg-renderer.js'];

/** Opens a page with the Scratch engine and loads the project. Returns { browser, page, errors, info }. */
async function loadInScratch(sb3) {
  const browser = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'] });
  const page = await browser.newPage(); const errors = [];
  page.on('pageerror', e => errors.push(String(e).slice(0, 300)));
  await page.setContent('<canvas id="c" width="480" height="360" style="width:480px;height:360px"></canvas>');
  const fileOf = f => { const pkg = f.split('/')[0]; let d = path.dirname(require.resolve(pkg)); while (path.basename(d) !== pkg && path.dirname(d) !== d) d = path.dirname(d); return path.join(d, f.slice(pkg.length + 1)); };
  for (const f of LIBS) await page.addScriptTag({ path: fileOf(f) });
  const info = await page.evaluate(async b64 => {
    const pick = (m, k) => (m && (m[k] || m.default || m));
    const VM = pick(window.VirtualMachine, 'VirtualMachine'), Storage = pick(window.ScratchStorage, 'ScratchStorage'), Render = pick(window.ScratchRender, 'ScratchRender'), SVG = window.ScratchSVGRenderer;
    const vm = window.vm = new VM(); vm.attachStorage(new Storage()); vm.attachRenderer(window.renderer = new Render(document.getElementById('c')));
    vm.attachV2BitmapAdapter(new (SVG.BitmapAdapter || SVG.default.BitmapAdapter)());
    await vm.loadProject(Uint8Array.from(atob(b64), c => c.charCodeAt(0)).buffer);
    const rt = vm.runtime; window.__broadcasts = [];
    const ob = rt.startHats.bind(rt);
    rt.startHats = (op, f, t) => { if (op === 'event_whenbroadcastreceived' && f) window.__broadcasts.push(f.BROADCAST_OPTION); return ob(op, f, t); };
    return { targets: rt.targets.filter(t => t.isOriginal).map(t => ({ name: t.getName(), costumes: t.getCostumes().length, sounds: t.getSounds().length })) };
  }, fs.readFileSync(sb3).toString('base64'));
  return { browser, page, errors, info };
}

/** Green flag, run for `seconds`, optional key presses [{at: ms, key: 'ArrowRight', hold: ms}], screenshots every `shotEvery` ms. */
async function runInScratch(sb3, { seconds = 10, keys = [], shotsDir = null, shotEvery = 2000, sample = null } = {}) {
  const { browser, page, errors, info } = await loadInScratch(sb3);
  if (shotsDir) fs.mkdirSync(shotsDir, { recursive: true });
  await page.evaluate(() => { vm.start(); window.__t0 = performance.now(); vm.greenFlag(); });
  const t0 = Date.now(); const samples = []; let shot = 0;
  for (const k of keys) setTimeout(() => page.evaluate(([key, hold]) => { vm.postIOData('keyboard', { key, isDown: true }); setTimeout(() => vm.postIOData('keyboard', { key, isDown: false }), hold); }, [k.key, k.hold || 100]).catch(() => {}), k.at || 0);
  while (Date.now() - t0 < seconds * 1000) {
    await page.waitForTimeout(Math.min(shotEvery, 1000));
    if (sample) samples.push(await page.evaluate(sample));
    if (shotsDir && Date.now() - t0 >= shot * shotEvery) { await page.locator('#c').screenshot({ path: path.join(shotsDir, `shot-${String(shot).padStart(3, '0')}.png`) }); shot++; }
  }
  const end = await page.evaluate(() => ({
    clones: vm.runtime.targets.filter(t => !t.isOriginal).length,
    broadcasts: [...new Set(window.__broadcasts)].slice(0, 40),
    visible: vm.runtime.targets.filter(t => t.visible).map(t => `${t.getName()}${t.isOriginal ? '' : '(clone)'}@${Math.round(t.x)},${Math.round(t.y)}`).slice(0, 40)
  }));
  await browser.close();
  return { info, errors, samples, ...end };
}

module.exports = { loadInScratch, runInScratch };
