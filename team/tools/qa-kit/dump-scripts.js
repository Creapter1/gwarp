// Print every script of a .sb3 as text (diff two projects with any diff tool).   node dump-scripts.js game.sb3 > game.txt
const { readSb3, scriptsText } = require('./lib/sb3');
(async () => { const { pj } = await readSb3(process.argv[2]); console.log(scriptsText(pj)); })().catch(e => { console.error('FAIL', e.message); process.exit(1); });
