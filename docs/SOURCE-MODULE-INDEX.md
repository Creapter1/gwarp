# G-Warp Source Module Index

This is a navigation map into the large root app.html. It is intended to stop an AI or developer from guessing internal APIs or reading the file without a plan.

**Source inspected:** ai-team/app.html  
**App stamp:** window.GW_BUILD.version === '15.60.0' / Beta v15.60.0  
**Blob SHA:** 16b7942c0caa6cf9e20ed9067e53a6e486588fbe  
**Review date:** 2026-11-02.

The module IDs below are script IDs in the HTML. They are not separate files, and some retain old version numbers. The order of scripts matters: later modules extend or replace earlier behavior. Always inspect the named module and then search for later patches to the same global, DOM ID or function.

## 1. Core rule: G-Warp is not Scratch VM

G-Warp has its own engine. Do not assume that Scratch VM objects or methods exist here.

| G-Warp concept | Current source/API locator | Notes |
|---|---|---|
| Main engine | window.Engine | Sprites, threads, state, variables/lists, events and timing |
| General helpers | window.GW | Helpers and bridge functions; not every function is a stable external API |
| Undo/history | window.GW8 | Editing history helpers |
| Runtime thread | ScriptThread instances inside Engine.threads | The class is defined in app scope; inspect the current implementation |
| Costume editor | window.GW_V15_COSTUME_EDITOR | Vector/bitmap costume editing |
| Vector editor | window.GW_VECTOR_EDITOR | SVG editing/selection tools |
| AI recipe engine | window.GW_V1571 | Defined in gw-v1571-blocks; owns local recipe/tip matching, block builders and project checks |
| G-Spark bar | window.GW_SPARK_BAR | UI actions: ask, toggle, undo, mount |
| AI helper extension | window.GW_V1580_AIHELP | Bug reports, developer AI request path and anti-freeze helpers |
| SB3 import/export | window.GW_V1580_SB3, window.GW_V1580_SB3_EXPORT | Import/export entry points; inspect returned methods |
| Tilemap / Behaviors | window.GW12, Engine.tilemap, Engine.behaviorSystem | State and UI are split across modules |
| Live LAN | window.GW13 | WebSocket collaboration client state |
| Build stamp | window.GW_BUILD | Current public version label/stamp |

**Do not invent** window.vm, runtime.sequencer, scratch-render, Engine.touching, or other Scratch/TurboWarp objects as G-Warp extension points. Verify a symbol before depending on it.

## 2. Important inline modules

| Script ID | Subsystem | Where to start |
|---|---|---|
| gw-v1554-global-alias | Build stamp and global aliases | Sets GW_BUILD to 15.60.0 and exposes Engine / GW on window |
| gw-v1580-runner | Runtime execution | Script threads, execution and scheduler updates |
| gw-v1580-myblocks | Custom procedures | Definition/call UI, parameter blocks and runtime support |
| gw-v7-reconciliation | Extension compatibility bridge | Creates a Scratch-shaped registration/runtime adapter |
| gw-v1510-ext | Extension library and extension runtime | Extension source/loading, block definitions and adapters |
| gw-v1510-files | Project file controls | Load, Save, Save As and restore point integration |
| gw-v1580-sb3 | Scratch 3 import | ZIP reading, targets, assets, blocks and unsupported-block reporting |
| gw-v1580-sb3export | Scratch 3 export | Project package building and G-Warp-only feature warnings |
| gw-v1518-penguinmod | PenguinMod protobuf import | Reads PenguinMod protobuf project data and converts it |
| gw-v1556-instrument-studio | Instruments and audio synthesis | Instrument definitions, sound shaping, note scheduling |
| gw-v1570-song-maker | Song Maker | Genre/mood/theme, parts/stems and generated song state |
| gw-v1580-loop | Loop Maker | Loop creation and save-to-sprite path |
| gw-v1700-vector-editor | Vector costume editor | SVG geometry and vector tool state |
| gw-v17010-bitmap | Bitmap costume editor | Bitmap paint tools and bitmap asset workflow |
| gw-v15162-anim | Animation tab / rig UI | Rig, frames, poses and animation authoring |
| gw-v1700-anim-blocks | Animation blocks | Runtime-facing animation block integration |
| gw-v1580-tiles | Tilemap / Behavior Designer UI | Tilemap and behavior editor dialogs and controls |
| gw-v13-live-lan | Live LAN collaboration | WebSocket, peers, rooms, local profile and project sync |
| gw-v1571-blocks | Local GWrap AI recipe engine and block slots | GW_V1571.match, built-in recipes/tips, blk/cblk builders, typed slots and project checks |
| gw-v4900-gwrap-pack | Embedded recipe/tip knowledge pack | JSON PACKS converted into G-Warp blocks and installed into GW_V1571 |
| gw-v4960-chatgpt-gwrap-pack | Additional GWrap AI pack and slash commands | Adds recipes/tips and safe commands; uses the existing local block builder |
| gw-v1555-gspark-bar | G-Spark UI | Small G button, prompt bar and local recipe build/undo |
| gw-v1580-aihelp | GWrap AI helper | Bug questionnaire, AI Report, developer-mode API key path and stuck-script prompt |
| gw-v1519-cloud | Cloud variables | Separate cloud-variable service path; do not confuse with AI connectivity |
| gw-v1555-stage-hit-shield | Stage interaction/hit shielding | Stage target interaction protection |
| gw-v1552-stage-fit | Stage fit/layout | Stage dock and fit behavior |
| gw-v1551-stage-layer-lock | Stage layer order | Stage draw-order handling |
| gw-v1553-stage-interaction-cleanup | Stage interactions | Cleanup for pointer/hit-test paths |

