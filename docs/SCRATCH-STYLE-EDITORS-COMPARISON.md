# Scratch, TurboWarp, PenguinMod and Independent Block Editors

Scratch-style editors share a visual idea: users build programs by connecting blocks. That shared experience does not mean the projects use the same source code, runtime, extensions or file compatibility.

This page is a neutral orientation guide. Features and project structures change, so check each project's current documentation before relying on a particular capability.

## 1. Scratch

[Scratch](https://scratch.mit.edu/) is a visual programming environment designed to make programming approachable. Its editor combines a block workspace, project runtime, Stage, artwork tools, sound and project storage.

For developers, the current source development home is the [Scratch editor monorepo](https://github.com/scratchfoundation/scratch-editor). Related projects include [Scratch Blocks](https://github.com/scratchfoundation/scratch-blocks) and [Scratch Audio](https://github.com/scratchfoundation/scratch-audio).

Scratch is a useful reference for understanding block-based programming concepts and the architecture of a mature educational editor.

## 2. TurboWarp

[TurboWarp](https://turbowarp.org/) is a Scratch mod that focuses on additional features and performance options. Its documentation describes how it runs projects, including its compiler option.

- [TurboWarp documentation](https://docs.turbowarp.org/)
- [Development guide](https://docs.turbowarp.org/development/getting-started)
- [Interpreter and compiler explanation](https://docs.turbowarp.org/how)

TurboWarp is a useful reference for studying how a Scratch-compatible project can add features and offer a different execution strategy.

## 3. PenguinMod

[PenguinMod](https://penguinmod.com/) is a TurboWarp-based mod with additional features and extensions.

- [PenguinMod documentation](https://docs.penguinmod.com/)
- [PenguinMod GitHub organization](https://github.com/PenguinMod)

Do not assume every extension or project feature is shared by Scratch or TurboWarp. Check the documentation and test the actual project format.

## 4. Independent editors

Some projects create their own block workspace, runtime, renderer, asset tools and project format instead of building directly on Scratch or TurboWarp code.

An independent editor has more freedom over its interface and architecture, but it also has to implement and maintain the systems that established projects already provide.

G-Warp is one example of this approach. Its inspected source describes a custom DOM-based block workspace, its own Engine and ScriptThread runtime, a custom 2D canvas renderer, media tools and project-file handling. It is not built on Scratch VM, TurboWarp VM or PenguinMod VM.

See the [G-Warp Engineering Reference](./ENGINEERING-REFERENCE.md) for source-specific details. Those details describe the inspected source snapshot and should not be generalized to other editors.

## 5. Questions to ask when comparing editors

| Question | Why it matters |
|---|---|
| Is it based on Scratch, TurboWarp or an independent codebase? | Determines which internal APIs and upstream changes may apply |
| What runtime executes scripts? | Affects scheduling, performance and behavior |
| How are blocks represented? | Affects editing, saving and conversion |
| Which project formats can it import and export? | Determines practical file interchange |
| Are extensions supported? | Adds capabilities but may affect portability and safety |
| What media tools are included? | Determines how artwork and audio are created |
| What is actually tested? | Separates documented features from verified behavior |

## 6. Project compatibility is not guaranteed by appearance

Two editors can use similar block shapes but store and execute programs differently. A file extension alone is not proof that every feature will survive import or export.

For a meaningful compatibility test:

1. Create a small project using the features you need.
2. Save it from the source editor.
3. Open it in the target editor.
4. Check scripts, variables, sprites, costumes, sounds and extensions.
5. Save or export it again if supported.
6. Reopen the exported project and compare the result.

Record unsupported features rather than silently dropping them.

## 7. Where to learn more

- [How block-based programming editors work](./BLOCK-BASED-PROGRAMMING-ARCHITECTURE.md)
- [Scratch VM explained](./SCRATCH-VM-EXPLAINED.md)
- [Build Your Own Scratch-Style Block-Coding Editor](./BUILD-YOUR-OWN-BLOCK-CODING-EDITOR.md)
- [Scratch, TurboWarp and PenguinMod architecture reference](./UPSTREAM-ARCHITECTURE-REFERENCE.md)

The goal of a good comparison is to help readers understand the choices each project makes—not to declare one editor universally best.
