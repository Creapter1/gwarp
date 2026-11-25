// Speed test: runs bench.sb3 in the real Scratch engine and in G-Warp until "zz_done" (or the time limit) and prints the timings.
const { chromium } = require('/opt/npm-tools/node_modules/playwright');const fs=require('fs');
const sb3=process.argv[2],app=process.argv[3]||'/home/claude/rel/app.html',limit=+process.argv[4]||120000,only=process.argv[5]||'';
const pick=v=>Object.fromEntries(Object.entries(v).filter(([k])=>/^[TC]\d_|zz_done|^len$|^k$|^n$|^s$|^s2$/.test(k)));
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--use-angle=swiftshader']});const out={};
if(only!=='g'){const p=await b.newPage();await p.goto('file:///home/claude/ref/ref.html');await p.evaluate(async d=>{await window.boot(new Uint8Array(d).buffer)},[...fs.readFileSync(sb3)]);await p.waitForTimeout(500);await p.evaluate(()=>window.vm.greenFlag());
 const t0=Date.now();while(Date.now()-t0<limit){await p.waitForTimeout(500);if(await p.evaluate(()=>window.vars().zz_done==='yes'))break}out.scratch=pick(await p.evaluate(()=>window.vars()));await p.close()}
if(only!=='s'){const g=await b.newPage({viewport:{width:1440,height:900}});g.on('dialog',d=>d.dismiss());await g.goto('file://'+app);await g.waitForTimeout(3500);await g.setInputFiles('#sb3ImportFile',sb3);await g.waitForTimeout(3000);await g.click('#greenFlagBtn');
 const t0=Date.now();while(Date.now()-t0<limit){await g.waitForTimeout(500);if(await g.evaluate(()=>window.Engine.variables.zz_done==='yes'))break}out.gwarp=pick(await g.evaluate(()=>({...window.Engine.variables})))}
const ks=Object.keys(out.scratch||out.gwarp);for(const k of ks){const s=out.scratch?out.scratch[k]:'',g=out.gwarp?out.gwarp[k]:'';let r='';if(/^T/.test(k)&&s&&g)r=(g/s).toFixed(1)+'x slower';if(/^C/.test(k)&&s&&g)r=(s/g).toFixed(1)+'x fewer';console.log(k.padEnd(24),String(typeof s==='number'?+s.toFixed(3):s).padEnd(22),String(typeof g==='number'?+g.toFixed(3):g).padEnd(22),r)}
await b.close()})();
