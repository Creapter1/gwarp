// node pace.js project.sb3 [ms] [pre-js]  -> how evenly the engine steps (target 30/s)
const { chromium } = require('/opt/npm-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});const p=await b.newPage({viewport:{width:1440,height:900}});
await p.goto('file:///home/claude/rel/app.html');await p.waitForTimeout(3500);await p.setInputFiles('#sb3ImportFile',process.argv[2]);await p.waitForTimeout(3000);
await p.evaluate((pre)=>{if(pre)(0,eval)(pre);window.__st=[];const g=GW.frameGate;GW.frameGate=function(n){const r=g.apply(this,arguments);if(r)__st.push(performance.now());return r}},process.argv[4]||'');
await p.click('#greenFlagBtn');const ms=+process.argv[3]||5000;await p.waitForTimeout(ms);
console.log(JSON.stringify(await p.evaluate((ms)=>{const t=__st,d=[];for(let i=1;i<t.length;i++)d.push(t[i]-t[i-1]);d.sort((a,b)=>a-b);const ok=d.filter(x=>x>26&&x<41).length;return{steps_per_s:+(t.length/(ms/1000)).toFixed(1),on_time_pct:Math.round(100*ok/d.length),p50:Math.round(d[d.length>>1]),p95:Math.round(d[(d.length*.95)|0]),worst:Math.round(d[d.length-1])}},ms)));await b.close()})();
