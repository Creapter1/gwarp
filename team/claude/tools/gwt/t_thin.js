// thin menus: same picked names and same block widths as full menus; pop-up, keys, code set, undo all work
const { chromium } = require('/opt/npm-tools/node_modules/playwright');
const SB=process.argv[2]||'/home/claude/priv/gh.sb3';
async function load(thin){const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--use-angle=swiftshader']});const p=await b.newPage({viewport:{width:1440,height:900}});p.on('dialog',d=>d.dismiss());const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,120)));
 if(!thin)await p.addInitScript(()=>{window.GW_THIN_MENUS=false});await p.goto('file:///home/claude/rel/app.html');await p.waitForTimeout(2500);await p.setInputFiles('#sb3ImportFile',SB);
 await p.waitForFunction(()=>window.GW&&GW.__sb3Project===true&&document.querySelectorAll('#workspaceCanvas .scratch-block').length>0,null,{timeout:240000});await p.waitForTimeout(6000);return {b,p,errs}}
const grab=p=>p.evaluate(()=>[...document.querySelectorAll('#workspaceCanvas .block-select')].map(s=>({v:s.value,w:Math.round(s.getBoundingClientRect().width*10)/10,t:s.hasAttribute('data-gw-thin')?1:0,n:s.options.length})));
(async()=>{let ok=0,bad=0;const T=(name,c,extra)=>{if(c)ok++;else{bad++;console.log('FAIL',name,extra===undefined?'':JSON.stringify(extra).slice(0,300))}};
 const A=await load(false);const a=await grab(A.p);await A.b.close();
 const B=await load(true);const p=B.p;const t=await grab(p);
 T('same count',a.length===t.length,[a.length,t.length]);let dv=0,dw=0,thin=0,ex=null;for(let i=0;i<Math.min(a.length,t.length);i++){if(a[i].v!==t[i].v)dv++;if(Math.abs(a[i].w-t[i].w)>0.6){dw++;ex=ex||[i,a[i],t[i]]}thin+=t[i].t}
 T('same picked names',dv===0,dv);T('same widths',dw===0,[dw,ex]);T('menus are thin',thin>100,thin);console.log('menus',t.length,'thin',thin,'options full',a.reduce((s,x)=>s+x.n,0),'thin',t.reduce((s,x)=>s+x.n,0));
 // pop-up lists every name, picking works, undo brings the old one back
 const r1=await p.evaluate(async()=>{const st=[...document.querySelectorAll('#workspaceCanvas > .block-stack')].find(s=>!s.classList.contains('gw8-other-sprite')&&s.querySelector('[data-type="set_var"] .block-select[data-gw-thin]'));const s=st.querySelector('[data-type="set_var"] .block-select[data-gw-thin]');s.scrollIntoView({block:'center'});s.id='tThin';const names=GW.__thinNames(s);return {old:s.value,n:names.length,other:names.find(x=>x!==s.value&&![...s.options].some(o=>o.value===x))}});
 await p.click('#tThin');await p.waitForTimeout(300);const pop=await p.evaluate(()=>document.querySelectorAll('#gwSelPop li').length);T('pop-up lists all names',pop===r1.n,[pop,r1.n]);
 await p.fill('#gwSelPop input',r1.other);await p.waitForTimeout(150);await p.keyboard.press('Enter');await p.waitForTimeout(900);
 const v2=await p.evaluate(()=>document.getElementById('tThin')?.value);T('picked from pop-up',v2===r1.other,[v2,r1.other]);
 await p.waitForTimeout(1500);console.log('hist',await p.evaluate(()=>[GW8.history.length,GW8.historyIndex,typeof GW8.undo,document.querySelectorAll('#workspaceCanvas .block-select').length]));await p.evaluate(()=>GW8.undo&&GW8.undo());await p.waitForTimeout(1500);
 const v3=await p.evaluate(()=>{const s=[...document.querySelectorAll('#workspaceCanvas .block-select')];return s.map(x=>x.value)});T('undo restores every menu',v3.length===a.length&&v3.every((v,i)=>v===a[i].v),[v3.length,a.length,v3.findIndex((v,i)=>v!==(a[i]||{}).v)]);
 await p.evaluate(()=>GW8.redo&&GW8.redo());await p.waitForTimeout(1500);
 // code sets a name the thin menu does not hold; keyboard; new variable; rename
 const r2=await p.evaluate(async other=>{const out={};const all=[...document.querySelectorAll('#workspaceCanvas [data-type="change_var"] .block-select[data-gw-thin]')];const s=all[0];const names=GW.__thinNames(s);const want=names.find(x=>![...s.options].some(o=>o.value===x));s.value=want;out.codeSet=s.value===want;s.value='__nope__zz';out.unknown=s.value;s.value=want;
  out.has=GW.__optHas(s,names[3])&&!GW.__optHas(s,'__nope__zz');out.pick=GW.__optPick(s,names[5].toUpperCase())===names[5]||names[5].toUpperCase()===names[5];
  GW.createVariable('zz thin test');out.newVar=GW.__thinNames(s).includes('zz thin test');s.value='zz thin test';out.setNew=s.value==='zz thin test';
  const k=all[1];k.id='tKey';out.kOld=k.value;out.kNames=GW.__thinNames(k);return out},r1.other);
 T('code sets another name',r2.codeSet);T('unknown name acts like a normal menu',r2.unknown==='',r2.unknown);T('optHas / optPick',r2.has&&r2.pick,[r2.has,r2.pick]);T('new variable shows up',r2.newVar&&r2.setNew);
 await p.focus('#tKey');await p.keyboard.press('ArrowDown');await p.waitForTimeout(300);const k=await p.evaluate(()=>{const s=document.getElementById('tKey');return {v:s.value,n:s.options.length,thin:s.hasAttribute('data-gw-thin')}});
 const idx=r2.kNames.indexOf(r2.kOld);T('a key press gives the full menu back, same name picked',k.v===r2.kOld&&!k.thin&&k.n===r2.kNames.length,[k,r2.kOld,r2.kNames.length]);
 await p.evaluate(()=>GW.refreshBlockMenus());const k2=await p.evaluate(()=>{const s=document.getElementById('tKey');return {n:s.options.length,thin:s.hasAttribute('data-gw-thin')}});T('menu is thin again after a refresh',k2.thin&&k2.n<=3,k2);
 T('no page errors',B.errs.length===0,B.errs);console.log(ok+'/'+(ok+bad)+' thin-menu checks');await B.b.close()})();
