# G-Warp / Scratch-Style Editor Glossary

This glossary starts with plain-language meanings and adds the engineering meaning that becomes useful while reading source code. It maps concepts; it does not promise that every editor implements them identically.

For G-Warp's version-specific object names, see [ENGINE-MAP.txt](../ENGINE-MAP.txt). For source links and upstream comparisons, see the [Research Library](./RESEARCH-LIBRARY.md).

## Editor and block concepts

| Term | Plain-language meaning | Engineering meaning / caution |
|---|---|---|
| **Block** | One puzzle-shaped instruction or value | A model node with a type/opcode, fields, inputs, and connection relationships; not just a drawn shape |
| **Opcode** | The machine-readable name of a block | Identifier used to dispatch the block's implementation; changing it can break project compatibility |
| **Field** | A value written directly on a block, such as a dropdown option | Serialized block configuration distinct from a child input/reporting block |
| **Input socket** | A slot that accepts a value or nested stack | A typed connection with constraints, defaults, and possibly a shadow block |
| **Statement block** | An instruction that runs as an action | Usually connects vertically into a next-statement chain |
| **Reporter** | A rounded/oval block that gives back a value | Evaluates to a value; can be nested inside expressions and other inputs |
| **Boolean block** | A condition that is true or false | A typed value used by condition inputs; truthiness/conversion rules must be explicit |
| **Hat block** | A block at the top that starts a script when an event happens | Event entry point; restart/multiple-thread policy depends on event type and runtime |
| **C-block** | A control block with an open area for other blocks | Contains nested statement bodies and possibly an alternate branch; editing it changes a subtree |
| **Cap block** | An end block that closes a script | Has no legal next-statement connection after it |
| **Shadow block** | A default/value block shown in an input, often replaced by a real block | Some formats distinguish defaults from normal blocks; don't discard this state in serialization |
| **Block graph** | The connected structure of a script | Model graph/tree made from nodes and typed links; parent, next and input links must agree |
| **Workspace** | The area where scripts are assembled | Includes project block roots plus view state such as scroll/zoom; view state may or may not be serialized |
| **Palette / toolbox** | The list of available blocks | UI projection of block definitions; must stay consistent with handlers actually registered |
| **Snap / connection** | Blocks attach when dropped near valid ports | Geometry plus type validation and a graph mutation; matching pixels alone are insufficient |
| **Comment** | A note attached to a block/script | Must have an attachment/position model and survive relevant save/undo paths |
| **Undo/redo** | Reverse or repeat recent editing actions | History transaction model; one logical edit should not become dozens of inconsistent partial entries |

## Project and targets

| Term | Plain-language meaning | Engineering meaning / caution |
|---|---|---|
| **Project** | The whole game or animation | Persisted data plus metadata/assets; runtime-only state is usually different |
| **Target** | Something that owns scripts and state | General term for Stage/sprite-like execution objects; upstream models may distinguish runtime targets from project targets |
| **Stage** | The scene behind sprites | Has backdrop and stage-wide data; uses logical coordinates separate from browser pixels |
| **Sprite** | A movable object on the Stage | Owns script, transform, costume, sound and data state according to the engine model |
| **Clone** | A runtime copy of a sprite | Has independent runtime identity and lifecycle; creation may start scripts and consume substantial resources |
| **Costume** | An image used by a sprite | Media asset plus metadata such as name, file format, bitmap resolution and rotation center |
| **Backdrop** | An image shown on the Stage | Stage costume/backdrop state; switching may trigger event handlers |
| **Rotation center** | The point a costume rotates around | Coordinate/asset metadata; editing it can change visible position and hit testing |
| **Variable** | A named value that can change | Has scope/ownership and a value type/representation; a sprite-local variable is not the same as a global one |
| **List** | An ordered collection of values | Indexed data model with edge cases for empty/out-of-range indexes and potentially large memory cost |
| **Broadcast/message** | A named signal sent to scripts | Event dispatch mechanism; sender/receiver start order and “wait” behavior require explicit tests |
| **Asset ID** | A key that connects metadata to an image/audio file | Broken ID-to-bytes mapping can produce missing assets even if the project JSON parses |
| **Monitor** | An on-screen variable/list display | UI view of project state; monitor visibility and target scope may be serialized separately |

