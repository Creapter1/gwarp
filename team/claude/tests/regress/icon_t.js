const { chromium } = require('playwright'); const { prep } = require('./harness'); const path = require('path');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); const errs = []; p.on('pageerror', e => errs.push(e.message)); await prep(p); await p.goto('file://' + path.resolve(process.argv[2])); await p.waitForTimeout(3500);
  await p.click('#gwMainTabSounds'); await p.waitForTimeout(600);
  const shot = async (n, clip) => p.screenshot({ path: process.argv[3] + n + '.png', clip });
  await shot('-inst', { x: 230, y: 100, width: 680, height: 260 });
  await p.click('#gwSndTab-song'); await p.waitForTimeout(700); await shot('-song', { x: 230, y: 100, width: 700, height: 520 });
  // a sound so the effect buttons show
  await p.click('#gwSndTab-instruments'); await p.waitForTimeout(300); await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => /Add note to Sprite/i.test(x.textContent)); b?.click(); }); await p.waitForTimeout(800);
  await p.click('#gwSndTab-edit'); await p.waitForTimeout(700); await shot('-edit', { x: 0, y: 100, width: 940, height: 760 });
  const n = await p.evaluate(() => ({ icons: document.querySelectorAll('.gw1552-ic').length, fx: document.querySelectorAll('#gwSndFx .gw1552-ic').length, hiddenOld: document.querySelectorAll('.gw1552-hide').length, dup: [...document.querySelectorAll('#gwSndFx button, .gw-inst-group, [id^=gwSndTab-]')].filter(b => b.querySelectorAll(':scope > .gw1552-ic').length > 1).length }));
  console.log(JSON.stringify(n), 'errors', JSON.stringify(errs)); await b.close(); })();
