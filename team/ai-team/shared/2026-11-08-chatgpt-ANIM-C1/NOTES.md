# ANIM-C1: centre and frame alignment

Job: ANIM-C1 — ALWAYS CENTRED, LIKE SCRATCH
By: ChatGPT (Codex)
Date (UTC): 2026-11-08
Branch: ai-team

## What exists now

The current app source already includes a centre feature. The gw-claude-centre script adds a Centre button, a Line up button, a one-action custom Undo button, and orange drift badges in the Costume list (app.html in the reviewed snapshot, lines 25270–25306). The extracted desktop, main, and ai-team gw-claude-centre.js fragments have the same SHA-256.

The current controls do not yet meet all of the queued ANIM-C1 behavior:

| Queue requirement | Current source behavior | Gap |
|---|---|---|
| Click to set the rotation centre; undo it | Centre calculates the alpha-bounds midpoint and stores it in c.rc (25292). The visible #gwpeCentre mark is pointer-inert (20087). | No click-to-place pivot. The custom Undo is one level and separate from normal Costume Studio undo. |
| Centre the drawing on its pivot; optional feet line | Centre changes only c.rc; it does not move the drawing (25292). | No art translation or feet-line option. |
| Give every animation frame one centre from frame 1's orange root | Line up uses the first costume in a name-derived group and assigns different c.rc values so each frame's feet-to-centre offset matches (25284–25296). | It does not use the animation ID/frame metadata or root joint, and does not assign one shared centre. A non-frame costume has no // folder, so group() can return every costume on the sprite (25284–25285). |
| Warn when body centre shifts over 2 px while the root stays put | The badge compares the rendered alpha-box centre/bottom relative to c.rc; its limit is max(4 px, 8% of frame-one body height) (25286–25298). | It does not compare body midpoint to the orange root using the requested 2 px threshold. |
| Identical output canvas and rotation centre | makeCostumes copies the source costume's rc to each frame and normally renders the same SVG root dimensions (app.html 16742–16760). | No explicit output invariant. An SVG decode error silently creates a 1×1 canvas (16747–16751). |

The alpha-box helper scans every canvas pixel (25280–25283); badges call it while the costume list is visible (25297–25305). This is an O(pixel-count × frame-count) path. Cache bounds or compute them after a frame changes before expanding this to more animations.

## Proposal files

- code/anim-centre.js provides pure geometry and adapter helpers. It does not touch the DOM or the app.
- tests/anim-centre.test.js covers eight focused helper cases.
- Generated frame selection uses existing metadata gwAnimFrame.anim and .frame, not costume names. Pass anim.frames.length so missing, duplicate, or out-of-range frame indices fail before alignment.
- rotationCentreFromPoint validates/clones the mapped click point; sharedCentreAssignments returns one exact centre from frame 1's root for every selected frame. Neither function changes SVG/art or pose objects.
- translationToCentre returns a translation for the adapter to apply to all artwork layers while keeping the existing pivot fixed. With a finite numeric feetLineY, it centers horizontally and aligns the bottom to the chosen baseline; malformed supplied values throw.
- detectBodyDrift measures the body-bounds midpoint relative to the supplied root point, warns strictly above 2 px, and suppresses warnings when the root moved more than 0.5 px.
- validateMadeFrames requires positive, exact canvas width/height and keeps the rotation centres within 1 px Euclidean distance.
- Coordinate contract: bounds, solved root points, and rotation centres must first be normalized to the same G-Warp costume-local logical units. The adapter must account for SVG viewBox origin and raster resolution; do not add the Scratch SVG-origin offset here because the existing SB3 serializer owns that conversion.
- Missing/invalid geometry throws instead of silently producing a plausible measurement.

## Integration notes for Claude

1. Load the file as a separate helper (window.GW_ANIM_CENTRE_TOOLS); do not overwrite window.GW_CENTRE.
2. Pass the correct orange-base bone ID and the solved joint from GW_ANIM.solve(anim, anim.frames[0]) into rootPointFromSolved. Use selectGeneratedFrames(sprite.costumes, anim.id) and sort via metadata; never treat all ordinary costumes as one animation.
3. Make the paint click tool convert the pointer through the existing editor screen-to-costume mapping, normalize into the module's costume-local units, validate the mapped coordinates with rotationCentreFromPoint(), snapshot the costume centre, set c.rc, and refresh the mark. Extend the normal costume Undo snapshot/restore to include c.rc; the present snapshot at app.html 9246–9265 stores bitmap pixels or SVG markup, not the rotation centre.
4. For Centre this costume, apply the returned translation to the SVG art layer(s) as one shared transform. Keep c.rc fixed and use the undo snapshot. When the feet option is selected, use the first frame's ground line as feetLineY.
5. For Line up, assign the same frame-one root to every selected frame's c.rc. Do not translate frame art.
6. Run drift analysis after Make costumes or after an edit invalidates cached bounds, not every second. A one-click “Use frame 1 centre” action can normalize pivot metadata without changing pose/art. It must not claim to repair actual pose drift: changing the pose separately per frame would conflict with the no-per-frame-art-movement requirement.
7. Make costumes should get its shared size from the animation SVG viewBox, use the same rotation centre for every output, and validate all output frames before replacing existing costumes. Any decode failure should abort the batch and keep the prior generated frames.

## How to test

1. Use a disposable project with an 8-frame walk and an 8-frame punch. Test pointer-centre, Centre this costume, feet-line, Line up, Undo/Redo, and drift warning with the orange root held still and moved.
2. Generate costumes and verify exact canvas width/height plus centres equal within 1 px using the QA kit's costume-bound inspection.
3. Export a temporary .sb3; run run-in-scratch.js; switch costumes in a script and confirm the sprite's stage x/y do not change.
4. Include decode-failure and ordinary-costume grouping cases. No private owner project should be used.

## Evidence

- SOURCE-VERIFIED: current checked-in ai-team snapshot at commit 5cbb4b94bae809cc45cad7546df69d2380ee9531; the same centre fragment hash was found in desktop and main extracted sources.
- Local Node helper-check output only: node --test tests/anim-centre.test.js reported 8 passed, 0 failed (Node v26.13.0). Checks include incomplete/duplicate frame groups and invalid feet-line inputs. This does not establish app behavior.
- BROWSER-OBSERVED: existing side preview showed Beta v15.60.0 / runtime value 15.5.2, G-Spark's walk animation with 8 frames, 5 bones, and 5/5 shapes attached. The “Made 8 costumes” toast was already visible. No input was sent.
- NOT-TESTED in G-Warp: the existing controls, output validation, and proposed integration.
- NOT-TESTED in scratch-vm: .sb3 export/save and costume switching.
- Desktop runtime: NOT-TESTED.
- No app source changed. No third-party code or art is included.
