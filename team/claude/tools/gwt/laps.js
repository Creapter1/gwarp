const { chromium } = require('/opt/npm-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});const p=await b.newPage({viewport:{width:1440,height:900}});p.on('dialog',d=>d.dismiss());
await p.goto('file:///home/claude/rel/app.html');await p.waitForTimeout(3500);
await p.evaluate(()=>{window.__sn=[];const s=GW8.snapshot;GW8.snapshot=function(){const t=performance.now();const r=s.apply(this,arguments);__sn.push(['snap',Math.round(performance.now()-t)]);return r};const q=GW8.same;GW8.same=function(){const t=performance.now();const r=q.apply(this,arguments);__sn.push(['same',Math.round(performance.now()-t)]);return r}});
const t0=Date.now();await p.setInputFiles('#sb3ImportFile',process.argv[2]);
await p.waitForFunction(()=>window.GW&&GW.__sb3Project===true&&document.querySelectorAll('#workspaceCanvas .scratch-block').length>0,null,{timeout:180000});const t1=Date.now();await p.waitForTimeout(+process.argv[3]||8000);
console.log((t1-t0)/1000,JSON.stringify(await p.evaluate(()=>[window.GW_LOAD_TIMING,__sn])));await b.close()})();
