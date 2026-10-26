<script id="gw-v4900-costume-tabs">
(() => {
  'use strict';
  /* G-Warp v15.49.0 - Costume tabs (written by Claude; owner, 2026-10-19: "just like Sounds has different tabs,
     on Costumes we are going to add tabs, right on top of the costume section").
       Costumes (default) | Tiles | Animation
     Owner's rules:
     - Tiles is only available for a blank sprite (no costumes, or only empty costumes).
     - Tiles tab -> "Turn this sprite into a tile map". After that Costumes and Animation are unavailable:
       the sprite only has Tiles.
     - It can be turned back into a normal sprite at any time - unless a costume was added to it.
     - Animation is now a real tab (before it was a button that looked like a label); it opens the Animation
       editor (bones + frames).
     Note: the tile map data itself is still the project's one tile map (Engine.tilemap); a map per sprite is
     the next step (ai-team/FUTURE-IDEAS.txt). The sprite remembers its mode in s.gwTileSprite. */
  const by = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  const spr = () => (window.Engine && Engine.sprites && Engine.sprites[Engine.activeSpriteIndex]) || null;
  const toast = m => { try { (window.showToast || window.gwToast || (x => console.log(x)))(m); } catch {} };
  const BLANK = new WeakMap();
  function isBlankCostume(c) {
    if (!c) return true;
    if (BLANK.has(c) && BLANK.get(c).k === (c.svg || '').length + ':' + (c.canvas?.width || 0)) return BLANK.get(c).v;
    let v = false;
    if (c.dataFormat === 'svg' || c.svg) {
      const s = String(c.svg || '').replace(/<defs[\s\S]*?<\/defs>/gi, '');
      v = !/<(path|rect|circle|ellipse|line|polyline|polygon|text|image|use)\b/i.test(s);
    } else if (c.canvas && c.canvas.width && c.canvas.height) {
      try { const t = document.createElement('canvas'); t.width = t.height = 32; const x = t.getContext('2d'); x.drawImage(c.canvas, 0, 0, 32, 32);
        const d = x.getImageData(0, 0, 32, 32).data; v = true; for (let i = 3; i < d.length; i += 4) if (d[i]) { v = false; break; } } catch { v = false; }
    } else v = true;
    BLANK.set(c, { k: (c.svg || '').length + ':' + (c.canvas?.width || 0), v }); return v;
  }
  const blank = s => !s || !s.costumes || !s.costumes.length || s.costumes.every(isBlankCostume);
  const isTile = s => !!(s && s.gwTileSprite);
  let tab = 'costumes';

  function css() {
    if (by('gwCosTabsCss')) return;
    const st = document.createElement('style'); st.id = 'gwCosTabsCss';
    st.textContent = `
#gwCostumeStudio{height:calc(100% - 50px)!important}
#gwCosTabs{display:flex;align-items:center;gap:4px;padding:4px;margin-bottom:8px;border:1px solid var(--gw7-line,#262a45);border-radius:12px;background:var(--gw7-ink0,#0b0b14);flex:0 0 auto}
#gwCosTabs .gw-costab{display:inline-flex;align-items:center;gap:7px;height:32px;padding:0 14px;border:1px solid transparent;border-radius:9px;background:transparent;color:#94a3b8;font-size:12px;font-weight:800;cursor:pointer}
#gwCosTabs .gw-costab:hover:not(:disabled){background:#1b1d33;color:#fff}
#gwCosTabs .gw-costab.active{background:var(--gw7-looks,#8b5cf6);color:#fff;border-color:rgba(255,255,255,.12);box-shadow:0 2px 10px rgba(139,92,246,.35)}
#gwCosTabs .gw-costab:disabled{opacity:.38;cursor:not-allowed}
#gwCosTabs .gw-costab:focus-visible{outline:2px solid #4ade80;outline-offset:2px}
#gwCosTabs .gw-costab-note{margin-left:auto;padding-right:8px;font-size:11px;color:#64748b}
#gw18AnimBtn{display:none!important}
#gwTilesPane{flex:1 1 auto;display:flex;align-items:flex-start;justify-content:center;padding:28px 16px;border:1px solid var(--gw7-line,#262a45);border-radius:14px;background:#0d0f1c;min-height:320px}
#gwTilesPane[hidden]{display:none}
#gwTilesPane .gw-tiles-card{max-width:560px;width:100%;padding:22px;border:1px solid #2b2f55;border-radius:14px;background:linear-gradient(180deg,#14162a,#0f1122)}
#gwTilesPane h3{margin:0 0 8px;font-size:17px;font-weight:900;color:#fff;display:flex;gap:9px;align-items:center}
#gwTilesPane h3 i{color:#4ade80}
#gwTilesPane p{margin:6px 0;color:#cbd5e1;font-size:13px;line-height:1.5}
#gwTilesPane .gw-tiles-grid{display:grid;grid-template-columns:repeat(12,1fr);gap:3px;margin:14px 0}
#gwTilesPane .gw-tiles-grid span{aspect-ratio:1;border-radius:3px;background:#1b1d33}
#gwTilesPane .gw-tiles-grid span.g{background:#4ade80}#gwTilesPane .gw-tiles-grid span.v{background:#8b5cf6}
#gwTilesPane .gw-tiles-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}
#gwTilesPane .gw-tiles-btn{height:36px;padding:0 16px;border-radius:9px;border:1px solid #34344a;background:#1b1d33;color:#e5e7eb;font-weight:800;font-size:13px;cursor:pointer}
#gwTilesPane .gw-tiles-btn.primary{background:#6d4bd3;border-color:#8b5cf6;color:#fff}
#gwTilesPane .gw-tiles-btn:hover:not(:disabled){filter:brightness(1.15)}
#gwTilesPane .gw-tiles-btn:disabled{opacity:.4;cursor:not-allowed}
#gwTilesPane .gw-tiles-note{font-size:12px;color:#94a3b8}
#gwTilesPane .gw-tiles-warn{font-size:12px;color:#fde68a}`;
    document.head.appendChild(st);
  }

  function build() {
    const studio = by('gwCostumeStudio'); if (!studio || !studio.parentElement) return false;
    if (by('gwCosTabs')) return true;
    css();
    const bar = document.createElement('div'); bar.id = 'gwCosTabs'; bar.setAttribute('role', 'tablist'); bar.setAttribute('aria-label', 'Costume tools');
    bar.innerHTML = [['costumes', 'fa-shirt', 'Costumes'], ['tiles', 'fa-border-all', 'Tiles'], ['animation', 'fa-bone', 'Animation']]
      .map(([k, i, t]) => `<button type="button" role="tab" class="gw-costab" data-tab="${k}" id="gwCosTab-${k}" aria-selected="false"><i class="fa-solid ${i}" aria-hidden="true"></i>${t}</button>`).join('')
      + '<span class="gw-costab-note" id="gwCosTabNote"></span>';
    studio.parentElement.insertBefore(bar, studio);
    bar.addEventListener('click', e => { const b = e.target.closest('.gw-costab'); if (b && !b.disabled) choose(b.dataset.tab); });
    const tp = document.createElement('div'); tp.id = 'gwTilesPane'; tp.hidden = true; tp.setAttribute('role', 'tabpanel');
    studio.parentElement.insertBefore(tp, studio.nextSibling);
    tp.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b || b.disabled) return; const s = spr(); if (!s) return;
      if (b.id === 'gwTilesMake') makeTile(s);
      else if (b.id === 'gwTilesUndo') unTile(s);
      else if (b.id === 'gwTilesOpen') { try { window.openTilemap?.(); } catch (err) { console.warn(err); } }
    });
    refresh(true); return true;
  }

  function makeTile(s) {
    if (!blank(s)) { toast('Tiles only works on an empty sprite (no costumes).'); return; }
    s.gwTileSprite = { on: true, made: new Date().toISOString() };
    try { window.GW12?.ensureTilemap?.(); } catch {}
    tab = 'tiles'; refresh(true); toast(`“${s.name}” is now a tile map.`);
  }
  function unTile(s) {
    if (!blank(s)) { toast('This sprite has a costume now, so it can’t be turned back.'); return; }
    delete s.gwTileSprite; tab = 'costumes'; refresh(true); toast(`“${s.name}” is a normal sprite again.`);
  }

  function choose(k) {
    if (k === 'animation') { try { window.GW_ANIM?.open?.(); } catch (err) { console.warn(err); } return; }
    tab = k; refresh(true);
  }

  function renderTiles(s) {
    const tp = by('gwTilesPane'); if (!tp || !s) return;
    const grid = '<div class="gw-tiles-grid" aria-hidden="true">' + Array.from({ length: 36 }, (_, i) => `<span class="${i >= 24 ? 'g' : (i === 17 || i === 18 ? 'v' : '')}"></span>`).join('') + '</div>';
    if (isTile(s)) {
      const locked = !blank(s);
      tp.innerHTML = `<div class="gw-tiles-card"><h3><i class="fa-solid fa-border-all" aria-hidden="true"></i>“${esc(s.name)}” is a tile map</h3>
        <p>This sprite holds tiles instead of costumes. Paint your level with tiles: floors, walls, coins.</p>${grid}
        <div class="gw-tiles-row"><button type="button" class="gw-tiles-btn primary" id="gwTilesOpen"><i class="fa-solid fa-pen" aria-hidden="true"></i> Open the tile map editor</button>
        <button type="button" class="gw-tiles-btn" id="gwTilesUndo" ${locked ? 'disabled' : ''}>Turn back into a normal sprite</button></div>
        ${locked ? '<p class="gw-tiles-warn">This sprite has a costume now, so it can’t be turned back.</p>' : '<p class="gw-tiles-note">You can turn it back into a normal sprite as long as it has no costumes.</p>'}</div>`;
    } else {
      tp.innerHTML = `<div class="gw-tiles-card"><h3><i class="fa-solid fa-border-all" aria-hidden="true"></i>Tiles</h3>
        <p>Build a level out of small square tiles instead of drawing costumes.</p>${grid}
        <div class="gw-tiles-row"><button type="button" class="gw-tiles-btn primary" id="gwTilesMake">Turn this sprite into a tile map</button></div>
        <p class="gw-tiles-note">After this, Costumes and Animation are turned off for this sprite. You can turn it back as long as it has no costumes.</p></div>`;
    }
  }

  let lastSig = '';
  function refresh(force) {
    const bar = by('gwCosTabs'), studio = by('gwCostumeStudio'), tp = by('gwTilesPane'), s = spr(); if (!bar || !studio || !tp) return;
    const tile = isTile(s), canT = !!s && (tile || blank(s)), hasAnim = !!window.GW_ANIM;
    const sig = [Engine.activeSpriteIndex, s?.costumes?.length, tile, canT, tab].join('|');
    if (!force && sig === lastSig) return; lastSig = sig;
    if (tile && tab === 'costumes') tab = 'tiles';
    if (!tile && tab === 'tiles' && !canT) tab = 'costumes';
    const set = (k, dis, title) => { const b = by('gwCosTab-' + k); if (!b) return; b.disabled = !!dis; b.title = title; const on = tab === k; b.classList.toggle('active', on); b.setAttribute('aria-selected', String(on)); };
    set('costumes', tile, tile ? 'This sprite is a tile map, so it has no costumes' : 'Draw and edit costumes');
    set('tiles', !canT, canT ? 'Tiles: turn this sprite into a tile map' : 'Tiles: only for an empty sprite (no costumes)');
    set('animation', tile || !hasAnim, tile ? 'This sprite is a tile map' : 'Animation: bones and frames for a vector costume');
    by('gwCosTabNote').textContent = tile ? 'Tile map sprite' : (canT ? '' : 'Tiles needs an empty sprite');
    studio.style.display = tab === 'costumes' ? '' : 'none';
    tp.hidden = tab !== 'tiles';
    if (tab === 'tiles') renderTiles(s);
  }

  (function boot(n = 0) { if (!build() && n < 240) setTimeout(() => boot(n + 1), 500); })();
  new MutationObserver(() => { if (!by('gwCosTabs')) build(); }).observe(document.body, { childList: true, subtree: true });
  setInterval(() => { const p = by('gwCosTabs'); if (p && p.offsetParent) refresh(false); }, 400);

  window.GW_COSTABS = { choose, refresh: () => refresh(true), isBlankCostume, blank, makeTile, unTile, get tab() { return tab; } };
})();
</script>
