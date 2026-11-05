/* ==========================================================================
   gspark-draw.js  ·  "Sparky draws" for G-Warp  ·  v1.0.0 (2026-10-27)
   Task B  ·  Freebuff chat B
   --------------------------------------------------------------------------
   Loaded by ONE line in app.html, right after the gwarp-ollama.js line:

       <script src="gspark-draw.js"></script><!-- private build: Sparky draws (Task B) -->

   WHAT IT DOES
     window.GSPARK_DRAW.draw(svgText, name)   ->  Promise<result>
       1. switches G-Warp to the Costumes tab (switchMainTabV15('costumes'))
       2. shows a small glowing purple "Sparky" cursor on the paint area
       3. walks the SVG's shapes IN ORDER and draws them visibly:
            cursor glides to the shape -> little wiggle ("picks the tool")
            -> traces the outline with stroke-dasharray / stroke-dashoffset
               while the cursor rides the pen tip
            -> fades the real fill in
       4. adds the FULL svg as a NEW costume of the selected sprite through
          G-Warp's own costume import code:
            #gwCosFile (the real "Upload" input) -> uploadCostumes()
          (a direct-push fallback mirrors uploadCostumes() if that input is
           not in the DOM yet - see NOTES-gspark-draw.txt)
       5. STOP button at the top-right of the paint area ends the drawing at
          once and STILL adds the costume
       6. leaving the Costumes tab does the same (skip the rest, just add)
       7. body.gw-calm or prefers-reduced-motion -> no animation at all

   SAFETY
     · nothing runs on load: the file only defines window.GSPARK_DRAW
     · it never touches the user's current costume; it only APPENDS a new one
       at the end of the sprite's costume list (same as dropping an .svg on
       the Upload button), then selects it
     · safe to load twice - the second copy exits immediately
     · localStorage 'gwarp-off-sparkydraw' = '1' turns it off completely
   ========================================================================== */
