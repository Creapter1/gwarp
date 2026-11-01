const { chromium } = require('playwright'); const { prep } = require('./harness'); const path = require('path');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await prep(p); await p.addInitScript(() => { try { localStorage.clear(); } catch {} }); await p.goto('file://' + path.resolve(process.argv[2])); await p.waitForTimeout(4000);
  const ok = (c, m, v) => console.log((c ? 'PASS ' : 'FAIL ') + m, v ?? '');
  await p.evaluate(() => { const A = GW_V1571, i = Engine.activeSpriteIndex, ws = document.getElementById('workspaceCanvas'); const st = document.createElement('div'); st.className = 'block-stack'; st.dataset.owner = String(i); st.style.left = '80px'; st.style.top = '80px';
    st.append(A.blk('when_flag'), A.cblk('forever', [A.blk('turn_cw', ['5']), A.cblk('repeat', [A.blk('change_x', ['1']), A.blk('wait', ['0.15'])], ['3']), A.cblk('if', [A.blk('wait', ['0.2'])], [], { type: 'mouse_down' }), A.blk('wait', ['0.2'])])); ws.appendChild(st); try { GW8.decorate(); } catch {} });
  await p.click('#greenFlagBtn'); await p.waitForTimeout(600);
  const anim = () => p.evaluate(() => getComputedStyle(document.querySelector('#workspaceCanvas .block-c-body'), '::before').animationName);
  ok(await anim() === 'gw8Flow', 'electricity animates although the computer asks for fewer animations', await anim());
  const seen = new Set(); for (let k = 0; k < 14; k++) { await p.waitForTimeout(90); const pos = await p.evaluate(() => { const d = document.querySelector('.gw1553-dot.on'); return d ? d.style.top : null; }); if (pos) seen.add(pos); }
  ok(seen.size >= 2, 'running-block dot is there and moves between blocks', [...seen].join(' '));
  await p.screenshot({ path: process.argv[3], clip: { x: 0, y: 90, width: 940, height: 420 } });
  await p.evaluate(() => GW_MOTION.setCalm(true)); await p.waitForTimeout(200); ok(await anim() === 'none', 'Calm motion ON stops the electricity', await anim());
  await p.evaluate(() => GW_MOTION.setCalm(false)); await p.waitForTimeout(200); ok(await anim() === 'gw8Flow', 'Calm motion OFF brings it back');
  await p.click('#stopBtn'); await p.waitForTimeout(400); ok(await p.evaluate(() => GW_MOTION.dots()) === 0, 'Stop: dots go away');
  await p.click('#greenFlagBtn'); await p.waitForTimeout(600); ok(await anim() === 'gw8Flow' && await p.evaluate(() => GW_MOTION.dots()) > 0, 'restart: animation + dot come back');
  await p.click('#stopBtn'); await p.click('#extra-menu-trigger').catch(() => {}); await p.waitForTimeout(500);
  ok(await p.evaluate(() => !!document.getElementById('gw1553CalmBtn')), 'More menu has the "Calm motion" switch');
  ok(!errs.length, 'no page errors', JSON.stringify(errs)); await b.close(); })();
