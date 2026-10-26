// v15.56.0: blocks made by G-Spark AI have PURPLE electricity, the user's own blocks GREEN - also after undo and save + reopen.
const { chromium } = require('playwright'); const { prep } = require('./harness'); const path = require('path'), fs = require('fs'), os = require('os');
(async () => {
  const b = await chromium.launch(); const errs = [];
  const open = async () => { const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); p.on('pageerror', e => errs.push(e.message));
    await prep(p); await p.addInitScript(() => { delete window.showOpenFilePicker; }); await p.goto('file://' + path.resolve(process.argv[2])); await p.waitForTimeout(4000); return p; };
  const ok = (c, m, v) => console.log((c ? 'PASS ' : 'FAIL ') + m, v === undefined ? '' : JSON.stringify(v));
  let p = await open();
  await p.click('#gwSparkBtn'); await p.fill('#gwSparkAsk', 'make it jump'); await p.keyboard.press('Enter'); await p.waitForTimeout(800);
  const wire = sel => p.evaluate(s => { const e = document.querySelector(s); return e ? getComputedStyle(e, '::before').backgroundImage : ''; }, sel);
  const r = await p.evaluate(() => ({ marked: GW_AI_MARK.count(), all: document.querySelectorAll('#workspaceCanvas .block-stack .scratch-block').length }));
  ok(r.marked > 0 && r.marked === r.all, 'every block G-Spark built is marked', r);
  const aiWire = await wire('#workspaceCanvas .scratch-block.block-c-shape[data-gw-ai] > .block-c-body');
  ok(/a855f7|9333ea/i.test(aiWire) && !/4ade80/i.test(aiWire), 'AI C-block electricity is PURPLE');
  // the user adds their own forever block into the AI script (cloned from the palette = a user block)
  await p.evaluate(() => { const t = document.querySelector('#paletteContainer .scratch-block[data-type="forever"]'); const c = t.cloneNode(true); delete c.dataset.gwAi;
    const st = document.querySelector('#workspaceCanvas .block-stack'); st.appendChild(c); GW8.decorate?.(); GW8.pushHistory?.('user block'); });
  const userWire = await wire('#workspaceCanvas .block-stack > .scratch-block.block-c-shape:not([data-gw-ai]) > .block-c-body');
  ok(/4ade80/i.test(userWire) && !/a855f7/i.test(userWire), "the user's own block in the same script stays GREEN");
  const plain = await p.evaluate(() => { const e = document.querySelector('#workspaceCanvas .scratch-block[data-gw-ai]:not(.block-c-shape)'); return e ? getComputedStyle(e).boxShadow : ''; });
  ok(/168, 85, 247|a855f7/i.test(plain), 'AI blocks without a wire get the purple spark edge', plain.slice(0, 60));
  await p.evaluate(() => GW8.undo()); await p.waitForTimeout(500);
  ok(await p.evaluate(() => GW_AI_MARK.count()) === r.marked, 'undo of the user change keeps the AI marks');
  await p.evaluate(() => GW8.redo()); await p.waitForTimeout(500);
  const before = await p.evaluate(() => ({ marked: GW_AI_MARK.count(), all: document.querySelectorAll('#workspaceCanvas .block-stack .scratch-block').length }));
  // save (normal G-Warp .sb3 with the G-Warp copy inside) and open it again in a fresh page
  const bytes = await p.evaluate(async () => { const z = await GW_FILES.buildSb3({}); return Array.from(new Uint8Array(await z.blob.arrayBuffer())); });
  const f = path.join(os.tmpdir(), 'aipurple.sb3'); fs.writeFileSync(f, Buffer.from(bytes)); await p.close();
  p = await open();
  const [fc] = await Promise.all([p.waitForEvent('filechooser'), p.evaluate(() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'o', ctrlKey: true, bubbles: true })))]);
  await fc.setFiles(f); await p.waitForTimeout(6000); await p.keyboard.press('Escape');
  const after = await p.evaluate(() => ({ marked: GW_AI_MARK.count(), all: document.querySelectorAll('#workspaceCanvas .block-stack .scratch-block').length }));
  ok(after.marked === r.marked && after.all === before.all && after.all > after.marked, 'save + open again: AI blocks still purple, user block still green', { before, after });
  ok(errs.length === 0, 'no page errors', errs);
  await b.close();
})();
