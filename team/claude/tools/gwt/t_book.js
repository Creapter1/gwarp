// Project Book round trip on one project: page -> Book -> page (same page?) -> Book (same Book?)
const { chromium } = require('/opt/npm-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--use-angle=swiftshader']});const p=await b.newPage({viewport:{width:1440,height:900}});p.on('dialog',d=>d.dismiss());const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,120)));
 await p.goto('file://'+(process.env.APP||'/home/claude/rel/app.html'));await p.waitForTimeout(2500);
 for(const f of process.argv.slice(2)){ if(f!=='-'){await p.setInputFiles('#sb3ImportFile',f);await p.waitForFunction(()=>window.GW&&GW.__sb3Project===true&&document.querySelectorAll('#workspaceCanvas .scratch-block').length>0,null,{timeout:240000}).catch(()=>{});await p.waitForTimeout(f.includes('gh.sb3')||f.includes('big')?7000:3000);}
  const r=await p.evaluate(()=>{const before=document.getElementById('workspaceCanvas').innerHTML.length;const r=GW_BOOK.check({quiet:1});r.pageUntouched=document.getElementById('workspaceCanvas').innerHTML.length===before;return r});
  console.log((r.ok?'OK  ':'DIFF')+' '+f.replace(/.*\//,'').padEnd(14),'scripts',r.scriptsSame+'/'+r.scripts,'blocks',r.blocks,'kinds',r.kinds,'book',r.bookKB+'KB','page',r.pageKB+'KB','read',r.readMs+'ms','write',r.writeMs+'ms',r.sameBook?'':'BOOK DIFFERS',r.pageUntouched?'':'PAGE CHANGED');
  (r.diffs||[]).slice(0,+process.env.N||6).forEach(d=>console.log('     ',d.slice(0,230)));}
 if(errs.length)console.log('page errors',errs.slice(0,3));await b.close()})();
