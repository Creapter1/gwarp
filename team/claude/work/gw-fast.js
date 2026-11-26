/* gw-fast.js - SCRIPTS AS FAST CODE (Claude Fable, 26 Nov 2026). Step 2 of team/claude/TURBO-STYLE-PLAN.md. EXPERIMENT, OFF by default.
   Turn on for a test:  window.GW_FAST_ON = true  (before a project starts).

   What it does: when a script starts, G-Warp writes one JavaScript function for it (a function that can pause and go on later),
   once, and runs that function instead of walking the blocks one by one. G-Warp's own design, written from the plan; no code from
   TurboWarp or Scratch.

   Stage 2.0 (this file today): the SHAPE of a script is real code: forever / repeat / repeat until / if / if else / My Block calls.
   Every other block is run through the block code G-Warp already has (the go-between, R.runOne), so every block keeps working.
   The pause rules are the old runner's own rules, line by line (app.html, "v15.8.0 runner", ScriptThread.prototype.step):
     - end of a loop pass: pause, unless inside a "run without screen refresh" My Block (then only after 500 ms)
     - after a wait block: always pause          - after a block that made the script wait (glide, ask, broadcast and wait): pause
     - every block counts: after 5000 blocks, or 10 ms, pause (not inside "run without screen refresh")
   Next stages move block families to real code one by one: data, operators, My Block inputs, motion, looks, ... */
