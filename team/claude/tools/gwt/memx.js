// experiment: thin all long block menus in place after opening, then measure again
const { chromium } = require('/opt/npm-tools/node_modules/playwright'); const { execSync } = require('child_process');
const rss=()=>Math.round(execSync("ps -eo rss,args | grep -- '--type=renderer' | grep -v grep | awk '{s+=$1} END{print s}'").toString().trim()/1024);
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--use-angle=swiftshader']});const p=await b.newPage({viewport:{width:1440,height:900}});p.on('dialog',d=>d.dismiss());
const c=await p.context().newCDPSession(p);await c.send('Performance.enable');await c.send('HeapProfiler.enable');
const snap=async l=>{await c.send('HeapProfiler.collectGarbage');await p.waitForTimeout(1500);await c.send('HeapProfiler.collectGarbage');await p.waitForTimeout(500);const m=Object.fromEntries((await c.send('Performance.getMetrics')).metrics.map(x=>[x.name,x.value]));
 const pg=await p.evaluate(()=>({options:document.querySelectorAll('option').length,selects:document.querySelectorAll('select').length,inputs:document.querySelectorAll('input').length,blocks:document.querySelectorAll('.scratch-block').length,els:document.querySelectorAll('*').length}));console.log(l.padEnd(12),JSON.stringify({rendererMB:rss(),jsHeapMB:Math.round(m.JSHeapUsedSize/1048576),domNodes:m.Nodes,...pg}))};
await p.goto('file://'+(process.env.APP||'/home/claude/rel/app.html'));await p.waitForTimeout(3000);
await p.setInputFiles('#sb3ImportFile',process.argv[2]);
await p.waitForFunction(()=>window.GW&&GW.__sb3Project===true&&document.querySelectorAll('#workspaceCanvas .scratch-block').length>0,null,{timeout:240000});
await p.waitForTimeout(8000);await snap('open');
const r=await p.evaluate(()=>{let n=0,by={};document.querySelectorAll('select').forEach(s=>{const k=s.className+'|'+(s.closest('.scratch-block')?.dataset.type||'');by[k]=(by[k]||0)+s.options.length;if(s.options.length>24){const v=s.value;[...s.options].forEach(o=>{if(o.value!==v){o.remove();n++}})}});return {removed:n,top:Object.entries(by).sort((a,b)=>b[1]-a[1]).slice(0,14)}});console.log(JSON.stringify(r));
await snap('thinned');await b.close()})();
