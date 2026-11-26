const { chromium } = require('/opt/npm-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--use-angle=swiftshader']});const p=await b.newPage({viewport:{width:1600,height:1000},deviceScaleFactor:2});p.on('dialog',d=>d.dismiss());
 await p.goto('file:///home/claude/rel/app.html');await p.waitForTimeout(2500);await p.setInputFiles('#sb3ImportFile','/home/claude/gwt/bench3.sb3');
 await p.waitForFunction(()=>window.GW&&GW.__sb3Project===true&&document.querySelectorAll('#workspaceCanvas .scratch-block').length>0,null,{timeout:120000});await p.waitForTimeout(4000);
 const clip={x:300,y:110,width:900,height:800};await p.screenshot({path:'vid/sh_a.png',clip});
 await p.addStyleTag({content:process.argv[2]||'.scratch-block.block-c-shape{filter:none !important}'});await p.waitForTimeout(600);await p.screenshot({path:'vid/sh_b.png',clip});await b.close()})();
