const { chromium } = require('playwright'); const { prep } = require('./harness'); const path = require('path');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); const errs = [];
  p.on('pageerror', e => errs.push(e.message)); await prep(p); await p.goto('file://' + path.resolve(process.argv[2])); await p.waitForTimeout(4500);
  const r = await p.evaluate(async () => { const L = GW_SPRITE_LIBRARY.list; const out = { n: L.length };
    const a = await GW_SPRITE_LIBRARY.addSprite(L.indexOf('Spinning Coin')); out.coin = a && a.costumes.map(c => c.name + ':' + c.canvas.width);
    const v = await GW_SPRITE_LIBRARY.addSprite(L.indexOf('G-Spark Poses')); out.bot = (await GW_SPRITE_LIBRARY.addSprite(L.indexOf('Spark Bot')))?.costumes[0].canvas.width; out.poses = v && v.costumes.map(c => c.name + ':' + c.canvas.width);
    GW_SPRITE_LIBRARY.open(); await new Promise(r => setTimeout(r, 500)); out.cards = document.querySelectorAll('#gw41Lib .gw41-card').length; return out; });
  await p.screenshot({ path: 'lib.png' }); console.log(JSON.stringify(r), errs); await b.close(); })();
