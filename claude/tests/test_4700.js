// compiler step 1: "item # of" gives exactly the same answers as the old Scratch compare loop
const { chromium } = require('playwright'); const { prep } = require('./harness'); const path = require('path');
(async () => { const [file] = process.argv.slice(2); let fails = 0; const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };
  const b = await chromium.launch(); const p = await b.newPage(); await prep(p); await p.goto('file://' + path.resolve(file)); await p.waitForTimeout(3500);
  const r = await p.evaluate(() => {
    const G9 = window.GW9, cmp = G9.scratchCompare, old = (a, v) => { for (let i = 0; i < a.length; i++) if (cmp(a[i], v) === 0) return i + 1; return 0; };
    const vals = ['', ' ', '0', 0, '1', 1, '1.0', '01', 'a', 'A', 'b', 'Infinity', Infinity, '-Infinity', 'NaN', '1e3', 1000, ' 5 ', '5', '0x10', 16, true, 'true', 'TRUE', 'İ', 'i', '-0', -0, '.5', 0.5, null, 'hello world', 'Hello World'];
    let bad = []; let n = 0;
    for (let t = 0; t < 400; t++) { const a = Array.from({ length: 1 + (t % 9) }, () => vals[Math.floor(Math.random() * vals.length)]);
      for (const v of vals) { n++; const x = old(a, v), y = G9.itemNum(a, v); if (x !== y) bad.push(JSON.stringify([a, v, x, y])); } }
    const big = Array.from({ length: 5000 }, (_, i) => String(i)); let t0 = performance.now(); for (let i = 0; i < 300; i++) old(big, '4999'); const tOld = performance.now() - t0;
    t0 = performance.now(); for (let i = 0; i < 300; i++) G9.itemNum(big, '4999'); const tNew = performance.now() - t0;
    return { n, bad: bad.slice(0, 5), tOld: Math.round(tOld), tNew: Math.round(tNew) }; });
  ok(r.bad.length === 0, `same answer as the old Scratch compare in ${r.n} random cases ${r.bad.join(' ')}`);
  ok(r.tNew * 1.5 < r.tOld, `faster: 300 searches in a 5,000-item list ${r.tOld} ms -> ${r.tNew} ms`);
  await b.close(); console.log(fails ? fails + ' FAILED' : 'ALL PASS'); process.exit(fails ? 1 : 0); })();
