const { chromium } = require('playwright'); const { prep } = require('./harness'); const path = require('path');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await prep(p); await p.goto('file://' + path.resolve(process.argv[2])); await p.waitForTimeout(3500);
  await p.click('#gwMainTabCostumes').catch(()=>{}); await p.waitForTimeout(1500);
  const r = await p.evaluate(() => [...document.querySelectorAll('#panelCostumes button, #panelCostumes [role=button]')].filter(b => b.offsetParent).map(b => (b.title || b.getAttribute('aria-label') || b.textContent || '').trim().replace(/\s+/g,' ').slice(0,40)).filter(Boolean));
  console.log(JSON.stringify([...new Set(r)]));
  await p.screenshot({ path: path.resolve(__dirname, '../costume-tab.png') });
  const a = await p.$("#panelCostumes button[title^=\"Animation:\"]"); if (a) { await a.click(); await p.waitForTimeout(1500);
    const r2 = await p.evaluate(() => [...document.querySelectorAll('#gw18Anim button, #gw18Anim select, #gw18Anim label')].filter(b => b.offsetParent).map(b => (b.title || b.getAttribute('aria-label') || b.textContent || '').trim().replace(/\s+/g,' ').slice(0,50)));
    console.log('ANIM', JSON.stringify([...new Set(r2)])); await p.screenshot({ path: path.resolve(__dirname, '../anim-tab.png') }); }
  await b.close(); })();
