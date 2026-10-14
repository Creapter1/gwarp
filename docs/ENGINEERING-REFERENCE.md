# G-Warp Implementation Map: How the Actual App Works

This is the main technical guide to **the application in this repository**. It describes the real screens, the real runtime, the actual tool modules, how data moves through G-Warp, and how that compares with Scratch 3's implementation. It is not a generic programming tutorial or an AI-agent guide.

**Source baseline used:** `app.html` from the repository's main branch, titled “G-Warp Beta”; the companion [ENGINE-MAP.txt](../ENGINE-MAP.txt) records Beta v15.45.0 and the inspected source SHA `7ce527ca2908c63bbdfe642856ca29fd82178648`. The source includes later feature modules whose internal IDs keep older version numbers. Re-check the live file before relying on any implementation detail.

## Start here: which file explains what?

- **[app.html](../app.html)** is the actual application: the interface, the custom engine, the Stage, block editing, media tools and later features are packaged inside this large HTML file.
- **[index.html](../index.html)** is the website entry page. It is not the project runtime.
- **[ENGINE-MAP.txt](../ENGINE-MAP.txt)** is the short, critical list of real G-Warp globals and hooks.
- **[Complete user guide](../chatgpt/USER-GUIDE.txt)** tells you how to operate the current app.
- **[UI/screenshots guide](../chatgpt/SCREENSHOT-UI-DOCUMENTATION.md)** names visible controls and contains real browser captures.
- **[Live UI verification](./LIVE-UI-VERIFICATION.txt)** records the actions that were actually tested and the remaining gaps.
- **[UI audit](../chatgpt/UI-AUDIT.txt)** is a detailed source inspection. A static concern in that file is not automatically a reproduced bug.
- **[TODO](../TODO.txt)** and **[MERGE-QUEUE](../MERGE-QUEUE.txt)** show what is current work and what is only a candidate patch.

## How it is packaged

The application logic is in one `app.html`, but **“single HTML file” does not mean “no external dependencies.”** The inspected source includes Tailwind CSS from its CDN, Font Awesome's stylesheet from its CDN, and JSZip 3.10.1 from a CDN. Some project-file operations also have G-Warp's own ZIP/SB3 code. An offline build or test should check these external dependencies separately: copy the required libraries locally or deliberately replace them, then confirm the same interface and import/export behavior.

## 1. The app in one picture

![G-Warp application internals](./images/gwarp-app-internals.svg)

G-Warp is built as a **single HTML application with many inline modules**. It is not built by importing the Scratch GUI and Scratch VM packages. The file begins with the visual interface and its styles, contains the initial engine/runtime, then adds feature modules and compatibility fixes in later script elements.

Some `<script>` elements are executable JavaScript; others are embedded JSON manifests, reports or plain-text data. A script ID such as `gw-v1580-sb3` identifies a feature layer in the file. It does not mean the module is a separate file, nor that its historical number is the current public app version.

The source's top-level UI comments mark these visible areas: main workspace, category rail, block palette, coding workspace, right-hand Stage/sprite/assets pane, sprite properties, sprites grid, Costumes, Sounds and block context menu.

## 2. What the user sees — and which source area owns it

![G-Warp editor map](./images/gwarp-editor-map.svg)

The main screen is divided into a few connected work areas:

**The category rail and block palette** are for finding instructions. Clicking a category changes the palette; palette blocks are dragged into the workspace. The palette's contents must match blocks the runtime actually supports.

**The code workspace** is assembled from DOM elements. The inspected source uses `.scratch-block` for blocks and `.block-stack` for stacks. The workspace has a special pointer-drag path, connection checking and snap-preview line. This is not a React Scratch Blocks workspace; the code is G-Warp's own implementation.

**The Stage** previews the project. The Stage canvas is a 480×360 logical scene. The CSS size of the canvas can change to fit the dock, but the project coordinate system must remain the same. Start, Pause and Stop live in G-Warp's top bar; G-Warp keeps its own visual design rather than copying Scratch's artwork.

**The sprite panel** chooses the object being edited and offers sprite properties and sprite actions. The selected sprite owns its scripts, costumes and sounds; the Stage itself owns backdrop and stage-wide state.

**Code, Costumes and Sounds** switch the selected target's editing view. When drawing, always check the selected sprite and active costume before changing media.

