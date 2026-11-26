// Pixel test: GPU stage vs G-Warp's 2D drawing (gwFx is taken live from team/claude/work/app.html).
// Run: node pixel-test.js   (needs playwright + chromium)
const fs = require('fs'), path = require('path'), { chromium } = require('playwright');
const app = fs.readFileSync(path.join(__dirname, '../../../work/app.html'), 'utf8');
const a = app.indexOf('function gwFx('), b = app.indexOf('let fcache = new WeakMap()', a);
const gwFx = app.slice(a, b);
const gpu = fs.readFileSync(path.join(__dirname, '../gw-gpu-stage.js'), 'utf8');
const CASES = [
  ['plain', {}], ['rotate', { direction: 37 }], ['size', { size: 173 }], ['small', { size: 40 }], ['leftright', { direction: -90, rotationStyle: 'left-right' }],
  ['dontrotate', { direction: 10, rotationStyle: "don't rotate" }], ['ghost', { ghost: 60 }], ['color', { effects: { color: 70 } }],
  ['bright+', { effects: { brightness: 40 } }], ['bright-', { effects: { brightness: -55 } }], ['whirl', { effects: { whirl: 120 } }],
  ['fisheye', { effects: { fisheye: 80 } }], ['pixelate', { effects: { pixelate: 40 } }], ['mosaic', { effects: { mosaic: 25 } }],
  ['mix', { direction: 120, size: 140, ghost: 30, effects: { color: 150, brightness: 20, whirl: 60 } }],
  ['layers+pen', { many: true }]
];
(async () => {
  const br = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const pg = await br.newPage(); await pg.setContent('<html><body></body></html>');
  await pg.addScriptTag({ content: gpu + '\n' + gwFx + '\nwindow.gwFx=gwFx;' });
  const res = await pg.evaluate(CASES => {
    const mk = (w, h, f) => { const c = document.createElement('canvas'); c.width = w; c.height = h; f(c.getContext('2d'), w, h); return c; };
    const cost = mk(96, 72, (x, w, h) => { const g = x.createLinearGradient(0, 0, w, h); g.addColorStop(0, '#e33'); g.addColorStop(.5, '#3c6'); g.addColorStop(1, '#36f'); x.fillStyle = g; x.beginPath(); x.ellipse(48, 36, 46, 34, 0, 0, 7); x.fill(); x.fillStyle = '#ff0'; x.fillRect(10, 10, 20, 14); x.fillStyle = 'rgba(0,0,0,.5)'; x.fillRect(60, 40, 25, 20); });
    const box = { x0: -40, y0: -30, w: 96, h: 72 };
    const pen = mk(480, 360, x => { x.strokeStyle = '#0a8'; x.lineWidth = 6; x.lineCap = 'round'; x.beginPath(); x.moveTo(20, 30); x.lineTo(450, 320); x.stroke(); x.fillStyle = '#c0c'; x.fillRect(300, 40, 60, 60); });
    const glc = document.createElement('canvas'); glc.width = 480; glc.height = 360; const G = GWGpuStage.create(glc, { keep: true });
    if (!G) return 'NO WEBGL';
    const ref = document.createElement('canvas'); ref.width = 480; ref.height = 360; const ctx = ref.getContext('2d');
    const DEG = Math.PI / 180, key = fx => { let k = ''; for (const n of ['color', 'brightness', 'whirl', 'fisheye', 'pixelate', 'mosaic']) { let v = Math.round(Number(fx[n]) || 0); if (n === 'color') v = ((v % 200) + 200) % 200; if (v) k += n + ':' + v + ';'; } return k; };
    const draw2d = (f) => { // same steps as gwDraw + paintBackdrop + pen composite in app.html
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.fillStyle = f.bg; ctx.fillRect(0, 0, 480, 360); if (f.pen) ctx.drawImage(f.pen, 0, 0, 480, 360);
      for (const s of f.sprites) { ctx.save(); ctx.translate(240 + s.x, 180 - s.y); const st = s.rotationStyle || 'all around';
        if (st === 'left-right' && (((s.direction % 360) + 360) % 360) > 180) ctx.scale(-1, 1); else if (st === 'all around') ctx.rotate((s.direction - 90) * DEG);
        ctx.scale(s.size / 100, s.size / 100); ctx.globalAlpha = Math.max(0, 1 - (s.ghost || 0) / 100);
        let cv = s.canvas; const k = key(s.effects || {}); if (k) { const o = document.createElement('canvas'); gwFx(cv, o, k, { res: 1 }); cv = o; }
        ctx.drawImage(cv, s.box.x0, s.box.y0, s.box.w, s.box.h); ctx.restore(); } };
    const out = [];
    for (const [name, p] of CASES) {
      let sprites = [{ canvas: cost, box, x: 10, y: -5, size: 100, direction: 90, ...p }];
      if (p.many) sprites = [0, 1, 2, 3, 4].map(i => ({ canvas: cost, box, x: -150 + i * 70, y: 40 - i * 25, size: 90 + i * 15, direction: 90 + i * 30, ghost: i * 10 }));
      const f = { bg: '#f4f0e0', sprites, pen: p.many ? pen : null };
      draw2d(f); G.draw(f);
      const A = ctx.getImageData(0, 0, 480, 360).data, B = G.readPixels();
      let sum = 0, bad = 0; for (let i = 0; i < A.length; i += 4) { const d = Math.max(Math.abs(A[i] - B[i]), Math.abs(A[i + 1] - B[i + 1]), Math.abs(A[i + 2] - B[i + 2]), Math.abs(A[i + 3] - B[i + 3])); sum += d; if (d > 40) bad++; }
      out.push({ name, meanDiff: +(sum / (A.length / 4)).toFixed(3), badPct: +(bad / (A.length / 4) * 100).toFixed(3) });
    }
    return out;
  }, CASES);
  await br.close();
  if (typeof res === 'string') { console.log(res); process.exit(2); }
  let ok = true; for (const r of res) { const pass = r.meanDiff < 1.5 && r.badPct < 0.5; ok = ok && pass; console.log((pass ? 'PASS ' : 'FAIL ') + r.name.padEnd(12) + ' mean ' + r.meanDiff + '  bad% ' + r.badPct); }
  console.log(ok ? 'ALL PASS' : 'SOME FAILED'); process.exit(ok ? 0 : 1);
})();
