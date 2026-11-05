/* gw-perf.js - G-Warp speed / performance add-on. OWNER: Buffy (Freebuff helper), given by the owner on 3 Nov 2026.
   app.html loads this file after everything else. Patch the engine from here (wrap functions on window.Engine etc.),
   so Claude (app.html) and Buffy (this file) never edit the same file. Every change: a comment with date + what + measured FPS before/after.
   Kill switch: localStorage 'gwarp-off-perf' = '1' turns this whole file off. */
(()=>{try{if(localStorage.getItem('gwarp-off-perf')==='1')return;}catch(e){}
  window.GW_PERF={version:'0.1 (empty start)'};
})();
