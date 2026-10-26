# ANIM-P1 — Motion tools specification

**Owner:** Creapter1  
**Author:** ChatGPT GPT-6  
**Date:** 2026-10-26  
**Status:** WEB proposal specification; not integrated or browser-tested.

## Goal

Make user-created rigs feel less robotic while keeping G-Warp's current frame workflow and user-created characters. Add motion controls as metadata and pose operations around the existing bone/frame model. Do not replace In-between, Smooth ×2 or Glide, and do not change Glide's or other buttons' availability.

## What the current source does (verified in app.html)

- A frame currently contains `{ roots: {}, angles: {} }`; missing values fall back to the bone rest pose.
- `mix(A,B,t)` takes the shortest angle route and linearly interpolates root positions and angles.
- **In-between** inserts one frame at `t=0.5).
- **Smooth ×2** adds one linear midpoint between every frame pair and doubles FPS to preserve speed.
- **Glide** inserts three intermediate frames per gap using the existing quadratic ease-in-out formula, marks the generated frames with `glide: 1`, and increases FPS by four times. Pressing it again strips the generated Glide frames and returns to key frames.
- The animation playback timer advances one frame per tick at the animation FPS.
- `makeCostumes(s,anim)` calls `frameSvg(anim,i)` once per stored frame and emits normal costumes named `<animation>//frame N`.
- The existing animation history snapshot already captures `frames` and `bones`; new per-frame data therefore belongs inside those objects. New animation-level settings must be added to the explicit history KEEP list.
- No existing Mirror Pose or copy/paste pose action was found in the Animation editor. The word “mirror” occurs in unrelated sprite/backdrop code.

## Proposed behaviour and data

### 1. Easing curve picker

Add a compact curve choice to the existing In-between / Smooth ×2 / Glide area: **Linear**, **Ease**, **Bounce**, **Snap**. Store the chosen curve on the outgoing keyframe as `frame.easeToNext`; use a stable enum string. No new parallel frame sequence or replacement button.

- Linear: (t)
- Ease: quadratic ease-in-out (reuse the current Glide curve).
- Bounce: bounded, damped bounce-out curve; constrain output to [0,1] so the pose cannot overshoot beyond either keyframe.
- Snap: fast ease-out cubic, (1-(1-t)^3).
- Keep the existing Glide curve as the compatibility default for animations that have no `easeToNext`. The UI may show the currently stored choice without rewriting old frames.
- In-between remains one midpoint and Smooth ×2 remains one midpoint per gap. At (t=0.5), Linear and symmetric Ease both produce exactly 0.5; the UI should not claim they visibly differ in a single midpoint. Bounce and Snap can produce distinct midpoint positions. The curve is most visible with Glide's three samples. Do not change Smooth ×2's historical result unless the owner explicitly selects a curve for it.

**Default policy:** recommend Ease for newly created gaps, but retain Glide's existing ease curve for old animations. Changing the default selection is an owner decision; no code may silently change an existing frame's curve or the default without approval.

### 2. Hold frames — repeat generated costumes (chosen option)

Add `frame.hold`, an integer from 1 to 4, default 1. The Play timer should hold the current frame for that many ticks at the current FPS. The frame itself remains one pose in the editor; the thumbnail displays a small 1×–4× badge.

**Make costumes repeats the generated costume** for each hold tick. It does not change Animation block timing. Example: frame 1 with hold=3 followed by frame 2 with hold=1 produces four normal costumes: frame 1, frame 1, frame 1, frame 2. Each generated costume remains an ordinary Scratch-compatible costume; no custom block or runtime extension is required.

Store output metadata such as `gwAnimFrame: { anim, sourceFrame, holdTick, rev }`. Use sequential costume names, preserve original frame data, and remove stale generated costumes using the existing animation ID cleanup. Warn before creating a very large result (240 stored frames × 4 holds = 960 costumes); do not silently truncate.

### 3. Squash & stretch per bone

Store `frame.stretch[boneId]` as a scalar from **0.60 to 1.40**, default 1.00. The control is per bone and per frame. Scale along the bone's local long axis, with the joint pinned; the bone end and child attachment point follow the scaled length. Apply the corresponding local-X scale to the artwork attached to that bone. Clamp on input, load and evaluation. Do not scale unrelated branches or the whole sprite.

The rest-pose bone definition (`bone.len`) is never overwritten. Use a separate effective length during pose solving. If the bone has children, its end joint and child offsets must be evaluated in the stretched parent coordinate system. This is length-axis scale, not arbitrary XY distortion.

### 4. Follow-through for chains

