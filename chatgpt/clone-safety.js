(() => {
  'use strict';
  if (window.GW_CLONE_SAFETY) return;
  if (window.GW_FEATURE_OFF?.('cloneSafety')) return;

  const BASE_LIMIT = 300;
  const E = () => window.Engine;
  const G = () => window.GW;
  const state = { sprites: null, length: -1, count: 0, warned: false, rootIndices: new WeakMap(), hats: [], hatsDirty: true, observer: null };

  function settingsAllowInfinite() {
    try { return !!window.GW_SETTINGS?.get?.().infiniteClones; } catch (_) { return false; }
  }
  function effectiveLimit() {
    if (settingsAllowInfinite()) return Infinity;
    const n = Number(E()?.cloneLimit);
    // A loaded project cannot silently turn on unlimited clones. A finite lower
    // project cap is preserved, but the normal ceiling remains Scratch's 300.
    return Number.isFinite(n) && n > 0 ? Math.min(BASE_LIMIT, Math.floor(n)) : BASE_LIMIT;
  }
  function recount() {
    const e = E();
    if (!e || !Array.isArray(e.sprites)) { state.sprites = null; state.length = -1; state.count = 0; return 0; }
    let n = 0;
    for (let i = 0; i < e.sprites.length; i++) if (e.sprites[i]?.isClone) n++;
    state.sprites = e.sprites;
    state.length = e.sprites.length;
    state.count = n;
    return n;
  }
  function cloneCount() {
    const e = E();
    if (!e || !Array.isArray(e.sprites)) return 0;
    if (state.sprites !== e.sprites || state.length !== e.sprites.length) return recount();
    return state.count;
  }
  function bumpSpriteEpoch() {
    const g = G();
    if (g) g.__sprEpoch = (Number(g.__sprEpoch) || 0) + 1;
  }
  function warnLimit(limit) {
    if (state.warned) return;
    state.warned = true;
    const message = `This project reached its clone limit (${limit}). Scratch's default is 300. Turn on More → Advanced settings → Infinite clones only if this project really needs more; unlimited clones can consume memory and freeze the tab.`;
    try { window.GW_HEALTH?.note?.('clone-limit', message); } catch (_) {}
    try { window.dispatchEvent(new CustomEvent('gwarp-clone-limit', { detail: { limit, count: cloneCount(), message } })); } catch (_) {}
    try { Promise.resolve(window.GW_CONFIRM?.('Clone limit reached', message, 'OK', 'Close')).catch(() => {}); } catch (_) {}
  }
  function cacheCloneHats() {
    const workspace = document.getElementById('workspaceCanvas');
    if (!workspace) return;
    state.hats = Array.from(workspace.querySelectorAll(':scope > .block-stack')).filter(st => st.firstElementChild?.dataset?.type === 'when_clone');
    state.hatsDirty = false;
  }
  function installHatObserver() {
    const workspace = document.getElementById('workspaceCanvas');
    if (!workspace || state.observer || typeof MutationObserver !== 'function') return;
    state.observer = new MutationObserver(() => { state.hatsDirty = true; });
    state.observer.observe(workspace, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-owner', 'data-type'] });
    cacheCloneHats();
  }
  function rootIndex(root, sprites) {
    const prior = state.rootIndices.get(root);
    if (prior && prior.sprites === sprites && sprites[prior.index] === root) return prior.index;
    const idx = sprites.indexOf(root); // normally once per original sprite; cached for all later clones
    state.rootIndices.set(root, { sprites, index: idx });
    return idx;
  }
  function fastRemoveClones(stopAllScripts = false) {
    const e = E();
    if (!e || !Array.isArray(e.sprites)) return 0;
    const sprites = e.sprites;
    let write = 0;
    for (let read = 0; read < sprites.length; read++) {
      const sprite = sprites[read];
      if (!sprite?.isClone) sprites[write++] = sprite;
    }
    const removed = sprites.length - write;
    sprites.length = write;

    const threads = Array.isArray(e.threads) ? e.threads : [];
    if (stopAllScripts) {
      // Stop already means every script stops; clearing the array is O(1), even
      // if a runaway project created tens of thousands of clone threads.
      threads.length = 0;
    } else {
      let tw = 0;
      for (let tr = 0; tr < threads.length; tr++) {
        const thread = threads[tr];
        if (!thread?.sprite?.isClone && thread) threads[tw++] = thread;
      }
      threads.length = tw;
    }
    const baseCount = sprites.length;
    e.activeSpriteIndex = Math.max(0, Math.min(Number(e.activeSpriteIndex) || 0, baseCount - 1));
    state.sprites = sprites;
    state.length = sprites.length;
    state.count = 0;
    bumpSpriteEpoch();
    return removed;
  }

  function optimizedCreateClone(source) {
    const e = E(), g = G();
    if (!e || !g || !source || !Array.isArray(e.sprites)) return null;
    const limit = effectiveLimit();
    e.cloneLimit = limit;
    const have = cloneCount();
    if (have >= limit) { warnLimit(limit); return null; }

    const root = source.isClone ? (source.cloneRoot || source.cloneOf || source) : source;
    const clone = {
      ...source,
      name: root.name,
      rootName: root.name,
      isClone: true,
      cloneOf: source,
      cloneRoot: root,
      sayText: '',
      sayUntil: 0,
      layer: source.layer
    };
    clone.costumes = Array.isArray(source.costumes) ? source.costumes.map(c => ({ ...c })) : [];
    clone.localVars = { ...(source.localVars || {}) };
    clone.localLists = Object.fromEntries(Object.entries(source.localLists || {}).map(([name, value]) => [name, Array.isArray(value) ? value.slice() : []]));
    clone.effects = { ...(source.effects || {}) };

    const sprites = e.sprites;
    sprites.push(clone);
    state.sprites = sprites;
    state.length = sprites.length;
    state.count = have + 1;
    bumpSpriteEpoch();

    // Cache the original sprite's index and the clone-start hats. The previous
    // implementation ran filter() and indexOf() for every clone; both cost O(n).
    const owner = rootIndex(root, sprites);
    if (state.hatsDirty) cacheCloneHats();
    const hats = state.hats;
    for (let i = 0; i < hats.length; i++) {
      const stack = hats[i];
      if (Number(stack.dataset.owner ?? -1) === owner) {
        try { g.runHat?.(stack, clone); } catch (err) { console.warn('[G-Warp clone-start script]', err); }
      }
    }
    return clone;
  }

  function install() {
    const e = E(), g = G();
    if (!e || !g || typeof g.createClone !== 'function' || typeof g.deleteClone !== 'function') return false;
    installHatObserver();
    recount();
    e.cloneLimit = effectiveLimit();

    const originalDelete = g.deleteClone;
    g.createClone = optimizedCreateClone;
    g.deleteClone = function (sprite) {
      const e0 = E();
      const beforeArray = e0?.sprites;
      const wasClone = !!sprite?.isClone && Array.isArray(beforeArray) && beforeArray.includes(sprite);
      const result = originalDelete.apply(this, arguments);
      if (wasClone && E()?.sprites === beforeArray && state.sprites === beforeArray) {
        state.count = Math.max(0, state.count - 1);
        state.length = beforeArray.length;
      } else if (E()?.sprites !== state.sprites || E()?.sprites?.length !== state.length) {
        recount();
      }
      return result;
    };
    g.removeAllClones = () => fastRemoveClones(false);

    // Keep the existing Advanced Settings control, but make opting into an
    // unbounded clone count an explicit warned choice.
    const settings = window.GW_SETTINGS;
    if (settings && typeof settings.setInfiniteClones === 'function' && !settings.setInfiniteClones.__gwCloneSafety) {
      const baseSet = settings.setInfiniteClones;
      settings.setInfiniteClones = function (on) {
        const result = baseSet.apply(this, arguments);
        const ee = E();
        if (ee) ee.cloneLimit = on ? Infinity : BASE_LIMIT;
        recount();
        state.warned = false;
        return result;
      };
      settings.setInfiniteClones.__gwCloneSafety = true;
    }

    document.addEventListener('click', event => {
      const checkbox = event.target?.closest?.('#gw9AdvClones');
      if (!checkbox || !checkbox.checked) return; // Turning it off stays immediate.
      event.preventDefault();
      event.stopImmediatePropagation();
      checkbox.checked = false;
      const confirm = window.GW_CONFIRM;
      const message = 'Infinite clones removes Scratch’s 300-clone safety limit. A project that keeps creating clones can use large amounts of memory and freeze the tab. Only enable this for projects that need it.';
      Promise.resolve(typeof confirm === 'function' ? confirm('Enable infinite clones?', message, 'Enable', 'Cancel') : false)
        .then(yes => {
          checkbox.checked = !!yes;
          if (yes) settings?.setInfiniteClones?.(true);
        })
        .catch(() => { checkbox.checked = false; });
    }, true);

    document.addEventListener('click', event => {
      if (event.target?.closest?.('#greenFlagBtn')) {
        state.warned = false;
        const ee = E();
        if (ee) ee.cloneLimit = effectiveLimit();
        fastRemoveClones(false);
      } else if (event.target?.closest?.('#stopBtn')) {
        // Capture phase: purge clone sprites before the normal Stop handler. Do
        // not iterate the runaway threads array; Stop clears it in constant time.
        fastRemoveClones(true);
        E()?.sprites?.forEach(sprite => { sprite.sayText = ''; sprite.sayUntil = 0; });
        const bubble = document.getElementById('sayBubble');
        if (bubble) bubble.style.setProperty('display', 'none', 'important');
      }
    }, true);
    window.addEventListener('gwarp-project-loaded', () => {
      const ee = E();
      if (ee) ee.cloneLimit = effectiveLimit();
      recount();
      installHatObserver();
    });
    return true;
  }

  if (!install()) {
    let attempts = 0;
    const retry = () => { if (install() || ++attempts >= 80) return; setTimeout(retry, 250); };
    retry();
  }
  window.GW_CLONE_SAFETY = {
    maxScratchClones: BASE_LIMIT,
    count: cloneCount,
    effectiveLimit,
    removeAllClonesFast: () => fastRemoveClones(false),
    stopAndClearFast: () => fastRemoveClones(true),
    resetNotice: () => { state.warned = false; }
  };
})();
