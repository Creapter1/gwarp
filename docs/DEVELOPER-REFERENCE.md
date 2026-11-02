# G-Warp Developer Reference

**Purpose:** a technical guide to understanding G-Warp's implementation, locating its major systems, and studying the design of a Scratch-style block-coding editor.

**Source inspected:** `app.html` on the `ai-team` branch, Beta v15.60.0, blob SHA `16b7942c0caa6cf9e20ed9067e53a6e486588fbe`. **Review date:** 2026-11-02. This identifies the inspected snapshot, not necessarily the current public release.

## 1. Project overview

G-Warp (G Wrapper) is an independent, Scratch-style block-coding and creative app for making games, animations, interactive stories and music. It has its own visual design, block editor, runtime, Stage renderer, media tools and project-file handling.

G-Warp is not built on the Scratch VM, TurboWarp VM or PenguinMod VM. Similar block shapes and project formats do not mean the internal implementations are interchangeable. Import/export compatibility varies by feature and must be verified with real round-trip tests.

The main editor is packaged in the root `app.html`, which contains the editor, engine and many inline feature modules. The website is a separate root `index.html`. User and developer documentation lives in `docs/`.

## 2. Where to start

| Goal | Read |
|---|---|
| Learn to use the editor | [Learning Guide](./LEARNING-GUIDE.md), [User Guide](./USER-GUIDE.txt), [UI Reference](./SCREENSHOT-UI-DOCUMENTATION.md) |
| Understand the implementation | [Engineering Reference](./ENGINEERING-REFERENCE.md) |
| Locate source modules and globals | [Source Module Index](./SOURCE-MODULE-INDEX.md) |
| Understand helper and provider data paths | [Helper Data Flow](./HELPER-DATA-FLOW.md) |
| Compare Scratch, TurboWarp and PenguinMod | [Upstream Architecture Reference](./UPSTREAM-ARCHITECTURE-REFERENCE.md) |
| Design a similar editor | [Build Your Own Block-Coding Editor](./BUILD-YOUR-OWN-BLOCK-CODING-EDITOR.md) |
| Understand game-design research notes | [Research Index](../research/RESEARCH-INDEX.md) |

The [app internals diagram](./images/gwarp-app-internals.svg) and [Scratch-to-G-Warp map](./images/scratch-to-gwarp-map.svg) provide visual overviews.

## 3. Architecture at a glance

1. **Application shell:** the editor, styles, engine and many feature modules are bundled in root `app.html`.
2. **Block workspace:** visible blocks are custom DOM elements such as `.scratch-block` and `.block-stack`; this is not an instance of Scratch Blocks.
3. **Runtime:** G-Warp uses its own `Engine` and `ScriptThread` execution model. Scratch VM objects such as `window.vm` and `runtime.sequencer` are not G-Warp APIs.
4. **Stage:** a custom 2D canvas renderer draws the project in a 480×360 logical coordinate space.
5. **Media and tools:** costumes, audio, music, Tilemap, Behaviors, extensions, project interchange and collaboration have their own modules and data paths.
6. **Module order:** later inline modules can extend or replace earlier functions. Read dependent definitions and later patches, not just the first search match.

See the [Source Module Index](./SOURCE-MODULE-INDEX.md) for script IDs, globals and source locations. A module ID is a locator, not a guarantee that the same code exists in every app version.

## 4. Source identity and evidence

The inspected source snapshot sets the app label to Beta v15.60.0. A version label alone does not identify a source revision: local edits, uncommitted changes or different branches can share the same label.

The November 2 screenshot batch was captured from a local snapshot named `2026-11-02_1010_ideas-plus-tab`. Its report did not include the exact source commit SHA. Treat those images as evidence of that named snapshot, not as proof of the exact checked-in source described above.

Use evidence labels precisely:

- **SOURCE-VERIFIED:** the exact source was inspected; it has not necessarily been run.
- **LIVE-TESTED:** the action was performed in a named running build; include the environment and observed result.
- **NOT-TESTED:** no reliable execution result is available.
- **NEEDS-RECAPTURE:** an image is ambiguous, incomplete or does not match the source snapshot.

A feature can be source-verified and not tested at the same time. A screenshot can prove that a control is visible without proving that it works.

## 5. Built-in helper and external AI connection

The checked-in source contains several distinct mechanisms. They should not be described as one connected generative-AI system.

### G-Spark quick helper

The G-Spark bar calls the local `GW_V1571.match(q)` lookup and recipe builder. It compares a request with embedded recipe and tip records. A matching recipe can create block stacks in the selected sprite's workspace. This path is local matching and block construction; it does not by itself establish a connection to a cloud model or a local model server.

