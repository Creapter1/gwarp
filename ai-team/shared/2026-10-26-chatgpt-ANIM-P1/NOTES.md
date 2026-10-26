# ANIM-P1 — Motion tools proposal and integration handoff

**Status:** WEB candidate prepared. Not loaded by `app.html`; not browser-tested or integrated.  
**Owner:** Creapter1 · **Author:** ChatGPT GPT-6 · **Date:** 2026-10-26

## Deliverables

- [Specification (written first)](https://github.com/Creapter1/gwarp/blob/main/ai-team/shared/2026-10-26-chatgpt-ANIM-P1/SPEC.md)
- [Helper module](https://github.com/Creapter1/gwarp/blob/main/ai-team/shared/2026-10-26-chatgpt-ANIM-P1/code/anim-motion.js)
- [Pose library JSON](https://github.com/Creapter1/gwarp/blob/main/ai-team/shared/2026-10-26-chatgpt-ANIM-P1/code/poses.json)
- [Static UI concept preview](https://github.com/Creapter1/gwarp/blob/main/ai-team/shared/2026-10-26-chatgpt-ANIM-P1/preview.html)
- ChatGPT working copies: `chatgpt/ANIM-P1-SPEC.md`, `chatgpt/anim-motion.js`, `chatgpt/poses.json`

All code is isolated proposal material. Nothing in `app.html` or `index.html` was changed.

## Existing source behavior verified in app.html

The current animation system stores each pose frame with `roots` and `angles`. The existing interpolation helper `mix(a,b,t)` linearly blends root positions and uses shortest-path angle interpolation.

- **In-between:** inserts one midpoint at t=0.5.
- **Smooth ×2:** inserts a midpoint between each adjacent frame and doubles FPS.
- **Glide:** inserts three samples per gap, uses the current quadratic ease-in-out curve, tags generated frames with `glide:1`, and increases FPS by four times. Pressing again removes generated Glide frames.
- Playback advances one frame per interval using the Animation FPS.
- `frameSvg(anim,i)` renders a frame to SVG; `makeCostumes(s,anim)` calls it once per frame and creates ordinary costumes named `<animation>//frame N`.
- Animation history explicitly packs `frames` and `bones`; adding per-frame data to `frames` and per-bone follow-through data to `bones` keeps it inside the existing history/save path. Any new top-level animation metadata must be added to the explicit KEEP list.

## Candidate API

`window.GW_ANIM_MOTION` exposes pure data helpers only; it does not add buttons or patch private editor methods.

| API | Intended use |
|---|---|
| `easeValue(curve,t)`, `curveFor(frame)`, `interpolateFrame(anim,A,B,t,curve)` | Curve selection and interpolation |
| `normalizeFrame(frame)`, `setCurve(frame,curve)` | Per-frame outgoing curve and metadata normalization |
| `holdTicks(frame)`, `setHold(frame,ticks)` | 1–4 frame hold |
| `makePlaybackClock(frame,frames)`, `resetPlaybackClock(clock,frames,frame)`, `advancePlaybackClock(clock,frames,loop)` | Playback tick accounting |
| `expandHeldFrames(frames)`, `makeCostumePlan(anim)` | Expansion plan for Make costumes |
| `getStretch(frame,boneId)`, `effectiveBoneLength(bone,frame)`, `boneLocalScaleX(frame,boneId)`, `setStretch(frame,boneId,value)` | Per-bone 60–140% length-axis scaling |
| `setFollowThrough(bone,options)`, `resolveFollowThrough(anim,frameIndex)` | Optional delayed child-chain motion |
| `mirrorFrame(anim,frame,centerX)` | Mirror pose by standard left/right bone names |
| `copyPose(anim,frame)`, `pastePose(anim,targetFrame,clipboard)` | Copy/paste across frames and rigs by name |
| `applyLibraryPose(anim,targetFrame,pose)` | Apply name-keyed JSON angle offsets to a user's rig |

### Easing

- Linear: (t).
- Ease: quadratic ease-in-out; matches the current Glide curve.
- Bounce: bounded bounce-out. Values remain in [0,1].
- Snap: fast ease-out cubic.

The curve is stored on the outgoing frame as `easeToNext`. Legacy frames without this field fall back to Ease, preserving the current Glide feel. In-between and Smooth ×2 still insert only one midpoint per gap; at t=0.5, Linear and symmetric Ease are mathematically identical. Bounce/Snap can visibly differ at that one sample; Glide's three samples show all curve shapes more clearly.

**No default has been changed.** The spec recommends Ease for new gaps but requires the owner's approval before changing any default selection. Do not rewrite existing frames just to add the new field.

### Hold and Make costumes

- Store `frame.hold` as integer 1–4; default 1.
- Playback keeps the selected frame visible for that many FPS ticks. When the user scrubs manually, reset the playback clock for the newly selected frame.
- `makeCostumePlan(anim)` returns one output entry per hold tick, including `sourceFrame`, `holdTick`, `holdCount`, sequential `outputFrame`, and normal costume name. Use `frameSvg(anim,entry.sourceFrame)` for each output entry; duplicates are ordinary costumes with identical frame art.
- Plan flags expanded results above 240 costumes for a confirmation prompt; the existing 240 stored-frame limit with 4× holds gives a maximum of 960 output costumes. Do not silently truncate.
- The chosen design repeats generated costumes, **not** Animation block wait timing. This avoids changing the semantics of user scripts or inventing a special duration block.

Suggested generated-c costume metadata:
`gwAnimFrame: { anim: animationId, sourceFrame, holdTick, holdCount, rev }`.
Use the current generated-costume cleanup rules so repeated outputs are regenerated rather than accumulated.

### Squash & stretch integration

The candidate stores `frame.stretch[boneId]` in the range 0.60–1.40, default 1.00. The rest-pose bone `len` is not mutated.

In the existing bone solver:
1. Calculate each bone's effective length as `GW_ANIM_MOTION.effectiveBoneLength(b,pose)`.
2. When placing a child bone, transform its parent-relative offset in the parent's stretched local-X coordinate system before applying the parent's rotation/translation.
3. In the part delta matrix (the current rest/world matrix (W) and pose/world matrix (W')), include local-X scale: `W = translate(joint).rotate(angle).scale(stretch,1)`. The final delta must pin the joint and scale artwork attached to that bone along its long axis.
4. Draw the displayed bone segment to the stretched endpoint. Do not scale sibling branches or the whole character.

This needs a careful source edit to both `solve()` and the part delta/apply path; the helper alone does not change rendering.

### Follow-through integration

Each optional child bone stores:
`bone.followThrough = { enabled, delay: 1|2, amount: 0.15..0.75 }`.
Disabled by default; roots cannot enable it. Before displaying or exporting a pose, resolve a copy with `resolveFollowThrough(anim,index)` and use the returned pose for solving/applyPose. It calculates a delayed parent angular delta; it must not write derived values back to the key frame. A chain is built one link at a time by explicitly enabling each child. Verify loop and non-loop boundaries.

### Mirror and copy/paste

- Mirror uses canonical standard names: body/head and left/right arm/leg. It reflects local angle offsets around each target bone's rest angle and swaps paired limb values. Missing/duplicate pairs are skipped rather than guessed.
- Copy exports `anglesByName`, `rootsByName` and `stretchByName` as offsets from source rest pose. Paste adds those offsets to matching target rest values, so different bone IDs/rest angles can work across rigs.
- The API returns applied/skipped counts; show a concise notice when some named bones do not exist.
- Take exactly one existing Animation history snapshot before each Mirror or Paste operation. Clipboard data itself is transient; do not serialize it into a project.

### Pose library

`poses.json` contains angle offsets only, with no art, rig IDs, SVG, bitmap or stock character. It includes idle/breath (4), walk (8), run (6), jump (6), punch, kick, wave, hurt and win clips. Values are local offsets from each target bone's rest angle.

G-Warp is intended to remain usable offline and as a single HTML app: do not fetch pose JSON from a remote URL at runtime. Claude should bundle these data literals into the app build (or a local included asset that is packaged with the build) after review. Applying a pose must never import or create a stock sprite.

## Exact integration points for Claude

1. **Curve selection:** Add a small selector next to the existing In-between / Smooth ×2 / Glide controls. Persist the outgoing curve on the source frame. Change the current midpoint calls to use `interpolateFrame(...,0.5,curveFor(sourceFrame))`; change Glide's three sample calls to use t=0.25/0.5/0.75 with that frame's selected curve. Preserve the current Glide on/off stripping behavior and `glide:1` marker.
2. **Playback holds:** Replace the one-index-per-tick increment in the existing Play interval with a playback clock. Create/reset it when Play starts and when scrubbing; on each existing FPS tick call `advancePlaybackClock`. Preserve current stop/loop behavior; a non-looping animation must still stop at its last frame.
3. **Frame hold UI:** Add a 1–4 selector to the selected frame's properties. Show a compact hold badge on the frame strip; do not create duplicate editor frames merely for a hold.
4. **Make costumes:** Replace the one-output-per-source-frame loop with `makeCostumePlan(anim).entries`. Render each entry from its source frame and emit sequential ordinary costumes with the metadata above. Prompt before generating more than 240 costumes; test stale-output deletion and export.
5. **Stretch:** Add a slider to the existing selected-bone panel, 60–140%, step 1 or 5; write to current frame's `stretch`, with one undo snapshot. Integrate the scale into solve, child joint offsets, part transforms and displayed bone endpoint as described above.
6. **Follow-through:** Add per-bone checkbox, delay and amount controls. Persist on the bone object (already covered by bones history). Call the resolver on a copy during display and SVG frame export; never bake derived values into stored pose angles.
7. **Mirror:** Add one Mirror Pose action. Call `mirrorFrame`, take one undo snapshot, replace the current frame pose fields only, then refresh.
8. **Copy/paste:** Add Copy Pose and Paste Pose controls. Keep the clipboard in transient UI/module state; map by unique normalized bone names, preserve target hold/ease, report skipped bones, and make Paste one undo step.
9. **Pose library:** Add an in-app preset chooser. Bundle `poses.json` as local data; map angle offsets by normalized bone name. Preserve unmatched bones and never load art.

## Required TERMINAL / browser acceptance — NOT RUN

- Curve math: deterministic values, bounded [0,1], easing monotonicity except intentionally bouncy segment; legacy frames unchanged; compare Linear/Ease at multiple samples. In-between midpoint equivalence must be explicitly understood.
- In-between, Smooth ×2 and Glide: same button availability and reversible behavior; old Glide remains ease-in-out when no metadata exists; preserve frame count and FPS rules; undo/redo restores exact data.
- Hold 1/2/3/4: Play duration matches ticks; manual scrub resets correctly; loop and non-loop boundaries; Make costumes emits exact repeated ordinary costumes and sequential names; 240×4 warning and generated-costume cleanup.
- Stretch: 60/100/140%, joint pinned, attached art scaled along local axis, child positions follow, siblings unaffected, different bone orientations, no cumulative drift after repeated edits.
- Follow-through: off by default, 1/2-frame delay exact, amount clamp, two-link chain, loop boundaries, non-loop start, no mutation of stored keyframe values.
- Mirror on a user-created asymmetric rig with paired/unknown bones; no art/rig change.
- Copy/paste between frames and two rigs with different IDs and rest angles; missing/duplicate names safely skipped; one undo step each.
- Apply every JSON pose to a user rig; missing bones do not throw, no stock art gets inserted, no network access.
- Save/reopen project; export all generated costumes and .sb3; no metadata leakage into wrong sprite; verify large 960-costume case.
- 6-bone and 20+ bone rigs; measure performance and look for lag.

## Evidence classification

- **SOURCE-VERIFIED:** current frame `roots/angles` model, shortest-angle interpolation, In-between/Smooth ×2/Glide logic, playback FPS timer, animation history, `frameSvg` and `makeCostumes` pipeline.
- **STATIC-ANALYSIS:** the proposal module, data-only pose JSON, specification and static preview.
- **NOT-TESTED:** JavaScript parse/execution, browser UI, curve result integration, hold playback, costume generation, stretch solver/matrix edits, follow-through, mirror/copy/paste, pose application, save/load, exports, undo and performance.

**Disposition:** WEB-phase candidate ready for Claude review. Nothing is integrated. The owner must approve any change to the easing default. Terminal acceptance and release remain pending.
