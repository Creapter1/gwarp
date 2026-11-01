// Open a .sb3 in G-Warp and save it again, then compare: does G-Warp keep everything?
//   node roundtrip.js game.sb3 [out.sb3] [path/to/app.html]
// Prints every script / costume / sound / comment difference. Differences = G-Warp import/export bugs (report them).
const { openApp, openProject, saveSb3 } = require('./lib/gw'); const { readSb3, scriptsText } = require('./lib/sb3');
(async () => {
  const [src, out = src.replace(/\.sb3$/i, '') + '.roundtrip.sb3', app] = process.argv.slice(2);
  const { browser, page, errors } = await openApp(app); await openProject(page, src); const n = await saveSb3(page, out); await browser.close();
  const A = (await readSb3(src)).pj, B = (await readSb3(out)).pj; let diffs = 0; const d = m => { diffs++; console.log('DIFF ' + m); };
  for (const ta of A.targets) {
    const tb = B.targets.find(t => t.name === ta.name); if (!tb) { d(`sprite "${ta.name}" missing`); continue; }
    ta.costumes.forEach((c, i) => { const c2 = tb.costumes[i]; if (!c2) return d(`${ta.name}: costume "${c.name}" missing`);
      if (c.name !== c2.name) d(`${ta.name}: costume ${i + 1} name ${c.name} -> ${c2.name}`);
      if (c.dataFormat !== c2.dataFormat) d(`${ta.name}: costume "${c.name}" ${c.dataFormat} -> ${c2.dataFormat}`);
      if (Math.abs(c.rotationCenterX - c2.rotationCenterX) > 0.5 || Math.abs(c.rotationCenterY - c2.rotationCenterY) > 0.5) d(`${ta.name}: costume "${c.name}" centre ${c.rotationCenterX},${c.rotationCenterY} -> ${c2.rotationCenterX},${c2.rotationCenterY}`); });
    if (ta.sounds.length !== tb.sounds.length) d(`${ta.name}: sounds ${ta.sounds.length} -> ${tb.sounds.length}`);
    if (Object.keys(ta.comments || {}).length !== Object.keys(tb.comments || {}).length) d(`${ta.name}: comments ${Object.keys(ta.comments || {}).length} -> ${Object.keys(tb.comments || {}).length}`);
  }
  const norm = t => t.replace(/["']/g, '').replace(/EFFECT=\[(\w+)\]/g, (m, e) => `EFFECT=[${e.toLowerCase()}]`).split('\n');
  const sa = norm(scriptsText(A)), sb = norm(scriptsText(B)); const setB = new Set(sb), setA = new Set(sa);
  sa.filter(l => !setB.has(l)).slice(0, 40).forEach(l => d('lost/changed: ' + l.trim().slice(0, 220)));
  sb.filter(l => !setA.has(l)).slice(0, 40).forEach(l => d('new/changed:  ' + l.trim().slice(0, 220)));
  console.log(`saved ${n} bytes -> ${out}; page errors: ${errors.length ? errors.join(' | ') : 'none'}`);
  console.log(diffs ? `${diffs} difference(s) - every one is a G-Warp import/export bug unless explained` : 'NO DIFFERENCES - G-Warp kept the whole project');
  process.exit(diffs || errors.length ? 1 : 0);
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
