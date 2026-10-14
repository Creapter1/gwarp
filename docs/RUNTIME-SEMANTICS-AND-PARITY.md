# Runtime Semantics and Scratch-Compatible Behavior

**Audience:** implementers, testers, and researchers  
**Goal:** define what “works like Scratch” must mean in observable behavior—not merely visual resemblance.

**G-Warp baseline:** Beta v15.45.0; engine-map snapshot associated with `app.html` SHA `7ce527ca2908c63bbdfe642856ca29fd82178648`. Verify the current source before relying on names or claims.

## The central rule

Two editors are compatible when the same project, under the same relevant settings and inputs, produces equivalent observable behavior. Similar blocks and matching labels are not enough.

Observable behavior includes the final values and positions, the order and timing of events, sprite/clone identity, visibility, stop/restart lifecycle, sound lifecycle, project contents after saving, and whether a project loads without silently losing meaning.

Scratch 3's engine implementation is in the [Scratch editor monorepo](https://github.com/scratchfoundation/scratch-editor), especially its `scratch-vm` package. The older [Scratch VM repository](https://github.com/scratchfoundation/scratch-vm) is archived after migration; treat it as historical reference where applicable. The [community Scratch Specification](https://scratchspec.github.io/full/) is useful for runtime edge cases but should not be treated as an official exhaustive contract.

## 1. Runtime mental model

A typical block runtime has four connected layers:

1. **Project model:** Stage, sprites, clones, block graphs, variables/lists, costumes, sounds, broadcasts, extensions and metadata.
2. **Event dispatch:** Green Flag, key/mouse input, sprite click, backdrop change, broadcast and other hats can create or restart work.
3. **Thread scheduler:** active scripts advance until they finish, wait, yield, are stopped, or run out of the current work budget.
4. **State update and rendering:** blocks mutate target/project state, mark the display dirty, and the renderer draws the Stage. Audio may be scheduled through a separate audio subsystem.

This is a conceptual model, not a claim that G-Warp has Scratch's exact internal classes. Its own engine map states that G-Warp is a custom engine built around `window.Engine`, with `Engine.threads` holding `ScriptThread` instances, and its own 2D canvas renderer.

## 2. What the G-Warp source map actually says

The baseline [ENGINE-MAP.txt](../ENGINE-MAP.txt) records:

- `window.Engine` as the central object, with sprite collection and active selection, threads, variable/list data and visibility, Stage/backdrops, run/pause/turbo flags, clone limit, frame metrics, input, answer/audio context, broadcasts, extensions, tilemap and behavior system.
- `ScriptThread.step()` as a known thread method; a thread has fields such as `sprite`, `blocks`, `pc`, `callStack`, `waitUntil`, and `finished`.
- `GW.spritesTouch(a, b)` as the known sprite-touch collision helper.
- a custom 2D canvas drawing path, not `Engine.renderer` or Scratch's WebGL renderer.
- private pen-canvas setup, with no documented public `Engine.pen` hook.
- costume editor state under `GW_V15_COSTUME_EDITOR`; the documented field names include `costumeMode`, `svgTool`, `bitmapTool`, `selectedSvg`, `svgDrag`, and `selectionRect`.

These are **SOURCE-VERIFIED in that recorded snapshot**, not guaranteed in every future build. Re-read the current engine map before touching any code. Do not guess at `window.vm`, `runtime.sequencer`, `Engine.touching`, `Engine.pen`, or similar Scratch-style names.

## 3. Scheduler behavior: timing is part of the language

A runtime must answer:

- How often are threads allowed to run?
- Can one script run repeatedly in a single frame?
- What makes a thread yield?
- Does a wait block resume on or after its deadline?
- Can a long loop stop the page from repainting or handling input?
- What does turbo mode change: redraw rate, thread budget, or both?
- Is time measured from a monotonic clock?
- What happens when a tab is backgrounded or a display has a 120/144 Hz refresh rate?

The browser's `requestAnimationFrame` is a one-shot callback generally synchronized with display repaint; it may pause in background tabs. Code should use elapsed time instead of assuming every callback is exactly 16.67 ms. See [MDN requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame).

### Recommended execution contract

For a robust runtime, make the scheduler's invariants explicit:

- No single block loop can monopolize the UI indefinitely.
- Every long-running loop has a defined yield/warp policy.
- Stop is not queued behind the runaway work it must terminate.
- Pause prevents new execution progress but should not corrupt thread state.
- Stop clears or marks all relevant threads and clones, stops audio, and cancels delayed effects according to the chosen compatibility contract.
- Frame work has a budget, and the remaining work can resume in a later frame.
- High refresh rates do not accidentally speed up movement or timer-driven behavior.
- Runtime exceptions are logged and isolated according to a documented policy.

