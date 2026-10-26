// Runs Grok's GR1 Scratch-parity fixtures (ai-team/archive/grok/fixtures.json) in G-Warp for real (CL3): every fixture becomes one
// sprite with its own variables / lists in a Scratch 3 .sb3, loaded with Ctrl+O, green flag, then the say bubble,
// variables and lists are compared with Grok's expected (Scratch 3) result.
// Run: NODE_PATH=<playwright+jszip> node test_grok_fixtures.js ../../app.html ../../ai-team/archive/grok/fixtures.json
const { chromium } = require('playwright'); const { prep } = require('./harness'); const path = require('path'); const fs = require('fs'); const JSZip = require('jszip'); const crypto = require('crypto');
const [file, fx] = process.argv.slice(2);
const F0 = (() => { const d = JSON.parse(fs.readFileSync(fx, 'utf8')); return Array.isArray(d) ? d : (d.fixtures || d.cases || []); })();
let F = F0;
// Claude's checked corrections to Grok's fixtures + extra cases (claude/tests/extra-fixtures.json)
const X = (() => { try { return JSON.parse(fs.readFileSync(path.join(__dirname, 'extra-fixtures.json'), 'utf8')); } catch { return { fixtures: [], corrections: {} }; } })();
for (const f of F) if (X.corrections?.[f.id]) { f.expect = X.corrections[f.id].expect; f.source = (f.source || '') + ' | corrected by Claude: ' + X.corrections[f.id].why.slice(0, 60); }
if (!process.env.GROK_ONLY) F.push(...X.fixtures);
let n = 0; const uid = () => 'b' + (++n);
const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><rect width="20" height="20" fill="#8b5cf6"/></svg>';
const md5 = crypto.createHash('md5').update(svg).digest('hex');
const costume = { assetId: md5, name: 'c', md5ext: md5 + '.svg', dataFormat: 'svg', rotationCenterX: 10, rotationCenterY: 10 };
function build(fix, k) {
  if (!fix || !fix.blocks || !fix.blocks.stack) throw new Error('fixture format not handled: ' + (fix && fix.id));
  const B = {}, vars = {}, lists = {};
  const add = (o, parent) => { const i = uid(); B[i] = Object.assign({ next: null, parent: parent || null, inputs: {}, fields: {}, shadow: false, topLevel: false }, o); return i; };
  const varId = nm => { const id = 'v_' + nm; if (!vars[id]) vars[id] = [nm, 0]; return id; };
  const listId = nm => { const id = 'l_' + nm; if (!lists[id]) lists[id] = [nm, []]; return id; };
  const lit = v => (typeof v === 'number' ? [1, [4, String(v)]] : [1, [10, String(v ?? '')]]);
  const val = (v, parent) => { if (v && typeof v === 'object') { const r = expr(v, parent); return [3, r, [10, '']]; } return lit(v); };
  const bool = (v, parent) => { if (!v || typeof v !== 'object') throw new Error('expression not handled: literal boolean'); return [2, expr(v, parent)]; };
  const OP = { round: ['operator_round', { NUM: 'num' }], mod: ['operator_mod', { NUM1: 'num1', NUM2: 'num2' }], add: ['operator_add', { NUM1: 'num1', NUM2: 'num2' }],
    equals: ['operator_equals', { OPERAND1: 'a', OPERAND2: 'b' }], contains: ['operator_contains', { STRING1: 'string1', STRING2: 'string2' }], join: ['operator_join', { STRING1: 'string1', STRING2: 'string2' }],
    letter_of: ['operator_letter_of', { LETTER: 'letter', STRING: 'string' }], length_of: ['operator_length', { STRING: 'string' }], random: ['operator_random', { FROM: 'from', TO: 'to' }] };
  function expr(e, parent) {
    if (OP[e.type]) { const [op, ins] = OP[e.type], b = add({ opcode: op }, parent); for (const [I, key] of Object.entries(ins)) B[b].inputs[I] = val(e[key], b); return b; }
    if (e.type === 'not') { const b = add({ opcode: 'operator_not' }, parent); B[b].inputs.OPERAND = bool(e.operand, b); return b; }
    if (['abs', 'floor', 'ceiling'].includes(e.type)) { const b = add({ opcode: 'operator_mathop', fields: { OPERATOR: [e.type, null] } }, parent); B[b].inputs.NUM = val(e.num, b); return b; }
    if (e.type === 'var') return add({ opcode: 'data_variable', fields: { VARIABLE: [e.name, varId(e.name)] } }, parent);
    if (e.type === 'item_of_list') { const b = add({ opcode: 'data_itemoflist', fields: { LIST: [e.list, listId(e.list)] } }, parent); B[b].inputs.INDEX = val(e.index, b); return b; }
    if (e.type === 'list_contains') { const b = add({ opcode: 'data_listcontainsitem', fields: { LIST: [e.list, listId(e.list)] } }, parent); B[b].inputs.ITEM = val(e.item, b); return b; }
    if (e.type === 'length_of_list') return add({ opcode: 'data_lengthoflist', fields: { LIST: [e.list, listId(e.list)] } }, parent);
    /* v15.50.4 (Claude): more of Grok's expression types */
    const R0 = { x_position: 'motion_xposition', y_position: 'motion_yposition', direction: 'motion_direction', size: 'looks_size', timer: 'sensing_timer', answer: 'sensing_answer', username: 'sensing_username', days_since_2000: 'sensing_dayssince2000', mouse_x: 'sensing_mousex' };
    if (R0[e.type]) return add({ opcode: R0[e.type] }, parent);
    if (e.type === 'costume_number') return add({ opcode: 'looks_costumenumbername', fields: { NUMBER_NAME: ['number', null] } }, parent);
    if (e.type === 'current') return add({ opcode: 'sensing_current', fields: { CURRENTMENU: [String(e.menu || 'year').toUpperCase().replace(/\s+/g, ''), null] } }, parent);
    const BIN = { lt: ['operator_lt', 'OPERAND1', 'OPERAND2', 'a', 'b'], gt: ['operator_gt', 'OPERAND1', 'OPERAND2', 'a', 'b'], divide: ['operator_divide', 'NUM1', 'NUM2', 'num1', 'num2'], subtract: ['operator_subtract', 'NUM1', 'NUM2', 'num1', 'num2'], multiply: ['operator_multiply', 'NUM1', 'NUM2', 'num1', 'num2'] };
    if (BIN[e.type]) { const [op, A1, A2, k1, k2] = BIN[e.type], b = add({ opcode: op }, parent); B[b].inputs[A1] = val(e[k1], b); B[b].inputs[A2] = val(e[k2], b); return b; }
    if (e.type === 'and' || e.type === 'or') { const b = add({ opcode: 'operator_' + e.type }, parent); B[b].inputs.OPERAND1 = bool(e.a, b); B[b].inputs.OPERAND2 = bool(e.b, b); return b; }
    if (['mathop', 'floor', 'ceiling'].includes(e.type)) { const b = add({ opcode: 'operator_mathop', fields: { OPERATOR: [e.type === 'mathop' ? e.op : e.type, null] } }, parent); B[b].inputs.NUM = val(e.num, b); return b; }
    if (e.type === 'item_num_of_list') { const b = add({ opcode: 'data_itemnumoflist', fields: { LIST: [e.list, listId(e.list)] } }, parent); B[b].inputs.ITEM = val(e.item, b); return b; }
    if (e.type === 'list_contents') return add({ opcode: 'data_listcontents', fields: { LIST: [e.list, listId(e.list)] } }, parent);
    throw new Error('expression not handled: ' + e.type);
  }
  function stmt(s, parent) {
    const L = () => ({ LIST: [s.list, listId(s.list)] }), V = () => ({ VARIABLE: [s.name, varId(s.name)] });
    switch (s.type) {
      case 'say': { const b = add({ opcode: 'looks_say' }, parent); B[b].inputs.MESSAGE = val(s.value, b); return b; }
      case 'delete_all_of_list': return add({ opcode: 'data_deletealloflist', fields: L() }, parent);
      case 'add_to_list': { const b = add({ opcode: 'data_addtolist', fields: L() }, parent); B[b].inputs.ITEM = val(s.item, b); return b; }
      case 'insert_at_list': { const b = add({ opcode: 'data_insertatlist', fields: L() }, parent); B[b].inputs.ITEM = val(s.item, b); B[b].inputs.INDEX = val(s.index, b); return b; }
      case 'delete_of_list': { const b = add({ opcode: 'data_deleteoflist', fields: L() }, parent); B[b].inputs.INDEX = val(s.index, b); return b; }
      case 'replace_item_of_list': { const b = add({ opcode: 'data_replaceitemoflist', fields: L() }, parent); B[b].inputs.INDEX = val(s.index, b); B[b].inputs.ITEM = val(s.item, b); return b; }
      case 'set_var': { const b = add({ opcode: 'data_setvariableto', fields: V() }, parent); B[b].inputs.VALUE = val(s.value, b); return b; }
      case 'change_var': { const b = add({ opcode: 'data_changevariableby', fields: V() }, parent); B[b].inputs.VALUE = val(s.by, b); return b; }
      case 'repeat': { const b = add({ opcode: 'control_repeat' }, parent); B[b].inputs.TIMES = val(s.times, b); const f = chain(s.body, b); if (f) B[b].inputs.SUBSTACK = [2, f]; return b; }
      case 'if_else': { const b = add({ opcode: 'control_if_else' }, parent); B[b].inputs.CONDITION = bool(s.condition, b); const t = chain(s.then || [], b), e = chain(s.else || [], b); if (t) B[b].inputs.SUBSTACK = [2, t]; if (e) B[b].inputs.SUBSTACK2 = [2, e]; return b; }
      /* v15.50.4 (Claude): more of Grok's statement types */
      case 'go_to_xy': { const b = add({ opcode: 'motion_gotoxy' }, parent); B[b].inputs.X = val(s.x, b); B[b].inputs.Y = val(s.y, b); return b; }
      case 'glide': { const b = add({ opcode: 'motion_glidesecstoxy' }, parent); B[b].inputs.SECS = val(s.secs, b); B[b].inputs.X = val(s.x, b); B[b].inputs.Y = val(s.y, b); return b; }
      case 'point_in_direction': { const b = add({ opcode: 'motion_pointindirection' }, parent); B[b].inputs.DIRECTION = val(s.direction, b); return b; }
      case 'move_steps': { const b = add({ opcode: 'motion_movesteps' }, parent); B[b].inputs.STEPS = val(s.steps, b); return b; }
      case 'turn_right': case 'turn_left': { const b = add({ opcode: s.type === 'turn_right' ? 'motion_turnright' : 'motion_turnleft' }, parent); B[b].inputs.DEGREES = val(s.degrees, b); return b; }
      case 'change_x': { const b = add({ opcode: 'motion_changexby' }, parent); B[b].inputs.DX = val(s.dx, b); return b; }
      case 'change_y': { const b = add({ opcode: 'motion_changeyby' }, parent); B[b].inputs.DY = val(s.dy, b); return b; }
      case 'set_x': { const b = add({ opcode: 'motion_setx' }, parent); B[b].inputs.X = val(s.x, b); return b; }
      case 'set_y': { const b = add({ opcode: 'motion_sety' }, parent); B[b].inputs.Y = val(s.y, b); return b; }
      case 'if_on_edge_bounce': return add({ opcode: 'motion_ifonedgebounce' }, parent);
      case 'set_rotation_style': return add({ opcode: 'motion_setrotationstyle', fields: { STYLE: [s.style, null] } }, parent);
      case 'set_size': { const b = add({ opcode: 'looks_setsizeto' }, parent); B[b].inputs.SIZE = val(s.size, b); return b; }
      case 'change_size': { const b = add({ opcode: 'looks_changesizeby' }, parent); B[b].inputs.CHANGE = val(s.change, b); return b; }
      case 'hide': return add({ opcode: 'looks_hide' }, parent);
      case 'clear_effects': return add({ opcode: 'looks_cleargraphiceffects' }, parent);
      case 'set_effect': { const b = add({ opcode: 'looks_seteffectto', fields: { EFFECT: [String(s.effect).toUpperCase(), null] } }, parent); B[b].inputs.VALUE = val(s.value, b); return b; }
      case 'change_effect': { const b = add({ opcode: 'looks_changeeffectby', fields: { EFFECT: [String(s.effect).toUpperCase(), null] } }, parent); B[b].inputs.CHANGE = val(s.change, b); return b; }
      case 'reset_timer': return add({ opcode: 'sensing_resettimer' }, parent);
      case 'wait': { const b = add({ opcode: 'control_wait' }, parent); B[b].inputs.DURATION = val(s.seconds, b); return b; }
      case 'if': { const b = add({ opcode: 'control_if' }, parent); if (s.condition) B[b].inputs.CONDITION = bool(s.condition, b); const t = chain(s.then || [], b); if (t) B[b].inputs.SUBSTACK = [2, t]; return b; }
      case 'repeat_until': { const b = add({ opcode: 'control_repeat_until' }, parent); B[b].inputs.CONDITION = bool(s.condition, b); const t = chain(s.body || [], b); if (t) B[b].inputs.SUBSTACK = [2, t]; return b; }
      case 'wait_until': { const b = add({ opcode: 'control_wait_until' }, parent); B[b].inputs.CONDITION = bool(s.condition, b); return b; }
      case 'stop': if (s.option === 'all') throw new Error('statement not handled: stop all (would stop every fixture)'); return add({ opcode: 'control_stop', fields: { STOP_OPTION: [s.option, null] }, mutation: { tagName: 'mutation', children: [], hasnext: String(s.option === 'other scripts in sprite') } }, parent);
    }
    throw new Error('statement not handled: ' + s.type);
  }
  function chain(list, parent) { let first = null, prev = null; for (const s of list) { const b = stmt(s, prev || parent); if (prev) B[prev].next = b; else first = b; prev = b; } return first; }
  const hat = add({ opcode: 'event_whenflagclicked', topLevel: true, x: 0, y: 0 }); B[hat].next = chain(fix.blocks.stack, hat);
  return { isStage: false, name: fix.id, variables: vars, lists, broadcasts: {}, blocks: B, comments: {}, currentCostume: 0, costumes: [costume], sounds: [], volume: 100, layerOrder: k + 1, visible: true, x: -220 + (k % 12) * 38, y: 150 - Math.floor(k / 12) * 50, size: 100, direction: 90, draggable: false, rotationStyle: 'all around' };
}
(async () => {
  const stage = { isStage: true, name: 'Stage', variables: {}, lists: {}, broadcasts: {}, blocks: {}, comments: {}, currentCostume: 0, costumes: [{ ...costume, name: 'backdrop1' }], sounds: [], volume: 100, layerOrder: 0, tempo: 60, videoTransparency: 50, videoState: 'on', textToSpeechLanguage: null };
  const T = [], kept = [], SKIP = {}; F.forEach(f => { try { T.push(build(f, kept.length)); kept.push(f); } catch (e) { const why = e.message.replace(/:.*/, ': ') + (e.message.split(': ')[1] || ''); SKIP[why] = (SKIP[why] || 0) + 1; } }); F = kept;
  for (const [k, v] of Object.entries(SKIP)) console.log(`SKIP ${v} fixture(s): ${k}`);
  const IDS = new Set(F.map(f => f.id));
  const pj = { targets: [stage, ...T], monitors: [], extensions: [], meta: { semver: '3.0.0', vm: '0.2.0', agent: 'G-Warp Grok GR1 runner' } };
  const z = new JSZip(); z.file('project.json', JSON.stringify(pj)); z.file(md5 + '.svg', svg);
  const out = path.join(require('os').tmpdir(), 'grok-gr1.sb3'); fs.writeFileSync(out, await z.generateAsync({ type: 'nodebuffer' }));
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await prep(p); await p.addInitScript(() => { delete window.showOpenFilePicker; }); await p.goto('file://' + path.resolve(file)); await p.waitForTimeout(3500);
  const [fc] = await Promise.all([p.waitForEvent('filechooser'), p.evaluate(() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'o', ctrlKey: true, bubbles: true })))]);
  await fc.setFiles(out); await p.waitForFunction(n => Engine.sprites.length >= n, F.length, { timeout: 30000 }); await p.waitForTimeout(1200); await p.keyboard.press('Escape');
  await p.evaluate(() => document.getElementById('greenFlagBtn').click()); await p.waitForTimeout(400);
  await p.evaluate(() => [...document.querySelectorAll('#gw15CloudAsk .gw8-dlg-foot button')].find(x => /this computer/.test(x.textContent))?.click()).catch(() => {});
  await p.waitForTimeout(2000);
  const got = await p.evaluate(ids => Object.fromEntries(Engine.sprites.filter(s => ids.includes(s.name)).map(s => [s.name, { say: s.sayText, vars: s.localVars || {}, lists: s.localLists || {} }])), [...IDS]);
  let fails = 0; const same = (a, b) => String(a ?? '') === String(b ?? '');
  for (const f of F) {
    const g = got[f.id] || {}, e = f.expect, bad = [];
    if (e.say !== undefined) { if (e.say && typeof e.say === 'object' && e.say.oneOf) { if (!e.say.oneOf.map(String).includes(String(g.say))) bad.push(`say "${g.say}" (want one of ${e.say.oneOf})`); } else if (!same(g.say ?? '', e.say)) bad.push(`say "${g.say}" (want "${e.say}")`); }
    for (const [k, v] of Object.entries(e.variables || {})) if (!same(g.vars?.[k], v)) bad.push(`${k} = ${JSON.stringify(g.vars?.[k])} (want ${JSON.stringify(v)})`);
    for (const [k, v] of Object.entries(e.lists || {})) if (JSON.stringify((g.lists?.[k] || []).map(String)) !== JSON.stringify(v.map(String))) bad.push(`list ${k} = ${JSON.stringify(g.lists?.[k])} (want ${JSON.stringify(v)})`);
    console.log((bad.length ? 'FAIL ' : 'PASS ') + f.id + (bad.length ? ' -> ' + bad.join(', ') : '') + '   [' + (f.source || '') + ']');
    if (bad.length) fails++;
  }
  if (errs.length) { console.log('FAIL page errors: ' + errs.slice(0, 3).join(' | ')); fails++; }
  await b.close(); console.log(fails ? fails + ' FAILED' : 'ALL PASS'); process.exit(fails ? 1 : 0);
})();