Search app.html for these exact IDs. Then search for the public globals listed above and see whether a later module changes them.

## 3. High-level execution path

For a normal block script, trace:

1. The selected sprite owns the script stack in the editor.
2. A start/event block identifies when the stack should begin.
3. The runtime creates or schedules a thread for that target.
4. The thread advances block operations, including nested C-blocks, procedures and waits.
5. The Stage loop draws the new sprite state on the 480×360 logical coordinate plane.
6. Project serialization stores target state and supported blocks so it can be restored.

Do not assume the DOM is merely a disposable view: the inspected G-Warp runtime reads the live workspace structure in important places. Check the exact current runner before changing the data model.

## 4. G-Warp AI source flow

The current checked-in build has several distinct flows:

### Embedded recipe/tip packs and repository research notes

gw-v1571-blocks defines the helper's built-in local recipes, tips and the GW_V1571 matching/block-building interface. gw-v4900-gwrap-pack and gw-v4960-chatgpt-gwrap-pack provide later embedded pack data. They install records into that helper at app startup.

The separate root research/ folder is a repository library of game mechanics and prototype plans. No direct runtime loader path from the checked-in app blob to those Markdown files was found. They are useful material for AIs and recipe authors, but adding a Markdown note does not automatically make it a G-Spark answer.

### G-Spark quick bar — local

gw-v1555-gspark-bar calls GW_V1571.match(q). If the best result is a recipe, it calls the local recipe builder, which inserts block stacks into the current workspace and offers undo. If the match is a tip, it displays the tip. This path does not call a remote AI provider in the inspected implementation.

### Bug questionnaire / AI Report — browser storage

gw-v1580-aihelp collects the user's bug description and stores it through GW_BUG_REPORTS in localStorage. Saved AI Report notes are also browser-local. The code's static report/tip/recipe handling does not itself mean an external AI was contacted.

### Developer-only Anthropic request

The same gw-v1580-aihelp module includes a developer-mode-only “Connect a real AI” panel. The request is sent to https://api.anthropic.com/v1/messages. The user question is combined with a project summary containing sprite names, selected sprite, variable names and snippets from up to 12 top-level scripts on the selected sprite. The API key is kept in sessionStorage unless the user enables “Remember,” in which case it is kept in localStorage.

No real key was entered during the November screenshot run. The default G-Spark screenshot is not evidence of a connected provider.

### Local models — currently not established by this source

The checked-in blob reviewed here does not contain an Ollama/llama-server/LM Studio connector, a /models command, port 11434, WebGPU inference or an in-app local-model download UI. The November screenshot showing “0 models found” has no matching current source path in this blob. Treat that screenshot as a source mismatch and request the exact build/commit before documenting a local-model connector.

## 5. File format boundaries

- .sb3 is the Scratch 3 project import/export path handled by the SB3 modules.
- PenguinMod protobuf projects use a separate conversion path in gw-v1518-penguinmod.
- A ZIP-style .pmp path is not necessarily the same as protobuf-form PenguinMod project data.
- G-Warp-only systems such as extensions, Tilemap and Behaviors require compatibility decisions when exported to Scratch.
- “File opens” is not proof that every asset, block, monitor, rotation centre or extension survived.
- Cross-editor round-trip must be tested in the actual target editor, not inferred from a successful download.

## 6. Dependency and module-order reminders

The app is one HTML file but uses external assets/libraries, including CDN-loaded Tailwind CSS, Font Awesome and JSZip in the inspected source. An offline build/test should verify those dependencies separately.

The source contains many inline scripts. A script ID like gw-v1580-sb3 is a locator, not a standalone module. Later scripts may patch the earlier code. Before proposing a change:
1. find the target script ID;
2. inspect its dependencies and global names;
3. search for later writes/overrides of those names;
4. locate the UI entry point;
5. locate serialization and load paths;
6. record tests and limitations.

## 7. How to keep this index current

When a release or source change alters the app:
- read the current GW_BUILD value from the actual source;
- record the source branch, commit and blob SHA;
- add or revise the affected script ID, globals and persistence path;
- link the test report;
- mark untested behavior explicitly;
- do not infer the current app version from an old script ID or the last comment at end-of-file.

**Related:** [Developer Reference](./AI-REFERENCE.md) · [Helper Data Flow](./AI-DATA-FLOW.md) · [Engineering Reference](./ENGINEERING-REFERENCE.md) · [Upstream Architecture](./UPSTREAM-ARCHITECTURE-REFERENCE.md) · [Build Your Own](./BUILD-YOUR-OWN-BLOCK-CODING-EDITOR.md)
