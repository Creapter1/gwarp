// a press on the empty inside of a big C block must not grab it; the visible parts still grab
const { chromium } = require('/opt/npm-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--use-angle=swiftshader']});const p=await b.newPage({viewport:{width:1920,height:1000}});p.on('dialog',d=>d.dismiss());const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,100)));
 if(process.env.OFF)await p.addInitScript(()=>{window.GW_GRAB_SHAPE=false});
 await p.goto('file://'+(process.env.APP||'/home/claude/rel/app.html'));await p.waitForTimeout(2500);await p.setInputFiles('#sb3ImportFile',process.argv[2]||'/home/claude/priv/gh.sb3');
 await p.waitForFunction(()=>window.GW&&GW.__sb3Project===true&&document.querySelectorAll('#workspaceCanvas .scratch-block').length>0,null,{timeout:240000});await p.waitForTimeout(6000);
 const info=()=>p.evaluate(()=>{const ws=document.getElementById('workspace');return {stacks:document.querySelectorAll('#workspaceCanvas > .block-stack').length,sl:ws.scrollLeft,st:ws.scrollTop,pos:[...document.querySelectorAll('#workspaceCanvas > .block-stack')].filter(s=>s.offsetParent).slice(0,40).map(s=>s.style.left+','+s.style.top).join('|')}});
 const tgt=await p.evaluate(()=>{const big=[...document.querySelectorAll('#workspaceCanvas .scratch-block[data-type="forever"]')].filter(x=>x.offsetParent).sort((a,b)=>b.getBoundingClientRect().height-a.getBoundingClientRect().height)[0];big.scrollIntoView({block:'start'});document.getElementById('workspace').scrollTop+=200;const r=big.getBoundingClientRect();const h=big.querySelector(':scope > .block-c-header').getBoundingClientRect();
  // an empty spot: inside the body box, to the right of every block on that row
  let x=0,y=500;for(let xx=Math.min(1300,r.right-20);xx>r.left+60;xx-=20){const e=document.elementFromPoint(xx,y);if(e&&e.classList.contains('block-c-body')){x=xx;break}}return {x,y,arm:[r.left+6,y],w:r.width,h:r.height,el:(e=>e.className)(document.elementFromPoint(x,y))}});
 console.log('big forever',Math.round(tgt.w)+'x'+Math.round(tgt.h),'empty spot',tgt.x,tgt.y,tgt.el);
 const drag=async(x,y,dx,dy)=>{await p.mouse.move(x,y);await p.mouse.down();for(let i=1;i<=8;i++){await p.mouse.move(x+dx*i/8,y+dy*i/8);await p.waitForTimeout(30)}await p.mouse.up();await p.waitForTimeout(700)};
 const a=await info();const t0=Date.now();await drag(tgt.x,tgt.y,-150,-60);const c=await info();
 console.log('press on empty inside:',a.stacks===c.stacks&&a.pos===c.pos?'nothing grabbed (OK)':'GRABBED A STACK (stacks '+a.stacks+' -> '+c.stacks+')','| area moved by',c.sl-a.sl,c.st-a.st,'');
 const t1=Date.now();await drag(tgt.arm[0],tgt.arm[1],80,40);const d=await info();console.log('press on the left arm:',d.stacks!==c.stacks||d.pos!==c.pos?'grabs the C block (OK)':'did not grab','ms',Date.now()-t1);
 console.log('errors',errs.length,errs.slice(0,2));await b.close()})();
