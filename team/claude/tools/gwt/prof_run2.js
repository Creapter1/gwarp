// MS=8000 node prof_run.js project.sb3 [topN]  -> where the time goes while a project RUNS (self time and, per function, total time)
const { chromium } = require('/opt/npm-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});const p=await b.newPage({viewport:{width:1440,height:900}});p.on('dialog',d=>d.dismiss());
await p.goto('file://'+(process.env.APP||'/home/claude/rel/app.html')+'');await p.waitForTimeout(3500);
await p.setInputFiles('#sb3ImportFile',process.argv[2]);
await p.waitForFunction(()=>window.GW&&GW.__sb3Project===true&&document.querySelectorAll('#workspaceCanvas .scratch-block').length>0,null,{timeout:180000});await p.waitForTimeout(8000);
await p.click('#greenFlagBtn');await p.waitForTimeout(2000);for(let i=0;i<(+process.env.TAPS||0);i++){await p.keyboard.down(' ');await p.waitForTimeout(200);await p.keyboard.up(' ');await p.waitForTimeout(1300);}await p.keyboard.down('w');await p.keyboard.down('ArrowRight');
const c=await p.context().newCDPSession(p);await c.send('Profiler.enable');await c.send('Profiler.setSamplingInterval',{interval:500});await c.send('Profiler.start');
await p.waitForTimeout(+process.env.MS||8000);
const {profile}=await c.send('Profiler.stop');
const byId={},par={};profile.nodes.forEach(n=>{byId[n.id]=n;(n.children||[]).forEach(ch=>par[ch]=n.id)});
const key=n=>{const f=n.callFrame;return (f.functionName||'(anon)')+' @'+(f.url.split('/').pop()||'')+':'+(f.lineNumber+1)};
const self={},total={};let tot=0;
profile.samples.forEach((id,i)=>{const dt=profile.timeDeltas[i];tot+=dt;self[key(byId[id])]=(self[key(byId[id])]||0)+dt;const seen=new Set();for(let x=id;x;x=par[x]){const k=key(byId[x]);if(!seen.has(k)){seen.add(k);total[k]=(total[k]||0)+dt}}});
const N=+process.argv[3]||22,fmt=o=>Object.entries(o).sort((a,b)=>b[1]-a[1]).slice(0,N).map(([k,v])=>(v/1e6).toFixed(2).padStart(7)+'s '+k).join('\n');
console.log('TOTAL '+(tot/1e6).toFixed(1)+'s\n-- self --\n'+fmt(self)+'\n-- total (incl. callees) --\n'+fmt(total));await b.close()})();