### Embedded knowledge packs and research notes

The `gw-v1571-blocks` module contains the recipe/tip matcher. Later inline modules add embedded packs:

- `gw-v4900-gwrap-pack` installs recipe and tip data by converting descriptions into blocks with local builders such as `GW_V1571.blk`, `cblk` and `nestInto`.
- `gw-v4960-chatgpt-gwrap-pack` adds another set of recipes, tips and slash commands to the same helper.

The repository's `research/` folder is a separate Markdown research library. The inspected app source did not show a loader that automatically reads those Markdown files. Adding a research note to the repository does not, by itself, change the running helper.

### Bug questionnaire and AI Report

The inspected `gw-v1580-aihelp` module includes a problem questionnaire and report-note functionality that stores entries in browser storage. Local browser storage is not the same as sending information to a provider.

### Developer-only Anthropic connection

The inspected source also includes a developer-mode-only provider connection path. It reads a provider key from browser session/local storage and sends a request to Anthropic's Messages API. The request includes the user's question and a project summary containing sprite names, the selected sprite, variable names and limited text from selected-sprite scripts. Treat this as an external data transfer: users should understand what project context is sent, protect their API key, and account for provider charges. Source inspection is not proof that a live request was successfully tested.

### Ollama and local model support

The inspected `app.html` blob did **not** establish an implemented connector to Ollama, llama-server, LM Studio, localhost port 11434, an in-app model downloader or browser WebGPU inference. A screenshot or a local installation of Ollama is not enough to prove that G-Warp is connected to it. On this source baseline, an in-app Ollama/local-model integration is **not source-verified**.

## 6. Understanding the upstream architectures

Scratch, TurboWarp and PenguinMod are useful technical references, but G-Warp's implementation is independent.

- Scratch's editor is organized around cooperating GUI, block-workspace, VM, renderer, paint, storage and audio components. Its current editor packages are in the [Scratch editor monorepo](https://github.com/scratchfoundation/scratch-editor); [Scratch Blocks](https://github.com/scratchfoundation/scratch-blocks) and [Scratch Audio](https://github.com/scratchfoundation/scratch-audio) remain separate projects.
- TurboWarp is a Scratch mod with additional features and a compiler option that can compile project scripts to JavaScript. See its [documentation](https://docs.turbowarp.org/) and [interpreter/compiler explanation](https://docs.turbowarp.org/how).
- PenguinMod is a TurboWarp-based mod with additional features and extensions. See the [documentation](https://docs.penguinmod.com/) and [GitHub organization](https://github.com/PenguinMod).

For the detailed component map and source-reading route, see [Upstream Architecture Reference](./UPSTREAM-ARCHITECTURE-REFERENCE.md).

## 7. Building a similar editor

A robust implementation is more than a palette of draggable shapes. It needs a consistent program model and a complete path from editing to execution and saving.

A practical build order is:

1. Create the editor shell: block palette, workspace, Stage, sprite list and media tabs.
2. Define block types, typed inputs, parent/next relationships and nested control structures.
3. Implement dragging, snapping, nesting, detaching, deletion, undo and redo.
4. Build a runtime and scheduler for events, threads, waits, loops, broadcasts and stop behavior.
5. Render sprites and Stage content with consistent coordinates, transforms, layers and hit-testing.
6. Add costume and sound editing with reliable save-back.
7. Implement project import/export and verify round trips in a fresh session.
8. Add extensions and advanced systems only after the core editor/runtime/data model is reliable.

The [Build Your Own Block-Coding Editor](./BUILD-YOUR-OWN-BLOCK-CODING-EDITOR.md) guide expands each stage with design details and examples.

## 8. Tracing a feature through the app

For any feature, follow the full path:

**visible control → event handler → model/state change → runtime, drawing or audio effect → save/load path.**

G-Warp has accumulated multiple inline modules, so inspect the original definition and later patches. A visible button, source function, saved data and working end-to-end behavior are separate questions.

## 9. Project independence and compatibility

G-Warp is an independent fan project and is not made by or affiliated with Scratch, the Scratch Foundation, MIT, TurboWarp or PenguinMod. Preserve third-party credits and licences when using external code or assets. Do not assume Scratch-style blocks guarantee complete project interchange; test each supported feature and file path.

---

For user-facing instructions, continue to the [Learning Guide](./LEARNING-GUIDE.md) and [Complete User Guide](./USER-GUIDE.txt).
