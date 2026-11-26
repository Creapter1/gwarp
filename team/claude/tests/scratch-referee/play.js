// node play.js project.sb3 "<js before flag>" taps ms shot.png "<js at end>"
const { chromium } = require('/opt/npm-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--use-angle=swiftshader']});const p=await b.newPage({viewport:{width:1440,height:900}});p.on('dialog',d=>d.dismiss());const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
await p.goto('file://'+(process.env.APP||'/home/claude/rel/app.html'));await p.waitForTimeout(3500);await p.setInputFiles('#sb3ImportFile',process.argv[2]);
await p.waitForFunction(()=>window.GW&&GW.__sb3Project===true&&document.querySelectorAll('#workspaceCanvas .scratch-block').length>0,null,{timeout:180000});await p.waitForTimeout(6000);
if(process.argv[3])await p.evaluate(process.argv[3]);await p.click('#greenFlagBtn');await p.waitForTimeout(2000);
for(let i=0;i<(+process.argv[4]||0);i++){await p.keyboard.down(' ');await p.waitForTimeout(200);await p.keyboard.up(' ');await p.waitForTimeout(1300);}
await p.waitForTimeout(+process.argv[5]||5000);if(process.argv[6])await p.locator('#stageCanvas').screenshot({path:process.argv[6]}).catch(()=>p.screenshot({path:process.argv[6]}));
console.log(JSON.stringify(process.argv[7]?await p.evaluate(process.argv[7]):null),errs.slice(0,3));await b.close()})();
