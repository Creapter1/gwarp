// node trace.js project.sb3 ["js after flag"]  -> where the browser's main thread spends its time while the project runs (style, layout, paint, script)
const { chromium } = require('/opt/npm-tools/node_modules/playwright'); const fs=require('fs');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--use-angle=swiftshader']});const p=await b.newPage({viewport:{width:1440,height:900}});p.on('dialog',d=>d.dismiss());
await p.goto('file:///home/claude/rel/app.html');await p.waitForTimeout(3500);await p.setInputFiles('#sb3ImportFile',process.argv[2]);
await p.waitForFunction(()=>window.GW&&GW.__sb3Project===true&&document.querySelectorAll('#workspaceCanvas .scratch-block').length>0,null,{timeout:180000});await p.waitForTimeout(7000);
await p.click('#greenFlagBtn');await p.waitForTimeout(1500);if(process.argv[3])await p.evaluate(process.argv[3]);await p.waitForTimeout(500);
await b.startTracing(p,{categories:['devtools.timeline','disabled-by-default-devtools.timeline']});await p.waitForTimeout(4000);const buf=await b.stopTracing();
const ev=JSON.parse(buf.toString()).traceEvents;const main={};ev.forEach(e=>{if(e.ph==='X'&&e.name==='RunTask'){const k=e.pid+':'+e.tid;main[k]=(main[k]||0)+e.dur}});const mt=Object.entries(main).sort((a,b)=>b[1]-a[1])[0][0];
const sum={},cnt={};ev.forEach(e=>{if(e.ph!=='X'||e.pid+':'+e.tid!==mt)return;sum[e.name]=(sum[e.name]||0)+e.dur;cnt[e.name]=(cnt[e.name]||0)+1});
console.log(Object.entries(sum).sort((a,b)=>b[1]-a[1]).slice(0,16).map(([k,v])=>(v/1000).toFixed(0).padStart(6)+' ms  x'+String(cnt[k]).padEnd(5)+k).join('\n'));
const big=ev.filter(e=>e.ph==='X'&&e.pid+':'+e.tid===mt&&(e.name==='UpdateLayoutTree'||e.name==='Layout'||e.name==='Paint'||e.name==='PrePaint')&&e.dur>3000).slice(0,3).map(e=>e.name+' '+(e.dur/1000).toFixed(1)+'ms '+JSON.stringify(e.args).slice(0,300));console.log(big.join('\n'));await b.close()})();
