// Power lines (v15.46.4): wires appear while running, spark on fire, disappear on Stop, switch works, clicks pass through.
const { chromium } = require('playwright'); const { prep } = require('./harness'); const path = require('path');
const [file, sb3, shot] = process.argv.slice(2);
(async () => { let fails = 0; const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); const errs = [];
  p.on('pageerror', e => errs.push(e.message)); await prep(p); await p.addInitScript(() => { delete window.showOpenFilePicker; });
  await p.goto('file://' + path.resolve(file)); await p.waitForTimeout(3500);
  const [fc] = await Promise.all([p.waitForEvent('filechooser'), p.evaluate(() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'o', ctrlKey: true, bubbles: true })))]);
  await fc.setFiles(sb3); await p.waitForFunction(() => Engine.sprites.some(s => s.name === 'Pole'), null, { timeout: 30000 }); await p.waitForTimeout(1500);
  await p.keyboard.press('Escape');
  // pick the Bolt sprite in the sprite list
  await p.evaluate(() => { const el = [...document.querySelectorAll('#gwSpritesGrid *, .sprite-card, [data-sprite-index], [data-index]')].find(e => e.children.length < 6 && /^\s*Bolt\s*$/.test(e.textContent)); (el?.closest('[data-sprite-index],[data-index],.sprite-card') || el)?.click(); });
  await p.waitForTimeout(600);
  const pre = await p.evaluate(() => ({ active: Engine.sprites[Engine.activeSpriteIndex]?.name, stacks: [...document.querySelectorAll('#workspaceCanvas > .block-stack')].filter(s => s.offsetWidth > 0).map(s => s.firstElementChild?.dataset.type), api: !!window.GW_POWER_LINES, btn: !!document.getElementById('gw464PowerBtn') }));
  console.log(JSON.stringify(pre)); ok(pre.api && pre.btn, 'module + More→Settings switch present');
  ok(await p.evaluate(() => !document.getElementById('gwPLBack') || getComputedStyle(document.getElementById('gwPLBack')).display === 'none'), 'no wires before Start');
  const ep0 = await p.evaluate(() => GW.__wsEpoch);
  await p.evaluate(() => document.getElementById('greenFlagBtn').click()); await p.waitForTimeout(500);
  await p.evaluate(() => [...document.querySelectorAll('#gw15CloudAsk .gw8-dlg-foot button')].find(x => /this computer/.test(x.textContent))?.click()).catch(() => {});
  await p.waitForTimeout(1600);
  let r = await p.evaluate(() => { const P = GW_POWER_LINES; return { live: P.live, shown: getComputedStyle(document.getElementById('gwPLBack')).display, wires: P.wires.map(w => w.kind + (w.to ? '->' + w.to.dataset.type : '->other')), poles: P.poles.length, stats: P.stats, tag: document.querySelector('.gw-pl-tag')?.textContent }; });
  console.log(JSON.stringify(r));
  ok(r.live && r.shown === 'block', 'wires layer shows while running');
  ok(r.wires.includes('bc->when_broadcast'), 'broadcast → when I receive wire');
  ok(r.wires.includes('mb->define_custom'), 'My Block → define wire');
  ok(r.wires.includes('bc->other') && /Pole/.test(r.tag || ''), 'broadcast heard by another sprite is named: ' + r.tag);
  ok(r.poles === 4, 'a pole on each of the 4 start blocks: ' + r.poles);
  ok(r.stats.fires > 0 && r.stats.hatFires > 0, 'wires fire and hats spark: ' + JSON.stringify(r.stats));
  // hot states seen over time
  const hot = await p.evaluate(async () => { const seen = { wire: 0, pole: 0, spark: 0 }; for (let i = 0; i < 60; i++) { await new Promise(r => setTimeout(r, 25)); if (document.querySelector('.gw-pl-w.hot')) seen.wire++; if (document.querySelector('.gw-pl-pole.hot')) seen.pole++; if (document.querySelector('.gw-pl-spark')) seen.spark++; } return seen; });
  ok(hot.wire > 0 && hot.pole > 0 && hot.spark > 0, 'wires flash, poles spark, sparks travel: ' + JSON.stringify(hot));
  // the key hat sparks when space is pressed
  const keyHat = await p.evaluate(() => { const P = GW_POWER_LINES; const k = P.poles.find(x => x.h.dataset.type === 'when_key'); return k ? Math.round(performance.now() - k.hotAt) : -1; });
  await p.keyboard.press('Space'); await p.waitForTimeout(120);
  const keyHat2 = await p.evaluate(() => { const k = GW_POWER_LINES.poles.find(x => x.h.dataset.type === 'when_key'); return k ? Math.round(performance.now() - k.hotAt) : -1; });
  ok(keyHat2 >= 0 && keyHat2 < 400, 'space key → its start block sparks (' + keyHat + ' → ' + keyHat2 + ' ms ago)');
  // clicks go through the wires to the blocks
  const thru = await p.evaluate(() => { const w = GW_POWER_LINES.wires.find(x => x.to); const L = w.core.getTotalLength(); const pt = w.core.getPointAtLength(L / 2); const ws = document.getElementById('workspace').getBoundingClientRect(), W = document.getElementById('workspace'); const x = pt.x + ws.left + W.clientLeft - W.scrollLeft, y = pt.y + ws.top + W.clientTop - W.scrollTop; const el = document.elementFromPoint(x, y); return el ? (el.closest('svg#gwPLBack,svg#gwPLFront') ? 'overlay' : el.id || el.className || el.tagName) : 'none'; });
  ok(thru !== 'overlay', 'wires never catch clicks (hit: ' + String(thru).slice(0, 40) + ')');
  // zoomed out: wires still end exactly on their start blocks
  await p.evaluate(() => { const sl = document.getElementById('gwWorkspaceZoomV15'); if (sl) { sl.value = String(sl.max > 10 ? 60 : 0.6); sl.dispatchEvent(new Event('input', { bubbles: true })); sl.dispatchEvent(new Event('change', { bubbles: true })); } });
  await p.waitForTimeout(700);
  const zr = await p.evaluate(() => { const z = GW_WSZOOM(); const w = GW_POWER_LINES.wires.find(x => x.to && x.kind === 'bc'); if (!w) return { z, miss: 1 }; const L = w.core.getTotalLength(), pt = w.core.getPointAtLength(L), W = document.getElementById('workspace'), wr = W.getBoundingClientRect(); const h = w.to.getBoundingClientRect(); return { z, dx: Math.round(Math.abs(pt.x + wr.left + W.clientLeft - W.scrollLeft - h.left)), dy: Math.round(pt.y + wr.top + W.clientTop - W.scrollTop - h.top) , hh: Math.round(h.height) }; });
  ok(zr.z < 0.95 && zr.dx <= 2 && zr.dy >= 0 && zr.dy <= zr.hh, 'zoomed to ' + zr.z + ': wire still lands on its block ' + JSON.stringify(zr));
  if (shot) await p.screenshot({ path: shot });
  const ep1 = await p.evaluate(() => GW.__wsEpoch);
  // Stop clears everything
  await p.evaluate(() => document.getElementById('stopBtn').click()); await p.waitForTimeout(300);
  r = await p.evaluate(() => ({ live: GW_POWER_LINES.live, wires: GW_POWER_LINES.wires.length, sparks: document.querySelectorAll('.gw-pl-spark').length, shown: getComputedStyle(document.getElementById('gwPLBack')).display }));
  ok(!r.live && r.wires === 0 && r.sparks === 0 && r.shown === 'none', 'Stop clears the wires ' + JSON.stringify(r));
  // the code area itself is never touched
  ok(await p.evaluate(() => !document.querySelector('#workspaceCanvas svg#gwPLBack, #workspaceCanvas svg#gwPLFront, #workspaceCanvas .gw-pl-w')), 'overlay lives outside the code canvas');
  // switch off → nothing while running
  await p.evaluate(() => { document.getElementById('extra-menu-trigger')?.click(); document.getElementById('gw464PowerBtn').click(); });
  const st = await p.evaluate(() => ({ on: GW_POWER_LINES.on, txt: document.getElementById('gw464PowerBtn').textContent, saved: localStorage.getItem('gwarp-power-lines') }));
  ok(!st.on && /Off/.test(st.txt) && st.saved === 'off', 'switch turns it off and remembers ' + JSON.stringify(st));
  await p.keyboard.press('Escape');
  await p.evaluate(() => document.getElementById('greenFlagBtn').click()); await p.waitForTimeout(900);
  r = await p.evaluate(() => ({ live: GW_POWER_LINES.live, wires: GW_POWER_LINES.wires.length, running: Engine.isRunning }));
  ok(r.running && !r.live && r.wires === 0, 'off: project runs with no wires ' + JSON.stringify(r));
  const ep2a = await p.evaluate(() => GW.__wsEpoch); await p.waitForTimeout(1500); const ep2b = await p.evaluate(() => GW.__wsEpoch);
  console.log('code-area change counter while running: with lines ' + (ep1 - ep0) + ' (incl. start), without lines ' + (ep2b - ep2a) + ' per 1.5 s');
  await p.evaluate(() => { document.getElementById('stopBtn').click(); GW_POWER_LINES.set(true); });
  ok(!errs.length, 'no page errors ' + errs.slice(0, 3).join(' | '));
  await b.close(); console.log(fails ? fails + ' FAILED' : 'ALL PASS'); process.exit(fails ? 1 : 0); })();
