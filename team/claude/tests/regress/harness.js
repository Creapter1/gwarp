// Test harness: serves Tailwind (generated locally), Font Awesome 6.4.0 and JSZip offline.
const fs = require('fs'), path = require('path');
const W = __dirname;
// Font Awesome 6.4.0 offline copy: GW_FA env, or ./fa, or npm @fortawesome/fontawesome-free@6.4.0 in ./node_modules (see run-all.sh)
const FA = [process.env.GW_FA, path.join(W, 'fa'), path.join(W, 'node_modules', '@fortawesome', 'fontawesome-free')].find(d => d && fs.existsSync(path.join(d, 'css', 'all.min.css'))) || path.join(W, 'fa');
const twCss = fs.readFileSync(path.join(W, 'tw.css'), 'utf8');
const twJs = `(function(){var s=document.createElement('style');s.id='tw-local';s.textContent=${JSON.stringify(twCss)};(document.head||document.documentElement).appendChild(s);window.tailwind={config:{}};})();`;
async function prep(page, opts = {}) {
  await page.route(/^https?:/, async r => {
    const u = r.request().url();
    if (u.startsWith('https://cdn.tailwindcss.com')) return r.fulfill({ contentType: 'application/javascript', body: twJs });
    if (/font-awesome\/6\.4\.0\/css\/all\.min\.css/.test(u)) return r.fulfill({ contentType: 'text/css', body: fs.readFileSync(path.join(FA, 'css/all.min.css')) });
    if (/font-awesome\/6\.4\.0\/webfonts\/([\w.-]+)/.test(u)) { const f = u.match(/webfonts\/([\w.-]+)/)[1]; const p = path.join(FA, 'webfonts', f); if (fs.existsSync(p)) return r.fulfill({ contentType: f.endsWith('woff2') ? 'font/woff2' : 'font/ttf', body: fs.readFileSync(p) }); }
    if (/jszip/.test(u)) return r.fulfill({ contentType: 'application/javascript', body: fs.readFileSync(require.resolve('jszip/dist/jszip.min.js')) });
    if (opts.route) { const done = await opts.route(r, u); if (done) return; }
    return r.abort();
  });
}
module.exports = { prep };
