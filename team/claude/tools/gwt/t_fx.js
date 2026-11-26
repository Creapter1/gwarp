const { chromium } = require('/opt/npm-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});const p=await b.newPage({viewport:{width:1440,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///home/claude/rel/app.html');await p.waitForTimeout(3500);await p.setInputFiles('#sb3ImportFile','/home/claude/gwt/fx.sb3');await p.waitForTimeout(3000);
const list=[{},{whirl:200},{fisheye:100},{fisheye:-60},{pixelate:60},{mosaic:20},{color:50},{brightness:40}];let i=0;
for(const fx of list){await p.evaluate(fx=>{const s=Engine.sprites.find(s=>s.name==='Sprite1');s.x=0;s.y=0;s.size=200;s.effects=fx},fx);await p.waitForTimeout(250);await p.locator('#stageCanvas').screenshot({path:`fx${i++}.png`})}
console.log(errs);await b.close()})();
