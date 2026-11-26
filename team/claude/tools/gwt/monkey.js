const { chromium } = require('/opt/npm-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--autoplay-policy=no-user-gesture-required']});
const ctx=await b.newContext({viewport:{width:1440,height:900},acceptDownloads:true});const p=await ctx.newPage();const errs={};let last='';
p.on('pageerror',e=>{const k=(e.message+' @ '+((e.stack||'').split('\n')[1]||'').trim()).slice(0,230);(errs[k]=errs[k]||[]).push(last)});
p.on('console',m=>{if(m.type()=='error'&&!/ERR_FILE_NOT_FOUND|net::|favicon/.test(m.text())){const k='C: '+m.text().slice(0,200);(errs[k]=errs[k]||[]).push(last)}});
p.on('dialog',d=>d.dismiss().catch(()=>{}));p.on('popup',x=>x.close().catch(()=>{}));
await p.goto('file://'+(process.argv[2]||'/home/claude/rel/app.html'));await p.waitForTimeout(3500);
const seen=new Set();let clicks=0;const t0=Date.now();
for(let round=0;round<6&&Date.now()-t0<150000;round++){
 const items=await p.evaluate(()=>{const out=[];document.querySelectorAll('button,[role=button],[role=tab],[role=menuitem],.tab-btn,[data-category],[data-tab],select').forEach((el,i)=>{const r=el.getBoundingClientRect();if(r.width<6||r.height<6||r.bottom<0||r.top>900||r.right<0||r.left>1440)return;const st=getComputedStyle(el);if(st.visibility==='hidden'||st.display==='none'||el.disabled)return;const top=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);if(!top||!(el===top||el.contains(top)||top.contains(el)))return;const t=(el.id||'')+'|'+(el.getAttribute('aria-label')||el.title||el.textContent||'').trim().slice(0,30)+'|'+(el.dataset.category||el.dataset.tab||'');if(/delete|remove|clear all|new project|reset|report|github|sign|share|lan|fullscreen|import|open|load|upload|record|camera|mic/i.test(t))return;out.push({t,x:r.left+r.width/2,y:r.top+r.height/2})});return out});
 for(const it of items){if(seen.has(it.t))continue;seen.add(it.t);last=it.t;try{await p.mouse.click(it.x,it.y);clicks++;await p.waitForTimeout(120)}catch(e){}
  if(clicks%25===0){await p.keyboard.press('Escape').catch(()=>{})}}
 await p.keyboard.press('Escape').catch(()=>{});await p.waitForTimeout(300)}
const alive=await p.evaluate(()=>({ok:!!window.Engine,sprites:Engine.sprites.length,run:Engine.isRunning})).catch(e=>({dead:String(e).slice(0,100)}));
console.log('clicks',clicks,'unique',seen.size,JSON.stringify(alive));for(const k in errs)console.log(errs[k].length+'x',k,'| after:',[...new Set(errs[k])].slice(0,2).join(' ; '));
await p.screenshot({path:'monkey.png'});await b.close()})();
