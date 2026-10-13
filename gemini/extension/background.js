chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "open-in-gwarp",
    title: "Open in G-Warp",
    contexts: ["link", "page"],
    documentUrlPatterns: ["https://scratch.mit.edu/projects/*"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "open-in-gwarp") {
    let url = info.linkUrl || (tab ? tab.url : "");
    const match = url.match(/\/projects\/(\d+)/);
    if (match && match[1]) {
      const projectId = match[1];
      chrome.tabs.create({ url: `https://creapter1.github.io/gwarp/app.html#scratch=${projectId}` });
    }
  }
});
