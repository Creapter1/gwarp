# G-Warp Compatibility Test Matrix

This document turns “make it work like Scratch, TurboWarp and PenguinMod” into repeatable evidence. It intentionally separates editor interaction, runtime semantics, file compatibility and extension behavior.

![Compatibility test pipeline](./images/compatibility-test-pipeline.svg)

## 1. Testing vocabulary

| Label | Meaning |
|---|---|
| PASS | The specified test ran and the actual result matched the stated expected result |
| FAIL | The test ran and contradicted the expected result |
| BLOCKED | It could not be run because a dependency, build or fixture was unavailable |
| NOT TESTED | No test run is claimed |
| NEEDS RECHECK | The expected result or source of truth is uncertain |
| STATIC-ANALYSIS | Code was inspected; behavior was not reproduced |
| LIVE-BROWSER-VERIFIED | Real interactions ran in a named browser/build |
| SOURCE-VERIFIED | An implementation detail was directly found in a named source version |

Never use PASS for a test plan, a syntax check, or a code review. Every PASS should point to evidence.

## 2. Current repository test assets

- [75-case behavior corpus](../grok/TESTS.txt): intended exact-result cases across operators, variables/lists, motion, control/clones, events, sensing and My Blocks. The corpus is a starting point, not proof that all expected values have been verified against the current Scratch editor.
- [Category specifications](../grok/): engine, motion, looks, sound, events, control, sensing, operators, variables/lists, My Blocks, pen, music and file-format research.
- [UI behavior audit](../chatgpt/UI-AUDIT.txt): static source-level interaction findings and a follow-up test plan.
- [Live UI verification report](./LIVE-UI-VERIFICATION.txt): a recorded Chromium run at 1440×900 and 1024×700 with ten basic UI/layout checks reported PASS. Deep runtime parity is not covered by that run.
- [Costume editor checklist](../deepseek/CHECKLIST-costumes.txt): review checklist; inspect merge status before assuming fixes are live.
- [Merge queue](../MERGE-QUEUE.txt): separates candidate code from reference-only research.

## 3. Test layers

### L0 — syntax, parsing and static checks
Useful for: malformed JavaScript, invalid JSON, missing references in static code, accidentally duplicated module injection.

Not sufficient for: correct interactions, runtime behavior, performance, extension safety or compatibility.

### L1 — unit / deterministic semantics
Test single functions and rules: number conversion, list indexing, block connection validation, clone-count logic, coordinate conversion, asset ID mapping and serializer validation.

### L2 — runtime micro-projects
Use tiny Scratch projects to isolate events, thread ordering, variables, loops, procedures, clones, collisions, effects, sound and Stop/restart. Capture a state/event trace.

### L3 — editor interaction
Exercise real pointer and keyboard input in the UI: drag/drop, snapping, nested blocks, tabs, dialogs, costume tools, scroll/zoom, stage sizing and keyboard focus.

### L4 — project round-trip / interoperability
Import, edit, export, reopen in a fresh process, then compare structure, assets and behavior. Include an upstream editor as the reference.

### L5 — adversarial, recovery and load
Malformed/corrupt project files, resource-exhaustion workloads, denied permissions, offline mode, quota failure, browser reload, long sessions, Stop responsiveness and cleanup.

### L6 — release smoke test
Run a short, fixed suite against the exact SHA that will be deployed. Record the live app/version and make sure the website points to that same file.

## 4. Test inventory

