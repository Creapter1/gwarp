const { chromium } = require('/opt/npm-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
const p=await b.newPage({viewport:{width:1440,height:900}});const errs=[],cons=[],fail=[];
p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.on('console',m=>{if(m.type()=='error'||m.type()=='warning')cons.push(m.type()+': '+m.text().slice(0,160))});
p.on('requestfailed',r=>fail.push(r.url().slice(0,90)));
const t0=Date.now();await p.goto('file:///home/claude/rel/app.html');await p.waitForTimeout(4000);
const info=await p.evaluate(()=>({load:performance.now()|0,build:window.GW_BUILD,engine:!!window.Engine,sprites:window.Engine?.sprites?.length,keys:Object.keys(window.Engine||{}).length,dom:document.querySelectorAll('*').length,scripts:document.scripts.length}));
console.log(JSON.stringify(info));console.log('PAGE ERRORS',errs.length,[...new Set(errs)].slice(0,15));console.log('CONSOLE',cons.length,[...new Set(cons)].slice(0,15));console.log('FAILED REQ',[...new Set(fail)]);
await p.screenshot({path:'boot.png'});await b.close()})();
