(() => {
  'use strict';

  /*
   * Offer the most recent existing IndexedDB restore point after an
   * unexpectedly ended session. This module stores only a per-tab "runtime
   * was active" marker in localStorage; it stores no project content.
   *
   * A clean pagehide/Stop clears the marker. If the tab or renderer dies while
   * a project is running and pagehide cannot run, the marker survives reload.
   *
   * Switch off before this file loads:
   *   window.GW_DISABLE_CHATGPT_CRASH_RECOVERY = true;
   */
  const DISABLE_KEY = 'GW_DISABLE_CHATGPT_CRASH_RECOVERY';
  const INSTALL_KEY = '__GW_CHATGPT_CRASH_RECOVERY_V1__';
  const SESSION_KEY = 'gwarp-crash-tab-v1';
  const ACTIVE_PREFIX = 'gwarp-crash-active-v1:';

  if (window[DISABLE_KEY] === true || window[INSTALL_KEY]) return;
  const Engine = window.Engine;
  if (!Engine || typeof Engine.isRunning !== 'boolean') {
    console.warn('[G-Warp recovery] Not installed: Engine.isRunning is not available yet.');
    return;
  }

  function sessionId() {
    try {
      let id = sessionStorage.getItem(SESSION_KEY);
      if (!id) {
        id = (window.crypto?.randomUUID?.() ||
          'tab-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2));
        sessionStorage.setItem(SESSION_KEY, id);
      }
      return id;
    } catch (_) {
      // Without sessionStorage a per-tab key cannot reliably survive reload.
      return null;
    }
  }

  const sid = sessionId();
  if (!sid) {
    console.warn('[G-Warp recovery] Not installed: sessionStorage is unavailable.');
    return;
  }
  const markerKey = ACTIVE_PREFIX + sid;

  function readMarker() {
    try {
      const raw = localStorage.getItem(markerKey);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed?.running === true ? parsed : null;
    } catch (_) {
      return null;
    }
  }
  function clearMarker() {
    try { localStorage.removeItem(markerKey); } catch (_) {}
    state.marked = false;
  }
  function writeMarker() {
    try {
      localStorage.setItem(markerKey, JSON.stringify({ running: true, since: Date.now() }));
      state.marked = true;
      return true;
    } catch (_) {
      state.marked = false;
      return false;
    }
  }

  // Capture the previous marker before this page creates a new one.
  const previousRun = readMarker();
  try { localStorage.removeItem(markerKey); } catch (_) {}

  const state = {
    installed: true,
    possibleUncleanEnd: !!previousRun,
    marked: false,
    prompted: false,
    lastRestoreId: null,
    result: previousRun ? 'recovery-pending' : 'no-recovery-needed',
    dispose: null,
    syncRuntime: null,
    checkRecovery: null
  };
  window[INSTALL_KEY] = state;

  function syncRuntime() {
    if (Engine.isRunning) {
      if (!state.marked) writeMarker();
    } else if (state.marked) {
      clearMarker();
    } else {
      // Clear any stale marker when a stop-all block changes runtime state.
      try { if (localStorage.getItem(markerKey)) localStorage.removeItem(markerKey); } catch (_) {}
    }
  }

  function isStartStopClick(event) {
    const target = event.target;
    if (!target || typeof target.closest !== 'function') return;
    if (target.closest('#greenFlagBtn, #stopBtn')) {
      // Read state after the app's synchronous click handlers have run.
      setTimeout(syncRuntime, 0);
      setTimeout(syncRuntime, 80);
    }
  }

  async function checkRecovery() {
    if (!state.possibleUncleanEnd || state.prompted) return false;
    state.prompted = true;

    const list = window.GW_RESTORE?.list;
    const restore = window.GW_FILES?.restoreTo;
    if (typeof list !== 'function' || typeof restore !== 'function') {
      state.result = 'restore-api-unavailable';
      try { window.GW?.toast?.('G-Warp noticed an unexpected stop, but recovery is not available in this build.'); } catch (_) {}
      return false;
    }

    let points;
    try { points = await list.call(window.GW_RESTORE); }
    catch (error) {
      state.result = 'restore-list-failed';
      try { window.GW?.toast?.('G-Warp could not check recovery points: ' + (error?.message || error)); } catch (_) {}
      return false;
    }

    const latest = Array.isArray(points) ? points[0] : null;
    if (!latest) {
      state.result = 'no-restore-point';
      try { window.GW?.toast?.('G-Warp may have stopped unexpectedly, but there is no recovery point yet.'); } catch (_) {}
      return false;
    }

    state.lastRestoreId = latest.id;
    const when = latest.when ? new Date(latest.when).toLocaleString() : 'the latest saved recovery point';
    const project = latest.title ? '“' + latest.title + '”' : 'your last project';
    const title = 'G-Warp may have stopped unexpectedly';
    const message =
      'The previous session ended while a project was running. Restore ' + project +
      ' from ' + when + '? G-Warp will save a recovery point before restoring, ' +
      'so you can return to the current project afterward.';

    let accepted = false;
    try {
      if (typeof window.GW_CONFIRM === 'function') {
        accepted = await window.GW_CONFIRM(title, message, 'Restore project', 'Not now');
      } else {
        accepted = window.confirm(title + '\n\n' + message);
      }
    } catch (_) {
      accepted = false;
    }

    if (!accepted) {
      state.result = 'cancelled';
      return false;
    }

    try {
      const ok = await restore.call(window.GW_FILES, latest.id);
      // app.html's restoreTo currently reports success/failure via its own
      // toast and returns undefined in both paths, so do not overstate outcome.
      state.result = ok === false ? 'restore-failed' : 'restore-invoked';
      return ok !== false;
    } catch (error) {
      state.result = 'restore-failed';
      try { window.GW?.toast?.('Recovery failed: ' + (error?.message || error)); } catch (_) {}
      return false;
    }
  }

  state.syncRuntime = syncRuntime;
  state.checkRecovery = checkRecovery;
  window.addEventListener('click', isStartStopClick, true);
  window.addEventListener('pagehide', clearMarker, { capture: true });
  window.addEventListener('pageshow', syncRuntime);
  const poll = setInterval(syncRuntime, 1500);

  // The normal restore module is created earlier in app.html. Delay only the
  // prompt so the window's dialog APIs and page UI are ready.
  if (state.possibleUncleanEnd) setTimeout(checkRecovery, 900);

  state.dispose = () => {
    clearInterval(poll);
    window.removeEventListener('click', isStartStopClick, true);
    window.removeEventListener('pagehide', clearMarker, true);
    window.removeEventListener('pageshow', syncRuntime);
    clearMarker();
    delete window[INSTALL_KEY];
  };
})();