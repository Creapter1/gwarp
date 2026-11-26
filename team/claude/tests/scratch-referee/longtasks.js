// node longtasks.js project.sb3 [ms] -> the long freezes while a project runs and which function each one is in
const { chromium } = require('/opt/npm-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--use-angle=swiftshader']});const p=await b.newPage({viewport:{width:1440,height:900}});p.on('dialog',d=>d.dismiss());
await p.goto('file:///home/claude/rel/app.html');await p.waitForTimeout(3500);await p.setInputFiles('#sb3ImportFile',process.argv[2]);
await p.waitForFunction(()=>window.GW&&GW.__sb3Project===true&&document.querySelectorAll('#workspaceCanvas .scratch-block').length>0,null,{timeout:180000});await p.waitForTimeout(7000);
await b.startTracing(p,{categories:['devtools.timeline','disabled-by-default-devtools.timeline']});await p.click('#greenFlagBtn');
await p.waitForTimeout(2000);await p.keyboard.down(' ');await p.waitForTimeout(200);await p.keyboard.up(' ');await p.waitForTimeout(+process.argv[3]||12000);const buf=await b.stopTracing();
const ev=JSON.parse(buf.toString()).traceEvents.filter(e=>e.ph==='X');const main={};ev.forEach(e=>{if(e.name==='RunTask'){const k=e.pid+':'+e.tid;main[k]=(main[k]||0)+e.dur}});const mt=Object.entries(main).sort((a,b)=>b[1]-a[1])[0][0];
const M=ev.filter(e=>e.pid+':'+e.tid===mt);const t0=Math.min(...M.map(e=>e.ts));
M.filter(e=>e.name==='RunTask'&&e.dur>90000).sort((a,b)=>b.dur-a.dur).slice(0,8).forEach(T=>{const kids=M.filter(e=>e!==T&&e.ts>=T.ts&&e.ts+e.dur<=T.ts+T.dur&&e.dur>T.dur*0.15).sort((a,b)=>b.dur-a.dur).slice(0,5).map(e=>e.name+' '+(e.dur/1000).toFixed(0)+'ms '+(e.args&&e.args.data&&(e.args.data.functionName!==undefined||e.args.data.url)?(e.args.data.functionName||'')+'@'+String(e.args.data.url||'').split('/').pop()+':'+((e.args.data.lineNumber||0)+1):''));
 console.log('at '+((T.ts-t0)/1e6).toFixed(1)+'s  '+(T.dur/1000).toFixed(0)+' ms: '+kids.join(' | '))});await b.close()})();
