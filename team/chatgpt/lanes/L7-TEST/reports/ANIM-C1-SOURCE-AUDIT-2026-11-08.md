# ANIM-C1 source-only audit

Date: 2026-11-08 04:43:40 UTC
Status: **SOURCE-VERIFIED; runtime NOT-TESTED.**
Scope: current inline `gw-claude-centre`, the queue requirements, and a read-only peer review of the current helper/tests. No UI actions or app edits were made.

## Evidence set

- Queue: `team/ai-team/CHATGPT-JOBS.md:119–135`, blob `f539a4b903bb76d1104d14f9fc8c4a59860d0628`.
- Current app source: `app.html:25270–25306`, blob `0ef15201760bec948368096f5d9fa270af37fb70`. The matching local snapshot was verified with `git hash-object`; it is the same blob fetched from `ai-team`. At audit read, branch head was `0b4e6dae8b702dea5b9bafe27e500aaf4c80dda5`.
- Related costume generation: `app.html:16731, 16742–16760, 17092`.
- Rig coordinate source: `app.html:16704–16715` (`solve` returns `jx/jy` for joints).
- Peer-reviewed, current local draft (not edited): `C:\Users\mario\.codex\visualizations\2026\11\07\01a1b4db-1eee-74d1-8eb9-b30021a83231\ANIM-C1-check-2026-11-08\code\anim-centre.js` (182 lines) and `...\tests\anim-centre.test.js` (88 lines). The parent reported 8/8 tests passing after updating the size invariant; I did not run them.

## Main source-level risks

### High — ungrouped “Line up” targets every costume

The inline helper recognizes a group only when a costume name contains `//`; if the active costume has no such prefix, `group(s)` returns the whole sprite costume list (`app.html:25284–25285`). `lineUp()` then processes that result (`25293–25295`). A normal, ungrouped costume can therefore make the button align unrelated still costumes and other animations together. Grouping is by display-name prefix, not the generated-frame animation ID.

**Action:** restrict alignment to an explicit frame group, preferably the `gwAnimFrame.anim` metadata used by the helper draft (`anim-centre.js:69–80)). If no group is selected, do not fall back to every costume.

### High — alignment computes a different centre for each frame

The queue requires every frame to receive the **same** centre from frame 1’s orange root joint and says not to move the art per frame (`CHATGPT-JOBS.md:126–127`). The inline `lineUp()` instead derives a baseline from frame 1’s bounding-box centre/bottom and current `rc`, then derives each later frame’s `rc` from that frame’s own bounding box (`app.html:25293–25296`). Different poses can therefore produce different centre coordinates; no root joint is read. The code does leave the pixels/art data untouched, but it does not enforce the required shared-centre invariant.

**Action:** select and sort one animation’s frames, solve frame 1’s root joint, assign a copy of that same point to every frame, then validate the result within the queue’s one-pixel tolerance. The draft’s `sharedCentreAssignments()` expresses this calculation (`anim-centre.js:83–97)); `rootPointFromSolved()` reads the `jx/jy` fields actually returned by `GW_ANIM.solve` (`app.html:16704–16715`).

### High — Make costumes has failure paths without an all-or-nothing guard

On the normal path, `makeCostumes()` uses one source costume/animation centre for each frame and derives canvas dimensions from the rendered base SVG (`app.html:16742–16751`), which should usually produce matching outputs. But there is no equality validation before results are written.

More seriously, `frameSvg()` can return null and the loop skips that frame (`16731, 16745–16746`). Afterward, the stale-frame cleanup removes prior generated costumes that are absent from the partial `made` list (`16755–16758`). If an image fails to load, the error handler returns null and the code falls back to a 1×1 canvas, then still adds it as a generated costume (`16747–16752`). These are source-visible paths that can replace or remove good output without an explicit failure result; they are not runtime-reproduced here.

**Action:** render all frames into temporary outputs first; reject image/frame failures; run the exact-size and centre validator; replace/delete existing outputs only after every frame passes. Preserve the previous costumes and show an actionable error on failure.

### Medium — “Centre” does not match the two requested centre operations

