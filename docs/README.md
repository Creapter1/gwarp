# G-Warp Documentation

This documentation has two purposes:

1. Help people learn block-based programming and use G-Warp to make games, animations, interactive stories and music.
2. Explain how block-coding editors are designed, how Scratch/TurboWarp/PenguinMod fit together, and how to build an independent editor.

The general learning guides are useful even if a reader has never used G-Warp. Project-specific pages are clearly identified as implementation references. Technical claims should be tied to source inspection or actual tests; a visible control alone does not prove that every interaction works.

## 1. Learn the concepts

| Guide | What it explains |
|---|---|
| [How Block-Based Programming Editors Work](./BLOCK-BASED-PROGRAMMING-ARCHITECTURE.md) | Block shapes, workspace editing, project models, runtimes, rendering and files |
| [Scratch VM Explained](./SCRATCH-VM-EXPLAINED.md) | How Scratch block data becomes running scripts |
| [Scratch, TurboWarp, PenguinMod and Independent Editors](./SCRATCH-STYLE-EDITORS-COMPARISON.md) | Neutral overview of different approaches and compatibility |
| [Build Your Own Block-Coding Editor](./BUILD-YOUR-OWN-BLOCK-CODING-EDITOR.md) | A staged guide to designing and implementing an editor |
| [Upstream Architecture Reference](./UPSTREAM-ARCHITECTURE-REFERENCE.md) | Scratch GUI/Blocks/VM/rendering, TurboWarp compilation and PenguinMod |

## 2. Understand G-Warp's implementation

- [Engineering Reference](./ENGINEERING-REFERENCE.md) — the actual G-Warp UI, custom workspace, Engine/ScriptThread runtime, Stage renderer, costumes, music, Tilemap, Behaviors, extensions and project files.
- [Source Module Index](./SOURCE-MODULE-INDEX.md) — inline script IDs, globals, source entry points and module-order notes.
- [Developer Reference](./DEVELOPER-REFERENCE.md) — source identity, architecture overview, implementation caveats and upstream references.
- [App internals diagram](./images/gwarp-app-internals.svg) — visual map of main implementation layers.
- [Scratch-to-G-Warp map](./images/scratch-to-gwarp-map.svg) — conceptual mapping between upstream systems and G-Warp's custom implementation.

G-Warp's main editor is packaged in root `app.html` with many inline modules. It does not import Scratch VM as its runtime. The version label is not enough to identify a build; use the branch, source commit/blob and actual test evidence.

## 3. Learn to use G-Warp

- [Learning Guide](./LEARNING-GUIDE.md) — first project, block shapes, events, variables, costumes, music and testing.
- [Complete User Guide](./USER-GUIDE.txt) — practical control-by-control instructions for the inspected app source.
- [Screenshot and UI Behavior Guide](./SCREENSHOT-UI-DOCUMENTATION.md) — controls, menus, tabs, context menus and screenshot evidence.
- [Tutorials](./tutorials/index.html) — small projects built one step at a time.
- [Glossary](./glossary.html) — plain-language meanings of editor and coding terms.
- [Parents and Teachers](./parents.html) — orientation and safety reminders.

## 4. Feature guides

- [Blocks](./blocks.html)
- [Costumes](./costumes.html)
- [Animation](./animation.html)
- [Sounds and Song Maker](./sounds.html)
- [Extensions](./extensions.html)
- [Scratch project compatibility](./scratch.html)
- [Safety and Privacy](./safety.html)
- [Credits and Licences](./credits.html)

## 5. What was actually checked

- [Live UI Verification](./LIVE-UI-VERIFICATION.txt) records a Chromium run against Beta v15.45.0, including the environment, passed interactions and NOT-TESTED cases.
- The screenshots under [docs/screens/](./screens/) are a historical v15.45.0 set. Check the source version and test report before treating them as evidence for a newer build.

A visible control is not proof of working behavior. Keep source inspection, screenshot evidence and live interaction tests distinct.

## 6. How to study or change G-Warp safely

1. Read the [Engineering Reference](./ENGINEERING-REFERENCE.md), [Source Module Index](./SOURCE-MODULE-INDEX.md) and relevant section of `app.html`.
2. Check the current branch, commit and source blob SHA. Do not assume an old script ID or version label identifies the current release.
3. Trace the feature through visible control → handler → model/state → runtime/render/audio → save/load → test.
4. Record exact test results and anything NOT-TESTED. Never claim cross-editor compatibility without a real round-trip test.

## 7. Upstream projects

- [Scratch editor monorepo](https://github.com/scratchfoundation/scratch-editor)
- [Scratch Blocks](https://github.com/scratchfoundation/scratch-blocks)
- [Scratch audio engine](https://github.com/scratchfoundation/scratch-audio)
- [TurboWarp development docs](https://docs.turbowarp.org/development/getting-started)
- [TurboWarp interpreter/compiler overview](https://docs.turbowarp.org/how)
- [PenguinMod documentation](https://docs.penguinmod.com/)

The upstream package layout and setup instructions change. Read each project's current README and licence before copying a command, module or code.
