/* G-Warp Turbo Player (v15.61.0, Claude; 15.62.0: same-frame broadcasts, clicks, warp timer) - G-Warp's own fast runner for imported .sb3 projects.
   Written from scratch for G-Warp (MIT, like the app): it does not contain or load any Scratch / TurboWarp engine code.
   How it works: every script of the .sb3 is compiled ONCE into a JavaScript generator function (loops yield at the end
   of each frame unless the custom block is "run without screen refresh"), then threads run 30 or 60 times a second.
   Drawing: Canvas 2D - pen layer + costumes (SVG/PNG rasterised once per size bucket, effects cached).
   Supported: events, control (incl. clones), operators, data (variables + lists), looks, motion, pen, sensing
   (keys, mouse, timer), sound (play / stop / volume), custom blocks. Anything else is skipped and listed in
   GW_TURBO.unsupported so G-Warp can tell the user (and use its normal engine instead). */
(() => {
  'use strict';
  const STAGE_W = 480, STAGE_H = 360;
  const IMG_CACHE = new Map();

  /* ------------------------------------------------------------------ Scratch value rules */
  const num = v => { if (typeof v === 'number') return Number.isNaN(v) ? 0 : v; const n = Number(v); if (typeof v === 'string' && v.trim() === '') return 0; return Number.isNaN(n) ? 0 : n; };
  const isNumeric = v => typeof v === 'number' ? !Number.isNaN(v) : (typeof v === 'string' && v.trim() !== '' && !Number.isNaN(Number(v)));
  const cmp = (a, b) => {
    if (isNumeric(a) && isNumeric(b)) { const x = Number(a), y = Number(b); return x < y ? -1 : x > y ? 1 : 0; }
    const x = String(a).toLowerCase(), y = String(b).toLowerCase(); return x < y ? -1 : x > y ? 1 : 0;
  };
  const eqv = (a, b) => cmp(a, b) === 0;
  const bool = v => typeof v === 'boolean' ? v : (typeof v === 'number' ? v !== 0 && !Number.isNaN(v) : !(v === '' || v === '0' || String(v).toLowerCase() === 'false'));
  const str = v => typeof v === 'number' ? (Object.is(v, -0) ? '0' : String(v)) : String(v ?? '');
  const DEG = Math.PI / 180;
  const round10 = x => Math.round(x * 1e10) / 1e10;
  const mathop = (op, x) => {
    switch (op) {
      case 'abs': return Math.abs(x); case 'floor': return Math.floor(x); case 'ceiling': return Math.ceil(x); case 'sqrt': return Math.sqrt(x);
      case 'sin': return round10(Math.sin(x * DEG)); case 'cos': return round10(Math.cos(x * DEG));
      case 'tan': { const m = ((x % 360) + 360) % 360; if (m === 90) return Infinity; if (m === 270) return -Infinity; return round10(Math.tan(x * DEG)); }
      case 'asin': return Math.asin(x) / DEG; case 'acos': return Math.acos(x) / DEG; case 'atan': return Math.atan(x) / DEG;
      case 'ln': return Math.log(x); case 'log': return Math.log10(x); case 'e ^': return Math.exp(x); case '10 ^': return Math.pow(10, x);
    } return 0;
  };
  const listIndex = (idx, len) => {
    if (idx === 'last') return len; if (idx === 'random' || idx === 'any') return len ? 1 + Math.floor(Math.random() * len) : 0;
    const n = Math.floor(num(idx)); return n >= 1 && n <= len ? n : 0;
  };
  const randomOf = (a, b) => {
    const lo = Math.min(num(a), num(b)), hi = Math.max(num(a), num(b));
    const isInt = v => typeof v === 'number' ? Number.isInteger(v) : !String(v).includes('.');
    if (isInt(a) && isInt(b)) return lo + Math.floor(Math.random() * (hi - lo + 1));
    return lo + Math.random() * (hi - lo);
  };
  const colorToRGB = v => {
    if (typeof v === 'string' && v[0] === '#') { const h = v.length === 4 ? v.slice(1).split('').map(c => c + c).join('') : v.slice(1, 7); const n = parseInt(h, 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255, 255]; }
    const n = num(v) >>> 0; return [(n >> 16) & 255, (n >> 8) & 255, n & 255, (n >> 24) & 255 || 255];
  };
  const rgbToHsv = (r, g, b) => {
    r /= 255; g /= 255; b /= 255; const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
    let h = 0; if (d) { if (max === r) h = ((g - b) / d) % 6; else if (max === g) h = (b - r) / d + 2; else h = (r - g) / d + 4; h *= 60; if (h < 0) h += 360; }
    return [h, max ? d / max : 0, max];
  };
  const hsvToRgb = (h, s, v) => {
    const c = v * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = v - c; let r = 0, g = 0, b = 0;
    if (h < 60) [r, g, b] = [c, x, 0]; else if (h < 120) [r, g, b] = [x, c, 0]; else if (h < 180) [r, g, b] = [0, c, x];
    else if (h < 240) [r, g, b] = [0, x, c]; else if (h < 300) [r, g, b] = [x, 0, c]; else [r, g, b] = [c, 0, x];
    return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
  };
  const KEYMAP = { ' ': 'space', 'ArrowUp': 'up arrow', 'ArrowDown': 'down arrow', 'ArrowLeft': 'left arrow', 'ArrowRight': 'right arrow', 'Enter': 'enter' };
  const keyName = k => KEYMAP[k] || (k.length === 1 ? k.toLowerCase() : k.toLowerCase());

  /* ------------------------------------------------------------------ compiler */
  class Compiler {
    constructor(rt, target) { this.rt = rt; this.t = target; this.blocks = target.blocksJSON; this.uses = rt.unsupported; this.n = 0; }
    lit(x) { return JSON.stringify(x); }
    varRef(id, name, isList) {
      const v = this.rt.lookupVar(this.t, id, name, isList);
      const k = (isList ? 'L' : 'V') + (this.n++); this.refs[k] = v; return k;
    }
    input(block, name, kind = 'any') {          // -> JS expression string
      const inp = block.inputs?.[name]; if (!inp) return kind === 'num' ? '0' : kind === 'bool' ? 'false' : '""';
      const v = inp[1];
      if (v === null || v === undefined) return kind === 'num' ? '0' : kind === 'bool' ? 'false' : '""';
      if (typeof v === 'string') return this.reporter(v, kind);
      if (Array.isArray(v)) return this.primitive(v, kind);
      return '""';
    }
    primitive(p, kind) {
      const [type, val] = p;
      if (type === 12) { const k = this.varRef(p[2], p[1], false); return kind === 'num' ? `num(${k}.value)` : `${k}.value`; }
      if (type === 13) { const k = this.varRef(p[2], p[1], true); return `(${k}.value.every(x => str(x).length === 1) ? ${k}.value.join('') : ${k}.value.join(' '))`; }
      if (type === 11) return this.lit(val);
      if (kind === 'num') return String(num(val));
      if (type >= 4 && type <= 8 && isNumeric(val)) return String(Number(val));
      return this.lit(val);
    }
    field(block, name) { return block.fields?.[name]?.[0]; }
    menu(block, inputName, fieldName) {          // value of a menu input (shadow block with one field)
      const inp = block.inputs?.[inputName]; if (!inp) return '""';
      const sid = inp[1];
      if (typeof sid === 'string') {
        const sb = this.blocks[sid];
        if (sb && sb.shadow && sb.fields) { const f = fieldName || Object.keys(sb.fields)[0]; return this.lit(sb.fields[f][0]); }
        return this.reporter(sid, 'any');
      }
      return this.primitive(sid, 'any');
    }
    reporter(id, kind = 'any') {
      const b = this.blocks[id]; if (!b) return '""';
      const I = (n, k) => this.input(b, n, k), F = n => this.field(b, n);
      const N = n => I(n, 'num'), S = n => I(n, 'any'), Bo = n => I(n, 'bool');
      let e;
      switch (b.opcode) {
        case 'operator_add': e = `(${N('NUM1')} + ${N('NUM2')})`; break;
        case 'operator_subtract': e = `(${N('NUM1')} - ${N('NUM2')})`; break;
        case 'operator_multiply': e = `(${N('NUM1')} * ${N('NUM2')})`; break;
        case 'operator_divide': e = `(${N('NUM1')} / ${N('NUM2')})`; break;
        case 'operator_mod': e = `mod(${N('NUM1')}, ${N('NUM2')})`; break;
        case 'operator_round': e = `Math.round(${N('NUM')})`; break;
        case 'operator_mathop': e = `mathop(${this.lit(F('OPERATOR'))}, ${N('NUM')})`; break;
        case 'operator_random': e = `randomOf(${S('FROM')}, ${S('TO')})`; break;
        case 'operator_lt': e = `(cmp(${S('OPERAND1')}, ${S('OPERAND2')}) < 0)`; break;
        case 'operator_gt': e = `(cmp(${S('OPERAND1')}, ${S('OPERAND2')}) > 0)`; break;
        case 'operator_equals': e = `eqv(${S('OPERAND1')}, ${S('OPERAND2')})`; break;
        case 'operator_and': e = `(bool(${Bo('OPERAND1')}) && bool(${Bo('OPERAND2')}))`; break;
        case 'operator_or': e = `(bool(${Bo('OPERAND1')}) || bool(${Bo('OPERAND2')}))`; break;
        case 'operator_not': e = `!bool(${Bo('OPERAND')})`; break;
        case 'operator_join': e = `(str(${S('STRING1')}) + str(${S('STRING2')}))`; break;
        case 'operator_letter_of': e = `(str(${S('STRING')})[Math.floor(${N('LETTER')}) - 1] ?? "")`; break;
        case 'operator_length': e = `str(${S('STRING')}).length`; break;
        case 'operator_contains': e = `str(${S('STRING1')}).toLowerCase().includes(str(${S('STRING2')}).toLowerCase())`; break;
        case 'data_variable': { const k = this.varRef(b.fields.VARIABLE[1], b.fields.VARIABLE[0], false); e = kind === 'num' ? `num(${k}.value)` : `${k}.value`; return e; }
        case 'data_listcontents': { const k = this.varRef(b.fields.LIST[1], b.fields.LIST[0], true); e = `(${k}.value.every(x => str(x).length === 1) ? ${k}.value.join('') : ${k}.value.join(' '))`; break; }
        case 'data_itemoflist': { const k = this.varRef(b.fields.LIST[1], b.fields.LIST[0], true); e = `item(${k}.value, ${S('INDEX')})`; break; }
        case 'data_lengthoflist': { const k = this.varRef(b.fields.LIST[1], b.fields.LIST[0], true); e = `${k}.value.length`; break; }
        case 'data_itemnumoflist': { const k = this.varRef(b.fields.LIST[1], b.fields.LIST[0], true); e = `(${k}.value.findIndex(x => eqv(x, ${S('ITEM')})) + 1)`; break; }
        case 'data_listcontainsitem': { const k = this.varRef(b.fields.LIST[1], b.fields.LIST[0], true); e = `${k}.value.some(x => eqv(x, ${S('ITEM')}))`; break; }
        case 'argument_reporter_string_number': case 'argument_reporter_boolean': e = `(A[${this.lit(F('VALUE'))}] ?? 0)`; break;
        case 'sensing_keypressed': e = `rt.keyDown(${this.menu(b, 'KEY_OPTION')})`; break;
        case 'sensing_mousedown': e = `rt.mouse.down`; break;
        case 'sensing_mousex': e = `rt.mouse.x`; break;
        case 'sensing_mousey': e = `rt.mouse.y`; break;
        case 'sensing_timer': e = `rt.timer()`; break;
        case 'sensing_dayssince2000': e = `((Date.now() - 946684800000) / 86400000)`; break;
        case 'sensing_current': e = `rt.current(${this.lit(F('CURRENTMENU'))})`; break;
        case 'sensing_distanceto': e = `rt.distanceTo(T, ${this.menu(b, 'DISTANCETOMENU')})`; break;
        case 'sensing_username': e = '""'; break;
        case 'sensing_loudness': e = '0'; break;
        case 'motion_xposition': e = `T.x`; break;
        case 'motion_yposition': e = `T.y`; break;
        case 'motion_direction': e = `T.dir`; break;
        case 'looks_size': e = `Math.round(T.size)`; break;
        case 'looks_costumenumbername': e = F('NUMBER_NAME') === 'name' ? `T.costumes[T.costume].name` : `(T.costume + 1)`; break;
        case 'looks_backdropnumbername': e = F('NUMBER_NAME') === 'name' ? `rt.stage.costumes[rt.stage.costume].name` : `(rt.stage.costume + 1)`; break;
        case 'sound_volume': e = `T.volume`; break;
        case 'sensing_of': e = `rt.propOf(${this.menu(b, 'OBJECT')}, ${this.lit(F('PROPERTY'))}, T)`; break;
        case 'sensing_of_object_menu': e = this.lit(Object.values(b.fields)[0]?.[0] ?? ''); break;
        case 'looks_costume': case 'sensing_keyoptions': case 'sound_sounds_menu': case 'pen_menu_colorParam':
        case 'event_broadcast_menu': case 'control_create_clone_of_menu': case 'looks_backdrops': case 'motion_goto_menu':
        case 'motion_glideto_menu': case 'motion_pointtowards_menu': case 'sensing_distancetomenu': case 'sensing_touchingobjectmenu':
          e = this.lit(Object.values(b.fields)[0]?.[0] ?? ''); break;
        default: this.uses.add(b.opcode); e = '""';
      }
      if (kind === 'num') return `num(${e})`;
      return e;
    }
    stack(id, warp) {                            // -> JS statements
      let out = '';
      for (let cur = id; cur; cur = this.blocks[cur]?.next) out += this.statement(cur, warp);
      return out;
    }
    sub(b, name, warp) { const s = b.inputs?.[name]; return s && typeof s[1] === 'string' ? this.stack(s[1], warp) : ''; }
    yieldStmt(warp) { return warp ? 'if (++th.spins > 4000) { th.spins = 0; if (rt.now() - rt.frameStart > 500) yield; }\n' : 'if (!th.warp) yield;\n'; }
    statement(id, warp) {
      const b = this.blocks[id]; if (!b) return '';
      const N = n => this.input(b, n, 'num'), S = n => this.input(b, n, 'any'), Bo = n => this.input(b, n, 'bool'), F = n => this.field(b, n);
      const listK = () => this.varRef(b.fields.LIST[1], b.fields.LIST[0], true);
      switch (b.opcode) {
        case 'data_setvariableto': { const k = this.varRef(b.fields.VARIABLE[1], b.fields.VARIABLE[0], false); return `${k}.value = ${S('VALUE')};\n`; }
        case 'data_changevariableby': { const k = this.varRef(b.fields.VARIABLE[1], b.fields.VARIABLE[0], false); return `${k}.value = num(${k}.value) + ${N('VALUE')};\n`; }
        case 'data_addtolist': return `${listK()}.value.push(${S('ITEM')});\n`;
        case 'data_deleteoflist': { const k = listK(); return `{ const L = ${k}.value; const a = ${S('INDEX')}; if (a === 'all') L.length = 0; else { const i = listIndex(a, L.length); if (i) L.splice(i - 1, 1); } }\n`; }
        case 'data_deletealloflist': return `${listK()}.value.length = 0;\n`;
        case 'data_insertatlist': { const k = listK(); return `{ const L = ${k}.value; const i = listIndex(${S('INDEX')}, L.length + 1); if (i) L.splice(i - 1, 0, ${S('ITEM')}); }\n`; }
        case 'data_replaceitemoflist': { const k = listK(); return `{ const L = ${k}.value; const i = listIndex(${S('INDEX')}, L.length); if (i) L[i - 1] = ${S('ITEM')}; }\n`; }
        case 'control_if': return `if (bool(${Bo('CONDITION')})) {\n${this.sub(b, 'SUBSTACK', warp)}}\n`;
        case 'control_if_else': return `if (bool(${Bo('CONDITION')})) {\n${this.sub(b, 'SUBSTACK', warp)}} else {\n${this.sub(b, 'SUBSTACK2', warp)}}\n`;
        case 'control_repeat': { const r = 'r' + (this.n++); return `for (let ${r} = Math.round(${N('TIMES')}); ${r}-- > 0;) {\n${this.sub(b, 'SUBSTACK', warp)}${this.yieldStmt(warp)}}\n`; }
        case 'control_forever': return `for (;;) {\n${this.sub(b, 'SUBSTACK', warp)}${this.yieldStmt(warp)}}\n`;
        case 'control_repeat_until': return `while (!bool(${Bo('CONDITION')})) {\n${this.sub(b, 'SUBSTACK', warp)}${this.yieldStmt(warp)}}\n`;
        case 'control_while': return `while (bool(${Bo('CONDITION')})) {\n${this.sub(b, 'SUBSTACK', warp)}${this.yieldStmt(warp)}}\n`;
        case 'control_wait': return `{ const end = rt.now() + ${N('DURATION')} * 1000; yield; while (rt.now() < end) yield; }\n`;
        case 'control_wait_until': return `while (!bool(${Bo('CONDITION')})) yield;\n`;
        case 'control_stop': { const o = b.fields.STOP_OPTION[0]; if (o === 'all') return 'rt.stopAll(); return;\n'; if (o === 'this script') return 'return;\n'; return 'rt.stopOthers(T, th);\n'; }
        case 'control_create_clone_of': return `rt.clone(T, ${this.menu(b, 'CLONE_OPTION')});\n`;
        case 'control_delete_this_clone': return 'if (T.isClone) { rt.deleteClone(T); return; }\n';
        case 'event_broadcast': return `rt.broadcast(${this.menu(b, 'BROADCAST_INPUT')});\n`;
        case 'event_broadcastandwait': return `{ const ths = rt.broadcast(${this.menu(b, 'BROADCAST_INPUT')}); yield; while (ths.some(t => !t.done)) yield; }\n`;
        case 'procedures_call': {
          const m = b.mutation, ids = JSON.parse(m.argumentids || '[]');
          const proc = this.t.procs[m.proccode]; if (!proc) return '';
          const args = ids.map((aid, i) => `${this.lit(proc.names[i])}: ${this.input(b, aid, 'any')}`).join(', ');
          return `{ const w = ${proc.warp ? 1 : 0}; th.warp += w; try { yield* P[${this.lit(m.proccode)}](th, T, {${args}}); } finally { th.warp -= w; } }\n`;
        }
        case 'motion_gotoxy': return `rt.moveTo(T, ${N('X')}, ${N('Y')});\n`;
        case 'motion_goto': return `{ const p = rt.pointOf(T, ${this.menu(b, 'TO')}); if (p) rt.moveTo(T, p[0], p[1]); }\n`;
        case 'motion_glidesecstoxy': case 'motion_glideto': {
          const to = b.opcode === 'motion_glideto' ? `rt.pointOf(T, ${this.menu(b, 'TO')})` : `[${N('X')}, ${N('Y')}]`;
          return `{ const p = ${to}; if (p) { const x0 = T.x, y0 = T.y, d = ${N('SECS')} * 1000, t0 = rt.now(); if (d <= 0) rt.moveTo(T, p[0], p[1]); else { yield; for (;;) { const k = Math.min(1, (rt.now() - t0) / d); rt.moveTo(T, x0 + (p[0] - x0) * k, y0 + (p[1] - y0) * k); if (k >= 1) break; yield; } } } }\n`;
        }
        case 'motion_pointtowards': return `{ const p = rt.pointOf(T, ${this.menu(b, 'TOWARDS')}); if (p) { const dx = p[0] - T.x, dy = p[1] - T.y; T.dir = rt.wrapDir(dx === 0 && dy === 0 ? T.dir : 90 - Math.atan2(dy, dx) / DEG); } }\n`;
        case 'motion_ifonedgebounce': return 'rt.bounce(T);\n';
        case 'motion_setx': return `rt.moveTo(T, ${N('X')}, T.y);\n`;
        case 'motion_sety': return `rt.moveTo(T, T.x, ${N('Y')});\n`;
        case 'motion_changexby': return `rt.moveTo(T, T.x + ${N('DX')}, T.y);\n`;
        case 'motion_changeyby': return `rt.moveTo(T, T.x, T.y + ${N('DY')});\n`;
        case 'motion_movesteps': return `{ const s = ${N('STEPS')}, a = (90 - T.dir) * Math.PI / 180; rt.moveTo(T, T.x + s * Math.cos(a), T.y + s * Math.sin(a)); }\n`;
        case 'motion_pointindirection': return `T.dir = rt.wrapDir(${N('DIRECTION')});\n`;
        case 'motion_turnright': return `T.dir = rt.wrapDir(T.dir + ${N('DEGREES')});\n`;
        case 'motion_turnleft': return `T.dir = rt.wrapDir(T.dir - ${N('DEGREES')});\n`;
        case 'motion_setrotationstyle': return `T.rotationStyle = ${this.lit(F('STYLE'))};\n`;
        case 'looks_switchcostumeto': return `rt.setCostume(T, ${this.menu(b, 'COSTUME')});\n`;
        case 'looks_nextcostume': return `T.costume = (T.costume + 1) % T.costumes.length;\n`;
        case 'looks_switchbackdropto': return `rt.setCostume(rt.stage, ${this.menu(b, 'BACKDROP')});\n`;
        case 'looks_show': return 'T.visible = true;\n';
        case 'looks_hide': return 'T.visible = false;\n';
        case 'looks_setsizeto': return `T.size = Math.max(1, ${N('SIZE')});\n`;
        case 'looks_changesizeby': return `T.size = Math.max(1, T.size + ${N('CHANGE')});\n`;
        case 'looks_seteffectto': return `T.fx[${this.lit(String(F('EFFECT')).toLowerCase())}] = ${N('VALUE')};\n`;
        case 'looks_changeeffectby': { const e = this.lit(String(F('EFFECT')).toLowerCase()); return `T.fx[${e}] = (T.fx[${e}] || 0) + ${N('CHANGE')};\n`; }
        case 'looks_cleargraphiceffects': return 'T.fx = {};\n';
        case 'looks_gotofrontback': return `rt.layer(T, ${this.lit(F('FRONT_BACK'))});\n`;
        case 'looks_goforwardbackward': return `rt.layerBy(T, ${this.lit(F('FORWARD_BACKWARD'))}, ${N('NUM')});\n`;
        case 'looks_say': case 'looks_think': return `rt.say(T, ${S('MESSAGE')}, ${b.opcode === 'looks_think'});\n`;
        case 'looks_sayforsecs': case 'looks_thinkforsecs': return `{ const m = rt.say(T, ${S('MESSAGE')}, ${b.opcode === 'looks_thinkforsecs'}); const end = rt.now() + ${N('SECS')} * 1000; yield; while (rt.now() < end) yield; if (T.bubble === m) T.bubble = null; }\n`;
        case 'data_showvariable': case 'data_hidevariable': { const k = this.varRef(b.fields.VARIABLE[1], b.fields.VARIABLE[0], false); return `rt.showMonitor(${k}, ${b.opcode === 'data_showvariable'}, T);\n`; }
        case 'data_showlist': case 'data_hidelist': { const k = this.varRef(b.fields.LIST[1], b.fields.LIST[0], true); return `rt.showMonitor(${k}, ${b.opcode === 'data_showlist'}, T);\n`; }
        case 'pen_clear': return 'rt.penClear();\n';
        case 'pen_penDown': return 'T.penDown = true; rt.penDot(T);\n';
        case 'pen_penUp': return 'T.penDown = false;\n';
        case 'pen_stamp': return 'rt.stamp(T);\n';
        case 'pen_setPenSizeTo': return `T.pen.size = Math.max(1, Math.min(1200, ${N('SIZE')}));\n`;
        case 'pen_changePenSizeBy': return `T.pen.size = Math.max(1, Math.min(1200, T.pen.size + ${N('SIZE')}));\n`;
        case 'pen_setPenColorToColor': return `rt.penColor(T, ${S('COLOR')});\n`;
        case 'pen_setPenColorParamTo': return `rt.penParam(T, ${this.menu(b, 'COLOR_PARAM')}, ${N('VALUE')}, false);\n`;
        case 'pen_changePenColorParamBy': return `rt.penParam(T, ${this.menu(b, 'COLOR_PARAM')}, ${N('VALUE')}, true);\n`;
        case 'sensing_resettimer': return 'rt.resetTimer();\n';
        case 'sound_play': return `rt.playSound(T, ${this.menu(b, 'SOUND_MENU')});\n`;
        case 'sound_playuntildone': return `{ const end = rt.now() + rt.playSound(T, ${this.menu(b, 'SOUND_MENU')}) * 1000; yield; while (rt.now() < end) yield; }\n`;
        case 'sound_stopallsounds': return 'rt.stopSounds();\n';
        case 'sound_setvolumeto': return `T.volume = Math.max(0, Math.min(100, ${N('VOLUME')}));\n`;
        case 'sound_seteffectto': case 'sound_changeeffectby': case 'sound_cleareffects': return '';      // pitch / pan: not needed to play
        case 'sound_changevolumeby': return `T.volume = Math.max(0, Math.min(100, T.volume + ${N('VOLUME')}));\n`;
        default: this.uses.add(b.opcode); return '';
      }
    }
    compileScript(hatId) {
      this.refs = {};
      const hat = this.blocks[hatId];
      const body = this.stack(hat.next, false);
      return this.finish(`return function* (th, T, A) {\n${body}};`);
    }
    compileProc(defId) {
      this.refs = {};
      const def = this.blocks[defId], proto = this.blocks[def.inputs.custom_block[1]];
      const warp = String(proto.mutation.warp) === 'true';
      const body = this.stack(def.next, warp);
      return this.finish(`return function* (th, T, A) {\n${body}};`);
    }
    finish(src) {
      const names = Object.keys(this.refs);
      const f = new Function('rt', 'P', 'num', 'str', 'bool', 'cmp', 'eqv', 'mod', 'mathop', 'randomOf', 'listIndex', 'item', ...names, src);
      const item = (L, i) => { const k = listIndex(i, L.length); return k ? L[k - 1] : ''; };
      const mod = (a, b) => { const r = a % b; return r / b < 0 ? r + b : r; };
      return f(this.rt, this.t.procFns, num, str, bool, cmp, eqv, mod, mathop, randomOf, listIndex, item, ...names.map(n => this.refs[n]));
    }
  }

  /* ------------------------------------------------------------------ tiny .sb3 (zip) reader
     The browser inflates the files itself (DecompressionStream), all at once - JSZip works in small timed chunks,
     which can take many seconds on a busy editor page. JSZip is only used if the browser can't. */
  async function unzip(buf) {
    const u8 = new Uint8Array(buf), dv = new DataView(buf); let eocd = -1;
    for (let i = u8.length - 22; i >= Math.max(0, u8.length - 70000); i--) if (dv.getUint32(i, true) === 0x06054b50) { eocd = i; break; }
    if (eocd < 0 || typeof DecompressionStream === 'undefined') throw new Error('no-native-unzip');
    const n = dv.getUint16(eocd + 10, true); let p = dv.getUint32(eocd + 16, true); const out = {};
    const jobs = [];
    for (let k = 0; k < n; k++) {
      const method = dv.getUint16(p + 10, true), csize = dv.getUint32(p + 20, true), nlen = dv.getUint16(p + 28, true), elen = dv.getUint16(p + 30, true), clen = dv.getUint16(p + 32, true), loc = dv.getUint32(p + 42, true);
      const name = new TextDecoder().decode(u8.subarray(p + 46, p + 46 + nlen)); p += 46 + nlen + elen + clen;
      const start = loc + 30 + dv.getUint16(loc + 26, true) + dv.getUint16(loc + 28, true), data = u8.subarray(start, start + csize);
      if (method === 0) out[name] = data.slice();
      else if (method === 8) jobs.push(new Response(new Blob([data]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).arrayBuffer().then(b => { out[name] = new Uint8Array(b); }));
    }
    await Promise.all(jobs);
    return { file: name => out[name] ? { async: async kind => kind === 'text' ? new TextDecoder().decode(out[name]) : kind === 'arraybuffer' ? out[name].buffer.slice(out[name].byteOffset, out[name].byteOffset + out[name].byteLength) : out[name] } : null };
  }

  /* ------------------------------------------------------------------ runtime */
  class Turbo {
    constructor(canvas) {
      this.canvas = canvas; this.ctx = canvas.getContext('2d');
      this.pen = document.createElement('canvas'); this.penCtx = this.pen.getContext('2d');
      this.resize(); this.keys = new Set(); this.mouse = { x: 0, y: 0, down: false };
      this.threads = []; this.targets = []; this.unsupported = new Set(); this.fps = 30; this.running = false;
      this.audio = null; this.sounds = []; this.timerStart = performance.now(); this.frameCount = 0;
    }
    resize() {
      const r = Math.min(2, window.devicePixelRatio || 1) * Math.max(1, Math.ceil((this.canvas.clientWidth || STAGE_W) / STAGE_W));
      this.res = Math.min(3, r); this.canvas.width = STAGE_W * this.res; this.canvas.height = STAGE_H * this.res;
      const old = this.pen.width ? this.pen : null; this.pen.width = STAGE_W * this.res; this.pen.height = STAGE_H * this.res;
      this.penCtx.lineCap = 'round'; this.penCtx.lineJoin = 'round'; this._css = this._lw = null;
    }
    now() { return performance.now(); }
    timer() { return (performance.now() - this.timerStart) / 1000; }
    resetTimer() { this.timerStart = performance.now(); }
    keyDown(k) { k = String(k).toLowerCase(); if (k === 'any') return this.keys.size > 0; return this.keys.has(k); }
    current(m) { const d = new Date(); return { year: d.getFullYear(), month: d.getMonth() + 1, date: d.getDate(), dayofweek: d.getDay() + 1, hour: d.getHours(), minute: d.getMinutes(), second: d.getSeconds() }[m] ?? 0; }

    async load(arrayBuffer) {
      let zip; try { zip = await unzip(arrayBuffer); } catch (e) { zip = await JSZip.loadAsync(arrayBuffer); }
      const pj = JSON.parse(await zip.file('project.json').async('text'));
      this.globals = { vars: {}, lists: {} };
      const loadImg = async c => {
        const key = c.md5ext || (c.assetId + '.' + c.dataFormat);
        if (IMG_CACHE.has(key)) return IMG_CACHE.get(key);       // 22 Nov: pictures are decoded once; the next Start reuses them
        const f = zip.file(key); if (!f) return null;
        const blob = new Blob([await f.async('uint8array')], { type: c.dataFormat === 'svg' ? 'image/svg+xml' : 'image/' + c.dataFormat });
        const url = URL.createObjectURL(blob); const img = new Image();
        this.loading = (this.loading || 0) + 1;
        // onload, not decode(): decode() waits for an idle frame, which a busy editor page may not give for seconds
        const ok = await new Promise(res => { img.onload = () => res(true); img.onerror = () => res(false); img.src = url; });
        this.loaded = (this.loaded || 0) + 1;
        this.progress?.(this.loaded, this.loading);
        if (ok) { if (IMG_CACHE.size > 3000) IMG_CACHE.clear(); IMG_CACHE.set(key, img); }
        return ok ? img : null;
      };
      const built = await Promise.all(pj.targets.map(async tj => {
        const t = {
          name: tj.name, isStage: tj.isStage, x: tj.x || 0, y: tj.y || 0, size: tj.size || 100, dir: tj.direction ?? 90, visible: tj.isStage ? true : tj.visible !== false,
          rotationStyle: tj.rotationStyle || 'all around', costume: tj.currentCostume || 0, volume: tj.volume ?? 100, fx: {}, penDown: false,
          pen: { size: 1, h: 240, s: 1, v: 1, a: 1, css: '#0000ff' }, vars: {}, lists: {}, blocksJSON: tj.blocks, procs: {}, procFns: {}, isClone: false,
          layer: tj.layerOrder || 0, sounds: tj.sounds || [],
          costumes: await Promise.all((tj.costumes || []).map(async c => ({ name: c.name, img: await loadImg(c), cx: c.rotationCenterX, cy: c.rotationCenterY, res: c.bitmapResolution || (c.dataFormat === 'svg' ? 1 : 2), cache: {} })))
        };
        for (const [id, [n, val]] of Object.entries(tj.variables || {})) (t.isStage ? this.globals.vars : t.vars)[id] = { name: n, value: val };
        for (const [id, [n, val]] of Object.entries(tj.lists || {})) (t.isStage ? this.globals.lists : t.lists)[id] = { name: n, value: Array.isArray(val) ? val.slice() : [] };
        for (const s of t.sounds) { const f = zip.file(s.md5ext || (s.assetId + '.' + s.dataFormat)); s.data = f ? await f.async('arraybuffer') : null; }
        return t;
      }));
      for (const t of built) { this.targets.push(t); if (t.isStage) this.stage = t; }
      this.targets.sort((a, b) => a.layer - b.layer);
      this.monitors = [];
      for (const m of pj.monitors || []) {
        if (!/^data_(variable|listcontents)$/.test(m.opcode)) continue;
        const isList = m.opcode === 'data_listcontents', nm = isList ? m.params?.LIST : m.params?.VARIABLE;
        const owner = m.spriteName ? this.targets.find(t => t.name === m.spriteName) : this.stage; if (!owner) continue;
        const v = this.lookupVar(owner, m.id, nm, isList);
        this.monitors.push({ v, isList, label: (m.spriteName ? m.spriteName + ': ' : '') + nm, mode: m.mode || 'default', x: m.x || 0, y: m.y || 0, w: m.width || 0, h: m.height || 0, visible: !!m.visible });
      }
      for (const m of this.monitors) if (m.visible) { m.visible = false; this.placeMonitor(m); m.visible = true; }
      this.compileAll();
      return this;
    }
    lookupVar(t, id, name, isList) {
      const own = isList ? t.lists : t.vars, glob = isList ? this.globals.lists : this.globals.vars;
      if (own[id]) return own[id]; if (glob[id]) return glob[id];
      for (const v of Object.values(own)) if (v.name === name) return v;
      for (const v of Object.values(glob)) if (v.name === name) return v;
      const nv = { name, value: isList ? [] : 0 }; glob[id] = nv; return nv;
    }
    compileAll() {
      this.hats = [];
      for (const t of this.targets) {
        const bl = t.blocksJSON;
        for (const [id, b] of Object.entries(bl)) {
          if (b.opcode === 'procedures_definition') {
            const proto = bl[b.inputs.custom_block[1]], m = proto.mutation;
            t.procs[m.proccode] = { id, warp: String(m.warp) === 'true', names: JSON.parse(m.argumentnames || '[]') };
          }
        }
        const comp = new Compiler(this, t);
        for (const [code, p] of Object.entries(t.procs)) {
          try { t.procFns[code] = comp.compileProc(p.id); } catch (e) { console.warn('[turbo] proc', code, e); this.unsupported.add('compile:' + code); t.procFns[code] = function* () {}; }
        }
        for (const [id, b] of Object.entries(bl)) {
          if (!b.topLevel) continue;
          const kinds = { event_whenflagclicked: 'flag', event_whenbroadcastreceived: 'bc', event_whenkeypressed: 'key', control_start_as_clone: 'clone', event_whenthisspriteclicked: 'click', event_whenstageclicked: 'click' };
          const kind = kinds[b.opcode]; if (!kind) continue;
          try {
            const fn = comp.compileScript(id);
            const arg = kind === 'bc' ? String(b.fields.BROADCAST_OPTION[0]).toLowerCase() : kind === 'key' ? String(b.fields.KEY_OPTION[0]).toLowerCase() : null;
            this.hats.push({ id, target: t, kind, arg, fn });
          } catch (e) { console.warn('[turbo] script', e); this.unsupported.add('compile-script'); }
        }
      }
    }
    start(hat, target, restart = true) {
      const t = target || hat.target;
      if (t.isClone && t.ownHats && hat.id) hat = t.ownHats.find(h => h.id === hat.id) || hat;   // a clone runs its own compiled copy
      const old = this.threads.find(th => th.hat === hat && th.T === t && !th.done);
      if (old) {                                  // Scratch restarts a running script where it is in the list (it keeps its turn this frame)
        if (!restart) return old;
        old.warp = 0; old.spins = 0; old.gen = hat.fn(old, t, {}); return old;
      }
      const th = { hat, T: t, warp: 0, spins: 0, done: false }; th.gen = hat.fn(th, t, {}); this.threads.push(th); return th;
    }
    broadcast(name) {
      name = String(name).toLowerCase(); const out = [];
      for (const h of this.hats) if (h.kind === 'bc' && h.arg === name) {
        if (h.target.isClone) continue;
        out.push(this.start(h));
        for (const c of this.targets) if (c.isClone && c.source === h.target) out.push(this.start(h, c));
      }
      return out;
    }
    greenFlag() {
      this.stopAll(); this.resetTimer();
      for (const h of this.hats) if (h.kind === 'flag') this.start(h);
      if (!this.running) { this.running = true; this.loop(); }
    }
    stopAll() { for (const t of this.targets) t.bubble = null; for (const th of this.threads) th.done = true; this.threads = []; this.targets = this.targets.filter(t => !t.isClone); this.stopSounds(); }
    stopOthers(T, me) { for (const th of this.threads) if (th.T === T && th !== me) th.done = true; }
    clone(T, which) {
      const src = which === '_myself_' ? T : this.targets.find(t => t.name === which && !t.isClone); if (!src) return;
      if (this.targets.filter(t => t.isClone).length >= 300) return;
      const c = Object.assign({}, src, { isClone: true, source: src.isClone ? src.source : src, bubble: null, fx: { ...src.fx }, pen: { ...src.pen }, vars: {}, lists: {} });
      for (const [id, v] of Object.entries(src.vars)) c.vars[id] = { name: v.name, value: v.value };
      for (const [id, v] of Object.entries(src.lists)) c.lists[id] = { name: v.name, value: v.value.slice() };
      // clones need their own variable bindings: recompile that sprite's scripts against the clone's variables
      if (Object.keys(c.vars).length || Object.keys(c.lists).length) { c.procs = {}; c.procFns = {}; this.recompileFor(c); }
      this.targets.splice(this.targets.indexOf(T) , 0, c);
      for (const h of this.hats) if (h.kind === 'clone' && h.target === c.source) this.start(h, c);
    }
    recompileFor(c) {
      const bl = c.blocksJSON; c.ownHats = [];
      for (const [id, b] of Object.entries(bl)) if (b.opcode === 'procedures_definition') { const m = bl[b.inputs.custom_block[1]].mutation; c.procs[m.proccode] = { id, warp: String(m.warp) === 'true', names: JSON.parse(m.argumentnames || '[]') }; }
      const comp = new Compiler(this, c);
      for (const [code, p] of Object.entries(c.procs)) c.procFns[code] = comp.compileProc(p.id);
      const kinds = { event_whenbroadcastreceived: 'bc', event_whenkeypressed: 'key', control_start_as_clone: 'clone', event_whenthisspriteclicked: 'click' };
      for (const [id, b] of Object.entries(bl)) { const kind = b.topLevel && kinds[b.opcode]; if (!kind) continue; const arg = kind === 'bc' ? String(b.fields.BROADCAST_OPTION[0]).toLowerCase() : kind === 'key' ? String(b.fields.KEY_OPTION[0]).toLowerCase() : null; c.ownHats.push({ id, target: c, kind, arg, fn: comp.compileScript(id) }); }
    }
    deleteClone(T) { this.targets = this.targets.filter(t => t !== T); for (const th of this.threads) if (th.T === T) th.done = true; }
    wrapDir(d) { d = ((d + 179) % 360 + 360) % 360 - 179; return d; }
    setCostume(T, v) {
      if (typeof v === 'number' || (isNumeric(v) && !T.costumes.some(c => c.name === v))) {
        const n = Math.round(num(v)) - 1, L = T.costumes.length; if (L) T.costume = ((n % L) + L) % L; return;
      }
      const i = T.costumes.findIndex(c => c.name === v);
      if (i >= 0) T.costume = i;
      else if (v === 'next costume' || v === 'next backdrop') T.costume = (T.costume + 1) % T.costumes.length;
      else if (v === 'previous costume' || v === 'previous backdrop') T.costume = (T.costume - 1 + T.costumes.length) % T.costumes.length;
    }
    layer(T, where) { const i = this.targets.indexOf(T); this.targets.splice(i, 1); if (where === 'front') this.targets.push(T); else this.targets.splice(1, 0, T); }
    layerBy(T, dir, n) { const i = this.targets.indexOf(T); this.targets.splice(i, 1); const j = Math.max(1, Math.min(this.targets.length, i + (dir === 'forward' ? n : -n))); this.targets.splice(j, 0, T); }

    /* -------- movement + pen */
    bounds(T) {
      const c = T.costumes[T.costume]; if (!c || !c.img) return null; const k = T.size / 100 / c.res;
      return { w: c.img.naturalWidth * k || 2, h: c.img.naturalHeight * k || 2 };
    }
    fence(T, x, y) {           // keep a sprite on the stage like Scratch (a 15 px sliver stays inside)
      if (T.isStage) return [x, y];
      const b = this.bounds(T); if (!b) return [x, y];
      const inset = Math.floor(Math.min(15, Math.ceil(b.w / 2), Math.ceil(b.h / 2)));
      const sx = STAGE_W / 2 + b.w / 2 - inset, sy = STAGE_H / 2 + b.h / 2 - inset;
      return [Math.max(-sx, Math.min(sx, x)), Math.max(-sy, Math.min(sy, y))];
    }
    moveTo(T, x, y) {
      [x, y] = this.fence(T, x, y);
      if (T.penDown) this.penLine(T, T.x, T.y, x, y);
      T.x = x; T.y = y;
    }
    penClear() { this.penCtx.clearRect(0, 0, this.pen.width, this.pen.height); }
    penStyle(T) {
      const p = T.pen; if (p.dirty !== false) { const [r, g, b] = hsvToRgb(((p.h % 360) + 360) % 360, p.s, p.v); p.css = `rgba(${r},${g},${b},${p.a})`; p.dirty = false; }
      const c = this.penCtx; if (this._css !== p.css) { c.strokeStyle = p.css; c.fillStyle = p.css; this._css = p.css; } const w = p.size * this.res; if (this._lw !== w) { c.lineWidth = w; this._lw = w; }
    }
    penLine(T, x1, y1, x2, y2) {
      const c = this.penCtx, k = this.res; this.penStyle(T);
      c.beginPath(); c.moveTo((x1 + 240) * k, (180 - y1) * k); c.lineTo((x2 + 240) * k, (180 - y2) * k); c.stroke();
    }
    penDot(T) { const c = this.penCtx, k = this.res; this.penStyle(T); c.beginPath(); c.arc((T.x + 240) * k, (180 - T.y) * k, T.pen.size * k / 2, 0, Math.PI * 2); c.fill(); }
    penColor(T, v) { const [r, g, b, a] = colorToRGB(v); const [h, s, vv] = rgbToHsv(r, g, b); Object.assign(T.pen, { h, s, v: vv, a: a / 255, dirty: false, css: `rgba(${r},${g},${b},${a / 255})` }); }
    penParam(T, param, val, change) {
      const p = T.pen, cur = { color: p.h / 3.6, saturation: p.s * 100, brightness: p.v * 100, transparency: (1 - p.a) * 100 }[param];
      if (cur === undefined) return; let nv = change ? cur + val : val;
      if (param === 'color') { nv = ((nv % 100) + 100) % 100; p.h = nv * 3.6; } else nv = Math.max(0, Math.min(100, nv));
      if (param === 'saturation') p.s = nv / 100; if (param === 'brightness') p.v = nv / 100; if (param === 'transparency') p.a = 1 - nv / 100;
      p.dirty = true;
    }
    /* -------- costumes with effects (rasterised once per size bucket + effect combo) */
    raster(T) {
      const c = T.costumes[T.costume]; if (!c || !c.img) return null;
      const want = T.size / 100 * this.res / c.res, bucket = want <= 1 ? 1 : want <= 2 ? 2 : want <= 4 ? 4 : 8;
      const br = Math.round((T.fx.brightness || 0) / 5) * 5, co = Math.round(((((T.fx.color || 0) % 200) + 200) % 200) / 5) * 5;
      const key = bucket + '|' + br + '|' + co;
      let r = c.cache[key]; if (r) return r;
      const w = Math.max(1, Math.ceil(c.img.naturalWidth * bucket)), h = Math.max(1, Math.ceil(c.img.naturalHeight * bucket));
      const cv = document.createElement('canvas'); cv.width = w; cv.height = h; const x = cv.getContext('2d');
      x.drawImage(c.img, 0, 0, w, h);
      if (br || co) {
        const im = x.getImageData(0, 0, w, h), d = im.data, add = Math.max(-100, Math.min(100, br)) / 100;
        for (let i = 0; i < d.length; i += 4) {
          if (!d[i + 3]) continue;
          let R = d[i], G = d[i + 1], B = d[i + 2];
          if (co) { let [hh, ss, vv] = rgbToHsv(R, G, B); if (ss < 0.09) ss = 0.09; if (vv < 0.11) vv = 0.11; hh = (hh + co / 200 * 360) % 360; [R, G, B] = hsvToRgb(hh, ss, vv); }
          if (add) { R = Math.max(0, Math.min(255, R + add * 255)); G = Math.max(0, Math.min(255, G + add * 255)); B = Math.max(0, Math.min(255, B + add * 255)); }
          d[i] = R; d[i + 1] = G; d[i + 2] = B;
        }
        x.putImageData(im, 0, 0);
      }
      r = c.cache[key] = { cv, bucket }; return r;
    }
    drawTarget(ctx, T) {
      const c = T.costumes[T.costume]; if (!c || !c.img) return;
      const r = this.raster(T); if (!r) return;
      const k = this.res, s = T.size / 100 / c.res, ghost = Math.max(0, Math.min(100, T.fx.ghost || 0));
      if (ghost >= 100) return;
      ctx.save(); ctx.globalAlpha = 1 - ghost / 100;
      ctx.translate((T.x + 240) * k, (180 - T.y) * k);
      if (!T.isStage) {
        if (T.rotationStyle === 'all around') ctx.rotate((T.dir - 90) * DEG);
        else if (T.rotationStyle === 'left-right' && T.dir < 0) ctx.scale(-1, 1);
      }
      ctx.scale(s * k / r.bucket, s * k / r.bucket);
      ctx.drawImage(r.cv, -c.cx * r.bucket, -c.cy * r.bucket);
      ctx.restore();
    }
    stamp(T) { this.drawTarget(this.penCtx, T); }

    /* -------- sound */
    ensureAudio() { if (!this.audio) { try { this.audio = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { this.audio = null; } } return this.audio; }
    playSound(T, name) {
      const s = T.sounds.find(x => x.name === name) || (isNumeric(name) ? T.sounds[Math.round(num(name)) - 1] : null);
      if (!s || !s.data) return 0;
      const dur = (s.sampleCount && s.rate) ? s.sampleCount / s.rate : 0.5;
      const ac = this.ensureAudio(); if (!ac) return dur;
      const go = buf => { const src = ac.createBufferSource(), g = ac.createGain(); g.gain.value = T.volume / 100; src.buffer = buf; src.connect(g).connect(ac.destination); src.start(); this.sounds.push(src); src.onended = () => { this.sounds = this.sounds.filter(x => x !== src); }; };
      if (s.buf) go(s.buf); else if (!s.decoding) { s.decoding = true; ac.decodeAudioData(s.data.slice(0)).then(b => { s.buf = b; go(b); }).catch(() => {}); }
      return dur;
    }
    stopSounds() { for (const s of this.sounds) { try { s.stop(); } catch (e) {} } this.sounds = []; }

    /* -------- frame loop */
    step() {
      this.frameStart = performance.now();
      const list = this.threads;
      for (let i = 0; i < list.length; i++) {
        const th = list[i]; if (th.done) continue;
        try { const r = th.gen.next(); if (r.done) th.done = true; }
        catch (e) { th.done = true; console.warn('[turbo] script error', e); }
      }
      if (this.threads === list) this.threads = list.filter(t => !t.done);
      this.frameCount++;
    }
    render() {
      const ctx = this.ctx, k = this.res;
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      if (this.stage) this.drawTarget(ctx, Object.assign({}, this.stage, { x: 0, y: 0 }));
      ctx.drawImage(this.pen, 0, 0);
      for (const T of this.targets) if (!T.isStage && T.visible) this.drawTarget(ctx, T);
      for (const T of this.targets) if (T.bubble && T.visible && !T.isStage) this.drawBubble(ctx, T);
      if (this.monitors?.length) this.drawMonitors(ctx);
    }
    loop() {
      let last = performance.now(), acc = 0;
      const tick = now => {
        if (!this.running) return;
        acc += now - last; last = now; const dt = 1000 / this.fps;
        if (acc > 250) acc = dt;
        let steps = 0;
        while (acc >= dt - 1 && steps < 2) { this.step(); acc -= dt; steps++; }
        if (steps) this.render();
        this.raf = requestAnimationFrame(tick);
      };
      this.raf = requestAnimationFrame(tick);
    }
    stop() { this.running = false; cancelAnimationFrame(this.raf); this.stopAll(); }
    attachInput(el) {
      const kd = e => { if (!this.running || (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName))) return; this.keys.add(keyName(e.key)); for (const h of this.hats) if (h.kind === 'key' && (h.arg === keyName(e.key) || h.arg === 'any') && !e.repeat) this.start(h, null, false); if (e.key === ' ' || e.key.startsWith('Arrow')) e.preventDefault(); };
      const ku = e => this.keys.delete(keyName(e.key));
      const mm = e => { const r = el.getBoundingClientRect(); this.mouse.x = Math.round((e.clientX - r.left) / r.width * STAGE_W - 240); this.mouse.y = Math.round(180 - (e.clientY - r.top) / r.height * STAGE_H); };
      const md = e => { mm(e); this.mouse.down = true; this.ensureAudio(); this.click(this.mouse.x, this.mouse.y); }, mu = () => { this.mouse.down = false; };
      addEventListener('keydown', kd, true); addEventListener('keyup', ku, true); el.addEventListener('mousemove', mm); el.addEventListener('mousedown', md); addEventListener('mouseup', mu);
      this.detach = () => { removeEventListener('keydown', kd, true); removeEventListener('keyup', ku, true); el.removeEventListener('mousemove', mm); el.removeEventListener('mousedown', md); removeEventListener('mouseup', mu); };
    }
    pointOf(T, w) {              // where "go to / glide to / point towards / distance to" aims
      if (w === '_mouse_') return [this.mouse.x, this.mouse.y];
      if (w === '_random_') return [Math.round(Math.random() * 480 - 240), Math.round(Math.random() * 360 - 180)];
      const t = this.targets.find(x => x.name === w && !x.isClone && !x.isStage); return t ? [t.x, t.y] : null;
    }
    distanceTo(T, w) { const p = this.pointOf(T, w === '_random_' ? '' : w); return p ? Math.sqrt((p[0] - T.x) ** 2 + (p[1] - T.y) ** 2) : 10000; }
    bounce(T) {
      const b = this.bounds(T); if (!b) return; const hw = b.w / 2, hh = b.h / 2;
      const d = { l: T.x - hw + 240, r: 240 - (T.x + hw), t: 180 - (T.y + hh), b: T.y - hh + 180 };
      const m = Math.min(d.l, d.r, d.t, d.b); if (m > 0) return;
      const a = (90 - T.dir) * DEG; let dx = Math.cos(a), dy = Math.sin(a);
      if (m === d.l) dx = Math.max(0.2, Math.abs(dx)); else if (m === d.r) dx = -Math.max(0.2, Math.abs(dx)); else if (m === d.t) dy = -Math.max(0.2, Math.abs(dy)); else dy = Math.max(0.2, Math.abs(dy));
      T.dir = this.wrapDir(90 - Math.atan2(dy, dx) / DEG);
      let x = T.x, y = T.y; if (d.l < 0) x -= d.l; if (d.r < 0) x += d.r; if (d.t < 0) y += d.t; if (d.b < 0) y -= d.b; this.moveTo(T, x, y);
    }
    say(T, msg, think) { const t = str(msg); T.bubble = t === '' ? null : { text: t.slice(0, 330), think }; return T.bubble; }
    showMonitor(v, on, T) {
      let m = this.monitors.find(x => x.v === v);
      if (!m) { const local = !T.isStage && (Object.values(T.vars).includes(v) || Object.values(T.lists).includes(v)); const isList = Array.isArray(v.value); m = { v, isList, label: (local ? T.name + ': ' : '') + v.name, mode: 'default', x: 5, y: 5 + this.monitors.filter(z => z.visible).length * 27, w: 0, h: 0 }; this.monitors.push(m); }
      if (on && !m.visible) this.placeMonitor(m);
      m.visible = on;
    }
    placeMonitor(m) {          // monitors saved without a place (all at 5,5) are stacked like Scratch does, not drawn on top of each other
      for (let i = 0; i < 12 && this.monitors.some(o => o !== m && o.visible && Math.abs(o.x - m.x) < 4 && Math.abs(o.y - m.y) < 4); i++) m.y += 27;
    }
    drawMonitors(ctx) {           // G-Warp's own monitor look (white box, bold dark text, "name: value"), same as the normal engine
      const k = this.res; ctx.save(); ctx.scale(k, k); ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
      const box = (x, y, w, h) => { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.18)'; ctx.shadowBlur = 3; ctx.shadowOffsetY = 1; ctx.fillStyle = 'rgba(255,255,255,0.9)'; this.round(ctx, x, y, w, h, 4); ctx.fill(); ctx.restore(); };
      for (const m of this.monitors) {
        if (!m.visible) continue;
        ctx.font = '700 12px ui-sans-serif, system-ui, sans-serif';
        if (m.isList) {
          const L = m.v.value, w = Math.min(230, m.w || 130), rows = Math.min(L.length, Math.max(1, Math.floor(((m.h || 200) - 26) / 16))), h = 24 + Math.max(1, rows) * 16;
          box(m.x, m.y, w, h); ctx.fillStyle = '#000'; ctx.fillText(m.label + ' (' + L.length + ')', m.x + 8, m.y + 12, w - 16);
          ctx.font = '12px ui-sans-serif, system-ui, sans-serif';
          for (let i = 0; i < rows; i++) ctx.fillText((i + 1) + '. ' + str(L[i]), m.x + 8, m.y + 28 + i * 16, w - 16);
          continue;
        }
        const t = m.mode === 'large' ? str(m.v.value) : m.label + ': ' + str(m.v.value), w = Math.min(230, ctx.measureText(t).width + 16);
        box(m.x, m.y, w, 26); ctx.fillStyle = '#000'; ctx.fillText(t, m.x + 8, m.y + 13, w - 16);
      }
      ctx.restore();
    }
    round(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
    drawBubble(ctx, T) {
      const b = this.bounds(T) || { w: 0, h: 0 }, k = this.res; ctx.save(); ctx.scale(k, k);
      ctx.font = '14px Helvetica, Arial, sans-serif'; const words = T.bubble.text.split(/(\s+)/), lines = []; let line = '';
      for (const wd of words) { const t = line + wd; if (ctx.measureText(t).width > 160 && line.trim()) { lines.push(line.trim()); line = wd.trimStart(); } else line = t; }
      if (line.trim() || !lines.length) lines.push(line.trim());
      const w = Math.max(50, Math.min(170, Math.max(...lines.map(l => ctx.measureText(l).width)) + 20)), h = lines.length * 16 + 16;
      let x = T.x + 240 + b.w / 2, y = 180 - T.y - b.h / 2 - h - 10; if (x + w > 478) x = Math.max(2, T.x + 240 - b.w / 2 - w); x = Math.max(2, Math.min(478 - w, x)); y = Math.max(2, Math.min(358 - h, y));
      ctx.fillStyle = '#fff'; ctx.strokeStyle = 'rgba(0,0,0,0.15)'; ctx.lineWidth = 2; this.round(ctx, x, y, w, h, 14); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#575e75'; ctx.textBaseline = 'top'; lines.forEach((l, i) => ctx.fillText(l, x + 10, y + 8 + i * 16, w - 16));
      ctx.restore();
    }
    click(x, y) {                // "when this sprite clicked" (front-most visible sprite under the mouse) or "when stage clicked"
      let hit = null;
      for (let i = this.targets.length - 1; i >= 0 && !hit; i--) {
        const T = this.targets[i]; if (T.isStage || !T.visible || (T.fx.ghost || 0) >= 100) continue;
        const c = T.costumes[T.costume], b = this.bounds(T); if (!c || !b) continue;
        const k = T.size / 100 / c.res, a = T.rotationStyle === 'all around' ? (90 - T.dir) * DEG : 0;
        let dx = x - T.x, dy = y - T.y; [dx, dy] = [dx * Math.cos(a) - dy * Math.sin(a), dx * Math.sin(a) + dy * Math.cos(a)];
        if (T.rotationStyle === 'left-right' && T.dir < 0) dx = -dx;
        const px = dx / k + c.cx, py = c.cy - dy / k;
        if (px < 0 || py < 0 || px >= c.img.naturalWidth || py >= c.img.naturalHeight) continue;
        if (!c.hit) { try { const cv = document.createElement('canvas'); cv.width = c.img.naturalWidth || 1; cv.height = c.img.naturalHeight || 1; const x2 = cv.getContext('2d', { willReadFrequently: true }); x2.drawImage(c.img, 0, 0); c.hit = x2; } catch (e) { c.hit = 'box'; } }
        let solid = true; if (c.hit !== 'box') { try { solid = c.hit.getImageData(px | 0, py | 0, 1, 1).data[3] > 0; } catch (e) {} }
        if (solid) hit = T;
      }
      const who = hit || this.stage;
      for (const h of this.hats) if (h.kind === 'click' && (h.target === who || (who.isClone && h.target === who.source))) this.start(h, who);
    }
    postKey(k, down) { const n = keyName(k); if (down) { this.keys.add(n); for (const h of this.hats) if (h.kind === 'key' && (h.arg === n || h.arg === 'any')) this.start(h, null, false); } else this.keys.delete(n); }
    propOf(obj, prop, T) {         // "(x position) of (Sprite1)" and friends
      const t = obj === '_stage_' ? this.stage : this.targets.find(x => x.name === obj && !x.isClone); if (!t) return 0;
      switch (prop) {
        case 'x position': return t.x; case 'y position': return t.y; case 'direction': return t.dir;
        case 'costume #': case 'backdrop #': return t.costume + 1; case 'costume name': case 'backdrop name': return t.costumes[t.costume]?.name ?? '';
        case 'size': return Math.round(t.size); case 'volume': return t.volume;
      }
      for (const v of Object.values(t.vars)) if (v.name === prop) return v.value;
      if (t.isStage) for (const v of Object.values(this.globals.vars)) if (v.name === prop) return v.value;
      return 0;
    }
    varByName(n) { for (const v of Object.values(this.globals.vars)) if (v.name === n) return v.value; }
    listByName(n) { for (const v of Object.values(this.globals.lists)) if (v.name === n) return v.value; }
  }
  window.GWTurbo = Turbo;
})();
