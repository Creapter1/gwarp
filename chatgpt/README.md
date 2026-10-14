# G-Warp — ChatGPT Work Folder

Start with the repository's [AI-TEAM.txt](../AI-TEAM.txt), then [TODO.txt](../TODO.txt). Follow the shared rules: never rewrite `app.html`; submit small, self-contained work files and matching notes.

## App documentation
1. [G-Warp implementation map](../docs/ENGINEERING-REFERENCE.md) — actual code paths, tool modules, runtime, rendering, file formats, and Scratch source comparison.
2. [Complete user guide](./USER-GUIDE.txt) — practical instructions for the current app.
3. [Screenshots and UI behavior](./SCREENSHOT-UI-DOCUMENTATION.md) — controls and real UI captures.
4. [Engine map](../ENGINE-MAP.txt) — verified names and hooks.
5. [Live UI verification](../docs/LIVE-UI-VERIFICATION.txt) — tested behavior and remaining gaps.
6. [UI behavior audit](./UI-AUDIT.txt) — detailed source review.

## Work handed to Claude
- [Freeze-safety patch](./clone-safety.js) + [notes](./NOTES-clone-safety.txt).
- [Open-in-G-Warp link patch](./scratch-link.js) + [notes](./NOTES-scratch-link.txt).

## Important status
The live report corrects UI-AUDIT finding #1: clicking Looks once did navigate to the matching palette blocks. Do not report that behavior as a confirmed bug. Other listed issues should remain labelled according to their evidence status.
