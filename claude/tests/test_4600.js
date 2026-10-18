// v15.46.0: chaos guard. node test_4600.js <html>
const { chromium } = require('playwright'); const { prep } = require('./harness'); const path = require('path');
(async () => {
  const [file] = process.argv.slice(2); let fails = 0; const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };
  const b = await chromium.launch({ args: ['--no-sandbox'] }); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await prep(p, {}); await p.goto('file://' + path.resolve(file)); await p.waitForTimeout(3600);
  ok(await p.evaluate(() => !/api\.ipify\.org/.test(document.documentElement.innerHTML)), 'no IP-address service as an example address');
  // the R1 clone bomb: infinite clones, clones that clone themselves
  await p.evaluate(() => {
    Engine.cloneLimit = Infinity; /* the 5000 safety ceiling stays on, like for a user */ const pal = t => document.querySelector(`#paletteContainer [data-type="${t}"]`).cloneNode(true);
    const ws = document.getElementById('workspaceCanvas');
    const mk = (hat, top) => { const st = document.createElement('div'); st.className = 'block-stack'; st.dataset.owner = '0'; st.style.left = '40px'; st.style.top = top + 'px'; const f = pal('forever'); f.querySelector('.block-c-body').innerHTML = ''; f.querySelector('.block-c-body').appendChild(pal('create_clone')); st.append(pal(hat), f); ws.appendChild(st); };
    mk('when_flag', 40); mk('when_clone', 200);
  });
  await p.waitForTimeout(500);
  await p.click('#greenFlagBtn'); await p.waitForTimeout(400);
  await p.evaluate(() => [...document.querySelectorAll('#gw15CloudAsk .gw8-dlg-foot button')].find(x => /this computer/.test(x.textContent))?.click());
  await p.waitForTimeout(9000);
  const t0 = Date.now();
  const asked = await p.evaluate(() => !!document.getElementById('gw46Stuck'));
  if (asked) await p.evaluate(() => [...document.querySelectorAll('#gw46Stuck button')].find(x => x.textContent === 'Stop it').click());
  else await p.evaluate(() => document.getElementById('stopBtn').click());
  await p.waitForFunction(() => !(Engine.threads || []).some(t => !t.finished) && !Engine.sprites.some(s => s.isClone), null, { timeout: 60000 }).catch(() => {});
  const secs = (Date.now() - t0) / 1000;
  const clones = await p.evaluate(() => Engine.sprites.filter(s => s.isClone).length);
  ok(secs < 2 && clones === 0, `clone bomb with infinite clones (5000 safety ceiling): Stop works in ${secs.toFixed(1)} s (the Chaos Tester waited 44.8 s)${asked ? '; the watchdog asked first' : ''}`);
  // text and list limits while running
  await p.click('#greenFlagBtn'); await p.waitForTimeout(300);
  let r = await p.evaluate(async () => { Engine.variables['my variable'] = 'x'.repeat(20e6); Engine.lists = Engine.lists || {}; Engine.lists['my list'] = new Array(250000).fill(1); await new Promise(r => setTimeout(r, 400)); return { text: Engine.variables['my variable'].length, list: Engine.lists['my list'].length }; });
  ok(r.text === 16e6 && r.list === 200000, `a 20-million-letter variable is cut to 16 million, a 250,000-item list to 200,000 (${JSON.stringify(r)})`);
  await p.evaluate(() => { Engine.variables['my variable'] = 0; Engine.lists['my list'] = []; }); await p.click('#stopBtn');
  // crash recovery
  await p.evaluate(() => localStorage.setItem('gwarp-open-session', '1'));
  const p2 = await ctx.newPage(); await prep(p2, {}); await p2.goto('file://' + path.resolve(file)); await p2.waitForTimeout(6500);
  ok(await p2.evaluate(() => !!document.getElementById('gw46Recover')), 'after G-Warp was not closed normally, it offers the restore points');
  ok(!errs.length, 'no page errors' + (errs.length ? ': ' + errs.slice(0, 2).join(' | ') : ''));
  console.log(fails ? `${fails} FAILED` : 'ALL PASS'); await b.close(); process.exit(fails ? 1 : 0);
})();
