// node gwfps.js project.sb3 "<js run right after the green flag>" [ms]  -> G-Warp steps per second
const { chromium } = require('/opt/npm-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--use-angle=swiftshader']});const p=await b.newPage({viewport:{width:1440,height:900}});p.on('dialog',d=>d.dismiss());
await p.goto('file://'+(process.env.APP||'/home/claude/rel/app.html'));await p.waitForTimeout(3500);await p.setInputFiles('#sb3ImportFile',process.argv[2]);
await p.waitForFunction(()=>window.GW&&GW.__sb3Project===true&&document.querySelectorAll('#workspaceCanvas .scratch-block').length>0,null,{timeout:180000});await p.waitForTimeout(7000);
await p.evaluate(()=>{window.__t=[];const g=GW.frameGate;GW.frameGate=function(){const r=g.apply(this,arguments);if(r)__t.push(performance.now());return r}});
await p.click('#greenFlagBtn');await p.waitForTimeout(1500);const r0=await p.evaluate((js)=>{const r=js?(0,eval)(js):null;window.__t0=__t.length;return r},process.argv[3]||'');
const ms=+process.argv[4]||6000;await p.waitForTimeout(ms);
console.log(JSON.stringify(await p.evaluate(()=>{const t=__t.slice(__t0),d=[];for(let i=1;i<t.length;i++)d.push(t[i]-t[i-1]);d.sort((a,b)=>a-b);return{steps_per_s:+(t.length/((t[t.length-1]-t[0])/1000)).toFixed(1),p50:Math.round(d[d.length>>1]),p95:Math.round(d[(d.length*.95)|0]),worst:Math.round(d[d.length-1])}})),String(r0||'').slice(0,80),process.env.POST?await p.evaluate(process.env.POST):'');await b.close()})();
