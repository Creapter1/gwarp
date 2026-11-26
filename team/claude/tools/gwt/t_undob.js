// Step 1b a: Undo / Redo keep the Book. For each project: make 6 kinds of edits, undo all, redo all; after every step the page must be
// the very same page as it was at that step (deep compare with the page copy taken then). Also: redo steps survive, memory per step.
// usage: node t_undob.js a.sb3 b.sb3 ...     OLD=1 runs the old page-text way (to compare time and memory)
const { chromium } = require('/opt/npm-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--use-angle=swiftshader']});let bad=0;
 for(const f of process.argv.slice(2)){const p=await b.newPage({viewport:{width:1600,height:950}});p.on('dialog',d=>d.dismiss());const errs=[];if(process.env.V)p.on('console',m=>console.log('  page:',m.text().slice(0,200)));p.on('pageerror',e=>errs.push(e.message.slice(0,120)));
  if(process.env.OLD)await p.addInitScript(()=>{window.GW_UNDO_BOOK=false});if(process.env.ALL)await p.addInitScript(()=>{window.GW_UNDO_BOOK_ALL=true});
  await p.goto('file://'+(process.env.APP||'/home/claude/rel/app.html')+(f==='PALETTE'?'?dev=1':''));await p.waitForTimeout(3000);
  if(f==='PALETTE'){const cats=await p.evaluate(()=>[...document.querySelectorAll('#gwCategoryRail button.cat-btn')].map(b=>b.dataset.cat));const seen=new Set();
   for(const c of cats){await p.click('#gwCategoryRail button.cat-btn[data-cat="'+c+'"]').catch(()=>{});await p.waitForTimeout(350);
    await p.evaluate(seen=>{const ws=document.getElementById('workspaceCanvas');const have=new Set(seen);document.querySelectorAll('#paletteContainer .scratch-block').forEach(pb=>{const key=pb.dataset.type+'|'+(pb.dataset.proc||'')+'|'+(pb.dataset.ext||'')+'|'+pb.textContent.trim().slice(0,30);if(have.has(key)||pb.closest('.scratch-block')!==pb&&pb.parentElement.closest('.scratch-block'))return;have.add(key);const cl=pb.cloneNode(true);cl.querySelectorAll('.block-c-body').forEach(x=>x.innerHTML='');const st=document.createElement('div');st.className='block-stack';st.dataset.owner=String(Engine.activeSpriteIndex||0);const k=ws.querySelectorAll(':scope > .block-stack').length;st.style.left=(40+(k%6)*330)+'px';st.style.top=(40+Math.floor(k/6)*90)+'px';st.appendChild(cl);ws.appendChild(st)});window.__seen=[...have]},[...seen]);
    (await p.evaluate(()=>window.__seen)).forEach(x=>seen.add(x));}
   await p.evaluate(()=>{try{GW8.decorate()}catch(e){}try{GW.refreshBlockMenus()}catch(e){}});await p.waitForTimeout(2500);}
  else if(f!=='-'){await p.setInputFiles('#sb3ImportFile',f);await p.waitForFunction(()=>window.GW&&GW.__sb3Project===true&&document.querySelectorAll('#workspaceCanvas .scratch-block').length>0,null,{timeout:240000}).catch(()=>{});await p.waitForTimeout(/gh\.sb3|big|vars/.test(f)?7000:3000);}
  if(process.env.HANG){const c=await p.context().newCDPSession(p);await c.send('Debugger.enable');c.on('Debugger.paused',async e=>{console.log(e.callFrames.slice(0,10).map(f=>f.functionName+' @'+f.url.slice(-12)+':'+f.location.lineNumber+':'+f.location.columnNumber).join('\n'));process.exit(0)});setTimeout(()=>c.send('Debugger.pause'),+process.env.HANG)}
  const r=await p.evaluate(async()=>{const ws=document.getElementById('workspaceCanvas'),B=window.GW_BOOK,wait=ms=>new Promise(r=>setTimeout(r,ms)),out={fails:[],book:!!(GW8.history.at(-1)||{state:{}}).state.bk};
   const stacks=()=>[...ws.children].filter(s=>s.classList.contains('block-stack')&&s.querySelector('.scratch-block'));
   const copy=()=>{window.GW_SYNC_INPUTS&&GW_SYNC_INPUTS(ws);return ws.cloneNode(true)};
   const cmp=(c,tag)=>{window.GW_SYNC_INPUTS&&GW_SYNC_INPUTS(ws);const A=[...c.children],N=[...ws.children],d=[];if(A.length!==N.length)d.push('parts '+A.length+' vs '+N.length);for(let i=0;i<Math.min(A.length,N.length)&&d.length<3;i++)B.same(A[i],N[i],'#'+i,d);if(d.length)out.fails.push(tag+': '+d.slice(0,2).join(' ; ').slice(0,300));};
   const push=async why=>{GW8.historyMute=false;clearTimeout(GW8.historyTimer);await wait(950);GW8.pushHistory(why);await wait(30)};
   await push('t0');const h0=GW8.history.length,copies=[copy()],chars0=B.stepChars?B.stepChars(GW8.history.map(h=>h.state.bk)):0,t=[];
   const big=()=>stacks().sort((a,b)=>b.querySelectorAll('.scratch-block').length-a.querySelectorAll('.scratch-block').length)[0];
   const edits=[
    ['move',()=>{const s=big();s.style.left=(parseFloat(s.style.left)||0)+37+'px';s.style.top=(parseFloat(s.style.top)||0)+11+'px'}],
    ['type',()=>{const i=[...ws.querySelectorAll('.scratch-block input.block-input:not([data-slot-proxy])')].find(x=>x.type!=='checkbox'&&x.offsetParent!==null)||ws.querySelector('.scratch-block input.block-input');if(i){i.value='4242';i.dispatchEvent(new Event('input',{bubbles:true}));i.dispatchEvent(new Event('change',{bubbles:true}))}}],
    ['delete block',()=>{const s=stacks().find(x=>x.querySelectorAll(':scope > .scratch-block').length>1)||big(),bl=s.querySelectorAll(':scope > .scratch-block');bl[bl.length-1].remove()}],
    ['duplicate',()=>{const s=stacks()[0],c=s.cloneNode(true);c.style.left=(parseFloat(s.style.left)||0)+300+'px';ws.appendChild(c);GW8.decorate&&GW8.decorate()}],
    ['delete script',()=>{stacks()[0].remove()}],
    ['split',()=>{const s=big(),bl=[...s.children].filter(x=>x.classList.contains('scratch-block'));if(bl.length>1){const n=document.createElement('div');n.className='block-stack';n.dataset.owner=s.dataset.owner;n.style.left='900px';n.style.top='40px';n.appendChild(bl[bl.length-1]);ws.appendChild(n)}}],
    ['clear all',()=>{stacks().forEach(s=>s.remove())}]];
   for(const [name,fn] of edits){await wait(1000);console.log('edit '+name);const L=GW8.history.length;fn();const t1=performance.now();GW8.historyMute=false;await wait(1300);GW8.pushHistory(name);await wait(30);t.push(GW8.history.at(-1).reason);if(GW8.history.length>L)copies.push(copy());else{(out.merged=out.merged||[]).push(name+'/'+GW8.history.at(-1).reason);copies[copies.length-1]=copy();}}
   out.steps=GW8.history.length-h0;out.pushMs=t;
   out.charsPerStep=B.stepChars&&out.book?Math.round((B.stepChars(GW8.history.map(h=>h.state.bk))-chars0)/Math.max(1,out.steps)):Math.round(GW8.history.slice(h0).reduce((a,h)=>a+h.state.workspace.length,0)/Math.max(1,out.steps));
   const n=out.steps;out.undoMs=[];out.built=[];
   for(let i=n-1;i>=0;i--){console.log('undo '+i);const t1=performance.now();await GW8.undo();out.undoMs.push(Math.round(performance.now()-t1));out.built.push(GW8.__bkBuilt);await wait(700);cmp(copies[i],'undo to '+i);}
   out.futureKept=GW8.future.length===n;if(!out.futureKept)out.fails.push('redo steps lost: '+GW8.future.length+' of '+n);
   for(let i=1;i<=n;i++){await GW8.redo();await wait(700);cmp(copies[i],'redo to '+i);}
   out.histEnd=GW8.history.length-h0;if(out.histEnd!==n)out.fails.push('history after redo '+out.histEnd+' vs '+n);
   const ck=B.check({quiet:1});if(!ck.ok)out.fails.push('book check after redo: '+(ck.diffs||[]).slice(0,1));out.blocks=ck.blocks;return out});
  const ok=!r.fails.length&&!errs.length&&r.steps>=4;if(!ok)bad++;
  console.log((ok?'OK  ':'FAIL')+' '+f.replace(/.*\//,'').padEnd(13),'book',r.book?'yes':'no ','blocks',r.blocks,'steps',r.steps,'KB/step',Math.round(r.charsPerStep/1024*10)/10,'undo ms',r.undoMs.join(','),'built',r.built.join(','));
  if(r.merged)console.log('      merged:',r.merged.join(' '));r.fails.slice(0,5).forEach(x=>console.log('     ',x));if(errs.length)console.log('      page errors',errs.slice(0,3));await p.close();}
 console.log(bad?('FAILED on '+bad):'t_undob: all OK');await b.close()})();