G-Warp's TODO lists a target of a bounded execution window and a stuck-script prompt. These are engineering goals, not proof that the freeze problem is already solved. Confirm candidate code is merged, then test runaway scripts, clone storms, giant joins and list growth.

## 4. Event hats and restart policy

Event behavior often produces subtle disagreements. For each event type, define and test:

- What exactly triggers the hat?
- Does a second trigger start a second thread, restart the previous thread, or get ignored?
- Does the answer vary by target, clone, event type, or settings?
- When a Green Flag starts a project, are previous threads and clones removed first?
- What order do scripts start across sprites?
- What happens if an event fires during Stop or while paused?
- Do broadcasts delivered inside a loop allow receivers to run immediately or only on a later scheduler pass?

Create a minimal project with two sprites and timestamp/order labels. Do not assume all hat blocks use identical restart rules. Record the observed order as a trace, not a screenshot alone.

## 5. Broadcasts and cross-script communication

A broadcast is a message/event, not a direct function call. Test both “broadcast” and “broadcast and wait” as separate cases.

Useful cases include:
- no receivers;
- one receiver;
- multiple receivers on the same sprite;
- receivers on different sprites;
- receiver already running when message arrives;
- receiver waits, broadcasts another message, or stops itself;
- nested broadcast chains;
- clone receivers;
- broadcast during a Green Flag startup sequence;
- stop/restart while a sender is waiting;
- duplicate message names or project imports with message IDs.

Measure and record **start order**, **completion order**, and **when the sender continues** separately. One final on-stage picture can hide a scheduling mismatch.

## 6. Clones: creation, identity, and cleanup

Clone behavior spans data copying, event dispatch, rendering, and resource cleanup.

Test the following independently:
- Which sprite attributes are copied at clone creation?
- Which variables are sprite-local, global, or clone-local?
- Which costumes, effects, visibility, layer order, direction and position are copied?
- Which event scripts start on a newly created clone?
- Do clone scripts start immediately or on the next scheduler pass?
- Can a clone create another clone?
- What happens at the clone limit?
- Does deleting a clone remove all of its running threads and audio?
- Does Stop remove clones, and in what time as clone count increases?
- Are invisible clones still scheduled? Visibility is a rendering/input property unless an explicit engine rule says otherwise.
- Do clones survive save/export? Usually live clones are runtime instances rather than permanent project targets, so verify project-format semantics separately.

G-Warp's source map reports a default clone limit of 300 in the inspected version. The TODO discusses a freeze after a chaos test produced tens of thousands of clone-like objects and lists fast Stop cleanup as a requirement. A configured cap alone does not prove the cap applies to every creation path or that teardown is fast.

For performance tests, measure both number of clones created and elapsed time for **Stop**, then verify thread count, sprite/clone count, audio, and UI responsiveness after the run.

## 7. Variables, lists, operators and coercion

These are language semantics. A runtime that differs in one conversion rule can make an imported game behave differently even if every block is present.

Test:
- global versus sprite-local variable scope and what clones inherit;
- variable/list IDs after import and duplicate project content;
- values represented as numbers, strings, empty strings, booleans and non-finite numbers;
- numeric string comparison versus lexical comparison;
- rounding for positive and negative halves;
- division by zero, modulo with negative operands, and exponentiation edge cases;
- Unicode, empty strings, emoji and multi-code-unit characters;
- list indexing at the first item, last item, random item, “all”, invalid indexes, empty lists and out-of-range values;
- “contains” behavior for case differences and numeric text;
- joining long strings, list growth, and rendering monitors;
- rename collisions and deletion of a variable used by existing blocks.

Do not paste the expected result from a third-party test corpus without checking its provenance. For example, [grok/TESTS.txt](../grok/TESTS.txt) explicitly marks its negative rounding notes as needing verification. Keep that uncertainty visible until the test has been run against a current Scratch baseline.

## 8. Motion, sensing, layers and Stage coordinates

A Stage has a logical coordinate system independent of its on-screen pixel size. Resizing the browser should scale the view, not change a sprite's logical position.

Compatibility cases:
- forward/backward movement at several headings;
- direction wrapping and turn direction;
- edge bouncing with sprite width/height and rotation;
- rotation styles (all-around, left-right, do-not-rotate);
- sprite size and costume center changes;
- overlapping sprite hit tests, transparent pixels, rotated costumes, scaled display and clone order;
- touching self/another sprite/edge/color;
- mouse Stage coordinates versus browser/client coordinates;
- keyboard key-repeat and held-key semantics;
- visible=false and hit-test policy;
- front/back layer operations with clone creation/deletion;
- backdrop switch event ordering;
- Stage resize at narrow widths and high pixel density;
- pen strokes, clear, layer ordering and save/load if pen data is supported.

