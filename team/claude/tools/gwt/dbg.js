// node dbg.js app.html project.sb3 "<js before flag>" ms "<js after>"
const { chromium } = require('/opt/npm-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});const p=await b.newPage({viewport:{width:1440,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));p.on('dialog',d=>d.dismiss());
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(3500);await p.setInputFiles('#sb3ImportFile',process.argv[3]);await p.waitForTimeout(3000);
if(process.argv[4])await p.evaluate(process.argv[4]);await p.click('#greenFlagBtn');await p.waitForTimeout(+process.argv[5]||4000);
console.log(JSON.stringify(await p.evaluate(process.argv[6]||'1')),errs.slice(0,3));await b.close()})();
