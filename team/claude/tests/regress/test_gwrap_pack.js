const { chromium } = require('playwright'); const { prep } = require('./harness'); const path = require('path');
(async () => { let fails = 0; const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); const errs = [];
  p.on('pageerror', e => errs.push(e.message)); await prep(p);
  await p.goto('file://' + path.resolve(process.argv[2])); await p.waitForTimeout(4500);
  const info = await p.evaluate(() => ({ loaded: window.GW_GWRAP_PACK?.loaded, total: window.GW_GWRAP_PACK?.total() }));
  ok(info.loaded && info.loaded.recipes === 8 && info.loaded.tips === 8, 'starter pack loaded: ' + JSON.stringify(info));
  const m = await p.evaluate(() => ['make him walk and animate with the arrow keys', 'what does the glide button do', 'my sprite doesnt move', 'make it rain', 'make a countdown', 'make it jump', 'quiz game with points'].map(q => q + ' -> ' + (GW_V1571.match(q)[0]?.r.id)));
  console.log(m.join('\n'));
  ok(/r-walk-animate-arrows$/.test(m[0]) && /t-glide-anim$/.test(m[1]) && /r-rain-clones$/.test(m[3]) && /r-countdown$/.test(m[4]) && /r-quiz$/.test(m[6]), 'questions find the right answer');
  const ids = await p.evaluate(() => GW_V1571.recipes.filter(r => r.pack).map(r => r.id));
  for (const id of ids) {
    const r = await p.evaluate(id => { const made = GW_V1571.addRecipe(id); const n = (made || []).reduce((a, st) => a + st.querySelectorAll('.scratch-block').length, 0); const conds = (made || []).flatMap(st => [...st.querySelectorAll('.gw-input-slot[data-slot-kind="boolean"]')]).filter(s => !(s.dataset.expr || s.dataset.reporter)).length; return { stacks: (made || []).length, blocks: n, emptyConds: conds, status: document.getElementById('gwAiStatus')?.textContent }; }, id);
    ok(r.stacks > 0 && r.blocks > 2 && r.emptyConds === 0, `recipe ${id} builds: ${JSON.stringify(r)}`);
  }
  // run everything a bit
  await p.evaluate(() => document.getElementById('greenFlagBtn').click()); await p.waitForTimeout(600);
  const s0 = await p.evaluate(() => { const s = Engine.sprites[Engine.activeSpriteIndex]; return { x: s.x, c: s.activeCostume }; });
  await p.keyboard.down('ArrowRight'); await p.waitForTimeout(700); await p.keyboard.up('ArrowRight');
  const s1 = await p.evaluate(() => { const s = Engine.sprites[Engine.activeSpriteIndex]; return { x: s.x, y: s.y, clones: Engine.sprites.filter(c => c.isClone).length, vars: { ...Engine.variables } }; });
  ok(s1.x !== s0.x, 'right arrow moves the sprite ' + JSON.stringify([s0, s1.x]));
  ok(s1.clones > 0, 'rain makes clones: ' + s1.clones);
  ok('time left' in s1.vars && 'y speed' in s1.vars && 'clicks' in s1.vars, 'variables made: ' + JSON.stringify(s1.vars));
  await p.screenshot({ path: 'gwrap_test.png' });
  await p.evaluate(() => document.getElementById('stopBtn').click());
  ok(!errs.length, 'no page errors ' + errs.join(' | '));
  console.log(fails ? fails + ' FAILED' : 'ALL PASS'); await b.close(); })();
