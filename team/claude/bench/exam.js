const H=require('/tmp/ep2/h.js');const fs=require('fs');(async()=>{const exp=JSON.parse(fs.readFileSync('/tmp/ep3/exam_expected.json'));const runs=[];
for(let run=2;run<=2;run++){const t=await H.start('/tmp/ep3/run/exam'+run);await t.p.waitForTimeout(5000);await t.p.mouse.click(700,500);await t.openProject('/tmp/ep3/exam.sb3');
 await t.p.click('#greenFlagBtn');let got=null;for(let i=0;i<40;i++){await t.p.waitForTimeout(250);got=await t.p.evaluate(()=>{const o={};for(const[k,v]of Object.entries(Engine.variables))o[k]=v===undefined?'undefined':(typeof v==='number'&&Object.is(v,-0))?'-0':String(v);return o});if(got.zz_done==='yes')break;}
 if(run===1){await t.cat('Variables').catch(()=>{});await t.shot('exam-done');}
 const bad=[];for(const[k,v]of Object.entries(exp)){if(got[k]!==v)bad.push([k,v,got[k]]);}runs.push(bad.map(b=>b[0]).join(','));
 console.log('run',run,'done:',got.zz_done,'| checks',Object.keys(exp).length,'| different from Scratch:',bad.length);if(run===1)for(const b of bad)console.log('  ',b[0],'Scratch=',JSON.stringify(b[1]),'G-Warp=',JSON.stringify(b[2]));
 console.log('  errors:',JSON.stringify(t.log.filter(l=>l.kind==='ERROR').slice(0,3)));await t.end();}
console.log('differences:',runs[0]);})();
