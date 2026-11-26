/* gw-svg360.js - SVG 360: turn a vector costume in 3D (X / Y / Z) and keep it a 2D SVG.
   Claude, 23 Nov 2026 (owner: "the goal is SVG 360 rotation with 100% accuracy ... use Sparky as the default").

   How it works (exact math, no guessing):
   - Every top-level shape or group of the costume is one flat LAYER (G-Spark: leg, leg, body, arm, arm).
   - Each layer gets a depth (how far in front / behind it sits) and a thickness. A flat layer turned in 3D and
     seen straight on is an exact affine transform of the original drawing, so every layer is written back as
     the SAME shapes with one transform="matrix(...)" - nothing is redrawn or approximated.
   - Thickness = extra slices of the layer behind its front face (like Illustrator's 3D extrude), drawn darker.
   - Light: each face is brightened or darkened by how much it faces the light. Seen from behind, a layer
     shows its back (the mirror image), a bit darker.
   - Layers are painted back to front for the current angle, so parts really pass behind each other.
   - Every layer stays its own group in the output (owner rule: each shape its own layer).
   The front/back of a drawing that was never drawn (a character's real back) can't come from math alone:
   that is the later local-AI step. Developer mode only until the owner approves it.
   1.1.0 (same day): "Play" shows the turn frames before making them; "How far" = all the way round, half turn, or a lean
   (a lean gets an odd number of frames so the middle one is straight); "Add turn code" puts a My Block on the sprite,
   "show <folder> at angle (angle)", plain Scratch blocks that pick the right frame for any angle; folder names never clash.
   Kill switch: localStorage['gwarp-off-svg360'] = '1'.  API: window.GW_SVG360 { render, frames, angles, turnCode, layers, open }. */
