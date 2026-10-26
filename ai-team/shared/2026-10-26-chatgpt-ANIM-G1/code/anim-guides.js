/* G-Warp ANIM-G1 — ruler and guide-line proposal.
 * Standalone candidate. It is NOT loaded or activated by app.html.
 * Guide graphics live in sibling overlays; they never enter a costume SVG.
 */
(() => {
  'use strict';
  if (window.GW_ANIM_GUIDES) return;
  if (typeof window.GW_FEATURE_OFF === 'function' && window.GW_FEATURE_OFF('animGuides')) return;

  const NS = 'http://www.w3.org/2000/svg';
  const VERSION = 1;
  const activeSprite = () => window.Engine?.sprites?.[window.Engine?.activeSpriteIndex] || null;
  const costumeOf = s => s?.costumes?.[s.activeCostume] || null;
  const copy = x => JSON.parse(JSON.stringify(x));
  const canvasIds = new WeakMap(); let canvasIdN = 0;
  const frameSvgCache = new WeakMap();
  const canvasId = canvas => { if (!canvas || typeof canvas !== 'object') return 'none'; if (!canvasIds.has(canvas)) canvasIds.set(canvas, ++canvasIdN); return canvasIds.get(canvas); };
  const defaults = () => ({
    version: VERSION, locked: false, snapToGuides: false,
    builtins: { centre: true, ground: true, head: true, stage: true },
    ground: { value: null, auto: true }, head: { value: null, auto: true },
    lines: [], measureKey: ''
  });
  function normalize(data) {
    const d = data && typeof data === 'object' ? data : defaults();
    d.version = VERSION; d.locked = !!d.locked; d.snapToGuides = !!d.snapToGuides;
    d.builtins = Object.assign({ centre: true, ground: true, head: true, stage: true }, d.builtins || {});
    d.ground = Object.assign({ value: null, auto: true }, d.ground || {});
    d.head = Object.assign({ value: null, auto: true }, d.head || {});
    d.lines = Array.isArray(d.lines) ? d.lines.filter(x => x && (x.axis === 'x' || x.axis === 'y') && Number.isFinite(Number(x.value))).map(x => ({
      id: String(x.id || ('g' + Math.random().toString(36).slice(2, 9))), axis: x.axis, value: Number(x.value)
    })) : [];
    return d;
  }
  function getData(sprite) {
    if (!sprite) return null;
    if (!sprite.gwAnimGuides || typeof sprite.gwAnimGuides !== 'object') sprite.gwAnimGuides = defaults();
    sprite.gwAnimGuides = normalize(sprite.gwAnimGuides);
    return sprite.gwAnimGuides;
  }
  function serializeSprite(sprite) {
    return sprite?.gwAnimGuides ? copy(normalize(sprite.gwAnimGuides)) : undefined;
  }
  function restoreSprite(sprite, saved) {
    if (!sprite) return;
    sprite.gwAnimGuides = saved ? normalize(copy(saved)) : defaults();
    return sprite.gwAnimGuides;
  }

  function hashText(value) {
    let h = 2166136261;
    for (let i = 0; i < value.length; i++) h = Math.imul(h ^ value.charCodeAt(i), 16777619);
    return (h >>> 0).toString(36);
  }
  function firstFrame(s) {
    const live = window.GW_ANIM?.state;
    const a = live?.s === s && live?.anim ? live.anim : s?.gwAnimations?.[0];
    if (a && typeof window.GW_ANIM?.frameSvg === 'function') {
      try {
        let cached = frameSvgCache.get(a);
        if (!cached || cached.rev !== (a.rev || 0)) {
          cached = { rev: a.rev || 0, svg: window.GW_ANIM.frameSvg(a, 0) };
          frameSvgCache.set(a, cached);
        }
        const svg = cached.svg;
        if (svg) return { svg, rc: a.rc || { x: 0, y: 0 }, key: 'anim:' + a.id + ':' + (a.rev || 0) + ':' + hashText(svg) };
      } catch {}
    }
    const c = s?.costumes?.[s.activeCostume] || s?.costumes?.[0];
    if (c?.svg) return { svg: c.svg, rc: c.rc || { x: 0, y: 0 }, key: 'costume:' + c.name + ':' + hashText(c.svg) };
    if (c?.canvas) return { canvas: c.canvas, res: c.res || 1, rc: c.rc || { x: 0, y: 0 }, key: 'bitmap:' + c.name + ':' + canvasId(c.canvas) + ':' + c.canvas.width + 'x' + c.canvas.height + ':res' + (c.res || 1) };
    return null;
  }
  function measureSvg(svgText) {
    if (!svgText || !window.DOMParser) return null;
    let host;
    try {
      const doc = new DOMParser().parseFromString(svgText, 'image/svg+xml');
      if (doc.getElementsByTagName('parsererror').length || doc.documentElement.localName !== 'svg') return null;
      host = document.createElementNS(NS, 'svg');
      host.setAttribute('width', '512'); host.setAttribute('height', '384');
      host.style.cssText = 'position:fixed;left:-12000px;top:-12000px;width:512px;height:384px;visibility:hidden;overflow:visible;pointer-events:none';
      host.appendChild(document.importNode(doc.documentElement, true));
      document.body.appendChild(host);
      const root = host.firstElementChild;
      const rootCTM = root.getScreenCTM();
      if (!rootCTM) return null;
      const toRoot = rootCTM.inverse();
      let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      [...root.children].filter(node => !/^(defs|style|title|desc|metadata|script)$/i.test(node.localName)).forEach(node => {
        try {
          const box = node.getBBox(), ctm = node.getScreenCTM();
          if (!ctm || !Number.isFinite(box.x) || !Number.isFinite(box.y)) return;
          const m = toRoot.multiply(ctm);
          for (const [x, y] of [[box.x, box.y], [box.x + box.width, box.y], [box.x, box.y + box.height], [box.x + box.width, box.y + box.height]]) {
            const p = new DOMPoint(x, y).matrixTransform(m);
            x0 = Math.min(x0, p.x); y0 = Math.min(y0, p.y);
            x1 = Math.max(x1, p.x); y1 = Math.max(y1, p.y);
          }
        } catch {}
      });
      return Number.isFinite(y0) ? { x: x0, y: y0, width: x1 - x0, height: y1 - y0 } : null;
    } catch { return null; }
    finally { host?.remove(); }
  }
  function measureBitmap(canvas) {
    try {
      const scale = Math.min(1, 1024 / Math.max(canvas.width, canvas.height));
      const probe = document.createElement('canvas');
      probe.width = Math.max(1, Math.round(canvas.width * scale));
      probe.height = Math.max(1, Math.round(canvas.height * scale));
      const ctx = probe.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(canvas, 0, 0, probe.width, probe.height);
      const pixels = ctx.getImageData(0, 0, probe.width, probe.height).data;
      let top = -1, bottom = -1;
      for (let y = 0; y < probe.height && top < 0; y++) {
        for (let x = 0; x < probe.width; x++) if (pixels[(y * probe.width + x) * 4 + 3] > 8) { top = y; break; }
      }
      for (let y = probe.height - 1; y >= 0 && bottom < 0; y--) {
        for (let x = 0; x < probe.width; x++) if (pixels[(y * probe.width + x) * 4 + 3] > 8) { bottom = y; break; }
      }
      return top < 0 || bottom < 0 ? null : { y: top / scale, height: (bottom - top + 1) / scale };
    } catch { return null; }
  }
  function ensureMeasured(sprite) {
    const d = getData(sprite), source = firstFrame(sprite);
    if (!d || !source || d.measureKey === source.key) return;
    const b = source.svg ? measureSvg(source.svg) : measureBitmap(source.canvas);
    if (b) {
      const unitScale = source.res || 1;
      if (d.ground.auto !== false) d.ground.value = (b.y + b.height) / unitScale - Number(source.rc?.y || 0);
      if (d.head.auto !== false) d.head.value = b.y / unitScale - Number(source.rc?.y || 0);
      d.measureKey = source.key;
    }
  }

  function linesFor(d, axis) {
    const out = [];
    if (d.builtins.centre) out.push({ id: 'centre', axis, value: 0, kind: 'builtin' });
    if (axis === 'y' && d.builtins.ground && d.ground.value != null && Number.isFinite(Number(d.ground.value))) out.push({ id: 'ground', axis, value: Number(d.ground.value), kind: 'builtin' });
    if (axis === 'y' && d.builtins.head && d.head.value != null && Number.isFinite(Number(d.head.value))) out.push({ id: 'head', axis, value: Number(d.head.value), kind: 'builtin' });
    if (d.builtins.stage) {
      if (axis === 'x') out.push({ id: 'stage-left', axis, value: -240, kind: 'builtin' }, { id: 'stage-right', axis, value: 240, kind: 'builtin' });
      else out.push({ id: 'stage-top', axis, value: -180, kind: 'builtin' }, { id: 'stage-bottom', axis, value: 180, kind: 'builtin' });
    }
    d.lines.filter(x => x.axis === axis).forEach(x => out.push({ id: x.id, axis, value: x.value, kind: 'user' }));
    return out;
  }
  function nearest(value, axis, d, threshold) {
    let result = value, distance = Math.max(0, Number(threshold) || 0), found = false;
    for (const line of linesFor(d, axis)) {
      const delta = Math.abs(value - line.value);
      if (delta <= distance) { distance = delta; result = line.value; found = true; }
    }
    return found ? result : value;
  }
  const snapEnabled = sprite => !!(getData(sprite)?.snapToGuides && window.GW_V153_VECTOR?.snap);
  function snapAnimationPoint(point, sprite, view, thresholdPx) {
    const s = sprite || activeSprite(), d = getData(s);
    if (!d || !snapEnabled(s) || !point) return point;
    ensureMeasured(s);
    const rc = window.GW_ANIM?.state?.anim?.rc || costumeOf(s)?.rc || { x: 0, y: 0 };
    const scale = Math.max(0.001, Math.abs(view?.getScreenCTM?.()?.a || 1));
    const threshold = (Number(thresholdPx) || 6) / scale;
    return {
      x: nearest(point.x - Number(rc.x || 0), 'x', d, threshold) + Number(rc.x || 0),
      y: nearest(point.y - Number(rc.y || 0), 'y', d, threshold) + Number(rc.y || 0)
    };
  }
  function snapPaintPoint(point, sprite, thresholdPx) {
    const s = sprite || activeSprite(), d = getData(s), c = costumeOf(s);
    if (!d || !c || !snapEnabled(s) || !point) return point;
    const m = window.GW_VECTOR_EDITOR?.mapFor?.(c);
    if (!m || !(m.k > 0)) return point;
    ensureMeasured(s);
    const rc = c.rc || { x: 0, y: 0 };
    const base = ['gwVectorCanvasV15', 'gwBitmapCanvasV15'].map(id => document.getElementById(id)).find(x => x && getComputedStyle(x).display !== 'none');
    const rect = base?.getBoundingClientRect();
    const threshold = (Number(thresholdPx) || 6) * 512 / Math.max(1, rect?.width || 512) / m.k;
    const x = (point.x - m.ox) / m.k - rc.x, y = (point.y - m.oy) / m.k - rc.y;
    return { x: m.ox + (rc.x + nearest(x, 'x', d, threshold)) * m.k, y: m.oy + (rc.y + nearest(y, 'y', d, threshold)) * m.k };
  }

  const el = (tag, attrs) => {
    const node = document.createElementNS(NS, tag);
    Object.entries(attrs || {}).forEach(([k, v]) => node.setAttribute(k, String(v)));
    return node;
  };
  const svgPoint = (svg, e) => {
    const m = svg.getScreenCTM();
    if (!m) return { x: 0, y: 0 };
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
    return { x: p.x, y: p.y };
  };
  function positionLayer(layer, parent, base, key) {
    if (key === 'anim') {
      layer.style.inset = '0'; layer.style.width = '100%'; layer.style.height = '100%';
    } else {
      const pr = parent.getBoundingClientRect(), br = base.getBoundingClientRect();
      layer.style.left = (br.left - pr.left) + 'px'; layer.style.top = (br.top - pr.top) + 'px';
      layer.style.width = br.width + 'px'; layer.style.height = br.height + 'px';
    }
  }
  function drawRulers(svg, ctx) {
    const w = ctx.w, h = ctx.h, ox = ctx.origin.x, oy = ctx.origin.y, sx = ctx.scale.x, sy = ctx.scale.y;
    svg.append(el('rect', { x: 0, y: 0, width: w, height: 18, fill: '#141425', opacity: '.97', 'data-ruler-axis': 'x', 'pointer-events': 'all' }));
    svg.append(el('rect', { x: 0, y: 18, width: 18, height: h - 18, fill: '#141425', opacity: '.97', 'data-ruler-axis': 'y', 'pointer-events': 'all' }));
    const text = (x, y, value, rotate) => {
      const t = el('text', { x, y, fill: '#c4b5fd', 'font-size': 8, 'font-family': 'system-ui,sans-serif', 'pointer-events': 'none' });
      t.textContent = String(value);
      if (rotate) t.setAttribute('transform', 'rotate(-90 ' + x + ' ' + y + ')');
      svg.append(t);
    };
    for (let v = Math.ceil((-ox / sx) / 40) * 40; v <= Math.floor(((w - ox) / sx) / 40) * 40; v += 40) {
      const x = ox + v * sx;
      svg.append(el('line', { x1: x, y1: 0, x2: x, y2: 18, stroke: '#8b5cf6', 'stroke-width': 1, 'pointer-events': 'none' }));
      if (Math.abs(x - ox) > 22) text(x + 2, 8, v, false);
    }
    for (let v = Math.ceil((-oy / sy) / 40) * 40; v <= Math.floor(((h - oy) / sy) / 40) * 40; v += 40) {
      const y = oy + v * sy;
      svg.append(el('line', { x1: 0, y1: y, x2: 18, y2: y, stroke: '#8b5cf6', 'stroke-width': 1, 'pointer-events': 'none' }));
      if (Math.abs(y - oy) > 22) text(14, y - 2, v, true);
    }
  }
  function drawLines(svg, ctx, d, preview) {
    const w = ctx.w, h = ctx.h, ox = ctx.origin.x, oy = ctx.origin.y, sx = ctx.scale.x, sy = ctx.scale.y;
    if (d.builtins.stage) svg.append(el('rect', { x: ox - 240 * sx, y: oy - 180 * sy, width: 480 * sx, height: 360 * sy, fill: 'none', stroke: '#facc15', 'stroke-width': 1.3, 'stroke-dasharray': '4 4', 'pointer-events': 'none' }));
    if (d.builtins.centre) {
      svg.append(el('line', { x1: ox, y1: 18, x2: ox, y2: h, stroke: '#4ade80', 'stroke-width': 1.1, 'stroke-dasharray': '2 5', opacity: '.9', 'pointer-events': 'none' }));
      svg.append(el('line', { x1: 18, y1: oy, x2: w, y2: oy, stroke: '#4ade80', 'stroke-width': 1.1, 'stroke-dasharray': '2 5', opacity: '.9', 'pointer-events': 'none' }));
    }
    const addLine = (axis, value, id, kind, temporary) => {
      const v = temporary ? preview.value : value;
      const common = axis === 'x'
        ? { x1: ox + v * sx, y1: 18, x2: ox + v * sx, y2: h }
        : { x1: 18, y1: oy + v * sy, x2: w, y2: oy + v * sy };
      const color = kind === 'builtin' ? '#4ade80' : '#8b5cf6';
      svg.append(el('line', { ...common, stroke: color, 'stroke-width': 1.4, 'stroke-dasharray': kind === 'builtin' ? '3 4' : '6 4', opacity: kind === 'builtin' ? '.8' : '.95', 'pointer-events': kind === 'user' ? 'stroke' : 'none', 'data-guide-id': kind === 'user' ? id : '', 'data-guide-axis': axis }));
      if (kind === 'user') svg.append(el('line', { ...common, stroke: 'transparent', 'stroke-width': 12, 'pointer-events': 'stroke', 'data-guide-id': id, 'data-guide-axis': axis }));
    };
    if (d.builtins.ground && d.ground.value != null && Number.isFinite(Number(d.ground.value))) addLine('y', Number(d.ground.value), 'ground', 'builtin', false);
    if (d.builtins.head && d.head.value != null && Number.isFinite(Number(d.head.value))) addLine('y', Number(d.head.value), 'head', 'builtin', false);
    d.lines.forEach(g => addLine(g.axis, g.value, g.id, 'user', preview?.id === g.id));
    if (preview && !preview.id) addLine(preview.axis, preview.value, 'preview', 'user', true);
  }
  function mountPanel(layer, sprite) {
    let button = layer.querySelector('[data-gwag-toggle]'), panel = layer.querySelector('[data-gwag-panel]');
    if (!button) {
      button = document.createElement('button'); button.type = 'button'; button.dataset.gwagToggle = '1'; button.textContent = 'Guides';
      button.style.cssText = 'position:absolute;right:22px;top:20px;z-index:3;pointer-events:auto;background:#141425;color:#ececf6;border:1px solid #8b5cf6;border-radius:6px;padding:4px 8px;font:700 11px system-ui;cursor:pointer';
      layer.append(button); button.addEventListener('click', () => { panel.style.display = panel.style.display === 'none' ? 'block' : 'none'; });
    }
    if (!panel) {
      panel = document.createElement('div'); panel.dataset.gwagPanel = '1';
      panel.style.cssText = 'display:none;position:absolute;right:22px;top:48px;z-index:4;pointer-events:auto;min-width:150px;padding:8px;border:1px solid #8b5cf6;border-radius:8px;background:#0b0b14;color:#ececf6;box-shadow:0 8px 24px #0009;font:11px system-ui';
      layer.append(panel);
      const addCheck = (key, label, get, set) => {
        const row = document.createElement('label'); row.style.cssText = 'display:flex;align-items:center;gap:6px;padding:3px 0;cursor:pointer';
        const input = document.createElement('input'); input.type = 'checkbox'; input.dataset.gwagCheck = key; input.style.accentColor = '#8b5cf6';
        input.addEventListener('change', () => { const current = mounted.get(layer.dataset.gwagLayer)?.sprite || activeSprite() || sprite; const d = getData(current); set(d, input.checked); renderAll(); });
        row.append(input, document.createTextNode(label)); panel.append(row);
      };
      addCheck('centre', 'Centre cross', d => d.builtins.centre, (d, v) => d.builtins.centre = v);
      addCheck('ground', 'Ground line', d => d.builtins.ground, (d, v) => d.builtins.ground = v);
      addCheck('head', 'Head line', d => d.builtins.head, (d, v) => d.builtins.head = v);
      addCheck('stage', '480 × 360 stage', d => d.builtins.stage, (d, v) => d.builtins.stage = v);
      addCheck('snap', 'Snap to guides (with Snap)', d => d.snapToGuides, (d, v) => d.snapToGuides = v);
      addCheck('lock', 'Lock guides', d => d.locked, (d, v) => d.locked = v);
      const hint = document.createElement('div'); hint.textContent = 'Drag from a ruler to add. Drag a guide back to its ruler to remove. Double-click a guide for an exact value.';
      hint.style.cssText = 'color:#a5b4fc;line-height:1.35;margin-top:6px;max-width:190px'; panel.append(hint);
    }
    const d = getData(sprite);
    panel.querySelectorAll('[data-gwag-check]').forEach(input => {
      const k = input.dataset.gwagCheck;
      input.checked = k === 'snap' ? d.snapToGuides : k === 'lock' ? d.locked : !!d.builtins[k];
    });
  }
  function numberEditor(layer, x, y, guide) {
    layer.querySelector('[data-gwag-number]')?.remove();
    const input = document.createElement('input'); input.type = 'number'; input.step = 'any'; input.value = String(guide.value);
    input.dataset.gwagNumber = '1'; input.setAttribute('aria-label', 'Guide position in stage pixels');
    input.style.cssText = 'position:absolute;z-index:8;left:' + clamp(x, 20, 420) + 'px;top:' + clamp(y, 20, 330) + 'px;width:86px;padding:4px;border:1px solid #8b5cf6;border-radius:5px;background:#0b0b14;color:#fff;pointer-events:auto;font:12px system-ui';
    layer.append(input); input.focus(); input.select();
    let finished = false;
    const finish = save => {
      if (finished) return; finished = true;
      const value = Number(input.value); input.remove();
      if (save && Number.isFinite(value)) {
        guide.value = value;
        if (guide.id === 'ground') { const d = getData(activeSprite()); d.ground.auto = false; }
        if (guide.id === 'head') { const d = getData(activeSprite()); d.head.auto = false; }
        renderAll();
      }
    };
    input.addEventListener('keydown', e => { if (e.key === 'Enter') finish(true); if (e.key === 'Escape') finish(false); });
    input.addEventListener('blur', () => finish(true));
  }
  function bindEvents(surface) {
    const svg = surface.svg;
    if (svg.dataset.gwagBound === '1') return;
    svg.dataset.gwagBound = '1';
    let drag = null;
    const stagePoint = p => ({ x: (p.x - surface.context.origin.x) / surface.context.scale.x, y: (p.y - surface.context.origin.y) / surface.context.scale.y });
    svg.addEventListener('pointerdown', e => {
      const sprite = surface.sprite, d = getData(sprite);
      if (d.locked) return;
      const axis = e.target.getAttribute('data-ruler-axis'), id = e.target.getAttribute('data-guide-id');
      if (!axis && !id) return;
      e.preventDefault(); e.stopPropagation();
      const p = svgPoint(svg, e), q = stagePoint(p);
      if (id && !d.lines.some(g => g.id === id)) return;
      drag = id ? { kind: 'move', id, axis: e.target.getAttribute('data-guide-axis'), value: q[e.target.getAttribute('data-guide-axis')] } : { kind: 'new', axis, value: q[axis] };
      svg.setPointerCapture?.(e.pointerId);
    }, true);
    svg.addEventListener('pointermove', e => {
      if (!drag) return;
      const q = stagePoint(svgPoint(svg, e)); drag.value = q[drag.axis];
      renderSurface(surface.info, { id: drag.id, axis: drag.axis, value: drag.value }, true);
    }, true);
    const end = e => {
      if (!drag) return;
      const p = svgPoint(svg, e), d = getData(surface.sprite), onRuler = drag.axis === 'x' ? p.y <= 18 : p.x <= 18;
      if (drag.kind === 'new') {
        if (!onRuler && p.x > 18 && p.y > 18) d.lines.push({ id: 'g' + Math.random().toString(36).slice(2, 9), axis: drag.axis, value: drag.value });
      } else {
        const item = d.lines.find(g => g.id === drag.id);
        if (onRuler) d.lines = d.lines.filter(g => g.id !== drag.id);
        else if (item) item.value = drag.value;
      }
      drag = null; surface.preview = null; renderAll();
    };
    svg.addEventListener('pointerup', end, true);
    svg.addEventListener('pointercancel', () => { drag = null; surface.preview = null; renderAll(); }, true);
    svg.addEventListener('dblclick', e => {
      const id = e.target.getAttribute('data-guide-id'), d = getData(surface.sprite);
      if (!id || d.locked) return;
      const guide = d.lines.find(g => g.id === id); if (!guide) return;
      e.preventDefault(); e.stopPropagation();
      const p = svgPoint(svg, e), rect = surface.layer.getBoundingClientRect();
      numberEditor(surface.layer, e.clientX - rect.left, e.clientY - rect.top, guide);
    }, true);
  }

  const mounted = new Map();
  function renderSurface(info, preview, force) {
    if (!info?.parent || !info.base || !info.sprite) return;
    ensureMeasured(info.sprite);
    let surface = mounted.get(info.key);
    if (!surface || !surface.layer.isConnected || surface.parent !== info.parent) {
      const layer = document.createElement('div'); layer.dataset.gwagLayer = info.key;
      layer.style.cssText = 'position:absolute;z-index:20;pointer-events:none;overflow:visible';
      info.parent.append(layer);
      const svg = el('svg', { 'aria-hidden': 'true', width: '100%', height: '100%' });
      svg.style.cssText = 'display:block;width:100%;height:100%;overflow:visible;pointer-events:none';
      layer.append(svg);
      surface = { key: info.key, parent: info.parent, layer, svg, info, sprite: info.sprite, context: info.context };
      mounted.set(info.key, surface);
      if (info.rulers) bindEvents(surface);
    }
    surface.info = info; surface.sprite = info.sprite; surface.context = info.context;
    if (preview === undefined) preview = surface.preview || null;
    else surface.preview = preview;
    positionLayer(surface.layer, info.parent, info.base, info.key);
    surface.svg.setAttribute('viewBox', info.viewBox); surface.svg.setAttribute('preserveAspectRatio', info.preserve || 'none');
    const d = getData(info.sprite), sig = JSON.stringify([info.viewBox, info.context, d, preview || null]);
    if (!force && surface.sig === sig) { if (info.key !== 'flip') mountPanel(surface.layer, info.sprite); return; }
    surface.sig = sig; surface.svg.textContent = '';
    if (info.rulers) drawRulers(surface.svg, info.context);
    drawLines(surface.svg, info.context, d, preview);
    if (info.key !== 'flip') mountPanel(surface.layer, info.sprite);
  }
  function paintSurface() {
    const parent = document.getElementById('gwCostumeCanvasWrapV15');
    const base = ['gwVectorCanvasV15', 'gwBitmapCanvasV15'].map(id => document.getElementById(id)).find(x => x && getComputedStyle(x).display !== 'none');
    const s = activeSprite(), c = costumeOf(s), map = window.GW_VECTOR_EDITOR?.mapFor;
    if (!parent || !base || !s || !c || typeof map !== 'function') return null;
    const m = map.call(window.GW_VECTOR_EDITOR, c); if (!m || !(m.k > 0)) return null;
    const rc = c.rc || { x: 0, y: 0 };
    return { key: 'paint', parent, base, viewBox: '0 0 512 384', preserve: 'none', rulers: true, sprite: s,
      context: { w: 512, h: 384, origin: { x: m.ox + rc.x * m.k, y: m.oy + rc.y * m.k }, scale: { x: m.k, y: m.k } } };
  }
  function animationSurface() {
    const st = window.GW_ANIM?.state, parent = document.getElementById('gw18View'), base = document.querySelector('#gw18Anim #gw18Svg');
    if (!st?.anim || !st.s || !parent || !base) return null;
    const viewBox = (base.getAttribute('viewBox') || '0 0 480 360').trim(), n = viewBox.split(/[ ,]+/).map(Number);
    if (n.length !== 4 || n.some(x => !Number.isFinite(x))) return null;
    const rc = st.anim.rc || { x: 0, y: 0 };
    return { key: 'anim', parent, base, viewBox, preserve: base.getAttribute('preserveAspectRatio') || 'xMidYMid meet', rulers: true, sprite: st.s,
      context: { w: n[2], h: n[3], origin: { x: rc.x, y: rc.y }, scale: { x: 1, y: 1 } } };
  }
  function flipbookSurface() {
    const parent = document.getElementById('gwFlipbook'), base = document.getElementById('gwFlipCanvas'), P = window.GW_FLIPBOOK?.state, s = activeSprite();
    if (!parent || !base || !P?.box || !P.frames?.length || !s) return null;
    const B = P.box, k = Math.min((base.width - 16) / B.w, (base.height - 16) / B.h);
    const ox = (base.width - B.w * k) / 2 - B.x0 * k, oy = (base.height - B.h * k) / 2 - B.y0 * k;
    return { key: 'flip', parent, base, viewBox: '0 0 ' + base.width + ' ' + base.height, preserve: 'none', rulers: false, sprite: s,
      context: { w: base.width, h: base.height, origin: { x: ox, y: oy }, scale: { x: k, y: k } } };
  }
  function renderAll() {
    const p = paintSurface(), a = animationSurface(), f = flipbookSurface();
    if (p) renderSurface(p); else { mounted.get('paint')?.layer.remove(); mounted.delete('paint'); }
    if (a) renderSurface(a); else { mounted.get('anim')?.layer.remove(); mounted.delete('anim'); }
    if (f) renderSurface(f); else { mounted.get('flip')?.layer.remove(); mounted.delete('flip'); }
  }

  let timer = 0, observer = null, changeHandler = null;
  function relevantMutation(records) {
    return records.some(r => {
      const t = r.target;
      if (t?.closest?.('[data-gwag-layer]')) return false;
      return ['gwCostumeCanvasWrapV15', 'gwCostumeStudio', 'gw18Anim', 'gw18View', 'gwFlipbook', 'gwSpriteList'].includes(t?.id) ||
        t?.querySelector?.('#gwCostumeCanvasWrapV15,#gw18Anim,#gw18View,#gwFlipbook,#gwSpriteList');
    });
  }
  function boot() {
    renderAll();
    timer = window.setInterval(renderAll, 500);
    if (window.MutationObserver && document.body) {
      observer = new MutationObserver(records => { if (relevantMutation(records)) renderAll(); });
      observer.observe(document.body, { childList: true, subtree: true });
    }
    window.addEventListener('resize', renderAll);
    changeHandler = e => { if (e.target?.closest?.('#gw18Anim,#gwCostumeStudio')) renderAll(); };
    document.addEventListener('change', changeHandler, true);
  }
  const api = {
    version: VERSION, getData, serializeSprite, restoreSprite, refresh: renderAll,
    invalidateMeasurements(sprite = activeSprite()) { const d = getData(sprite); if (d) d.measureKey = ''; const live = window.GW_ANIM?.state; if (live?.s === sprite && live.anim) frameSvgCache.delete(live.anim); (sprite?.gwAnimations || []).forEach(a => frameSvgCache.delete(a)); },
    snapEnabled, snapPaintPoint, snapAnimationPoint,
    dispose() {
      if (timer) clearInterval(timer);
      observer?.disconnect();
      mounted.forEach(x => x.layer?.remove()); mounted.clear();
      window.removeEventListener('resize', renderAll);
      if (changeHandler) document.removeEventListener('change', changeHandler, true);
    },
    state: { mounted }
  };
  window.GW_ANIM_GUIDES = api;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
