// Play a .sb3 in the real Scratch engine and report what happened.
//   node run-in-scratch.js game.sb3 [seconds=10] [--shots out-folder] [--keys "ArrowRight:600@1500,space:100@3000"]
// key format: KEY:HOLD_MS@START_MS  (KEY = ArrowLeft / ArrowRight / ArrowUp / ArrowDown / space / a letter)
const { runInScratch } = require('./lib/scratch');
(async () => {
  const a = process.argv.slice(2), file = a[0], seconds = +(a[1] && !a[1].startsWith('--') ? a[1] : 10);
  const opt = n => { const i = a.indexOf(n); return i >= 0 ? a[i + 1] : null; };
  const keys = (opt('--keys') || '').split(',').filter(Boolean).map(s => { const [k, rest] = s.split(':'); const [hold, at] = (rest || '100@0').split('@'); return { key: k, hold: +hold, at: +at }; });
  const r = await runInScratch(file, { seconds, keys, shotsDir: opt('--shots'), shotEvery: 1500 });
  console.log('Loaded:', r.info.targets.map(t => `${t.name} (${t.costumes} costumes, ${t.sounds} sounds)`).join(', '));
  console.log('Clones at the end:', r.clones); console.log('Broadcasts heard:', r.broadcasts.join(', ') || '-');
  console.log('Visible at the end:', r.visible.join(' | '));
  console.log('Page errors:', r.errors.length ? r.errors : 'none'); process.exit(r.errors.length ? 1 : 0);
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