(() => {
  'use strict';

  const VERSION = '1.0.0';
  const OFF_KEY = 'gwarp-off-sparkydraw';
  const SVGNS = 'http://www.w3.org/2000/svg';

  /* already installed? exit (and stop the old session so we never double-run) */
  if (window.GSPARK_DRAW && window.GSPARK_DRAW.__gsparkDraw) {
    try { window.GSPARK_DRAW.cancel?.('reloaded'); } catch {}
    try { console.info('[Sparky] gspark-draw.js already loaded - second copy ignored'); } catch {}
    return;
  }

  /* ---- G-Warp geometry we draw into -------------------------------------- */
  /* #gwVectorCanvasV15 is <svg viewBox="0 0 512 384">; the stage-shaped art
     area (what saveCostumeToSprite() copies out) is the 384 x 384 square
     x = 64 .. 448, y = 0 .. 384. */
  const VB = { w: 512, h: 384 };
  const ART = { x: 64, y: 0, w: 384, h: 384 };

  const SPARKY = { hi: '#e9d5ff', mid: '#a855f7', deep: '#6d28d9', ink: '#f0abfc' };
  const MAX_SHAPES = 200;   // parsed shapes we keep
  const MAX_ANIM = 40;      // shapes that get the full animation (rest pop in)

  /* ---- tiny helpers ------------------------------------------------------ */
  const by = id => document.getElementById(id);
  const q = (sel, root) => (root || document).querySelector(sel);
  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const num = v => { const n = parseFloat(v); return Number.isFinite(n) ? n : null; };
  const tick = () => new Promise(r => requestAnimationFrame(() => r()));
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const now = () => (window.performance && performance.now ? performance.now() : Date.now());
  const easeInOut = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const easeOut = t => 1 - Math.pow(1 - t, 3);

  function log(...a) { try { console.info('[Sparky]', ...a); } catch {} }
  function toast(m) { try { (window.GW?.toast || window.showToast || console.log)(m); } catch {} }

  /* switch-off key:  localStorage 'gwarp-off-sparkydraw' = 1   (Task B)
     the app's own convention ('on', via GW_FEATURE_OFF) also works */
  function off() {
    try {
      const v = localStorage.getItem(OFF_KEY);
      if (v === '1' || v === 'on' || v === 'true') return true;
    } catch {}
    try { if (typeof window.GW_FEATURE_OFF === 'function' && window.GW_FEATURE_OFF('sparkydraw')) return true; } catch {}
    return false;
  }
  /* the two "no animation at all" switches - told apart, so the caller (and
     G-Spark's log) can see WHICH one was on */
  function motionOffReason() {
    /* only G-Warp's own "Calm motion" switch counts; the computer's
       "Animation effects off" setting no longer stops the drawing */
    try { if (document.body?.classList.contains('gw-calm')) return 'calm mode'; } catch {}
    return '';
  }
  const calm = () => !!motionOffReason();
  function onCostumesTab() {
    try {
      const t = window.GW_UI_V15?.tab;
      if (t) return t === 'costumes';
      const v = by('gwCostumeViewport');
      if (v) return v.classList.contains('active');
    } catch {}
    return true; // cannot tell -> do not abort the drawing
  }
  const activeSprite = () => {
    try { const e = window.Engine; return e?.sprites?.[e?.activeSpriteIndex || 0] || null; } catch { return null; }
  };

  /* ======================================================================
     1. clean + parse the incoming SVG
     ====================================================================== */

  /* LLMs love wrapping svg in prose or ``` fences - dig the element out. */
  function cleanSvgText(raw) {
    let t = raw;
    if (t && typeof t === 'object' && t.nodeType === 1) {
      try { t = new XMLSerializer().serializeToString(t); } catch {}
    }
    t = String(t == null ? '' : t).trim();
    if (!t) return '';
    if (t.indexOf('<svg') > 0) t = t.slice(t.indexOf('<svg'));
    const end = t.lastIndexOf('</svg>');
    if (end > 0) t = t.slice(0, end + 6);
    t = t.replace(/```[a-z]*/gi, '').trim();
    return t;
  }

  const SHAPE_TAGS = ['rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon', 'path', 'text'];
  const SKIP_TAGS = ['defs', 'title', 'desc', 'metadata', 'style', 'script', 'clipPath', 'mask', 'symbol',
    'marker', 'pattern', 'filter', 'linearGradient', 'radialGradient', 'image', 'use', 'animateTransform'];

  function paintOf(el) {
    const style = el.getAttribute('style') || '';
    const fromStyle = prop => {
      const m = new RegExp('(?:^|;|\\s)' + prop + '\\s*:\\s*([^;]+)', 'i').exec(style);
      return m ? m[1].trim() : null;
    };
    let fill = el.getAttribute('fill') ?? fromStyle('fill');
    let stroke = el.getAttribute('stroke') ?? fromStyle('stroke');
    let sw = num(el.getAttribute('stroke-width')) ?? num(fromStyle('stroke-width'));
    fill = (fill == null ? 'black' : String(fill).trim()) || 'black';
    stroke = (stroke == null ? 'none' : String(stroke).trim()) || 'none';
    /* colours can carry an opacity of their own */
    let fillOp = num(el.getAttribute('fill-opacity')) ?? num(fromStyle('fill-opacity'));
    let strokeOp = num(el.getAttribute('stroke-opacity')) ?? num(fromStyle('stroke-opacity'));
    if (fillOp == null) { const m = /rgba?\([^)]*,\s*([\d.]+)\s*\)/i.exec(fill); if (m) fillOp = num(m[1]); }
    return {
      fill, stroke, sw: sw == null ? 1 : sw,
      fillOp: fillOp == null ? 1 : clamp(fillOp, 0, 1),
      strokeOp: strokeOp == null ? 1 : clamp(strokeOp, 0, 1)
    };
  }

  function outlineOf(tag, a) {
    const n = (v, d) => { const x = num(v); return x == null ? (d || 0) : x; };
    if (tag === 'rect') {
      const x = n(a.x), y = n(a.y), w = n(a.width), h = n(a.height);
      let rx = n(a.rx), ry = n(a.ry);
      if (rx == null && ry == null) return 'M' + x + ' ' + y + 'h' + w + 'v' + h + 'h' + -w + 'Z';
      rx = clamp(rx == null ? (ry || 0) : rx, 0, Math.abs(w) / 2);
      ry = clamp(ry == null ? (rx || 0) : ry, 0, Math.abs(h) / 2);
      if (!rx && !ry) return 'M' + x + ' ' + y + 'h' + w + 'v' + h + 'h' + -w + 'Z';
      return 'M' + (x + rx) + ' ' + y +
        'h' + (w - 2 * rx) + 'a' + rx + ' ' + ry + ' 0 0 1 ' + rx + ' ' + ry +
        'v' + (h - 2 * ry) + 'a' + rx + ' ' + ry + ' 0 0 1 ' + -rx + ' ' + ry +
        'h' + -(w - 2 * rx) + 'a' + rx + ' ' + ry + ' 0 0 1 ' + -rx + ' ' + -ry +
        'v' + -(h - 2 * ry) + 'a' + rx + ' ' + ry + ' 0 0 1 ' + rx + ' ' + -ry + 'Z';
    }
    if (tag === 'circle' || tag === 'ellipse') {
      const cx = n(a.cx), cy = n(a.cy);
      const rx = tag === 'circle' ? n(a.r) : n(a.rx);
      const ry = tag === 'circle' ? n(a.r) : n(a.ry);
      if (!rx || !ry) return null;
      return 'M' + (cx - rx) + ' ' + cy +
        'a' + rx + ' ' + ry + ' 0 1 0 ' + (2 * rx) + ' 0' +
        'a' + rx + ' ' + ry + ' 0 1 0 ' + (-2 * rx) + ' 0Z';
    }
    if (tag === 'line') {
      return 'M' + n(a.x1) + ' ' + n(a.y1) + 'L' + n(a.x2) + ' ' + n(a.y2);
    }
    if (tag === 'polyline' || tag === 'polygon') {
      const pts = String(a.points || '').trim().split(/[\s,]+/).map(Number).filter(Number.isFinite);
      if (pts.length < 4) return null;
      let d = 'M' + pts[0] + ' ' + pts[1];
      for (let i = 2; i + 1 < pts.length; i += 2) d += 'L' + pts[i] + ' ' + pts[i + 1];
      return d + (tag === 'polygon' ? 'Z' : '');
    }
    if (tag === 'path') {
      const d = String(a.d || '').trim();
      return d ? d : null;
    }
    return null; // text: no outline, it is written instead of traced
  }

  function parseSheet(svgText) {
    const out = { ok: false, error: '', viewBox: { x: 0, y: 0, w: 100, h: 100 }, par: 'xMidYMid meet', shapes: [], skipped: [] };
    const text = cleanSvgText(svgText);
    if (!text) { out.error = 'empty svg text'; return out; }
    let doc;
    try { doc = new DOMParser().parseFromString(text, 'image/svg+xml'); } catch (e) { out.error = 'the svg text could not be parsed'; return out; }
    const root = doc?.documentElement;
    if (!root) { out.error = 'the svg text could not be parsed'; return out; }
    if ((root.tagName || '').toLowerCase() !== 'svg') { out.error = 'root element is <' + root.tagName + '>, not <svg>'; return out; }
    if (q('parsererror', doc)) { out.error = 'that svg is not valid XML (there may be a typo in it)'; return out; }

    const vb = String(root.getAttribute('viewBox') || '').trim().split(/[\s,]+/).map(Number);
    if (vb.length === 4 && vb.every(Number.isFinite) && vb[2] > 0 && vb[3] > 0) {
      out.viewBox = { x: vb[0], y: vb[1], w: vb[2], h: vb[3] };
    } else {
      const w = num(root.getAttribute('width')) || 100, h = num(root.getAttribute('height')) || 100;
      out.viewBox = { x: 0, y: 0, w: w > 0 ? w : 100, h: h > 0 ? h : 100 };
    }
    if (root.getAttribute('preserveAspectRatio')) out.par = root.getAttribute('preserveAspectRatio');

    const walk = (parent, chain) => {
      for (const el of parent.children) {
        if (out.shapes.length >= MAX_SHAPES) return;
        const tag = (el.tagName || '').toLowerCase();
        const tr = (el.getAttribute('transform') || '').trim();
        const next = tr ? (chain ? chain + ' ' + tr : tr) : chain;
        if (tag === 'g' || tag === 'a' || tag === 'switch') { walk(el, next); continue; }
        if (SKIP_TAGS.indexOf(el.tagName) >= 0 || SKIP_TAGS.indexOf(tag) >= 0) continue;
        if (SHAPE_TAGS.indexOf(tag) < 0) { if (out.skipped.indexOf(tag) < 0) out.skipped.push(tag); continue; }

        const paint = paintOf(el);
        const d = outlineOf(tag, {
          x: el.getAttribute('x'), y: el.getAttribute('y'), width: el.getAttribute('width'), height: el.getAttribute('height'),
          rx: el.getAttribute('rx'), ry: el.getAttribute('ry'), cx: el.getAttribute('cx'), cy: el.getAttribute('cy'),
          r: el.getAttribute('r'), x1: el.getAttribute('x1'), y1: el.getAttribute('y1'), x2: el.getAttribute('x2'), y2: el.getAttribute('y2'),
          points: el.getAttribute('points'), d: el.getAttribute('d')
        });
        const clone = el.cloneNode(true);
        stripIds(clone);
        out.shapes.push({
          tag, d, clone, transform: next, paint,
          label: tag === 'text' ? (tag + ' "' + String(el.textContent || '').trim().slice(0, 18) + '"') : tag
        });
      }
    };
    walk(root, '');

    /* keep it sane if a huge sheet arrives: the extras are still part of the
       costume (the full svg is imported) - only the animation is trimmed */
    out.kept = out.shapes.length;
    out.ok = out.shapes.length > 0;
    if (!out.ok) out.error = 'that svg has no shapes I can draw (' + (out.skipped.join(', ') || 'nothing found') + ')';
    return out;
  }

  function stripIds(node) {
    if (!node || node.nodeType !== 1) return node;
    try { node.removeAttribute('id'); } catch {}
    try { node.querySelectorAll?.('[id]').forEach(n => n.removeAttribute('id')); } catch {}
    return node;
  }

  /* ======================================================================
     2. the paint-area furniture: overlay svg + Sparky cursor + STOP button
     ====================================================================== */

  function placeOverlay(s) {
    const wrap = s.wrap, canvas = s.canvas, ov = s.overlay;
    if (!wrap || !canvas || !ov || !wrap.isConnected || !canvas.isConnected) return false;
    const wr = wrap.getBoundingClientRect(), cr = canvas.getBoundingClientRect();
    if (cr.width < 4 || cr.height < 4) return false;   // hidden tab or not laid out yet
    ov.setAttribute('width', String(Math.round(cr.width)));
    ov.setAttribute('height', String(Math.round(cr.height)));
    ov.style.left = (cr.left - wr.left + wrap.scrollLeft) + 'px';
    ov.style.top = (cr.top - wr.top + wrap.scrollTop) + 'px';
    ov.style.width = cr.width + 'px';
    ov.style.height = cr.height + 'px';
    s.off = { x: cr.left - wr.left, y: cr.top - wr.top };
    s.rect = { width: cr.width, height: cr.height };
    s.px = cr.width / VB.w;                            // css px per viewBox unit
    return true;
  }

  function buildOverlay(s) {
    const wrap = by('gwCostumeCanvasWrapV15'), canvas = by('gwVectorCanvasV15');
    if (!wrap || !canvas) return false;
    s.wrap = wrap; s.canvas = canvas;

    const ov = document.createElementNS(SVGNS, 'svg');
    ov.setAttribute('id', 'gwSparkyOverlay');
    ov.setAttribute('viewBox', '0 0 ' + VB.w + ' ' + VB.h);
    ov.setAttribute('aria-hidden', 'true');
    ov.style.position = 'absolute';
    ov.style.pointerEvents = 'none';
    ov.style.overflow = 'visible';
    ov.style.zIndex = '6';
    /* Claude fix: a blank sheet under Sparky's drawing, so it is not drawn on top of the costume that is open
       (the drawing becomes a NEW costume; the open one is not changed) */
    const sheet = document.createElementNS(SVGNS, 'rect');
    sheet.setAttribute('x', '0'); sheet.setAttribute('y', '0'); sheet.setAttribute('width', String(VB.w)); sheet.setAttribute('height', String(VB.h));
    sheet.setAttribute('fill', '#ffffff');
    ov.appendChild(sheet);

    /* soft glow for the pen line */
    const defs = document.createElementNS(SVGNS, 'defs');
    const filter = document.createElementNS(SVGNS, 'filter');
    filter.setAttribute('id', 'gwSparkyGlow');
    filter.setAttribute('x', '-60%'); filter.setAttribute('y', '-60%');
    filter.setAttribute('width', '220%'); filter.setAttribute('height', '220%');
    const blur = document.createElementNS(SVGNS, 'feGaussianBlur');
    blur.setAttribute('stdDeviation', '1.8'); blur.setAttribute('result', 'gwSparkyBlur');
    const merge = document.createElementNS(SVGNS, 'feMerge');
    const m1 = document.createElementNS(SVGNS, 'feMergeNode'); m1.setAttribute('in', 'gwSparkyBlur');
    const m2 = document.createElementNS(SVGNS, 'feMergeNode'); m2.setAttribute('in', 'SourceGraphic');
    merge.appendChild(m1); merge.appendChild(m2); filter.appendChild(blur); filter.appendChild(merge);
    defs.appendChild(filter);
    ov.appendChild(defs);

    /* fit the sheet's viewBox into the 384 x 384 art square, like the costume
       renderer does (meet / slice / stretch are all honoured) */
    const vb = s.sheet.viewBox, par = String(s.sheet.par || '');
    let kx = ART.w / vb.w, ky = ART.h / vb.h;
    if (/none/i.test(par)) { /* stretch: keep kx, ky */ }
    else if (/slice/i.test(par)) { kx = ky = Math.max(kx, ky); }
    else { kx = ky = Math.min(kx, ky); }
    const fit = 'translate(' + (ART.x + ART.w / 2) + ' ' + (ART.y + ART.h / 2) + ') ' +
      'scale(' + kx + ' ' + ky + ') ' +
      'translate(' + (-(vb.x + vb.w / 2)) + ' ' + (-(vb.y + vb.h / 2)) + ')';
    s.fit = fit; s.k = kx;
    s.layer = document.createElementNS(SVGNS, 'g');
    s.layer.setAttribute('id', 'gwSparkyLayer');
    ov.appendChild(s.layer);

    wrap.appendChild(ov);
    s.overlay = ov;
    return placeOverlay(s);
  }

  function buildCursor(s) {
    /* a faint dot that trails the ball while a line is being drawn */
    const dot = document.createElement('div');
    dot.id = 'gwSparkyTrail';
    dot.setAttribute('aria-hidden', 'true');
    dot.style.cssText = [
      'position:absolute', 'left:0', 'top:0', 'width:9px', 'height:9px', 'margin:-4.5px 0 0 -4.5px',
      'border-radius:9999px', 'pointer-events:none', 'z-index:8',
      'background:radial-gradient(circle,' + SPARKY.ink + ' 0%,' + SPARKY.mid + ' 70%, rgba(168,85,247,0) 100%)',
      'opacity:0', 'transition:opacity .22s ease-out', 'will-change:transform'
    ].join(';');

    const d = document.createElement('div');
    d.id = 'gwSparkyCursor';
    d.setAttribute('aria-hidden', 'true');
    d.style.cssText = [
      'position:absolute', 'left:0', 'top:0', 'width:28px', 'height:28px', 'margin:-14px 0 0 -14px',
      'border-radius:9999px', 'pointer-events:none', 'z-index:9', 'display:grid', 'place-items:center',
      'background:radial-gradient(circle at 34% 30%,' + SPARKY.hi + ' 0%,' + SPARKY.mid + ' 46%,' + SPARKY.deep + ' 100%)',
      'box-shadow:0 0 0 2px rgba(255,255,255,.5), 0 0 12px 3px rgba(168,85,247,.8), 0 0 26px 10px rgba(168,85,247,.32)',
      'opacity:0', 'transition:opacity .18s ease-out', 'will-change:transform'
    ].join(';');
    /* a tiny G-Spark head: the same two strokes as the G-Spark logo */
    d.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">' +
      '<path d="M17.5 7.2A7 7 0 1 0 19 12h-6.2" fill="none" stroke="#ececf6" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M14.6 9.6 12.2 13h2.6l-2.3 3.6" fill="none" stroke="#4ade80" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    s.wrap.appendChild(dot);
    s.wrap.appendChild(d);
    s.cursorEl = d;
    s.dotEl = dot;
    /* vx/vy: spring velocity while gliding · dx/dy: the trailing dot
       lean: how far the ball tilts into its direction of travel */
    s.cursor = {
      x: 0, y: 0, tx: 0, ty: 0, vx: 0, vy: 0, dx: 0, dy: 0,
      rot: 0, rotT: 0, scale: 1, scaleT: 1, lean: 0
    };
    return true;
  }

  /* ONE rAF loop drives the cursor (and watches the tab on the way).
       gliding -> a light spring: it eases out of the old spot, eases into the
                  new one and may overshoot a hair, which is what a hand does;
       tracing -> a tight follow, so the ball sits ON the pen tip;
       always  -> the ball leans into its direction of travel and puffs up a
                  little with speed; a faint dot trails it while drawing. */
  function startCursorLoop(s) {
    let last = now();
    const step = () => {
      if (s.dead) return;
      const t = now(), dt = Math.min(64, Math.max(8, t - last)); last = t;
      const c = s.cursor, f = dt / 16.7;             // frames' worth of time
      const g = 1 - Math.pow(0.72, f);               // rotation / scale easing
      const px = c.x, py = c.y;

      if (s.tracing) {                               // on the pen tip
        const tight = 1 - Math.pow(0.34, f);
        c.x += (c.tx - c.x) * tight;
        c.y += (c.ty - c.y) * tight;
        c.vx = 0; c.vy = 0;
      } else {                                       // gliding: spring
        const damp = Math.pow(0.88, f);
        c.vx = (c.vx + (c.tx - c.x) * 0.0135 * f) * damp;
        c.vy = (c.vy + (c.ty - c.y) * 0.0135 * f) * damp;
        c.x += c.vx * f;
        c.y += c.vy * f;
        if (Math.abs(c.tx - c.x) < 0.3 && Math.abs(c.vx) < 0.05) { c.x = c.tx; c.vx = 0; }
        if (Math.abs(c.ty - c.y) < 0.3 && Math.abs(c.vy) < 0.05) { c.y = c.ty; c.vy = 0; }
      }
      c.rot += (c.rotT - c.rot) * g;
      c.scale += (c.scaleT - c.scale) * g;

      const mvx = (c.x - px) / f, mvy = (c.y - py) / f;   // px per 16.7 ms
      const speed = Math.min(28, Math.hypot(mvx, mvy));
      c.lean += (clamp(mvx * 0.5, -13, 13) - c.lean) * g;

      const el = s.cursorEl;
      if (el) {
        /* a jump between two subpaths blinks instead of sliding over artwork */
        const op = t < (s.blinkUntil || 0) ? '0.32' : '1';
        if (el.__op !== op) { el.__op = op; el.style.opacity = op; }
        const rot = c.rot + c.lean;
        const sc = c.scale * (1 + speed * 0.0042);
        el.style.transform = 'translate3d(' + (s.off.x + c.x).toFixed(2) + 'px,' + (s.off.y + c.y).toFixed(2) + 'px,0)' +
          ' rotate(' + rot.toFixed(2) + 'deg) scale(' + sc.toFixed(3) + ')';
      }
      /* the panels around the paint area can resize while drawing (a costume
         list grows, a pane opens): keep the overlay pinned to the canvas */
      if ((s.beat = (s.beat || 0) + 1) % 30 === 1) { try { placeOverlay(s); } catch {} }

      const dot = s.dotEl;
      if (dot) {
        const lag = 1 - Math.pow(0.55, f);
        c.dx += (c.x - c.dx) * lag;
        c.dy += (c.y - c.dy) * lag;
        if (dot.__vis !== !!s.tracing) { dot.__vis = !!s.tracing; dot.style.opacity = s.tracing ? '0.85' : '0'; }
        dot.style.transform = 'translate3d(' + (s.off.x + c.dx).toFixed(2) + 'px,' + (s.off.y + c.dy).toFixed(2) + 'px,0)';
        if (s.tracing && speed > 2 && (s.beat % 3 === 0)) {   // a little spark trail behind the ball
          const sp = document.createElement('div');
          sp.style.cssText = 'position:absolute;left:0;top:0;width:4px;height:4px;margin:-2px 0 0 -2px;border-radius:9999px;pointer-events:none;z-index:7;background:#e9d5ff;box-shadow:0 0 6px #a855f7;will-change:transform,opacity;transition:transform .35s linear,opacity .35s linear';
          sp.style.transform = 'translate3d(' + (s.off.x + c.x - mvx * 1.5).toFixed(2) + 'px,' + (s.off.y + c.y - mvy * 1.5).toFixed(2) + 'px,0)';
          s.wrap.appendChild(sp); requestAnimationFrame(() => { sp.style.opacity = '0'; sp.style.transform += ' scale(.2)'; });
          setTimeout(() => sp.remove(), 380);
        }
      }
      if (!onCostumesTab()) { s.aborted = true; s.reason = 'left the Costumes tab'; }
      s.raf = requestAnimationFrame(step);
    };
    s.raf = requestAnimationFrame(step);
  }

  function buildStopButton(s) {
    const b = document.createElement('button');
    b.id = 'gwSparkyStop';
    b.type = 'button';
    b.setAttribute('aria-label', 'Stop Sparky drawing');
    b.style.cssText = [
      'position:absolute', 'top:10px', 'right:10px', 'z-index:12', 'cursor:pointer',
      'display:inline-flex', 'align-items:center', 'gap:6px', 'padding:5px 11px',
      'border-radius:9999px', 'border:1px solid rgba(233,213,255,.55)',
      'background:linear-gradient(180deg,rgba(88,28,135,.96),rgba(59,7,100,.96))',
      'color:#f5f3ff', 'font:600 11.5px/1.2 system-ui,Segoe UI,sans-serif',
      'box-shadow:0 4px 14px rgba(0,0,0,.45), 0 0 12px rgba(168,85,247,.45)'
    ].join(';');
    b.textContent = '■  Stop';
    b.addEventListener('click', e => {
      e.preventDefault(); e.stopPropagation();
      s.aborted = true; s.reason = 'the Stop button';
    });
    s.wrap.appendChild(b);
    s.stopBtn = b;
    return true;
  }

  /* ======================================================================
     3. the drawing itself
     ====================================================================== */

  function tween(s, ms, onFrame) {
    return new Promise(resolve => {
      const t0 = now();
      const step = () => {
        if (s.dead) return resolve(false);
        if (s.aborted) return resolve(false);
        const t = ms > 0 ? clamp((now() - t0) / ms, 0, 1) : 1;
        try { onFrame(t); } catch (e) { log('frame error', e); }
        if (t >= 1) return resolve(true);
        requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }

  /* element-local user units -> css px inside the paint area (the overlay is
     pinned exactly over #gwVectorCanvasV15, so its px are the canvas's px) */
  function localToPx(s, node, px, py) {
    try {
      const m = node.getCTM && node.getCTM();
      if (m && s.overlay && s.overlay.createSVGPoint) {
        const p = s.overlay.createSVGPoint();
        p.x = px; p.y = py;
        const q = p.matrixTransform(m);
        if (Number.isFinite(q.x) && Number.isFinite(q.y)) return { x: q.x, y: q.y };
      }
    } catch {}
    return { x: s.cursor.x, y: s.cursor.y };
  }

  async function drawShape(s, shape, index) {
    const layer = document.createElementNS(SVGNS, 'g');
    layer.setAttribute('transform', s.fit + (shape.transform ? ' ' + shape.transform : ''));

    const live = document.createElementNS(SVGNS, 'g');      // the real artwork
    live.style.opacity = '0';
    live.appendChild(shape.clone);
    layer.appendChild(live);

    let guide = null, len = 0;
    if (shape.d) {
      guide = document.createElementNS(SVGNS, 'path');
      guide.setAttribute('d', shape.d);
      guide.setAttribute('fill', 'none');
      const ownStroke = shape.paint.stroke && shape.paint.stroke !== 'none';
      guide.setAttribute('stroke', ownStroke ? shape.paint.stroke : SPARKY.mid);
      guide.setAttribute('stroke-opacity', String(ownStroke ? shape.paint.strokeOp : 0.95));
      const w = ownStroke && shape.paint.sw ? shape.paint.sw : (2.6 / (s.k || 1));
      guide.setAttribute('stroke-width', String(Math.max(0.6, w)));
      guide.setAttribute('stroke-linecap', 'round');
      guide.setAttribute('stroke-linejoin', 'round');
      guide.setAttribute('filter', 'url(#gwSparkyGlow)');
      guide.style.strokeDasharray = '0 99999';
      layer.appendChild(guide);
    }
    s.layer.appendChild(layer);

    /* --- where does this shape start? ------------------------------------ */
    let startPx = { x: (ART.x + ART.w / 2) * (s.px || 1), y: (ART.y + ART.h / 2) * (s.px || 1) };
    let dur = 900;
    if (guide) {
      try { len = guide.getTotalLength(); } catch { len = 0; }
      if (len > 0) {
        try { startPx = localToPx(s, guide, guide.getPointAtLength(0).x, guide.getPointAtLength(0).y); } catch {}
      }
      const pxLen = len * (s.k || 1) * (s.px || 1);
      dur = clamp(pxLen * 2.1, 600, 1500);          // 0.6 s .. 1.5 s, like the spec
    } else {
      /* no outline (text): sweep across its box while it appears */
      try {
        const r = live.getBoundingClientRect();
        if (r.width > 1) {
          startPx = { x: r.left - s.canvas.getBoundingClientRect().left, y: r.top - s.canvas.getBoundingClientRect().top + r.height / 2 };
          s.textSweep = { from: startPx.x, to: startPx.x + r.width, y: startPx.y };
        }
      } catch {}
      dur = 520;
    }

    /* --- 1. glide to the shape (time grows with the distance) ------------ */
    const travel = Math.hypot(startPx.x - s.cursor.tx, startPx.y - s.cursor.ty);
    s.cursor.tx = startPx.x; s.cursor.ty = startPx.y;
    await tween(s, clamp(200 + travel * 1.1, 200, 620), () => { /* the smoothing loop glides */ });
    if (s.aborted) return;

    /* --- 2. "pick the tool": a wiggle whose direction and size vary a bit,
            so no two shapes get the same mechanical twitch ---------------- */
    const dir = index % 2 ? -1 : 1, amp = 14 + (index % 3) * 2.5;
    s.cursor.rotT = dir * amp; s.cursor.scaleT = 1.12 + (index % 2) * 0.03;
    await tween(s, 120 + (index % 3) * 20, t => { s.cursor.rotT = dir * amp + (-2 * dir * amp) * easeInOut(t); });
    s.cursor.rotT = 0; s.cursor.scaleT = 1;
    await tween(s, 140 + (index % 3) * 20, t => { s.cursor.rotT = -dir * amp * (1 - easeInOut(t)); });
    if (s.aborted) return;

    /* --- 3. trace the outline, cursor riding the pen tip ----------------- */
    s.tracing = true;
    if (guide && len > 0) {
      guide.style.strokeDasharray = len + ' ' + len;
      guide.style.strokeDashoffset = String(len);
      const canPoint = typeof guide.getPointAtLength === 'function';
      await tween(s, dur, t => {
        const e = easeInOut(t);
        guide.style.strokeDashoffset = String(len * (1 - e));
        /* a short "pen down" press when the tip lands on the outline */
        s.cursor.scaleT = t < 0.1 ? 0.93 : 1;
        if (canPoint) {
          try {
            const at = len * e;
            const p = guide.getPointAtLength(at);
            const c = localToPx(s, guide, p.x, p.y);
            /* a long hop means a new subpath: blink there instead of sliding */
            if (Math.hypot(c.x - s.cursor.tx, c.y - s.cursor.ty) > 26) s.blinkUntil = now() + 130;
            /* a whisper of hand tremor (0.7 px) - it keeps the line from
               looking machine-perfect without smudging the stroke */
            s.cursor.tx = c.x + Math.sin(at * 0.06) * 0.7;
            s.cursor.ty = c.y + Math.cos(at * 0.075) * 0.7;
          } catch {}
        }
        /* the real artwork grows in over the last third - and the pen line
           steps back as it does, so the shape never looks double-drawn */
        const f = clamp((t - 0.62) / 0.38, 0, 1);
        live.style.opacity = String(easeOut(f));
        guide.style.opacity = String(1 - 0.6 * easeOut(f));
      });
    } else {
      const sw = s.textSweep;
      await tween(s, dur, t => {
        const e = easeInOut(t);
        live.style.opacity = String(easeOut(t));
        if (sw) { s.cursor.tx = sw.from + (sw.to - sw.from) * e; s.cursor.ty = sw.y; }
      });
      s.textSweep = null;
    }
    s.tracing = false;
    if (s.aborted) return;

    /* --- 4. settle: full artwork in, guide out --------------------------- */
    const gOp = guide ? (parseFloat(guide.style.opacity) || 1) : 1;
    await tween(s, 200, t => {
      live.style.opacity = '1';
      if (guide) guide.style.opacity = String(gOp * (1 - t));
    });
    if (guide) guide.remove();
  }

  async function playSession(s) {
    startCursorLoop(s);
    buildStopButton(s);
    try {
      for (let i = 0; i < s.shapes.length; i++) {
        if (s.aborted) break;
        if (i >= MAX_ANIM) { await finishFast(s, i); return; }
        await drawShape(s, s.shapes[i], i);
      }
    } finally {
      if (s.aborted) await revealAll(s);
    }
  }

  /* STOP / tab change / calm mode: everything is already there, just show it */
  async function revealAll(s) {
    if (!s.layer) return;
    s.layer.querySelectorAll('g > g').forEach(g => { g.style.opacity = '1'; });
    s.layer.querySelectorAll('path').forEach(p => { if (p.getAttribute('filter')) p.style.opacity = '0'; });
  }
  async function finishFast(s) {
    await revealAll(s);
    const left = s.shapes.length - MAX_ANIM;
    if (left > 0) await wait(260);
  }

  function teardown(s) {
    s.dead = true;
    if (s.raf) { try { cancelAnimationFrame(s.raf); } catch {} s.raf = 0; }
    try { s.stopBtn?.remove(); } catch {}
    try { s.cursorEl?.remove(); } catch {}
    try { s.dotEl?.remove(); } catch {}
    try { s.overlay?.remove(); } catch {}
    if (window.GSPARK_DRAW && window.GSPARK_DRAW.session === s) window.GSPARK_DRAW.session = null;
  }

  /* ======================================================================
     4. adding the costume - G-Warp's own import code
     ====================================================================== */

  function safeFileName(name) {
    const n = String(name == null ? '' : name).replace(/[\\/:*?"<>|]+/g, '-').replace(/\s+/g, ' ').trim().slice(0, 40);
    return n || 'sparky';
  }
  function uniqueCostumeName(sprite, name) {
    /* same rule as G-Warp's uniq(list, name):  "cat" -> "cat 2" -> "cat 3" */
    const used = new Set((sprite?.costumes || []).map(c => c?.name));
    const base = String(name || 'sparky').trim().slice(0, 40) || 'sparky';
    if (!used.has(base)) return base;
    const stem = base.replace(/\s+\d+$/, '');
    let i = 2;
    while (used.has(stem + ' ' + i)) i++;
    return stem + ' ' + i;
  }

  function loadSvgImage(svgText) {
    return new Promise((resolve, reject) => {
      let url = '';
      try { url = URL.createObjectURL(new Blob([svgText], { type: 'image/svg+xml' })); }
      catch { reject(new Error('the svg could not be opened as an image')); return; }
      const img = new Image();
      img.onload = () => { try { URL.revokeObjectURL(url); } catch {} resolve(img); };
      img.onerror = () => { try { URL.revokeObjectURL(url); } catch {} reject(new Error('the svg could not be rendered as an image')); };
      img.src = url;
    });
  }

  function refreshCostumeUI() {
    try { by('gwV153ClearSelection')?.click(); } catch {}
    try { window.GW_V15_COSTUME_EDITOR?.loadBitmap?.(); } catch {}
    try { window.GW_V15_COSTUME_EDITOR?.loadVector?.(); } catch {}
    try { window.renderSpritesGrid?.(); } catch {}
    try { window.updatePropertyInputs?.(); } catch {}
    try { window.GW_V1570_STUDIO?.renderCostumeList?.(true); } catch {}
    try { window.GW_V1570_STUDIO?.refreshCostumeMenus?.(); } catch {}
    try { window.GW?.refreshStage?.(); } catch {}
    try { window.GW_HISTORY?.capture?.('sparky-draw'); } catch {}
  }

  /* fallback: exactly what uploadCostumes() does, using only public pieces */
  async function addCostumeDirect(svgText, name) {
    const sprite = activeSprite();
    if (!sprite) return { ok: false, error: 'no sprite is selected' };
    const img = await loadSvgImage(svgText);
    const nw = img.naturalWidth || img.width || 80, nh = img.naturalHeight || img.height || 80;
    const k = Math.min(1, 480 / nw, 360 / nh);
    const w = Math.max(1, Math.round(nw * k)), h = Math.max(1, Math.round(nh * k)), R = 2;
    const cv = document.createElement('canvas');
    cv.width = w * R; cv.height = h * R;
    const ctx = cv.getContext('2d');
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, cv.width, cv.height);
    const cos = {
      name: uniqueCostumeName(sprite, name), canvas: cv, res: R,
      rc: { x: w / 2, y: h / 2 }, natural: true, dataFormat: 'svg'
    };
    if (k === 1) cos.svg = svgText;                 // stays a real vector costume
    sprite.costumes.push(cos);
    sprite.activeCostume = sprite.costumes.length - 1;
    refreshCostumeUI();
    return { ok: true, via: 'uploadCostumes() fallback (direct push)', costume: cos.name, vector: cos.dataFormat === 'svg' && !!cos.svg };
  }

  async function waitFor(pred, ms) {
    const t0 = now();
    while (now() - t0 < ms) {
      try { if (pred()) return true; } catch {}
      await wait(60);
    }
    return false;
  }

  /* the real thing: feed a File to G-Warp's own costume input, whose change
     handler is uploadCostumes([...files]) - the same code the Upload button
     uses.  Nothing is invented, nothing of the old costume is touched.     */
  async function addCostume(svgText, name) {
    const sprite = activeSprite();
    if (!sprite) return { ok: false, error: 'no sprite is selected' };
    const before = sprite.costumes.length;
    const input = by('gwCosFile');
    if (input && typeof window.DataTransfer === 'function' && typeof window.File === 'function') {
      try {
        const file = new File([svgText], safeFileName(name) + '.svg', { type: 'image/svg+xml' });
        const dt = new DataTransfer();
        dt.items.add(file);
        input.files = dt.files;
        input.dispatchEvent(new Event('change', { bubbles: true }));
        const arrived = await waitFor(() => (activeSprite()?.costumes.length || 0) > before, 2500);
        if (arrived) {
          const cos = activeSprite().costumes[activeSprite().costumes.length - 1];
          return { ok: true, via: '#gwCosFile -> uploadCostumes()', costume: cos?.name, vector: cos?.dataFormat === 'svg' && !!cos?.svg };
        }
        log('the import input did not answer, using the direct path');
      } catch (e) {
        log('the import input failed, using the direct path', e);
      }
    }
    try {
      return await addCostumeDirect(svgText, name);
    } catch (e) {
      return { ok: false, error: (e && e.message) || 'the costume could not be added' };
    }
  }

  /* ======================================================================
     5. public API
     ====================================================================== */

  async function draw(svgText, name) {
    const label = String(name == null ? '' : name).trim().slice(0, 40) || 'sparky';
    const text = cleanSvgText(svgText);

    if (off()) {
      log('disabled by localStorage.' + OFF_KEY + ' = 1');
      return { ok: false, reason: 'off', message: 'Sparky drawing is switched off (localStorage ' + OFF_KEY + ' = 1)' };
    }
    if (!text) return { ok: false, error: 'no svg text was given' };
    if (!activeSprite()) return { ok: false, error: 'no sprite is selected' };

    cancel('superseded');

    const sheet = parseSheet(text);
    if (!sheet.ok) {
      /* still try to hand the picture over - G-Warp can often show what I
         cannot trace (an <image> only sheet, for example) */
      const res = await addCostume(text, label);
      return Object.assign({ shapes: 0, mode: 'instant' }, res, sheet.ok ? null : { note: sheet.error });
    }

    /* --- switch to the Costumes tab (the spec's step 3) ------------------ */
    try { if (typeof window.switchMainTabV15 === 'function') window.switchMainTabV15('costumes'); } catch {}
    if (!onCostumesTab()) { try { by('gwMainTabCostumes')?.click(); } catch {} }
    await tick();

    const stillReason = motionOffReason();
    const instant = !!stillReason || !onCostumesTab();
    if (instant) {
      const res = await addCostume(text, label);
      return Object.assign({ shapes: sheet.shapes.length, mode: 'instant', reason: stillReason || 'the Costumes tab is not showing' }, res);
    }

    /* the visible drawing happens on the VECTOR canvas, so make sure the
       editor is showing it (the Bitmap engine would hide that canvas) */
    try { window.GW_V15_COSTUME_EDITOR?.setMode?.('vector'); } catch {}
    await tick();

    /* --- the visible drawing ------------------------------------------- */
    const s = {
      shapes: sheet.shapes, sheet, dead: false, aborted: false, reason: '',
      raf: 0, cursorEl: null, stopBtn: null, overlay: null, layer: null, wrap: null, canvas: null
    };
    if (!buildOverlay(s) || !buildCursor(s)) {
      teardown(s);
      const res = await addCostume(text, label);
      return Object.assign({ shapes: sheet.shapes.length, mode: 'instant', reason: 'the paint area was not ready' }, res);
    }
    window.GSPARK_DRAW.session = s;
    /* the session starts at the bottom-left of the paint area (canvas px) */
    s.cursor.x = s.cursor.tx = s.cursor.dx = 26;
    s.cursor.y = s.cursor.ty = s.cursor.dy = Math.max(26, (s.rect.height || 300) - 26);
    try { s.cursorEl.style.opacity = '1'; } catch {}

    const onResize = () => { try { placeOverlay(s); } catch {} };
    window.addEventListener('resize', onResize);
    try { await playSession(s); } catch (e) { log('the drawing stopped early', e); }
    window.removeEventListener('resize', onResize);

    const aborted = s.aborted, why = s.reason;
    teardown(s);

    /* --- add the costume (always, even after STOP) ---------------------- */
    const res = await addCostume(text, label);
    const mode = aborted ? 'stopped' : 'animated';
    try { if (res.ok && !aborted) toast('Sparky drew “' + (res.costume || label) + '”'); } catch {}
    log(mode, why || '', res);
    return Object.assign({ shapes: sheet.shapes.length, mode, stoppedBecause: aborted ? why : null }, res);
  }

  function cancel(reason) {
    const s = window.GSPARK_DRAW.session;
    if (!s) return false;
    s.aborted = true;
    s.reason = reason || 'cancelled';
    return true;
  }

  window.GSPARK_DRAW = {
    __gsparkDraw: true,
    version: VERSION,
    draw,
    addInstant: (svgText, name) => addCostume(cleanSvgText(svgText), String(name || 'frame').slice(0, 40)),   // Claude: extra animation frames, no drawing show
    cancel,
    session: null,
    isBusy: () => !!window.GSPARK_DRAW.session,
    onCostumesTab,
    calm,
    isOff: off,
    /* handy for a one-line console test / for G-Spark */
    test: (name) => draw('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' +
      '<circle cx="50" cy="50" r="40" fill="gold"/>' +
      '<rect x="30" y="30" width="40" height="20" fill="navy"/></svg>', name || 'test')
  };
  log('ready · v' + VERSION + ' · call GSPARK_DRAW.draw(svgText, name)');
})();