**Extra tools** include Extensions, Instrument Studio, Song Maker/Loop Maker, Tilemap, Behavior Designer, project health/restore, advanced settings, physics-related features, animation tools, fullscreen/high-quality Stage options, sprite/backdrop libraries, Bug Hunter and Live LAN collaboration. The availability and details of each tool depend on the current source build; the modules below identify their implementation entry points.

## 3. How a block becomes a running script

The easiest way to understand G-Warp is to follow one action from the screen through to the Stage.

### Step A — the user places blocks

The core functions `setupDragAndDrop()`, `getWorkspacePoint()` and `collectSnapCandidate()` manage block movement. The code listens for pointer events, identifies the dragged stack, converts the pointer location into workspace coordinates and searches for a nearby compatible connection.

The snap code distinguishes value blocks from statement stacks, treats hat and cap blocks specially, considers nested `.block-c-body` areas, and compensates for workspace zoom and scrolling. The source's candidate threshold is 46 screen pixels before the zoom conversion. A visible snap line previews the proposed connection before release.

After a drag is finished, the stack must be either attached to a valid place or left as a standalone stack. This code is one of the most important places to inspect for reports about invisible hit areas, C-blocks, nested stacks, moving a stack out of a loop, and blocks that look connected but fail when run.

### Step B — the runtime makes threads

G-Warp's runtime defines a `ScriptThread` class. In the inspected source, each thread carries the target/sprite, a block sequence, a program counter (`pc`), a call stack, a wait deadline (`waitUntil`) and a finished flag. Its `step()` method advances execution when the thread is not finished, the project is running and any wait deadline has passed.

The initial `startGreenFlagExecution()` scans top-level `.block-stack` elements for a `when_flag` hat and creates threads. Later modules add or refine live editing, clone behavior, nested control blocks and My Blocks; the source explicitly says the runner reads blocks from the workspace while they run. Because those later modules patch the original runtime, use the current whole file and [ENGINE-MAP.txt](../ENGINE-MAP.txt) before editing execution code.

**Do not use Scratch VM names as though they were G-Warp hooks.** G-Warp does not expose `window.vm` or `runtime.sequencer`. The recorded main runtime object is `window.Engine`; the real thread step is `ScriptThread.step()`. The engine map says `ScriptThread` itself is not exported globally, though its instances are reachable through `Engine.threads`.

### Step C — the animation loop advances work and draws the Stage

The base Stage setup is `setupStage()`, with an animation-frame loop named `renderLoop()`. Each iteration calculates elapsed time/FPS, clears the canvas, selects a draw order, steps active threads when the project is running and not paused, removes finished threads, and draws visible sprites.

The documented renderer places a sprite using the Stage center plus its logical coordinates. The core transform is based on `ctx.translate(240 + sprite.x, 180 - sprite.y)`; rotation and size/costume transforms are applied around that location. Mouse coordinates are transformed back from the displayed canvas rectangle into the same 480×360 logical space. That shared mapping is critical: if drawing and pointer mapping disagree, a sprite can appear in one place while click/touch detection acts somewhere else.

The base loop uses `requestAnimationFrame`; a later turbo path can take additional script passes within a bounded frame-work window. Stage fitting, layer ordering, speech bubbles, hit-shielding and high-quality drawing are extended by later modules. Their IDs include `gw-v155-stage-dock-fix`, `gw-v1551-stage-layer-lock`, `gw-v1552-stage-fit`, `gw-v1553-stage-interaction-cleanup`, `gw-v1555-stage-hit-shield`, `gw-v1520-hq` and `gw-v2400-stage-sizes`.

## 4. The actual engine and shared project data

The core engine starts as a JavaScript `Engine` object, later exposed on `window` by the global-alias layer. In the inspected source it holds running state, the sprite array, active sprite index, threads, keyboard/mouse state, audio context, broadcasts, variables and drawing/frame timing. Feature modules extend it with things such as clone limits, tilemap and the behavior system.

A sprite includes its position, size, direction, visibility, current costume, costume collection and sounds. Costumes carry drawing data and metadata such as natural resolution and rotation centre. The Stage/backdrop and project variables/lists have their own state as well. These objects are the shared bridge between the UI, runtime, renderer, media tools and serializer.

