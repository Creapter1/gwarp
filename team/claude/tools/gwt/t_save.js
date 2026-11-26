// Step 1b b: Save / reopen. For each project: open it, save it (the same data the Save button writes), open the saved file again,
// and the code area must be the very same as before (deep compare with a page copy + the Book's script texts), sprites and variables too.
// usage: node t_save.js a.sb3 b.sb3 ... (PALETTE = one of every block in the palette)   BOOK=0 loads the old way (from the saved page text)
const { chromium } = require('/opt/npm-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--use-angle=swiftshader']});let bad=0;
 for(const f of process.argv.slice(2)){const p=await b.newPage({viewport:{width:1600,height:950}});p.on('dialog',d=>d.dismiss());const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,120)));
  if(process.env.BOOK==='0')await p.addInitScript(()=>{window.GW_SAVE_BOOK=false});
  await p.goto('file://'+(process.env.APP||'/home/claude/rel/app.html')+(f==='PALETTE'?'?dev=1':''));await p.waitForTimeout(3000);
  if(f==='PALETTE'){const cats=await p.evaluate(()=>[...document.querySelectorAll('#gwCategoryRail button.cat-btn')].map(b=>b.dataset.cat));
   for(const c of cats){await p.click('#gwCategoryRail button.cat-btn[data-cat="'+c+'"]').catch(()=>{});await p.waitForTimeout(350);
    await p.evaluate(()=>{const ws=document.getElementById('workspaceCanvas');const have=window.__seen||(window.__seen=new Set());let y=window.__y||40;document.querySelectorAll('#paletteContainer .scratch-block').forEach(pb=>{const key=pb.dataset.type+'|'+(pb.dataset.proc||'')+'|'+(pb.dataset.ext||'')+'|'+pb.textContent.trim().slice(0,30);if(have.has(key)||pb.parentElement.closest('.scratch-block'))return;have.add(key);const cl=pb.cloneNode(true);cl.querySelectorAll('.block-c-body').forEach(x=>x.innerHTML='');const st=document.createElement('div');st.className='block-stack';st.dataset.owner=String(Engine.activeSpriteIndex||0);st.style.left='60px';st.style.top=y+'px';y+=70;st.appendChild(cl);ws.appendChild(st)});window.__y=y});}
   await p.evaluate(()=>{try{GW8.decorate()}catch(e){}try{GW.refreshBlockMenus()}catch(e){}});await p.waitForTimeout(2500);}
  else if(f!=='-'){await p.setInputFiles('#sb3ImportFile',f);await p.waitForFunction(()=>window.GW&&GW.__sb3Project===true&&document.querySelectorAll('#workspaceCanvas .scratch-block').length>0,null,{timeout:240000}).catch(()=>{});await p.waitForTimeout(/gh\.sb3|big|vars/.test(f)?7000:3000);}
  const r=await p.evaluate(async()=>{const ws=document.getElementById('workspaceCanvas'),B=window.GW_BOOK,wait=ms=>new Promise(r=>setTimeout(r,ms)),out={fails:[]};
   const stacks=()=>[...ws.children].filter(s=>s.classList.contains('block-stack'));
   const state=()=>JSON.stringify({sp:Engine.sprites.filter(s=>!s.isClone).map(s=>[s.name,s.x,s.y,s.size,s.direction,s.visible,s.activeCostume,(s.costumes||[]).length,(s.sounds||[]).length,s.localVars||{},s.localLists||{}]),v:window.GW_VARS?GW_VARS.globals():Engine.variables,l:window.GW_VARS?GW_VARS.globalLists():Engine.lists,bd:(Engine.backdrops||[]).length});
   window.GW_SYNC_INPUTS&&GW_SYNC_INPUTS(ws);const before=stacks().map(s=>s.cloneNode(true)),items0=stacks().map(s=>B.itemOf(s)),st0=state();out.blocks=ws.querySelectorAll('.scratch-block').length;out.scripts=before.length;
   let t=performance.now();const d=GW_PROJECT_DATA();out.dataMs=Math.round(performance.now()-t);t=performance.now();const json=JSON.stringify(d);out.textMs=Math.round(performance.now()-t);
   out.fileKB=Math.round(json.length/1024);out.astKB=Math.round(JSON.stringify(d.ast||null).length/1024);out.bookKB=Math.round(JSON.stringify(d.book||null).length/1024);out.htmlKB=Math.round(JSON.stringify(d.stacks||null).length/1024);
   out.astHtml=/"html":/.test(JSON.stringify(d.ast||null));out.astBlocks=(function n(a){return (a||[]).reduce((s,x)=>s+1+n(x.body)+n(x.elseBody),0)})((d.ast&&d.ast.stacks||[]).flatMap(s=>s.blocks));
   const file=new File([json],'t.gwarp.json',{type:'application/json'});t=performance.now();await GW.loadProject(file);out.loadMs=Math.round(performance.now()-t);await wait(out.blocks>1500?6000:2500);
   out.usedBook=window.GW_BOOK&&GW_BOOK.lastLoad||null;
   window.GW_SYNC_INPUTS&&GW_SYNC_INPUTS(ws);const now=stacks(),dd=[];if(now.length!==before.length)dd.push('scripts '+before.length+' vs '+now.length);
   let itemsDiff=0;for(let i=0;i<Math.min(now.length,before.length);i++){if(dd.length<3)B.same(before[i],now[i],'#'+i,dd);if(items0[i][0]==='S'&&B.itemOf(now[i])!==items0[i]){itemsDiff++;if(!out.d1)out.d1=items0[i].slice(0,260)+'  ->  '+B.itemOf(now[i]).slice(0,260)}}
   if(dd.length)out.fails.push('page: '+dd.slice(0,2).join(' ; ').slice(0,400));if(itemsDiff)out.fails.push('book texts differ on '+itemsDiff+' scripts: '+out.d1);
   if(state()!==st0){const a=JSON.parse(st0),b=JSON.parse(state()),w=[];for(const k of ['v','l','bd'])if(JSON.stringify(a[k])!==JSON.stringify(b[k]))w.push(k+': '+JSON.stringify(a[k]).slice(0,90)+' -> '+JSON.stringify(b[k]).slice(0,90));a.sp.forEach((x,i)=>{const y=b.sp[i]||[];x.forEach((q,j)=>{if(JSON.stringify(q)!==JSON.stringify(y[j]))w.push('sprite '+i+' field '+j+': '+JSON.stringify(q).slice(0,70)+' -> '+JSON.stringify(y[j]).slice(0,70))})});if(a.sp.length!==b.sp.length)w.push('sprites '+a.sp.length+' -> '+b.sp.length);out.fails.push('sprites / variables changed: '+w.slice(0,3).join(' | '));}
   const ck=B.check({quiet:1});if(!ck.ok)out.fails.push('book check after load: '+(ck.diffs||[]).slice(0,1));
   // second save must give the same scripts again
   const d2=GW_PROJECT_DATA();if(JSON.stringify(d2.book||null)!==JSON.stringify(d.book||null))out.fails.push('second save: book differs');
   return out});
  const ok=!r.fails.length&&!errs.length;if(!ok)bad++;
  console.log((ok?'OK  ':'FAIL')+' '+f.replace(/.*\//,'').padEnd(13),'blocks',r.blocks,'scripts',r.scripts,'file KB',r.fileKB,'(ast',r.astKB,'book',r.bookKB,'page text',r.htmlKB+')','ast blocks',r.astBlocks,r.astHtml?'ast HAS html':'','save ms',r.dataMs+'+'+r.textMs,'load ms',r.loadMs,'from',JSON.stringify(r.usedBook));
  r.fails.slice(0,5).forEach(x=>console.log('     ',x));if(errs.length)console.log('      page errors',errs.slice(0,3));await p.close();}
 console.log(bad?('FAILED on '+bad):'t_save: all OK');await b.close()})();