Keep the feature optional and off by default. Store per-bone configuration on the bone (part of the existing bones history snapshot), e.g. `followThrough: { enabled:true, delay:1, amount:0.35 }`. Delay is 1 or 2 frames; amount is clamped to 0.15–0.75. Only apply to a bone with a parent. In pose evaluation, add a weighted copy of the parent's preceding angular change to that child, delayed by the selected number of frames. Never rewrite keyframe angles with the derived result. Loop-aware indexing is used only when the animation loops; non-looping animations do not wrap across their ends. Each link in a chain must be explicitly enabled, to avoid surprising all descendant bones.

### 5. Mirror Pose

Mirror the selected frame around the character's vertical centreline by standard bone names:
- `left_arm` ↔ `right_arm`
- `left_leg` ↔ `right_leg`
- `body`, `head` map to themselves.

Copy values to the paired bone IDs and reflect the local angle sign. Root X positions, if later added to pose-copy data, mirror around the pose's root centre; root Y stays unchanged. Bones without a unique standard-name partner remain unchanged and produce a small “some bones had no mirror partner” notice. Do not mirror the rig definition or art.

### 6. Copy / paste pose

Copy stores a deep snapshot of the selected frame's pose fields (angles, roots and stretch) plus a name-keyed map. Paste into another frame or animation by normalized bone name, not source bone ID, so it works on a different rig. Standard names are preferred; exact normalized custom names may match when unique. Missing/ambiguous names are skipped with a clear count. Paste writes only matching pose values and does not overwrite target frame hold/easing metadata or target rig/bone definitions. Before mutation, take one undo snapshot; paste and mirror must each be one undo step.

### 7. Pose library (JSON angles only)

Store pose data as `code/poses.json`. No SVGs, images, sample characters, or art. Data maps standard names (`body`, `head`, `left_arm`, `right_arm`, `left_leg`, `right_leg`) to local angle degrees. Missing names are ignored; unmapped target bones retain their current pose.

Required sets:
- Idle/breath: a short 4-frame loop.
- Walk: 8 frames.
- Run: 6 frames.
- Jump: 6 phases — anticipation, take-off, up, top, fall, land.
- Single reusable poses: punch, kick, wave, hurt, win.

Applying a pose creates or updates a frame on the user's current rig; it does not insert a stock figure or replace the user's costume. All library data remains rig-independent and name-keyed.

## Proposed integration order

1. Extend the pure interpolation/pose functions: selected easing, hold metadata, stretch-aware bone solving and delayed follow-through resolution.
2. Extend `play()` tick accounting and `makeCostumes()` expansion for holds.
3. Add per-bone stretch/follow-through controls to the existing bone side panel; add Mirror / Copy / Paste / Pose Library controls without removing existing buttons.
4. Extend Animation history KEEP for any animation-level settings; per-frame hold/ease/stretch remain inside `frames`, and per-bone follow-through remains inside `bones`.
5. Add the JSON pose data and a name-mapping applicator.
6. Preserve current In-between / Smooth ×2 / Glide commands and undo/redo.

## Not in this phase

Ground shadow and smear/blur are optional polish only after items 1–6 work. They are intentionally excluded from the first candidate to avoid adding visual effects before the motion model is stable.

## Acceptance tests — NOT RUN

- Each curve produces deterministic, monotonic values in [0,1]; old frames without metadata preserve current output. Compare Linear/Ease at multiple Glide samples and prove the documented midpoint case.
- Existing In-between, Smooth ×2 and Glide on/off behavior remains reversible, loop-aware, within the 240 stored-frame limit, and undo/redo restores exact frames/FPS.
- Hold=1/2/3/4 advances Play correctly; frame timing and duration readout agree. Make costumes produces repeated normal costumes in the correct order, with no changes to source frames or Animation blocks. Test 240×4 warning and cleanup.
- Stretch clamps at 0.60/1.40, pins joint, scales attached artwork along bone length, and correctly moves children; unrelated branches remain unchanged.
- Follow-through delays by exactly 1 or 2 frames, has reduced amount, works in a chain, respects loop boundaries, stays off by default and does not mutate stored key poses.
- Mirror swaps paired limbs on a user-defined rig; unknown/ambiguous names are safely skipped. Copy/paste across two rigs with different bone IDs maps by name, handles missing bones, and is one undo step.
- Apply all pose-library sets to a user-created rig; missing names do not throw; no stock art is imported.
- Save/reopen and export .sb3 / costumes; metadata and generated costume timing remain correct. Run on a 6-bone and a larger 20+ bone rig; no visible lag.

**Evidence classification:** SOURCE-VERIFIED for the current frame model, interpolation functions, Glide curve, playback timer, frame history and Make costumes path. STATIC DESIGN for the new data model and feature rules. NOT-TESTED for all proposed behaviours, browser/UI, project round-trip and performance.

**Default-change approval:** Pending owner. No default easing selection is changed by this proposal.
