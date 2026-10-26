// The "made with G-Warp" remix intro (the owner's "little commercial"), added INSIDE G-Warp to any Scratch project.
//   node add-gwarp-intro.js in.sb3 out.sb3 [--wait] [--link URL] [--app path/to/app.html]
// What it adds:
//   - sprite "G-Warp Splash": dark screen, the G logo pops in, says "hel-lo" (G-Warp's synth), fades out (about 1.6 s)
//   - a note on the FIRST sprite (the one Scratch shows when you click "See inside") saying the remix was made with G-Warp + the link
// Default: the game starts at the same time underneath the splash (safe for every project - no script is changed).
// --wait: the game starts AFTER the splash: every "when green flag clicked" of the other sprites becomes
//         "when I receive [start game]" and the splash sends "start game". Check the game still works afterwards!
// Credit: keep the original creator's credit in your Scratch notes. Never claim the game as yours.
const { openApp, openProject, saveSb3, injectBuilder, KIT } = require('./lib/gw'); const fs = require('fs'), path = require('path');
(async () => {
  const a = process.argv.slice(2), [src, out] = a, opt = n => { const i = a.indexOf(n); return i >= 0 ? a[i + 1] : null; };
  if (!src || !out) { console.log('usage: node add-gwarp-intro.js in.sb3 out.sb3 [--wait] [--link URL] [--app app.html]'); process.exit(2); }
  const link = opt('--link') || 'https://creapter1.github.io/gwarp/', wait = a.includes('--wait');
  const art = { bg: fs.readFileSync(path.join(KIT, 'assets', 'splash-bg.svg'), 'utf8'), logo: fs.readFileSync(path.join(KIT, 'assets', 'gwarp-logo.svg'), 'utf8') };
  const { browser, page, errors } = await openApp(opt('--app') || undefined); await openProject(page, src); await injectBuilder(page);
  const log = await page.evaluate(async ({ art, link, wait }) => {
    const B = window.GWB, E = Engine, L = [];
    const s = await B.newSprite('G-Warp Splash', [{ name: 'splash bg', svg: art.bg, rc: { x: 240, y: 180 } }, { name: 'logo', svg: art.logo, rc: { x: 130, y: 98 } }]);
    const si = E.sprites.indexOf(s); B.locals(s, ['Is Clone']);
    try { const hello = await window.GW_MASCOT.helloSound(); if (hello) s.sounds = [hello]; } catch (e) { L.push('no hello sound: ' + e); }
    if (wait) { // other sprites' green-flag scripts wait for the splash
      [...document.querySelectorAll('#workspaceCanvas > .block-stack')].forEach(st => { const h = B.kids(st)[0]; if (h?.dataset.type === 'when_flag' && +st.dataset.owner !== si) { h.replaceWith(GW_V1571.blk('when_broadcast', [], ['start game'])); L.push('now waits for the splash: a script of ' + E.sprites[+st.dataset.owner]?.name); } });
    }
    B.stack(si, 0, 0, [GW_V1571.blk('when_flag'), B.SET('Is Clone', 0), B.COSTUME('splash bg'), B.C('goto_xy', [0, 0]), B.C('set_size', [100]), B.C('set_effect', [0], ['ghost']),
      B.C('go_front_back', [], ['front']), B.C('show'), B.C('create_clone', [], ['myself']), ...(s.sounds[0] ? [B.C('start_sound', [], [s.sounds[0].name])] : []),
      B.C('wait', [1.2]), B.C('repeat', [10], [], { body: [B.C('change_effect', [10], ['ghost'])] }), B.C('hide'), ...(wait ? [B.C('broadcast', [], ['start game'])] : [])]);
    B.stack(si, 0, 600, [GW_V1571.blk('when_clone'), B.SET('Is Clone', 1), B.COSTUME('logo'), B.C('set_size', [40]), B.C('set_effect', [0], ['ghost']), B.C('go_front_back', [], ['front']),
      B.C('repeat', [6], [], { body: [B.C('change_size', [12])] }), B.C('repeat', [3], [], { body: [B.C('change_size', [-4])] }), B.C('wait', [0.6]),
      B.C('repeat', [10], [], { body: [B.C('change_effect', [10], ['ghost']), B.C('change_size', [2])] }), B.C('delete_clone')]);
    B.comment(si, -440, 0, 'G-Warp splash: the G logo pops in, says "hel-lo" (made with G-Warp\'s synth) and fades away.' + (wait ? ' Then it sends "start game".' : ''));
    const first = E.sprites.findIndex(x => !x.isClone && !x.stageProxy && x !== s);
    if (first >= 0) B.comment(first, -460, 0, '⚡ G-WARP REMIX ⚡\nThis remix was made with G-Warp, a free block-coding app (beta).\nAll the original art, music and game idea belong to the original creator - please check out the original project!\n\nWant to change this project even more? Open it in G-Warp:\n' + link, 320);
    try { window.GW8?.decorate?.(); GW_V1571.rehydrate?.(); window.GW8?.indexCustomProcedures?.(); GW.refreshBlockMenus?.(); window.renderSpritesGrid?.(); } catch {}
    L.push('added sprite "G-Warp Splash" + a note on "' + (E.sprites[first]?.name || '?') + '"'); return L;
  }, { art, link, wait });
  const n = await saveSb3(page, out); await browser.close();
  console.log(log.join('\n')); console.log(`saved ${n} bytes -> ${out}; page errors: ${errors.length ? errors.join(' | ') : 'none'}`);
  console.log('NEXT: node check-sb3.js ' + out + '   then   node run-in-scratch.js ' + out + ' 8 --shots shots');
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
