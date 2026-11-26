require('./met.js')(process.argv[2]||'/home/claude/rel/app.html','/home/claude/gwt/stress.sb3',async(p,meas)=>{await p.click('#greenFlagBtn');await p.waitForTimeout(2500);
await p.evaluate(()=>{window.__f=[];let l=performance.now();(function t(){const n=performance.now();__f.push(n-l);l=n;requestAnimationFrame(t)})()});const m=await meas(4000);
const r=await p.evaluate(()=>{const f=__f.sort((a,b)=>a-b);return{raf:(f.length/4)|0,p99:f[(f.length*.99)|0]|0,efps:Engine.actualFps,clones:Engine.sprites.filter(s=>s.isClone).length,threads:Engine.threads.length}});
await p.screenshot({path:'stress.png'});return{m,r}}).then(r=>console.log(JSON.stringify(r)));
