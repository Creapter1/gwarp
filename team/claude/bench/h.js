// Shared helpers for the G-Warp play-testers (Playwright, headless Chromium). Use the app like a player.
// const H = require('/tmp/ep2/h.js'); const t = await H.start('/tmp/ep2/<you>', {w:1500, h:900}); ... await t.end();
// Run with: NODE_PATH=/opt/npm-tools/node_modules node yourscript.js
const { chromium } = require('playwright'); const fs = require('fs'); const url = require('url');
exports.APP = '/home/claude/gwarp-test/app.html';   // a throw-away copy of the newest build (v15.69.0)
exports.start = async (dir, { w = 1500, h = 900 } = {}) => {
  fs.mkdirSync(dir, { recursive: true });
  const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: w, height: h }, acceptDownloads: true });
  // stand-in for the operating system's file dialogs: the app then uses its own <input type=file> / download,
  // which Playwright can drive (t.openProject / t.saveProject). Nothing else in the app is changed.
  await ctx.addInitScript(() => { try { delete window.showOpenFilePicker; delete window.showSaveFilePicker; window.showOpenFilePicker = undefined; window.showSaveFilePicker = undefined; } catch {} });
  const p = await ctx.newPage(); const log = []; let step = 'load', n = 0;
  p.on('pageerror', x => log.push({ kind: 'ERROR', step, msg: x.message.slice(0, 300) }));
  p.on('console', m => { if (m.type() === 'error') log.push({ kind: 'console', step, msg: m.text().slice(0, 300) }); });
  p.on('dialog', async d => { log.push({ kind: 'dialog', step, msg: d.type() + ': ' + d.message().slice(0, 200) }); await d.accept().catch(() => {}); });
  await p.goto(url.pathToFileURL(exports.APP).href); await p.waitForTimeout(6000);
  const t = {
    b, ctx, p, log, dir,
    step: s => { step = s; },
    shot: async name => { n++; const f = `${dir}/${String(n).padStart(2, '0')}-${name}.png`; await p.screenshot({ path: f, timeout: 60000 }).catch(e => log.push({ kind: 'shotfail', step, msg: e.message.slice(0, 100) })); return f; },
    // read-only peek at the game state, to confirm what you SEE (never use it to make things happen)
    state: () => Promise.race([p.evaluate(() => { const s = Engine.sprites[Engine.activeSpriteIndex] || {}; return { sprites: Engine.sprites.length, active: (s.name || '').slice(0, 40), x: s.x, y: s.y, size: s.size, dir: s.direction, blocks: document.querySelectorAll('#workspaceCanvas .scratch-block').length }; }), new Promise(r => setTimeout(() => r('NO ANSWER in 15 s (page frozen?)'), 15000))]),
    fps: () => Promise.race([p.evaluate(() => new Promise(res => { let f = 0; const s = performance.now(); const k = () => { f++; performance.now() - s < 2000 ? requestAnimationFrame(k) : res(f / 2); }; requestAnimationFrame(k); })), new Promise(r => setTimeout(() => r('FROZEN (no frames for 15 s)'), 15000))]),
    cat: c => p.click(`#gwCategoryRail button:has-text("${c}")`),   // Motion, Looks, Sound, Events, Control, Sensing, Operators, Variables, Lists, My Blocks, Stage, Extensions
    drag: (type, x, y) => p.dragAndDrop(`#paletteContainer [data-type="${type}"]`, '#workspaceCanvas', { sourcePosition: { x: 8, y: 10 }, targetPosition: { x, y } }),  // x,y = position inside the code area
    btn: re => p.evaluate(src => { const r = new RegExp(src, 'i'); const x = [...document.querySelectorAll('button')].find(b => b.offsetParent && r.test(((b.title || '') + ' ' + (b.getAttribute('aria-label') || '') + ' ' + b.textContent).trim())); if (!x) return null; x.click(); return (x.title || x.textContent).trim().slice(0, 40); }, re.source),
    tab: name => p.evaluate(nm => { [...document.querySelectorAll('button,[role=tab]')].find(x => x.offsetParent && x.textContent.trim() === nm)?.click(); }, name),  // Code, Costumes, Sounds, Tiles, Animation, Song maker ...
    gmenu: async item => { await p.mouse.click(30, 24); await p.waitForTimeout(500); if (item) await p.getByText(item).first().click(); },  // the G logo = File menu
    openProject: async file => { const fc = p.waitForEvent('filechooser', { timeout: 10000 }); await p.keyboard.press('Control+o'); const c = await fc; await c.setFiles(file); await p.waitForTimeout(4000); },
    saveProject: async to => { const dl = p.waitForEvent('download', { timeout: 15000 }); await p.keyboard.press('Control+s'); const d = await dl; await d.saveAs(to); return d.suggestedFilename(); },
    save: () => fs.writeFileSync(`${dir}/log.json`, JSON.stringify(log, null, 1)),
    end: async () => { t.save(); await b.close(); },
  };
  return t;
};
