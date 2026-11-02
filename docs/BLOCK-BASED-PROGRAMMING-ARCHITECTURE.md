# How Block-Based Programming Editors Work

Block-based programming lets people build programs by connecting visual pieces instead of writing every instruction as text. Scratch is a well-known example, but the same ideas appear in robotics tools, educational coding apps, game makers and visual automation systems.

This guide explains the ideas behind these editors in a way that applies to many projects.

## 1. The main parts of an editor

A typical block-based programming environment has several connected parts:

| Part | What it does |
|---|---|
| Block palette | Shows the blocks a user can choose |
| Workspace | Holds the scripts and lets users arrange and connect blocks |
| Project model | Stores the meaning and connections of the program |
| Runtime or virtual machine | Executes the program |
| Stage or preview | Shows the result of the running program |
| Asset tools | Create and edit images, sounds and other media |
| Project storage | Opens, saves and exports projects |

These parts can live in one application or in separate packages. The important point is that they have clear responsibilities and exchange data through defined interfaces.

## 2. Blocks are visual representations of instructions

A block usually represents an operation, a value, a condition or an event.

Common block families include:

- **Events:** start a script when something happens.
- **Motion and actions:** change an object's position, appearance or state.
- **Control:** repeat instructions, wait, or choose between paths.
- **Operators:** calculate values, compare things or combine text.
- **Variables and lists:** remember information.
- **Sensing:** read input or ask questions about the project.

The shape of a block can communicate how it connects. A statement block may connect above and below; a reporter may fit into a value socket; a Boolean block may fit into a true/false socket; and a C-shaped block may contain other statements.

Shape alone is not enough. The editor must enforce connection rules so an invalid program structure cannot be created accidentally.

## 3. The workspace is a program editor

A workspace is not merely a drawing surface. It is an interface for editing a structured program.

When a user drags a stack, the editor needs to know:

1. Which block or stack is being moved.
2. Where the pointer is in workspace coordinates.
3. Which nearby connection points are compatible.
4. Whether the proposed connection would create an invalid structure.
5. How to update the program model when the user releases the pointer.
6. How to record the change for undo and redo.

A good editor shows a connection preview before the user drops a stack. It should also handle detaching, nesting, deleting, duplicating, undoing and redoing without losing parts of the program.

## 4. The project model stores meaning

The visual workspace needs an underlying representation of the program. Many systems represent blocks as records connected into a graph or tree.

A simplified block record might contain:

| Field | Purpose |
|---|---|
| ID | Identifies this block |
| Operation or opcode | Names the action represented |
| Fields | Stores dropdown choices or literal values |
| Inputs | Points to nested value or statement inputs |
| Next | Points to the next statement |
| Parent | Identifies the containing block or connection |
| Position | Stores where a top-level block appears in the workspace |

This is an illustrative model, not a complete Scratch file format. Different editors use different schemas.

Keeping program meaning separate from screen layout makes it easier to execute, save, validate and transform projects.

## 5. The runtime executes scripts

The runtime turns the project model into behavior.

A common design has:

- an **event dispatcher** that notices events such as a start button, key press or message;
- **threads** that track scripts currently running;
- an **interpreter** that performs block operations;
- a **scheduler** that decides which scripts run and when;
- an **engine state** containing objects, variables, timers, input and other project data.

Several scripts may need to run at once. A wait block should pause its own script rather than freeze the entire application. Stop behavior should cancel the relevant scripts, timers, clones and sounds.

Some systems interpret blocks directly. Others compile scripts into another representation, such as JavaScript. These approaches have different tradeoffs for performance, debugging and live editing.

## 6. The Stage and renderer

The Stage displays the running project. A renderer may draw sprites, backdrops, clones, effects, monitors and overlays.

Choose a logical coordinate system for the project and keep it independent of the editor window size. If the Stage becomes smaller, the project coordinates should not unexpectedly change.

Rendering and hit-testing must agree. If an object appears at one location but receives clicks or collision checks somewhere else, the coordinate systems are inconsistent.

## 7. Assets and project files

A project often includes more than scripts:

- sprites or objects;
- backdrops or scenes;
- costumes or animation frames;
- sounds and music;
- variables and lists;
- extension metadata;
- project settings.

A reliable save format must preserve the relationships between these parts. Importing a file is not the same as proving compatibility. A useful test is to import a project, inspect its contents, export it again, and open the result in the intended target application.

## 8. How the pieces connect

A simplified flow looks like this:

```text
User action
    ↓
Block workspace
    ↓
Project model
    ↓
Runtime and scheduler
    ↓
Engine state
    ↓
Renderer and audio
    ↓
Visible project result
```

Saving follows another path from the project model and assets into a file package. Loading reverses that path.

## 9. A practical way to study an editor

Choose one small feature, such as a block that moves a sprite. Trace it through the whole application:

1. Find the block definition in the palette.
2. Find how the workspace stores its connections.
3. Find how the project model represents the operation.
4. Find the runtime code that executes it.
5. Find how the renderer displays the changed position.
6. Find how the project saves and reloads the block.

This method is more reliable than searching for a button name and assuming that the button contains the whole feature.

## 10. Further reading and examples

- [Scratch editor source repository](https://github.com/scratchfoundation/scratch-editor)
- [Scratch Blocks](https://github.com/scratchfoundation/scratch-blocks)
- [TurboWarp development documentation](https://docs.turbowarp.org/development/getting-started)
- [TurboWarp: how projects run](https://docs.turbowarp.org/how)
- [PenguinMod documentation](https://docs.penguinmod.com/)
- [Build Your Own Scratch-Style Block-Coding Editor](./BUILD-YOUR-OWN-BLOCK-CODING-EDITOR.md)
- [Scratch, TurboWarp and PenguinMod architecture reference](./UPSTREAM-ARCHITECTURE-REFERENCE.md)

G-Warp is one independent example of a block-coding application. Its own implementation is described separately in the [G-Warp Engineering Reference](./ENGINEERING-REFERENCE.md). Its architecture should not be assumed to match Scratch, TurboWarp or PenguinMod.
