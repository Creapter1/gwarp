// v15.17.0 test: the G mascot (preview, Developer mode)
const { chromium } = require('playwright'); const { prep } = require('./harness'); const path = require('path');
const FILE = path.resolve(process.argv[2]), SHOTS = process.argv[3] || '';
const res = []; const ok = (n, p, i = '') => res.push([n, !!p, String(i).slice(0, 400)]);
(async () => {
  const b = await chromium.launch({ args: ['--no-sandbox'] }); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await prep(p, {}); await p.goto('file://' + FILE); await p.waitForTimeout(3600);
  const shown = () => p.evaluate(() => { const x = document.getElementById('gw20MascotBtn'); return x ? getComputedStyle(x).display !== 'none' : null; });
  await p.evaluate(() => window.GW_DEV_MODE.set(false)); await p.waitForTimeout(150);
  ok('the “G mascot” button is hidden for normal users', (await shown()) === false);
  await p.evaluate(() => window.GW_DEV_MODE.set(true)); await p.waitForTimeout(150);
  ok('Developer mode shows it next to “Add Sprite”', (await shown()) === true);
  await p.evaluate(() => document.getElementById('gw20MascotBtn').click()); await p.waitForTimeout(2500);
  const m = await p.evaluate(() => { const s = Engine.sprites[Engine.activeSpriteIndex]; return { name: s.name, n: Engine.sprites.length, costumes: s.costumes.map(c => c.name), fmt: s.costumes.every(c => c.dataFormat === 'svg' && c.svg), anims: (s.gwAnimations || []).map(a => a.name + ':' + a.frames.length + ':' + a.bones.length), sound: s.sounds?.[0] ? { name: s.sounds[0].name, d: +s.sounds[0].duration.toFixed(2), wav: /^data:audio\/wav/.test(s.sounds[0].dataUrl) } : null, active: s.costumes[s.activeCostume].name }; });
  ok('adds sprite “G”: the G costume + walk 1–8 + wave 1–8 (all vectors), showing “G”', m.name === 'G' && m.costumes.length === 17 && m.costumes[0] === 'G' && m.costumes[1] === 'walk//frame 1' && m.costumes[9] === 'wave//frame 1' && m.costumes[16] === 'wave//frame 8' && m.fmt && m.active === 'G', JSON.stringify(m));
  ok('two animations with 5 bones each: walk (8 frames), wave (8 frames)', m.anims.join() === 'walk:8:5,wave:8:5', JSON.stringify(m.anims));
  ok('a “hello” sound (made by G-Warp’s synth, about 0.7 s)', m.sound?.name === 'hello' && m.sound.wav && m.sound.d > 0.6 && m.sound.d < 0.8, JSON.stringify(m.sound));
  // the bones sit on the drawing: shoulders, hips; waving raises the right hand above the shoulder
  const g = await p.evaluate(() => { const s = Engine.sprites[Engine.activeSpriteIndex], A = window.GW_ANIM; const w = s.gwAnimations[1]; const rest = A.solve(w, null), up = A.solve(w, w.frames[2]); const r = id => [Math.round(rest.get(id).jx), Math.round(rest.get(id).jy), Math.round(rest.get(id).ex), Math.round(rest.get(id).ey)]; return { armL: r('armL'), armR: r('armR'), legL: r('legL'), handUpY: Math.round(up.get('armR').ey), shoulderY: Math.round(up.get('armR').jy) }; });
  ok('bones sit on the drawing (shoulders 31,52 / 89,52 → hands; hips → feet); waving lifts the right hand', JSON.stringify(g.armL) === '[31,52,14,64]' && JSON.stringify(g.armR) === '[89,52,106,64]' && g.legL[0] === 48 && g.legL[1] === 78 && g.handUpY < g.shoulderY - 5, JSON.stringify(g));
  // the frames really differ
  const diff = await p.evaluate(() => { const s = Engine.sprites[Engine.activeSpriteIndex]; const get = n => s.costumes.find(c => c.name === n).svg; return [get('walk//frame 1') !== get('walk//frame 3'), get('wave//frame 1') !== get('wave//frame 3'), /matrix\(/.test(get('walk//frame 3'))]; });
  ok('walk and wave frames are different poses', diff.every(Boolean), JSON.stringify(diff));
  // play it with the blocks
  await p.evaluate(() => { Engine.isRunning = true; const s = Engine.sprites[Engine.activeSpriteIndex]; GW.__ctxSprite = s; window.GW_ANIM_BLOCKS.start(s, 'walk', 1, true); GW.__ctxSprite = null; });
  const seen = await p.evaluate(async () => { const s = Engine.sprites[Engine.activeSpriteIndex], set = new Set(); for (let i = 0; i < 20; i++) { set.add(s.costumes[s.activeCostume].name); await new Promise(r => setTimeout(r, 70)); } window.GW_ANIM_BLOCKS.stop(s); Engine.isRunning = false; return [...set]; });
  ok('“play animation walk over and over” steps through the walk costumes', seen.length >= 6 && seen.every(n => /^walk\/\/frame \d$/.test(n)), JSON.stringify(seen));
  if (SHOTS) {
    await p.evaluate(() => { const s = Engine.sprites[Engine.activeSpriteIndex]; const pick = ['G', 'walk//frame 1', 'walk//frame 3', 'walk//frame 5', 'walk//frame 7', 'wave//frame 1', 'wave//frame 3', 'wave//frame 7']; const wrap = document.createElement('div'); wrap.id = 'gwShotSheet'; wrap.style.cssText = 'position:fixed;left:0;top:0;z-index:99999;display:flex;gap:10px;padding:14px;background:#0b1220;color:#c4b5fd;font:700 12px sans-serif'; pick.forEach(n => { const c = s.costumes.find(x => x.name === n); const d = document.createElement('div'); d.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:4px;background:#fff;border-radius:10px;padding:6px'; const im = new Image(); im.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(c.svg); im.style.cssText = 'width:132px;height:121px'; const t = document.createElement('span'); t.textContent = n; t.style.color = '#334155'; d.append(im, t); wrap.appendChild(d); }); document.body.appendChild(wrap); });
    await p.waitForTimeout(500); await (await p.$('#gwShotSheet')).screenshot({ path: SHOTS + '-frames.png' });
    await p.evaluate(() => document.getElementById('gwShotSheet').remove());
    await p.evaluate(() => document.getElementById('gw18AnimBtn').click()); await p.waitForTimeout(600); await p.evaluate(() => { const st = window.GW_ANIM.state; const w = st.s.gwAnimations.find(a => a.name === 'wave'); document.getElementById('gw18AnimSel').value = w.id; document.getElementById('gw18AnimSel').dispatchEvent(new Event('change')); }); await p.waitForTimeout(300);
    await p.evaluate(() => document.querySelectorAll('#gw18Frames .gw18-frame')[2]?.click()); await p.waitForTimeout(500); await p.screenshot({ path: SHOTS + '-editor.png' });
    await p.evaluate(() => document.querySelector('#gw18Anim .gw18-x').click());
  }
  // saving keeps it all
  const rt = await p.evaluate(async () => { const data = window.GW_PROJECT_DATA(); await GW.loadProject(new File([JSON.stringify(data)], 'p.gwarp.json', { type: 'application/json' })); await new Promise(r => setTimeout(r, 1500)); const s = Engine.sprites.find(x => x.name === 'G'); return s ? { anims: s.gwAnimations?.length, costumes: s.costumes.length, svg: s.costumes.every(c => !!c.svg), sound: s.sounds?.[0]?.name } : null; });
  ok('saving and opening again keeps the mascot (2 animations, 17 vector costumes, hello)', rt && rt.anims === 2 && rt.costumes === 17 && rt.svg && rt.sound === 'hello', JSON.stringify(rt));
  ok('the mascot is listed as an incomplete feature', await p.evaluate(() => window.GW_FEATURES?.mascot?.status === 'incomplete'));
  ok('no page errors', !errs.length, errs.join(' | '));
  res.forEach(([n, pass, i]) => console.log((pass ? 'PASS ' : 'FAIL ') + n + (pass ? '' : '  → ' + i))); console.log(`mascot: ${res.filter(r => r[1]).length}/${res.length} pass`); await b.close();
})();
