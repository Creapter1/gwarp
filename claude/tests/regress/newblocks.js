const { chromium } = require('playwright'); const { prep } = require('./harness'); const path = require('path');
(async () => { let fails = 0; const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); const errs = [];
  p.on('pageerror', e => errs.push(e.message)); await prep(p); await p.goto('file://' + path.resolve(process.argv[2])); await p.waitForTimeout(4500);
  const pal = await p.evaluate(() => ['op_lt', 'op_contains', 'op_mathop', 'current_part', 'days_since_2000', 'backdrop_number', 'backdrop_name', 'list_contents'].map(t => { const e = document.querySelector(`#paletteContainer .cat-section [data-type="${t}"]`); return t + ':' + (e ? (e.offsetParent ? 'shown' : 'hidden') + '/' + (e.classList.contains('gw-boolean-block') ? 'bool' : '') : 'MISSING'); }));
  console.log(pal.join(' ')); ok(!pal.some(x => /MISSING/.test(x)), 'all 8 new blocks in the palette');
  const r = await p.evaluate(async () => {
    ['a', 'b', 'c', 'd', 'e', 'f'].forEach(v => { if (!(v in Engine.variables)) GW.createVariable(v); }); if (!('fruits' in (Engine.lists || {}))) GW.createList('fruits');
    const A = GW_V1571, M = GW_GWRAP_PACK.make;
    const script = [['when_flag'], ['list_clear', [], ['fruits']], ['list_add', ['x'], ['fruits']], ['list_add', ['y'], ['fruits']],
      ['set_var', [{ r: ['op_mathop', ['16'], ['sqrt']] }], ['a']],
      ['set_var', [{ r: ['op_mathop', ['2.7'], ['floor']] }], ['b']],
      ['set_var', [{ r: ['current_part', [], ['YEAR']] }], ['c']],
      ['set_var', [{ r: ['list_contents', [], ['fruits']] }], ['d']],
      ['set_var', [{ r: ['backdrop_number'] }], ['f']],
      ['if', [], [], { cond: { type: 'op_lt', args: [{ type: 'literal', value: '3' }, { type: 'literal', value: '5' }] }, body: [['set_var', ['yes'], ['e']]] }],
      ['if', [], [], { cond: { type: 'op_contains', args: [{ type: 'literal', value: 'Apple' }, { type: 'literal', value: 'pp' }] }, body: [['change_var', ['1'], ['e']]] }]];
    const els = script.map(s => M(A, s)); const ws = document.getElementById('workspaceCanvas'); const st = document.createElement('div'); st.className = 'block-stack'; st.dataset.owner = String(Engine.activeSpriteIndex); st.style.left = '40px'; st.style.top = '40px'; els.forEach(e => st.appendChild(e)); ws.appendChild(st);
    try { GW8.decorate?.(); } catch {} A.rehydrate?.();
    document.getElementById('greenFlagBtn').click(); await new Promise(r => setTimeout(r, 1200)); document.getElementById('stopBtn').click();
    const v = { ...Engine.variables };
    let sb3 = null; try { const z = await GW_FILES.buildSb3(); const zip = await JSZip.loadAsync(await z.blob.arrayBuffer()); const j = JSON.parse(await zip.file('project.json').async('string')); sb3 = [...new Set(j.targets.flatMap(t => Object.values(t.blocks).map(x => x.opcode)))].filter(o => /mathop|contains|_lt|current|listcontents|backdropnumbername/.test(o)); } catch (e) { sb3 = 'ERR ' + e.message; }
    return { v, sb3 };
  });
  console.log(JSON.stringify(r));
  ok(r.v.a == 4 && r.v.b == 2 && r.v.c == new Date().getFullYear() && r.v.d === 'xy' && r.v.f == 1, 'mathop sqrt/floor, current year, list contents, backdrop #');
  ok(r.v.e == 1, '< and contains work: both ifs ran (e = "yes" then change by 1 = 1, like Scratch) e = ' + r.v.e);
  ok(Array.isArray(r.sb3) && ['operator_mathop', 'operator_lt', 'operator_contains', 'sensing_current'].every(o => r.sb3.includes(o)), 'saved to .sb3 as Scratch blocks: ' + JSON.stringify(r.sb3));
  ok(!errs.length, 'no page errors ' + errs.join(' | ')); console.log(fails ? fails + ' FAILED' : 'ALL PASS'); await b.close(); })();
