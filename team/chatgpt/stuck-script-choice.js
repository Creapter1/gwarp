(() => {
  'use strict';

  /*
   * Clarify G-Warp's existing stuck-warp alert.
   * app.html already supplies the dark alert, Stop action, and Resume action.
   * This only changes the user-facing wording to the requested simple phrase.
   *
   * Switch off before loading:
   *   window.GW_DISABLE_CHATGPT_STUCK_SCRIPT_COPY = true;
   */
  const DISABLE_KEY = 'GW_DISABLE_CHATGPT_STUCK_SCRIPT_COPY';
  const INSTALL_KEY = '__GW_CHATGPT_STUCK_SCRIPT_COPY_V1__';
  if (window[DISABLE_KEY] === true || window[INSTALL_KEY]) return;

  const guard = window.GW_WARP_GUARD;
  if (!guard || typeof guard.onStuck !== 'function') {
    console.warn(
      '[G-Warp stuck-script copy] Not installed: expected the existing ' +
      'GW_WARP_GUARD.onStuck alert handler. Load this module after app.html.'
    );
    return;
  }

  const originalOnStuck = guard.onStuck;
  const state = { installed: true, dispose: null };
  window[INSTALL_KEY] = state;

  function showClearerCopy(info) {
    const result = originalOnStuck.apply(this, arguments);
    const alert = document.getElementById('gw8WarpAlert');
    if (!alert) return result;

    const heading = alert.querySelector('#gw8WarpAlertTitle');
    if (heading) heading.textContent = 'A script is taking too long';

    const keepWaiting = alert.querySelector('#gw8WarpResume');
    if (keepWaiting) {
      keepWaiting.textContent = 'Keep waiting';
      keepWaiting.setAttribute('aria-label', 'Keep waiting for the script');
      keepWaiting.title = 'Resume the project and keep waiting for the script';
    }
    return result;
  }

  guard.onStuck = showClearerCopy;
  state.dispose = () => {
    if (guard.onStuck === showClearerCopy) guard.onStuck = originalOnStuck;
    delete window[INSTALL_KEY];
  };
})();