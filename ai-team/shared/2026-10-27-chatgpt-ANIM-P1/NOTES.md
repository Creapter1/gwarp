# ANIM-P1 — Animation Motion Tools (isolated code proposal)

**Owner:** Creapter1  
**Author:** ChatGPT / GPT-6  
**Date:** 2026-10-27  
**Status:** <badge>WEB CODE CANDIDATE</badge> · not integrated, not browser-tested in G-Warp

## What this package contains

- [Specification](./SPEC.md)
- [Pure helper module](./code/anim-motion.js)
- [Pose data library](./code/poses.json)
- [Static UI preview](./preview.html)
- [Node test file for the Freebuff/QA environment](./tests/anim-motion.test.js)

The module is intentionally not wired into `app.html`. It contains no DOM queries, network requests, external dependencies, editor monkey-patches, or runtime block changes.

## Candidate features

1. Per-keyframe easing choices: Linear, Ease, Bounce and Snap.
2. Hold lengths from 1–4 ticks; a playback clock tracks the current frame and exposes a `done` flag for non-looping playback.
3. Per-frame, per-bone stretch values clamped to 60–140%.
4. Optional delayed follow-through on a child bone, disabled by default.
5. Mirror Pose by unique standard bone names.
6. Copy/Paste Pose across frames and rigs by normalized bone names.
7. Rig-independent pose data for Idle, Walk, Run, Jump, Punch, Kick, Wave, Hurt and Win.

The existing In-between, Smooth ×2 and Glide buttons remain. This proposal does not change the default easing selection.

## Corrected details in helper version 2

- Playback completion: the caller must check `clock.done` after `advancePlaybackClock()`; the frame index alone cannot distinguish a finished non-loop from a held final frame.
- ID safety: numeric bone ID `0` is valid, including as a child bone's parent.
- Name safety: duplicate normalized names are excluded from mapping; mirror/paste report skipped names rather than guess.
- Legacy data: `curveFor()` returns Ease when `easeToNext` is absent. Normalization does not add easing metadata to existing frames.
- Stretch data: the helper initializes a stretch map before writes to avoid an undefined-object failure.
- Pose resolution: follow-through operates on a clone so it does not mutate stored keyframe angles.
- Costume expansion: no silent truncation; outputs above 240 request confirmation and outputs above 960 report a hard-limit condition.

## Important: this is not the complete feature implementation

The helper contains data/math operations only. It does **not**:
- Add controls to the Animation tab.
- Connect the easing picker to In-between / Smooth ×2 / Glide.
- Replace the editor's playback timer.
- Repeat actual SVG costumes during Make costumes.
- Apply stretch matrices to the bone solver, child offsets or attached artwork.
- Draw follow-through poses in the editor or exported SVGs.
- Add Mirror/Copy/Paste/Pose Library controls or undo snapshots.

Those integrations depend on private functions in the current `app.html`. The GitHub connector returned an empty body for the large `app.html` during this session, so exact current line/function anchors were not re-verified against Beta v15.57.0. Claude must inspect the live current source and adapt the integration points before implementing. Do not infer that any private helper or hook name in older notes still exists.

## How Claude should integrate

1. Refetch current `app.html` and verify the current animation module, bone solver, history snapshot/restore, playback interval, frame serialization and Make costumes path.
2. Load this helper behind a dedicated `animMotion` feature switch. Keep it disconnected until the tests pass.
3. Add easing UI and map curve samples into the existing interpolation path. Legacy frames stay Ease; do not change any default selection without the owner's approval.
4. Add hold UI and use the clock; stop the timer when `clock.done` is true. Reset the clock on Play start, scrub, frame changes, loop toggle and Stop.
5. Use `makeCostumePlan()` to make a preview plan. Before integrating actual duplicate costumes, test output naming, stale-output cleanup, sprite costume order, .sb3 save/reopen, and the 240/960 confirmation flow.
6. Integrate stretch only after deriving correct local-axis matrices, pinning joints, updating child offsets and attached artwork without altering rest-pose bone lengths.
7. Resolve follow-through into a temporary pose immediately before solve/render/export; never write derived angles into the source frames.
8. Make Mirror, Copy, Paste and Pose Library actions each take exactly one current Animation undo snapshot before mutation and then refresh through the verified current editor function.
9. Save and reopen an animated rig; export .sb3 and verify that the generated ordinary costumes remain compatible with Scratch/TurboWarp.

## Evidence from this session

- **Isolated JavaScript execution:** 23/23 pure-helper assertions passed in an in-memory V8 harness. This included API loading, curve endpoints/bounds, legacy fallback, angle interpolation, root/stretch interpolation, hold timing, loop completion, output-plan naming/count, parent ID zero, non-mutating follow-through, mirror, cross-rig copy/paste, duplicate-name skipping and pose-library JSON.
- **JSON:** `poses.json` parsed successfully in the harness and expected pose clip IDs/frame counts were checked.
- **SOURCE-VERIFIED:** existing ChatGPT task notes, previous Animation source review summary, current helper and pose file read-backs.
- **NOT-TESTED in G-Warp:** no browser, animation UI, solver, project save/load, costume export, Scratch VM, performance or actual editor interaction was run. The Node test file is supplied for the next Freebuff/QA session but was not run here.

## Required acceptance tests

Run `node tests/anim-motion.test.js` from this folder (or copy the tests into the QA kit). Then test in an isolated build:

- Old animation with no added metadata renders identically.
- In-between, Smooth ×2 and Glide still work and undo correctly.
- Curves sample correctly across Glide's multiple in-between frames.
- Hold 1/2/3/4 plays for exact ticks; non-loop stops after its last hold; loop wraps; scrub resets timing.
- Make costumes repeats exact frame art, cleans old generated costumes and survives .sb3 save/reopen.
- Stretch at 60/100/140% pins the joint, scales attached art on the bone's local X axis, carries child joints, and leaves siblings/rest lengths unchanged.
- Follow-through delay 1/2 works across chains and loop boundaries without modifying stored keyframes.
- Mirror and copy/paste work on asymmetric user rigs; unknown/duplicate bone names skip safely; one undo per action.
- Pose presets apply to the user's current rig only; no stock art is loaded.
- 6-bone and 20+ bone rigs show no visible lag.

**Disposition:** ready for Claude's source re-check and isolated integration review. Owner approval is required before any live behavior/default change.