Use a transform model explicitly in testing: logical Stage coordinates → scaled canvas coordinates → CSS/client coordinates. Test forward and inverse transforms after resize, scroll, zoom, fullscreen changes and viewport layout changes.

## 9. Costumes, vector/bitmap editing and rendering

Editor behavior and runtime rendering are related but are not the same subsystem.

### Paint/editor tests
- select, drag, resize, rotate, flip, fill, eraser, text and layer ordering;
- undo/redo after every mutation and after switching tool, tab or costume;
- rotation center persistence;
- vector/bitmap switching and conversion loss;
- transparent pixels and antialiasing;
- SVG sanitization and unsupported SVG constructs;
- bitmap scale/resolution and export;
- costume order, names, active costume and deleting the active costume;
- reopen after saving and confirm changes persist.

### Runtime/render tests
- costume bitmap/SVG display;
- scaling, alpha, effects and rotation center;
- clone drawing order, backdrop and Stage clear;
- effect changes reset at the right lifecycle points;
- no stale draw or click shield remains after a tab/modal transition;
- rendering stays aligned with pointer hit testing.

G-Warp uses its own canvas renderer, according to the source map. Never claim pixel-perfect Scratch rendering based solely on matching coordinate dimensions.

## 10. Sound and music lifecycle

A sound block should be tested beyond the first audible note. Confirm:
- user gesture/audio context startup policy;
- sound load/decode failure and corrupted assets;
- play, play-until-done, stop-all-sounds, per-target sound control and clone removal;
- pause/resume/stop interaction with long sounds, looped sounds and notes currently being synthesized;
- concurrent sound ordering and volume changes;
- sound effects and master/target volume;
- timers and delayed callbacks after Stop;
- whether browser audio is suspended when the tab is hidden;
- whether the project produces equivalent audio after save/reopen.

The Web Audio API exposes asynchronous context lifecycle methods such as `suspend()` and `resume()`; see [MDN suspend](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/suspend) and [MDN resume](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/resume). Calling Stop on a script scheduler is not sufficient if audio voices or scheduled nodes keep running independently.

## 11. Procedure / My Blocks semantics

Where supported, test:
- parameter value binding (including text and booleans);
- nested calls and return-to-caller behavior;
- recursion depth and failure containment;
- “run without screen refresh” / warp behavior and yield limits;
- changing or deleting a procedure definition;
- multiple sprites defining procedures with the same visible name;
- procedure mutation while a script is executing;
- clone calls to procedure definitions;
- missing or malformed procedure references after import.

Never optimize procedure execution without a side-by-side test trace. Compiler optimizations that appear safe can alter observable interleaving or make runaway code harder to interrupt. TurboWarp describes such tradeoffs in its [compiler overview](https://docs.turbowarp.org/new-compiler).

## 12. A differential test is an executable claim

For each case, store:

- stable ID and short name;
- minimal project/fixture;
- target build SHA and version;
- Scratch baseline build/date and any editor/VM settings;
- input sequence;
- expected state/output trace;
- actual G-Warp trace;
- result: PASS / FAIL / NEEDS RECHECK / NOT TESTED;
- evidence artifact and regression test path.

Use this order:

1. Test the expected result in current standard Scratch.
2. Repeat in TurboWarp with settings recorded if it is useful as a second reference.
3. Run the same project in G-Warp.
4. Compare exact result and event sequence, not just final screenshot.
5. If engines disagree with one another, isolate the cause before changing G-Warp.
6. Preserve the minimal failing project and add the case permanently.

Start with [the compatibility matrix](./COMPATIBILITY-TEST-MATRIX.md) and [Grok's existing behavior cases](../grok/TESTS.txt).

## 13. Compatibility claims and release labels

Use explicit claims:

- **Core-compatible for tested cases:** named cases pass under stated settings.
- **Project imports:** file parses and editor state loads.
- **Round-trip compatible:** save and reopen preserve targeted project structures and assets.
- **Behavior-compatible for tested cases:** runtime trace agrees with baseline for listed tests.
- **Extension-compatible:** names, block definitions, permissions, runtime functions, cleanup and serialization have each been validated.
- **Not yet established:** all other behaviors.

Never state “100% Scratch compatible” from a UI test suite, block count, successful import, or small sample of projects. The evidence should make it possible for a researcher to challenge or reproduce the claim.
