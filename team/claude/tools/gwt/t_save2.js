// Step 1b b, old and broken files: (1) a file saved the OLD way (no Book inside) opens in the new build; (2) a file whose Book is damaged
// or hostile falls back to the saved page text, script by script, and nothing unsafe gets onto the page.   usage: node t_save2.js a.sb3 ...
const { chromium } = require('/opt/npm-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--use-angle=swiftshader']});let bad=0;
 for(const f of process.argv.slice(2)){const p=await b.newPage({viewport:{width:1600,height:950}});p.on('dialog',d=>d.dismiss());const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,120)));
  await p.goto('file://'+(process.env.APP||'/home/claude/rel/app.html'));await p.waitForTimeout(3000);await p.setInputFiles('#sb3ImportFile',f);await p.waitForFunction(()=>window.GW&&GW.__sb3Project===true&&document.querySelectorAll('#workspaceCanvas .scratch-block').length>0,null,{timeout:240000}).catch(()=>{});await p.waitForTimeout(/gh\.sb3|big|vars/.test(f)?7000:3000);
  const r=await p.evaluate(async()=>{const ws=document.getElementById('workspaceCanvas'),B=window.GW_BOOK,wait=ms=>new Promise(r=>setTimeout(r,ms)),out={fails:[],from:[]};
   const stacks=()=>[...ws.children].filter(s=>s.classList.contains('block-stack'));
   window.GW_SYNC_INPUTS&&GW_SYNC_INPUTS(ws);const before=stacks().map(s=>s.cloneNode(true));const big=ws.querySelectorAll('.scratch-block').length>1500;
   const cmp=tag=>{window.GW_SYNC_INPUTS&&GW_SYNC_INPUTS(ws);const now=stacks(),dd=[];if(now.length!==before.length)dd.push('scripts '+before.length+' vs '+now.length);for(let i=0;i<Math.min(now.length,before.length)&&dd.length<3;i++)B.same(before[i],now[i],'#'+i,dd);if(dd.length)out.fails.push(tag+': '+dd.slice(0,2).join(' ; ').slice(0,300));out.from.push(tag+' '+JSON.stringify(B.lastLoad));};
   const load=async d=>{await GW.loadProject(new File([JSON.stringify(d)],'t.gwarp.json'));await wait(big?6000:2500)};
   window.GW_SAVE_BOOK=false;const old=GW_PROJECT_DATA();window.GW_SAVE_BOOK=true;if(old.book)out.fails.push('old way still wrote a Book');if(!/"html":/.test(JSON.stringify(old.ast)))out.fails.push('old way: ast without html');
   await load(old);cmp('old file');if(B.lastLoad.book)out.fails.push('old file used a Book');
   const d=GW_PROJECT_DATA();const n=d.book.scripts.filter(Boolean).length;
   const d1=JSON.parse(JSON.stringify(d));d1.book.kinds=d1.book.kinds.map((k,i)=>i%2?'<img src=x onerror="window.__pwn=1"><script>window.__pwn=1<\/script>':k.replace('<div ','<div onclick="window.__pwn=1" onmouseover="window.__pwn=1" '));
   await load(d1);cmp('hostile Book');if(window.__pwn||ws.querySelector('script,[onclick],[onmouseover],[onerror]'))out.fails.push('unsafe piece on the page');
   const d2=JSON.parse(JSON.stringify(d));d2.book.scripts=d2.book.scripts.map((s,i)=>s&&i%2===0?[{k:99999}]:s);await load(d2);cmp('damaged Book');
   const d3=JSON.parse(JSON.stringify(d));d3.book.scripts.pop();await load(d3);cmp('short Book');if(B.lastLoad.book)out.fails.push('short Book was used');
   await load(d);cmp('good file');if(B.lastLoad.book!==n)out.fails.push('good file: '+B.lastLoad.book+' of '+n+' from the Book');
   return out});
  const ok=!r.fails.length&&!errs.length;if(!ok)bad++;console.log((ok?'OK  ':'FAIL')+' '+f.replace(/.*\//,'').padEnd(12),r.from.join(' | '));r.fails.slice(0,5).forEach(x=>console.log('     ',x));if(errs.length)console.log('      page errors',errs.slice(0,3));await p.close();}
 console.log(bad?('FAILED on '+bad):'t_save2: all OK');await b.close()})();
