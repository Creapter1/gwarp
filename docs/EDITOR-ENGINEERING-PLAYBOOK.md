# Engineering Playbook: How to Build a Scratch-Style Block Editor

This playbook describes a reusable engineering approach for building a visual programming environment like G-Warp. It is intentionally architecture-neutral at first and then maps the concepts to G-Warp's recorded implementation. Use it alongside the [engineering reference](./ENGINEERING-REFERENCE.md) and [research library](./RESEARCH-LIBRARY.md).

**Important boundary:** the first sections describe common architecture patterns. They are not claims that G-Warp internally uses Blockly, Scratch VM, React, WebGL or any specific upstream package. G-Warp is a single-file HTML application with its own engine, according to its repository documentation.

## 1. Begin with behavioral contracts, not paint

Before drawing a block, write down what it means.

For each block type, specify:
- visible label and argument layout;
- input types and default/shadow values;
- output type (statement, Boolean, number/text, command, event hat);
- legal connections;
- fields/dropdowns and serialization representation;
- runtime effect;
- when it yields or waits;
- error/fallback policy;
- compatibility expectation;
- test cases.

This order prevents a common failure: a block looks correct but has no runtime handler, serializes a different value than it executes, or connects to shapes it cannot safely evaluate.

Create a canonical block-definition table, even if implementation remains in one HTML file. It should answer: what blocks exist, who registers them, how they render, how they are serialized and what function executes them?

## 2. Separate six logical responsibilities

A mature editor normally has cooperating subsystems. They can be separate packages or well-defined modules inside a single file.

<figure>
  <img src="./images/gwarp-scratch-architecture.svg" alt="Conceptual comparison of G-Warp and Scratch-style editor subsystems">
</figure>

| Subsystem | Responsibilities | High-risk interfaces |
|---|---|---|
| Project model | Stage, targets, clones, block graphs, variables/lists, media and metadata | IDs, scope, clone identity, serialization |
| Block workspace | palette, blocks, fields, connections, comments, zoom/pan, selection | drag lifecycle, nested connections, undo/redo |
| Runtime/scheduler | threads, waits, events, procedures, broadcasts, stop/pause/turbo | fairness, restarts, reentrancy, runaway work |
| Rendering and input | draw stage/workspace, hit testing, coordinates, layers and effects | transform consistency, overlap, resize |
| Media tools | costumes, SVG/bitmap conversion, sounds, synth/music | history, file validation, resource cleanup |
| Persistence and extensions | import/export, autosave, extension registration and policy | hostile input, missing extensions, network trust |

A single-file app still benefits from these boundaries. Organization is about explicit ownership and contracts, not file count.

## 3. Design a block graph, not a pile of DOM elements

A connected script is graph-shaped data with a visible layout. Each block should have a stable identity in the model. The model must represent:
- opcode/type;
- fields and field IDs;
- input sockets and child connections;
- next-statement link;
- parent relationship;
- whether a block is top-level;
- shadow/default blocks where the format supports them;
- C-block body and optional alternate branch;
- comments/attached metadata;
- workspace position for top-level scripts;
- connection types and legal connection rules.