(function () {
  'use strict';
  try { if (localStorage.getItem('gwarp-off-svg360') === '1') return; } catch (e) {}
  if (window.GW_SVG360) return;

  var NS = 'http://www.w3.org/2000/svg';
  var SKIP = { defs: 1, metadata: 1, title: 1, desc: 1, style: 1, script: 1, foreignObject: 1, clipPath: 1, mask: 1, linearGradient: 1, radialGradient: 1, pattern: 1, filter: 1, symbol: 1, marker: 1 };
  var MAX_W = 480, MAX_H = 360;       /* bigger costumes are turned into pictures by the app, so frames stay inside */
  var D2R = Math.PI / 180;

  /* ---------- parsing ---------- */
  function graphical(el) { return el && el.nodeType === 1 && !SKIP[el.localName] && el.getAttribute('display') !== 'none'; }
  function kids(el) { var a = []; for (var i = 0; i < el.childNodes.length; i++) if (graphical(el.childNodes[i])) a.push(el.childNodes[i]); return a; }
  /* the layers: top-level shapes; a lone wrapper group (paint editors add one) is opened, keeping its attributes */
  function findLayers(root) {
    var wrappers = [], list = kids(root);
    while (list.length === 1 && list[0].localName === 'g' && kids(list[0]).length > 1) { wrappers.push(list[0]); list = kids(list[0]); }
    if (list.length === 1 && list[0].localName === 'g' && kids(list[0]).length === 1) { wrappers.push(list[0]); list = kids(list[0]); }
    return { wrappers: wrappers, list: list };
  }
  function nameOf(el, i) {
    var n = el.getAttribute('id') || el.getAttribute('data-name') || el.getAttribute('inkscape:label') || '';
    return n ? n : el.localName + ' ' + (i + 1);
  }
  function parse(svgText) {
    var doc = new DOMParser().parseFromString(String(svgText || ''), 'image/svg+xml');
    var root = doc.documentElement;
    if (!root || root.localName !== 'svg' || doc.getElementsByTagName('parsererror').length) throw new Error('This costume is not a vector (SVG) picture.');
    return root;
  }
  /* measure every layer in the root's own units (needs the browser to lay it out) */
  function measure(svgText) {
    var root = parse(svgText), host = document.createElement('div');
    host.style.cssText = 'position:fixed;left:-10000px;top:-10000px;width:10px;height:10px;overflow:hidden;visibility:hidden;pointer-events:none';
    var live = document.importNode(root, true);
    host.appendChild(live); document.body.appendChild(host);
    try {
      var L = findLayers(live), inv = live.getScreenCTM(), boxes = [], all = null;
      if (!inv) throw new Error('This costume could not be measured.');
      inv = inv.inverse();
      L.list.forEach(function (el, i) {
        var b = null;
        try {
          var bb = el.getBBox(), m = inv.multiply(el.getScreenCTM()), sw = 0;
          try { sw = parseFloat(getComputedStyle(el).strokeWidth) || 0; } catch (e) {}
          [[bb.x, bb.y], [bb.x + bb.width, bb.y], [bb.x, bb.y + bb.height], [bb.x + bb.width, bb.y + bb.height]].forEach(function (p) {
            var x = m.a * p[0] + m.c * p[1] + m.e, y = m.b * p[0] + m.d * p[1] + m.f;
            if (!b) b = { x0: x, y0: y, x1: x, y1: y }; else { b.x0 = Math.min(b.x0, x); b.y0 = Math.min(b.y0, y); b.x1 = Math.max(b.x1, x); b.y1 = Math.max(b.y1, y); }
          });
          var g = Math.max(Math.abs(m.a) + Math.abs(m.c), Math.abs(m.b) + Math.abs(m.d)) * sw / 2;   /* half the line width sticks out */
          if (b) { b.x0 -= g; b.y0 -= g; b.x1 += g; b.y1 += g; }
        } catch (e) {}
        if (b && isFinite(b.x0) && b.x1 >= b.x0) { boxes.push(b); all = all ? { x0: Math.min(all.x0, b.x0), y0: Math.min(all.y0, b.y0), x1: Math.max(all.x1, b.x1), y1: Math.max(all.y1, b.y1) } : { x0: b.x0, y0: b.y0, x1: b.x1, y1: b.y1 }; }
        else boxes.push(null);
      });
      return { names: L.list.map(nameOf), boxes: boxes, all: all };
    } finally { host.remove(); }
  }

  /* ---------- 3D ---------- */
  function rotation(rx, ry, rz) {     /* R = Rz * Ry * Rx ; x right, y down, z toward the viewer */
    var a = rx * D2R, b = ry * D2R, c = rz * D2R, ca = Math.cos(a), sa = Math.sin(a), cb = Math.cos(b), sb = Math.sin(b), cc = Math.cos(c), sc = Math.sin(c);
    var X = [[1, 0, 0], [0, ca, -sa], [0, sa, ca]], Y = [[cb, 0, sb], [0, 1, 0], [-sb, 0, cb]], Z = [[cc, -sc, 0], [sc, cc, 0], [0, 0, 1]];
    function mul(A, B) { var r = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]; for (var i = 0; i < 3; i++) for (var j = 0; j < 3; j++) for (var k = 0; k < 3; k++) r[i][j] += A[i][k] * B[k][j]; return r; }
    return mul(Z, mul(Y, X));
  }
  var LIGHT = (function () { var v = [-0.45, -0.6, 0.66], n = Math.hypot(v[0], v[1], v[2]); return [v[0] / n, v[1] / n, v[2] / n]; })();
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function fx(n) { return (Math.round(n * 1000) / 1000).toString(); }

  /* the layer settings: depth spreads the layers in paint order (later = nearer); per-layer overrides win */
  function layerSettings(count, o) {
    var out = [], per = o.layers || [];
    for (var i = 0; i < count; i++) {
      var p = per[i] || {}, z = (i - (count - 1) / 2) * (o.depth == null ? 6 : +o.depth);
      out.push({ z: p.z != null ? +p.z : z, t: p.t != null ? +p.t : (o.thickness == null ? 6 : +o.thickness), hide: !!p.hide, tx: +p.tx || 0, ty: +p.ty || 0 });
    }
    return out;
  }

  /* one view of the costume: a list of slices {layer, matrix, depth, shade} plus the turned bounds.
     A layer can also be STOOD UP in 3D on its own (tilt X / tilt Y around its own middle): a wing drawn from above
     with tilt X 90 is edge-on from the side and fully seen after a 90 degree roll. Still one flat plate = exact. */
  function mul3(A, B) { var r = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]; for (var i = 0; i < 3; i++) for (var j = 0; j < 3; j++) for (var k = 0; k < 3; k++) r[i][j] += A[i][k] * B[k][j]; return r; }
  function solve(meta, o) {
    var R = rotation(+o.rx || 0, +o.ry || 0, +o.rz || 0), a = meta.all;
    var cx = o.cx != null ? +o.cx : (a.x0 + a.x1) / 2, cy = o.cy != null ? +o.cy : (a.y0 + a.y1) / 2;
    var S = layerSettings(meta.boxes.length, o), light = o.light == null ? 0.6 : clamp(+o.light, 0, 1);
    var slices = [], b = null;
    meta.boxes.forEach(function (box, i) {
      var s = S[i]; if (!box || s.hide) return;
      var M = (s.tx || s.ty) ? mul3(R, rotation(s.tx, s.ty, 0)) : R;
      var lx = (box.x0 + box.x1) / 2, ly = (box.y0 + box.y1) / 2;
      var v = [lx - cx, ly - cy, s.z], Rv = [R[0][0] * v[0] + R[0][1] * v[1] + R[0][2] * v[2], R[1][0] * v[0] + R[1][1] * v[1] + R[1][2] * v[2], R[2][0] * v[0] + R[2][1] * v[1] + R[2][2] * v[2]];
      var nx = M[0][2], ny = M[1][2], nz = M[2][2], facing = nz >= 0 ? 1 : -1;
      var lit = (nx * LIGHT[0] + ny * LIGHT[1] + nz * LIGHT[2]) * facing;
      var faceShade = clamp(1 - light * 0.35 + light * 0.55 * Math.max(0, lit), 0.35, 1.35) * (facing > 0 ? 1 : (o.back === 'same' ? 1 : 0.82));
      var sideShade = clamp(faceShade * 0.62, 0.2, 1);
      var gap = Math.abs(nz) < 0.3 ? 0.55 : 1.1;           /* close to edge-on the slices sit closer so the side is one solid band */
      var t = Math.max(0, s.t), n = t > 0 ? clamp(Math.ceil(t * Math.hypot(nx, ny) / gap), 1, 64) : 0;   /* slices so the side looks solid */
      /* exactly edge-on a flat layer has no area and the browser would skip it (a matrix that can't be undone):
         give it the thinnest solid height (about 2 px) along the line it collapsed to, so its edge still shows */
      var L0 = M[0][0], L1 = M[1][0], L2 = M[0][1], L3 = M[1][1], det = L0 * L3 - L1 * L2, big = Math.max(Math.hypot(L0, L1), Math.hypot(L2, L3), 1e-9);
      if (Math.abs(det) < 0.04 * big) {
        var kx = -L2, ky = L0; if (Math.hypot(-L3, L1) > Math.hypot(kx, ky)) { kx = -L3; ky = L1; }       /* the squashed direction on the layer */
        var kn = Math.hypot(kx, ky) || 1; kx /= kn; ky /= kn;
        var wx = Math.hypot(L0, L1) >= Math.hypot(L2, L3) ? L0 : L2, wy = Math.hypot(L0, L1) >= Math.hypot(L2, L3) ? L1 : L3, wn = Math.hypot(wx, wy) || 1;
        var ek = Math.abs(kx) * (box.x1 - box.x0) + Math.abs(ky) * (box.y1 - box.y0) || 1;    /* layer size along that direction */
        var px = -wy / wn, py = wx / wn, eps = Math.max(0.04 * big, 2.2 / ek);                     /* at least ~2 px: solid, not see-through */
        L0 += eps * px * kx; L2 += eps * px * ky; L1 += eps * py * kx; L3 += eps * py * ky;
      }
      function add(off, shade, face) {
        var m = [L0, L1, L2, L3,
          cx + Rv[0] - L0 * lx - L2 * ly + nx * off,
          cy + Rv[1] - L1 * lx - L3 * ly + ny * off];
        slices.push({ layer: i, m: m, depth: Rv[2] + nz * off, shade: shade, face: face });
        [[box.x0, box.y0], [box.x1, box.y0], [box.x0, box.y1], [box.x1, box.y1]].forEach(function (p) {
          var x = m[0] * p[0] + m[2] * p[1] + m[4], y = m[1] * p[0] + m[3] * p[1] + m[5];
          if (!b) b = { x0: x, y0: y, x1: x, y1: y }; else { b.x0 = Math.min(b.x0, x); b.y0 = Math.min(b.y0, y); b.x1 = Math.max(b.x1, x); b.y1 = Math.max(b.y1, y); }
        });
      }
      /* the hidden face first, then the side slices, then the face you see */
      var near = facing * t / 2, far = -near;
      if (n > 0) { add(far, sideShade, false); for (var k = 1; k < n; k++) add(far + (near - far) * k / n, sideShade, false); }
      add(t > 0 ? near : 0, faceShade, true);
    });
    /* painter's order: far first; one layer's slices stay together in their own order */
    var order = slices.map(function (s2, k) { return { s: s2, k: k }; }), layerDepth = {};
    order.forEach(function (o2) { var L = o2.s.layer; layerDepth[L] = Math.max(layerDepth[L] == null ? -1e9 : layerDepth[L], o2.s.depth); });
    order.sort(function (p, q) { var d = layerDepth[p.s.layer] - layerDepth[q.s.layer]; return Math.abs(d) > 1e-6 ? d : (p.s.layer !== q.s.layer ? p.s.layer - q.s.layer : p.k - q.k); });
    return { slices: order.map(function (x) { return x.s; }), bounds: b, cx: cx, cy: cy };
  }

  /* ---------- writing the SVG ---------- */
  function shadeId(v) { return 'gw360s' + Math.round(v * 100); }
  function write(svgText, meta, sol, box) {
    var root = parse(svgText), L = findLayers(root), ser = new XMLSerializer();
    var used = {}, sides = {}, defs = [];
    /* keep every <defs>, gradient, clip-path, pattern ... the drawing refers to */
    (function collect(el) { for (var i = 0; i < el.childNodes.length; i++) { var c = el.childNodes[i]; if (c.nodeType !== 1) continue; if (SKIP[c.localName] && c.localName !== 'title' && c.localName !== 'desc' && c.localName !== 'metadata' && c.localName !== 'script' && c.localName !== 'foreignObject') defs.push(ser.serializeToString(c)); else if (c.localName === 'g' || c.localName === 'svg') collect(c); } })(root);
    function wrapOpen() { return L.wrappers.map(function (w) { var a = []; for (var i = 0; i < w.attributes.length; i++) { var at = w.attributes[i]; if (at.name !== 'id') a.push(at.name + '="' + at.value.replace(/&/g, '&amp;').replace(/"/g, '&quot;') + '"'); } return '<g ' + a.join(' ') + '>'; }).join(''); }
    function wrapClose() { return L.wrappers.map(function () { return '</g>'; }).join(''); }
    function label(s) { return (meta.names[s.layer] || ('layer ' + (s.layer + 1))).replace(/[<>&"]/g, ''); }
    function one(s, filtered) {
      var el = L.list[s.layer].cloneNode(true);
      if (!s.face) el.removeAttribute('id');       /* the extra slices must not repeat the layer's id */
      var sh = Math.round(s.shade * 100) / 100, f = '';
      if (filtered && Math.abs(sh - 1) > 0.005) { used[shadeId(sh)] = sh; f = ' filter="url(#' + shadeId(sh) + ')"'; }
      return '<g data-gw360-layer="' + label(s) + (s.face ? '' : ' (side)') + '"' + f + ' transform="matrix(' + s.m.map(fx).join(' ') + ')">' + wrapOpen() + ser.serializeToString(el) + wrapClose() + '</g>';
    }
    /* a layer's side slices go in one group that is thickened a little (so they melt into one solid side) and darkened */
    var body = '', i = 0, list = sol.slices;
    while (i < list.length) {
      var s0 = list[i];
      if (s0.face) { body += one(s0, true); i++; continue; }
      var j = i, part = ''; while (j < list.length && !list[j].face && list[j].layer === s0.layer) { part += one(list[j], false); j++; }
      var sh = Math.round(s0.shade * 100) / 100, id = 'gw360k' + Math.round(sh * 100); sides[id] = sh;
      body += '<g data-gw360-layer="' + label(s0) + ' (side)" filter="url(#' + id + ')">' + part + '</g>'; i = j;
    }
    var filt = Object.keys(used).map(function (id) { var v = fx(used[id]); return '<filter id="' + id + '" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB"><feComponentTransfer><feFuncR type="linear" slope="' + v + '"/><feFuncG type="linear" slope="' + v + '"/><feFuncB type="linear" slope="' + v + '"/></feComponentTransfer></filter>'; }).join('')
      + Object.keys(sides).map(function (id) { var v = fx(sides[id]); return '<filter id="' + id + '" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB"><feMorphology operator="dilate" radius="0.6"/><feComponentTransfer><feFuncR type="linear" slope="' + v + '"/><feFuncG type="linear" slope="' + v + '"/><feFuncB type="linear" slope="' + v + '"/></feComponentTransfer></filter>'; }).join('');
    var keep = [], NOT = { width: 1, height: 1, viewBox: 1, xmlns: 1, 'xmlns:xlink': 1, version: 1, x: 1, y: 1, id: 1, preserveAspectRatio: 1, class: 1, 'xml:space': 1, baseProfile: 1 };
    for (var a = 0; a < root.attributes.length; a++) { var at = root.attributes[a]; if (!NOT[at.name] && at.name.indexOf('xmlns') !== 0 && at.name.indexOf('on') !== 0) keep.push(at.name + '="' + at.value.replace(/&/g, '&amp;').replace(/"/g, '&quot;') + '"'); }
    if (keep.length) body = '<g ' + keep.join(' ') + '>' + body + '</g>';   /* fill / stroke / style set on the drawing itself */
    /* the picture starts at 0,0 and 1 unit = 1 pixel, so Scratch and G-Warp read its size and turning point the same way */
    var w = box.w, h = box.h, k = Math.min(1, MAX_W / w, MAX_H / h), W = w * k, H = h * k;
    return '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' + fx(W) + '" height="' + fx(H) + '" viewBox="0 0 ' + fx(W) + ' ' + fx(H) + '" data-gw360-box="' + fx(box.x) + ' ' + fx(box.y) + ' ' + fx(w) + ' ' + fx(h) + '">'
      + '<!-- made with G-Warp SVG 360 -->' + (defs.length || filt ? '<defs>' + filt + '</defs>' + defs.join('') : '')
      + '<g transform="matrix(' + fx(k) + ' 0 0 ' + fx(k) + ' ' + fx(-box.x * k) + ' ' + fx(-box.y * k) + ')">' + body + '</g></svg>';
  }
  /* a box around the turning point, big enough for the turned bounds (so frames line up: centre = turning point) */
  function centredBox(cx, cy, bounds, pad) {
    var hw = Math.max(cx - bounds.x0, bounds.x1 - cx, 1) + pad, hh = Math.max(cy - bounds.y0, bounds.y1 - cy, 1) + pad;
    return { x: cx - hw, y: cy - hh, w: 2 * hw, h: 2 * hh };
  }
  function prep(svgText) { var meta = measure(svgText); if (!meta.all || !meta.boxes.some(Boolean)) throw new Error('Nothing to turn: this costume has no visible shapes.'); return meta; }

  /* render one view.  o: { rx, ry, rz (degrees), depth, thickness, light 0..1, back: 'darker'|'same', layers: [{z, t, hide}] } */
  function render(svgText, o) {
    o = o || {}; var meta = o.meta || prep(svgText), sol = solve(meta, o);
    var pad = 2 + 0.02 * Math.max(meta.all.x1 - meta.all.x0, meta.all.y1 - meta.all.y0);
    return write(svgText, meta, sol, centredBox(sol.cx, sol.cy, sol.bounds, pad));
  }
  /* n frames turning round one axis ('x' | 'y' | 'z'), same canvas for every frame.
     range: null = all the way round (360 / n apart); [from, to] = from..to degrees, first and last frame included */
  function angles(n, range) { var a = []; for (var i = 0; i < n; i++) a.push(range ? range[0] + (range[1] - range[0]) * i / (n - 1) : 360 * i / n); return a; }
  function frames(svgText, o, axis, n, range) {
    o = o || {}; n = clamp(Math.round(+n || 16), 2, 72); axis = String(axis || 'y').toLowerCase();
    var meta = o.meta || prep(svgText), key = axis === 'x' ? 'rx' : axis === 'z' ? 'rz' : 'ry', views = [], all = null, A = angles(n, range);
    for (var i = 0; i < n; i++) {
      var oi = {}; for (var k in o) oi[k] = o[k]; oi[key] = (+o[key] || 0) + A[i];
      var sol = solve(meta, oi); views.push(sol);
      var bb = sol.bounds; all = all ? { x0: Math.min(all.x0, bb.x0), y0: Math.min(all.y0, bb.y0), x1: Math.max(all.x1, bb.x1), y1: Math.max(all.y1, bb.y1) } : { x0: bb.x0, y0: bb.y0, x1: bb.x1, y1: bb.y1 };
    }
    var pad = 2 + 0.02 * Math.max(meta.all.x1 - meta.all.x0, meta.all.y1 - meta.all.y0), box = centredBox(views[0].cx, views[0].cy, all, pad);
    return views.map(function (sol) { return write(svgText, meta, sol, box); });
  }
  /* 1.2.0 (Claude, 25 Nov, owner: "the default sample must match what the user made, like a stickman"):
     guess depths and part names from the drawing itself. The body is the shape that touches the most other shapes. Parts that stick
     out of it (head, arms, legs) stay in the body's plane, so they stay joined when the picture turns; parts that sit on the body
     (a face, a logo, a belt) go in front if drawn after it, behind if drawn before it. */
  function guess(meta, gap) {
    var B = meta.boxes, n = B.length, i, j; gap = gap == null ? 6 : +gap;
    var area = function (b) { return b ? Math.max(1, b.x1 - b.x0) * Math.max(1, b.y1 - b.y0) : 0; };
    var touch = function (a, b) { return a && b && a.x0 - 2 <= b.x1 && b.x0 - 2 <= a.x1 && a.y0 - 2 <= b.y1 && b.y0 - 2 <= a.y1; };
    var main = -1, best = -1;
    for (i = 0; i < n; i++) { if (!B[i]) continue; var t = 0; for (j = 0; j < n; j++) if (j !== i && touch(B[i], B[j])) t++; var score = t * 1e9 + area(B[i]); if (score > best) { best = score; main = i; } }
    var z = [], labels = [], used = {}, front = 0, backN = 0, M = B[main];
    var name = function (base) { used[base] = (used[base] || 0) + 1; return used[base] > 1 ? base + ' ' + used[base] : base; };
    for (i = 0; i < n; i++) {
      var b = B[i]; if (!b || !M) { z.push(0); labels.push(''); continue; }
      if (i === main) { z.push(0); labels.push(name('body')); continue; }
      var ix = Math.max(0, Math.min(b.x1, M.x1) - Math.max(b.x0, M.x0)), iy = Math.max(0, Math.min(b.y1, M.y1) - Math.max(b.y0, M.y0)), ov = ix * iy / area(b);
      var cx = (b.x0 + b.x1) / 2, cy = (b.y0 + b.y1) / 2, mx = (M.x0 + M.x1) / 2, mw = Math.max(1, M.x1 - M.x0, (meta.all.x1 - meta.all.x0) / 4), mh = Math.max(1, M.y1 - M.y0);
      if (ov >= 0.6) { if (i > main) { front++; z.push(gap * front); labels.push(name('front detail')); } else { backN++; z.push(-gap * backN); labels.push(name('back part')); } continue; }
      z.push((i - main) * 0.01);
      if (cy < M.y0 + mh * 0.15 && Math.abs(cx - mx) < mw * 0.6) labels.push(name(b.y1 < M.y0 - mh * 0.5 ? 'hat' : 'head'));
      else labels.push(name((cx < mx ? 'left ' : 'right ') + (b.y0 < M.y0 + mh * 0.6 ? 'arm' : 'leg')));
    }
    return { main: main, z: z, labels: labels };
  }
  function unnamed(meta) { return meta.names.every(function (nm) { return /^[a-zA-Z]+ \d+$/.test(nm); }); }   /* nobody named the layers: a plain drawing */
  function layers(svgText) { var m = measure(svgText); return m.names.map(function (n, i) { return { name: n, visible: !!m.boxes[i] }; }); }

  /* ---------- the window (Costumes tab: right-click a vector costume > SVG 360...) ---------- */
  var by = function (id) { return document.getElementById(id); };
  function engine() { return window.Engine || {}; }
  function sprite() { var E = engine(); return E.sprites && E.sprites[E.activeSpriteIndex]; }
  function stageOn() { try { return !!(window.GW_STAGE_SELECT && window.GW_STAGE_SELECT.isStage()); } catch (e) { return false; } }
  function devOn() { try { return !window.GW_DEV_MODE || window.GW_DEV_MODE.isOn(); } catch (e) { return true; } }
  function toast(t) { try { if (window.GW_TOAST) return window.GW_TOAST(t); } catch (e) {} var d = document.createElement('div'); d.className = 'gw360-toast'; d.textContent = t; document.body.appendChild(d); setTimeout(function () { d.remove(); }, 2600); }

  var CSS = '.gw360-back{position:fixed;inset:0;z-index:100000;background:rgba(5,6,14,.62);display:flex;align-items:center;justify-content:center;font:13px system-ui,Segoe UI,sans-serif;color:#e6e8f5}'
    + '.gw360{width:min(900px,96vw);max-height:94vh;overflow:auto;background:#121628;border:1px solid #3b2f6b;border-radius:14px;box-shadow:0 0 0 1px rgba(139,92,246,.25),0 18px 60px rgba(0,0,0,.6);display:grid;grid-template-columns:1fr 340px;gap:0}'
    + '.gw360 h2{grid-column:1/-1;margin:0;padding:12px 16px;font-size:15px;color:#fff;border-bottom:1px solid #2a2450;display:flex;align-items:center;gap:8px;background:linear-gradient(90deg,rgba(139,92,246,.22),rgba(34,197,94,.10))}'
    + '.gw360 h2 b{display:inline-flex;width:22px;height:22px;border-radius:6px;align-items:center;justify-content:center;background:#7c3aed;color:#fff;font-size:12px}'
    + '.gw360 h2 small{margin-left:auto;color:#a5a9c9;font-weight:400}'
    + '.gw360-view{position:relative;padding:12px;display:flex;flex-direction:column;gap:8px;min-width:0}'
    + '.gw360-stage{height:340px;border-radius:10px;background:repeating-conic-gradient(#1a1f36 0 25%,#151a2e 0 50%) 0 0/24px 24px;border:1px solid #2a2f4d;display:flex;align-items:center;justify-content:center;cursor:grab;touch-action:none;overflow:hidden}'
    + '.gw360-stage:active{cursor:grabbing}.gw360-stage img{width:86%;height:86%;object-fit:contain;pointer-events:none;user-select:none}'
    + '.gw360-hint{color:#8e93b5;font-size:12px}'
    + '.gw360-steps{display:flex;flex-wrap:wrap;gap:6px}.gw360-steps span{padding:3px 9px;border-radius:999px;background:#1d1838;border:1px solid #3b3270;color:#d7d9ee;font-size:12px;white-space:pre}.gw360 button.small{padding:3px 8px;font-size:12px}'
    + '.gw360-side{border-left:1px solid #2a2450;padding:12px;display:flex;flex-direction:column;gap:8px}'
    + '.gw360-row{display:grid;grid-template-columns:78px 1fr 46px;align-items:center;gap:6px}'
    + '.gw360-row label{color:#c9cce6}.gw360-row input[type=range]{width:100%;accent-color:#8b5cf6}'
    + '.gw360-row input[type=number]{width:46px;background:#0b0e1c;color:#fff;border:1px solid #2f3456;border-radius:6px;padding:2px 4px}'
    + '.gw360 select{background:#0b0e1c;color:#fff;border:1px solid #2f3456;border-radius:6px;padding:4px}'
    + '.gw360-sec{color:#a78bfa;font-weight:600;margin-top:4px;font-size:12px;text-transform:uppercase;letter-spacing:.04em}'
    + '.gw360-layers{max-height:150px;overflow:auto;border:1px solid #262b48;border-radius:8px;padding:4px}'
    + '.gw360-layer{display:grid;grid-template-columns:18px 1fr 44px 44px 44px 44px;gap:3px;align-items:center;padding:2px}'
    + '.gw360-layer span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#d7d9ee}'
    + '.gw360-layer input[type=number]{width:44px;background:#0b0e1c;color:#fff;border:1px solid #2f3456;border-radius:6px;padding:1px 3px}'
    + '.gw360-btns{display:flex;flex-wrap:wrap;gap:6px;margin-top:4px}'
    + '.gw360 button{border:1px solid #3b3270;background:#1d1838;color:#fff;border-radius:8px;padding:6px 10px;cursor:pointer;font:inherit}'
    + '.gw360 button:hover{border-color:#8b5cf6}.gw360 button.go{background:#6d28d9;border-color:#8b5cf6}.gw360 button.go2{background:#15803d;border-color:#22c55e}'
    + '.gw360 button:disabled{opacity:.5;cursor:default}'
    + '.gw360-err{color:#fca5a5}.gw360-toast{position:fixed;left:50%;bottom:28px;transform:translateX(-50%);background:#1d1838;color:#fff;border:1px solid #8b5cf6;border-radius:10px;padding:8px 14px;z-index:100001;font:13px system-ui,sans-serif}'
    + '@media (max-width:760px){.gw360{grid-template-columns:1fr}.gw360-side{border-left:0;border-top:1px solid #2a2450}}';
  function ensureCss() { if (by('gw360Css')) return; var s = document.createElement('style'); s.id = 'gw360Css'; s.textContent = CSS; document.head.appendChild(s); }
  function el(tag, attrs, kids2) { var e = document.createElement(tag); if (attrs) for (var k in attrs) { if (k === 'text') e.textContent = attrs[k]; else if (k.slice(0, 2) === 'on') e.addEventListener(k.slice(2), attrs[k]); else e.setAttribute(k, attrs[k]); } (kids2 || []).forEach(function (c) { if (c) e.appendChild(c); }); return e; }

  var cur = null;    /* the open window */
  function close() { if (!cur) return; try { cur.stop && cur.stop(); } catch (e) {} try { cur.back.remove(); } catch (e) {} window.removeEventListener('keydown', cur.onKey, true); window.removeEventListener('keyup', cur.onKey, true); cur = null; }

  function open(index) {
    ensureCss(); close();
    var s = sprite(); if (!s || !s.costumes || stageOn()) { toast('SVG 360 works on a sprite\'s costumes: pick a sprite first.'); return false; }
    if (index == null) index = s.activeCostume || 0;
    var c = s.costumes[index];
    if (!c || !c.svg) { toast('SVG 360 needs a vector costume. Convert it to vector first.'); return false; }
    var src = c.svg, meta;
    try { meta = prep(src); } catch (e) { toast(e.message || 'This costume could not be turned.'); return false; }
    var st = { rx: 0, ry: 30, rz: 0, depth: 6, thickness: 6, light: 60, back: 'darker', layers: meta.names.map(function () { return {}; }) };
    var G = guess(meta, 6), plain = unnamed(meta) && meta.names.length > 1, shown = meta.names.map(function (nm, i) { return plain && G.labels[i] ? G.labels[i] : nm; });
    function useGuess() { var g = guess(meta, st.depth); st.layers.forEach(function (p, i) { p.z = g.z[i]; }); }
    if (plain) useGuess();
    var img = el('img', { alt: 'SVG 360 preview' }), stage = el('div', { class: 'gw360-stage', title: 'Drag to turn it' }, [img]);
    var err = el('div', { class: 'gw360-err' });
    function opts() { var L = st.layers.map(function (p) { return { z: p.z, t: p.t, hide: p.hide, tx: p.tx, ty: p.ty }; }); return { meta: meta, rx: st.rx, ry: st.ry, rz: st.rz, depth: st.depth, thickness: st.thickness, light: st.light / 100, back: st.back, layers: L }; }
    var raf = 0;
    function draw() { raf = 0; if (play) return; try { var out = render(src, opts()); img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(out); err.textContent = ''; } catch (e) { err.textContent = e.message || String(e); } }
    function redraw() { if (play) { stopPlay(); return; } if (!raf) raf = requestAnimationFrame(draw); }   /* changing anything stops Play */
    var inputs = {};
    function slider(key, label, min, max, step) {
      var r = el('input', { type: 'range', min: min, max: max, step: step || 1, value: st[key], 'aria-label': label });
      var n = el('input', { type: 'number', min: min, max: max, step: step || 1, value: st[key], 'aria-label': label + ' value' });
      function set(v) { v = clamp(+v || 0, min, max); st[key] = v; r.value = v; n.value = v; redraw(); }
      r.addEventListener('input', function () { set(r.value); }); n.addEventListener('change', function () { set(n.value); });
      inputs[key] = set;
      return el('div', { class: 'gw360-row' }, [el('label', { text: label }), r, n]);
    }
    var layerBox = el('div', { class: 'gw360-layers' });
    function layerRows() {
      layerBox.innerHTML = '';
      layerBox.appendChild(el('div', { class: 'gw360-layer' }, [el('span', { text: '' }), el('span', { text: 'Layer', style: 'color:#8e93b5' }), el('span', { text: 'Depth', style: 'color:#8e93b5' }), el('span', { text: 'Thick', style: 'color:#8e93b5' }), el('span', { text: 'Tilt X', style: 'color:#8e93b5', title: 'Stand this layer up: 90 = it lies flat, seen from the side' }), el('span', { text: 'Tilt Y', style: 'color:#8e93b5' })]));
      var S = layerSettings(meta.names.length, opts());
      meta.names.forEach(function (nm, i) {
        var p = st.layers[i];
        var vis = el('input', { type: 'checkbox', title: 'Show this layer', 'aria-label': 'Show ' + nm }); vis.checked = !p.hide;
        vis.addEventListener('change', function () { p.hide = !vis.checked; redraw(); });
        var z = el('input', { type: 'number', step: 1, value: Math.round(S[i].z * 10) / 10, title: 'How far in front (+) or behind (-) this layer sits', 'aria-label': nm + ' depth' });
        z.addEventListener('change', function () { p.z = +z.value || 0; redraw(); });
        var t = el('input', { type: 'number', min: 0, step: 1, value: Math.round(S[i].t * 10) / 10, title: 'How thick this layer is', 'aria-label': nm + ' thickness' });
        t.addEventListener('change', function () { p.t = Math.max(0, +t.value || 0); redraw(); });
        var tx = el('input', { type: 'number', step: 5, value: p.tx || 0, title: 'Tilt this layer on its own (X): 90 = a wing drawn from above, lying flat', 'aria-label': nm + ' tilt X' });
        tx.addEventListener('change', function () { p.tx = +tx.value || 0; redraw(); });
        var ty = el('input', { type: 'number', step: 5, value: p.ty || 0, title: 'Tilt this layer on its own (Y)', 'aria-label': nm + ' tilt Y' });
        ty.addEventListener('change', function () { p.ty = +ty.value || 0; redraw(); });
        layerBox.appendChild(el('div', { class: 'gw360-layer' }, [vis, el('span', { text: shown[i], title: shown[i] === nm ? nm : shown[i] + ' (' + nm + ')' }), z, t, tx, ty]));
      });
    }
    var depthRow = slider('depth', 'Layer gap', 0, 60), thickRow = slider('thickness', 'Thickness', 0, 60);
    /* moving the shared sliders resets the per-layer numbers so they follow */
    [depthRow, thickRow].forEach(function (row) { row.querySelectorAll('input').forEach(function (i) { i.addEventListener('change', function () { st.layers.forEach(function (p) { delete p.z; delete p.t; }); layerRows(); }); }); });
    var back = el('select', { 'aria-label': 'Back side' }, [el('option', { value: 'darker', text: 'Back side: darker' }), el('option', { value: 'same', text: 'Back side: same light' })]);
    back.addEventListener('change', function () { st.back = back.value; redraw(); });
    var axis = el('select', { 'aria-label': 'Turn around' }, [el('option', { value: 'y', text: 'Turn: Y (left / right)' }), el('option', { value: 'x', text: 'Turn: X (roll over)' }), el('option', { value: 'z', text: 'Turn: Z (spin flat)' })]);
    var count = el('select', { 'aria-label': 'Frames' }, [8, 12, 16, 24, 36].map(function (n) { var o = el('option', { value: n, text: n + ' frames' }); if (n === 16) o.selected = true; return o; }));
    var RANGES = { full: null, half: [-90, 90], tilt: [-45, 45], small: [-20, 20] };
    var range = el('select', { 'aria-label': 'How far' }, [['full', 'All the way round'], ['half', 'Half turn (-90 to 90)'], ['tilt', 'Lean (-45 to 45)'], ['small', 'Small lean (-20 to 20)']].map(function (x) { return el('option', { value: x[0], text: x[1] }); }));
    var codeChk = el('input', { type: 'checkbox', id: 'gw360Code' }); codeChk.checked = true;
    function howMany() { var n = +count.value; return RANGES[range.value] && n % 2 === 0 ? n + 1 : n; }   /* a lean gets an odd number of frames, so the middle one is straight */
    var playBtn = el('button', { type: 'button', text: 'Play', title: 'Play the turn frames you are about to make' }), play = null;
    function stopPlay() { if (!play) return; clearInterval(play.t); play = null; playBtn.textContent = 'Play'; redraw(); }
    playBtn.addEventListener('click', function () {
      if (play) return stopPlay();
      try {
        var list = frames(src, opts(), axis.value, howMany(), RANGES[range.value]).map(function (svg) { return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg); }), k = 0, dir = 1, loop = !RANGES[range.value];
        play = { t: setInterval(function () { img.src = list[k]; if (loop) k = (k + 1) % list.length; else { if (k + dir < 0 || k + dir >= list.length) dir = -dir; k += dir; } }, 1000 / 12) };
        playBtn.textContent = 'Stop'; err.textContent = '';
      } catch (e) { err.textContent = e.message || String(e); }
    });
    [axis, count, range].forEach(function (x) { x.addEventListener('change', stopPlay); });
    var addBtn = el('button', { class: 'go', type: 'button', text: 'Add as costume' }), framesBtn = el('button', { class: 'go2', type: 'button', text: 'Make turn frames' });
    var resetBtn = el('button', { type: 'button', text: 'Reset' }), closeBtn = el('button', { type: 'button', text: 'Close' });
    closeBtn.addEventListener('click', stopPlay);
    function busy(on) { addBtn.disabled = framesBtn.disabled = on; }
    addBtn.addEventListener('click', function () {
      busy(true);
      var name = c.name + ' 360';
      try { addCostumes([{ name: name, svg: render(src, opts()) }]).then(function (n) { busy(false); if (n) toast('Added costume "' + name + '"'); }); } catch (e) { busy(false); err.textContent = e.message; }
    });
    framesBtn.addEventListener('click', function () {
      busy(true);
      try {
        stopPlay();
        var ax = axis.value, n = howMany(), rg = RANGES[range.value], list = frames(src, opts(), ax, n, rg), base = freeBase(s, String(c.name).replace(/\/\//g, ' ') + ' 360 ' + ax.toUpperCase()), who = engine().activeSpriteIndex;
        addCostumes(list.map(function (svg, i) { return { name: base + '//' + (i < 9 ? '0' : '') + (i + 1), svg: svg }; })).then(function (k) {
          if (!k) { busy(false); return; }
          if (!codeChk.checked || k !== n) { busy(false); toast(k + ' turn frames added (folder "' + base + '")'); return; }
          addTurnCode(who, base, n, rg).then(function (pc) { busy(false); toast(k + ' turn frames added (folder "' + base + '")' + (pc ? ' and the My Block "' + pc.replace('%s', '(angle)') + '"' : '')); },
            function (e) { busy(false); toast(k + ' turn frames added; the turn code could not be added: ' + (e && e.message || e)); });
        });
      } catch (e) { busy(false); err.textContent = e.message; }
    });
    resetBtn.addEventListener('click', function () { inputs.rx(0); inputs.ry(30); inputs.rz(0); inputs.depth(6); inputs.thickness(6); inputs.light(60); st.layers = meta.names.map(function () { return {}; }); if (plain) useGuess(); layerRows(); redraw(); });
    closeBtn.addEventListener('click', close);
    /* drag the picture to turn it */
    var drag = null;
    stage.addEventListener('pointerdown', function (e) { drag = { x: e.clientX, y: e.clientY, rx: st.rx, ry: st.ry }; try { stage.setPointerCapture(e.pointerId); } catch (x) {} });
    stage.addEventListener('pointermove', function (e) { if (!drag) return; var wrap = function (v) { v = ((v + 180) % 360 + 360) % 360 - 180; return Math.round(v); }; inputs.ry(wrap(drag.ry + (e.clientX - drag.x) * 0.6)); inputs.rx(wrap(drag.rx - (e.clientY - drag.y) * 0.6)); });
    stage.addEventListener('pointerup', function () { drag = null; }); stage.addEventListener('pointercancel', function () { drag = null; });
    var views = el('div', { class: 'gw360-btns' }, [['Front', 0, 0], ['3/4', 0, 30], ['Side', 0, 80], ['Back', 0, 180], ['From above', 50, 0]].map(function (v) {
      var b = el('button', { type: 'button', class: 'small', text: v[0], title: 'Look at it from here' }); b.addEventListener('click', function () { inputs.rx(v[1]); inputs.ry(v[2]); inputs.rz(0); }); return b; }));
    var guessBtn = el('button', { type: 'button', class: 'small', text: 'Guess depths', title: 'Work out the depths from your drawing: parts that touch the body stay joined, things drawn on the body go in front' });
    var evenBtn = el('button', { type: 'button', class: 'small', text: 'Even depths', title: 'Every layer one step in front of the one before it (a paper cut-out look)' });
    guessBtn.addEventListener('click', function () { useGuess(); layerRows(); redraw(); });
    evenBtn.addEventListener('click', function () { st.layers.forEach(function (p) { delete p.z; }); layerRows(); redraw(); });
    var tip = meta.names.length < 2 ? 'This drawing is one single shape, so it turns like a flat card. Draw the parts as separate shapes to give it depth.'
      : plain ? 'The depths were guessed from your drawing: parts that touch the body stay joined when it turns. Change any number under Layers.' : 'Each layer of your drawing stays its own layer.';
    var box = el('div', { class: 'gw360', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'SVG 360' }, [
      el('h2', {}, [el('b', { text: '3D' }), document.createTextNode('SVG 360 - ' + c.name), el('small', { text: 'Developer preview' })]),
      el('div', { class: 'gw360-view' }, [stage, el('div', { class: 'gw360-steps' }, [el('span', { text: '1  Drag the picture or pick a view' }), el('span', { text: '2  Set depth and thickness' }), el('span', { text: '3  Add as costume or make turn frames' })]), el('div', { class: 'gw360-hint', text: tip }), err]),
      el('div', { class: 'gw360-side' }, [
        el('div', { class: 'gw360-sec', text: 'Turn' }), views, slider('rx', 'X (tilt)', -180, 180), slider('ry', 'Y (turn)', -180, 180), slider('rz', 'Z (spin)', -180, 180),
        el('div', { class: 'gw360-sec', text: 'Shape' }), depthRow, thickRow, slider('light', 'Light', 0, 100), back,
        el('div', { class: 'gw360-sec', text: 'Layers' }), layerBox, el('div', { class: 'gw360-btns' }, [guessBtn, evenBtn]),
        el('div', { class: 'gw360-sec', text: 'Make' }), el('div', { class: 'gw360-btns' }, [addBtn]),
        el('div', { class: 'gw360-btns' }, [axis, count, range]),
        el('div', { class: 'gw360-btns' }, [playBtn, framesBtn]),
        el('div', { class: 'gw360-btns' }, [codeChk, el('label', { for: 'gw360Code', text: 'Add turn code (a My Block that picks the frame for an angle)' })]),
        el('div', { class: 'gw360-btns', style: 'margin-top:auto' }, [resetBtn, closeBtn])
      ])
    ]);
    var backEl = el('div', { class: 'gw360-back' }, [box]);
    backEl.addEventListener('pointerdown', function (e) { if (e.target === backEl) close(); });
    var onKey = function (e) {
      if (e.key === 'Escape') { e.stopPropagation(); e.preventDefault(); close(); return; }
      if (backEl.contains(e.target)) e.stopPropagation();       /* typing a number must not trigger the app's shortcuts */
    };
    window.addEventListener('keydown', onKey, true); window.addEventListener('keyup', onKey, true);
    document.body.appendChild(backEl);
    cur = { back: backEl, onKey: onKey, index: index, stop: stopPlay };
    layerRows(); draw();
    return true;
  }

  /* the turn code: My Block "show <base> at angle (angle)" on the sprite. angle 0 = the first frame. */
  function turnCode(base, n, range) {
    var K = window.GW_SB3_BLOCKS; if (!K) throw new Error('needs the Big map tool (shared block builder)');
    var lv = {}, loc = {}; ['360 angle', '360 frame'].forEach(function (nm) { var id = K.nid(); lv[id] = [nm, 0]; loc[nm] = [nm, id]; });
    var B = new K.Blocks(function (nm) { return loc[nm]; }), comments = {}, V = function (x) { return ['var', x]; }, body, note;
    var pc = 'show ' + base.replace(/%/g, ' ') + ' at angle %s';
    if (!range) {
      var step = 360 / n;
      body = [['set', '360 frame', ['+', ['mod', ['round', ['/', ['arg', 'angle'], step]], n], 1]]];
      note = 'SVG 360 turn code: shows the frame of "' + base + '" for any angle (0 = the first frame, 90 = a quarter turn, it goes round and round). '
        + n + ' frames, ' + (Math.round(step * 100) / 100) + ' degrees apart. Use it in your own scripts, for example with a direction or a speed. Plain Scratch blocks.';
    } else {
      var a = range[0], b = range[1], st = (b - a) / (n - 1);
      body = [['set', '360 angle', ['arg', 'angle']], ['if', ['<', V('360 angle'), a], [['set', '360 angle', a]]], ['if', ['>', V('360 angle'), b], [['set', '360 angle', b]]],
        ['set', '360 frame', ['+', ['round', ['/', ['-', V('360 angle'), a], st]], 1]]];
      note = 'SVG 360 turn code: shows the frame of "' + base + '" for an angle from ' + a + ' to ' + b + ' (0 = the middle, how you set it up). '
        + 'Angles outside that stay on the first / last frame. Great for a plane leaning into a turn. Plain Scratch blocks.';
    }
    body.push(['ifelse', ['<', V('360 frame'), 10], [['costume', ['join', base + '//0', V('360 frame')], base + '//01']], [['costume', ['join', base + '//', V('360 frame')], base + '//01']]]);
    B.define(pc, ['angle'], true, body, 40, 40, note, comments);
    return { variables: lv, blocks: B.b, comments: comments, proccode: pc };
  }
  function addTurnCode(index, base, n, range) {
    var api = window.GW_V1580_SB3, E = engine(), s = E.sprites && E.sprites[index];
    if (!api || !api.addSprites || !s) return Promise.resolve(null);
    var code = turnCode(base, n, range);
    return api.addSprites({ targets: [{ isStage: true, name: 'Stage', variables: {}, blocks: {} }, { isStage: false, gwSprite: index, name: s.name, variables: code.variables, lists: {}, blocks: code.blocks, comments: code.comments, costumes: [], sounds: [] }] }, {})
      .then(function () { return code.proccode; });
  }
  function freeBase(s, want) {     /* a folder name no costume uses yet, so every frame keeps its exact name */
    var used = function (b) { return s.costumes.some(function (c) { return String(c.name).indexOf(b + '//') === 0; }); };
    if (!used(want)) return want; for (var i = 2; i < 99; i++) if (!used(want + ' ' + i)) return want + ' ' + i; return want + ' ' + Date.now();
  }

  /* add costumes through the app's own upload path (same sizing, undo and list refresh as "Upload costume") */
  function addCostumes(list) {
    var s = sprite(), input = by('gwCosFile');
    if (!s || !input) { toast('Open the Costumes tab first.'); return Promise.resolve(0); }
    var before = s.costumes.length;
    try {
      var dt = new DataTransfer();
      list.forEach(function (it, i) { dt.items.add(new File([it.svg], 'gw360-' + i + '.svg', { type: 'image/svg+xml' })); });
      input.files = dt.files;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    } catch (e) { toast('Could not add the costume: ' + (e.message || e)); return Promise.resolve(0); }
    return new Promise(function (res) {
      var t0 = Date.now();
      (function wait() {
        if (s.costumes.length >= before + list.length || Date.now() - t0 > 8000) {
          var made = s.costumes.slice(before);
          made.forEach(function (cos, i) { if (list[i] && list[i].name) cos.name = uniqueName(s, list[i].name, cos); });
          try { window.GW_V1570_STUDIO && window.GW_V1570_STUDIO.renderCostumeList(true); } catch (e) {}
          try { window.renderSpritesGrid && window.renderSpritesGrid(); } catch (e) {}
          return res(made.length);
        }
        setTimeout(wait, 40);
      })();
    });
  }
  function uniqueName(s, want, self) {
    var taken = {}; s.costumes.forEach(function (c) { if (c !== self) taken[c.name] = 1; });
    if (!taken[want]) return want; for (var i = 2; i < 999; i++) if (!taken[want + ' ' + i]) return want + ' ' + i; return want + ' ' + Date.now();
  }

  /* right-click a costume: "SVG 360..." in the costume menu (vector costumes, Developer mode) */
  var lastIndex = -1;
  document.addEventListener('contextmenu', function (e) { var it = e.target && e.target.closest && e.target.closest('#costumesSidebar .gw7-cos-item'); lastIndex = it ? +it.dataset.index : -1; }, true);
  function addMenuItem(menu) {
    if (!devOn() || stageOn() || lastIndex < 0 || menu.querySelector('[data-gw360]')) return;
    var s = sprite(), c = s && s.costumes && s.costumes[lastIndex]; if (!c || !c.svg) return;
    var idx = lastIndex, b = document.createElement('button');
    b.type = 'button'; b.setAttribute('role', 'menuitem'); b.setAttribute('data-gw360', '1'); b.textContent = 'SVG 360…';
    b.addEventListener('click', function (ev) { ev.stopPropagation(); try { menu.remove(); } catch (x) {} open(idx); });
    var del = menu.querySelector('.gw37-danger'); menu.insertBefore(b, del || null);
  }
  function watch() { new MutationObserver(function (ms) { ms.forEach(function (m) { m.addedNodes.forEach(function (n) { if (n.id === 'gw37Menu') addMenuItem(n); }); }); }).observe(document.body, { childList: true }); }
  if (document.body) watch(); else document.addEventListener('DOMContentLoaded', watch);

  /* a button in the costume editor's top row, next to "Animation" (Developer mode, sprites only) */
  function entry() {
    var row = by('gwCostumeModeV15'); if (!row) return false;
    var b = by('gw360Btn');
    if (!b) {
      b = document.createElement('button'); b.type = 'button'; b.id = 'gw360Btn'; b.className = 'gw-costume-mode gw18-entry';
      b.title = 'SVG 360: turn this vector costume in 3D (X / Y / Z) and make turn frames';
      b.innerHTML = '<i class="fa-solid fa-cube" aria-hidden="true"></i> SVG 360';
      b.addEventListener('click', function () { var s = sprite(); open(s ? s.activeCostume : 0); });
      row.appendChild(b);
    }
    b.style.display = devOn() ? '' : 'none';
    return true;
  }
  (function boot(n) { if (!entry() && n < 120) setTimeout(function () { boot(n + 1); }, 500); })(0);
  window.addEventListener('gwarp-devmode', function () { entry(); });

  window.GW_SVG360 = { version: '1.2.0', guess: guess, render: render, frames: frames, angles: angles, turnCode: turnCode, addTurnCode: addTurnCode, layers: layers, open: open, close: close, _rotation: rotation, _solve: solve, _measure: measure };
})();
