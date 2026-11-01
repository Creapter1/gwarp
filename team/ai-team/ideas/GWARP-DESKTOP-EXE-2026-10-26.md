# G-Warp Desktop (.exe) with the AI already inside — plan

**Status:** a test build exists (Claude, 2026-10-26, not a release). Owner: *"for the download version, which is gonna be 100% full EXE ...
we can just automatically install the AI model into it. Are you able to create EXE? 100% fledged software EXE."*

## What was proven today

- Claude built **`G-Warp.exe`** (Windows 64-bit) from `app.html` with **Electron** (the same Chromium engine as Chrome), in the cloud,
  with nothing needed on the owner's PC. Check: `file` says `PE32+ executable (GUI) x86-64, for MS Windows`.
- Size: about 270 MB unpacked, **115 MB zipped**. Most of that is Chromium itself; G-Warp is 2.7 MB of it.
- Settings: own window (1440×900, dark), no menu bar; the page is sandboxed with no Node access (it can't touch the PC); web links open in the normal browser.
- **NOT-TESTED on Windows yet:** Claude can't run Windows here. The owner runs it once and reports.
- **No icon yet, not signed.** Windows will say "Windows protected your PC" → *More info* → *Run anyway*.

## The real version (steps)

| Step | What | Notes |
|---|---|---|
| 1 | **Installer** (`G-Warp-Setup.exe`) with a Start-menu entry, desktop icon and uninstall | electron-builder (NSIS). Built by **GitHub Actions on a Windows computer** every time we tag a release, so it's built the proper way, automatically, for free (the repo is public). |
| 2 | **Where people download it:** GitHub **Releases** | Release files are kept separately from the code (each file up to 2 GB). They don't fill our 1 GB of code space or the website's monthly downloads. (Check the current GitHub limits before the first upload.) |
| 3 | **G-Warp icon + name + version** in the exe | G-Warp's own icon (no Scratch look). |
| 4 | **AI inside, no download:** the model files go **inside the installer**, and G-Warp loads them from the app folder | Electron = Chromium, so WebGPU and WebLLM work like in Chrome. **Plan B for PCs without a good GPU:** run the model on the CPU (e.g. llama.cpp through Node). Installer size: ~120 MB + the model (0.2–0.7 GB) = **about 0.35–0.85 GB**. |
| 5 | **Updates:** the app checks GitHub Releases and offers "Update to vX" | electron-updater. Only with the user's OK. |
| 6 | **Saving:** real "Save" / "Save as" to the PC (.sb3), recent projects, double-click an .sb3 to open it in G-Warp | Optional, later. |
| 7 | **Code signing** (removes the Windows warning) | A certificate costs money every year. Later, the owner decides. |
| 8 | Mac / Linux versions | The same build system can make them. Later. |

**Rules that still apply:** the app never runs JavaScript blocks; the AI stays inside G-Warp; there are no accounts; nothing is sent
without a parent's OK for under-13s; and the AI model's licence must allow shipping it inside the app (ChatGPT checks this in AIM-0).
The web version stays. The desktop version is an extra, not a replacement.
