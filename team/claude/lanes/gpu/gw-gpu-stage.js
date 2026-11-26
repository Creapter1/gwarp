/* G-Warp GPU stage (lane B), version 0.1.1 — own code.
   Draws backdrop colour/image, pen layer, and sprites (costume, rotation centre, rotation style,
   size, ghost, colour, brightness, whirl, fisheye, pixelate, mosaic) with WebGL, in the order given.
   Costume pictures are uploaded once and kept in video memory (WeakMap per canvas).
   Usage:  const gpu = GWGpuStage.create(glCanvas)   // null when WebGL is not available -> keep the 2D way
           gpu.draw({ bg:'#fff', bgImage, bgBox, pen: penCanvas, penDirty: true, view: [a,b,c,d,e,f] | null,
                      sprites: [{ canvas, box:{x0,y0,w,h}, x, y, size, direction, rotationStyle, ghost, effects }] })
           gpu.invalidate(canvas)  // after a costume picture was edited
           gpu.readPixels()        // Uint8Array RGBA, top row first (tests)
*/
(function (root) {
  'use strict';
  const VS = `attribute vec2 aP;uniform mat3 uM;varying vec2 vUv;
void main(){vUv=aP;vec3 p=uM*vec3(aP,1.0);gl_Position=vec4(p.x/240.0-1.0,1.0-p.y/180.0,0.0,1.0);}`;
  const FS = `precision highp float;varying vec2 vUv;uniform sampler2D uT;
uniform float uAlpha,uColor,uBright,uWhirl,uFish,uMos;uniform vec2 uPix;uniform vec4 uFill;uniform float uUseFill;
vec3 hsv2rgb(float h,float s,float v){float k=h*6.0;float i=floor(k);float f=k-i;float p=v*(1.0-s),q=v*(1.0-s*f),t=v*(1.0-s*(1.0-f));
 i=mod(i,6.0);if(i<0.5)return vec3(v,t,p);if(i<1.5)return vec3(q,v,p);if(i<2.5)return vec3(p,v,t);if(i<3.5)return vec3(p,q,v);if(i<4.5)return vec3(t,p,v);return vec3(v,p,q);}
void main(){
 if(uUseFill>0.5){gl_FragColor=vec4(uFill.rgb*uFill.a,uFill.a);return;}
 vec2 uv=vUv;
 if(uMos>0.0)uv=fract(uv*uMos);
 if(uPix.x>0.0)uv=(floor(uv*uPix)+0.5)/uPix;
 if(uWhirl!=0.0){vec2 o=uv-0.5;float f=max(1.0-length(o)/0.5,0.0);float a=uWhirl*f*f;float s=sin(a),c=cos(a);uv=vec2(c*o.x+s*o.y,-s*o.x+c*o.y)+0.5;}
 if(uFish>0.0){vec2 v=(uv-0.5)/0.5;float l=length(v);if(l>0.0){float r=pow(min(l,1.0),uFish)*max(1.0,l);uv=0.5+r*v/l*0.5;}}
 if(uv.x<0.0||uv.x>=1.0||uv.y<0.0||uv.y>=1.0)discard;
 vec4 c=texture2D(uT,uv);if(c.a<=0.0)discard;
 vec3 rgb=c.rgb/c.a;
 if(uColor!=0.0){float mx=max(rgb.r,max(rgb.g,rgb.b)),mn=min(rgb.r,min(rgb.g,rgb.b)),d=mx-mn;float v=mx,s=mx>0.0?d/mx:0.0,h=0.0;
  if(d>0.0){if(mx==rgb.r)h=(rgb.g-rgb.b)/d+(rgb.g<rgb.b?6.0:0.0);else if(mx==rgb.g)h=(rgb.b-rgb.r)/d+2.0;else h=(rgb.r-rgb.g)/d+4.0;h/=6.0;}
  if(v<0.055){h=0.0;s=1.0;v=0.055;}else if(s<0.09){h=0.0;s=0.09;}
  rgb=hsv2rgb(fract(h+uColor),s,v);}
 rgb=clamp(rgb+uBright,0.0,1.0);
 float a=c.a*uAlpha;gl_FragColor=vec4(rgb*a,a);}`;
  const DEG = Math.PI / 180;
  const num = v => Number(v) || 0;
  function parseColor(css) {
    const c = document.createElement('canvas').getContext('2d'); c.fillStyle = '#fff'; c.fillStyle = css || '#fff';
    const s = c.fillStyle; if (s[0] === '#') return [1, 3, 5].map(i => parseInt(s.slice(i, i + 2), 16) / 255).concat(1);
    const m = s.match(/[\d.]+/g).map(Number); return [m[0] / 255, m[1] / 255, m[2] / 255, m[3] ?? 1];
  }
  // 2D affine [a,b,c,d,e,f] like canvas setTransform
  const mul = (m, n) => [m[0] * n[0] + m[2] * n[1], m[1] * n[0] + m[3] * n[1], m[0] * n[2] + m[2] * n[3], m[1] * n[2] + m[3] * n[3], m[0] * n[4] + m[2] * n[5] + m[4], m[1] * n[4] + m[3] * n[5] + m[5]];
  function spriteMatrix(s) {
    const st = s.rotationStyle || 'all around', sc = num(s.size ?? 100) / 100, dir = num(s.direction ?? 90);
    let m = [1, 0, 0, 1, 240 + num(s.x), 180 - num(s.y)];
    if (st === 'left-right' && (((dir % 360) + 360) % 360) > 180) m = mul(m, [-1, 0, 0, 1, 0, 0]);
    else if (st === 'all around') { const a = (dir - 90) * DEG, c = Math.cos(a), n = Math.sin(a); m = mul(m, [c, n, -n, c, 0, 0]); }
    m = mul(m, [sc, 0, 0, sc, 0, 0]);
    const b = s.box || { x0: -40, y0: -40, w: 80, h: 80 };
    return mul(m, [b.w, 0, 0, b.h, b.x0, b.y0]); // unit square -> costume box
  }
  function create(canvas, opts) {
    const o = { alpha: true, premultipliedAlpha: true, antialias: false, preserveDrawingBuffer: !!(opts && opts.keep) };
    const gl = canvas.getContext('webgl2', o) || canvas.getContext('webgl', o);
    if (!gl) return null;
    const sh = (t, src) => { const s = gl.createShader(t); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; };
    const pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return null;
    gl.useProgram(pr);
    const U = {}; ['uM', 'uT', 'uAlpha', 'uColor', 'uBright', 'uWhirl', 'uFish', 'uMos', 'uPix', 'uFill', 'uUseFill'].forEach(n => U[n] = gl.getUniformLocation(pr, n));
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), gl.STATIC_DRAW);
    const aP = gl.getAttribLocation(pr, 'aP'); gl.enableVertexAttribArray(aP); gl.vertexAttribPointer(aP, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA); gl.uniform1i(U.uT, 0);
    let texs = new WeakMap(); const colorCache = new Map();
    function texFor(src, force) {
      let e = texs.get(src);
      if (e && !force && e.w === src.width && e.h === src.height) return e.t;
      if (!e) { e = { t: gl.createTexture() }; texs.set(src, e); }
      gl.bindTexture(gl.TEXTURE_2D, e.t);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
      [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T].forEach(p => gl.texParameteri(gl.TEXTURE_2D, p, gl.CLAMP_TO_EDGE));
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      e.w = src.width; e.h = src.height; return e.t;
    }
    let view = null, lastFx = null, lastA = null, lastT = null;
    gl.uniform1f(U.uUseFill, 0);
    function quad(m, alpha, fx, pixUnits) {
      if (view) m = mul(view, m);
      gl.uniformMatrix3fv(U.uM, false, [m[0], m[1], 0, m[2], m[3], 0, m[4], m[5], 1]);
      if (alpha !== lastA) { gl.uniform1f(U.uAlpha, alpha); lastA = alpha; }
      const f = fx || {}, col = Math.round(num(f.color)), br = Math.round(num(f.brightness)), wh = Math.round(num(f.whirl)), fe = Math.round(num(f.fisheye)), px = Math.round(num(f.pixelate)), mo = Math.round(num(f.mosaic));
      const p = px ? Math.abs(px) / 10 : 0, key = col + ',' + br + ',' + wh + ',' + fe + ',' + mo + ',' + (p ? pixUnits[0] + ',' + pixUnits[1] + ',' + p : 0);
      if (key !== lastFx) { lastFx = key;
      gl.uniform1f(U.uColor, (((col % 200) + 200) % 200) / 200);
      gl.uniform1f(U.uBright, Math.max(-100, Math.min(100, br)) / 100);
      gl.uniform1f(U.uWhirl, wh ? -wh * DEG : 0);
      gl.uniform1f(U.uFish, fe ? Math.max(0, (fe + 100) / 100) : 0);
      gl.uniform1f(U.uMos, mo ? Math.max(1, Math.min(512, Math.round((Math.abs(mo) + 10) / 10))) : 0);
      gl.uniform2f(U.uPix, p ? pixUnits[0] / p : 0, p ? pixUnits[1] / p : 0); }
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    const api = {
      gl, canvas,
      invalidate(src) { const e = texs.get(src); if (e) { gl.deleteTexture(e.t); texs.delete(src); } },
      reset() { texs = new WeakMap(); },
      draw(f) {
        gl.viewport(0, 0, canvas.width, canvas.height);
        let bg = colorCache.get(f.bg || '#fff'); if (!bg) { bg = parseColor(f.bg); colorCache.set(f.bg || '#fff', bg); }
        gl.clearColor(bg[0] * bg[3], bg[1] * bg[3], bg[2] * bg[3], bg[3]); gl.clear(gl.COLOR_BUFFER_BIT);
        view = f.view || null; lastT = null;
        if (f.bgImage) { const b = f.bgBox || { x0: 0, y0: 0, w: 480, h: 360 }; gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, texFor(f.bgImage)); quad([b.w, 0, 0, b.h, b.x0, b.y0], 1, null); }
        if (f.pen) { gl.bindTexture(gl.TEXTURE_2D, texFor(f.pen, f.penDirty !== false)); quad([480, 0, 0, 360, 0, 0], 1, null); }
        for (const s of f.sprites || []) {
          if (!s.canvas || s.visible === false) continue;
          const a = Math.max(0, 1 - num(s.ghost) / 100); if (a <= 0) continue;
          const t = texFor(s.canvas); if (t !== lastT) { gl.bindTexture(gl.TEXTURE_2D, t); lastT = t; }
          const b = s.box || { w: 80, h: 80 };
          quad(spriteMatrix(s), a, s.effects, [b.w, b.h]);
        }
        view = null;
      },
      readPixels() {
        const w = canvas.width, h = canvas.height, d = new Uint8Array(w * h * 4); gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, d);
        const out = new Uint8Array(d.length), row = w * 4; for (let y = 0; y < h; y++) out.set(d.subarray((h - 1 - y) * row, (h - y) * row), y * row); return out;
      }
    };
    return api;
  }
  /* Builds a draw() frame from G-Warp's Engine (for lane A). */
  function frameFromEngine(GW, Engine, pen) {
    const bd = Engine.backdrops && Engine.backdrops[Engine.activeBackdrop];
    const order = GW.drawOrder ? GW.drawOrder() : Engine.sprites;
    const sprites = [];
    for (const s of order) {
      if (!s.visible || (GW.onScreen && !GW.onScreen(s))) continue;
      const c = s.costumes && s.costumes[s.activeCostume]; if (!c || !c.canvas) continue;
      sprites.push({ canvas: c.canvas, box: GW.costumeBox ? GW.costumeBox(c) : null, x: s.x, y: s.y, size: s.size, direction: s.direction, rotationStyle: s.rotationStyle, ghost: s.ghost, effects: s.effects });
    }
    return { bg: (bd && bd.color) || '#fff', sprites, pen };
  }
  root.GWGpuStage = { version: '0.1.1', create, frameFromEngine, spriteMatrix };
})(typeof window !== 'undefined' ? window : globalThis);