G-Warp also has shared helper/feature objects: `GW` for engine and rendering helpers; `GW8` for editing history; `GW_V15_COSTUME_EDITOR` and `GW_VECTOR_EDITOR` for costume editing; `GW_FILES` for file actions; `GW_V1580_SB3` and `GW_V1580_SB3_EXPORT` for project interchange; and feature objects for sound, tilemap, behaviors, extensions and Stage layout. Not every internal helper is a stable public API—verify each name in the current source.

## 5. How the app's main tools are implemented

### Costumes and the paint editor

The primary paint system is exposed as `window.GW_V15_COSTUME_EDITOR`. Its documented methods include save, bitmap/vector load, list refresh, mode switch and SVG cleaning. The companion `window.GW_VECTOR_EDITOR` handles vector mode and shared costume-coordinate mapping.

The vector editor introduced by `gw-v1700-vector-editor` keeps vectors as SVG geometry instead of flattening the drawing to an 80×80 image. It preserves costume proportions and rotation centre and can keep an imported vector costume's shapes editable. The `gw-v17010-bitmap` module keeps bitmap costumes at their proper dimensions rather than squeezing everything into a fixed 80×80 result. Bitmap tools operate on a canvas; vector tools transform/select SVG elements. The active tool and selection are different state in each mode, and the real field names are in [ENGINE-MAP.txt](../ENGINE-MAP.txt).

When diagnosing paint problems, trace this path in order: selected sprite → active costume → editor mode → canvas/SVG load → pointer coordinate conversion → edit operation → save back to costume → refresh thumbnail and Stage. A canvas changing on screen is not enough: verify that the underlying costume and its rotation centre survive a save and fresh reload.

### Sounds, Instrument Studio and Song Maker

The sound tools use the browser's Web Audio API and the app's audio context. The editor has sound import/record/preview/edit behavior, while Instrument Studio defines instrument patches and note scheduling. The module `gw-v1556-instrument-studio` includes instrument definitions (for example piano, electric piano, organ, guitar and bass) and controls for shaping the voice, including waveform/partials, filtering, envelope and other patch settings. The runtime schedules oscillator/sample/drum voices through an audio context and can stop tracked voices.

The `gw-v1570-song-maker` module builds a song from a part/stem grid. Its source comments describe genre, mood and theme controls, a per-stem energy curve, chord progressions, and up to three instrument layers per stem. It uses a shared scheduling path for live playback and offline rendering so the result can be saved as a normal sound asset on a sprite. `gw-v1580-loop` turns a song or sprite sound into a seamless loop saved as an ordinary sound. These are G-Warp-specific tools; don't assume that every editor control has a direct Scratch equivalent.

When debugging music, test preview, Stop, a second playback, export/save-to-sprite, and project reload separately. A silent preview can be an audio-context issue; a working preview with missing saved sound is an asset/persistence issue.

### Tilemap and Behavior Designer

The tilemap state hangs off `Engine.tilemap`. The inspected initializer uses a 480×360 world and a default 16-pixel tile size, with tile definitions, layers and an active editing layer. The tile code includes world-to-tile conversion, painting, tile-collision lookups, a cached tile image and separate Stage-layer rendering. The Tilemap UI is opened by `openTilemap()` and its controls are wired in the `gw-v1580-tiles` layer.

Behaviors are stored in `Engine.behaviorSystem` and attached per sprite with named attributes and event responses. The source defines events such as created, updated, actor-collision and tile-collision, and can start behavior threads from response stacks associated with the behavior definition. This is an additional G-Warp visual-programming system, not part of the standard Scratch project model. Its data must be checked separately when exporting to another editor.

### Extensions and the Scratch-shaped compatibility layer

The extension bridge is in `gw-v1510-ext`. It provides a `window.Scratch`-style registration surface, including block-type/argument helpers, then adapts registered extension blocks to G-Warp's engine and script runtime. This is a compatibility adapter, not an instance of Scratch VM.

The extension UI can add an extension from a URL. The code validates that the URL uses HTTP or HTTPS and consults `GW_EXT_DANGER` to decide whether a warning is needed. The actual capability of an extension depends on the loaded code and its runtime context; a risk label is not itself a sandbox. The extension collection and its credits/licences are maintained in the app. Keep source attribution and each extension's licence intact.

