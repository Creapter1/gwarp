// G-Warp Desktop (test build): opens G-Warp's app.html in its own window. No internet needed for the app itself.
const { app, BrowserWindow, shell } = require('electron');
const path = require('path');
function open() {
  const win = new BrowserWindow({ width: 1440, height: 900, backgroundColor: '#0b0b14', title: 'G-Warp', autoHideMenuBar: true,
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true } });
  win.webContents.setWindowOpenHandler(({ url }) => { if (/^https?:/.test(url)) shell.openExternal(url); return { action: 'deny' }; });
  win.loadFile(path.join(__dirname, 'app.html'));
}
app.whenReady().then(open);
app.on('window-all-closed', () => app.quit());
