const { chromium } = require('playwright'); const { prep } = require('./harness'); const path = require('path');
(async () => {
  const b = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] }); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await prep(p); await p.goto('file://' + path.resolve(process.argv[2])); await p.waitForTimeout(3500);
  const ok = (c, m, v) => console.log((c ? 'PASS ' : 'FAIL ') + m, v === undefined ? '' : (typeof v === 'string' ? v : JSON.stringify(v)));
  await p.click('#gwMainTabSounds').catch(() => {}); await p.waitForTimeout(800);
  await p.evaluate(() => window.GW_V1570_STUDIO?.showPane?.('instruments')); await p.waitForTimeout(1200);
  ok(await p.$('#gwCreateMelody') !== null, 'Create Melody zone is in Instruments');
  ok(await p.isVisible('#gwCreateMelody'), 'zone is visible');
  // before: the song maker's own tunes
  const before = await p.evaluate(() => { const A = GW_SONG_ARRANGER; A.setStyle({ genre: 'lofi', mood: 'chill', theme: 'vlog' }); const r = {}; for (const t of ['mix', 'classic', 'fresh']) { A.state.tune = t; r[t] = JSON.stringify(A.melodyNotes(0)); } A.state.tune = 'mix'; return r; });
  // tap squares
  await p.click('#gwcmGrid .gwcm-cell[data-col="0"][data-deg="0"]'); await p.click('#gwcmGrid .gwcm-cell[data-col="2"][data-deg="4"]'); await p.click('#gwcmGrid .gwcm-cell[data-col="4"][data-deg="7"]');
  ok((await p.evaluate(() => GW_CREATE_MELODY.notes())).length === 3, 'tapping squares adds notes', await p.evaluate(() => GW_CREATE_MELODY.notes()));
  await p.click('#gwcmGrid .gwcm-cell[data-col="4"][data-deg="7"]');
  ok((await p.evaluate(() => GW_CREATE_MELODY.notes())).length === 2, 'tapping again removes a note');
  // ideas are different
  const ideas = await p.evaluate(() => Object.values(GW_CREATE_MELODY.ideas).map(v => v[1].map(x => x.join(',')).join(' ')));
  ok(new Set(ideas).size === ideas.length && ideas.length >= 8, 'melody ideas all different', ideas.length);
  const contours = await p.evaluate(() => Object.values(GW_CREATE_MELODY.ideas).map(v => v[1].map((x, i, a) => i ? Math.sign(x[1] - a[i - 1][1]) : 0).join('')));
  const rhythms = await p.evaluate(() => Object.values(GW_CREATE_MELODY.ideas).map(v => v[1].map(x => x[0]).join(',')));
  ok(new Set(contours).size === 8 && new Set(rhythms).size >= 7, 'ideas differ in shape and rhythm', { contours: new Set(contours).size, rhythms: new Set(rhythms).size });
  await p.selectOption('#gwcmIdea', 'fanfare'); await p.waitForTimeout(200);
  const fan = await p.evaluate(() => GW_CREATE_MELODY.notes());
  ok(fan.length === 9, 'idea "Fanfare" loads', fan.length);
  // play with piano, then switch instrument
  await p.click('#gwcmPlay'); await p.waitForTimeout(1500);
  const a1 = await p.evaluate(() => ({ playing: GW_CREATE_MELODY.state.playing, col: GW_CREATE_MELODY.state.active, now: document.querySelectorAll('#gwcmGrid .gwcm-cell.now').length, status: document.getElementById('gwcmStatus').textContent }));
  ok(a1.playing && a1.col > 0 && a1.now === 8, 'Play runs and the green column moves', a1);
  const pick = await p.$$eval('#gwInstPicks .gw-inst-pick strong', s => s.map(x => x.textContent));
  const sax = pick.find(n => /sax/i.test(n)) || pick[3];
  await p.click(`#gwInstPicks .gw-inst-pick:has(strong:text-is("${sax}"))`); await p.waitForTimeout(400);
  await p.click('#gwcmPlay'); await p.waitForTimeout(700);
  const a2 = await p.evaluate(() => ({ st: document.getElementById('gwcmStatus').textContent, notes: GW_CREATE_MELODY.notes(), cur: GW_INSTRUMENT_STUDIO.currentInstrument() }));
  ok(a2.cur === sax && a2.st.includes(sax) && JSON.stringify(a2.notes) === JSON.stringify(fan), 'new instrument plays, melody kept', { inst: a2.cur, status: a2.st });
  await p.click('#gwcmStop'); await p.waitForTimeout(300);
  ok(await p.evaluate(() => !GW_CREATE_MELODY.state.playing && !document.querySelector('#gwcmGrid .gwcm-cell.now')), 'Stop stops');
  // hold
  await p.click('#gwcmHold'); const held = await p.evaluate(() => GW_CREATE_MELODY.notes().reduce((s, n) => s + n.len, 0));
  ok(held === 16 - fan[0].col, 'Hold notes: each note lasts until the next', held); await p.click('#gwcmHold');
  // save + reopen
  await p.click('#gwcmSave'); await p.waitForTimeout(200);
  ok(await p.$$eval('#gwcmSaved .gwcm-chip', c => c.length) === 1, 'Save adds a chip');
  await p.click('#gwcmClear'); await p.click('#gwcmSaved .gwcm-chip button:first-child'); await p.waitForTimeout(200);
  ok(JSON.stringify(await p.evaluate(() => GW_CREATE_MELODY.notes())) === JSON.stringify(fan), 'saved melody opens again');
  // use in song maker
  await p.click('#gwcmUse'); await p.waitForTimeout(900);
  const s1 = await p.evaluate(() => { const A = GW_SONG_ARRANGER, S = A.state; return { tune: S.tune, inst: S.inst.melody, sel: document.getElementById('gwArrTune')?.value, songPane: document.getElementById('gwSndPane-song')?.classList.contains('active'), notes: A.melodyNotes(0), my: S.myMelody }; });
  ok(s1.tune === 'mine' && s1.sel === 'mine' && s1.songPane, 'Use in Song maker: Tune = My melody, Song pane opens', { tune: s1.tune, sel: s1.sel, pane: s1.songPane });
  ok(JSON.stringify(s1.inst) === JSON.stringify([sax]), 'song melody uses the chosen instrument', s1.inst);
  const steps = s1.notes.map(n => n[0]).join(','), want = fan.map(n => n.col * 2).join(',');
  ok(steps === want, 'song plays the same rhythm as the grid', steps);
  const up = s1.notes.map((n, i, a) => i ? Math.sign(n[2] - a[i - 1][2]) : 0).join(''), wantUp = fan.map((n, i, a) => i ? Math.sign(n.deg - a[i - 1].deg) : 0).join('');
  ok(up === wantUp, 'song keeps the melody shape (up/down)', up + ' vs ' + wantUp);
  const keyed = await p.evaluate(() => { const A = GW_SONG_ARRANGER; A.state.root = 5; const n = A.melodyNotes(0)[0][2]; A.state.root = 0; return n; });
  ok(((keyed - s1.notes[0][2]) % 12 + 12) % 12 === 5, 'follows the song key', keyed);
  const r = await p.evaluate(async () => { const A = GW_SONG_ARRANGER; try { await A.play(); await new Promise(r => setTimeout(r, 1500)); A.stop(); const buf = await A.renderOffline(22050, 2); return buf ? (buf.duration || buf.length) : 'none'; } catch (e) { return 'ERR ' + e.message; } });
  ok(typeof r === 'number' && r > 5, 'song with my melody plays + renders', r);
  const after = await p.evaluate(() => { const A = GW_SONG_ARRANGER; const keep = A.state.inst.melody; const r = {}; for (const t of ['mix', 'classic', 'fresh']) { A.state.tune = t; r[t] = JSON.stringify(A.melodyNotes(0)); } return r; });
  ok(['mix', 'classic', 'fresh'].every(t => after[t] === before[t]), 'Mix / Classic / Fresh tunes unchanged');
  await p.evaluate(() => GW_V1570_STUDIO.showPane('instruments')); await p.waitForTimeout(400);
  await p.locator('#gwCreateMelody').screenshot({ path: path.resolve(__dirname, '../cm-zone.png') });
  await p.evaluate(() => GW_V1570_STUDIO.showPane('song')); await p.waitForTimeout(400);
  ok(errs.length === 0, 'no page errors', errs);
  await b.close();
})();