### Opening, saving and restoring projects

The file actions live under `GW_FILES`, added by `gw-v1510-files`. The module describes computer/web loading, Save/Save As, restore points and project-health/error reporting. It keeps recent restore points in browser storage and supports loading Scratch shared-project links or direct project files where the route is available.

The SB3 import module is `gw-v1580-sb3`; export is `gw-v1580-sb3export`. They package project structure and assets, including Stage/backdrops, sprites, variables/lists, costumes, sounds and supported scripts. The importer comments explicitly say unsupported blocks are preserved and reported where possible. The exporter warns about G-Warp-only features such as extensions, tilemaps and behaviors rather than silently claiming those are standard Scratch blocks.

The PenguinMod project-link path is in `gw-v1518-penguinmod`; its comments describe reading protobuf-form PenguinMod projects and converting them into a project representation. The engine map also notes a ZIP-type PMP path. Those paths are not interchangeable: test a concrete file from each format.

**Important data boundary:** “the file opens” is not the same as “everything survived.” After a format change, verify the sprites, block stacks, variables, costumes, sounds, rotation centres, layer order, extensions and Stage output after opening the export in a new session.

### Live collaboration, cloud data and other tools

The Live LAN module `gw-v13-live-lan` maintains peers, cursors, locks, change queues and project slices through a WebSocket connection. Its default URL uses the current host and port 8787. That source code alone does not mean a collaboration server is running; connection requires a compatible server and a successful connection.

The cloud-variable module `gw-v1519-cloud` connects to TurboWarp's cloud service for numeric cloud data with a user consent step, as described in its source comments. Other feature layers include physics, animation/bone tooling, Stage fullscreen and high-quality display, sprite/backdrop libraries, Bug Hunter, project diagnostics, updater/settings and GWrap AI assistance. Treat each as its own feature: its UI, stored data, runtime behavior and cleanup may live in more than one script module.

## 6. Why Scratch is built differently

![Scratch components mapped to G-Warp](./images/scratch-to-gwarp-map.svg)

