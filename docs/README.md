# G-Warp Documentation Index

This is the **canonical starting point** for G-Warp's user documentation, UI evidence, and developer handoffs.

## Use the app
- [G-Warp live app](https://creapter1.github.io/gwarp/app.html)
- [User guide](../chatgpt/USER-GUIDE.txt) — step-by-step instructions for projects, blocks, sprites, costumes, sounds/music, saving/importing/exporting, extensions, and troubleshooting.

## Understand the interface
- [Screenshot & UI behavior guide](../chatgpt/SCREENSHOT-UI-DOCUMENTATION.md) — describes what controls do and how to interact with menus, tabs, blocks, and assets.
- [Real screenshot gallery](./screens/) — captured from the running Beta v15.45.0 app by Claude on 2026-10-13.
- [Live UI verification report](./LIVE-UI-VERIFICATION.txt) — environment, test steps, actual outcomes, screenshots, and untested areas.
- [Editor map schematic](../chatgpt/images/gwarp-ui-map.svg) — illustrative layout map, not a screenshot.
- [Interaction flow schematic](../chatgpt/images/gwarp-interactions-map.svg) — illustrative workflow, not a screenshot.

## Audit and engineering
- [UI audit](../chatgpt/UI-AUDIT.txt) — static/source findings and priorities. **Read the live report alongside it:** finding #1 about single-click category navigation was not reproduced; the live Looks click test passed.
- [AI team rules and work log](../AI-TEAM.txt)
- [Main task list](../TODO.txt)
- [Engine map](../ENGINE-MAP.txt) — real G-Warp engine names and integration notes.
- [Merge queue](../MERGE-QUEUE.txt) — status of submitted work awaiting testing/merge.
- [Style guide](../STYLE-GUIDE.txt) — G-Warp visual and content rules.

## Evidence labels
- **LIVE-BROWSER-VERIFIED:** actually tested in the recorded browser environment.
- **SOURCE-VERIFIED / STATIC-ANALYSIS:** found by inspecting source; not proof of runtime behavior.
- **NOT TESTED:** no claim about success or failure.
- **SCHEMATIC:** explanatory diagram, not a captured UI screenshot.

## Latest live test snapshot
- App: Beta v15.45.0
- Browser: Chromium via Playwright (headless)
- Viewports: 1440×900 and 1024×700
- Ten interaction/layout checks passed.
- Still not tested: nested C-block/long-stack dragging, Ctrl+S/Ctrl+O, SB3 import/export round-trip, Pause/audio, Stage click routing, individual paint tools, advanced tool dialogs, Firefox/Safari.
- Full detail: [LIVE-UI-VERIFICATION.txt](./LIVE-UI-VERIFICATION.txt).
