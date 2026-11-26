const { chromium } = require('/opt/npm-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});const p=await b.newPage({viewport:{width:1440,height:900}});p.on('dialog',d=>d.dismiss());
await p.goto('file://'+(process.argv[3]||'/home/claude/rel/app.html'));await p.waitForTimeout(3500);await p.setInputFiles('#sb3ImportFile','/home/claude/gwt/'+(process.argv[4]||'par.sb3'));await p.waitForTimeout(3000);await p.click('#greenFlagBtn');await p.waitForTimeout(3500);
console.log(JSON.stringify(await p.evaluate(process.argv[2])));await b.close()})();
