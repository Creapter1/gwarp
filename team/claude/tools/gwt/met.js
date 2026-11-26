const { chromium } = require('/opt/npm-tools/node_modules/playwright');
module.exports=async function(app,sb3,fn){const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
const p=await b.newPage({viewport:{width:1440,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));p.on('dialog',d=>d.dismiss());
await p.goto('file://'+app);await p.waitForTimeout(3500);if(sb3){await p.setInputFiles('#sb3ImportFile',sb3);await p.waitForTimeout(3000)}
const c=await p.context().newCDPSession(p);await c.send('Performance.enable');
const m=async()=>Object.fromEntries((await c.send('Performance.getMetrics')).metrics.map(x=>[x.name,x.value]));
const meas=async(ms)=>{const a=await m();await p.waitForTimeout(ms);const z=await m();const o={};for(const k of ['TaskDuration','ScriptDuration','LayoutDuration','RecalcStyleDuration'])o[k.replace('Duration','')]=+((z[k]-a[k])/ms*100000|0)/1000;o.layouts=z.LayoutCount-a.LayoutCount;o.recalcs=z.RecalcStyleCount-a.RecalcStyleCount;o.nodes=z.Nodes;return o};
const r=await fn(p,meas);r.errs=[...new Set(errs)].slice(0,4);await b.close();return r};
if(require.main===module)module.exports(process.argv[2]||'/home/claude/rel/app.html','/home/claude/gwt/move.sb3',async(p,meas)=>{const idle=await meas(4000);await p.click('#greenFlagBtn');await p.waitForTimeout(500);const run=await meas(4000);return{idle,run}}).then(r=>console.log(JSON.stringify(r,null,0)));
