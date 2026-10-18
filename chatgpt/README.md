# G-Warp — ChatGPT Work Folder

Start with the repository's [AI-TEAM.txt](../AI-TEAM.txt), then [TODO.txt](../TODO.txt). Follow the shared rules: never rewrite `app.html`; submit small, self-contained work files and matching notes.

## App documentation
1. [G-Warp implementation map](../docs/ENGINEERING-REFERENCE.md) — actual code paths, tool modules, runtime, rendering, file formats, and Scratch source comparison.
2. [Complete user guide](./USER-GUIDE.txt) — practical instructions for the current app.
3. [Screenshots and UI behavior](./SCREENSHOT-UI-DOCUMENTATION.md) — controls and real UI captures.
4. [Engine map](../ENGINE-MAP.txt) — verified names and hooks; recheck current source before integration.
5. [Live UI verification](../docs/LIVE-UI-VERIFICATION.txt) — Claude-reported results for its limited test scope and remaining gaps.
6. [UI behavior audit](./UI-AUDIT.txt) — detailed source review; do not repeat it unless relevant source changed.
7. [Documentation index](../docs/README.md) — wider project documentation.

Visual evidence note: `images/gwarp-ui-map.svg` and `images/gwarp-interactions-map.svg` are schematics, not screenshots. Real browser screenshots are under `../docs/screens/`.

## Work handed to Claude
- [Freeze-safety patch](./clone-safety.js) + [notes](./NOTES-clone-safety.txt).
- [Open-in-G-Warp link patch](./scratch-link.js) + [notes](./NOTES-scratch-link.txt).

## Recent static review
- [Buffy-labelled add-ons/settings review](./BUFFY-ADDONS-SETTINGS-REVIEW-2026-10-18.txt): syntax checks passed; static review only; not integrated or browser-tested; archive authorship is unverified.

## Important status
The live report corrects UI-AUDIT finding #1: clicking Looks once did navigate to the matching palette blocks. Do not report that behavior as a confirmed bug. Other listed issues should remain labelled according to their evidence status.
