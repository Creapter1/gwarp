const { chromium } = require('/opt/npm-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
const p=await b.newPage({viewport:{width:1440,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
await p.goto('file:///home/claude/rel/app.html');await p.waitForTimeout(3500);
await p.setInputFiles('#sb3ImportFile','/home/claude/gwt/move.sb3');await p.waitForTimeout(2500);
const out={};
for(const mode of [false,true]){
 await p.evaluate(m=>{GW_SETTINGS.setSmooth(m);window.__d=[];if(!window.__w){window.__w=1;const o=GW.drawOrder;GW.drawOrder=function(){const r=o?o.apply(this,arguments):Engine.sprites;const s=Engine.sprites.find(s=>s.name==='Sprite1');__d.push(s.x);return r}}},mode);
 await p.click('#greenFlagBtn');await p.waitForTimeout(700);
 out[mode?'smooth':'plain']=await p.evaluate(()=>{const d=__d.slice();const s=Engine.sprites.find(s=>s.name==='Sprite1');return{draws:d.length,xs:d.slice(2,14).map(v=>+v.toFixed(1)),realX:s.x,propX:document.getElementById('propX').value}});
 await p.click('#stopBtn');await p.waitForTimeout(300);
 out[(mode?'smooth':'plain')+'After']=await p.evaluate(()=>{const s=Engine.sprites.find(s=>s.name==='Sprite1');return{x:s.x,int:Number.isInteger(s.x)}});
}
console.log(JSON.stringify(out),errs);await b.close()})();
