/* v15.60.2 (Claude, speed while a project runs): G-Warp has ~100 editor helpers that poll the page with setInterval or
   react to every DOM change with a MutationObserver. While a project is running they fire constantly (every block glow,
   monitor update and HUD change is a DOM change) and ate ~60% of the CPU: a pen 3D game ran 4 FPS in G-Warp vs 30 in
   Scratch. While Engine.isRunning, editor helpers now run at most every RUN_MS; the engine itself (requestAnimationFrame),
   timers made with setTimeout, and anything marked fn.gwRunCritical = true are untouched. Turn off: window.GW_RUN_THROTTLE = false */
(() => {
  const RUN_MS = 5000;
  const running = () => window.GW_RUN_THROTTLE !== false && (window.Engine && window.Engine.isRunning && !window.Engine.isPaused);
  /* 22 Nov (Claude, speed while idle): the editor's own helpers (in app.html, polling every 0.3-1 s) used about half the CPU
     on a big project even when nobody touched anything. When there was no click, key or wheel for 2 s they now run at most
     every IDLE_MS; any input brings them back at once. Network helpers (LAN, AI, other files) and fast timers (< 300 ms,
     progress bars, animations) are never slowed. Turn off: window.GW_IDLE_THROTTLE = false */
  const IDLE_MS = 2000; let lastInput = performance.now();
  ['pointerdown', 'pointermove', 'keydown', 'wheel', 'input', 'click', 'dragover', 'drop'].forEach(t => addEventListener(t, () => { lastInput = performance.now(); }, { capture: true, passive: true }));
  // a change made by code (project opened, extension added, G-Spark built blocks, LAN Live edit) also wakes the helpers
  const wake = () => { lastInput = performance.now(); };
  try { const SP = Storage.prototype, set = SP.setItem; SP.setItem = function (k, v) { wake(); return set.call(this, k, v); }; } catch (e) {} // a setting changed by code
  window.GW_WAKE_HELPERS = wake;
  const watch = (n = 0) => { const els = ['workspaceCanvas', 'paletteContainer', 'gwCategoryRail'].map(id => document.getElementById(id)).filter(Boolean); if (els.length < 2) return n < 400 && setTimeout(() => watch(n + 1), 50); try { const mo = new MO(recs => { for (const r of recs) if (r.addedNodes.length || r.removedNodes.length) { wake(); break; } }); els.forEach(el => mo.observe(el, { childList: true, subtree: true })); } catch (e) {} };
  const idle = () => window.GW_IDLE_THROTTLE !== false && performance.now() - lastInput > 2000;
  const fromApp = () => { try { const st = String(new Error().stack || '').split('\n').slice(2).find(l => !/gw-run-throttle/.test(l)) || ''; return /app\.html|gw-perf\.js/.test(st); } catch (e) { return false; } };
  const si = window.setInterval.bind(window);
  /* v15.70.10 (Claude, steady 30 FPS, measured on the owner's own project): while a project runs every helper waited the same 5 s, so
     they all woke in the same moment: a 180 ms freeze every 5 seconds. Now the helpers share a small allowance (BUDGET ms of work per
     WINDOW ms); a helper that finds the allowance used up simply tries again at its next turn, so they come one after another.
     To see which helpers are slow: window.GW_HELPER_LOG = []  (it then collects [ms, where it was made] for every helper over 8 ms). */
  const WINDOW = 250, BUDGET = 5; let winAt = 0, used = 0;
  const room = now => { if (now - winAt > WINDOW) { winAt = now; used = 0; } return used < BUDGET; };
  const timed = (fn, self, args, where) => { const t = performance.now(); try { return fn.apply(self, args); } finally { const d = performance.now() - t; used += d; const L = window.GW_HELPER_LOG; if (d > 8 && Array.isArray(L) && L.length < 500) L.push([Math.round(d), where]); } };
  const madeAt = () => { try { return (String(new Error().stack || '').split('\n').slice(2).find(l => !/gw-run-throttle/.test(l)) || '').trim().replace(/^at /, '').replace(/.*\//, '').slice(0, 60); } catch (e) { return ''; } };
  window.setInterval = function (fn, ms, ...args) {
    if (typeof fn !== 'function' || fn.gwRunCritical) return si(fn, ms, ...args);
    let last = 0, lastIdle = 0; const ui = (ms || 0) >= 300 && (ms || 0) <= 2000 && fromApp(), where = madeAt();
    return si(function () {
      const now = performance.now();
      if (running()) { if (now - last < Math.max(RUN_MS, ms || 0)) return; if (!room(now)) return; last = now; return timed(fn, this, args, where); }
      else if (ui && idle()) { if (now - lastIdle < IDLE_MS) return; lastIdle = now; }
      return fn.apply(this, args);
    }, ms);
  };
  const MO = window.MutationObserver; watch();
  window.MutationObserver = class extends MO {
    constructor(cb) {
      if (cb && cb.gwRunCritical) { super(cb); return; }
      let pending = null, queued = [];
      super(function (recs, obs) {
        if (!running() || obs.__gwCrit) return cb.call(this, recs, obs);
        queued.push(...recs); if (queued.length > 2000) queued = queued.slice(-2000);
        if (pending) return;
        const fire = () => { if (running() && !room(performance.now())) { pending = setTimeout(fire, 120); return; } pending = null; const r = queued; queued = []; try { timed(cb, obs, [r, obs], 'observer'); } catch (e) { console.warn(e); } };
        pending = setTimeout(fire, RUN_MS);
      });
    }
    observe(target, opts) {               // libraries (JSZip, promises polyfills) use a detached node as a fast timer: never delay those
      if (!target || !target.isConnected) this.__gwCrit = true;
      return super.observe(target, opts);
    }
  };
})();
