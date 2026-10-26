// Where does Scratch draw each costume? (finds costumes that "jump" when they switch)
//   node costume-bounds.js game.sb3 "Sprite name" ["costume 1" "costume 2" ...]   (no names = all costumes)
// Every costume is drawn at x 0, y 0. Costumes of one animation should have about the same left/bottom/top numbers.
const { loadInScratch } = require('./lib/scratch');
(async () => {
  const [file, sprite, ...names] = process.argv.slice(2); const { browser, page } = await loadInScratch(file);
  await page.waitForTimeout(1500);
  const rows = await page.evaluate(async ([sprite, names]) => { const t = vm.runtime.targets.find(x => x.isOriginal && x.getName() === sprite); if (!t) return ['no sprite ' + sprite];
    t.setVisible(true); t.setXY(0, 0); const list = names.length ? names : t.getCostumes().map(c => c.name); const out = [];
    for (const n of list) { const i = t.getCostumeIndexByName(n); if (i < 0) { out.push(n + ' MISSING'); continue; } t.setCostume(i); renderer.draw(); await new Promise(r => setTimeout(r, 50));
      const b = renderer.getBounds(t.drawableID); out.push(`${n.padEnd(28)} left ${b.left.toFixed(1)}  right ${b.right.toFixed(1)}  bottom ${b.bottom.toFixed(1)}  top ${b.top.toFixed(1)}`); }
    return out; }, [sprite, names]);
  console.log(rows.join('\n')); await browser.close();
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
