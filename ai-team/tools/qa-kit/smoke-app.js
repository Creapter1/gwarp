// Quick health check of G-Warp itself: opens the app, reads the version, clicks the main tabs, runs a tiny script, looks for errors.
//   node smoke-app.js [path/to/app.html] [screenshot.png]
const { openApp, injectBuilder } = require('./lib/gw');
(async () => {
  const [app, shot] = process.argv.slice(2); const { browser, page, errors } = await openApp(app); let bad = 0; const say = (ok, m) => { console.log((ok ? 'PASS ' : 'FAIL ') + m); if (!ok) bad++; };
  const v = await page.evaluate(() => window.GW_BUILD?.label); say(!!v, 'version: ' + v);
  for (const id of ['gwMainTabCostumes', 'gwMainTabSounds', 'gwMainTabCode']) { const ok = await page.click('#' + id).then(() => true, () => false); await page.waitForTimeout(500); say(ok, 'tab ' + id); }
  await injectBuilder(page);
  const r = await page.evaluate(async () => { const B = window.GWB, i = Engine.activeSpriteIndex;
    B.stack(i, 40, 40, [GW_V1571.blk('when_flag'), B.SET('qa', 0), B.C('repeat', [10], [], { body: [B.CHG('qa', 1), B.C('change_x', [5])] })]);
    GW.createVariable('qa'); const x0 = Engine.sprites[i].x; document.getElementById('greenFlagBtn').click(); await new Promise(r => setTimeout(r, 1500));
    return { qa: Engine.variables.qa, moved: Engine.sprites[i].x - x0 }; });
  say(r.qa == 10 && r.moved === 50, `a script runs (qa = ${r.qa}, moved ${r.moved})`);
  if (shot) await page.screenshot({ path: shot });
  say(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.join(' | ') : ''));
  await browser.close(); console.log(bad ? `${bad} problem(s)` : 'ALL PASS'); process.exit(bad ? 1 : 0);
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
