<script id="gw-v4900-gwrap-pack">
(() => {
  'use strict';
  /* G-Warp v15.49.0 - GWrap AI knowledge pack loader (written by Claude; owner: "add at least 300 questions and
     possibilities to the chat"). Recipes and tips are plain JSON (format: team/GEMINI-GWRAP-AI-300-2026-10-19.txt),
     so the team can write hundreds without touching code. This turns each recipe's JSON script into real blocks with
     the helper's own builders (GW_V1571.blk / cblk / nestInto) and adds recipes + tips to the GWrap AI helper. */
  const PACKS = [/*PACK-DATA*/];
  const by = id => document.getElementById(id);
  const E = () => window.Engine || {};
  function other() { const e = E(), i = e.activeSpriteIndex || 0; return (e.sprites || []).find((s, k) => k !== i && !s.isClone)?.name || 'mouse-pointer'; }
  const fix = v => (v === 'OTHER_SPRITE' ? other() : v);
  const fixNode = n => JSON.parse(JSON.stringify(n || null), (k, v) => (v === 'OTHER_SPRITE' ? other() : v));
  function setCond(b, node) { const slot = b.querySelector('.gw-input-slot[data-slot-kind="boolean"]'); if (slot && node && window.GW9?.setSlotNode) window.GW9.setSlotNode(slot, fixNode(node)); }
  function ownInputs(b) { return [...b.querySelectorAll('.block-input')].filter(i => (!i.closest('.block-c-body') && !i.closest('.gw-input-slot')) || i.dataset.slotProxy === '1'); }
  function make(A, spec) {
    if (!Array.isArray(spec) || typeof spec[0] !== 'string') throw new Error('bad block ' + JSON.stringify(spec));
    const [type, inputs = [], menus = [], x = {}] = spec;
    const lits = inputs.map(v => (v && typeof v === 'object') ? '' : String(v));
    const ms = menus.map(fix);
    let b;
    if (type === 'if_else') {
      b = A.blk('if_else', lits, ms);
      const bodies = b.querySelectorAll(':scope > .block-c-body');
      (x.body || []).forEach(s => bodies[0]?.appendChild(make(A, s)));
      (x.else || []).forEach(s => (b.querySelector(':scope > .block-c-else') || bodies[1])?.appendChild(make(A, s)));
      setCond(b, x.cond);
    } else if (x.body || ['forever', 'repeat', 'if', 'repeat_until'].includes(type)) {
      b = A.cblk(type, (x.body || []).map(s => make(A, s)), lits, x.cond ? fixNode(x.cond) : null);
      if (ms.length) b.querySelectorAll(':scope > .block-c-header .block-select, :scope > .block-select').forEach((sel, i) => { if (ms[i] != null) { if (![...sel.options].some(o => o.value === ms[i])) sel.add(new Option(ms[i], ms[i])); sel.value = ms[i]; } });
    } else {
      b = A.blk(type, lits, ms);
      if (x.cond) setCond(b, x.cond);
    }
    inputs.forEach((v, i) => { if (v && typeof v === 'object' && Array.isArray(v.r)) { const inp = ownInputs(b)[i]; if (inp) A.nestInto(inp, make(A, v.r)); } });
    return b;
  }
  const ACT = {
    code: ['Open Code', () => by('gwMainTabCode')?.click()],
    costumes: ['Open Costumes', () => by('gwMainTabCostumes')?.click()],
    sounds: ['Open Sounds', () => by('gwMainTabSounds')?.click()],
    song: ['Open Song maker', () => { by('gwMainTabSounds')?.click(); setTimeout(() => { try { window.GW_V1570_STUDIO?.showPane?.('song'); } catch {} }, 120); }],
    animation: ['Open Animation', () => { by('gwMainTabCostumes')?.click(); setTimeout(() => window.GW_COSTABS?.choose?.('animation'), 150); }],
    tiles: ['Open Tiles', () => { by('gwMainTabCostumes')?.click(); setTimeout(() => window.GW_COSTABS?.choose?.('tiles'), 150); }],
    backdrops: ['Choose a Backdrop', () => window.GW_BACKDROP_LIBRARY?.open?.()],
    undo: ['Undo now', () => { try { window.GW8?.undo?.(); } catch {} }]
  };
  const words = a => (Array.isArray(a) ? a : []).map(w => String(w).toLowerCase().trim()).filter(Boolean);
  function install(pack) {
    const A = window.GW_V1571; if (!A?.blk || !pack) return { recipes: 0, tips: 0 };
    const have = new Set([...A.recipes.map(r => r.id), ...A.tips.map(t => t.id)]); let nr = 0, nt = 0;
    (pack.recipes || []).forEach(r => {
      if (!r || !r.id || have.has(r.id) || !Array.isArray(r.script)) return; have.add(r.id);
      A.recipes.push({ id: r.id, emoji: r.emoji || '✨', title: String(r.title || r.id), keys: words(r.keys), q: words(r.q), steps: (r.steps || []).map(String),
        prep: () => { try { (r.prep?.vars || []).forEach(v => { if (!Object.prototype.hasOwnProperty.call(E().variables || {}, v)) window.GW?.createVariable?.(v); });
          (r.prep?.lists || []).forEach(l => { if (!Object.prototype.hasOwnProperty.call(E().lists || {}, l)) window.GW?.createList?.(l); }); } catch {} },
        build: () => r.script.map(stack => stack.map(s => make(A, s))), pack: true });
      nr++;
    });
    (pack.tips || []).forEach(t => {
      if (!t || !t.id || have.has(t.id) || !t.text) return; have.add(t.id);
      A.tips.push({ id: t.id, emoji: t.emoji || '💡', title: String(t.title || t.id), keys: words(t.keys), q: words(t.q), text: String(t.text), action: ACT[t.action] || null, pack: true });
      nt++;
    });
    return { recipes: nr, tips: nt };
  }
  function boot(n = 0) {
    if (!window.GW_V1571?.blk) { if (n < 120) setTimeout(() => boot(n + 1), 500); return; }
    let r = 0, t = 0; PACKS.forEach(p => { const k = install(p); r += k.recipes; t += k.tips; });
    window.GW_GWRAP_PACK = { install, make, loaded: { recipes: r, tips: t }, total: () => ({ recipes: window.GW_V1571.recipes.length, tips: window.GW_V1571.tips.length }) };
  }
  boot();
})();
</script>
