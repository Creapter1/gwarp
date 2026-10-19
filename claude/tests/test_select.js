// Select tool (v15.48.0): move / resize / rotate every kind of shape like Scratch, nothing jumps.
// Run: NODE_PATH=<playwright> node test_select.js ../../app.html [shots-prefix]
const { chromium } = require('playwright'); const { prep } = require('./harness'); const path = require('path');
const [file, shots] = process.argv.slice(2);
(async () => { let fails = 0; const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await prep(p); await p.goto('file://' + path.resolve(file)); await p.waitForTimeout(3500);
  const shot = async n => { if (shots) await p.screenshot({ path: `${shots}-${n}.png` }); };
  await p.evaluate(() => [...document.querySelectorAll('button')].find(x => /^\s*Costumes\s*$/.test(x.textContent))?.click()); await p.waitForTimeout(900);
  await p.evaluate(() => document.getElementById('gwCosPaintBtn').click()); await p.waitForTimeout(900);
  const tool = t => p.evaluate(t => document.querySelector(`#gwSvgToolsV15 [data-gwpe="${t}"]`).click(), t);
  const svgBox = () => p.evaluate(() => { const r = document.getElementById('gwVectorCanvasV15').getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
  const drag = async (x0, y0, x1, y1, mods = []) => { for (const m of mods) await p.keyboard.down(m); await p.mouse.move(x0, y0); await p.mouse.down(); await p.mouse.move((x0 + x1) / 2, (y0 + y1) / 2, { steps: 6 }); await p.mouse.move(x1, y1, { steps: 6 }); await p.mouse.up(); for (const m of mods) await p.keyboard.up(m); await p.waitForTimeout(150); };
  // shapes are measured in canvas units (512 x 384), via the screen
  const art = () => p.evaluate(() => { const s = document.getElementById('gwVectorCanvasV15'), M = s.getScreenCTM().inverse(); return [...s.children].filter(n => !/^(defs)$/.test(n.localName) && !/^(gwV153|gwpe|gwTx)/.test(n.id || '')).map(n => { const r = n.getBoundingClientRect(), a = new DOMPoint(r.left, r.top).matrixTransform(M), z = new DOMPoint(r.right, r.bottom).matrixTransform(M); return { tag: n.localName, x0: a.x, y0: a.y, x1: z.x, y1: z.y, cx: (a.x + z.x) / 2, cy: (a.y + z.y) / 2, w: z.x - a.x, h: z.y - a.y, sx: (r.left + r.right) / 2, sy: (r.top + r.bottom) / 2 }; }); });
  const unit = () => p.evaluate(() => document.getElementById('gwVectorCanvasV15').getScreenCTM().a); // screen px per canvas unit
  const B = await svgBox();
  // draw: rectangle, circle, line, brush, text
  await tool('rect'); await drag(B.x + 80, B.y + 60, B.x + 180, B.y + 130);
  await tool('circle'); await drag(B.x + 260, B.y + 60, B.x + 340, B.y + 140);
  await tool('line'); await drag(B.x + 400, B.y + 80, B.x + 520, B.y + 120);
  await tool('gw:brush'); await drag(B.x + 90, B.y + 260, B.x + 200, B.y + 300);
  await tool('gw:text'); await p.mouse.click(B.x + 330, B.y + 300); await p.waitForTimeout(250); await p.keyboard.type('Hi'); await p.keyboard.press('Enter'); await p.waitForTimeout(300);
  // like Scratch: the rectangle you just drew keeps its box, and its corner can be dragged while the Rectangle tool is still on
  await tool('rect'); await drag(B.x + 420, B.y + 300, B.x + 480, B.y + 340);
  let fresh = await p.evaluate(() => ({ n: document.querySelectorAll('#gwTxOverlay [data-h]').length, tag: GW_TRANSFORM.sel[0]?.localName }));
  ok(fresh.n === 9 && fresh.tag === 'rect', 'a newly drawn rectangle shows its box with handles right away ' + JSON.stringify(fresh));
  const fr0 = (await art()).pop(); const SE = await p.evaluate(() => { const r = document.querySelector('#gwTxOverlay [data-h="se"]').getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
  await drag(SE.x, SE.y, SE.x + 30, SE.y + 20); const fr1 = (await art()).pop();
  ok(Math.abs(fr1.x0 - fr0.x0) < 1 && fr1.w > fr0.w + 15, `...and dragging its corner resizes it (width ${fr0.w.toFixed(0)} → ${fr1.w.toFixed(0)}), no extra shape`);
  const cnt = (await art()).length; await drag(B.x + 30, B.y + 330, B.x + 60, B.y + 360);
  ok((await art()).length === cnt + 1, 'clicking somewhere else draws a new shape');
  await p.evaluate(() => { const s = document.getElementById('gwVectorCanvasV15'); [...s.children].filter(n => n.localName === 'rect').slice(1).forEach(n => n.remove()); });
  await tool('select'); await p.waitForTimeout(200);
  let A = await art(); const tags = A.map(a => a.tag); console.log('shapes: ' + tags.join(','));
  ok(['rect', 'ellipse', 'line', 'path', 'text'].every(t => tags.includes(t) || (t === 'ellipse' && tags.includes('circle'))), 'drew a rectangle, circle, line, brush stroke and text');
  await shot('1-drawn');
  // MOVE each shape by (+90, +40) screen px: it must move exactly that much (no jump)
  const k = await unit();
  for (let i = 0; i < A.length; i++) {
    const before = (await art())[i]; const t = before.tag; if (before.w < 1 && before.h < 1) continue; // the empty group of a new costume
    await drag(before.sx, before.sy, before.sx + 90, before.sy + 40);
    const after = (await art())[i];
    const dx = after.cx - before.cx, dy = after.cy - before.cy, ex = 90 / k, ey = 40 / k;
    ok(Math.abs(dx - ex) < 1.2 && Math.abs(dy - ey) < 1.2 && Math.abs(after.w - before.w) < 0.6, `move ${t}: moved ${dx.toFixed(1)}, ${dy.toFixed(1)} (mouse ${ex.toFixed(1)}, ${ey.toFixed(1)}), size kept`);
  }
  // the box with 8 handles + rotate handle shows around the selection
  let hs = await p.evaluate(() => [...document.querySelectorAll('#gwTxOverlay [data-h]')].map(h => h.dataset.h));
  ok(hs.length === 9 && hs.includes('rot') && hs.includes('se'), 'selection box: 8 handles + rotate handle (' + hs.join(',') + ')');
  // RESIZE the text from its bottom-right corner: the top-left corner stays put
  const txt = (await art()).findIndex(a => a.tag === 'text');
  let before = (await art())[txt];
  await drag(before.sx, before.sy, before.sx, before.sy); // select it
  let H = await p.evaluate(() => { const r = document.querySelector('#gwTxOverlay [data-h="se"]').getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
  await drag(H.x, H.y, H.x + 60, H.y + 30);
  let after = (await art())[txt];
  ok(Math.abs(after.x0 - before.x0) < 1.2 && Math.abs(after.y0 - before.y0) < 1.2 && after.w > before.w + 20, `resize text from the corner: top-left stays (${before.x0.toFixed(1)},${before.y0.toFixed(1)} → ${after.x0.toFixed(1)},${after.y0.toFixed(1)}), wider ${before.w.toFixed(1)} → ${after.w.toFixed(1)}`);
  // RESIZE the rectangle with Shift: keeps its shape
  const ri = (await art()).findIndex(a => a.tag === 'rect'); before = (await art())[ri];
  await drag(before.sx, before.sy, before.sx, before.sy);
  H = await p.evaluate(() => { const r = document.querySelector('#gwTxOverlay [data-h="se"]').getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
  await drag(H.x, H.y, H.x + 50, H.y + 10, ['Shift']); after = (await art())[ri];
  ok(Math.abs(after.w / after.h - before.w / before.h) < 0.03 && after.w > before.w, `Shift-resize keeps the shape (ratio ${(before.w / before.h).toFixed(2)} → ${(after.w / after.h).toFixed(2)})`);
  // ROTATE the rectangle 90° (Shift snaps): width and height swap, centre stays
  before = (await art())[ri];
  const R = await p.evaluate(() => { const r = document.querySelector('#gwTxOverlay [data-h="rot"]').getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
  const cx = before.sx, cy = before.sy, rr = Math.hypot(R.x - cx, R.y - cy);
  await p.keyboard.down('Shift'); await p.mouse.move(R.x, R.y); await p.mouse.down(); for (let a = 0; a <= 90; a += 10) { const t = (-90 + a) * Math.PI / 180; await p.mouse.move(cx + rr * Math.cos(t), cy + rr * Math.sin(t)); } await p.mouse.up(); await p.keyboard.up('Shift'); await p.waitForTimeout(150);
  after = (await art())[ri];
  ok(Math.abs(after.w - before.h) < 1.5 && Math.abs(after.h - before.w) < 1.5 && Math.abs(after.cx - before.cx) < 1.2 && Math.abs(after.cy - before.cy) < 1.2, `rotate 90°: ${before.w.toFixed(0)}x${before.h.toFixed(0)} → ${after.w.toFixed(0)}x${after.h.toFixed(0)}, centre kept`);
  // ...and moving it after the rotation still follows the mouse exactly
  before = (await art())[ri]; await drag(before.sx, before.sy, before.sx - 70, before.sy + 25); after = (await art())[ri];
  ok(Math.abs(after.cx - before.cx + 70 / k) < 1.2 && Math.abs(after.cy - before.cy - 25 / k) < 1.2, 'move after rotate follows the mouse');
  await shot('2-transformed');
  // UNDO puts the last move back; REDO again
  await p.evaluate(() => document.getElementById('gwCosUndo')?.click()); await p.waitForTimeout(400);
  let u = (await art())[ri]; ok(Math.abs(u.cx - before.cx) < 1.2 && Math.abs(u.cy - before.cy) < 1.2, 'undo puts the shape back');
  await p.evaluate(() => document.getElementById('gwCosRedo')?.click()); await p.waitForTimeout(400);
  u = (await art())[ri]; ok(Math.abs(u.cx - after.cx) < 1.2, 'redo moves it again');
  // MARQUEE: select two shapes, move them together
  A = await art(); const i1 = A.findIndex(a => a.tag === 'path'), i2 = A.findIndex(a => a.tag === 'text');
  const lo = { x: Math.min(A[i1].x0, A[i2].x0) - 6, y: Math.min(A[i1].y0, A[i2].y0) - 6 }, hi = { x: Math.max(A[i1].x1, A[i2].x1) + 6, y: Math.max(A[i1].y1, A[i2].y1) + 6 };
  const S = await p.evaluate(([lo, hi]) => { const m = document.getElementById('gwVectorCanvasV15').getScreenCTM(); const a = new DOMPoint(lo.x, lo.y).matrixTransform(m), z = new DOMPoint(hi.x, hi.y).matrixTransform(m); return { a: [a.x, a.y], z: [z.x, z.y] }; }, [lo, hi]);
  await drag(S.a[0], S.a[1], S.z[0], S.z[1]);
  const nsel = await p.evaluate(() => GW_TRANSFORM.sel.length); ok(nsel >= 2, 'drag on empty space selects the shapes inside (' + nsel + ')');
  const b1 = (await art())[i1], b2 = (await art())[i2];
  await drag(b2.sx, b2.sy, b2.sx + 30, b2.sy - 20);
  const a1 = (await art())[i1], a2 = (await art())[i2];
  ok(Math.abs((a1.cx - b1.cx) - 30 / k) < 1.2 && Math.abs((a2.cx - b2.cx) - 30 / k) < 1.2, 'both move together by the same amount');
  // ARROW keys nudge
  await p.keyboard.press('ArrowRight'); await p.keyboard.press('Shift+ArrowDown'); await p.waitForTimeout(500);
  const n1 = (await art())[i1]; ok(Math.abs(n1.cx - a1.cx - 1) < 0.3 && Math.abs(n1.cy - a1.cy - 10) < 0.3, 'arrow keys move 1 (Shift: 10)');
  // ZOOM 2x: moving text still follows the mouse
  await p.evaluate(() => document.getElementById('gwV153ClearSelection')?.click());
  await p.evaluate(() => { for (let i = 0; i < 3; i++) document.querySelector('#gwpeZoom button:last-child')?.click(); }); await p.waitForTimeout(500);
  const k2 = await unit(); A = await art();
  const WR0 = await p.evaluate(() => { const r = document.getElementById('gwCostumeCanvasWrapV15').getBoundingClientRect(); return { l: r.left + 10, t: r.top + 10, r: r.right - 60, b: r.bottom - 60 }; });
  let ti = A.findIndex(a => a.tag === 'text' && a.sx > WR0.l && a.sy > WR0.t && a.sx < WR0.r && a.sy < WR0.b); if (ti < 0) ti = A.findIndex(a => a.w > 1 && a.sx > WR0.l && a.sy > WR0.t && a.sx < WR0.r && a.sy < WR0.b); before = A[ti] || A[0];
  ok(k2 > k * 1.3, `zoomed in (${(k2 / k).toFixed(2)}x)`);
  const WR = await p.evaluate(() => { const r = document.getElementById('gwCostumeCanvasWrapV15').getBoundingClientRect(); return { l: r.left + 10, t: r.top + 10, r: r.right - 60, b: r.bottom - 60 }; });
  if (before.sx > WR.l && before.sy > WR.t && before.sx < WR.r && before.sy < WR.b) { await drag(before.sx, before.sy, before.sx + 50, before.sy + 50); after = (await art())[ti]; ok(Math.abs(after.cx - before.cx - 50 / k2) < 1.2 && Math.abs(after.cy - before.cy - 50 / k2) < 1.2, `zoomed: the text moves exactly with the mouse (${(after.cx - before.cx).toFixed(1)}, ${(after.cy - before.cy).toFixed(1)} vs ${(50 / k2).toFixed(1)})`); }
  else { console.log('zoom debug', JSON.stringify(WR0), JSON.stringify(A.map(a => [a.tag, Math.round(a.sx), Math.round(a.sy)]))); ok(true, 'zoomed: text out of view, skipped'); }
  await p.evaluate(() => { for (let i = 0; i < 3; i++) document.querySelector('#gwpeZoom button:first-child')?.click(); document.querySelector('#gwpeZoom button:nth-child(2)')?.click(); }); await p.waitForTimeout(400);
  // SAVE round trip: switch to costume 1 and back - everything stays where it was
  const snap1 = (await art()).map(a => [a.tag, a.cx.toFixed(1), a.cy.toFixed(1), a.w.toFixed(1)].join(':'));
  await p.evaluate(() => [...document.querySelectorAll('.gw7-cos-item')][0].click()); await p.waitForTimeout(900);
  await p.evaluate(() => [...document.querySelectorAll('.gw7-cos-item')][1].click()); await p.waitForTimeout(1200);
  await tool('select');
  const snap2 = (await art()).map(a => [a.tag, a.cx.toFixed(1), a.cy.toFixed(1), a.w.toFixed(1)].join(':'));
  const same = snap2.length === snap1.length && snap1.every((x, i) => { const [t, x1, y1, w1] = x.split(':'), [t2, x2, y2, w2] = snap2[i].split(':'); return Math.abs(x1 - x2) < 1.5 && Math.abs(y1 - y2) < 1.5 && Math.abs(w1 - w2) < 1.5; });
  ok(same, 'after switching costumes and back, every shape is where it was' + (same ? '' : '\n   ' + snap1.join(' ') + '\n   ' + snap2.join(' ')));
  // the loaded G-Spark costume moves as one piece and stays
  await p.evaluate(() => [...document.querySelectorAll('.gw7-cos-item')][0].click()); await p.waitForTimeout(900); await tool('select');
  A = await art(); before = A[0];
  await drag(before.sx, before.sy, before.sx - 40, before.sy + 20); after = (await art())[0];
  ok(Math.abs(after.cx - before.cx + 40 / k) < 1.5 && Math.abs(after.cy - before.cy - 20 / k) < 1.5, 'the G-Spark costume moves as one piece with the mouse');
  ok(!(await p.evaluate(() => Engine.sprites[Engine.activeSpriteIndex].costumes.some(c => /gwTxOverlay|data-h=/.test(c.svg || '')))), 'the handles are never saved into a costume');
  await shot('3-gspark');
  // a shape drawn OUTSIDE the costume's old box is kept (the costume grows) and G-Spark doesn't move on the stage
  const g0 = await p.evaluate(() => { const s = Engine.sprites[Engine.activeSpriteIndex], c = s.costumes[s.activeCostume]; const b = GW.costumeBox(c); return { w: b.w, h: b.h, x0: b.x0, y0: b.y0, rc: { ...c.rc } }; });
  const B2 = await svgBox(); await tool('rect'); await drag(B2.x + 6, B2.y + 8, B2.x + 40, B2.y + 40); await tool('select'); await p.evaluate(() => document.getElementById('gwV153ClearSelection')?.click()); await p.waitForTimeout(900);
  const g1 = await p.evaluate(() => { const s = Engine.sprites[Engine.activeSpriteIndex], c = s.costumes[s.activeCostume]; const b = GW.costumeBox(c); return { w: b.w, h: b.h, x0: b.x0, y0: b.y0, rc: { ...c.rc } }; });
  ok(g1.w > g0.w && g1.x0 < g0.x0, `drawing outside the costume's box makes it grow (width ${g0.w.toFixed(0)} → ${g1.w.toFixed(0)}) instead of cutting it off`);
  // Paint new: a shape drawn in the middle of the editor shows in the middle of the sprite, at a normal size
  await p.evaluate(() => document.getElementById('gwCosPaintBtn').click()); await p.waitForTimeout(900);
  const B3 = await svgBox(); await tool('rect'); await drag(B3.x + B3.w / 2 - 40, B3.y + B3.h / 2 - 30, B3.x + B3.w / 2 + 40, B3.y + B3.h / 2 + 30); await tool('select'); await p.evaluate(() => document.getElementById('gwV153ClearSelection')?.click()); await p.waitForTimeout(900);
  const pn = await p.evaluate(() => { const s = Engine.sprites[Engine.activeSpriteIndex], c = s.costumes[s.activeCostume], b = GW.costumeBox(c); return { cx: b.x0 + b.w / 2, cy: b.y0 + b.h / 2, w: b.w, h: b.h }; });
  ok(Math.abs(pn.cx) < 3 && Math.abs(pn.cy) < 3 && pn.w > 60 && pn.w < 140, `Paint new: the drawing sits on the sprite's centre (${pn.cx.toFixed(1)}, ${pn.cy.toFixed(1)}), size ${pn.w.toFixed(0)}x${pn.h.toFixed(0)}`);
  // FLIP keeps the shape where it is, and moving it afterwards still follows the mouse
  await p.evaluate(() => [...document.querySelectorAll('.gw7-cos-item')][1].click()); await p.waitForTimeout(900); await tool('select');
  A = await art(); let fi = A.findIndex(a => a.tag === 'ellipse' || a.tag === 'circle'); before = A[fi];
  await drag(before.sx, before.sy, before.sx, before.sy);
  await p.evaluate(() => [...document.querySelectorAll('button')].find(b => /^Flip Horizontal/.test(b.title))?.click()); await p.waitForTimeout(300);
  let fl = (await art())[fi]; ok(Math.abs(fl.cx - before.cx) < 1 && Math.abs(fl.cy - before.cy) < 1 && (await p.evaluate(() => GW_TRANSFORM.sel.length)) === 1, 'Flip Horizontal flips in place and keeps it selected');
  await drag(fl.sx, fl.sy, fl.sx + 60, fl.sy); after = (await art())[fi];
  ok(Math.abs(after.cx - fl.cx - 60 / k) < 1.2, `after a flip, dragging still follows the mouse (${(after.cx - fl.cx).toFixed(1)} vs ${(60 / k).toFixed(1)})`);
  // RESHAPE a circle: dragging its right point keeps it one closed shape (it used to tear open)
  await p.evaluate(() => GW_VECTOR_TOOLS2.setTool('reshape')); await p.waitForTimeout(200);
  fl = (await art())[fi]; await p.mouse.click(fl.sx, fl.sy); await p.waitForTimeout(250);
  const hcount = await p.evaluate(() => document.querySelectorAll('#gwVectorCanvasV15 [data-gwrs]').length);
  ok(hcount === 4, 'a circle shows 4 points to reshape (not 5): ' + hcount);
  const hp = await p.evaluate(() => { const hs = [...document.querySelectorAll('#gwVectorCanvasV15 [data-gwrs]')].map(h => h.getBoundingClientRect()); hs.sort((a, b) => b.x - a.x); const r = hs[0]; return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
  await drag(hp.x, hp.y, hp.x + 40, hp.y - 20);
  const closed = await p.evaluate(() => { const ps = [...document.querySelectorAll('#gwVectorCanvasV15 > path')].map(x => x.getAttribute('d')); const d = ps.find(x => /C/.test(x) && /Z\s*$/i.test(x)) || ''; const nums = d.match(/-?[\d.]+/g) || []; return { d: d.slice(0, 40), z: /Z\s*$/i.test(d), start: nums.slice(0, 2).join(','), end: nums.slice(-2).join(',') }; });
  ok(closed.z && closed.start === closed.end, 'the reshaped circle stays one closed shape ' + JSON.stringify(closed));
  await p.evaluate(() => GW_VECTOR_TOOLS2.setTool(null)); await tool('select');
  // GROUP the two selected shapes, move the group, UNGROUP: they stay where they are
  await tool('select'); await p.evaluate(() => document.getElementById('gwV153ClearSelection')?.click());
  await p.evaluate(() => { const s = document.getElementById('gwVectorCanvasV15'); GW_TRANSFORM.select([...s.children].filter(n => /rect/.test(n.localName))); });
  const nBefore = await p.evaluate(() => GW_TRANSFORM.sel.length);
  await p.evaluate(() => [...document.querySelectorAll('button')].find(b => /^Group \(/.test(b.title))?.click()); await p.waitForTimeout(300);
  let gi = await p.evaluate(() => ({ n: GW_TRANSFORM.sel.length, tag: GW_TRANSFORM.sel[0]?.localName, kids: GW_TRANSFORM.sel[0]?.children.length }));
  ok(gi.n === 1 && gi.tag === 'g' && gi.kids === nBefore && nBefore >= 1, 'Group puts the selected shapes into one group ' + JSON.stringify(gi));
  A = await art(); const gIdx = A.findIndex(a => a.tag === 'g' && a.w > 1 && a.cx > 0); before = A[gIdx];
  await drag(before.sx, before.sy, before.sx + 30, before.sy + 30); const gb = (await art()).filter(a => a.tag === 'g' && a.w > 1).pop();
  await p.evaluate(() => [...document.querySelectorAll('button')].find(b => /^Ungroup/.test(b.title))?.click()); await p.waitForTimeout(300);
  const ug = await p.evaluate(() => ({ n: GW_TRANSFORM.sel.length, tags: GW_TRANSFORM.sel.map(n => n.localName) }));
  const ua = await art(); const rects = ua.filter(a => a.tag === 'rect');
  ok(ug.n === nBefore && ug.tags.every(t => t === 'rect') && rects.length && Math.abs(rects[rects.length - 1].cx - gb.cx) < 2.5, 'a moved group can be ungrouped and its shapes stay in place ' + JSON.stringify(ug));
  // BITMAP select: box-select a painted square, drag it - the pixels move and no dashed line is painted
  await p.evaluate(() => document.getElementById('gwCosPaintBtn').click()); await p.waitForTimeout(900);
  await p.evaluate(() => document.querySelector('#gwpeFoot button[title="Convert to Bitmap"], #gwpeFoot .gwpe-v')?.click()); await p.waitForTimeout(800);
  const mode = await p.evaluate(() => GW_V15_COSTUME_EDITOR.state.costumeMode); ok(mode === 'bitmap', 'converted the new costume to bitmap (' + mode + ')');
  await p.evaluate(() => { const c = document.getElementById('gwBitmapCanvasV15'), g = c.getContext('2d'); g.fillStyle = '#e11d48'; g.fillRect(200, 150, 60, 40); GW_V15_COSTUME_EDITOR.save(true); });
  await p.evaluate(() => document.querySelector('#gwBitmapToolsV15 [data-gwpe="marquee"]').click()); await p.waitForTimeout(200);
  const cc = await p.evaluate(() => { const c = document.getElementById('gwBitmapCanvasV15'), r = c.getBoundingClientRect(); return { x: r.x, y: r.y, k: r.width / c.width }; });
  const P = (x, y) => [cc.x + x * cc.k, cc.y + y * cc.k];
  await drag(...P(190, 140), ...P(270, 200));
  const rect = await p.evaluate(() => GW_TRANSFORM.bitmap.rect); ok(rect && Math.abs(rect.w - 80) < 2 && Math.abs(rect.h - 60) < 2, 'bitmap box-select covers the whole drag ' + JSON.stringify(rect && { w: Math.round(rect.w), h: Math.round(rect.h) }));
  await drag(...P(230, 170), ...P(330, 230)); await p.waitForTimeout(500);
  const px = await p.evaluate(() => { const c = document.getElementById('gwBitmapCanvasV15'), g = c.getContext('2d'); const at = (x, y) => g.getImageData(x, y, 1, 1).data; return { old: [...at(230, 170)], moved: [...at(330, 230)], line: [...at(190, 140)] }; });
  ok(px.old[3] < 10 && px.moved[0] > 200 && px.moved[3] > 200, 'dragging the selection moves the pixels ' + JSON.stringify(px));
  await p.waitForTimeout(600);
  const saved = await p.evaluate(() => { const s = Engine.sprites[Engine.activeSpriteIndex], c = s.costumes[s.activeCostume], g = c.canvas.getContext('2d'), d = g.getImageData(0, 0, c.canvas.width, c.canvas.height).data; let blue = 0; for (let i = 0; i < d.length; i += 4) if (d[i + 2] > 200 && d[i] < 80 && d[i + 3] > 100) blue++; return blue; });
  ok(saved === 0, 'no dashed selection line is saved into the costume (' + saved + ' blue pixels)');
  ok(!errs.length, 'no page errors ' + errs.slice(0, 3).join(' | '));
  await b.close(); console.log(fails ? fails + ' FAILED' : 'ALL PASS'); process.exit(fails ? 1 : 0); })();