The queue separates (1) clicking a point to set the rotation centre and move the paint-editor centre mark, and (2) translating the drawing so its bounds centre sits on the existing centre, with an optional feet line (`CHATGPT-JOBS.md:124–125`). The current footer button is added to `gwpeFoot` (`app.html:25299–25303)); its `centre()` handler only assigns `c.rc` to the current alpha-bounds centre (`25292`). There is no arbitrary click-to-set-centre tool in this block and no artwork translation here.

The draft’s `translationToCentre()` returns a translation while preserving the rotation centre (`anim-centre.js:45–67`), which matches the second operation’s geometry better, but it is a pure calculation: the caller still must apply the delta consistently to all art layers. The draft does not implement the first click-to-set operation.

**Action:** keep the two actions distinct in the adapter/UI and name them accordingly. Define how each applied change is recorded in the editor history.

### Medium — drift warning uses a different threshold and metric

The queue specifies a warning when the body middle moves **more than 2 px** from frame 1 while the root stays put (`CHATGPT-JOBS.md:128–130`). The inline code uses `Math.max(4, f0.h * 0.08)` (`app.html:25287`), then compares the Euclidean distance of each frame’s bounding-box-centre/bottom offset from its rotation centre (`25286–25288`). It neither uses body-centre bounds against root-joint position nor checks whether the root moved. This can miss 2–4 px drift and makes the threshold vary with the first frame’s height; changing limbs can also move the overall alpha bounds without moving the body.

The draft’s `detectBodyDrift()` is closer to the requested rule: default 2 px threshold, root-position tolerance, body-bounds centre relative to root, and measured `dx/dy/driftPx` (`anim-centre.js:99–129)). Its coordinate units still need an explicit adapter contract.

**Action:** use the fixed threshold and root-relative body-centre metric; state whether the 0.5 px root tolerance is intentional and in which coordinate units.

### Medium — warning is not the requested measured, one-click prompt

The costume-list badge is only an orange exclamation mark with a static hover title (`app.html:25297–25298`). It does not display the frame number or measured jump distance, and the badge itself has no click handler; “Line up” is a separate footer button (`25301–25303`). The queue example calls for a yellow message such as “frame 5 jumps 14 px — line them up?” with a one-click fix (`CHATGPT-JOBS.md:128–130`).

**Action:** carry the calculated frame number/distance into the warning and make its fix action target only that animation group.

### Medium — undo is a one-slot local snapshot, not a complete edit transaction

The inline helper stores one module-level `last` snapshot (`app.html:25289`); each `keep()` replaces it. `undo()` restores only saved `rc` values and hides the button (`25290`), while the button is added separately to the costume footer (`25299–25303`). This provides a one-step local undo for Centre/Line up, but source does not show integration with the editor’s standard undo/redo history or a redo path. There is also no undo contract or test in the pure draft helper. This is a risk to verify in the adapter, not a confirmed runtime failure.

**Action:** record the entire multi-costume edit as one normal undo transaction, including prior centre values, and test undo after switching selection and after a failed/cancelled operation.

## Draft helper and test peer review

**Good direction:** `bounds()` rejects non-finite and inverted inputs (`anim-centre.js:24–37)); generated-frame selection uses animation metadata and sorts by frame index (`69–80)); shared assignments copy one first-root point without mutating the input (`91–97)); drift uses the requested strict “greater than 2” behavior by default (`99–129)); and the updated validator now requires exact canvas dimensions while allowing centre coordinates within one pixel (`132–170)). The updated test explicitly rejects a one-pixel size mismatch and checks the centre tolerance (`tests/anim-centre.test.js:64–82`).

**Remaining API/coverage items:**

- Document the coordinate units/origin shared by bounds, solved bone `jx/jy`, and costume rotation-centre metadata. The adapter must account for SVG viewBox and costume resolution; this is not specified by the helper comments.
- `selectGeneratedFrames()` sorts valid metadata, but silently returns partial groups when indices are missing and preserves duplicate frame indices by list order. Add a completeness/uniqueness check before alignment.
- `translationToCentre()` silently treats a supplied invalid `feetLineY` as “no feet mode” (`51–58`); reject a malformed supplied option so a typo cannot select a different alignment mode.
- Tests cover calculations, metadata sorting, stable-root drift, and strict size validation (`tests/anim-centre.test.js:6–88`), but not an adapter call against real `GW_ANIM.makeCostumes`, decode failure/partial generation, undo/redo, frame-count completeness, or the .sb3/Scratch runtime x/y invariant required by the queue (`CHATGPT-JOBS.md:132–135`).

## Evidence boundary

This is source review only. No UI, app runtime, generated costume, .sb3 export, Scratch VM, or helper tests were run by this agent. The parent’s “8/8 pass” statement is recorded as parent-reported, not independently verified. No app behavior is described as observed.
