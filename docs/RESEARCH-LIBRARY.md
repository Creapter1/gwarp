# G-Warp Research Library: Primary Sources, Comparisons, and Evidence

**Purpose:** make this repository a durable, source-linked place to learn how G-Warp works and how Scratch-style editors are engineered. This library is intentionally more than a list of Scratch links: each source has a job, each G-Warp claim has an evidence level, and each compatibility claim should lead to a test.

**Research snapshot:** 2026-10-13  
**G-Warp baseline for source-specific notes:** Beta v15.45.0, `app.html` SHA `7ce527ca2908c63bbdfe642856ca29fd82178648`. Re-check the current file before applying that map to a newer build.

## Start at the right level

- **New user:** [Learn G-Warp](./LEARNING-GUIDE.md) and the [Glossary](./GLOSSARY.md)
- **Use the interface:** [Complete user guide](../chatgpt/USER-GUIDE.txt) and [UI behavior guide](../chatgpt/SCREENSHOT-UI-DOCUMENTATION.md)
- **Understand implementation:** [Engineering reference](./ENGINEERING-REFERENCE.md), [engine map](../ENGINE-MAP.txt), and [editor engineering playbook](./EDITOR-ENGINEERING-PLAYBOOK.md)
- **Research behavior and edge cases:** [Runtime semantics](./RUNTIME-SEMANTICS-AND-PARITY.md), [test matrix](./COMPATIBILITY-TEST-MATRIX.md), and [file formats](./PROJECT-FORMATS-AND-ROUNDTRIP.md)
- **Work safely with extensions:** [Extension security model](./EXTENSIONS-SECURITY-MODEL.md)
- **See what was actually tested:** [Live UI verification](./LIVE-UI-VERIFICATION.txt), [UI audit](../chatgpt/UI-AUDIT.txt), and [Grok's 75-case behavior corpus](../grok/TESTS.txt)

## 1. Source hierarchy: how much should a reader trust a claim?

Prefer evidence in this order. A source can be authoritative for one question and not another.

| Evidence type | Good for | Limitation |
|---|---|---|
| Current G-Warp source at a recorded Git SHA | Exact current names, code paths, data shapes, and implemented guards | Source existence does not prove the user-visible behavior works |
| Reproducible browser test with build, browser, steps, and result | Actual behavior in a specific environment | A passing test covers only its scenario and environment |
| Official upstream source and documentation | How the upstream implementation is intended to behave | It does not prove G-Warp matches upstream |
| Maintainer documentation / specifications / schemas | Intended format or design contract | Must be checked against implementation and versions |
| Community specification / wiki / forum | Edge cases, historical behavior, useful hypotheses | May be incomplete, outdated, or disputed |
| Static code reading or reasoned inference | A plausible explanation to test | Not a reproduced result |
| AI-generated summary without linked evidence | Brainstorming only | Not a source of truth |

Use these labels consistently:

- **SOURCE-VERIFIED:** directly located in the named G-Warp source version.
- **UPSTREAM-DOCUMENTED:** described in the linked upstream docs or source.
- **LIVE-BROWSER-VERIFIED:** reproduced in the named app/browser/viewport.
- **STATIC-ANALYSIS:** inferred from source without a reproduction.
- **COMMUNITY-SPECIFICATION:** documented by a community reference; independently confirm edge cases.
- **NOT TESTED:** no reliable result yet.
- **CONFLICT / NEEDS RECHECK:** sources disagree, or the case is known to be ambiguous.

Never convert SOURCE-VERIFIED into LIVE-BROWSER-VERIFIED without running the behavior. Never convert an expectation in a test file into a verified Scratch fact merely because it looks plausible.

## 2. The G-Warp source map (start with our own implementation)

### Canonical repository files

- [`app.html`](../app.html) — the actual one-file application; largest and most important source of implementation truth.
- [`ENGINE-MAP.txt`](../ENGINE-MAP.txt) — carefully recorded engine globals and known hooks. It explicitly warns that G-Warp is **not** Scratch VM.
- [`TODO.txt`](../TODO.txt) — owner priorities, compatibility goals, work constraints, and current blockers.
- [`AI-TEAM.txt`](../AI-TEAM.txt) — collaboration boundaries and chronological log.
- [`MERGE-QUEUE.txt`](../MERGE-QUEUE.txt) — status of work prepared for later integration; a file listed here is not necessarily merged or released.
- [`chatgpt/UI-AUDIT.txt`](../chatgpt/UI-AUDIT.txt) — static UI behavior audit and manual test plan.
- [`docs/LIVE-UI-VERIFICATION.txt`](./LIVE-UI-VERIFICATION.txt) — recorded real interaction checks and screenshots.
- [`grok/SPEC-*.txt`](../grok/) — research specifications by runtime category.
- [`grok/TESTS.txt`](../grok/TESTS.txt) — 75 small behavior cases intended for differential testing.
- [`deepseek/NOTES-pmp.txt`](../deepseek/NOTES-pmp.txt) and [`deepseek/pmp-loader.js`](../deepseek/pmp-loader.js) — format research and a candidate loader; inspect status and test results before relying on it.
- [`chatgpt/NOTES-clone-safety.txt`](../chatgpt/NOTES-clone-safety.txt) — intent and integration notes for candidate safety work, not proof that it is merged.
- [`chatgpt/NOTES-scratch-link.txt`](../chatgpt/NOTES-scratch-link.txt) — candidate browser-link integration notes, not proof that the browser extension is finished.

### Current source-map highlights (v15.45.0 baseline)

The checked-in engine map identifies `window.Engine` as G-Warp's main engine object and documents sprites, running `ScriptThread` instances, project data, broadcasts, extensions, tilemap, behavior system, and other fields. It also lists helpers such as `window.GW`, `window.GW8`, `GW_DIALOG`, `GW_FEATURE_OFF`, and `GW_WARP_GUARD`.

The same source map explicitly says not to invent Scratch-VM APIs such as `window.vm`, `runtime.sequencer`, `Engine.renderer`, or `Engine.pen`. G-Warp uses its own 2D canvas rendering path. The documented collision hook is `GW.spritesTouch(a, b)`; the documented thread-step method is `ScriptThread.step()`; the pen canvas function is private and has no public hook in that map.

Treat every name above as a versioned snapshot, not a permanent public API. Read [ENGINE-MAP.txt](../ENGINE-MAP.txt) and verify the current source before writing code.

## 3. Primary upstream sources: Scratch

### Current Scratch editor mono-repository

The Scratch editor components have been moving into one repository. The current source entry point is [scratchfoundation/scratch-editor](https://github.com/scratchfoundation/scratch-editor). Its README describes several major packages:

- `scratch-gui`: visible editor interface and the glue joining modules.
- `scratch-vm`: running and maintaining the state of Scratch projects.
- `scratch-paint`: vector and bitmap editing.
- `scratch-render`: drawing stage content.
- `scratch-storage`: loading project assets.
- `scratch-svg-renderer`: processing SVG costume assets.
- `task-herder`: task queues and throttled/concurrent work.

**Research rule:** use the current monorepo for current development paths. The older [scratch-vm repository](https://github.com/scratchfoundation/scratch-vm) has a migration notice and is archived; it remains useful history, but do not assume its default branch is the current development location.

Useful starting points:
- [Scratch editor monorepo overview](https://github.com/scratchfoundation/scratch-editor)
- [Scratch VM package README](https://github.com/scratchfoundation/scratch-editor/tree/develop/packages/scratch-vm)
- [Scratch Blocks repository](https://github.com/scratchfoundation/scratch-blocks)
- [Scratch Parser repository and SB3 schema](https://github.com/scratchfoundation/scratch-parser)
- [Scratch VM extension documentation](https://github.com/scratchfoundation/scratch-editor/blob/develop/packages/scratch-vm/docs/extensions.md)
- [Scratch editor in the browser](https://scratch.mit.edu/projects/editor/)

The VM README gives a useful conceptual example of a block record containing an ID, opcode, fields, inputs, next connection, top-level flag, parent, shadow state and workspace coordinates. That is a reference shape—not a claim that G-Warp stores blocks identically.

### Scratch behavior specifications

- [Scratch Specification community project](https://scratchspec.github.io/full/) — an extensive community-authored explanation of runtime behavior. Useful for edge cases and hypotheses; its own file-format chapter describes itself as incomplete, so treat it as a community specification, not an official complete contract.
- [Scratch file-format notes](https://scratchspec.github.io/files/) — explains the high-level SB3 ZIP shape and warns that correct runtime behavior is not enough if loading changes project meaning.
- [Official SB3 parser schema](https://github.com/scratchfoundation/scratch-parser/blob/master/lib/sb3_schema.json) and [definitions](https://github.com/scratchfoundation/scratch-parser/blob/master/lib/sb3_definitions.json) — useful for structural validation. A schema does not define every runtime semantic or every editor's tolerance for malformed input.

## 4. TurboWarp sources

TurboWarp is especially useful when investigating performance, extra settings, custom extensions, and compatibility tradeoffs. It is not safe to assume G-Warp shares TurboWarp's code or optimization behavior.

- [TurboWarp documentation](https://docs.turbowarp.org/)
- [New compiler overview](https://docs.turbowarp.org/new-compiler) — explains how script analysis and generated JavaScript can change performance and compatibility.
- [Custom extension introduction](https://docs.turbowarp.org/development/extensions/introduction) — separates core extensions from sandboxed and unsandboxed custom extensions.
- [Unsandboxed extension notes](https://docs.turbowarp.org/development/extensions/unsandboxed) — documents the additional powers and risks of running code in the main window.
- [Official TurboWarp extension gallery](https://extensions.turbowarp.org/) — states that gallery items are reviewed for safety, that many are not Scratch-compatible, and that projects requiring them do not upload/run in standard Scratch as ordinary projects.
- [TurboWarp editor](https://turbowarp.org/editor)
- [TurboWarp add-ons](https://turbowarp.org/addons)

Do not infer parity from a similar menu, option label, extension count, or reported FPS. Test the actual project behavior, lifecycle and import/export result.

## 5. PenguinMod sources

- [PenguinMod editor documentation](https://docs.penguinmod.com/codeeditor/) — explains the visible toolbox, categories and workspace.
- [PenguinMod extension documentation](https://docs.penguinmod.com/development/extensions/) — explains sandboxed versus unsandboxed custom extensions and their different capabilities.
- [PenguinMod extension tutorial](https://docs.penguinmod.com/development/extensions/introduction/)
- [PenguinMod extension docs index](https://docs.penguinmod.com/extensions/)

The PenguinMod documentation itself warns that parts are unfinished. Its live behavior, release implementation and project format must be checked when working on a specific feature. G-Warp's engine map says the inspected app can open ZIP-type PMP files and has a PenguinMod-link path, but newer protobuf-based PMP support was listed as missing in that source snapshot. See [Project formats and round-trip testing](./PROJECT-FORMATS-AND-ROUNDTRIP.md).

## 6. General editor / web-platform engineering sources

- [Blockly serialization guide](https://docs.blockly.com/guides/configure/serialization/) — workspace state, JSON serialization, serializer registration and load ordering.
- [Blockly plugin overview](https://docs.blockly.com/guides/programming/plugin_overview/) — how extension points such as custom fields, renderers and themes are packaged.
- [MDN: requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame) — one-shot scheduling, refresh-rate alignment, and why motion should use elapsed time rather than assuming fixed 60 Hz.
- [MDN: IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) — asynchronous structured storage useful for large local project/recovery data; it still requires quota/error handling and input validation.
- [OWASP HTML5 Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html) — security considerations for browser storage and untrusted client-side data.
- [MDN: AudioContext.suspend()](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/suspend) and [AudioContext.resume()](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/resume) — lifecycle considerations for audio engines.

## 7. What to research first (by subsystem)

| Question | First internal file | External starting points | Required proof |
|---|---|---|---|
| Why does a block connect or refuse to connect? | app source + UI audit | Scratch Blocks / Blockly connection docs | Test top-level, nested, C-block and invalid connection cases |
| Why does a program pause or freeze? | ENGINE-MAP + Grok engine spec | Scratch VM, TurboWarp compiler/warp timer docs | Repeatable minimal project, timing profile, stop-time measurement |
| Why do two engines disagree? | Grok spec + tests | Scratch VM source + Scratch Spec | Differential case with explicit inputs and exact outputs |
| Why does a saved project change? | formats doc + current loader/exporter source | Scratch parser schema + SB3 spec | Reopen round-trip and compare JSON/assets/behavior |
| Is an extension safe? | extension loader + risk label logic | TurboWarp/PenguinMod sandbox documentation + OWASP | Capability inventory, sandbox check, negative tests |
| Why is the stage visually wrong? | renderer/DOM source + screenshot report | scratch-render and browser rendering docs | Coordinate, zoom, resize, hit-test and layer-order tests |
| Why does audio continue after Stop? | audio block handlers and Stop path | Web Audio API docs + Scratch VM sound code | Verify voice, context, loop and delayed-callback cleanup |
| Why does recovery fail? | save/load/autosave implementation | IndexedDB docs | Simulate quota failure, crash, partial write and corrupt stored data |

## 8. Research workflow that prevents confident mistakes

1. **Pin the target version.** Record G-Warp version, Git SHA, branch, Scratch/ TurboWarp/PenguinMod build, browser and settings.
2. **Find the implementation.** Search the current source for the handler, state field, serializer or block opcode. If no hook is visible, document the gap.
3. **Read the upstream source.** Prefer current source over a copied article; separate upstream behavior from G-Warp behavior.
4. **Make the smallest counterexample.** Isolate one behavior, one variable or one event race. Remove unrelated sprites and extensions.
5. **Write an oracle.** Define expected output/order/state before running the test. If the oracle itself is uncertain, label it NEEDS RECHECK.
6. **Run both engines.** Use standard Scratch for core compatibility, and TurboWarp/PenguinMod for extension-specific comparisons. Record settings that affect execution.
7. **Keep artifacts.** Minimal project, exact steps, output transcript, screenshot/video, logs, version and SHA.
8. **Re-run after the fix.** Include a regression test and adjacent edge cases.
9. **Refresh docs.** If a fact changes with a new build, update the version stamp and preserve the older evidence instead of silently rewriting history.

## 9. Research quality and maintenance

This repository aims to be a high-quality public learning and research resource, not to make unverifiable claims that it is the only or most complete source on the internet. Its advantage should be the combination of: G-Warp's actual source map, transparent evidence labels, careful comparisons, tiny reproducible tests, format documentation, extension safety guidance, and beginner explanations.

When adding a reference, include the question it answers, source owner, type (official/community/primary source), date or version if relevant, and known limitation. Do not copy large passages from other documentation; summarize in original words and link to the source. Do not present upstream code as G-Warp code or use another project's logos/art as G-Warp assets.

**Next review:** whenever `app.html` changes significantly, Scratch editor architecture migrates, or extension-loading policy changes.
