const { chromium } = require('/opt/npm-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});const p=await b.newPage({viewport:{width:1440,height:900}});p.on('dialog',d=>d.dismiss());
await p.goto('file://'+(process.argv[3]||'/home/claude/rel/app.html'));await p.waitForTimeout(3500);await p.setInputFiles('#sb3ImportFile',process.argv[2]);await p.waitForTimeout(3000);
const c=await p.context().newCDPSession(p);await c.send('Profiler.enable');await c.send('Profiler.setSamplingInterval',{interval:300});await c.send('Profiler.start');
await p.click('#greenFlagBtn');await p.waitForTimeout(+process.argv[4]||7000);const {profile}=await c.send('Profiler.stop');
const self={},byId={};profile.nodes.forEach(n=>byId[n.id]=n);let tot=0;profile.samples.forEach((id,i)=>{const n=byId[id],f=n.callFrame,k=(f.functionName||'(anon)')+' @'+(f.url.split('/').pop()||'')+':'+(f.lineNumber+1)+':'+f.columnNumber;self[k]=(self[k]||0)+profile.timeDeltas[i];tot+=profile.timeDeltas[i]});
console.log(Object.entries(self).sort((a,b)=>b[1]-a[1]).slice(0,+process.argv[5]||40).map(([k,v])=>(v/tot*100).toFixed(1).padStart(5)+'% '+k).join('\n'));await b.close()})();
