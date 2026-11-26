// who adds the doubled define stacks during undo? log a stack trace for stacks appended to the workspace during GW8.undo()
const { chromium } = require('/opt/npm-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--use-angle=swiftshader']});const p=await b.newPage({viewport:{width:1440,height:900}});p.on('dialog',d=>d.dismiss());
 await p.goto('file:///home/claude/rel/app.html');await p.waitForTimeout(2500);await p.setInputFiles('#sb3ImportFile',process.argv[2]||'/home/claude/priv/gh.sb3');
 await p.waitForFunction(()=>window.GW&&GW.__sb3Project===true&&document.querySelectorAll('#workspaceCanvas .scratch-block').length>0,null,{timeout:240000});await p.waitForTimeout(6000);
 const r=await p.evaluate(async()=>{const wc=document.getElementById('workspaceCanvas');const log={};const wrap=name=>{const o=Node.prototype[name];Node.prototype[name]=function(n){if(this===wc&&n&&n.classList&&n.classList.contains('block-stack')){const s=new Error().stack.split('\n').slice(2,7).map(x=>x.trim().replace(/file:\/\/\/home\/claude\/rel\//,'')).join(' < ');log[s]=(log[s]||0)+1}return o.apply(this,arguments)};return ()=>{Node.prototype[name]=o}};const u=[wrap('appendChild'),wrap('insertBefore')];const oa=Element.prototype.append;
  await GW8.undo();await new Promise(r=>setTimeout(r,2500));u.forEach(f=>f());return {log,stacks:wc.querySelectorAll(':scope > .block-stack').length}});
 console.log(JSON.stringify(r,null,1).slice(0,2500));await b.close()})();
