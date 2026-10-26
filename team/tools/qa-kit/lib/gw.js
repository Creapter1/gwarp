// Node side: open G-Warp (app.html) in a real Chromium with Playwright, open / save .sb3 files, use the builder.
// Used by every script in this kit. Works on Windows, macOS and Linux.
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');

const KIT = path.resolve(__dirname, '..');
const DEFAULT_APP = path.resolve(KIT, '..', '..', '..', 'app.html'); // team/tools/qa-kit -> repo root

/** Optional offline mode: put tw.css / fa/ / jszip.min.js in qa-kit/offline/ (only needed on machines with no internet). */
async function offlineRoutes(page) {
  const OFF = path.join(KIT, 'offline'); if (!fs.existsSync(OFF)) return;
  const tw = fs.existsSync(path.join(OFF, 'tw.css')) ? fs.readFileSync(path.join(OFF, 'tw.css'), 'utf8') : '';
  await page.route(/^https?:/, r => {
    const u = r.request().url();
    if (u.startsWith('https://cdn.tailwindcss.com') && tw) return r.fulfill({ contentType: 'application/javascript', body: `(function(){var s=document.createElement('style');s.textContent=${JSON.stringify(tw)};document.head.appendChild(s);window.tailwind={config:{}};})();` });
    const fa = u.match(/font-awesome\/[\d.]+\/(css\/all\.min\.css|webfonts\/[\w.-]+)/);
    if (fa && fs.existsSync(path.join(OFF, 'fa', fa[1]))) return r.fulfill({ body: fs.readFileSync(path.join(OFF, 'fa', fa[1])), contentType: fa[1].endsWith('.css') ? 'text/css' : 'font/woff2' });
    if (/jszip/.test(u) && fs.existsSync(path.join(OFF, 'jszip.min.js'))) return r.fulfill({ contentType: 'application/javascript', body: fs.readFileSync(path.join(OFF, 'jszip.min.js')) });
    return r.continue();
  });
}

/** Open G-Warp. Returns { browser, page, errors }. errors collects page errors (real bugs) - always print them. */
async function openApp(appPath = DEFAULT_APP, { headless = true, width = 1440, height = 900, args = [] } = {}) {
  const browser = await chromium.launch({ headless, args: ['--autoplay-policy=no-user-gesture-required', ...args] });
  const page = await browser.newPage({ viewport: { width, height } });
  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource|ERR_|net::/.test(m.text())) errors.push('console: ' + m.text().slice(0, 300)); });
  await offlineRoutes(page);
  await page.addInitScript(() => { delete window.showOpenFilePicker; }); // so Ctrl+O uses a normal file chooser Playwright can fill
  await page.goto('file://' + path.resolve(appPath));
  await page.waitForFunction(() => window.GW && window.Engine && window.GW_FILES, null, { timeout: 60000 });
  await page.waitForTimeout(2500);
  return { browser, page, errors };
}

/** Open a .sb3 / .sprite3 / G-Warp project in the running app (same as the user pressing Ctrl+O). */
async function openProject(page, file) {
  const [fc] = await Promise.all([page.waitForEvent('filechooser'), page.evaluate(() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'o', ctrlKey: true, bubbles: true })))]);
  await fc.setFiles(path.resolve(file));
  await page.waitForFunction(() => window.Engine && Engine.sprites.length > 0, null, { timeout: 60000 });
  await page.waitForTimeout(4000); await page.keyboard.press('Escape');
}

/** Save with G-Warp's own exporter. scratchOnly:true = a pure Scratch 3 file (no G-Warp copy inside) - use this for Scratch uploads. */
async function saveSb3(page, out, { scratchOnly = true } = {}) {
  const bytes = await page.evaluate(async o => { const z = await GW_FILES.buildSb3(o); return Array.from(new Uint8Array(await z.blob.arrayBuffer())); }, { scratchOnly });
  fs.writeFileSync(out, Buffer.from(bytes)); return bytes.length;
}

/** Load window.GWB (the block / sprite / costume builder) into the page. */
async function injectBuilder(page) {
  await page.addScriptTag({ path: path.join(__dirname, 'gw-builder.browser.js') });
  return page.evaluate(() => Object.keys(window.GWB).length);
}

module.exports = { openApp, openProject, saveSb3, injectBuilder, DEFAULT_APP, KIT };