## Runtime and execution

| Term | Plain-language meaning | Engineering meaning / caution |
|---|---|---|
| **Runtime / engine** | The system that runs a project | Owns current state, event handling, thread scheduling and updates. G-Warp has its own engine |
| **Virtual machine (VM)** | A software engine that executes a defined instruction model | Scratch VM is a specific implementation. G-Warp is not Scratch VM merely because it runs Scratch-style blocks |
| **AST (abstract syntax tree)** | A structured representation of a program | A common representation for script structure; Scratch VM docs describe per-target block data in AST terms |
| **Script thread** | One active execution of a script | A logical task with instruction position, target/clone, call stack, wait state and completion/cancellation state |
| **Program counter (pc)** | Which instruction is next | A scheduler/runtime cursor. Never assume G-Warp's exact field until checked in its current source |
| **Call stack** | The chain of procedure calls waiting to return | Needed for My Blocks/procedure execution; recursion and cleanup rules need tests |
| **Scheduler / sequencer** | Decides which script gets to run next | Governs event interleaving, fairness, yielding and timing; Scratch VM's names are not automatically G-Warp APIs |
| **Yield** | Temporarily give other work/browser input a chance to run | Required for cooperative scheduling and UI responsiveness |
| **Frame budget** | A limit on work done before yielding | A performance/safety target; measure longest uninterrupted tasks, not only average FPS |
| **Warp / no-refresh execution** | A mode where scripts may run without normal redraw interruptions | Can accelerate tight loops but risks freezing the page; compiler/scheduler compatibility is subtle |
| **Green Flag** | Start/restart a project | Usually starts a defined set of event hats, but previous thread/clone cleanup policy must be tested |
| **Stop** | Halt the project | A lifecycle operation that may need to cancel threads, remove clones, stop sounds and clean up extension timers |
| **Turbo mode** | Prioritize speed over normal display cadence | The exact changed limits vary by editor. Never assume it means “ignore every safety budget” |
| **Coercion** | Convert a value from one kind to another | Number/text/Boolean conversions and comparisons affect compatibility, especially at edge cases |
| **Deterministic test** | Same inputs should produce the same expected outcome | Avoid random/timing-dependent behavior unless it is deliberately seeded or measured |
| **Oracle** | The trusted expected answer for a test | Must be verified in the chosen baseline; an unverified expected value can create a false bug |
| **Differential test** | Run the same fixture in two systems and compare | Compare exact state/output traces plus relevant timing/order, not only screenshots |
| **FPS** | Rendered frames per second | Not the same as script steps per second, input latency, responsiveness or Stop duration |
| **Hit testing** | Decide what object a pointer is interacting with | Must use coordinate transforms and visibility/layer rules consistent with rendering |

## Media, rendering and storage

