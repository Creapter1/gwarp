// node t_rename.js -> Breaking G-Warp ep. 2: renaming a sprite with real keys
const { chromium } = require('/opt/npm-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});const p=await b.newPage({viewport:{width:1500,height:900}});p.on('dialog',d=>d.dismiss());
await p.goto('file://'+(process.env.APP||'/home/claude/rel/app.html'));await p.waitForTimeout(4000);
const nm=()=>p.evaluate(()=>[document.getElementById('propName').value,Engine.sprites[Engine.activeSpriteIndex].name]);
await p.click('#propName');await p.keyboard.press('Control+A');await p.keyboard.press('Backspace');await p.keyboard.type('Bob');await p.keyboard.press('Enter');await p.waitForTimeout(400);const a=await nm();
// a second sprite, then try to give it the same name, then a name with spaces at the end
await p.evaluate(()=>{const s=Engine.sprites[0];Engine.sprites.push({...s,name:'Other',costumes:s.costumes,localVars:{},localLists:{}});Engine.activeSpriteIndex=Engine.sprites.length-1;renderSpritesGrid();updatePropertyInputs()});
await p.click('#propName');await p.keyboard.press('Control+A');await p.keyboard.type('Bob');await p.keyboard.press('Enter');await p.waitForTimeout(400);const d=await nm();
await p.click('#propName');await p.keyboard.press('Control+A');await p.keyboard.type('Twin   ');await p.keyboard.press('Enter');await p.waitForTimeout(400);const t=await nm();
await p.click('#propName');await p.keyboard.press('Control+A');await p.keyboard.press('Backspace');await p.keyboard.press('Enter');await p.waitForTimeout(400);const e=await nm();
console.log(JSON.stringify({rename_to_Bob:a,duplicate_Bob_refused:d,spaces_trimmed:t.map(x=>'['+x+']'),empty_refused:e}));await b.close()})();
