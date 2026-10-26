// G-Warp builder (browser side). Injected into the G-Warp page by lib/gw.js -> window.GWB.
// It builds REAL G-Warp blocks, sprites, costumes and sounds through G-Warp's own APIs (GW_V1571 block builders, GW9 expression
// slots, GW_V1580_MYBLOCKS custom blocks, GW_VARS, createDefaultSprite). Taken from the code Claude used for the
// "Clone Multiplayer!" G-Warp remix (2026-10-25/26). See ../README.md for every helper and the rules.
window.GWB = (() => {
  const E = window.Engine, A = window.GW_V1571, G9 = window.GW9, MB = window.GW_V1580_MYBLOCKS;
  const ws = document.getElementById('workspaceCanvas');
  const isN = v => v && typeof v === 'object';
  const lit = v => ({ type: 'literal', value: String(v) });
  const N = v => (isN(v) ? v : lit(v));
  const V = n => ({ type: 'get_var', name: n });
  const P = n => ({ type: 'parameter', name: n, kind: 'value' });
  const op = (t, ...a) => ({ type: t, args: a.map(N) });
  const add = (a, b) => op('op_add', a, b), sub = (a, b) => op('op_sub', a, b), mul = (a, b) => op('op_mul', a, b), div = (a, b) => op('op_div', a, b), mod = (a, b) => op('op_mod', a, b);
  const eq = (a, b) => op('op_eq', a, b), lt = (a, b) => op('op_lt', a, b), gt = (a, b) => op('op_gt', a, b);
  const and = (...c) => c.reduce((x, y) => ({ type: 'op_and', args: [x, y] })), or = (...c) => c.reduce((x, y) => ({ type: 'op_or', args: [x, y] }));
  const not = c => ({ type: 'op_not', args: [c] });
  const join = (...s) => s.map(N).reduce((x, y) => ({ type: 'op_join', args: [x, y] }));
  const abs = a => ({ type: 'op_mathop', op: 'abs', args: [N(a)] }), round = a => ({ type: 'op_round', args: [N(a)] });
  const rnd = (a, b) => op('op_random', a, b), letter = (i, s) => op('op_letter', i, s), length = s => op('op_length', s);
  const item = (l, i) => ({ type: 'list_item', name: l, index: N(i) }), llen = l => ({ type: 'list_length', name: l });
  const key = k => ({ type: 'key_pressed', key: k });
  const X = { type: 'x_position' }, Y = { type: 'y_position' }, DIR = { type: 'direction' }, COST = { type: 'costume_number' };
  /* ---------------- block helpers (G-Warp's own block builders) ---------------- */
  const own = b => [...b.querySelectorAll('.block-input')].filter(i => i.closest('.scratch-block') === b && !i.closest('.gw-input-slot'));
  function C(type, inputs = [], menus = [], x = {}) {
    let b;
    if (type === 'if_else') {
      b = A.blk('if_else', [], menus); if (x.cond) G9.setSlotNode(b.querySelector('.gw-input-slot[data-slot-kind="boolean"]'), x.cond);
      const bodies = b.querySelectorAll(':scope > .block-c-body'); (x.body || []).forEach(s => bodies[0].appendChild(s));
      (x.else || []).forEach(s => (b.querySelector(':scope > .block-c-else') || bodies[1]).appendChild(s));
    } else if (['if', 'repeat', 'forever', 'repeat_until'].includes(type)) b = A.cblk(type, x.body || [], [], x.cond || null);
    else { b = A.blk(type, [], menus); if (x.cond) G9.setSlotNode(b.querySelector('.gw-input-slot[data-slot-kind="boolean"]'), x.cond); }
    const ins = own(b);
    for (let i = inputs.length - 1; i >= 0; i--) {
      const v = inputs[i], inp = ins[i]; if (!inp) throw new Error(`${type}: no input ${i}`);
      if (isN(v) && v.type !== 'literal') G9.setSlotNode(window.GW_V1571_SLOTIFY(inp), v);
      else { const s = isN(v) ? v.value : String(v); inp.value = s; inp.setAttribute('value', s); }
    }
    if (x.menuExpr) b.dataset.gw9MenuExpr = JSON.stringify([{ i: 0, node: x.menuExpr }]);
    return b;
  }
  const IF = (cond, ...body) => C('if', [], [], { cond, body });
  const IFE = (cond, body, els) => C('if_else', [], [], { cond, body, else: els });
  const SET = (v, val) => C('set_var', [val], [v]), CHG = (v, val) => C('change_var', [val], [v]);
  const REP = (l, i, val) => C('list_replace', [i, val], [l]), LADD = (l, val) => C('list_add', [val], [l]), LCLR = l => C('list_clear', [], [l]);
  const COSTUME = node => (isN(node) ? C('switch_costume', [], ['costume1'], { menuExpr: node }) : C('switch_costume', [], [String(node)]));
  function stack(owner, x, y, blocks) {
    const st = document.createElement('div'); st.className = 'block-stack'; st.dataset.owner = String(owner); st.style.left = x + 'px'; st.style.top = y + 'px';
    blocks.forEach(b => st.appendChild(b)); ws.appendChild(st); return st;
  }
  function comment(owner, x, y, text, width = 260) {
    const st = document.createElement('div'); st.className = 'block-stack gw38-stack'; st.dataset.owner = String(owner); st.style.left = x + 'px'; st.style.top = y + 'px';
    st.innerHTML = '<div class="gw38-comment"><div class="gw38-bar"><button type="button" class="gw38-fold" title="Fold / unfold">▾</button><span>Comment</span><button type="button" class="gw38-x" title="Delete comment" aria-label="Delete comment">×</button></div><textarea spellcheck="false" placeholder="Say what this script does…"></textarea></div>';
    const ta = st.querySelector('textarea'); ta.textContent = text; st.firstElementChild.style.width = width + 'px';
    const lines = text.split('\n').reduce((n, l) => n + Math.max(1, Math.ceil(l.length / (width / 7.2))), 0); ta.style.height = (lines * 18 + 24) + 'px'; ws.appendChild(st); return st;
  }
  function define(owner, x, y, proccode, names, body) {
    const d = { proccode, names, types: MB.argTypes(proccode), warp: true }; const def = MB.buildDefine(d);
    body.forEach(el => def.querySelector(':scope > .block-c-body').appendChild(el)); stack(owner, x, y, [def]); return d;
  }
  const CALL = (d, ...args) => MB.buildCall(d, args.map(N));
  const kids = el => [...el.children].filter(x => x.classList.contains('scratch-block'));
  const stacksOf = i => [...ws.querySelectorAll(':scope > .block-stack')].filter(s => +s.dataset.owner === i);
  const slotOf = b => b.querySelector(':scope > .block-c-header > .gw-input-slot[data-slot-kind="boolean"], :scope > .gw-input-slot[data-slot-kind="boolean"]');
  /* ---------------- costumes, sprites, variables, sounds (G-Warp's data model) ---------------- */
  async function costume(name, svg, rc) {
    const im = await new Promise(r => { const x = new Image(); x.onload = () => r(x); x.onerror = () => r(null); x.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg); });
    const w = Math.max(1, im?.naturalWidth || 1), h = Math.max(1, im?.naturalHeight || 1), R = Math.max(0.25, Math.min(2, 4096 / Math.max(w, h)));
    const cv = document.createElement('canvas'); cv.width = Math.ceil(w * R); cv.height = Math.ceil(h * R); if (im) cv.getContext('2d').drawImage(im, 0, 0, cv.width, cv.height);
    return { name, canvas: cv, rc: { x: rc.x, y: rc.y }, res: R, natural: true, dataFormat: 'svg', svg };
  }
  async function newSprite(name, list, extra = {}) {
    const s = window.createDefaultSprite(name, '#8b5cf6'); s.costumes = []; for (const c of list) s.costumes.push(await costume(c.name, c.svg, c.rc));
    Object.assign(s, { activeCostume: 0, visible: false, x: 0, y: 0, size: 100, direction: 90, rotationStyle: 'left-right', sounds: [] }, extra); E.sprites.push(s); return s;
  }
  const locals = (s, names) => { const o = GW_VARS.localsOf(s); names.forEach(n => { if (!(n in o)) o[n] = 0; }); };
  const globalList = n => { if (!E.lists[n]) GW.createList(n); E.listVisible[n] = false; };
  const globalVar = n => { if (!(n in E.variables)) GW.createVariable(n); E.variableVisible[n] = false; };
  function wav(buf) { const d = buf.getChannelData(0), n = d.length, ab = new ArrayBuffer(44 + n * 2), v = new DataView(ab), w = (o, s) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
    w(0, 'RIFF'); v.setUint32(4, 36 + n * 2, true); w(8, 'WAVE'); w(12, 'fmt '); v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true); v.setUint32(24, buf.sampleRate, true); v.setUint32(28, buf.sampleRate * 2, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true); w(36, 'data'); v.setUint32(40, n * 2, true);
    for (let i = 0; i < n; i++) v.setInt16(44 + i * 2, Math.max(-1, Math.min(1, d[i])) * 32767, true);
    let bin = ''; const by = new Uint8Array(ab); for (let i = 0; i < by.length; i += 0x8000) bin += String.fromCharCode(...by.subarray(i, i + 0x8000)); return 'data:audio/wav;base64,' + btoa(bin); }
  // G-Warp's synth (Web Audio, offline): little game sounds made from oscillators and noise - no recordings
  async function synth(name, dur, build) {
    const sr = 22050, ctx = new OfflineAudioContext(1, Math.ceil(sr * dur), sr); const out = ctx.createGain(); out.connect(ctx.destination);
    const noise = (t0, t1, type, f0, f1, g0) => { const nb = ctx.createBuffer(1, Math.ceil(sr * (t1 - t0)), sr), dd = nb.getChannelData(0); for (let i = 0; i < dd.length; i++) dd[i] = Math.random() * 2 - 1;
      const s = ctx.createBufferSource(); s.buffer = nb; const f = ctx.createBiquadFilter(); f.type = type; f.Q.value = 1.2; f.frequency.setValueAtTime(f0, t0); f.frequency.exponentialRampToValueAtTime(f1, t1);
      const g = ctx.createGain(); g.gain.setValueAtTime(g0, t0); g.gain.exponentialRampToValueAtTime(0.001, t1); s.connect(f); f.connect(g); g.connect(out); s.start(t0); s.stop(t1); };
    const tone = (t0, t1, type, f0, f1, g0) => { const o = ctx.createOscillator(); o.type = type; o.frequency.setValueAtTime(f0, t0); o.frequency.exponentialRampToValueAtTime(f1, t1);
      const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.linearRampToValueAtTime(g0, t0 + 0.006); g.gain.exponentialRampToValueAtTime(0.001, t1); o.connect(g); g.connect(out); o.start(t0); o.stop(t1); };
    build(noise, tone); const buf = await ctx.startRendering();
    return { name, dataUrl: wav(buf), dataFormat: 'wav', sampleRate: sr, sampleCount: buf.length, duration: dur, source: 'gwarp' };
  }
  return { isN, lit, N, V, P, op, add, sub, mul, div, mod, eq, lt, gt, and, or, not, join, abs, round, rnd, letter, length, item, llen, key, X, Y, DIR, COST, own, C, IF, IFE, SET, CHG, REP, LADD, LCLR, COSTUME, stack, comment, define, CALL, kids, stacksOf, slotOf, costume, newSprite, locals, globalList, globalVar, wav, synth };
})();