| ID | Area | Minimum scenario | Expected evidence | Current evidence reference |
|---|---|---|---|---|
| UI-01 | Category click | One click opens the intended category | Screenshot + result | LIVE-UI report T1 |
| UI-02 | Block drag | Drag a palette block into workspace | Before/after capture | LIVE-UI report T2 |
| UI-03 | Workspace context menu | Right-click empty area | Menu + action tests | LIVE-UI report T3 |
| UI-04 | Block context menu | Right-click selected stack | Menu + duplicate/delete outcome | LIVE-UI report T4 |
| UI-05 | Start/Stop controls | Run and halt a minimal script | State trace + responsive UI | Check LIVE-UI report |
| UI-06 | Stage resize | Desktop and narrow viewport | Measured ratio and hit targets | Check LIVE-UI report |
| UI-07 | Costume editor | Select tool, change art, undo, save | Screenshot + reopened asset | Checklist still needs explicit run evidence |
| UI-08 | Keyboard focus | Tab through controls, activate and escape dialogs | Focus order and visible focus | NOT ESTABLISHED by basic layout tests |
| UI-09 | Nested stack insertion | Insert/remove nested stacks in each C-block arm | Graph structure before/after | NOT TESTED in source audit notes |
| RT-01 | Operators | Number/text, rounding, modulo, booleans | Exact value transcript | grok/TESTS.txt; calibrate oracle first |
| RT-02 | Variables/lists | Scoping, indexing, empty/out-of-range behavior | Final state + transcript | grok/TESTS.txt |
| RT-03 | Event starts | Green Flag, key, click, backdrop | Start order / restart trace | grok/SPEC-events.txt |
| RT-04 | Broadcast | Broadcast and broadcast-and-wait | Sender/receiver timeline | grok/SPEC-events.txt |
| RT-05 | Wait/yield | Wait, long loop, Stop while running | Timing and responsiveness | grok/SPEC-engine.txt |
| RT-06 | Clones | Clone cap, clone init, delete, Stop cleanup | Counts and elapsed time | TODO freeze-fix requirements |
| RT-07 | Motion/sensing | Stage coordinates, rotated hit test, edges | State and collision trace | grok/SPEC-motion.txt + sensing spec |
| RT-08 | Sound lifecycle | Start sound, pause/stop/reset | Audition plus active-voice check | grok/SPEC-sound.txt |
| RT-09 | Procedures | Parameters, nested call, warp/yield | State trace | grok/SPEC-myblocks.txt |
| RT-10 | Pen/tilemap | Drawing, clearing, layer order, reload | Pixel/state capture | grok/SPEC-pen.txt; G-Warp pen hooks limited |
| FILE-01 | SB3 import | Valid fixture with media and variables | Parsed structure + browser screenshot | NOT COMPLETE in LIVE-UI report |
| FILE-02 | SB3 export | Export and open in a fresh session | Archive validation + fresh open | NOT TESTED in LIVE-UI report |
| FILE-03 | Round-trip | Import → export → fresh reopen | Structural and behavior diff | NOT TESTED until evidence is attached |
| FILE-04 | Bad archive | Missing JSON, wrong IDs, huge entry | Graceful error and no partial replacement | Add with format hardening |
| FILE-05 | PMP ZIP | Known ZIP PMP sample | Open and compare target state | Source map says path exists; corpus needed |
| FILE-06 | PMP protobuf | Known protobuf PMP sample | Signature/version-aware parse test | Source map says newer format missing |
| EXT-01 | Extension safety | Review one extension end-to-end | Capability map + risk rationale | Current labels alone are not proof |
| EXT-02 | Extension Stop cleanup | Timer/audio/polling then Stop | No continued activity | Add explicit run evidence |
| PERF-01 | Clone storm | Repeatedly create clones until policy limit | Limit outcome, time-to-Stop, UI responsive | TODO records previous freeze risk |
| PERF-02 | Giant list/string | Grow list/join within defined caps | Memory/time, cap behavior, recovery | TODO freeze-fix requirements |
| PERF-03 | Frame pacing | Known movement across 60/120/144 Hz displays | Elapsed-time normalized displacement | NOT ESTABLISHED |
| REC-01 | Recovery | Force reload after a saved recovery point | Prompt, restored project, asset integrity | TODO lists as goal, not established |
| REC-02 | Storage failure | Quota/private-mode/write failure | Clear message, no false “saved” claim | NOT TESTED |
| PRIV-01 | Network consent | Import declares remote extension | No fetch before user opt-in | Security test plan |
| PRIV-02 | Bug report privacy | Project may contain personal content | Consent and deletion workflow evidence | Policy exists; enforcement needs audit |

This matrix is a plan/status aid. Rows that reference existing assets do not automatically pass.

## 5. Test design: keep the oracle honest

A common source of wasted engineering is a test that confidently encodes a wrong expected result. Before filing a compatibility bug:

1. Reproduce the case in the current standard Scratch editor.
2. Record the relevant version/date and whether any setting/add-on affects the behavior.
3. Use the smallest possible project.
4. State the expected value or event ordering before running G-Warp.
5. If a community specification and live Scratch disagree, label the case NEEDS RECHECK and investigate source history.
6. Only then make a G-Warp regression test.

This is important for coercion and rounding, event start/restart policy, clone timing, key repeats, random choice, color matching and edge behavior.

## 6. Trace format

For runtime tests, record a textual trace, for example:

```text
case: RT-04-broadcast-and-wait-01
G-Warp version: Beta ...
G-Warp SHA: ...
Scratch baseline: ...
browser/settings: ...
input:
  click Green Flag
  wait 1 second
expected:
  sender-start
  receiver-start
  receiver-done
  sender-resume
actual:
  ...
result: NEEDS RECHECK
artifacts:
  fixture.sb3
  expected.txt
  actual.txt
  screenshot.png
  console.log
```

The example trace illustrates a format; the exact expected ordering must be verified by the upstream baseline for that test.

## 7. Minimal fixture library to build

Keep each project small and named by purpose:
- `operators-basic.sb3`
- `lists-indexing.sb3`
- `broadcast-order.sb3`
- `clone-init-stop.sb3`
- `wait-and-stop.sb3`
- `rotation-center-hit-test.sb3`
- `costume-vector-bitmap.sb3`
- `audio-stop-lifecycle.sb3`
- `extension-missing.sb3`
- `asset-roundtrip.sb3`
- `import-adversarial-*.zip`

Each fixture should have a text file explaining how to build it, exact inputs, expected output, provenance of the oracle and the feature under test. Do not use third-party copyrighted character art in fixtures; use simple original shapes and G-Spark/invented characters.

## 8. Performance measurements

Never reduce “fast” to one FPS number. Record:
- median, p95 and worst frame duration;
- dropped/late frames;
- longest uninterrupted main-thread task;
- Stop click-to-idle duration;
- number of live sprites, clones, threads, audio sources and timers;
- memory trend during a fixed run if tooling permits;
- project fixture, device/browser and display refresh rate;
- correctness comparison against the baseline.

A renderer can report high FPS while scripts do not advance fairly; an idle test can report high FPS while a clone storm makes Stop unusable. Performance and correctness must be measured together.

## 9. Release gate for an app change

Before a fix can be called complete:

- [ ] Source diff reviewed; only intended files changed.
- [ ] Syntax/static checks passed where applicable.
- [ ] Targeted micro-test passes in G-Warp.
- [ ] Baseline comparison performed for compatibility claims.
- [ ] Neighboring edge cases pass.
- [ ] Stop/restart and project reload are tested where relevant.
- [ ] Import/export round-trip is tested for data-format changes.
- [ ] Browser console and UI checked.
- [ ] Exact SHA/version and browser/viewport recorded.
- [ ] Evidence stored in repository.
- [ ] User-visible change and known limitation documented.

A code candidate in `chatgpt/`, `deepseek/`, `grok/` or another research folder is not part of the deployed app until the merge and release process says it is.
