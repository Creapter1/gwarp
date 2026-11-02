# G-Warp Documentation — complete map

This documentation has two jobs:

1. Help a person use G-Warp, from their first block stack to animation, music, extensions and project files.
2. Help an AI or developer understand how G-Warp is implemented, how it differs from Scratch/TurboWarp/PenguinMod, and how to build a similar block-coding app.

The documentation is written against evidence. A picture can prove a control is visible; source inspection can prove code exists; only a real test can prove the interaction worked.

## 1. Start with the developer reference

**[Developer Reference](./DEVELOPER-REFERENCE.md)** is the technical starting point for understanding G-Warp's architecture, source identity, built-in helper, external-provider path and upstream references.

## 2. Understand how G-Warp is built

| Document | What it explains |
|---|---|
| [Engineering Reference](./ENGINEERING-REFERENCE.md) | Actual G-Warp UI, DOM workspace, Engine/ScriptThread runtime, Stage renderer, costumes, music, Tilemap, Behaviors, extensions, files, LAN, Scratch architecture comparison and build-from-zero order |
| [Source Module Index](./SOURCE-MODULE-INDEX.md) | Inline script IDs, real globals, source entry points, helper data paths, SB3/PenguinMod boundaries and module-order warnings |
| [Helper Data Flow](./HELPER-DATA-FLOW.md) | What G-Spark does locally, what the bug report stores in the browser, and what the developer-only Anthropic path sends |
| [Upstream Architecture Reference](./UPSTREAM-ARCHITECTURE-REFERENCE.md) | How Scratch's GUI/Blocks/VM/rendering work together, how TurboWarp compiles scripts, and where PenguinMod's PMP/protobuf tools fit |
| [Build Your Own Block-Coding Editor](./BUILD-YOUR-OWN-BLOCK-CODING-EDITOR.md) | A staged guide to project data, blocks, connections, runtime, scheduling, rendering, media, files, extensions and tests |
| [App internals diagram](./images/gwarp-app-internals.svg) | Visual map of main implementation layers |
| [Scratch-to-G-Warp map](./images/scratch-to-gwarp-map.svg) | Conceptual mapping between upstream systems and G-Warp's custom implementation |

G-Warp's main editor is packaged in root app.html with many inline modules. It does not import Scratch VM as its runtime. The version label is not enough to identify a build; use the branch, source commit/blob and actual screenshot provenance.

## 2.1. Game-design research library

The root [research index](../research/RESEARCH-INDEX.md) links to dozens of game-design notes. Each note covers the game's core mechanics, a practical first-version plan, common pitfalls and a prototype scope. These pages are a human-readable game-design reference. The checked-in G-Warp app does **not** automatically load this Markdown folder into G-Spark; its active recipe/tip knowledge is embedded in app.html modules. See the [Developer Reference](./DEVELOPER-REFERENCE.md) and [Source Module Index](./SOURCE-MODULE-INDEX.md) for the distinction.

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

These guides should be read alongside the engineering reference when you need to know not only where a control is, but how it works and what is saved.

## 5. What was actually checked

- [Live UI Verification](./LIVE-UI-VERIFICATION.txt) records a Chromium run against Beta v15.45.0, including the environment, passed interactions and NOT-TESTED cases.
- The screenshots under [docs/screens/](./screens/) are a historical v15.45.0 set. Check the source version and test report before treating them as evidence for a newer build.

A visible control is not proof of working behavior. Keep source inspection, screenshot evidence and live interaction tests distinct.

## 6. How to change G-Warp safely

Before changing the application:

1. Read the [Developer Reference](./DEVELOPER-REFERENCE.md), [Source Module Index](./SOURCE-MODULE-INDEX.md) and relevant section of `app.html`.
2. Check the current branch, commit and source blob SHA. Do not assume an old script ID or version label identifies the current release.
3. Trace the feature through visible control → handler → model/state → runtime/render/audio → save/load → test.
4. Record exact test results and anything NOT-TESTED. Never claim cross-editor compatibility without a real round-trip test.

## 7. Where to study the upstream projects

- [Scratch editor monorepo](https://github.com/scratchfoundation/scratch-editor)
- [Scratch Blocks](https://github.com/scratchfoundation/scratch-blocks)
- [Scratch audio engine](https://github.com/scratchfoundation/scratch-audio)
- [TurboWarp development docs](https://docs.turbowarp.org/development/getting-started)
- [TurboWarp interpreter/compiler overview](https://docs.turbowarp.org/how)
- [PenguinMod documentation](https://docs.penguinmod.com/)

The upstream package layout and setup instructions change. Read each project's current README and licence before copying a command, module or code.
