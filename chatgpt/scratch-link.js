(() => {
  'use strict';
  if (window.GW_SCRATCH_LINK_HANDOFF) return;
  if (window.GW_FEATURE_OFF?.('scratchLink')) return;

  const MARKER = '__gwScratchLinkHandled';
  const match = String(window.location?.hash || '').match(/^#scratch=(\d{1,12})$/i);
  if (!match) return;
  const projectId = match[1];

  function clearHash() {
    try {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    } catch (_) {}
  }
  function start(n = 0) {
    if (window[MARKER]) return;
    const confirm = window.GW_CONFIRM;
    const web = window.GW_WEB;
    if (typeof confirm !== 'function' || typeof web?.load !== 'function') {
      if (n < 80) return setTimeout(() => start(n + 1), 250);
      return;
    }

    window[MARKER] = true;
    clearHash(); // Refreshing or cancelling cannot accidentally repeat the prompt.
    const message = 'Load this shared Scratch 3 project from the web into G-Warp? Only the project number is read from this link. Project downloads are handled by G-Warp’s existing web loader.';
    Promise.resolve(confirm('Open Scratch project #' + projectId + '?', message, 'Load project', 'Cancel'))
      .then(yes => {
        if (!yes) return;
        return web.load(projectId);
      })
      .catch(error => {
        try { window.GW?.toast?.('Could not open the Scratch project: ' + String(error?.message || error)); } catch (_) {}
      });
  }

  window.GW_SCRATCH_LINK_HANDOFF = { projectId };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => start(), { once: true });
  } else {
    start();
  }
})();
