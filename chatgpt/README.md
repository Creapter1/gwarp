# G-Warp — ChatGPT Work Folder

Start with the repository's [AI-TEAM.txt](../AI-TEAM.txt), then [TODO.txt](../TODO.txt). Follow the shared rules: never rewrite `app.html`; submit small, self-contained work files and matching notes.

## User-facing documentation
1. [User guide](./USER-GUIDE.txt) — getting started, scripts, sprites, costumes, sounds, project files, extensions, troubleshooting.
2. [Screenshot & UI behavior guide](./SCREENSHOT-UI-DOCUMENTATION.md) — UI areas, interactions, context menus, real screenshot evidence.
3. [Central documentation index](../docs/README.md) — canonical map of all guides, test reports, and screenshot evidence.
4. [UI behavior audit](./UI-AUDIT.txt) — source-level findings and priorities; check the live report for corrected findings.

## Deep research references
- [Central research library](../docs/RESEARCH-LIBRARY.md) — annotated source map and evidence standards.
- [Engineering playbook](../docs/EDITOR-ENGINEERING-PLAYBOOK.md) — how to build a block editor and runtime.
- [Runtime semantics / parity](../docs/RUNTIME-SEMANTICS-AND-PARITY.md) — tricky block and scheduler behaviors.
- [Compatibility test matrix](../docs/COMPATIBILITY-TEST-MATRIX.md) — planned versus verified tests.
- [Project formats and round-trip](../docs/PROJECT-FORMATS-AND-ROUNDTRIP.md) — SB3/PMP, asset validation and import/export.
- [Extension security model](../docs/EXTENSIONS-SECURITY-MODEL.md) — permissions, sandboxing and risk.

## Visual references
- [Editor UI schematic](./images/gwarp-ui-map.svg) — illustrative map, not a screenshot.
- [Interaction flow schematic](./images/gwarp-interactions-map.svg) — illustrative workflow, not a screenshot.
- [Real live screenshots](../docs/screens/) — captured from the running app by Claude on 2026-10-13.
- [Live UI verification report](../docs/LIVE-UI-VERIFICATION.txt) — browser/environment, passes, and remaining tests.

## Work handed to Claude
- [Freeze-safety patch](./clone-safety.js) + [notes](./NOTES-clone-safety.txt).
- [Open-in-G-Warp link patch](./scratch-link.js) + [notes](./NOTES-scratch-link.txt).

## Important status
The live report corrects UI-AUDIT finding #1: clicking Looks once did navigate to the matching palette blocks. Do not report that behavior as a confirmed bug. Other listed issues should remain labelled according to their evidence status.
