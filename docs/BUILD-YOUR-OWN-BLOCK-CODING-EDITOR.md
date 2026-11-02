# Build Your Own Scratch-Style Block-Coding Editor

A practical architecture guide for building an app like Scratch, TurboWarp, PenguinMod or G-Warp. It explains the systems you must design, the order to build them in, and the choices that lead to a maintainable editor.

This is a learning guide, not a claim that G-Warp uses Scratch's internal code. G-Warp is one case study; Scratch, TurboWarp and PenguinMod use their own architectures.

## 1. Choose your starting route

There are three sensible routes. Pick one deliberately.

| Route | What you do | Best when | Main risk |
|---|---|---|---|
| Build on Scratch/TurboWarp code | Fork or extend the existing editor and VM packages | You need high compatibility and want to reuse mature systems | You inherit a large build, its architecture and its licence obligations |
| Build a modular editor | Create separate GUI, block workspace, runtime, renderer, assets and storage packages | You want long-term flexibility and multiple contributors | More initial engineering and integration work |
| Build a small standalone prototype | Start with one HTML/JS app, a small block set and a simple interpreter | You are learning or proving the idea | A quick prototype can become hard to maintain as features grow |

Do not start by drawing a beautiful block palette. Start by deciding what a project is, what a block means, and how the runtime executes it.

## 2. Learn from the existing projects first

### Scratch 3

Scratch is a set of cooperating packages. The current Scratch editor repository is a monorepo that includes scratch-gui, scratch-vm, scratch-paint, scratch-render, scratch-storage, scratch-svg-renderer, media-library scripts and task scheduling support. Scratch Blocks and scratch-audio are separate repositories. The Scratch team is still migrating packages, so old tutorials may point to archived repositories.

