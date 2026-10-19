(() => {
  'use strict';
  /* ===================================================================
     G-Warp — UI fix for More -> Advanced settings and Addons (Buffy, 2026-10-17)
     The owner asked for a UI fix of Advanced settings. What was wrong:
       1. The "Frame rate" row squeezed its explanation into a ~160px
          column, so it read one or two words per line (and worse on a
          tablet or a narrow window). The select had a hard 210px width.
       2. Seven settings sat in one long flat list with no headings, so
          "which of these is safe?" was impossible to answer at a glance.
       3. Turning on Infinite clones / Remove fencing / Remove misc limits
          (all of which can freeze a project or lose sprites) looked
          exactly like turning on "Show FPS".
       4. There was no way back to the safe settings after experimenting.
       5. Addons: the Project volume row split its label and its 100%
          onto two lines with the slider beside them, and nothing said
          that addon switches save straight away (they do not need Save).
     What this file does, only while those two dialogs are open:
       - wider Advanced dialog, and the frame-rate row stacks instead of
         squeezing on narrow screens;
       - three real headings: Speed / Limits & safety / Picture & helpers;
       - an amber warning that appears only when a risky switch is on;
       - a "Reset to recommended" row (60 FPS, every limit back on) that
         changes the dialog's own controls, so the app's Save still decides;
       - a tidy full-width volume slider in Addons + a "saves straight away"
         note.
     Nothing in app.html is rewritten, no setting is changed behind the
     user's back: the app's own Save button still does the saving, and the
     app's own checkbox references are reused. Switch-off key:
     window.GW_FEATURE_OFF('settingsUiFix').
     =================================================================== */
  if (window.GW_SETTINGS_UI_FIX) return; // loaded twice: do nothing
  if (typeof window.GW_FEATURE_OFF === 'function' && window.GW_FEATURE_OFF('settingsUiFix')) return;

  const by = id => document.getElementById(id);
  const h = (tag, props = {}, ...kids) => {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(props)) {
      if (k === 'class') el.className = v;
      else if (k === 'text') el.textContent = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
      else if (v != null) el.setAttribute(k, v);
    }
    kids.flat().forEach(c => c != null && el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c));
    return el;
  };

  const CSS = `
  /* ---- Advanced settings ---- */
  #gw9Advanced .gw8-dlg{width:min(600px,100%);max-width:min(600px,100%)}
  #gw9Advanced .gw9-adv-row{flex-wrap:wrap}
  #gw9Advanced .gw9-adv-row > span{flex:1 1 240px;min-width:0}
  #gw9Advanced .gw9-adv-fps{flex:0 1 220px;min-width:180px;max-width:270px}
  #gw9Advanced .gw9-adv-fps select{width:100%}
  #gw9Advanced .gw9-adv-custom{width:100%}
  #gw9AdvFpsNow{display:inline-block;padding:0 6px;border-radius:6px;background:#052e2b;color:#a7f3d0;font-weight:800}
  .gwSui-h{display:flex;align-items:center;gap:8px;margin:10px 0 -3px;font-size:10.5px;font-weight:900;letter-spacing:.09em;text-transform:uppercase;color:#8b93b5}
  .gwSui-h:first-child{margin-top:0}
  .gwSui-h::after{content:"";flex:1;height:1px;background:linear-gradient(90deg,#2b3253,transparent)}
  .gwSui-warn{display:flex;gap:8px;padding:9px 11px;border-radius:10px;background:#2a1a08;border:1px solid #b45309;color:#fde68a;font-size:11.5px;line-height:1.45}
  .gwSui-warn[hidden]{display:none}
  .gwSui-warn b{color:#fbbf24}
  .gwSui-reset{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:6px;padding:10px 12px;border-radius:12px;background:#0f1324;border:1px dashed #3b4470}
  .gwSui-reset small{display:block;font-size:11px;line-height:1.4;color:#a3abc9}
  .gwSui-reset .gw7-btn{flex:none}
  /* ---- Addons ---- */
  #gw10Addons .gw10-vol-row{flex-direction:column;align-items:stretch;gap:7px}
  #gw10Addons .gw10-vol-row > span{flex-direction:row;align-items:baseline;justify-content:space-between;gap:10px}
  #gw10Addons #gw10Volume{width:100%;flex:none;accent-color:#a78bfa}
  .gwSui-note{margin:2px 0 0;font-size:11px;color:#a3abc9}
  `;

  function addCss() {
    if (by('gwSettingsUiCss')) return;
    document.head.appendChild(h('style', { id: 'gwSettingsUiCss', text: CSS }));
  }

  /* ================= Advanced settings ================= */
  function rowOf(wrap, label) {
    return [...wrap.querySelectorAll('.gw9-adv-row')].find(r => {
      const b = r.querySelector('b');
      return b && b.textContent.trim().toLowerCase() === label.toLowerCase();
    }) || null;
  }

  function fixAdvanced(dlg) {
    const body = dlg.querySelector('.gw8-dlg-body');
    const wrap = body?.querySelector('.gw9-adv');
    if (!wrap) return false;
    addCss();

    /* 1. real headings, so the list can be read at a glance */
    const plan = [
      ['Speed', ['Frame rate', 'Show FPS on the stage']],
      ['Limits & safety', ['Infinite clones', 'Remove fencing', 'Remove miscellaneous limits']],
      ['Picture & helpers', ['Max quality render (HQ)', 'Anti-freeze for ⚡ blocks (warp timer)']]
    ];
    const groups = plan.map(([title, labels]) => ({ title, rows: labels.map(l => rowOf(wrap, l)).filter(Boolean) }));
    const leftovers = [...wrap.children].filter(el => el.nodeType === 1 && !groups.some(g => g.rows.includes(el)) && !el.classList.contains('gw9-adv-row'));

    // freeze the dialog's body as empty, then put the groups back in a clear order
    const keep = [...wrap.children];
    keep.forEach(el => el.remove());
    groups.forEach(g => {
      if (!g.rows.length) return;
      wrap.appendChild(h('div', { class: 'gwSui-h', role: 'heading', 'aria-level': '3', text: g.title }));
      g.rows.forEach(r => wrap.appendChild(r));
    });
    // anything the app added that we did not name (e.g. the project-FPS note) goes at the end
    leftovers.forEach(el => wrap.appendChild(el));

    /* 2. a warning that only shows when a risky switch is on */
    const risky = [
      ['gw9AdvClones', 'Infinite clones'],
      ['gw9AdvFence', 'Remove fencing'],
      ['gw9AdvMisc', 'Remove misc limits']
    ];
    const warn = h('div', { class: 'gwSui-warn', id: 'gwSuiWarn', role: 'status', hidden: 'hidden' });
    const warnText = h('span', {});
    warn.appendChild(h('span', { 'aria-hidden': 'true', text: '⚠' }));
    warn.appendChild(warnText);
    const updateWarn = () => {
      const names = risky.filter(([id]) => by(id)?.checked).map(([, n]) => n);
      warn.hidden = !names.length;
      warnText.replaceChildren(
        h('b', { text: 'Careful: ' }),
        `you turned on ${names.join(', ')}. These make projects able to freeze the tab or lose sprites. `,
        h('b', { text: 'Use them only for a project that really needs them' }),
        ' (like a TurboWarp game), and turn them back off afterwards.'
      );
    };
    const limitsGroup = groups.find(g => g.title === 'Limits & safety');
    if (limitsGroup?.rows.length) {
      const last = limitsGroup.rows[limitsGroup.rows.length - 1];
      last.after(warn);
    } else {
      wrap.appendChild(warn);
    }
    risky.forEach(([id]) => { const c = by(id); if (c) c.addEventListener('change', updateWarn); });

    /* 3. the way back to the safe settings (the app's Save still saves) */
    const reset = h('div', { class: 'gwSui-reset' },
      h('span', {}, h('b', { text: 'Recommended settings' }),
        h('small', { text: '60 FPS, every limit back on, sharp picture. Changes the boxes here — press Save to keep them.' })),
      h('button', { type: 'button', class: 'gw7-btn', id: 'gwSuiReset', text: 'Reset to recommended' }));
    reset.querySelector('button').addEventListener('click', () => {
      const sel = by('gw9AdvFps'), custom = by('gw9AdvFpsCustom');
      if (sel) { sel.value = '60'; sel.dispatchEvent(new Event('change', { bubbles: true })); }
      if (custom) { custom.value = '60'; custom.hidden = true; }
      const set = (id, v) => { const c = by(id); if (c) c.checked = v; };
      set('gw9AdvClones', false); set('gw9AdvFence', false); set('gw9AdvMisc', false);
      set('gw9AdvShowFps', false); set('gw9AdvHQ', true); set('gw9AdvGuard', true);
      const now = by('gw9AdvFpsNow'); if (now) now.textContent = '60 FPS';
      updateWarn();
    });
    wrap.appendChild(reset);

    updateWarn();
    dlg.dataset.gwSui = '1';
    return true;
  }

  /* ================= Addons ================= */
  function fixAddons(dlg) {
    const body = dlg.querySelector('.gw8-dlg-body');
    const wrap = body?.querySelector('.gw9-adv');
    if (!wrap) return false;
    addCss();
    // say plainly that addons save as you click them (there is no Save button here)
    if (!wrap.querySelector('.gwSui-note')) {
      const note = h('p', { class: 'gwSui-note', text: 'Changes here save straight away — you do not need to press anything.' });
      const volRow = wrap.querySelector('.gw10-vol-row');
      if (volRow) volRow.after(note); else wrap.appendChild(note);
    }
    if (wrap.querySelector('.gw10-vol-row') && !wrap.querySelector('.gwSui-h-volume')) {
      const head = h('div', { class: 'gwSui-h gwSui-h-volume', role: 'heading', 'aria-level': '3', text: 'Sound' });
      wrap.querySelector('.gw10-vol-row').before(head);
    }
    dlg.dataset.gwSui = '1';
    return true;
  }

  /* ================= hook the dialogs as they open ================= */
  /* The dialog element appears a moment before its body is filled in, so a
     dialog is only remembered once it really was tidied; until then every
     change to the page tries again. */
  const seen = new WeakSet();
  function scan() {
    ['gw9Advanced', 'gw10Addons'].forEach(id => {
      const dlg = by(id);
      if (!dlg || seen.has(dlg) || dlg.dataset.gwSui) return;
      try {
        const ok = id === 'gw9Advanced' ? fixAdvanced(dlg) : fixAddons(dlg);
        if (ok) seen.add(dlg);
      } catch (e) { console.warn('[settings-ui-fix] could not tidy', id, e); }
    });
  }
  const mo = new MutationObserver(() => scan());
  mo.observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scan, { once: true }); else scan();

  window.GW_SETTINGS_UI_FIX = {
    scan,
    off() {
      mo.disconnect();
      by('gwSettingsUiCss')?.remove();
      by('gwSuiWarn')?.remove();
      document.querySelector('.gwSui-reset')?.remove();
      document.querySelectorAll('[data-gwSui]').forEach(d => { delete d.dataset.gwSui; });
    }
  };
})();
