const { chromium } = require('/opt/npm-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});const p=await b.newPage({viewport:{width:1440,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,150)));p.on('dialog',d=>d.dismiss());
await p.goto('file:///home/claude/rel/app.html?dev=1');await p.waitForTimeout(3500);if(process.argv[3]){await p.setInputFiles('#sb3ImportFile',process.argv[3]);await p.waitForTimeout(3000)}
const steps=JSON.parse(process.argv[2]);let i=0;
for(const st of steps){try{if(st.click)await p.click(st.click,{timeout:4000});if(st.text)await p.getByText(st.text,{exact:!!st.exact}).first().click({timeout:4000});if(st.eval)console.log('EVAL',JSON.stringify(await p.evaluate(st.eval)).slice(0,1800));}catch(e){console.log('STEP FAIL',JSON.stringify(st).slice(0,80),e.message.slice(0,120))}
await p.waitForTimeout(st.wait||600);if(st.shot)await p.screenshot({path:st.shot})}
console.log('errs',errs.slice(0,4));await b.close()})();
