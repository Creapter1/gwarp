// Speed test: N clones (no effects / with colour effect), GPU vs plain 2D drawImage. Run: node speed-test.js
// Note: headless uses SwiftShader (software GL), so GPU numbers here are a worst case.
const fs = require('fs'), path = require('path'), { chromium } = require('playwright');
const gpu = fs.readFileSync(path.join(__dirname, '../gw-gpu-stage.js'), 'utf8');
(async () => {
  const br = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const pg = await br.newPage(); await pg.setContent('<html><body></body></html>'); await pg.addScriptTag({ content: gpu });
  const r = await pg.evaluate(() => {
    const cost = document.createElement('canvas'); cost.width = 64; cost.height = 64; const x = cost.getContext('2d'); x.fillStyle = '#e60'; x.beginPath(); x.arc(32, 32, 30, 0, 7); x.fill();
    const box = { x0: -32, y0: -32, w: 64, h: 64 }, glc = document.createElement('canvas'); glc.width = 480; glc.height = 360;
    const G = GWGpuStage.create(glc, { keep: true }); if (!G) return 'NO WEBGL';
    const ref = document.createElement('canvas'); ref.width = 480; ref.height = 360; const ctx = ref.getContext('2d'), DEG = Math.PI / 180;
    const out = [];
    for (const N of [300, 1000]) {
      const sp = Array.from({ length: N }, (_, i) => ({ canvas: cost, box, x: (i * 37) % 480 - 240, y: (i * 53) % 360 - 180, size: 50 + i % 60, direction: i * 7, effects: {} }));
      const t2 = () => { const t = performance.now(); for (let k = 0; k < 20; k++) { ctx.setTransform(1,0,0,1,0,0); ctx.fillStyle = '#fff'; ctx.fillRect(0,0,480,360);
        for (const s of sp) { ctx.setTransform(1,0,0,1,240 + s.x, 180 - s.y); ctx.rotate((s.direction - 90) * DEG); ctx.scale(s.size/100, s.size/100); ctx.drawImage(s.canvas, -32, -32); } ctx.getImageData(0,0,1,1); } return (performance.now() - t) / 20; };
      const tg = () => { const t = performance.now(); for (let k = 0; k < 20; k++) { G.draw({ bg: '#fff', sprites: sp }); G.gl.readPixels(0,0,1,1,G.gl.RGBA,G.gl.UNSIGNED_BYTE,new Uint8Array(4)); } return (performance.now() - t) / 20; };
      G.draw({ bg: '#fff', sprites: sp }); out.push({ N, ms2d: +t2().toFixed(2), msGpu: +tg().toFixed(2) });
    }
    return out;
  });
  await br.close(); console.log(JSON.stringify(r));
})();
