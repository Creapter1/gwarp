# Scratch VM Explained: From Blocks to Running Projects

The Scratch Virtual Machine (Scratch VM) is the part of the Scratch system responsible for maintaining project program state and running scripts. It is useful to understand the VM because the visual blocks on screen are not, by themselves, the running program.

This guide gives a conceptual explanation. Exact internal APIs and package boundaries can change, so use the current source repository when investigating implementation details.

## 1. The workspace and the VM have different jobs

The block workspace lets a person create and edit scripts. It handles visual tasks such as dragging, connecting, nesting and displaying blocks.

The VM needs a structured representation of those scripts so it can understand what each target should do. In Scratch, the workspace communicates changes to the VM, and the VM maintains its own block representation.

The important distinction is:

- The workspace is the visual editing interface.
- The VM owns program state and execution.
- The renderer displays the result of execution.

These systems cooperate, but they are not interchangeable.

## 2. How a visual block becomes program data

A block is more than its label and color. Its data can include:

| Concept | Meaning |
|---|---|
| ID | Unique identity for this block |
| Opcode | The operation it represents |
| Inputs | Connections to values, conditions or nested blocks |
| Fields | Literal values and menu selections |
| Next | The next statement in a stack |
| Parent | The block or connection that contains it |
| Top-level status | Whether it begins a script |
| Workspace position | Where a top-level block appears visually |

For example, a move block needs an operation name and an input value for the number of steps. A control block also needs a connection to the statements nested inside it.

The exact Scratch representation is more detailed than this conceptual summary. The current [scratch-vm README](https://github.com/scratchfoundation/scratch-editor/blob/develop/packages/scratch-vm/README.md) documents the project structure and block model.

## 3. Events start scripts

A project can contain scripts that wait for different events:

- the Green Flag is clicked;
- a key is pressed;
- a sprite is clicked;
- a broadcast message arrives;
- a clone is created.

An event system finds the scripts that listen for the event and starts them. The VM then tracks their progress.

## 4. Threads and scheduling

A project can have several scripts running at the same time. A runtime commonly represents each active script as a thread or execution task.

A thread needs to know where it is in the script, which target it belongs to, and whether it is waiting or finished.

The scheduler gives runnable threads time to execute. It must also let the browser update the screen and respond to user input.

This is why a wait block should pause the relevant script rather than blocking the entire page. Loops, broadcasts, clones, stop commands and errors also need clearly defined behavior.

## 5. Interpreting and compiling

An interpreter reads the program representation and performs operations as the project runs.

A compiler can transform scripts into another form before or during execution. TurboWarp, for example, offers a compiler that can generate JavaScript for project scripts.

Neither approach is automatically best for every situation. Interpreters can be easier to inspect and adapt during editing. Compilation can improve performance for some projects, but it adds complexity and may affect debugging or live changes.

Read [How TurboWarp runs projects](https://docs.turbowarp.org/how) for its explanation of interpreter and compiler behavior.

## 6. The VM does not draw the Stage by itself

Execution changes project state: sprite positions, variables, costumes, clones and other values.

A renderer reads the relevant state and draws the Stage. Audio systems handle sound playback. The editor UI displays controls, monitors and other interface elements.

Keeping these responsibilities separate helps developers diagnose problems. If a script runs but the sprite does not appear to move, investigate the state update and rendering path separately.

## 7. How to investigate Scratch VM source

The current Scratch editor development home is the [Scratch editor monorepo](https://github.com/scratchfoundation/scratch-editor). The VM package is located at:

[packages/scratch-vm](https://github.com/scratchfoundation/scratch-editor/tree/develop/packages/scratch-vm)

The older standalone Scratch VM repository is archived after the project migration. It can still be useful for historical context, but current development should be checked in the monorepo.

Useful companion projects:

- [Scratch Blocks](https://github.com/scratchfoundation/scratch-blocks) — the visual block workspace.
- [Scratch renderer](https://github.com/scratchfoundation/scratch-editor/tree/develop/packages/scratch-render) — Stage drawing.
- [Scratch audio](https://github.com/scratchfoundation/scratch-audio) — sound and audio behavior.

## 8. Comparing another editor with Scratch VM

An editor can look similar to Scratch without using Scratch VM.

For example, G-Warp is an independent implementation with its own Engine and ScriptThread execution model. Its source should be studied on its own terms rather than assuming Scratch VM APIs exist in it.

See the [G-Warp Engineering Reference](./ENGINEERING-REFERENCE.md) for the implementation described by the inspected source snapshot, and the [Build Your Own Editor guide](./BUILD-YOUR-OWN-BLOCK-CODING-EDITOR.md) for a broader architecture walkthrough.

## Summary

The Scratch VM connects the structured program to execution. The workspace edits scripts, the VM maintains and runs them, and rendering/audio systems show or play the result. Understanding those boundaries is one of the most useful steps when studying Scratch or designing another block-based programming environment.