| Term | Plain-language meaning | Engineering meaning / caution |
|---|---|---|
| **Renderer** | Draws the Stage or workspace | G-Warp's source map describes its own 2D canvas path; Scratch uses a different rendering architecture |
| **Logical coordinates** | The project's internal coordinate system | Should not change when the browser window or displayed canvas size changes |
| **Device-pixel ratio (DPR)** | Relationship between CSS pixels and physical display pixels | Canvas backing dimensions and input transforms must account for it |
| **Invalidation / dirty flag** | Marks visual state as needing redraw | Can reduce work, but failing to invalidate creates stale visuals |
| **Audio context** | Browser engine for scheduled sound | Can have running/suspended/closed lifecycle; Stop must also stop voices and scheduled nodes |
| **Object URL** | Temporary browser URL pointing to local bytes | Should be revoked when no longer needed to avoid resource leaks |
| **Serialization** | Convert state into a persistent format | Must include all meaningful state and stable references, but usually not transient pointer/active-thread state |
| **Schema** | The structure and types a file format permits | Structural validation helps reject bad data but does not prove the runtime will interpret it identically |
| **Round-trip** | Load/save/reopen the same project | Should preserve assets, structures and behavior, not just successfully download a file |
| **SB3** | Scratch 3 project file extension | Typically a ZIP container with project.json and image/audio assets; see the parser schema |
| **PMP** | PenguinMod project format family | Validate the specific container/version; ZIP-type and newer protobuf representations are distinct problems |
| **IndexedDB** | Structured browser storage | Useful for larger recovery/autosave data; still needs quota, migration, corruption and privacy handling |
| **localStorage** | Small synchronous browser key/value storage | Avoid using as the only store for very large projects; do not treat it as secure or trusted |

## Extensions and security

| Term | Plain-language meaning | Engineering meaning / caution |
|---|---|---|
| **Extension** | Adds blocks or capabilities not in the core editor | May change runtime behavior, permissions, serialization and interoperability |
| **Sandbox** | A boundary limiting code capabilities | Must be enforced by architecture; a “Safe” badge is only a label |
| **Unsandboxed extension** | Extension code with broad access to the host/editor environment | High trust requirement; it can potentially affect the project and editor directly |
| **Capability** | A power the code can exercise | Examples: network, DOM, storage, clipboard, camera/microphone, project mutation or arbitrary evaluation |
| **Permission / consent** | Explicit user approval for an action | Must describe what data/action, where it goes, and how to stop it; a one-time install click is not universal future consent |
| **Risk label** | A human-readable summary of extension risk | Must match reachable capabilities and review evidence; it does not block those capabilities |
| **Threat model** | The assets, attackers and failure paths under consideration | Makes security review specific rather than relying on “we don't think this is dangerous” |
| **Least privilege** | Give code only the access it needs | Prefer restricted APIs and user-visible, narrow permissions over broad global access |
| **Trust boundary** | Where data/code moves between different privilege levels | Project import, remote extension installation and unsandboxed code are key review points |

## Evidence and collaboration

| Term | Plain-language meaning | Use in this repo |
|---|---|---|
| **Source-verified** | The named detail was found in code | Cite the source version/SHA; do not imply it was tested live |
| **Live-browser-verified** | The real behavior was reproduced | Name browser, viewport, build/SHA, steps and artifacts |
| **Static analysis** | Reasoned from code without running behavior | Label as inference until tested |
| **Not tested** | No reliable result is available | Prefer this to guessing |
| **Regression test** | A permanent test for a previously broken case | Run after fixes and on later builds |
| **Candidate patch** | Code prepared for review | Does not affect public app until merged |
| **Merge queue** | List of candidate code/research and its status | Check before duplicating work or assuming an unmerged module is live |
| **Source SHA** | Content identity of a specific file revision | Makes implementation claims reproducible even if branch names move |

## Recommended learning route

1. Read [Learn G-Warp](./LEARNING-GUIDE.md) to get the user-facing concepts.
2. Read this glossary when unfamiliar terms appear.
3. Read [Engineering Reference](./ENGINEERING-REFERENCE.md) for system boundaries.
4. Read [Editor Engineering Playbook](./EDITOR-ENGINEERING-PLAYBOOK.md) to understand implementation steps.
5. Read [Runtime Semantics](./RUNTIME-SEMANTICS-AND-PARITY.md) for behavior and edge cases.
6. Use the [Compatibility Test Matrix](./COMPATIBILITY-TEST-MATRIX.md) to turn questions into reproducible tests.
7. Check [Research Library](./RESEARCH-LIBRARY.md) before relying on external descriptions or old source locations.
