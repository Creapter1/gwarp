// v15.16.2 test: Animation preview (Developer mode only) + vector costumes survive saving
const { chromium } = require('playwright'); const { prep } = require('./harness'); const path = require('path');
const FILE = path.resolve(process.argv[2]), SHOTS = process.argv[3] || '';
const res = []; const ok = (n, p, i = '') => res.push([n, !!p, String(i).slice(0, 400)]);
const SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><g transform="translate(5,5)"><g fill-rule="nonzero">'
  + '<rect id="body" x="45" y="20" width="20" height="50" fill="#7c3aed"/><rect id="arm" x="65" y="25" width="30" height="8" fill="#f59e0b"/><circle id="head" cx="55" cy="12" r="8" fill="#22c55e"/></g></g></svg>';
(async () => {
  const b = await chromium.launch({ args: ['--no-sandbox'] }); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await prep(p, {}); await p.goto('file://' + FILE); await p.waitForTimeout(3600);
  // a vector costume like an imported Scratch one
  await p.evaluate(async svg => {
    const im = await new Promise(r => { const x = new Image(); x.onload = () => r(x); x.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg); });
    const cv = document.createElement('canvas'); cv.width = 240; cv.height = 240; cv.getContext('2d').drawImage(im, 0, 0, 240, 240);
    const s = Engine.sprites[0]; s.costumes.push({ name: 'robot', canvas: cv, rc: { x: 60, y: 60 }, res: 2, natural: true, dataFormat: 'svg', svg }); s.activeCostume = s.costumes.length - 1;
    window.GW_DEV_MODE.set(false);
  }, SVG);
  const shown = () => p.evaluate(() => { const btn = document.getElementById('gw18AnimBtn'); return btn ? getComputedStyle(btn).display !== 'none' : null; });
  ok('version 15.16.2; the Animation button is hidden for normal users', /^15\.1[6-9]\./.test(await p.evaluate(() => window.GW_BUILD.version)) && (await shown()) === false);
  await p.evaluate(() => window.GW_DEV_MODE.set(true)); await p.waitForTimeout(200);
  ok('Developer mode shows the “Animation” button on the Costumes tab', (await shown()) === true);
  await p.evaluate(() => document.getElementById('gw18AnimBtn').click()); await p.waitForTimeout(600);
  const o = await p.evaluate(() => ({ open: !!document.getElementById('gw18Anim'), parts: window.GW_ANIM.state.parts, anim: window.GW_ANIM.state.anim?.name, cost: window.GW_ANIM.state.anim?.costume }));
  ok('opens on the vector costume; finds its 3 shapes inside the wrapper groups', o.open && o.cost === 'robot' && o.parts.join() === '0/0/0,0/0/1,0/0/2', JSON.stringify(o));
  const cp = (x, y) => p.evaluate(([x, y]) => { const m = document.getElementById('gw18Svg').getScreenCTM(); const q = new DOMPoint(x, y).matrixTransform(m); return [q.x, q.y]; }, [x, y]);
  const drag = async (a, z) => { const A = await cp(...a), B = await cp(...z); await p.mouse.move(A[0], A[1]); await p.mouse.down(); for (let i = 1; i <= 8; i++) await p.mouse.move(A[0] + (B[0] - A[0]) * i / 8, A[1] + (B[1] - A[1]) * i / 8); await p.mouse.up(); await p.waitForTimeout(80); };
  const click = async (x, y) => { const A = await cp(x, y); await p.mouse.click(A[0], A[1]); await p.waitForTimeout(80); };
  // Rig: torso (base at the hips, up to the neck) and an arm hanging from the neck end
  await drag([60, 75], [60, 25]);
  await drag([60, 25], [100, 34]);
  const bones = await p.evaluate(() => window.GW_ANIM.state.anim.bones.map(b => ({ parent: b.parent ? 'yes' : null, at: b.at, len: Math.round(b.len), angle: Math.round(b.angle), x: b.x, y: b.y })));
  ok('Add bones: a figure base + a child bone from its end (Pivot-style joints)', bones.length === 2 && bones[0].parent === null && Math.abs(bones[0].len - 50) <= 1 && Math.abs(bones[0].angle + 90) <= 1 && bones[1].parent === 'yes' && bones[1].at === 'end' && Math.abs(bones[1].len - 41) <= 1, JSON.stringify(bones));
  // Attach shapes
  await p.evaluate(() => [...document.querySelectorAll('#gw18Anim [data-tool="attach"]')][0].click());
  await p.evaluate(() => { const st = window.GW_ANIM.state; st.bone = st.anim.bones[0].id; });
  await click(53, 60); await click(60, 13);
  await p.evaluate(() => { const st = window.GW_ANIM.state; st.bone = st.anim.bones[1].id; });
  await click(88, 36);
  const parts = await p.evaluate(() => { const st = window.GW_ANIM.state, a = st.anim; return [a.parts['0/0/0'] === a.bones[0].id, a.parts['0/0/2'] === a.bones[0].id, a.parts['0/0/1'] === a.bones[1].id]; });
  ok('Attach: body + head move with the torso, the arm with the arm bone', parts.every(Boolean), JSON.stringify(parts));
  if (SHOTS) await p.screenshot({ path: SHOTS + '-rig.png' });
  // Animate: frame 2, turn the arm 90° down
  await p.evaluate(() => document.getElementById('gw18AddFrame').click()); await p.waitForTimeout(200);
  const jt = [60, 25], a0 = Math.atan2(9, 40), L = Math.hypot(40, 9), endNow = [60 + 40, 25 + 9], tgt = [jt[0] + L * Math.cos(a0 + Math.PI / 2), jt[1] + L * Math.sin(a0 + Math.PI / 2)];
  await drag(endNow, tgt);
  const map = (id, x, y) => p.evaluate(([id, x, y]) => { const v = document.getElementById('gw18Svg'), el = v.querySelector('#' + id); const m = v.getScreenCTM().inverse().multiply(el.getScreenCTM()); const q = new DOMPoint(x, y).matrixTransform(m); return [Math.round(q.x * 10) / 10, Math.round(q.y * 10) / 10]; }, [id, x, y]);
  const armTip = await map('arm', 95, 25), bodyCorner = await map('body', 45, 20);
  ok('Pose: the arm turns 90° around its joint (tip (100,30) → (55,65)), the body stays', Math.abs(armTip[0] - 55) <= 1.5 && Math.abs(armTip[1] - 65) <= 1.5 && Math.abs(bodyCorner[0] - 50) <= 0.5 && Math.abs(bodyCorner[1] - 25) <= 0.5, JSON.stringify({ armTip, bodyCorner }));
  // move the whole figure by its orange base
  await drag([60, 75], [80, 75]);
  const head = await map('head', 55, 12), tip2 = await map('arm', 95, 25);
  ok('Dragging the orange base moves the whole figure (+20 x), arm keeps its pose', Math.abs(head[0] - 80) <= 1 && Math.abs(head[1] - 17) <= 1 && Math.abs(tip2[0] - 75) <= 1.5 && Math.abs(tip2[1] - 65) <= 1.5, JSON.stringify({ head, tip2 }));
  const f = await p.evaluate(() => ({ frames: window.GW_ANIM.state.anim.frames.length, strip: document.querySelectorAll('#gw18Frames .gw18-frame').length, sel: window.GW_ANIM.state.frame }));
  ok('Bottom bar has + Frame, move, delete, Play, FPS and Onion skin', await p.evaluate(() => ['gw18AddFrame', 'gw18Play', 'gw18Fps', 'gw18OnionOn'].every(id => !!document.getElementById(id)?.offsetParent)));
  ok('Frame strip: 2 frames, frame 2 selected', f.frames === 2 && f.strip === 2 && f.sel === 1, JSON.stringify(f));
  // frame 1 is still the rest pose
  await p.evaluate(() => document.querySelectorAll('#gw18Frames .gw18-frame')[0].click()); await p.waitForTimeout(150);
  const rest = await map('arm', 95, 25);
  ok('Frame 1 keeps its own pose (arm straight)', Math.abs(rest[0] - 100) <= 0.5 && Math.abs(rest[1] - 30) <= 0.5, JSON.stringify(rest));
  await p.waitForTimeout(300);
  if (SHOTS) { await p.evaluate(() => document.querySelectorAll('#gw18Frames .gw18-frame')[1].click()); await p.waitForTimeout(400); await p.screenshot({ path: SHOTS + '-animate.png' }); }
  // play
  await p.evaluate(() => document.getElementById('gw18Play').click()); await p.waitForTimeout(700);
  const seen = await p.evaluate(async () => { const s = new Set(); for (let i = 0; i < 12; i++) { s.add(window.GW_ANIM.state.frame); await new Promise(r => setTimeout(r, 60)); } document.getElementById('gw18Play').click(); return s.size; });
  ok('Play shows the frames one after another', seen === 2, seen);
  // auto attach
  const auto = await p.evaluate(() => { const st = window.GW_ANIM.state; st.mode = 'rig'; const keep = { ...st.anim.parts }; st.anim.parts = {}; document.getElementById('gw18Auto').click(); const got = { ...st.anim.parts }; const armOk = got['0/0/1'] === st.anim.bones[1].id, bodyOk = got['0/0/0'] === st.anim.bones[0].id; st.anim.parts = keep; return { armOk, bodyOk, n: Object.keys(got).length }; });
  ok('“Attach automatically” picks the nearest bone (body → torso, arm → arm)', auto.armOk && auto.bodyOk && auto.n === 3, JSON.stringify(auto));
  // make costumes
  await p.evaluate(() => document.getElementById('gw18Make').click()); await p.waitForTimeout(800);
  const made = await p.evaluate(() => { const s = Engine.sprites[0]; return s.costumes.filter(c => /^animation 1\/\/frame \d$/.test(c.name)).map(c => ({ n: c.name, fmt: c.dataFormat, m: /matrix\(/.test(c.svg), w: c.canvas.width, rc: c.rc })); });
  ok('Make costumes: one vector costume per frame, in order', made.length === 2 && made[0].n === 'animation 1//frame 1' && made[1].n === 'animation 1//frame 2' && made.every(c => c.fmt === 'svg' && c.w > 10 && c.rc.x === 60) && !made[0].m && made[1].m, JSON.stringify(made));
  // .sb3 export keeps them as vectors
  const sb3 = await p.evaluate(async () => { const r = await window.GW_FILES.buildSb3(); const z = await JSZip.loadAsync(await r.blob.arrayBuffer()); const j = JSON.parse(await z.file('project.json').async('string')); const t = j.targets.find(t => !t.isStage && t.costumes.some(c => c.name === 'animation 1//frame 2')); return t ? t.costumes.filter(c => /^animation 1|robot/.test(c.name)).map(c => c.name + ':' + c.dataFormat) : null; });
  ok('.sb3: the frame costumes are saved as vectors, in order (Scratch/TurboWarp)', JSON.stringify(sb3) === JSON.stringify(['robot:svg', 'animation 1//frame 1:svg', 'animation 1//frame 2:svg']), JSON.stringify(sb3));
  await p.evaluate(() => document.querySelector('#gw18Anim .gw18-x').click()); await p.waitForTimeout(200);
  // save + open again: animations and vector data come back
  const rt = await p.evaluate(async () => {
    const data = window.GW_PROJECT_DATA(); const sp = data.sprites[0];
    const saved = { anims: sp.gwAnimations?.length, svg: !!sp.costumes.find(c => c.name === 'robot')?.svg };
    await GW.loadProject(new File([JSON.stringify(data)], 'p.gwarp.json', { type: 'application/json' })); await new Promise(r => setTimeout(r, 1200));
    const s = Engine.sprites[0], c = s.costumes.find(c => c.name === 'robot'), f2 = s.costumes.find(c => c.name === 'animation 1//frame 2');
    return { saved, anims: s.gwAnimations?.length, bones: s.gwAnimations?.[0]?.bones?.length, frames: s.gwAnimations?.[0]?.frames?.length, svg: !!c?.svg, fmt: c?.dataFormat, f2: !!f2?.svg };
  });
  ok('Saving and opening again keeps the animation (2 bones, 2 frames) and the vector data', rt.saved.anims === 1 && rt.saved.svg && rt.anims === 1 && rt.bones === 2 && rt.frames === 2 && rt.svg && rt.fmt === 'svg' && rt.f2, JSON.stringify(rt));
  await p.evaluate(() => window.GW_DEV_MODE.set(false)); await p.waitForTimeout(150);
  ok('Developer mode off hides the button again', (await shown()) === false);
  const rep = await p.evaluate(() => window.GW_AI_REPORT.text());
  ok('AI Report: preview + saving fix signed (v15.16.2, Claude)', /Animation tab, PREVIEW[^\n]*\(v15\.16\.2, Claude\)/.test(rep) && /Saving \(found while building[^\n]*\(v15\.16\.2, Claude\)/.test(rep));
  ok('no page errors', !errs.length, errs.join(' | '));
  res.forEach(([n, pass, i]) => console.log((pass ? 'PASS ' : 'FAIL ') + n + (pass ? '' : '  → ' + i))); console.log(`anim: ${res.filter(r => r[1]).length}/${res.length} pass`); await b.close();
})();
