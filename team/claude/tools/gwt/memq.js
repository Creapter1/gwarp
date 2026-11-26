// who holds the page nodes that are not on the page? (Runtime.queryObjects on Node.prototype)
const { chromium } = require('/opt/npm-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--use-angle=swiftshader']});const p=await b.newPage({viewport:{width:1440,height:900}});p.on('dialog',d=>d.dismiss());
const c=await p.context().newCDPSession(p);await c.send('Performance.enable');await c.send('HeapProfiler.enable');
await p.goto('file://'+(process.env.APP||'/home/claude/rel/app.html'));await p.waitForTimeout(3000);
await p.setInputFiles('#sb3ImportFile',process.argv[2]);
await p.waitForFunction(()=>window.GW&&GW.__sb3Project===true&&document.querySelectorAll('#workspaceCanvas .scratch-block').length>0,null,{timeout:240000});
await p.waitForTimeout(8000);await c.send('HeapProfiler.collectGarbage');await p.waitForTimeout(1500);
const proto=(await c.send('Runtime.evaluate',{expression:'Node.prototype'})).result.objectId;
const arr=(await c.send('Runtime.queryObjects',{prototypeObjectId:proto})).objects.objectId;
const r=await c.send('Runtime.callFunctionOn',{objectId:arr,returnByValue:true,functionDeclaration:`function(){const out={total:this.length,connected:0,kinds:{},roots:{}};const rootOf=n=>{let r=n;while(r.parentNode)r=r.parentNode;return r};const seen=new Map();
 for(const n of this){try{n.isConnected}catch(e){continue}if(n.isConnected){out.connected++;continue}const k=n.nodeType===1?n.tagName+'.'+String(n.className&&n.className.baseVal!==undefined?n.className.baseVal:n.className).split(' ')[0]:'#'+n.nodeType;out.kinds[k]=(out.kinds[k]||0)+1;const r=rootOf(n);let d=seen.get(r);if(!d){d={n:0,desc:r.nodeType===1?(r.tagName+'.'+String(r.className).slice(0,50)+'#'+(r.id||'')+' type='+(r.dataset&&r.dataset.type||'')+' owner='+(r.dataset&&r.dataset.owner||'')):'#'+r.nodeType+' '+(r.nodeType===11?(r.host?'shadow of '+r.host.tagName:'fragment kids='+r.childNodes.length):String(r.nodeValue).slice(0,30))};seen.set(r,d)}d.n++}
 out.kinds=Object.entries(out.kinds).sort((a,b)=>b[1]-a[1]).slice(0,14);const rs=[...seen.values()].sort((a,b)=>b.n-a.n);out.rootCount=rs.length;out.roots=rs.slice(0,14);const g={};rs.forEach(x=>{const k=x.desc.replace(/owner=\\d+/,'owner=N').slice(0,60);g[k]=g[k]||{roots:0,nodes:0};g[k].roots++;g[k].nodes+=x.n});out.groups=Object.entries(g).sort((a,b)=>b[1].nodes-a[1].nodes).slice(0,12);return out}`});
console.log(r.exceptionDetails?JSON.stringify(r.exceptionDetails).slice(0,600):JSON.stringify(r.result.value,null,1).slice(0,5000));const m=Object.fromEntries((await c.send('Performance.getMetrics')).metrics.map(x=>[x.name,x.value]));console.log('Nodes counter',m.Nodes);await b.close()})();
