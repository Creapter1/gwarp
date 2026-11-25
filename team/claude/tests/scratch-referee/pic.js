// Picture test: the same .sb3 in the real Scratch engine and in G-Warp, stage pictures saved for a pixel comparison.
// Usage: node pic.js project.sb3 ms app.html outPrefix
const { chromium } = require('/opt/npm-tools/node_modules/playwright');const fs=require('fs');
(async()=>{const [sb3,ms,app,out]=[process.argv[2],+process.argv[3]||3000,process.argv[4]||'/home/claude/rel/app.html',process.argv[5]||'/home/claude/gwt/pic'];
const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--use-angle=swiftshader']});
const p=await b.newPage({viewport:{width:600,height:480}});await p.goto('file:///home/claude/ref/ref.html');
await p.evaluate(async d=>{await window.boot(new Uint8Array(d).buffer)},[...fs.readFileSync(sb3)]);await p.waitForTimeout(500);await p.evaluate(()=>window.vm.greenFlag());await p.waitForTimeout(ms);
await p.evaluate(()=>window.vm.renderer.draw());await p.locator('#c').screenshot({path:out+'_scratch.png'});
const g=await b.newPage({viewport:{width:1440,height:900}});g.on('dialog',d=>d.dismiss());await g.goto('file://'+app);await g.waitForTimeout(3500);await g.setInputFiles('#sb3ImportFile',sb3);await g.waitForTimeout(3000);await g.click('#greenFlagBtn');await g.waitForTimeout(ms);
const url=await g.evaluate(()=>{const cv=document.getElementById('stageCanvas'),pc=document.getElementById('penCanvas');const c=document.createElement('canvas');c.width=480;c.height=360;const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,480,360);x.drawImage(cv,0,0,480,360);return c.toDataURL()});
fs.writeFileSync(out+'_gwarp.png',Buffer.from(url.split(',')[1],'base64'));await b.close()})();