(() => {
  'use strict';
  const GW = window.GW; if (!GW) return;
  let R = null;                                    // the old runner's own helpers (GW.__runner)
  const rt = { ops: 0, start: 0, RETRY: {} };
  const on = () => window.GW_FAST_ON !== false; // ON since v15.70.17 (owner: speed first). Off: window.GW_FAST_ON = false
  const stats = { compiled: 0, started: 0, fellBack: 0, lastError: null, madeValues: 0, madeBlocks: 0, wentStale: 0, notPure: {} };

  /* ---------- helpers the made code calls ---------- */
  // run one block the old way. 1 = done, 0 = its answer is not ready yet (run it again after a pause)
  rt.run = (th, b) => { try { R.runOne(th, b); } catch (e) { if (e && e === R.RETRY()) return 0; console.warn('[G-Warp fast]', b.dataset.type, e); try { window.GW_HEALTH?.blockError?.(th, b, e); } catch (x) {} } return 1; };
  rt.waiting = th => R.waiting(th, performance.now());
  rt.tick = th => { const o = rt.ops; if (o > R.LIMIT_OPS) { if (!R.warpOn(th)) return true; if ((o & 255) === 0 && performance.now() - rt.start > R.WARP_MS) { R.heavy(th, rt.start); return true; } } if ((o & 7) === 0 && !R.warpOn(th) && performance.now() - rt.start > R.FRAME_MS) return true; return false; }; // 26 Nov: warp is checked before the clock (the clock was read every 8 blocks inside warp)
  // end of a loop pass: true = pause now
  /* 26 Nov (Claude, speed): when this is the only script that ran in the last pass and nothing asked for a redraw, the frame loop would
     just start this same script again (Scratch's rule: keep running scripts until a redraw is asked or the frame time is used). So go on here,
     without the trip through the frame loop. Checks the clock every 64 passes. Off: window.GW_FAST_SOLO = false */
  rt.solo = 0;
  rt.pass = th => { if (!R.warpOn(th)) { const G = window.GW; if (G.__redraw || G.__act > 1 || G.__actPrev > 1 || window.GW_FAST_SOLO === false || !G.__frameAt) return true; if ((++rt.solo & 63) === 0 && performance.now() - G.__frameAt > (G.__work || 12)) return true; return false; } if ((++rt.solo & 63) === 0 && performance.now() - rt.start > R.WARP_MS) { R.heavy(th, rt.start); return true; } return false; };
  // a condition: 1 true, 0 false, 2 not ready yet
  rt.cond = (th, b) => { b.__thread = th; try { return R.cond(th, b) ? 1 : 0; } catch (e) { if (e && e === R.RETRY()) return 2; return 0; } };
  // how often a repeat block runs; -1 = not ready yet
  rt.count = (th, b) => { b.__thread = th; try { return Math.round(window.GW8.coerceNumber(window.GW8.resolveInput(th, b, 0, '0'))); } catch (e) { if (e && e === R.RETRY()) return -1; console.warn('[G-Warp fast] repeat', e); return 0; } };
  // a My Block call: 0 = not ready yet, 1 = nothing to run, else the made function of its definition (its frame is on th.callStack)
  rt.call = (th, b) => { const cs = th.callStack, n = cs.length; b.__thread = th; try { R.callCustom(th, b); } catch (e) { if (e && e === R.RETRY()) return 0; console.warn('[G-Warp fast] call', e); return 1; } if (cs.length <= n) return 1; const f = cs[cs.length - 1]; if (f.type !== 'custom' || !f.c) return 2; return fnFor(R.kids(f.c), f.c) || 2; };
  // frames the old way put on the stack (loop blocks of extensions, ...) are run the old way until they are gone. true = pause now
  rt.drain = (th, floor) => th.__gwLoop(rt.start, performance.now(), floor) !== 0;

  /* ---------- stage 2.1: values and variable blocks as real code ----------
     A round block in a slot is kept as a small tree (the slot's data note). When every piece of the tree is one of the plain kinds
     below, the tree becomes one JavaScript expression that uses the very same helpers as the old evaluator (GW9.fastK), so the
     answers are the same. Anything else (an extension's reporter, a sensing block, ...) stays with the old evaluator.
     A made piece is only used while the slot still holds the same tree (checked once after every change of the code area). */
  rt.chk = K => { if (K.dead) return false; for (const [el, raw, b] of K.checks) if (!b.isConnected || el.getAttribute('data-expr') !== raw) { K.dead = true; stats.wentStale++; return false; } K.ep = GW.__wsEpoch; return true; };
  rt.nm = sel => (window.GW_MENU_CACHE === false ? sel.value : GW.__menuValue(sel)) || 'my variable';
  rt.sv = (th, name, v, b) => { th.__gwLast = b; window.GW9.setScopedValue(th, name, v); GW.refreshVariableMonitors?.(); };
  rt.cv = (th, name, v, b) => { const G9 = window.GW9, G8 = window.GW8; let val = v; if (typeof v !== 'number' && typeof v !== 'boolean') { const st = String(v ?? '').trim(), n = Number(st); val = Number.isFinite(n) && st !== '' ? n : v; } th.__gwLast = b; G9.setScopedValue(th, name, G8.coerceNumber(G9.scopedValue(th, name)) + G8.coerceNumber(val)); GW.refreshVariableMonitors?.(); };
  // variable and list blocks with a typed value (or a value the old evaluator must work out): straight to the old fast path, which reads the
  // typed box at run time, so an edit while running is seen. 1 = done, 0 = not ready yet, 2 = an unusual block (the go-between takes it)
  /* 26 Nov (Claude, speed): set / change variable with a TYPED number. The number is read once when the code is made and used as a constant.
     Typing in the code area (input / change events) moves GW.__typeEp, and the made code then goes back to the normal path until it is made again. */
  if (!window.__gwTypeEpOn) { window.__gwTypeEpOn = 1; window.GW.__typeEp = 0; ['input', 'change'].forEach(ev => addEventListener(ev, e => { if (e.target && e.target.closest && e.target.closest('#workspaceCanvas')) window.GW.__typeEp++; }, true)); }
  rt.setN = (th, b, nm, str, h) => { th.__gwLast = b; const G9 = window.GW9, o = h || rt.vh(th, nm); if (o) o[nm] = str; else G9.setScopedValue(th, nm, str); GW.refreshVariableMonitors?.(); };
  rt.chgN = (th, b, nm, n, h) => { th.__gwLast = b; const G9 = window.GW9, o = h || rt.vh(th, nm); if (o) { const x = o[nm]; o[nm] = (typeof x === 'number' ? x : window.GW8.coerceNumber(x === undefined ? '' : x)) + n; } else G9.setScopedValue(th, nm, window.GW8.coerceNumber(G9.scopedValue(th, nm)) + n); GW.refreshVariableMonitors?.(); };
  /* where a variable lives, remembered per thread: valid while the thread's top frame, the sprite, the code-area epoch and the variable set stay the same */
  window.GW_FAST_RT = rt;
  rt.vh = (th, nm) => { const G9 = window.GW9; if (!G9.varHome) return null; const cs = th.callStack, top = cs.length ? cs[cs.length - 1] : null, sp = window.GW.__ctxSprite, ep = window.GW.__wsEpoch, vs = window.Engine.variables;
    let m = th.__gwVH; if (!m || m.top !== top || m.sp !== sp || m.ep !== ep || m.vs !== vs || m.n !== cs.length) m = th.__gwVH = { top, sp, ep, vs, n: cs.length, o: Object.create(null) };
    let o = m.o[nm]; if (o === undefined) { o = G9.varHome(th, nm); if (o && !(nm in o)) return o; m.o[nm] = o; } return o; };
  rt.setV = (th, b, nm, x, h) => { th.__gwLast = b; const G9 = window.GW9, o = h || rt.vh(th, nm); if (o) o[nm] = x; else G9.setScopedValue(th, nm, x); GW.refreshVariableMonitors?.(); };
  rt.chgV = (th, b, nm, x, h) => { th.__gwLast = b; const G9 = window.GW9, C = window.GW8.coerceNumber, o = h || rt.vh(th, nm); const add = C(x); if (o) { const v = o[nm]; o[nm] = (typeof v === 'number' ? v : C(v === undefined ? '' : v)) + add; } else G9.setScopedValue(th, nm, C(G9.scopedValue(th, nm)) + add); GW.refreshVariableMonitors?.(); };
  /* step 2: the inputs of a block run by the go-between, worked out by the made code instead of syncProxies (same writes, same "literal" marks) */
  /* the hidden helper box of a FILLED slot keeps its worked-out answer in JavaScript, not in the page (writing an input's text is slow).
     Only while its slot holds a reporter; an empty slot's box acts exactly as before. Off: window.GW_FAST_SHADOW = false */
  const IV = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
  const shadow = p => { if (p.__gwSh || window.GW_FAST_SHADOW === false) return; p.__gwSh = 1; const live = el => { const pa = el.parentNode; return !!pa && pa.nodeType === 1 && pa.hasAttribute('data-expr') && el.hasAttribute('data-slot-proxy'); };
    Object.defineProperty(p, 'value', { configurable: true, get() { return live(this) && this.__gwv !== undefined ? this.__gwv : IV.get.call(this); }, set(v) { if (live(this)) this.__gwv = String(v); else { this.__gwv = undefined; IV.set.call(this, v); } } }); };
  rt.pre = (th, b, vals) => { const parts = GW.ownParts(b).cmd, lit = new Set(); for (let k = 0; k < parts.length; k++) { const p = parts[k][1]; if (!p || vals[k] === undefined) continue; const sv = String(vals[k] ?? ''); lit.add(sv); if (!p.__gwSh) shadow(p); if (p.__gwSh) p.__gwv = sv; else if (p.__gwv !== sv || p.value !== sv) { p.__gwv = sv; p.value = sv; } } th.__gwSynced = b; th.__gwLit = lit; };
  rt.lst = (th, b, t, nm, x, y) => { th.__gwLast = b; const a = GW.list(nm);
    if (t === 'list_add') a.push(String(x));
    else if (t === 'list_replace') { const i = GW.toListIndex(String(x), a.length, false); if (i) a[i - 1] = String(y); }
    else if (t === 'list_delete') { const i = GW.toListIndex(String(x), a.length, true); if (i === 'ALL') a.length = 0; else if (i) a.splice(i - 1, 1); }
    else { const i = GW.toListIndex(String(y), a.length + 1, false); if (i && i <= 200000) a.splice(i - 1, 0, String(x)); }
    GW.refreshListMonitors(); };
  rt.fv = (th, b, t) => { b.__thread = th; try { return GW.__fastVar(th, b, t) ? 1 : 2; } catch (e) { if (e && e === R.RETRY()) return 0; console.warn('[G-Warp fast]', t, e); return 1; } };
  rt.fl = (th, b, t) => { b.__thread = th; try { return GW.__fastList(th, b, t) ? 1 : 2; } catch (e) { if (e && e === R.RETRY()) return 0; console.warn('[G-Warp fast]', t, e); return 1; } };
  const PURE = { literal: 1, get_var: 1, op_add: 1, op_sub: 1, op_mul: 1, op_div: 1, op_mod: 1, op_gt: 1, op_lt: 1, op_eq: 1, op_and: 1, op_or: 1, op_not: 1, op_join: 1, op_round: 1, list_item: 1, list_length: 1, op_mathop: 1, parameter: 1, op_length: 1, op_letter: 1 };
  const S = v => JSON.stringify(v);
  // null = this tree cannot be made into code
  let VREF = null; // set while a script is being written: name -> the made code's variable that holds where it lives
  function expr(nd, bool) {
    if (!nd) return bool ? 'false' : '""';
    const G9 = window.GW9, t = nd.type; if (!PURE[t] || !G9.fastFN0 || G9.fastFN[t] !== G9.fastFN0[t]) { stats.notPure[t] = (stats.notPure[t] || 0) + 1; return null; }
    const a = i => expr(nd.args && nd.args[i], false), ab = i => expr(nd.args && nd.args[i], true);
    const two = f => { const x = a(0), y = a(1); return x === null || y === null ? null : f(x, y); }, one = f => { const x = a(0); return x === null ? null : f(x); };
    switch (t) {
      case 'literal': return S(nd.value ?? '');
      case 'get_var': { const n = nd.name || 'my variable'; return VREF ? `rd(${VREF(n)},th,${S(n)})` : `vg(th,${S(n)})`; }
      case 'parameter': return `F.parameter(th,${S({ name: nd.name })})`;
      case 'op_add': return two((x, y) => `(num(${x})+num(${y}))`);
      case 'op_sub': return two((x, y) => `(num(${x})-num(${y}))`);
      case 'op_mul': return two((x, y) => `(num(${x})*num(${y}))`);
      case 'op_div': return two((x, y) => `(num(${x})/num(${y}))`);
      case 'op_mod': return two((x, y) => `mod(num(${x}),num(${y}))`);
      case 'op_gt': return two((x, y) => `(cmp(${x},${y})>0)`);
      case 'op_lt': return two((x, y) => `(cmp(${x},${y})<0)`);
      case 'op_eq': return two((x, y) => `(cmp(${x},${y})===0)`);
      case 'op_and': { const x = ab(0), y = ab(1); return x === null || y === null ? null : `(!!${x}&&!!${y})`; }
      case 'op_or': { const x = ab(0), y = ab(1); return x === null || y === null ? null : `(!!${x}||!!${y})`; }
      case 'op_not': { const x = ab(0); return x === null ? null : `(!${x})`; }
      case 'op_join': return two((x, y) => `(String(${x})+String(${y}))`);
      case 'op_round': return one(x => `Math.round(num(${x}))`);
      case 'op_mathop': return one(x => { const F1 = { sin: 'R10(Math.sin(N0(X)*DG))', cos: 'R10(Math.cos(N0(X)*DG))', abs: 'Math.abs(N0(X))', floor: 'Math.floor(N0(X))', ceiling: 'Math.ceil(N0(X))', sqrt: 'Math.sqrt(N0(X))' }[nd.op]; return F1 && window.GW_FAST_MATHOP !== false ? F1.replace('X', x) : `mathop(${x},${S(nd.op)})`; });
      case 'op_length': return one(x => `String(${x}).length`);
      case 'op_letter': return two((x, y) => `letter(${x},${y})`);
      case 'list_length': return `(ENG.lists?.[${S(nd.name)}]||[]).length`;
      case 'list_item': { const i = expr(nd.index, false); return i === null ? null : `item(ENG.lists?.[${S(nd.name)}]||[],${i})`; }
    }
    return null;
  }
  const PRE = 'const G=window.GW,G9=window.GW9,ENG=window.Engine,F=G9.fastFN0,{num,cmp,listIndex,mathop,nf}=G9.fastK,vh=window.GW_FAST_RT.vh;' +
    'const mod=(a,b)=>{let r=a%b;if(r/b<0)r+=b;return r;},item=(a,v)=>{const i=listIndex(v,a.length);return i?(a[i-1]??""):"";},' +
    'DG=Math.PI/180,R10=r=>Number.isFinite(r)?Math.round(r*1e10)/1e10:r,N0=x=>Number(x)||0,rd=(o,th,n)=>{if(o){const v=o[n];if(v!==undefined)return v;}return vg(th,n);},vg=(th,n)=>{const o=vh(th,n);if(!o)return G9.scopedValue(th,n);const v=o[n];return v===undefined?G9.scopedValue(th,n):v;},' +
    'letter=(x,y)=>{const i=(nf(x)||0)-1,st=String(y);return i<0||i>=st.length?"":st.charAt(i);};';

  /* ---------- the writer: blocks -> JavaScript text ---------- */
  function write(blocks) {
    const E = [], K = { ep: GW.__wsEpoch, dead: false, checks: [] }; const ref = b => { E.push(b); return 'E[' + (E.length - 1) + ']'; };
    const OK = '(K.ep===G.__wsEpoch||rt.chk(K))';
    const slotExpr = (b, slot, bool) => { if (!slot || window.GW_FAST_VALUES === false) return null; const raw = slot.getAttribute('data-expr'); if (!raw) return null; let x = null; try { x = expr(window.GW9.slotNode(slot), bool); } catch (e) { x = null; } if (x === null) return null; K.checks.push([slot, raw, b]); stats.madeValues++; return x; };
    const TICK = 'if(++rt.ops>50&&rt.tick(th))yield;';
    const PASS = 'if(th.finished)return;if(rt.pass(th))yield;';
    const condSrc = b => { const sl = GW.ownParts(b).bool, e = ref(b); const x = sl && !b.getAttribute('data-condition') ? slotExpr(b, sl, true) : null; return x === null ? `rt.cond(th,${e})` : `(${OK}?(${x}?1:0):rt.cond(th,${e}))`; };
    const COND = (b, v, src) => `for(;;){${v}=${src || condSrc(b)};if(${v}!==2)break;yield;}`;
    let uid = 0; const VN = new Map(); const vref = n => { if (!VN.has(n)) VN.set(n, 'V' + VN.size); return VN.get(n); }; VREF = window.GW_FAST_VREF === false ? null : vref;
    const seq = list => list.map(stmt).join('\n');
    const body = c => seq(c ? R.kids(c) : []);
    function stmt(b) {
      const t = b.dataset.type || '', v = 'v' + (uid++);
      switch (t) {
        case 'define_custom': return TICK;
        case 'forever': return `${TICK}for(;;){${body(R.thenBody(b))}\n${PASS}}`;
        case 'repeat': return `let ${v};for(;;){${v}=rt.count(th,${ref(b)});if(${v}!==-1)break;yield;}${TICK}if(${v}>0)for(;;){${body(R.thenBody(b))}\nif(--${v}<=0){if(window.GW_REPEAT_LAST_YIELD!==false){${PASS}}break;}${PASS}}`;
        case 'repeat_until': { const c = condSrc(b); return `let ${v};${COND(b, v, c)}${TICK}if(!${v})for(;;){${body(R.thenBody(b))}\n${COND(b, v, c)}if(${v})break;${PASS}}`; }
        case 'if': return `let ${v};${COND(b, v)}${TICK}if(${v}){${body(R.thenBody(b))}}`;
        case 'if_else': return `let ${v};${COND(b, v)}${TICK}if(${v}){${body(R.thenBody(b))}}else{${body(R.elseBody(b))}}`;
        case 'call_custom': return `let ${v},${v}d=th.callStack.length;for(;;){${v}=rt.call(th,${ref(b)});if(${v}!==0)break;yield;}${TICK}` +
          `if(${v}===2){while(rt.drain(th,${v}d))yield;if(th.finished)return;}else if(${v}!==1){yield*${v}(th,rt);if(th.finished)return;if(th.callStack.length>${v}d)th.callStack.length=${v}d;else if(th.callStack.length<${v}d)return;}`;
      }
      // every other block: the go-between
      const e = ref(b);
      let preSrc = '';
      if (window.GW_FAST_PRE !== false && GW.ownParts && !b.dataset.gw9MenuExpr) { const parts = GW.ownParts(b).cmd; if (parts.length && parts.some(([sl, p]) => p && sl && sl.getAttribute('data-expr'))) { const xs = parts.map(([sl, p]) => !p ? 'undefined' : sl && sl.getAttribute('data-expr') ? slotExpr(b, sl, false) : 'undefined'); if (xs.every(x => x !== null)) preSrc = `if(${OK})rt.pre(th,${e},[${xs.join(',')}]);`; } }
      const old = `{const d=th.callStack.length;${preSrc}while(!rt.run(th,${e}))yield;if(th.finished)return;` +
        `if(th.callStack.length>d){while(rt.drain(th,d))yield;if(th.finished)return;}else if(th.callStack.length<d)return;` +
        (t === 'wait' ? 'yield;}' : `if((th.waitUntil||th.waitCondition||th.waitBroadcast||th.motionTween)&&rt.waiting(th))yield;${TICK}}`);
      if ((t === 'set_var' || t === 'change_var') && GW.__fastVar && GW.__menuValue) {       // the same "usual block" test as the old fast path
        const sel = b.querySelector('.block-select'), slotQ = b.querySelector('.gw-input-slot[data-slot-index="0"]'), slot = [...b.querySelectorAll('.gw-input-slot[data-slot-index="0"]')].find(el => el.closest('.scratch-block') === b) || null;
        if (window.GW_FAST_ARGS === false && sel && slot && slot === slotQ && !b.dataset.gw9MenuExpr) { const x = slotExpr(b, slot, false); if (x !== null) { stats.madeBlocks++; return `if(${OK}){const b=${e};b.__thread=th;rt.${t === 'set_var' ? 'sv' : 'cv'}(th,rt.nm(${ref(sel)}),${x},b);${TICK}}else${old}`; } }
      }
      if (window.GW_FAST_ARGS !== false && (t === 'set_var' || t === 'change_var' || t === 'list_add' || t === 'list_replace' || t === 'list_delete' || t === 'list_insert') && !b.dataset.gw9MenuExpr) {
        const sel = b.querySelector('.block-select'), parts = GW.ownParts ? GW.ownParts(b).cmd : null;
        const n = t === 'list_replace' || t === 'list_insert' ? 2 : 1;
        if (sel && parts && parts.length === n) {
          const srcs = parts.map(([slot, inp]) => { if (slot && slot.getAttribute('data-expr')) return slotExpr(b, slot, false); const el = inp || (slot && slot.querySelector('.block-input')); if (!el) return null; const st = String(el.value ?? ''); return t === 'set_var' || t === 'change_var' ? null : S(st); });
          if (srcs.every(x => x !== null)) {
            stats.madeBlocks++; const TE = window.GW.__typeEp, nm = rt.nm(sel), e2 = e;
            const call = t === 'set_var' ? `rt.setV(th,${e2},${S(nm)},${srcs[0]},${VREF ? vref(nm) : 'null'})` : t === 'change_var' ? `rt.chgV(th,${e2},${S(nm)},${srcs[0]},${VREF ? vref(nm) : 'null'})` : `rt.lst(th,${e2},${S(t)},${S(nm)},${srcs[0]},${srcs[1] || '""'})`;
            const slow = `{let r;while((r=rt.${t.startsWith('list') ? 'fl' : 'fv'}(th,${e},${S(t)}))===0)yield;if(r===1){${TICK}}else${old}}`;
            return `if(${OK}&&G.__typeEp===${TE}){${call};${TICK}}else${slow}`;
          }
        }
      }
      if ((t === 'set_var' || t === 'change_var') && GW.__fastVar && window.GW_FAST_TYPED !== false) {
        const sel = b.querySelector('.block-select'), slot = [...b.querySelectorAll('.gw-input-slot[data-slot-index="0"]')].find(el => el.closest('.scratch-block') === b) || null;
        const inp = slot ? (!slot.getAttribute('data-expr') ? slot.querySelector('.block-input') : null) : ([...b.querySelectorAll('.block-input')].find(el => el.closest('.scratch-block') === b) || null);
        if (sel && inp && slot === b.querySelector('.gw-input-slot[data-slot-index="0"]') && !b.dataset.gw9MenuExpr) {
          const st = String(inp.value ?? '').trim(), n = Number(st), GV = window.Engine && window.Engine.variables;
          if (st !== '' && Number.isFinite(n) && !(GV && Object.prototype.hasOwnProperty.call(GV, st))) {
            stats.madeBlocks++; const TE = window.GW.__typeEp;
            return `if(${OK}&&G.__typeEp===${TE}){rt.${t === 'set_var' ? 'setN' : 'chgN'}(th,${e},${S(rt.nm(sel))},${t === 'set_var' ? S(st) : n},${VREF ? vref(rt.nm(sel)) : 'null'});${TICK}}else{let r;while((r=rt.fv(th,${e},${S(t)}))===0)yield;if(r===1){${TICK}}else${old}}`;
          }
        }
      }
      if ((t === 'set_var' || t === 'change_var') && GW.__fastVar) return `{let r;while((r=rt.fv(th,${e},${S(t)}))===0)yield;if(r===1){${TICK}}else${old}}`;
      if ((t === 'list_add' || t === 'list_replace' || t === 'list_delete' || t === 'list_insert') && GW.__fastList) return `{let r;while((r=rt.fl(th,${e},${S(t)}))===0)yield;if(r===1){${TICK}}else${old}}`;
      return old;
    }
    let code = seq(blocks); VREF = null;
    if (VN.size) { const names = [...VN.keys()]; code = code.replace(/yield\*([^;]+);/g, '{yield*$1;RV();}').replace(/yield;/g, '{yield;RV();}');
      code = 'let ' + names.map(n => VN.get(n)).join(',') + ';const RV=()=>{' + names.map(n => VN.get(n) + '=vh(th,' + S(n) + ')').join(';') + '};RV();\n' + code; }
    const src = '"use strict";' + PRE + 'return function*(th,rt){\n' + code + '\n}';
    return new Function('E', 'K', src)(E, K);
  }
  // one made function per place (a script's blocks, or the inside of a My Block definition), made again after the code area changed
  const made = new WeakMap();
  function fnFor(blocks, key) {
    if (!blocks.length) return null; const ep = GW.__wsEpoch, k = key || blocks[0]; const m = made.get(k);
    if (m && m.ep === ep && m.n === blocks.length && m.first === blocks[0]) return m.fn;
    let fn = null; try { fn = write(blocks); stats.compiled++; } catch (e) { stats.lastError = String(e && e.message || e); console.warn('[G-Warp fast] could not make code, the old way is used', e); }
    made.set(k, { ep, n: blocks.length, first: blocks[0], fn }); return fn;
  }

  /* ---------- start and run ---------- */
  function start(th) {
    if (!on()) return false; R = R || GW.__runner; if (!R) return false;
    if (window.GW8 && window.GW8.__bpAny) return false;                 // a breakpoint in the code: the old way (it can stop on a block)
    const bl = Array.from(th.blocks || []); if (!bl.length) return false;
    const c = bl[0].parentElement; if (!c || !bl.every(b => b.parentElement === c)) { stats.fellBack++; return false; }
    const fn = fnFor(bl); if (!fn) { stats.fellBack++; return false; }
    th.callStack = []; th.__gen = fn(th, rt); stats.started++; return true;
  }
  function drive(th, start) {
    const o = rt.ops, s = rt.start; rt.ops = 0; rt.start = start; let r;
    try { r = th.__gen.next(); } catch (e) { console.warn('[G-Warp fast] script stopped by an error', e); stats.lastError = String(e && e.message || e); th.finished = true; r = null; }
    rt.ops = o; rt.start = s;
    if (r && r.done) th.finished = true;
  }
  window.GW_FAST = { version: '2.0-experiment', start, drive, stats, on };
})();
