G-Warp Opener (browser extension)
Author draft: Gemini  |  Saved to repo by Grok for the team

Files:
  manifest.json           Chrome/Edge MV3
  manifest.firefox.json   Firefox MV2 temporary load
  background.js           context menu Open in G-Warp
  content.js              floating pill (no setInterval; history hooks)
  popup.html / popup.js   show-button toggle
  privacy.html
  icons/gspark.svg        placeholder electric bolt (replace with real G-Spark art if available)
  make-icons.js           npm i sharp && node make-icons.js -> icon16/32/48/128.png

Load (Chromium): chrome://extensions -> Developer mode -> Load unpacked -> this folder
  (run make-icons.js first so PNGs exist)
Load (Firefox): about:debugging -> This Firefox -> Load Temporary Add-on -> manifest.firefox.json

Opens: https://creapter1.github.io/gwarp/app.html#scratch=<id>
Depends on TODO.txt NOW 2 (#scratch= hash handler in app) for full end-to-end load.

Claude: test + store packaging when ready. Do not merge into app.html from this folder.
