// Differential test: runs the same .sb3 in the real Scratch engine and in G-Warp, then compares every stage variable
// and each sprite's x / y / direction / size / costume.  Usage: node diff.js project.sb3 [ms] [gwarp app.html]
const { chromium } = require('/opt/npm-tools/node_modules/playwright');
const ref = require('./ref.js');
async function gwarp(app, sb3, ms) {
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); const errs = [];
  p.on('pageerror', e => errs.push(e.message.slice(0, 200))); p.on('dialog', d => d.dismiss());
  await p.goto('file://' + app); await p.waitForTimeout(3500);
  await p.setInputFiles('#sb3ImportFile', sb3); await p.waitForTimeout(3000);
  await p.click('#greenFlagBtn'); await p.waitForTimeout(ms);
  const out = await p.evaluate(() => ({ vars: { ...window.Engine.variables },
    sprites: window.Engine.sprites.filter(s => !s.isClone && !s.isStage && !s.stageProxy).map(s => ({ name: s.name, x: s.x, y: s.y, direction: s.direction, size: s.size, costume: (s.activeCostume || 0) + 1, visible: s.visible !== false })) }));
  out.errs = errs; await b.close(); return out;
}
const norm = v => { if (typeof v === 'number') return String(Math.round(v * 1e6) / 1e6); if (typeof v === 'boolean') return String(v); const n = Number(v); return (String(v).trim() !== '' && Number.isFinite(n)) ? String(Math.round(n * 1e6) / 1e6) : String(v); };
module.exports = async function (sb3, ms, app) {
  const [r, g] = await Promise.all([ref(sb3, ms), gwarp(app, sb3, ms)]); const bad = []; let n = 0;
  for (const k of Object.keys(r.vars)) { if (Array.isArray(r.vars[k]) || (r.vars[k] === k && g.vars[k] === undefined)) continue; n++; if (norm(r.vars[k]) !== norm(g.vars[k])) bad.push(`${k}: Scratch ${JSON.stringify(r.vars[k])}  G-Warp ${JSON.stringify(g.vars[k])}`); }
  for (const s of r.sprites) { const t = g.sprites.find(x => x.name === s.name); if (!t) { bad.push(`sprite ${s.name} missing in G-Warp`); continue; }
    for (const k of ['x', 'y', 'direction', 'size', 'costume', 'visible']) { n++; if (norm(s[k]) !== norm(t[k])) bad.push(`${s.name}.${k}: Scratch ${s[k]}  G-Warp ${t[k]}`); } }
  return { checks: n, bad, refErrs: r.errs, gwErrs: g.errs };
};
if (require.main === module) module.exports(process.argv[2], +process.argv[3] || 4000, process.argv[4] || '/home/claude/rel/app.html').then(o => { console.log(`${o.checks - o.bad.length} / ${o.checks} same as Scratch`); if (o.bad.length) console.log(o.bad.join('\n')); if (o.refErrs.length || o.gwErrs.length) console.log('errors', o.refErrs, o.gwErrs); });
