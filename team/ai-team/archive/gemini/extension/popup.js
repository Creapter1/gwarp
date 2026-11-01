document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('show-button-toggle');

  chrome.storage.sync.get({ showButton: true }, (data) => {
    toggle.checked = data.showButton;
  });

  toggle.addEventListener('change', () => {
    chrome.storage.sync.set({ showButton: toggle.checked });
  });
});
