// Costume animation (v15.47.0): Animation tab for everyone, G-Spark ready-made bones, stale-frame fix, rename,
// blocks; rigging a costume drawn in G-Warp's own vector editor; Flipbook onion skin + Play.
// Run: NODE_PATH=<playwright> node test_cosanim.js ../../app.html [shots-prefix]
const { chromium } = require('playwright'); const { prep } = require('./harness'); const path = require('path');
const [file, shots] = process.argv.slice(2);
(async () => { let fails = 0; const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); const errs = [];
  p.on('pageerror', e => errs.push(e.message)); await prep(p);
  await p.addInitScript(() => { try { localStorage.removeItem('gwarp-dev-mode'); localStorage.removeItem('gwarp-flipbook'); } catch {} });
  await p.goto('file://' + path.resolve(file)); await p.waitForTimeout(3500);
  const shot = async n => { if (shots) await p.screenshot({ path: shots + '-' + n + '.png' }); };
  const S = () => p.evaluate(() => { const s = Engine.sprites[Engine.activeSpriteIndex]; return { names: s.costumes.map(c => c.name), active: s.activeCostume, anims: (s.gwAnimations || []).map(a => a.name + '/' + a.frames.length) }; });
  await p.evaluate(() => [...document.querySelectorAll('button')].find(x => /^\s*Costumes\s*$/.test(x.textContent))?.click()); await p.waitForTimeout(900);

  /* ---------- A. Animation tab, normal user ---------- */
  ok(await p.evaluate(() => document.body.classList.contains('gw8-user-mode') && (document.getElementById('gw18AnimBtn')?.offsetWidth || 0) > 0), 'Animation button shows for everyone (not Developer mode)');
  await p.evaluate(() => document.getElementById('gw18AnimBtn').click()); await p.waitForTimeout(1200);
  let r = await p.evaluate(() => ({ open: !!document.getElementById('gw18Anim'), mode: GW_ANIM.state.mode, anim: GW_ANIM.state.anim?.name, frames: GW_ANIM.state.anim?.frames.length, bones: GW_ANIM.state.anim?.bones.length, badge: document.querySelector('#gw18Anim .gw18-badge')?.textContent, list: (Engine.sprites[Engine.activeSpriteIndex].gwAnimations || []).map(a => a.name) }));
  ok(r.open && r.mode === 'animate' && r.anim === 'walk' && r.frames === 8 && r.bones === 5, 'G-Spark opens with ready-made bones + walk/wave ' + JSON.stringify(r));
  ok(r.badge === 'Beta', 'no longer marked Developer-mode preview: ' + r.badge);
  await shot('1-anim');
  // keys: → steps a frame, Space plays and stops
  await p.evaluate(() => document.getElementById('gw18Anim').focus()); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(100);
  const f1 = await p.evaluate(() => GW_ANIM.state.frame); ok(f1 === 1, '→ goes to the next frame (' + f1 + ')');
  await p.keyboard.press('Space'); await p.waitForTimeout(700); const pl = await p.evaluate(() => ({ playing: !!GW_ANIM.state.play, f: GW_ANIM.state.frame }));
  await p.keyboard.press('Space'); await p.waitForTimeout(100); const st2 = await p.evaluate(() => !!GW_ANIM.state.play);
  ok(pl.playing && !st2, 'Space plays and stops the preview ' + JSON.stringify(pl));
  // Make costumes
  await p.evaluate(() => [...document.querySelectorAll('#gw18Anim button')].find(x => /Make costumes/.test(x.textContent)).click()); await p.waitForTimeout(1500);
  let c = await S(); ok(c.names.filter(n => /^walk \d$/.test(n)).length === 8, 'Make costumes → walk 1…8: ' + c.names.join(','));
  // change the animation (delete a frame), close → made costumes follow
  await p.evaluate(() => { GW_ANIM.state.frame = 7; [...document.querySelectorAll('#gw18Anim button')].find(x => x.querySelector('.fa-trash') && !/bone/i.test(x.textContent) && x.closest('.gw18-frame-tools'))?.click(); });
  await p.waitForTimeout(200); const fr = await p.evaluate(() => GW_ANIM.state.anim.frames.length);
  await p.evaluate(() => GW_ANIM.close()); await p.waitForTimeout(1800);
  c = await S(); ok(fr === 7 && c.names.filter(n => /^walk \d$/.test(n)).length === 7 && !c.names.includes('walk 8'), 'after deleting a frame, closing updates the costumes (7 left): ' + c.names.filter(n => /^walk/.test(n)).join(','));
  ok(await p.evaluate(() => { const s = Engine.sprites[Engine.activeSpriteIndex], a = s.gwAnimations[0]; return s.costumes.filter(x => x.gwAnimFrame?.anim === a.id).every(x => x.gwAnimFrame.rev === (a.rev || 0)); }), 'updated costumes carry the animation\'s version');
  // rename walk → run renames its costumes
  await p.evaluate(() => GW_ANIM.open()); await p.waitForTimeout(800);
  await p.evaluate(() => [...document.querySelectorAll('#gw18Anim button')].find(x => x.textContent.trim() === 'Rename').click()); await p.waitForTimeout(400);
  await p.evaluate(() => { const i = document.querySelector('#gw18Rename input'); i.value = 'run'; i.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })); }); await p.waitForTimeout(500);
  await p.evaluate(() => GW_ANIM.close()); await p.waitForTimeout(800);
  c = await S(); ok(c.anims.includes('run/7') && c.names.filter(n => /^run \d$/.test(n)).length === 7 && !c.names.some(n => /^walk/.test(n)), 'rename walk → run renames its costumes: ' + c.names.join(','));
  // blocks: palette for everyone; the player uses fresh frames
  await p.evaluate(() => [...document.querySelectorAll('button')].find(x => /^\s*Code\s*$/.test(x.textContent))?.click()); await p.waitForTimeout(900);
  r = await p.evaluate(() => { const sec = document.querySelector('[data-ext-section="gwarpAnimation"]'); return { shown: !!sec && sec.style.display !== 'none', opts: [...(sec?.querySelector('select')?.options || [])].map(o => o.value) }; });
  ok(r.shown && r.opts.join() === 'run,wave', 'Animation blocks in the palette for everyone: ' + JSON.stringify(r));
  r = await p.evaluate(async () => { const s = Engine.sprites[Engine.activeSpriteIndex], a = s.gwAnimations.find(x => x.name === 'run'); a.rev = (a.rev || 0) + 1; const stale = GW_ANIM_BLOCKS.frameIdx(s, a) === null; const idx = await GW_ANIM_BLOCKS.ensureFrames(s, a); return { stale, idx: idx && idx.length, fresh: s.costumes.filter(x => x.gwAnimFrame?.anim === a.id).every(x => x.gwAnimFrame.rev === a.rev) }; });
  ok(r.stale && r.idx === 7 && r.fresh, 'blocks never play out-of-date frames (they are made again) ' + JSON.stringify(r));
  r = await p.evaluate(async () => { document.getElementById('greenFlagBtn').click(); await new Promise(r => setTimeout(r, 200)); const s = Engine.sprites[Engine.activeSpriteIndex]; GW_ANIM_BLOCKS.start(s, 'run', 1, true); const seen = new Set(); for (let i = 0; i < 30; i++) { await new Promise(r => setTimeout(r, 50)); seen.add(s.costumes[s.activeCostume]?.name); } document.getElementById('stopBtn').click(); return [...seen]; });
  ok(r.filter(n => /^run \d$/.test(n)).length >= 5, '“play animation [run] over and over” flips through its frames: ' + r.join(','));
  await p.evaluate(() => [...document.querySelectorAll('button')].find(x => /^\s*Costumes\s*$/.test(x.textContent))?.click()); await p.waitForTimeout(900);

  /* ---------- B. a costume drawn in G-Warp's vector editor gets bones ---------- */
  await p.evaluate(() => document.getElementById('gwCosPaintBtn').click()); await p.waitForTimeout(900);
  const drawRect = async (x0, y0, x1, y1) => { const bx = await p.evaluate(() => { const r = document.getElementById('gwVectorCanvasV15').getBoundingClientRect(); return { x: r.x, y: r.y }; }); await p.evaluate(() => document.querySelector('#gwSvgToolsV15 [data-gwpe="rect"]').click()); await p.mouse.move(bx.x + x0, bx.y + y0); await p.mouse.down(); await p.mouse.move(bx.x + (x0 + x1) / 2, bx.y + (y0 + y1) / 2, { steps: 4 }); await p.mouse.move(bx.x + x1, bx.y + y1, { steps: 4 }); await p.mouse.up(); await p.waitForTimeout(250); };
  await drawRect(250, 120, 330, 250); await drawRect(330, 150, 450, 175);
  await p.evaluate(() => document.getElementById('gwV153ClearSelection')?.click()); await p.waitForTimeout(1200);
  c = await S(); const painted = c.names[c.active];
  ok(await p.evaluate(() => { const s = Engine.sprites[Engine.activeSpriteIndex], x = s.costumes[s.activeCostume]; return x.dataFormat === 'svg' && (x.svg.match(/<rect/g) || []).length >= 2; }), 'drew a 2-shape vector costume: ' + painted);
  await p.evaluate(() => GW_ANIM.open()); await p.waitForTimeout(800);
  await p.evaluate(() => document.getElementById('gw18New').click()); await p.waitForTimeout(800);
  r = await p.evaluate(() => ({ costume: GW_ANIM.state.anim.costume, parts: GW_ANIM.state.parts.length, mode: GW_ANIM.state.mode }));
  ok(r.costume === painted && r.parts >= 2 && r.mode === 'rig', 'new animation uses the drawn costume and finds its shapes ' + JSON.stringify(r));
  // add one bone along the arm (drag in the view), attach automatically, pose frame 2
  const toScr = async (ux, uy) => p.evaluate(([ux, uy]) => { const v = document.getElementById('gw18Svg'); const pt = new DOMPoint(ux, uy).matrixTransform(v.getScreenCTM()); return { x: pt.x, y: pt.y }; }, [ux, uy]);
  const art = await p.evaluate(() => { const v = document.getElementById('gw18Svg'); const els = [...v.querySelectorAll('[data-gw18-part]')]; const m = v.getScreenCTM().inverse(); return els.map(e => { const r = e.getBoundingClientRect(); const a = new DOMPoint(r.left, r.top).matrixTransform(m), z = new DOMPoint(r.right, r.bottom).matrixTransform(m); return { x0: a.x, y0: a.y, x1: z.x, y1: z.y }; }); });
  const arm = art.reduce((A, B) => ((B.x1 - B.x0) / Math.max(1, B.y1 - B.y0) > (A.x1 - A.x0) / Math.max(1, A.y1 - A.y0) ? B : A));
  const ay = (arm.y0 + arm.y1) / 2, A = await toScr(arm.x0 + 1, ay), Bp = await toScr(arm.x1 - 1, ay);
  await p.mouse.move(A.x, A.y); await p.mouse.down(); await p.mouse.move((A.x + Bp.x) / 2, A.y, { steps: 5 }); await p.mouse.move(Bp.x, Bp.y, { steps: 5 }); await p.mouse.up(); await p.waitForTimeout(300);
  await p.evaluate(() => document.getElementById('gw18Auto').click()); await p.waitForTimeout(300);
  r = await p.evaluate(() => ({ bones: GW_ANIM.state.anim.bones.length, attached: Object.keys(GW_ANIM.state.anim.parts).length }));
  ok(r.bones === 1 && r.attached >= 1, 'added a bone and attached shapes automatically ' + JSON.stringify(r));
  await p.evaluate(() => document.getElementById('gw18AddFrame').click()); await p.waitForTimeout(300);
  const end = await p.evaluate(() => { const b = GW_ANIM.state.anim.bones[0], s = GW_ANIM.solve(GW_ANIM.state.anim, GW_ANIM.state.anim.frames[GW_ANIM.state.frame]).get(b.id); return { jx: s.jx, jy: s.jy, ex: s.ex, ey: s.ey }; });
  const E1 = await toScr(end.ex, end.ey), E2 = await toScr(end.jx + (end.ex - end.jx) * 0.6, end.jy - (end.ex - end.jx) * 0.8);
  await p.mouse.move(E1.x, E1.y); await p.mouse.down(); await p.mouse.move(E2.x, E2.y, { steps: 6 }); await p.mouse.up(); await p.waitForTimeout(300);
  r = await p.evaluate(() => { const a = GW_ANIM.state.anim, id = a.bones[0].id; return { f: a.frames.length, a1: a.frames[1].angles[id], a0: a.frames[0].angles[id] ?? a.bones[0].angle }; });
  ok(r.f === 2 && Math.abs((r.a1 ?? r.a0) - r.a0) > 20, 'frame 2: dragging the bone end turns it ' + JSON.stringify(r));
  await shot('2-rig');
  await p.evaluate(() => [...document.querySelectorAll('#gw18Anim button')].find(x => /Make costumes/.test(x.textContent)).click()); await p.waitForTimeout(1200);
  r = await p.evaluate(() => { const s = Engine.sprites[Engine.activeSpriteIndex], a = GW_ANIM.state.anim, m = s.costumes.filter(x => x.gwAnimFrame?.anim === a.id); return { n: m.length, differ: m.length === 2 && m[0].svg !== m[1].svg, moved: /matrix\(/.test(m[1]?.svg || '') }; });
  ok(r.n === 2 && r.differ && r.moved, 'the drawn costume becomes 2 animation frames, the arm turned in frame 2 ' + JSON.stringify(r));
  await p.evaluate(() => GW_ANIM.close()); await p.waitForTimeout(700);

  /* ---------- C. Flipbook: onion skin + Play ---------- */
  ok(await p.evaluate(() => !!document.getElementById('gwpeOnion') && !!document.getElementById('gwCosPlayBtn')), 'Onion skin button + Play button are there');
  // pick "run 3" so there is a costume before it
  await p.evaluate(() => { const s = Engine.sprites[Engine.activeSpriteIndex]; const i = s.costumes.findIndex(c => c.name === 'run 3'); [...document.querySelectorAll('.gw7-cos-item')][i]?.click(); }); await p.waitForTimeout(900);
  await p.evaluate(() => document.getElementById('gwpeOnion').click()); await p.waitForTimeout(900);
  r = await p.evaluate(() => { const v = document.getElementById('gwVectorCanvasV15'); return { on: GW_FLIPBOOK.settings.onion, bar: !!document.getElementById('gwOnionBar'), bg: v.style.getPropertyValue('background-image').slice(0, 60), cur: Engine.sprites[Engine.activeSpriteIndex].costumes[Engine.sprites[Engine.activeSpriteIndex].activeCostume].name }; });
  ok(r.on && r.bar && /^url\("blob:/.test(r.bg) && r.cur === 'run 3', 'onion skin shows the costume before behind the drawing ' + JSON.stringify(r));
  // the onion pixels really show: compare the editor with onion on vs off
  const px = async () => p.evaluate(async () => { const v = document.getElementById('gwVectorCanvasV15'), r = v.getBoundingClientRect(); return [r.x, r.y, r.width, r.height]; });
  const area = await px(); const clip = { x: area[0], y: area[1], width: area[2], height: area[3] };
  const imgOn = await p.screenshot({ clip }); await shot('3-onion');
  await p.evaluate(() => { GW_FLIPBOOK.settings.before = 0; GW_FLIPBOOK.renderOnion(); }); await p.waitForTimeout(600);
  const imgOff = await p.screenshot({ clip });
  ok(Buffer.compare(imgOn, imgOff) !== 0, 'onion skin pixels appear in the editor (before=1 vs before=0 differ)');
  await p.evaluate(() => { GW_FLIPBOOK.settings.before = 1; GW_FLIPBOOK.settings.after = 1; GW_FLIPBOOK.renderOnion(); }); await p.waitForTimeout(600);
  // saving while the onion skin is on never puts it in the costume
  await p.evaluate(() => { try { GW_V15_COSTUME_EDITOR.save(true); } catch {} }); await p.waitForTimeout(500);
  ok(await p.evaluate(() => Engine.sprites[Engine.activeSpriteIndex].costumes.every(c => !/blob:|gwOnion/.test(c.svg || ''))), 'onion skin is never saved into a costume');
  // bitmap mode shows it too
  await p.evaluate(() => GW_V15_COSTUME_EDITOR.setMode('bitmap')); await p.waitForTimeout(700);
  ok(await p.evaluate(() => /^url\("blob:/.test(document.getElementById('gwBitmapCanvasV15').style.getPropertyValue('background-image'))), 'onion skin works in Bitmap mode too');
  await p.evaluate(() => GW_V15_COSTUME_EDITOR.setMode('vector')); await p.waitForTimeout(400);
  await p.evaluate(() => document.getElementById('gwpeOnion').click()); await p.waitForTimeout(500);
  r = await p.evaluate(() => ({ on: GW_FLIPBOOK.settings.onion, bar: !!document.getElementById('gwOnionBar'), bg: document.getElementById('gwVectorCanvasV15').style.getPropertyValue('background-image') }));
  ok(!r.on && !r.bar && !r.bg, 'onion skin off: editor back to normal ' + JSON.stringify(r));
  // Play
  await p.evaluate(() => document.getElementById('gwCosPlayBtn').click()); await p.waitForTimeout(250);
  const seen = await p.evaluate(async () => { const out = new Set(); for (let i = 0; i < 20; i++) { await new Promise(r => setTimeout(r, 70)); out.add(document.getElementById('gwFlipInfo')?.textContent); } return [...out]; });
  ok(seen.length >= 5 && !!(await p.evaluate(() => GW_FLIPBOOK.state.timer)), 'Play flips through the costumes: ' + seen.slice(0, 4).join(' | '));
  await shot('4-flipbook');
  await p.evaluate(() => { const i = document.querySelectorAll('#gwFlipbook input[type=number]'); i[1].value = '2'; i[1].dispatchEvent(new Event('change')); i[2].value = '4'; i[2].dispatchEvent(new Event('change')); }); await p.waitForTimeout(500);
  r = await p.evaluate(() => GW_FLIPBOOK.state.frames.map(f => f.n));
  ok(r.join() === '2,3,4', 'pick which costumes to play (2 to 4): ' + r.join());
  await p.evaluate(() => document.getElementById('gwCosPlayBtn').click()); await p.waitForTimeout(200);
  ok(await p.evaluate(() => !document.getElementById('gwFlipbook') && !GW_FLIPBOOK.state.timer), 'Play again closes the player');
  ok(!errs.length, 'no page errors ' + errs.slice(0, 3).join(' | '));
  await b.close(); console.log(fails ? fails + ' FAILED' : 'ALL PASS'); process.exit(fails ? 1 : 0); })();
