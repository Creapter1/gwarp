// node load.js [project.sb3]  -> seconds: app ready, project opened (until the page is calm again)
const { chromium } = require('/opt/npm-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});const p=await b.newPage({viewport:{width:1440,height:900}});
await p.addInitScript(()=>{window.__lt=[];try{new PerformanceObserver(L=>L.getEntries().forEach(e=>__lt.push([e.startTime,e.duration]))).observe({entryTypes:['longtask']})}catch(e){}});
const calm=async(from)=>{for(;;){await p.waitForTimeout(250);const r=await p.evaluate(()=>{const l=__lt[__lt.length-1];return [performance.now(),l?l[0]+l[1]:0]});if(r[0]-Math.max(r[1],from)>1200)return Math.max(r[1],from)}};
await p.goto('file://'+(process.env.APP||'/home/claude/rel/app.html'));
const nav=await p.evaluate(()=>{const n=performance.getEntriesByType('navigation')[0];return {dcl:n.domContentLoadedEventEnd,load:n.loadEventEnd}});
const ready=await calm(0);const out={app_dom_ready_s:+(nav.dcl/1000).toFixed(2),app_calm_s:+(ready/1000).toFixed(2)};
if(process.argv[2]){const t0=await p.evaluate(()=>performance.now());await p.setInputFiles('#sb3ImportFile',process.argv[2]);
 await p.waitForFunction(()=>window.GW&&GW.__sb3Project===true&&document.querySelectorAll('#workspaceCanvas .scratch-block').length>0,null,{timeout:120000});
 const shown=await p.evaluate(()=>performance.now());const done=await calm(shown);
 const lt=await p.evaluate((t0)=>__lt.filter(x=>x[0]>=t0).sort((a,b)=>b[1]-a[1]).slice(0,5).map(x=>Math.round(x[1])),t0);
 Object.assign(out,{open_blocks_shown_s:+((shown-t0)/1000).toFixed(2),open_calm_s:+((done-t0)/1000).toFixed(2),longest_freezes_ms:lt,blocks:await p.evaluate(()=>document.querySelectorAll('#workspaceCanvas .scratch-block').length),sprites:await p.evaluate(()=>Engine.sprites.length)});}
console.log(JSON.stringify(out));await b.close()})();
