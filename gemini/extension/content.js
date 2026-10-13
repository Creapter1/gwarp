(function() {
  let pillContainer = null;

  function getProjectId() {
    const match = window.location.href.match(/\/projects\/(\d+)/);
    return match ? match[1] : null;
  }

  function isProjectPage() {
    return getProjectId() !== null;
  }

  function removePill() {
    if (pillContainer) {
      pillContainer.remove();
      pillContainer = null;
    }
  }

  function createPill() {
    if (pillContainer || document.getElementById('gwarp-opener-root')) return;

    chrome.storage.sync.get({ showButton: true }, (data) => {
      if (data.showButton === false) return;
      if (!isProjectPage()) return;

      pillContainer = document.createElement('div');
      pillContainer.id = 'gwarp-opener-root';
      pillContainer.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 999999; font-family: Inter, sans-serif;';

      const shadow = pillContainer.attachShadow({ mode: 'open' });

      const wrapper = document.createElement('div');
      wrapper.style.cssText = `
        display: flex;
        align-items: center;
        background: #0b0b14;
        border: 1px solid #8b5cf6;
        border-radius: 9999px;
        box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
        overflow: hidden;
        color: #ececf6;
        font-size: 14px;
        font-weight: 500;
      `;

      const btn = document.createElement('button');
      btn.setAttribute('aria-label', 'Open Scratch project in G-Warp');
      btn.style.cssText = `
        background: transparent;
        border: none;
        color: #ececf6;
        padding: 10px 16px;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        font-family: Inter, sans-serif;
        font-size: 14px;
        font-weight: 600;
      `;
      btn.innerHTML = `<span style="color: #4ade80; text-shadow: 0 0 8px rgba(74, 222, 128, 0.6); font-size: 16px;">⚡</span> Open in G-Warp`;

      btn.addEventListener('focus', () => {
        btn.style.outline = '2px solid #4ade80';
        btn.style.outlineOffset = '2px';
      });
      btn.addEventListener('blur', () => {
        btn.style.outline = 'none';
      });

      btn.addEventListener('click', () => {
        const pid = getProjectId();
        if (pid) {
          window.open(`https://creapter1.github.io/gwarp/app.html#scratch=${pid}`, '_blank');
        }
      });

      const closeBtn = document.createElement('button');
      closeBtn.setAttribute('aria-label', 'Hide G-Warp button permanently');
      closeBtn.style.cssText = `
        background: transparent;
        border: none;
        border-left: 1px solid #8b5cf6;
        color: #ececf6;
        padding: 10px 12px;
        cursor: pointer;
        font-family: Inter, sans-serif;
        font-size: 14px;
        opacity: 0.7;
        transition: opacity 0.2s;
      `;
      closeBtn.textContent = '×';
      closeBtn.addEventListener('mouseover', () => { closeBtn.style.opacity = '1'; });
      closeBtn.addEventListener('mouseout', () => { closeBtn.style.opacity = '0.7'; });
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        chrome.storage.sync.set({ showButton: false }, () => {
          removePill();
        });
      });

      wrapper.appendChild(btn);
      wrapper.appendChild(closeBtn);
      shadow.appendChild(wrapper);
      document.body.appendChild(pillContainer);
    });
  }

  function checkState() {
    if (isProjectPage()) {
      if (!pillContainer && !document.getElementById('gwarp-opener-root')) {
        createPill();
      }
    } else {
      removePill();
    }
  }

  const originalPushState = history.pushState;
  history.pushState = function() {
    originalPushState.apply(this, arguments);
    window.dispatchEvent(new Event('locationchange'));
  };

  const originalReplaceState = history.replaceState;
  history.replaceState = function() {
    originalReplaceState.apply(this, arguments);
    window.dispatchEvent(new Event('locationchange'));
  };

  window.addEventListener('popstate', () => {
    window.dispatchEvent(new Event('locationchange'));
  });

  window.addEventListener('locationchange', () => {
    checkState();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkState);
  } else {
    checkState();
  }
})();
