// how long does the page freeze when a big stack is picked up, moved and dropped? (long tasks seen by the page itself)
const { chromium } = require('/opt/npm-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--use-angle=swiftshader']});const p=await b.newPage({viewport:{width:1920,height:1000}});p.on('dialog',d=>d.dismiss());
 if(process.env.INIT)await p.addInitScript(process.env.INIT);
 await p.goto('file://'+(process.env.APP||'/home/claude/rel/app.html'));await p.waitForTimeout(2500);await p.setInputFiles('#sb3ImportFile',process.argv[2]||'/home/claude/priv/gh.sb3');
 await p.waitForFunction(()=>window.GW&&GW.__sb3Project===true&&document.querySelectorAll('#workspaceCanvas .scratch-block').length>0,null,{timeout:240000});await p.waitForTimeout(7000);
 const tgt=await p.evaluate(()=>{window.__lt=[];new PerformanceObserver(l=>l.getEntries().forEach(e=>window.__lt.push(Math.round(e.duration)))).observe({entryTypes:['longtask']});const big=[...document.querySelectorAll('#workspaceCanvas .scratch-block[data-type="forever"]')].filter(x=>x.offsetParent).sort((a,b)=>b.getBoundingClientRect().height-a.getBoundingClientRect().height)[0];big.scrollIntoView({block:'start'});document.getElementById('workspace').scrollTop-=120;const h=big.querySelector(':scope > .block-c-header').getBoundingClientRect();return {x:h.left+12,y:h.top+8,n:big.querySelectorAll('.scratch-block').length}});
 await p.waitForTimeout(1500);const lt=async l=>{await p.waitForTimeout(600);const a=await p.evaluate(()=>{const x=window.__lt;window.__lt=[];return x});console.log(l.padEnd(10),'long tasks ms:',a.join(',')||'-','| total',a.reduce((s,x)=>s+x,0))};
 await lt('idle');console.log('stack of',tgt.n,'blocks');
 const step=async(l,f)=>{const t=Date.now();await f();const ms=Date.now()-t;await lt(l+' ('+ms+' ms call)')};
 await p.mouse.move(tgt.x,tgt.y);await step('press',()=>p.mouse.down());
 await step('move 1',()=>p.mouse.move(tgt.x-60,tgt.y+30));await step('move 2',()=>p.mouse.move(tgt.x-120,tgt.y+60));
 await step('10 moves',async()=>{for(let i=0;i<10;i++)await p.mouse.move(tgt.x-120-i*8,tgt.y+60+i*4)});
 await step('drop',()=>p.mouse.up());await p.waitForTimeout(2500);await lt('after');
 if(process.env.PROF){} await b.close()})();
