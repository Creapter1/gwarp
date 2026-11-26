// APP=/path/app.html node mem.js project.sb3 [runSeconds] [taps] -> memory after opening and after running (renderer RSS, JS heap, DOM nodes, canvas MB)
const { chromium } = require('/opt/npm-tools/node_modules/playwright'); const { execSync } = require('child_process');
const rss=()=>{try{return Math.round(execSync("ps -eo rss,args | grep -- '--type=renderer' | grep -v grep | awk '{s+=$1} END{print s}'").toString().trim()/1024)}catch(e){return -1}};
const gpu=()=>{try{return Math.round(execSync("ps -eo rss,args | grep -- '--type=gpu-process' | grep -v grep | awk '{s+=$1} END{print s}'").toString().trim()/1024)}catch(e){return -1}};
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--use-angle=swiftshader']});const p=await b.newPage({viewport:{width:1440,height:900}});p.on('dialog',d=>d.dismiss());let crashed=false;p.on('crash',()=>{crashed=true;console.log('TAB CRASHED')});
const c=await p.context().newCDPSession(p);await c.send('Performance.enable');
const snap=async(label)=>{if(crashed)return;try{await c.send('HeapProfiler.enable');await c.send('HeapProfiler.collectGarbage');await p.waitForTimeout(800)}catch(e){}const m=Object.fromEntries((await c.send('Performance.getMetrics')).metrics.map(x=>[x.name,x.value]));
 const page=await p.evaluate(()=>{let cv=0,n=0,str=0,hq=0;const seen=new Set();const add=x=>{if(x&&x.width&&!seen.has(x)){seen.add(x);cv+=x.width*x.height*4;n++}};document.querySelectorAll('canvas').forEach(add);
  (Engine.sprites||[]).forEach(s=>(s.costumes||[]).forEach(c=>{add(c.canvas);if(c.__gwHQ&&c.__gwHQ.canvas){add(c.__gwHQ.canvas);hq++}for(const k in c){const v=c[k];if(typeof v==='string')str+=v.length;else if(v&&v.getContext)add(v);else if(v&&typeof v==='object'&&v.canvas&&v.canvas.getContext)add(v.canvas)}}));
  (Engine.backdrops||[]).forEach(b=>{for(const k in b)if(typeof b[k]==='string')str+=b[k].length});let att=0;const tw=document.createTreeWalker(document,NodeFilter.SHOW_ALL);while(tw.nextNode())att++;return {attached:att,options:document.querySelectorAll('option').length,canvasMB:Math.round(cv/1048576),canvases:n,stringsMB:Math.round(str/1048576),hist:(window.GW8&&GW8.history||[]).length,histMB:Math.round((window.GW8&&GW8.history||[]).reduce((a,h)=>a+JSON.stringify(h).length,0)/1048576)}}).catch(()=>({}));
 console.log(label.padEnd(14),JSON.stringify({rendererMB:rss(),gpuMB:gpu(),jsHeapMB:Math.round(m.JSHeapUsedSize/1048576),domNodes:m.Nodes,...page}))};
await p.goto('file://'+(process.env.APP||'/home/claude/rel/app.html'));await p.waitForTimeout(4000);await snap('app open');
await p.setInputFiles('#sb3ImportFile',process.argv[2]);
await p.waitForFunction(()=>window.GW&&GW.__sb3Project===true&&document.querySelectorAll('#workspaceCanvas .scratch-block').length>0,null,{timeout:240000}).catch(e=>console.log('open failed:',e.message.slice(0,80)));
await p.waitForTimeout(8000);await snap('project open');
const run=+process.argv[3]||0;if(run&&!crashed){await p.click('#greenFlagBtn');await p.waitForTimeout(2000);for(let i=0;i<(+process.argv[4]||0);i++){await p.keyboard.down(' ');await p.waitForTimeout(200);await p.keyboard.up(' ');await p.waitForTimeout(1300)}
 for(let t=0;t<run;t+=15){await p.waitForTimeout(15000);await snap('run '+(t+15)+' s')}}
await b.close()})();
