const { chromium } = require('/opt/npm-tools/node_modules/playwright');const exp=require('./parity53.json');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
const p=await b.newPage({viewport:{width:1440,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.on('dialog',d=>d.dismiss());
await p.goto('file://'+require('path').resolve(process.argv[2]));await p.waitForTimeout(3500);
await p.setInputFiles('#sb3ImportFile',require('path').join(__dirname,'parity53.sb3'));await p.waitForTimeout(3000);
await p.click('#greenFlagBtn');await p.waitForTimeout(4000);
const got=await p.evaluate(()=>({v:Engine.variables,l:Engine.lists,fx:(()=>{const s=Engine.sprites.find(s=>s.name==='Sprite1');return JSON.stringify(s.effects||s.fx||{})})()}));
const bad=[];for(const k in exp){if(String(got.v[k])!==exp[k])bad.push(`${k}: got ${JSON.stringify(got.v[k])} want ${exp[k]}`)}
console.log('FAIL',bad.length,'/',Object.keys(exp).length);console.log(bad.join('\n'));console.log('list',JSON.stringify(got.l),got.fx,errs.slice(0,3));
if(process.argv[3]){const j=await p.evaluate(async()=>{const r=await GW_FILES.buildSb3();const z=await JSZip.loadAsync(await r.blob.arrayBuffer());return await z.file('project.json').async('string')});require('fs').writeFileSync('out.json',j)}
await b.close()})();
