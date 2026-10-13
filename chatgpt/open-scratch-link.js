(() => {
  'use strict';

  /*
   * Open shared Scratch projects from G-Warp URLs like:
   *   app.html#scratch=123456789
   *
   * Reuses G-Warp's own confirmation dialog and loader. No project download
   * starts until the user confirms.
   *
   * Switch off before this file loads:
   *   window.GW_DISABLE_SCRATCH_HASH_OPEN = true;
   */
  const DISABLE_KEY = 'GW_DISABLE_SCRATCH_HASH_OPEN';
  const INSTALL_KEY = '__GW_OPEN_SCRATCH_HASH_V1__';
  if (window[DISABLE_KEY] === true || window[INSTALL_KEY]) return;

  const state = { installed: true, pending: false, lastProjectId: null, lastResult: null };
  window[INSTALL_KEY] = state;

  function requestedProjectId() {
    const match = /^#scratch=(\d{1,12})$/i.exec(String(window.location?.hash || ''));
    if (!match || !/^[1-9]\d{0,11}$/.test(match[1])) return null;
    return match[1];
  }

  function clearHandledHash() {
    try {
      if (!/^#scratch=\d{1,12}$/i.test(String(window.location?.hash || ''))) return;
      window.history.replaceState(
        window.history.state,
        document.title,
        window.location.pathname + window.location.search
      );
    } catch (error) {
      console.warn('[G-Warp Scratch link] Could not clear the handled URL hash:', error);
    }
  }

  function notify(message) {
    try {
      if (typeof window.GW?.toast === 'function' && document.getElementById('toast')) {
        window.GW.toast(message);
        return;
      }
    } catch (_) {}
    console.warn('[G-Warp Scratch link]', message);
  }

  async function handle() {
    if (state.pending) return false;
    const id = requestedProjectId();
    if (!id) return false;

    const load = window.GW_WEB?.load;
    if (typeof load !== 'function') {
      console.warn(
        '[G-Warp Scratch link] The app has not exposed GW_WEB.load yet. ' +
        'Load this module after the app.html scripts.'
      );
      return false;
    }

    state.pending = true;
    state.lastProjectId = id;
    try {
      let accepted;
      const title = 'Open Scratch project #' + id + '?';
      const message =
        'G-Warp will download this shared Scratch project and open it in the editor. ' +
        'Only public/shared projects can be loaded. Continue?';

      if (typeof window.GW_CONFIRM === 'function') {
        accepted = await window.GW_CONFIRM(title, message, 'Open project', 'Cancel');
      } else {
        accepted = window.confirm(title + '\n\n' + message);
      }

      // Clear after the user responds so refresh does not ask again.
      clearHandledHash();
      if (!accepted) {
        state.lastResult = 'cancelled';
        return false;
      }

      // Reuse G-Warp's existing loader and its import/error-handling path.
      const ok = await load.call(window.GW_WEB, id);
      state.lastResult = ok ? 'loaded' : 'load-failed';
      return !!ok;
    } catch (error) {
      clearHandledHash();
      state.lastResult = 'error';
      notify('Could not open Scratch project #' + id + ': ' + (error?.message || error));
      return false;
    } finally {
      state.pending = false;
    }
  }

  state.handle = handle;
  state.start = () => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', handle, { once: true });
    } else {
      Promise.resolve().then(handle);
    }
  };

  // app.html must have assigned GW_CONFIRM and GW_WEB.load first.
  state.start();
})();