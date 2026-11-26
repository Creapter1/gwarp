const { chromium } = require('/opt/npm-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});const p=await b.newPage({viewport:{width:1440,height:900}});p.on('dialog',d=>d.dismiss());
const c=await p.context().newCDPSession(p);await c.send('Performance.enable');await c.send('HeapProfiler.enable');
const nodes=async(l)=>{await c.send('HeapProfiler.collectGarbage');await p.waitForTimeout(600);await c.send('HeapProfiler.collectGarbage');await p.waitForTimeout(400);const m=Object.fromEntries((await c.send('Performance.getMetrics')).metrics.map(x=>[x.name,x.value]));const r=require('child_process').execSync("ps -eo rss,args | grep -- '--type=renderer' | grep -v grep | awk '{s+=$1} END{print s}'").toString().trim()/1024;console.log(l.padEnd(34),'nodes',m.Nodes,'rendererMB',Math.round(r))};
await p.goto('file://'+(process.env.APP||'/home/claude/rel/app.html'));await p.waitForTimeout(4000);await nodes('app open');
await p.setInputFiles('#sb3ImportFile',process.argv[2]);await p.waitForFunction(()=>window.GW&&GW.__sb3Project===true&&document.querySelectorAll('#workspaceCanvas .scratch-block').length>0,null,{timeout:240000});await p.waitForTimeout(8000);await nodes('project open');
for(const [l,js] of JSON.parse(process.argv[3]||'[]')){await p.evaluate(js);await p.waitForTimeout(500);await nodes(l)}
await b.close()})();