Read:
- [Scratch editor monorepo](https://github.com/scratchfoundation/scratch-editor)
- [Scratch Blocks](https://github.com/scratchfoundation/scratch-blocks)
- [Scratch audio engine](https://github.com/scratchfoundation/scratch-audio)

A useful mental model is: GUI coordinates the experience, the block workspace edits programs, the VM owns program state/execution, rendering draws the Stage, paint edits artwork, storage loads/saves assets, and audio schedules sound.

### TurboWarp

TurboWarp is a Scratch mod. Its development guide describes a package-based environment with GUI, VM, renderer, paint, parser, storage and related packages. Its guide currently warns that some setup instructions are outdated, so check the package README before copying commands.

TurboWarp also uses a compiler to convert Scratch scripts to JavaScript. Scratch's interpreter walks an abstract syntax tree at runtime. Compilation can make some workloads much faster, but performance depends on the project and compiler tradeoffs affect live editing. Read [How TurboWarp runs projects](https://docs.turbowarp.org/how) and [New Compiler](https://docs.turbowarp.org/new-compiler).

### PenguinMod

PenguinMod describes itself as a TurboWarp mod with extensive changes, additional extensions and features. Use its [official docs](https://docs.penguinmod.com/) and [GitHub organization](https://github.com/PenguinMod) when investigating its exact implementation. Do not assume every PenguinMod feature or project extension works in Scratch or TurboWarp.

## 3. Define the project model before the UI

A block editor needs a stable representation of the program. The UI is only one way to edit that representation.

A useful minimum project model contains:

- **Project:** title, format version, stage settings, assets and targets.
- **Stage:** backdrop list, global variables/lists, stage scripts and display settings.
- **Sprite/target:** name, position, direction, size, visibility, rotation style, costumes, sounds, local variables and scripts.
- **Block:** unique ID, opcode, fields, input connections, next connection, parent/owner and top-level coordinates.
- **Asset:** stable asset ID, media type, file format, dimensions, rotation centre and original bytes.
- **Extension metadata:** extension ID, version/source, permission needs and licence/credit details.

For an AST/graph-based editor, a block record might look like this:

    {
      "id": "block-001",
      "opcode": "motion_move",
      "fields": {},
      "inputs": {
        "STEPS": { "kind": "number", "value": 10 }
      },
      "next": "block-002",
      "parent": null,
      "topLevel": true,
      "x": 120,
      "y": 80
    }

This is an illustrative schema, not a Scratch or G-Warp serialized block. The important point is that the program structure must be explicit. Keep the UI positions separate from execution order wherever possible.

### Design connections by type

At minimum, define connection kinds:

- hat/start: starts an event script and has no previous statement;
- statement: executes an action and can connect vertically;
- cap/end: ends a stack and has no next statement;
- C-block: contains one or more nested statement inputs;
- reporter: returns a value;
- Boolean: returns true/false;
- input socket: accepts only compatible values or menu values.

A block should not connect just because two shapes look close. The editor must check connection type, parent rules, input type, whether a loop body is being entered, and whether a connection would create an invalid cycle.

## 4. Build the editor shell

Make the main areas visible before adding every block:

1. project/menu toolbar;
2. category rail;
3. block palette;
4. script workspace;
5. Stage;
6. sprite/target list;
7. Code, Costumes and Sounds panels;
8. status/error area.

Decide the Stage's logical coordinate system early, such as 480×360. The displayed size can change with the window, but a sprite's project coordinates must not change just because the dock becomes narrower.

Make the layout responsive. Do not let a small window hide the only way to reach a block or project control.

## 5. Implement block editing as graph operations

The workspace needs more than drag-and-drop. It needs a correct graph-editing model.

A robust drag cycle looks like:

1. On pointer down, identify the selected block and its whole stack.
2. Record the pointer-to-stack grab offset.
3. Convert the pointer from screen coordinates into workspace coordinates, accounting for zoom, pan and scroll.
4. Search for compatible nearby connections.
5. Show a preview of the exact connection that would be made.
6. On release, re-check compatibility and apply one graph operation.
7. Update parent/next/input references together.
8. Record one undo-history operation.
9. Re-render the workspace from the new state.

Also implement:
- detach a nested stack without corrupting its former parent;
- move stacks out of a C-block correctly;
- delete a block or full stack with predictable semantics;
- duplicate a block and all required descendants with new IDs;
- copy/paste and comments;
- pan, zoom, clean-up and keyboard navigation;
- undo/redo for every mutation.

Do not rely on visual DOM nesting alone as the permanent program data. If the DOM is the source of truth, define and test a serialization contract so nested inputs and connections cannot silently disappear.

## 6. Implement the runtime and scheduler

The interpreter is the heart of the app. It turns block data into behavior on the Stage.

A clear first architecture is:

- **Event dispatcher:** listens for Green Flag, key presses, sprite clicks, Stage clicks, broadcasts and clone-start.
- **Thread:** stores the target, current block/program counter, call stack, wait deadline, local procedure values and finished state.
- **Interpreter:** executes a small, well-defined number of operations per scheduler step.
- **Scheduler:** advances runnable threads and yields so the browser can draw and respond to input.
- **Engine state:** owns sprites, variables/lists, backdrops, clone limits, broadcasts, mouse/keyboard state, timers and audio state.

Pseudocode:

    function startProject(event) {
      for (const script of scriptsListeningFor(event)) {
        scheduler.add(new Thread(script.target, script.blocks));
      }
    }

    function frame(now) {
      input.update();

      for (const thread of scheduler.runnableThreads(now)) {
        thread.step({ engine, instructionBudget: 1 });
      }

      renderer.draw(engine);
      requestAnimationFrame(frame);
    }

This is only a teaching sketch. A production scheduler must define time semantics, waits, turbo/warp behavior, clone lifecycle, broadcasts, exceptions, stop behavior and how one slow thread affects the others.

Important runtime rules:
- One sprite can have several scripts running at once.
- Scripts on different sprites can run concurrently.
- Wait blocks yield; they should not freeze the entire page.
- Stop must cancel threads, clones, timers and sound voices safely.
- A loop without a yield must have a watchdog or instruction budget.
- Broadcast-and-wait needs a real completion condition.
- Clone-start scripts must run on the clone target, not on the original.
- Stage clicks, key state, mouse position and collision tests need consistent coordinate/state rules.

G-Warp's current implementation is a useful contrast: its own Engine and ScriptThread runtime advances block stacks from its own DOM workspace. Do not use Scratch VM object names when extending G-Warp.

## 7. Render the Stage independently of editor layout

Choose a logical world and use it consistently.

For each frame:
1. clear the output canvas;
2. draw the backdrop;
3. draw background tile layers, if any;
4. sort sprites by layer;
5. draw costume content with position, rotation, size and rotation centre;
6. draw foreground tile layers and stage overlays in a defined order;
7. draw monitors and speech bubbles in the appropriate UI layer.

Keep rendering and hit-testing in the same coordinate model. A sprite must not appear at one point and receive pointer/collision input at another.

Decide whether to use Canvas 2D, WebGL or another renderer based on expected sprite count, effects, filtering and portability. Keep a simple test scene to compare visible output against collision and pointer coordinates.

## 8. Costumes, vector art and sound

### Costumes

A sprite usually needs both bitmap and vector workflows. Store asset dimensions and rotation centres; do not flatten all imported vector art to a tiny fixed-size bitmap unless that is an explicit, documented tradeoff.

Core paths:
- import/upload media;
- edit selected asset;
- update preview and thumbnail;
- save changes back to project model;
- export asset bytes;
- reload into a fresh project and verify.

Test selection, multi-selection, resize, rotate, undo, layer order, transparency, vector point editing, bitmap tools, and persistence separately.

### Audio and music

Use an audio context and a voice/scheduler abstraction. Separate:
- loading/decoding assets;
- instrument definitions;
- note scheduling;
- playback/stop;
- sound editing/recording;
- generated song data;
- rendering/exporting generated audio;
- adding generated audio as a normal project sound.

A UI showing a Play button is not proof sound is audible. Test with a real audio output, browser autoplay rules, stop behavior, simultaneous voices, export and save/reopen.

## 9. Save files and interoperate

Scratch 3 .sb3 is a ZIP-style project package containing project data and assets. A compatible app must correctly map the project structure, target state, block connections, assets and metadata.

An importer should:
1. read the archive;
2. parse the project data;
3. create Stage and sprite targets;
4. import variables/lists and monitors;
5. decode costumes, sounds and backdrops;
6. map known opcodes, inputs, fields and nested blocks;
7. preserve unknown/unsupported blocks where possible and report them.

An exporter should:
1. validate the internal project;
2. map supported blocks/targets/assets to the external format;
3. calculate correct asset references/checksums;
4. package the archive;
5. warn before dropping G-Warp-only features;
6. test the export in a different compatible editor.

**Opening a file is not round-trip proof.** Save/reopen in the same app is not enough to prove cross-editor compatibility. Test actual Scratch, TurboWarp and PenguinMod files, with a fixture for each format/version. PenguinMod protobuf-form projects are a different input path from ZIP/PMP archives; do not treat every .pmp as the same encoding.

## 10. Extensions and plugin safety

An extension is executable code, not just extra blocks. Define a registration API and a runtime adapter, then decide what capabilities extensions can access.

At minimum:
- show extension origin, creator and licence;
- identify internet, camera, microphone, file, project or personal-data permissions;
- warn before risky behavior;
- provide a way to remove/disable it;
- isolate or limit dangerous capabilities where possible;
- preserve a report of what an extension cannot run in a target format;
- never treat a label as a sandbox.

If an extension can execute arbitrary JavaScript in the app's origin, a warning alone is not a security boundary. Design for the risk, not just the appearance of a permission dialog.

## 11. Testing from the beginning

Create tests before the block list becomes large.

| Layer | Test examples |
|---|---|
| Block model | parent/next/input links, cycles, serialization, duplicate IDs |
| Workspace | snap compatibility, C-block nesting, zoom/pan coordinate transforms, detach |
| Runtime | event start, waits, loops, broadcasts, clones, stop |
| Renderer | layer order, rotation centre, fit/resize, pointer/hit-test alignment |
| Media | costume persistence, sound decoding, recorder permissions |
| Projects | import fixtures, export fixtures, unknown-block preservation, round-trip |
| Extensions | origin/permission rules, failure handling, removal |
| Performance | many sprites, many active scripts, large project loading, frame budget |
| UX/accessibility | keyboard navigation, focus, high contrast, narrow layouts |

Use deterministic fixtures and record the exact app commit, browser, OS, viewport, input project and output. A passing syntax check is not a browser test. A source review is not a live test.

## 12. A practical build order

For a first working product, build in this order:

1. **Project model and a tiny block catalogue.**
2. **Editor shell and one usable workspace.**
3. **Block connection model and undo/redo.**
4. **Event hat + statement interpreter + scheduler.**
5. **Stage renderer and sprite movement.**
6. **Variables, conditions, loops, waits and broadcasts.**
7. **Costume and sound asset persistence.**
8. **Save/load and a simple project format.**
9. **SB3 import/export and compatibility fixtures.**
10. **Extensions, advanced tools, music and collaboration.**
11. **Performance tools, accessibility, diagnostics and release automation.**

Do not add ten categories before one category can be edited, run, saved and reloaded correctly.

## 13. How the G-Warp case study differs

G-Warp is deliberately a single-file app rather than a package-based Scratch clone. Its current source uses:
- one large app.html with ordered inline modules;
- its own DOM-based block workspace;
- its own Engine / ScriptThread runtime;
- a custom 2D canvas Stage;
- its own costume editor and music tools;
- Scratch-shaped import/export code and a PenguinMod protobuf conversion path;
- extension compatibility code that adapts an extension API to G-Warp's engine.

That design makes it easy to download and run a single HTML file, but it increases the importance of module-order documentation, source-map accuracy and regression testing. A later inline module may override a function defined much earlier.

Read [the G-Warp engineering reference](./ENGINEERING-REFERENCE.md) and [the source module index](./SOURCE-MODULE-INDEX.md) before trying to modify its implementation.

## 14. Build tools and licensing

TurboWarp's modding guide currently warns that it is outdated (the page itself dates that warning to January 15, 2026). It mentions Node.js v22 and npm ci as a common setup pattern, but check each current repository/package README before running commands. A typical GUI development loop is clone → install locked dependencies → start the development server → make a small change → test → build production output; do not assume one command works for every package.

Before forking or copying code, read the exact licences for the editor, VM, block library, renderer, assets and extensions. A project-level licence does not automatically relicense third-party code. Keep attribution and notices with the code you reuse.

## 15. Primary references

- [Scratch editor monorepo](https://github.com/scratchfoundation/scratch-editor)
- [Scratch Blocks](https://github.com/scratchfoundation/scratch-blocks)
- [Scratch audio engine](https://github.com/scratchfoundation/scratch-audio)
- [TurboWarp development guide](https://docs.turbowarp.org/development/getting-started)
- [TurboWarp interpreter/compiler explanation](https://docs.turbowarp.org/how)
- [TurboWarp compiler notes](https://docs.turbowarp.org/new-compiler)
- [PenguinMod documentation](https://docs.penguinmod.com/)
- [G-Warp repository](https://github.com/Creapter1/gwarp)

**Date checked:** 2026-11-02. Upstream pages and repository layouts can change; re-check the linked project before copying a package path or build command.