Scratch 3 is built from cooperating packages in the official [scratchfoundation/scratch-editor monorepo](https://github.com/scratchfoundation/scratch-editor):

- **scratch-gui** builds the React-based editor interface and connects the other systems.
- **scratch-blocks** provides the block workspace, fields, shapes and connections.
- **scratch-vm** keeps project state and runs the Scratch program. Its README explains how workspace events update an abstract syntax tree (AST) for each target and shows the serialized/in-memory block shape.
- **scratch-render** draws the Stage with WebGL.
- **scratch-paint** edits vector and bitmap costumes.
- **scratch-storage** loads/stores project assets; **scratch-svg-renderer** processes vector artwork.
- **scratch-audio** implements sound behavior; scheduling/helper packages manage background work.

Useful primary sources are the [official monorepo](https://github.com/scratchfoundation/scratch-editor), [GUI package](https://github.com/scratchfoundation/scratch-editor/tree/develop/packages/scratch-gui), [VM package](https://github.com/scratchfoundation/scratch-editor/tree/develop/packages/scratch-vm), [Scratch Blocks](https://github.com/scratchfoundation/scratch-blocks), [render package](https://github.com/scratchfoundation/scratch-editor/tree/develop/packages/scratch-render), and [storage package](https://github.com/scratchfoundation/scratch-editor/tree/develop/packages/scratch-storage). The Scratch team has moved code from some older standalone repositories into the monorepo, so use the current package paths rather than old tutorials alone.

### The important difference

| Job | Scratch 3 | G-Warp in this source |
|---|---|---|
| Main interface | React-based `scratch-gui` package | HTML/CSS in `app.html` with later DOM-building modules |
| Block workspace | `scratch-blocks` | Custom DOM `.scratch-block` / `.block-stack`, pointer dragging and custom snap logic |
| Program model/runtime | `scratch-vm` keeps per-target block/AST state and schedules threads | `Engine` plus `ScriptThread`; the workspace DOM is read by the live runner |
| Stage rendering | `scratch-render` WebGL renderer | Custom 2D canvas with G-Warp drawing/coordinate helpers |
| Costume editing | `scratch-paint` | `GW_V15_COSTUME_EDITOR` plus `GW_VECTOR_EDITOR` and bitmap canvas tools |
| Project storage | `scratch-storage` and VM/GUI integration | G-Warp's own file modules, ZIP/SB3 parser/exporter, asset conversion and restore points |
| Extension API | Scratch VM extension/runtime integration | `gw-v1510-ext` compatibility adapter into G-Warp's own Engine and threads |

A similar block shape is only the visible surface. For real compatibility, the block needs the correct connection behavior, stored values, runtime result, event timing, sprite effects and import/export representation. G-Warp can reuse **ideas and documented behavior** from Scratch while keeping its own code and visual identity. Do not copy Scratch art or assume a Scratch internal function is present in G-Warp.

## 7. If you were building the same kind of app from zero

This is the order that prevents a good-looking editor from becoming a picture of an editor that cannot run projects:

1. **Build the screen shell:** workspace, block palette, Stage, sprite list and Code/Costumes/Sounds tabs. Decide the logical Stage coordinate space up front.
2. **Define block data and connections:** statement, hat, cap, reporter, Boolean and C-block forms; input sockets and parent/next relationships. The connection model must exist before complex drag snapping.
3. **Make block editing real:** pointer drag, zoom/scroll transforms, snap previews, nested C-block insertion, detach/delete, comments and undo/redo. Keep graph changes consistent.
4. **Implement an interpreter and scheduler:** start event hats, create threads, advance instructions, support loops/conditions/waits/broadcasts/procedures, and make Stop work even for runaway scripts.
5. **Draw the project:** map Stage coordinates, rotate/scale costumes, keep layer order and hit-testing consistent with what the user sees.
6. **Add media tools:** costume vector/bitmap editing with real save-back and rotation-centre preservation; sound playback and recording; then music synthesis and export.
7. **Add project interchange:** parse SB3, map blocks and target data, package assets, export, and open the result in a fresh editor session.
8. **Add extra tools only after the core holds together:** extensions, tilemap, behaviors, collaboration, physics and animation each need their own state and life cycle.

That is also how to understand the current G-Warp source: follow each feature through the visible tool, shared model, runtime handler, renderer or media path, and file save/load. If a UI button has no connection through those layers, the feature is only partially implemented.

## 8. How to inspect or change this app without breaking it

G-Warp has accumulated multiple inline modules and patches. A later script can replace an earlier event handler or add behavior to an earlier object. **Order matters.** Search for the module ID and function name, read the earlier definition it relies on, and inspect the later patches before drawing conclusions.

For code work, follow the repo's workflow: read [AI-TEAM.txt](../AI-TEAM.txt), [TODO.txt](../TODO.txt), [ENGINE-MAP.txt](../ENGINE-MAP.txt) and [MERGE-QUEUE.txt](../MERGE-QUEUE.txt) first. The repository rule is that ChatGPT's feature work goes into small files under `chatgpt/` with a matching notes file; only the owner or Claude changes `app.html` and `index.html`. Don't replace the large app with a rewritten copy.

For every feature, verify the whole path:
**visible control → event handler → model/state change → runtime/drawing/audio effect → save/load path.**
Then compare the actual browser result with the expected result. A source comment or passing syntax check is not proof the feature works in the running app.

## 9. What has been demonstrated so far

The latest recorded browser run in [LIVE-UI-VERIFICATION.txt](./LIVE-UI-VERIFICATION.txt) used Chromium at 1440×900 and 1024×700. It passed the basic editor render, category click, palette block drag, workspace and block context menus, Start/Stop state, More menu, sprite context menu, tab switching, Extension panel opening and narrow-window width checks.

Those are real results, but **they do not demonstrate full Scratch parity**. The report explicitly leaves complex nested snapping, keyboard shortcuts, SB3 round-trip, Pause/audio, sprite Stage-click routing, the individual paint tools, advanced tool dialogs and other browsers as not tested. Keep that distinction honest in release notes.

## Next step

Use this page as the technical map, the [user guide](../chatgpt/USER-GUIDE.txt) for what to click, and the [screenshot/UI guide](../chatgpt/SCREENSHOT-UI-DOCUMENTATION.md) to find each control. When working on a specific bug, start from its actual screen and trace into the named code module instead of reading the entire HTML file from beginning to end.
