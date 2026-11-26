const { chromium } = require('/opt/npm-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--use-angle=swiftshader']});
for(const app of ['app.html','app-fast.html']){const g=await b.newPage({viewport:{width:1440,height:900}});g.on('dialog',d=>d.dismiss());await g.goto('file:///home/claude/x2/'+app);await g.waitForTimeout(3000);await g.setInputFiles('#sb3ImportFile','/tmp/q2/q2.sb3');await g.waitForTimeout(3000);
await g.evaluate(()=>{window.__f=0;const f=()=>{window.__f++;requestAnimationFrame(f)};f();});await g.click('#greenFlagBtn');
await g.waitForFunction(()=>Engine.variables.zz_done==='yes',null,{timeout:30000});const v=await g.evaluate(()=>Object.entries(Engine.variables).filter(([k])=>/^t\d/.test(k)).map(([k,x])=>(+x).toFixed(3)).join(' '));console.log(app.padEnd(14),v);await g.close()}
await b.close()})();
