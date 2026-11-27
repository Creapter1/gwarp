// Fair benchmark: Turbo Mode OFF (checked), project at 30 FPS like Scratch, 3 runs each, median. Also one Turbo ON run for reference.
const H=require('/tmp/ep2/h.js');const {chromium}=require('playwright');const fs=require('fs');
const DUR=8000,out={};
const med=a=>{const s=[...a].sort((x,y)=>x-y);return s[1];};
async function gwarp(app,proj,turbo){H.APP=app;const t=await H.start('/tmp/ep4/run/fair');await t.p.waitForTimeout(2000);await t.p.mouse.click(700,500);await t.openProject(proj);
 if(turbo)await t.p.evaluate(()=>{Engine.isTurbo=true});
 const cfg=await t.p.evaluate(()=>({turbo:!!Engine.isTurbo,fps:window.GW_SETTINGS?.stepMs?Math.round(1000/window.GW_SETTINGS.stepMs()):null,fast:window.GW_FAST_ON!==false}));
 await t.p.click('#greenFlagBtn');await t.p.waitForTimeout(3000);const f=()=>t.p.evaluate(()=>+Engine.variables.frames);const a=await f(),t0=Date.now();await t.p.waitForTimeout(DUR);const b=await f();
 await t.end();return {rps:+((b-a)/((Date.now()-t0)/1000)).toFixed(1),cfg};}
async function scratch(proj,turbo){const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});const p=await b.newPage({viewport:{width:480,height:360}});
 await p.goto('file:///tmp/ref/index.html');await p.waitForTimeout(500);await p.evaluate(async bytes=>window.ref(bytes),[...fs.readFileSync(proj)]);await p.evaluate(t=>VM.setTurboMode(t),!!turbo);
 const cfg=await p.evaluate(()=>({turbo:VM.runtime.turboMode,fps:VM.runtime.compatibilityMode?30:60}));
 await p.evaluate(()=>VM.greenFlag());await p.waitForTimeout(3000);const g=()=>p.evaluate(()=>+VM.runtime.getTargetForStage().lookupVariableByNameAndType('frames','').value);
 const a=await g(),t0=Date.now();await p.waitForTimeout(DUR);const c=await g();await b.close();return {rps:+((c-a)/((Date.now()-t0)/1000)).toFixed(1),cfg};}
(async()=>{for(const proj of ['/tmp/ep4/3d_math.sb3','/tmp/ep4/3d_pen.sb3']){const name=proj.split('/').pop();out[name]={};
 const runs={'G-Warp v15.70.18':[],'G-Warp v15.69.0':[],'real Scratch 3':[]};let cfgs={};
 for(let r=0;r<3;r++){for(const [k,app] of [['G-Warp v15.70.18','/home/claude/gwarp-t4/app.html'],['G-Warp v15.69.0','/home/claude/gwarp-test/app.html']]){const x=await gwarp(app,proj,false);runs[k].push(x.rps);cfgs[k]=x.cfg;}
  const s=await scratch(proj,false);runs['real Scratch 3'].push(s.rps);cfgs['real Scratch 3']=s.cfg;}
 for(const k in runs)out[name][k]={median:med(runs[k]),runs:runs[k],settings:cfgs[k]};
 out[name]['G-Warp v15.70.18 TURBO ON (reference)']=await gwarp('/home/claude/gwarp-t4/app.html',proj,true);out[name]['real Scratch 3 TURBO ON (reference)']=await scratch(proj,true);
 fs.writeFileSync('/tmp/ep4/fair.json',JSON.stringify(out,null,1));console.log(name,JSON.stringify(out[name]));}})();
