// Runs Grok's GA1 fixtures (grok/ANIM-FIXTURES.json) in G-Warp for real: one sprite per fixture, built as a
// Scratch 3 .sb3, loaded through Ctrl+O, green flag, then each sprite's costume / say is compared with Grok's
// expected result. Numbers are passed as real numbers with (n + 0), strings with join(s, "") like in Scratch.
// Run: NODE_PATH=<playwright+jszip> node test_grok_anim.js ../../app.html ../../grok/ANIM-FIXTURES.json
const { chromium } = require('playwright'); const { prep } = require('./harness'); const path = require('path'); const fs = require('fs'); const JSZip = require('jszip'); const crypto = require('crypto');
const [file, fx] = process.argv.slice(2);
const F = JSON.parse(fs.readFileSync(fx, 'utf8')).fixtures;
let n = 0; const id = () => 'b' + (++n);
function costumeSvg(i) { return `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><rect x="2" y="2" width="36" height="36" rx="6" fill="hsl(${i * 70},70%,55%)"/></svg>`; }
const assets = {};
function costume(name, i) { const s = costumeSvg(i), m = crypto.createHash('md5').update(s).digest('hex'); assets[m + '.svg'] = s; return { assetId: m, name, md5ext: m + '.svg', dataFormat: 'svg', rotationCenterX: 20, rotationCenterY: 20 }; }
function build(fix, k) {
  const B = {}; const add = (o, parent) => { const i = id(); B[i] = Object.assign({ next: null, parent: parent || null, inputs: {}, fields: {}, shadow: false, topLevel: false }, o); return i; };
  const valueInput = (v, parent) => { // a number stays a number, a string stays a string
    if (typeof v === 'number') { const r = add({ opcode: 'operator_add' }, parent); B[r].inputs = { NUM1: [1, [4, String(v)]], NUM2: [1, [4, '0']] }; return [3, r, [10, '']]; }
    if (v && typeof v === 'object' && v.type === 'costume_number') { const r = add({ opcode: 'looks_costumenumbername', fields: { NUMBER_NAME: ['number', null] } }, parent); return [3, r, [10, '']]; }
    if (v && typeof v === 'object' && v.type === 'costume_name') { const r = add({ opcode: 'looks_costumenumbername', fields: { NUMBER_NAME: ['name', null] } }, parent); return [3, r, [10, '']]; }
    const r = add({ opcode: 'operator_join' }, parent); B[r].inputs = { STRING1: [1, [10, String(v)]], STRING2: [1, [10, '']] }; return [3, r, [10, '']];
  };
  const stmt = (s, parent) => {
    if (s.type === 'next_costume') return add({ opcode: 'looks_nextcostume' }, parent);
    if (s.type === 'switch_costume') { const b = add({ opcode: 'looks_switchcostumeto' }, parent); const menu = add({ opcode: 'looks_costume', fields: { COSTUME: [fix.setup.costumes[0], null] }, shadow: true }, b); const vi = valueInput(s.costume, b); B[b].inputs = { COSTUME: [3, vi[1], menu] }; return b; }
    if (s.type === 'say') { const b = add({ opcode: 'looks_say' }, parent); B[b].inputs = { MESSAGE: valueInput(s.value, b) }; return b; }
    if (s.type === 'wait') { const b = add({ opcode: 'control_wait' }, parent); B[b].inputs = { DURATION: [1, [5, String(s.seconds)]] }; return b; }
    if (s.type === 'repeat') { const b = add({ opcode: 'control_repeat' }, parent); const first = chain(s.body, b); B[b].inputs = { TIMES: [1, [6, String(s.times)]], SUBSTACK: [2, first] }; return b; }
    throw new Error('unknown step ' + s.type);
  };
  const chain = (list, parent) => { let first = null, prev = null; for (const s of list) { const b = stmt(s, prev || parent); if (prev) B[prev].next = b; else first = b; prev = b; } return first; };
  const hat = add({ opcode: 'event_whenflagclicked', topLevel: true, x: 0, y: 0 });
  B[hat].next = chain(fix.blocks.stack, hat);
  return { isStage: false, name: fix.id, variables: {}, lists: {}, broadcasts: {}, blocks: B, comments: {}, currentCostume: (fix.setup.startCostumeNumber || 1) - 1,
    costumes: fix.setup.costumes.map((c, i) => costume(c, i)), sounds: [], volume: 100, layerOrder: k + 1, visible: true, x: -200 + (k % 10) * 44, y: 120 - Math.floor(k / 10) * 60, size: 100, direction: 90, draggable: false, rotationStyle: 'all around' };
}
(async () => {
  const stage = { isStage: true, name: 'Stage', variables: {}, lists: {}, broadcasts: {}, blocks: {}, comments: {}, currentCostume: 0, costumes: [costume('backdrop1', 9)], sounds: [], volume: 100, layerOrder: 0, tempo: 60, videoTransparency: 50, videoState: 'on', textToSpeechLanguage: null };
  const pj = { targets: [stage, ...F.map(build)], monitors: [], extensions: [], meta: { semver: '3.0.0', vm: '0.2.0', agent: 'G-Warp Grok GA1 runner' } };
  const z = new JSZip(); z.file('project.json', JSON.stringify(pj)); for (const [k, v] of Object.entries(assets)) z.file(k, v);
  const out = path.join(require('os').tmpdir(), 'grok-ga1.sb3'); fs.writeFileSync(out, await z.generateAsync({ type: 'nodebuffer' }));
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await prep(p); await p.addInitScript(() => { delete window.showOpenFilePicker; }); await p.goto('file://' + path.resolve(file)); await p.waitForTimeout(3500);
  const [fc] = await Promise.all([p.waitForEvent('filechooser'), p.evaluate(() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'o', ctrlKey: true, bubbles: true })))]);
  await fc.setFiles(out); await p.waitForFunction(n => Engine.sprites.filter(s => /^A\d+$/.test(s.name)).length >= n, F.length, { timeout: 30000 }); await p.waitForTimeout(1200); await p.keyboard.press('Escape');
  await p.evaluate(() => document.getElementById('greenFlagBtn').click()); await p.waitForTimeout(400);
  await p.evaluate(() => [...document.querySelectorAll('#gw15CloudAsk .gw8-dlg-foot button')].find(x => /this computer/.test(x.textContent))?.click()).catch(() => {});
  await p.waitForTimeout(2500);
  const got = await p.evaluate(() => Object.fromEntries(Engine.sprites.filter(s => /^A\d+$/.test(s.name)).map(s => [s.name, { n: s.activeCostume + 1, name: s.costumes[s.activeCostume]?.name, say: s.sayText }])));
  let fails = 0;
  for (const f of F) {
    const g = got[f.id] || {}, e = f.expect, bad = [];
    if (e.costumeNumber != null && g.n !== e.costumeNumber) bad.push(`costume # ${g.n} (want ${e.costumeNumber})`);
    if (e.costumeName != null && g.name !== e.costumeName) bad.push(`name "${g.name}" (want "${e.costumeName}")`);
    if (e.say != null && String(g.say) !== String(e.say)) bad.push(`say "${g.say}" (want "${e.say}")`);
    console.log((bad.length ? 'FAIL ' : 'PASS ') + f.id + ' ' + f.title + (bad.length ? ' -> ' + bad.join(', ') : ''));
    if (bad.length) fails++;
  }
  if (errs.length) { console.log('FAIL page errors: ' + errs.slice(0, 3).join(' | ')); fails++; }
  await b.close(); console.log(fails ? fails + ' FAILED' : 'ALL PASS'); process.exit(fails ? 1 : 0);
})();
