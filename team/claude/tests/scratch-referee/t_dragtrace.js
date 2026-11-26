// what does the browser itself do during 12 drag moves? (main-thread time by kind of work)
const { chromium } = require('/opt/npm-tools/node_modules/playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--use-angle=swiftshader']});const p=await b.newPage({viewport:{width:1920,height:1000}});p.on('dialog',d=>d.dismiss());
 if(process.env.INIT)await p.addInitScript(process.env.INIT);
 await p.goto('file://'+(process.env.APP||'/home/claude/rel/app.html'));await p.waitForTimeout(2500);await p.setInputFiles('#sb3ImportFile',process.argv[2]||'/home/claude/priv/gh.sb3');
 await p.waitForFunction(()=>window.GW&&GW.__sb3Project===true&&document.querySelectorAll('#workspaceCanvas .scratch-block').length>0,null,{timeout:240000});await p.waitForTimeout(7000);
 const tgt=await p.evaluate(()=>{const big=[...document.querySelectorAll('#workspaceCanvas .scratch-block[data-type="forever"]')].filter(x=>x.offsetParent).sort((a,b)=>b.getBoundingClientRect().height-a.getBoundingClientRect().height)[0];big.scrollIntoView({block:'start'});document.getElementById('workspace').scrollTop-=120;const h=big.querySelector(':scope > .block-c-header').getBoundingClientRect();return {x:h.left+12,y:h.top+8}});
 await p.waitForTimeout(1500);await p.mouse.move(tgt.x,tgt.y);await p.mouse.down();await p.mouse.move(tgt.x-20,tgt.y+10);await p.waitForTimeout(1500);
 await b.startTracing(p,{categories:['devtools.timeline','disabled-by-default-devtools.timeline']});
 const t0=Date.now();for(let i=0;i<12;i++){await p.mouse.move(tgt.x-28-i*8,tgt.y+14+i*4);await p.waitForTimeout(50)}const wall=Date.now()-t0;
 const buf=await b.stopTracing();const ev=JSON.parse(buf.toString()).traceEvents;const main={};const sum={};
 ev.filter(e=>e.ph==='X'&&e.dur).forEach(e=>{const k=e.pid+':'+e.tid;main[k]=(main[k]||0)+e.dur});const mt=Object.entries(main).sort((a,b)=>b[1]-a[1])[0][0];
 const names=['Layout','UpdateLayoutTree','RecalcStyle','Paint','PrePaint','Layerize','Commit','UpdateLayer','CompositeLayers','FunctionCall','EventDispatch','HitTest','TimerFire','FireAnimationFrame','RunMicrotasks','EvaluateScript','IntersectionObserverController::computeIntersections','ScheduleStyleRecalculation','InvalidateLayout','UpdateLayerTree','PaintImage','RasterTask','ParseHTML','MinorGC','MajorGC'];
 ev.filter(e=>e.ph==='X'&&e.dur&&(e.pid+':'+e.tid)===mt&&names.includes(e.name)).forEach(e=>{sum[e.name]=(sum[e.name]||0)+e.dur/1000});
 console.log('12 moves in',wall,'ms wall. main thread ms by kind:');Object.entries(sum).sort((a,b)=>b[1]-a[1]).forEach(([k,v])=>console.log('  ',String(Math.round(v)).padStart(5),k));
 await p.mouse.up();await b.close()})();