The Scratch VM documentation includes a concrete block-record example with fields such as `opcode`, `inputs`, `fields`, `next`, `topLevel`, `parent`, `shadow`, `x` and `y`: [Scratch VM README](https://github.com/scratchfoundation/scratch-editor/tree/develop/packages/scratch-vm). Treat it as a conceptual example, not G-Warp's actual in-memory schema.

### Why stable identity matters
Undo/redo, variable references, attached comments, project saving and reconnecting nested inputs are all harder if the editor has to infer identity from screen position or label text.

### Why rendering should not be the model
If the DOM or canvas is the only place a script exists, testing, serialization, undo and runtime compilation become fragile. Keep a project representation that can be validated without depending on pixels.

### Connection invariants
- A block cannot be its own ancestor.
- One input cannot own two child blocks unless the format explicitly permits it.
- A statement chain cannot contain a cycle unless cycles are represented intentionally outside the normal graph.
- Parent/next/input references must agree.
- Only compatible connection types can snap.
- Moving a nested stack out of a C-block must preserve the detached subtree.
- Undo should restore the entire graph mutation atomically, not just put rectangles back visually.

Build property-based tests for random legal and illegal graph operations when possible.

## 4. Build the workspace interaction state machine

Drag-and-drop is a small transaction with many failure paths. Model it explicitly:

1. pointer-down begins a gesture and captures the intended block;
2. pointer-move updates a preview using workspace coordinates;
3. candidate connections are found and validated;
4. visual snap affordances show the legal target;
5. pointer-up commits a graph change or restores the original state;
6. click/selection/drag semantics remain distinct;
7. history records one atomic operation;
8. focus/keyboard context and pointer capture are cleaned up.

Test cancellation by Escape, release outside the workspace, switching tabs mid-drag, browser resizing, scrolling/zooming during a drag, nested stack extraction, fast pointer movement, touch/pointer cancellation, and dropping onto an invalid connection.

The workspace coordinate system should be independent of the page. Convert page/client coordinates to workspace coordinates in one documented function; apply the same transform in drawing, hit testing, drag previews and drop calculations.

## 5. Treat undo/redo as transactions

A history system should specify:
- which user actions create entries;
- which rapid actions are grouped;
- when a pending entry is flushed;
- how undo/redo suppresses generating another history event;
- whether selection and viewport state are included;
- how large media changes are stored;
- what happens if an undo command is attempted during a drag or import;
- how history interacts with project reset and serialization.

Test Undo, Redo, Undo-after-Redo, undo after switching target, undo costume drawing, undo variable creation, undo block mutation, and undo after save/load. For every operation, compare model and visible UI.

Avoid serializing the entire project for every mouse-move. Use operation patches, coalescing, or snapshots at controlled intervals according to measured memory and complexity needs.

## 6. Define the runtime instruction model

A simple interpreter can represent a script as a sequence of instructions, but control blocks, nested branches, waits and procedures make a flat index insufficient unless the structure is carefully encoded.

Each running script needs a concept of:
- its target/sprite;
- the script or block graph it is executing;
- program counter/current block;
- procedure/call stack;
- wait deadline or suspended condition;
- finish/cancel state;
- execution ownership/clone identity;
- diagnostic timestamp or instruction count if runaway detection is used.

G-Warp's [ENGINE-MAP.txt](../ENGINE-MAP.txt) lists `ScriptThread` instances on `Engine.threads`, a `step()` method, and fields such as `sprite`, `blocks`, `pc`, `callStack`, `waitUntil` and `finished` in the inspected baseline. Check that document and current source before applying these names.

### Scheduler fairness is a product feature
A correct runtime must be cancellable and fair, not just fast in a benchmark. Build a budgeted scheduler that can yield control to the browser. Decide and document how standard loops, repeat, forever, wait, warp/no-refresh behavior and turbo mode interact. Do not allow one workload to hold the main thread for seconds merely because it is the fastest way to run it.

### Stop is a lifecycle operation
Stop should have a clear contract for:
- running threads;
- pending waits and deferred callbacks;
- clones;
- audio voices and scheduled notes;
- extension timers/listeners;
- pen or other running output as the product intends;
- speech bubbles and transient visual effects;
- run/pause/turbo UI state.

Test click-to-idle time, not just whether a Stop button handler fires.

## 7. Make behavior compatibility explicit

For each feature, separate:
- **shape parity:** blocks and controls look/fit correctly;
- **interaction parity:** selecting/dragging/editing works;
- **model parity:** values/graphs serialize and restore correctly;
- **runtime parity:** execution yields equivalent behavior;
- **lifecycle parity:** stop, reset, clone deletion and audio cleanup work;
- **format parity:** imported projects preserve supported content;
- **extension parity:** capability and missing-extension behavior is defined.

Keep a contract sheet of every difference from the target editor. Intentional G-Warp extras should be documented as extras, not reported as defects simply because Scratch lacks them. A standard Scratch behavior regression is a bug even if the editor has a distinct visual theme.

## 8. Build serialization as a versioned boundary

Don't treat an exported project as a dump of today's in-memory objects. Define a stable project format and a migration policy.

Recommended practices:
- add a schema/version marker;
- preserve stable IDs and explicit reference relationships;
- distinguish project data from transient state (selected block, pointer drag, running threads);
- list required and optional fields;
- define unknown-field behavior;
- validate before mutating the active workspace;
- make imports safe to cancel and recover;
- keep asset bytes separate from metadata and verify every reference;
- preserve unsupported metadata when safe, or show a precise warning;
- run round-trip tests from fresh editor sessions.

Blockly's [serialization documentation](https://docs.blockly.com/guides/configure/serialization/) explains a useful model where different workspace components have separate serializers and deserialization order matters. SB3's concrete schema lives in the [Scratch Parser repository](https://github.com/scratchfoundation/scratch-parser). These are different format models; do not mix their object shapes without an explicit mapping.

## 9. Renderer and hit-testing architecture

Canvas-based and WebGL renderers have different tradeoffs. The important contracts are:
- logical Stage coordinates;
- CSS/device-pixel scaling;
- camera/viewport transform;
- sprite/clone layer ordering;
- costume rotation centers;
- transparency and visual effects;
- pointer mapping from browser coordinates to logical coordinates;
- redraw invalidation and caching;
- resize and pixel-ratio handling.

Use the same transform mathematics for drawing and input mapping. If sprite appearance uses one scale/rotation path but pointer hit testing uses a different path, a sprite can look clickable but not respond—or invisible hit regions may capture clicks.

Test overlapping sprites, transparent pixels, scaled and rotated costumes, hidden targets, clone layer order, resized Stage, page zoom and different device-pixel ratios.

A performance optimization should begin with a profile: time spent in script stepping, collision checks, drawing, SVG/raster conversion, audio generation, DOM layout and project serialization. Do not optimize based on a hunch or assume the cost model of Scratch's WebGL renderer applies to G-Warp's 2D canvas.

## 10. Audio, extensions, and media ownership

Audio and extension activity can outlive a script unless their resources have explicit owners.

For every resource, state who creates it, who stops it, and what cleanup runs on:
- Stop;
- target/clone deletion;
- extension removal;
- project replacement;
- tab or modal close;
- failed initialization;
- browser context loss/reload.

Examples include AudioNodes, timers, event listeners, object URLs, workers, image bitmaps, pending fetches, clipboard requests and custom event subscriptions.

Avoid global collections of unowned timers and listeners. Use a cleanup registry or explicit lifecycle ownership. Test repeated open/close/load cycles to identify growth.

## 11. Security by construction

Projects and extensions are input, not trusted executable configuration. See [Extension Security Model](./EXTENSIONS-SECURITY-MODEL.md) and [Project Formats](./PROJECT-FORMATS-AND-ROUNDTRIP.md).

Baseline safeguards:
- don't eval project content or convert text fields into executable JS;
- do not install/fetch extensions silently based on project metadata;
- validate archive bounds and media types;
- sanitize SVG and other active-content formats;
- make network access visible and permission-aware;
- never store credentials in the project;
- report save/recovery failures truthfully;
- make risky extensions visibly distinct and keep risk labels grounded in actual capabilities.

A hidden JavaScript execution route is not a harmless advanced feature in a child-facing block editor.

## 12. Accessibility and learnability

Visual editors often depend heavily on spatial interaction. Keyboard and assistive support must be planned, not added as a decoration.

Test:
- keyboard navigation across controls, tabs, menus, palette and workspace;
- visible focus state;
- a non-pointer way to select and insert blocks where feasible;
- useful accessible names for icon-only controls;
- correct focus return after dialogs;
- screen-reader-friendly status for run/pause/stop/errors;
- color contrast and avoiding color as the only signal;
- zooming and responsive layouts;
- reduced-motion or non-flashing alternatives for animation-heavy themes;
- error messages that explain what happened and what action is available.

G-Warp's visual identity can remain distinct while retaining usability standards. Electric animation should never interfere with reading text or identifying a block category.

## 13. A practical build order for a new editor

1. Write the project data model and schema.
2. Implement simple statement/reporter/Boolean/hat shapes and connection validation.
3. Implement drag/drop transaction and undo/redo.
4. Build target/Stage state and a deterministic tiny interpreter.
5. Add variables/lists and core operators.
6. Add events, thread scheduling, waits, broadcasts, loops and procedures.
7. Add sprite rendering, coordinates, hit testing and input events.
8. Implement SB3 parsing/export with asset validation and a round-trip fixture.
9. Add costumes/sounds editors and their histories.
10. Add extensions behind an explicit capability policy.
11. Add performance budgets, Stop cleanup, crash recovery and adversarial fixtures.
12. Add differential tests against Scratch and version the evidence.

This sequence reduces the risk of building a polished editor that cannot execute, save, reopen or safely interrupt its programs.

## 14. G-Warp-specific integration checklist

Before making a code change, read [TODO.txt](../TODO.txt), [AI-TEAM.txt](../AI-TEAM.txt), [ENGINE-MAP.txt](../ENGINE-MAP.txt) and [MERGE-QUEUE.txt](../MERGE-QUEUE.txt).

- Do not rewrite `app.html` as a large replacement.
- Candidate code belongs in the assigned AI/research folder with a matching notes file.
- A candidate module must be safe to load twice and include a documented switch-off path, per the team rules.
- Use only functions and hooks verified in the current source.
- If a needed hook does not exist, describe the gap instead of inventing an API.
- Preserve existing functionality and follow the G-Warp style/attribution rules.
- Separate source review from browser verification.
- Claude/owner integration and release steps determine whether code becomes part of the public app.

## 15. Further reading

- [Research Library](./RESEARCH-LIBRARY.md)
- [Engineering Reference](./ENGINEERING-REFERENCE.md)
- [Runtime Semantics and Parity](./RUNTIME-SEMANTICS-AND-PARITY.md)
- [Compatibility Test Matrix](./COMPATIBILITY-TEST-MATRIX.md)
- [Project Formats and Round-Trip](./PROJECT-FORMATS-AND-ROUNDTRIP.md)
- [Extension Security Model](./EXTENSIONS-SECURITY-MODEL.md)
- [Scratch editor monorepo](https://github.com/scratchfoundation/scratch-editor)
- [Blockly serialization](https://docs.blockly.com/guides/configure/serialization/)
- [Scratch Parser schema](https://github.com/scratchfoundation/scratch-parser/blob/master/lib/sb3_schema.json)
