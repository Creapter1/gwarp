G-Warp Desktop - TEST BUILD (Claude, 2026-10-26). Not a release. Plan: ai-team/ideas/GWARP-DESKTOP-EXE-2026-10-26.md
How it was built (Linux, no Windows needed):
  mkdir app && copy app.html + main.js + package.json into app/
  npm i electron@33.4.11 @electron/packager@18.3.6 --ignore-scripts
  npx electron-packager app G-Warp --platform=win32 --arch=x64 --out=dist --electron-version=33.4.11
Result: dist/G-Warp-win32-x64/G-Warp.exe (PE32+ x86-64 GUI), ~270 MB folder, 115 MB zipped. Binaries are NOT kept in the repo.
