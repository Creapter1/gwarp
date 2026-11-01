// Same test in G-Warp AND in the real Scratch engine, answers side by side. Made for the BLK-xxxx-PAR / -EDGE jobs.
//   node compare.js my-test.json [seconds=2] [app.html]
// my-test.json (example):
//   { "name": "BLK-0001-PAR move", "vars": ["result"], "lists": [],
//     "script": "return [B.C('move', [10]), B.SET('result', B.X)];" }
// "script" = the blocks AFTER "when green flag clicked" (the builder B = window.GWB, see README section 3).
// It builds the script in G-Warp, saves a pure Scratch .sb3 (out/<name>.sb3), runs it in G-Warp, runs the SAME file in scratch-vm,
// and prints every variable, list and the sprite's x / y / direction / size / costume / shown in both.
// Exit code: 0 = SAME, 1 = DIFFERENT (= a possible bug: report it), 2 = the test itself broke (fix your test).
const fs = require('fs'), path = require('path');
const { openApp, injectBuilder, saveSb3 } = require('./lib/gw');
const { loadInScratch } = require('./lib/scratch');
(async () => {
  const [file, secArg, app] = process.argv.slice(2);
  if (!file) { console.log('usage: node compare.js test.json [seconds=2] [app.html]'); process.exit(2); }
  const t = JSON.parse(fs.readFileSync(file, 'utf8')), sec = +(secArg || t.seconds || 2), vars = t.vars || [], lists = t.lists || [];
  const name = String(t.name || path.basename(file, '.json')).replace(/[^\w.-]+/g, '_');
  fs.mkdirSync(path.join(__dirname, 'out'), { recursive: true }); const sb3 = path.join(__dirname, 'out', name + '.sb3');

  // 1. G-Warp: build, save, run
  const { browser, page, errors } = await openApp(app || undefined); await injectBuilder(page);
  const built = await page.evaluate(({ script, vars, lists }) => {
    try {
      const B = window.GWB, E = window.Engine, i = E.activeSpriteIndex;
      vars.forEach(v => B.globalVar(v)); lists.forEach(l => B.globalList(l));
      const body = new Function('B', 'E', script)(B, E);
      B.stack(i, 40, 40, [GW_V1571.blk('when_flag'), ...body]);
      try { GW8.decorate(); GW_V1571.rehydrate(); GW8.indexCustomProcedures(); GW.refreshBlockMenus(); } catch (e) {}
      return 'ok';
    } catch (e) { return 'ERROR ' + e.message; }
  }, { script: t.script, vars, lists });
  if (built !== 'ok') { console.log('TEST BROKE (G-Warp build):', built); await browser.close(); process.exit(2); }
  await saveSb3(page, sb3);
  const gw = await page.evaluate(async ({ sec, vars, lists }) => {
    document.getElementById('greenFlagBtn').click(); await new Promise(r => setTimeout(r, sec * 1000));
    const E = window.Engine, s = E.sprites[E.activeSpriteIndex], c = s.costumes?.[s.activeCostume];
    const out = {}; vars.forEach(v => out['var ' + v] = E.variables[v]); lists.forEach(l => out['list ' + l] = JSON.stringify(E.lists[l] || []));
    Object.assign(out, { x: s.x, y: s.y, direction: s.direction, size: s.size, costume: c?.name, shown: s.visible !== false });
    try { document.getElementById('stopBtn')?.click(); } catch (e) {}
    return out;
  }, { sec, vars, lists });
  const gwErr = errors.slice(); await browser.close();

  // 2. Scratch: the same file
  const S = await loadInScratch(sb3);
  const sc = await S.page.evaluate(async ({ sec, vars, lists }) => {
    vm.start(); vm.greenFlag(); await new Promise(r => setTimeout(r, sec * 1000));
    const rt = vm.runtime, st = rt.getTargetForStage(), s = rt.targets.find(x => x.isOriginal && !x.isStage);
    const byName = (type, n) => { for (const tg of [st, s]) for (const v of Object.values(tg.variables)) if (v.name === n && v.type === type) return v.value; };
    const out = {}; vars.forEach(v => out['var ' + v] = byName('', v)); lists.forEach(l => out['list ' + l] = JSON.stringify(byName('list', l) || []));
    Object.assign(out, { x: s.x, y: s.y, direction: s.direction, size: s.size, costume: s.getCostumes()[s.currentCostume]?.name, shown: s.visible });
    vm.stopAll(); return out;
  }, { sec, vars, lists });
  const scErr = S.errors.slice(); await S.browser.close();

  // 3. compare
  const same = (a, b) => { if (a === b) return true; const na = Number(a), nb = Number(b);
    if (a !== '' && b !== '' && a != null && b != null && !isNaN(na) && !isNaN(nb)) return Math.abs(na - nb) < 1e-6; return String(a) === String(b); };
  let diff = 0; console.log(`TEST ${name} (${sec}s)   file: ${path.relative(process.cwd(), sb3)}`);
  console.log('what'.padEnd(18) + 'G-Warp'.padEnd(26) + 'Scratch'.padEnd(26) + 'result');
  const sameList = (a, b) => { try { const x = JSON.parse(a), y = JSON.parse(b); return x.length === y.length && x.every((v, i) => same(v, y[i])); } catch (e) { return a === b; } };
  for (const k of Object.keys(sc)) { const ok = k.startsWith('list ') ? sameList(gw[k], sc[k]) : same(gw[k], sc[k]); if (!ok) diff++;
    console.log(k.padEnd(18) + String(gw[k]).slice(0, 24).padEnd(26) + String(sc[k]).slice(0, 24).padEnd(26) + (ok ? 'same' : 'DIFFERENT')); }
  console.log('G-Warp page errors:', gwErr.length ? gwErr : 'none'); console.log('Scratch page errors:', scErr.length ? scErr : 'none');
  console.log(diff ? `DIFFERENT (${diff}) - possible G-Warp bug: report it with this output` : 'SAME');
  process.exit(diff ? 1 : (gwErr.length || scErr.length ? 1 : 0));
})().catch(e => { console.error('TEST BROKE:', e.message); process.exit(2); });
