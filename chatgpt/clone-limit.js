(() => {
  'use strict';

  /*
   * G-Warp clone-limit warning supplement.
   *
   * app.html already enforces a default 300-clone cap and exposes
   * GW_SETTINGS -> Infinite clones. This add-on warns if the active project
   * actually grows beyond Scratch's usual 300-clone limit because a larger
   * or infinite limit is enabled/imported. It does not change the configured
   * limit or replace the existing clone engine.
   *
   * Switch off before this file loads:
   *   window.GW_DISABLE_CHATGPT_CLONE_LIMIT = true;
   */
  const DISABLE_KEY = 'GW_DISABLE_CHATGPT_CLONE_LIMIT';
  const INSTALL_KEY = '__GW_CHATGPT_CLONE_LIMIT_WARNING_V1__';

  if (window[DISABLE_KEY] === true || window[INSTALL_KEY]) return;

  const GW = window.GW;
  const Engine = window.Engine;

  // This file must be loaded after app.html has exposed these existing APIs.
  if (!GW || !Engine || !Array.isArray(Engine.sprites) ||
      typeof GW.createClone !== 'function' ||
      typeof GW.deleteClone !== 'function') {
    console.warn(
      '[G-Warp clone-limit warning] Not installed: expected window.GW, ' +
      'window.Engine, GW.createClone, GW.deleteClone and Engine.sprites.'
    );
    return;
  }

  const state = {
    version: 1,
    installed: true,
    cloneCount: 0,
    warningShown: false
  };
  window[INSTALL_KEY] = state;

  let spritesRef = null;
  let spritesLength = -1;
  let cloneCount = 0;
  let knownClones = new WeakSet();
  let warningShown = false;
  let fallbackBanner = null;

  function closeFallbackBanner() {
    if (fallbackBanner) fallbackBanner.remove();
    fallbackBanner = null;
  }

  function rebuildCount() {
    const sprites = Array.isArray(Engine.sprites) ? Engine.sprites : [];
    knownClones = new WeakSet();
    cloneCount = 0;

    for (const sprite of sprites) {
      if (sprite && typeof sprite === 'object' && sprite.isClone) {
        knownClones.add(sprite);
        cloneCount += 1;
      }
    }

    spritesRef = sprites;
    spritesLength = sprites.length;
    state.cloneCount = cloneCount;

    if (cloneCount <= 300) {
      warningShown = false;
      state.warningShown = false;
      closeFallbackBanner();
    }
  }

  function syncIfStructureChanged() {
    if (!Array.isArray(Engine.sprites) ||
        Engine.sprites !== spritesRef ||
        Engine.sprites.length !== spritesLength) {
      rebuildCount();
    }
  }

  function currentLimitLabel() {
    const limit = Engine.cloneLimit;
    if (limit === Infinity) return '∞ (Infinite clones enabled)';
    const n = Number(limit);
    return Number.isFinite(n) && n > 0 ? String(n) : '300';
  }

  function showFallbackBanner(message) {
    if (!document.body || fallbackBanner?.isConnected) return;

    const box = document.createElement('div');
    box.setAttribute('role', 'status');
    box.setAttribute('aria-live', 'assertive');
    Object.assign(box.style, {
      position: 'fixed',
      right: '16px',
      bottom: '16px',
      zIndex: '2147483000',
      maxWidth: '440px',
      boxSizing: 'border-box',
      padding: '14px 16px',
      border: '1px solid #8b5cf6',
      borderLeft: '4px solid #f59e0b',
      borderRadius: '12px',
      background: '#181825',
      color: '#f8fafc',
      boxShadow: '0 12px 40px rgba(0,0,0,.45)',
      font: '500 13px/1.5 system-ui, sans-serif',
      pointerEvents: 'auto'
    });

    const text = document.createElement('div');
    text.textContent = '⚠ ' + message;
    const dismiss = document.createElement('button');
    dismiss.type = 'button';
    dismiss.textContent = 'Dismiss';
    Object.assign(dismiss.style, {
      marginTop: '10px',
      padding: '5px 10px',
      border: '1px solid #8b5cf6',
      borderRadius: '7px',
      background: '#27213d',
      color: '#f8fafc',
      cursor: 'pointer',
      font: '600 12px system-ui, sans-serif'
    });
    dismiss.addEventListener('click', closeFallbackBanner);
    box.append(text, dismiss);
    document.body.appendChild(box);
    fallbackBanner = box;
  }

  function maybeWarn() {
    if (cloneCount <= 300) {
      if (warningShown) {
        warningShown = false;
        state.warningShown = false;
        closeFallbackBanner();
      }
      return;
    }

    if (warningShown) return;
    warningShown = true;
    state.warningShown = true;

    const message =
      'This project now has ' + cloneCount +
      ' clones, above Scratch’s usual 300-clone limit. The current G-Warp ' +
      'limit is ' + currentLimitLabel() +
      '. Large clone counts can slow or freeze this tab. If this is ' +
      'unexpected, turn off More → App → Advanced settings → Infinite clones.';

    try {
      window.GW_HEALTH?.note?.('clone-limit-over-300', message);
    } catch (_) {
      // Diagnostics must never interfere with clone creation.
    }

    try {
      // The app toast silently returns when its #toast host is absent.
      // Check the host first so a missing host falls back to a visible banner.
      if (typeof GW.toast === 'function' && document.getElementById('toast')) {
        GW.toast('⚠️ ' + message);
        return;
      }
    } catch (_) {
      // Use the local, accessible banner if the app toast is unavailable.
    }

    showFallbackBanner(message);
  }

  rebuildCount();

  const originalCreateClone = GW.createClone;
  GW.createClone = function () {
    syncIfStructureChanged();

    const beforeSprites = Engine.sprites;
    const beforeLength = beforeSprites.length;
    const result = originalCreateClone.apply(this, arguments);
    const afterSprites = Engine.sprites;
    const afterLength = Array.isArray(afterSprites) ? afterSprites.length : -1;

    if (result?.isClone &&
        afterSprites === beforeSprites &&
        afterLength === beforeLength + 1) {
      if (!knownClones.has(result)) {
        knownClones.add(result);
        cloneCount += 1;
      }
      spritesRef = afterSprites;
      spritesLength = afterLength;
      state.cloneCount = cloneCount;
    } else if (afterSprites !== beforeSprites || afterLength !== beforeLength) {
      // Handle nested creation or a project/runtime replacing the sprite array.
      rebuildCount();
    }

    maybeWarn();
    return result;
  };

  const originalDeleteClone = GW.deleteClone;
  GW.deleteClone = function (sprite) {
    syncIfStructureChanged();

    const beforeSprites = Engine.sprites;
    const beforeLength = beforeSprites.length;
    const wasTrackedClone = !!sprite?.isClone && knownClones.has(sprite);
    const result = originalDeleteClone.apply(this, arguments);

    if (Engine.sprites === beforeSprites &&
        Engine.sprites.length === beforeLength - 1 &&
        wasTrackedClone) {
      knownClones.delete(sprite);
      cloneCount = Math.max(0, cloneCount - 1);
      spritesRef = Engine.sprites;
      spritesLength = Engine.sprites.length;
      state.cloneCount = cloneCount;
    } else if (Engine.sprites !== beforeSprites ||
               Engine.sprites.length !== beforeLength) {
      rebuildCount();
    }

    maybeWarn();
    return result;
  };

  if (typeof GW.removeAllClones === 'function') {
    const originalRemoveAllClones = GW.removeAllClones;
    GW.removeAllClones = function () {
      const result = originalRemoveAllClones.apply(this, arguments);
      rebuildCount();
      maybeWarn();
      return result;
    };
  }

  // The fast Stop-cleanup module compacts Engine.sprites in place. Listen for
  // its event so the warning/count immediately follow that cleanup too.
  const onClonesCleaned = () => {
    rebuildCount();
    maybeWarn();
  };
  window.addEventListener('gwarp-clones-cleaned', onClonesCleaned);

  // Some projects may already contain more than 300 clones when this loads.
  maybeWarn();
})();