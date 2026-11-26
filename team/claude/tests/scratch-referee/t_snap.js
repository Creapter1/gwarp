// basic drag checks with the once-per-drag snap list: palette -> area, snap under, snap inside a C block, pull out, snap above, delete on the palette
const { chromium } = require('/opt/npm-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--use-angle=swiftshader']});const p=await b.newPage({viewport:{width:1600,height:950}});p.on('dialog',d=>d.dismiss());const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,120)));
 if(process.env.OLD)await p.addInitScript(()=>{window.GW_SNAP_CACHE=false;window.GW_DRAG_THROTTLE=false});
 await p.goto('file://'+(process.env.APP||'/home/claude/rel/app.html'));await p.waitForTimeout(3500);
 await p.evaluate(()=>{document.querySelectorAll('#workspaceCanvas > .block-stack').forEach(s=>s.remove())});await p.waitForTimeout(500);
 let ok=0,bad=0;const T=(n,c,x)=>{if(c)ok++;else{bad++;console.log('FAIL',n,JSON.stringify(x))}};
 const st=()=>p.evaluate(()=>[...document.querySelectorAll('#workspaceCanvas > .block-stack')].map(s=>{const f=b=>b.dataset.type+(b.querySelector(':scope > .block-c-body')?'['+[...b.querySelector(':scope > .block-c-body').children].filter(x=>x.classList.contains('scratch-block')).map(f).join(',')+']':'');return [...s.children].filter(x=>x.classList.contains('scratch-block')).map(f).join('>')}).filter(Boolean).sort());
 const drag=async(x,y,tx,ty)=>{await p.mouse.move(x,y);await p.mouse.down();for(let i=1;i<=10;i++){await p.mouse.move(x+(tx-x)*i/10,y+(ty-y)*i/10);await p.waitForTimeout(25)}await p.waitForTimeout(120);await p.mouse.up();await p.waitForTimeout(500)};
 const pal=async t=>{const r=await p.evaluate(t=>{const e=document.querySelector('#paletteContainer .scratch-block[data-type="'+t+'"]');e.scrollIntoView({block:'center'});const r=e.getBoundingClientRect();return {x:r.left+8,y:r.top+8}},t);return r};
 const wsb=async(t,n=0)=>p.evaluate(([t,n])=>{const e=[...document.querySelectorAll('#workspaceCanvas .scratch-block[data-type="'+t+'"]')][n];const r=e.getBoundingClientRect();return {x:r.left+8,y:r.top+8,l:r.left,t:r.top,b:r.bottom}},[t,n]);
 const cat=async name=>{await p.click('#gwCategoryRail button.cat-btn[data-cat="'+name+'"]');await p.waitForTimeout(600)};
 await cat('motion');let a=await pal('move');await drag(a.x,a.y,700,300);T('palette to area',(await st()).join('|')==='move',await st());
 a=await pal('turn_cw');let m=await wsb('move');await drag(a.x,a.y,m.l+10,m.b+12);T('snap under',(await st()).join('|')==='move>turn_cw',await st());
 await cat('control');a=await pal('forever').catch(()=>null);
 if(a){await drag(a.x,a.y,1000,300);T('forever placed',(await st()).includes('forever[]'),await st());
  m=await wsb('turn_cw');const f=await p.evaluate(()=>{const r=document.querySelector('#workspaceCanvas [data-type="forever"] > .block-c-body').getBoundingClientRect();return {l:r.left,t:r.top}});await drag(m.x,m.y,f.l+8+8,f.t+8+4);T('pull out + snap inside C',(await st()).join('|')==='forever[turn_cw]|move',await st());
  m=await wsb('move');const fo=await wsb('forever');const h=await p.evaluate(()=>document.querySelector('#workspaceCanvas [data-type="move"]').getBoundingClientRect().height);await drag(m.x,m.y,fo.l+8,fo.t-h+8+2);T('snap above',(await st()).join('|')==='move>forever[turn_cw]',await st());
  m=await wsb('forever');const pr=await p.evaluate(()=>{const r=document.getElementById('paletteContainer').getBoundingClientRect();return {x:r.left+60,y:r.top+200}});await drag(m.x,m.y,pr.x,pr.y);T('drop on palette deletes',(await st()).join('|')==='move',await st());}
 else T('control category found',false,'no forever in palette');
 T('no page errors',errs.length===0,errs);console.log(ok+'/'+(ok+bad)+' drag checks');await b.close()})();
