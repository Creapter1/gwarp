# ANIM-I2 — New animation icon options

By: ChatGPT (Codex) · Date (UTC): 2026-11-08
Branch: `ai-team` · Job: ANIM-I2 — NEW ICONS (3 options each)

## What this is
114 original, small SVG proposals: 38 animation actions × A/B/C. Each is a separate 24×24 vector file. The preview puts the options beside four existing Gemini animation icons at 16, 24, and 32 px, with dark and light backgrounds.

## Where it goes
Animation tab controls: centre, guide, layer, motion, pose, and preview/export tools. This folder is a proposal; it does not change the app. The owner chooses an option for each action.

## Shared style
Rounded open strokes, 1.9 px on a 24 px canvas, no external resources, two colors at most (theme-following currentColor plus one accent). Green marks a changed state or motion. Each action keeps the same metaphor across its three scales. Options change the drawing/composition, not just the accent color. The pose set uses rounded, solid bean-like bodies, round heads, broad curved limbs, and no faces, Scratch character, borrowed stick figure, or letters.

### Design pass and self-critique
- Pass 1: keep one Gemini-like line grammar; use direct object, framed/spatial, and movement/sequence ideas as routes for distinct choices. For pose icons, vary the figure silhouette and action cue.
- Review before drawing: centre, guide, and layer symbols can blur together at 16 px; thin inner marks can vanish; playback arrows can look like export arrows. The set therefore separates target/cross, ruler/guide, layered-plane, and output-grid silhouettes, and uses at most a few interior marks. Pose limbs stay broad and rounded.
- Independent critique: the icon review recommended sparse pivots and guide nodes, offset planes for layers, attached motion cues, and removal of interior marks that merge at 16 px. Those constraints were applied to the drawings.
- Favorites below are my recommendations for readability and are not owner selections.

## Options and suggested picks
- **Set centre** (`set-centre`) — A: Aim a reticle at the clicked point; B: Choose a node on a framed costume; C: Place the origin with cross-axes. **Suggested: A** — The single target reads clearly at 16 px.
- **Centre costume** (`centre-costume`) — A: Pull the costume bounds toward the middle; B: Move a small costume into a stage target; C: Align a shape on crossing centre lines. **Suggested: B** — The framed object plus inward arrows makes the action direct.
- **Centre all frames** (`centre-all-frames`) — A: Three cards sharing one centre pin; B: Pose blobs aligned to a common axis; C: A frame strip balanced on one target. **Suggested: A** — One shared centre point connects every frame.
- **Drift warning** (`drift-warning`) — A: Ghost frames slip away from a yellow centre mark; B: A frame wanders off a broken alignment; C: Pose echoes separate from the origin. **Suggested: A** — Offset ghosts and the caution mark show drift without text.
- **Guide lines** (`guide-lines`) — A: Ruler pulls a guide across the canvas; B: Corner ruler releases a long guide; C: Handles drag a guide from a side rail. **Suggested: A** — It pairs a measuring edge with a long pulled line.
- **Ground line** (`ground-line`) — A: Rounded feet settle on a baseline; B: Two feet land on a marked ground ruler; C: Stage floor with a small height measure. **Suggested: A** — The feet visibly meet the ground stroke.
- **Ruler** (`ruler`) — A: Straight ruler with varied tick marks; B: Right-angle ruler for measuring corners; C: Round measure with radial ticks. **Suggested: B** — The right-angle silhouette separates it from guide controls.
- **Snap to guide** (`snap-to-guide`) — A: Magnet catches a node on the line; B: A diamond clicks into the guide rail; C: Shape slides neatly onto a guide. **Suggested: B** — A single node landing on a guide is the clearest snap cue.
- **Lock guides** (`lock-guides`) — A: Small lock anchors crossing guides; B: Lock the guide inside a framed canvas; C: Padlock closes around a single guide. **Suggested: C** — The closed lock is the strongest compact symbol.
- **Layers panel** (`layers-panel`) — A: Three offset rounded sheets; B: Fanned cards with a shared edge; C: Vertical panel with stacked layer bars. **Suggested: A** — The three offset sheets read as a layer stack at every size.
- **Layer visible** (`layer-visible`) — A: Eye floats above one sheet; B: Eye sits within a visible layer card; C: Stack with one open-eye window. **Suggested: A** — The eye above a sheet stays legible without crowding.
- **Layer hidden** (`layer-hidden`) — A: Eye crossed by a clean diagonal; B: Closed eye inside a hidden layer card; C: Collapsed layers under a slash. **Suggested: A** — A single slash makes the hidden state unmistakable.
- **Lock layer** (`layer-lock`) — A: Closed padlock over a sheet; B: Lock bar across an active layer; C: Lock badge beside stacked planes. **Suggested: A** — A familiar lock over a sheet is quick to recognize.
- **Unlock layer** (`layer-unlock`) — A: Open shackle over a sheet; B: Lock body with a lifted shackle; C: Open lock beside visible layer bars. **Suggested: B** — The lifted shackle makes the open state clear.
- **Layer behind bone** (`layer-behind-bone`) — A: Bone slips beneath the top sheet; B: Bone sits in the rear of a layer stack; C: Bone path tucks under the torso plane. **Suggested: A** — The crossing order shows the bone going behind.
- **Ease in-out** (`ease-in-out`) — A: Bezier curve with quiet endpoints; B: S-curve with control handles; C: Slow-fast path marked by spaced beats. **Suggested: A** — The Bezier curve is the most familiar easing picture.
- **Squash and stretch** (`squash-stretch`) — A: Short wide and tall slim blobs; B: One blob pressed between opposing arrows; C: Two poses linked on a vertical stretch axis. **Suggested: A** — The wide/tall pair shows both extremes together.
- **Follow-through** (`follow-through`) — A: Trailing curve follows a leading blob; B: Three softened echoes lag behind motion; C: Tail-like arcs swing after the body. **Suggested: C** — The swinging arcs feel like follow-through rather than repeated frames.
- **Mirror pose** (`mirror-pose`) — A: Two blob poses swap across an axis; B: Mirrored arms flank a reflection line; C: One pose and its ghost face opposite ways. **Suggested: B** — The central axis plus paired silhouettes reads as a mirror.
- **Copy pose** (`copy-pose`) — A: Copy one pose into a second frame; B: Duplicate cards with a curved arrow; C: Two matching blob silhouettes. **Suggested: A** — The source pose and destination frame are easy to follow.
- **Paste pose** (`paste-pose`) — A: A pose drops into the empty frame; B: Receive a figure through a frame opening; C: Pose settles on a target card. **Suggested: B** — A figure landing through the frame makes pasting distinct from copying.
- **Hold frame** (`hold-frame`) — A: One long frame spans the timeline; B: Stretch one frame to extend its hold; C: Selected frame with pause-like duration rails. **Suggested: B** — The stretched frame communicates longer display time.
- **Keyframe** (`keyframe`) — A: Diamond sits on a frame rail; B: Diamond with a clear center pivot; C: Two frames connected through a key diamond. **Suggested: A** — The classic diamond-on-rail shape reads immediately.
- **Timeline** (`timeline`) — A: Frame rail with a green playhead; B: Filmstrip and position marker; C: Keyframes linked to a motion curve. **Suggested: C** — The curve plus frame markers connects time to motion.
- **Pose library** (`pose-library`) — A: Open book with two blob poses; B: Deck of pose cards with varied silhouettes; C: Drawer of pose thumbnails. **Suggested: B** — Cards show a reusable collection without relying on a book icon.
- **Preview on stage** (`preview-on-stage`) — A: Figure plays inside a stage frame; B: Stage window with a preview spotlight; C: Viewfinder corners around a live stage. **Suggested: C** — Corner brackets frame the preview with little visual clutter.
- **Preview size** (`preview-size`) — A: Stage expands with outward corner arrows; B: Compare small and large stage frames; C: Drag a corner handle to resize. **Suggested: A** — Four outward directions communicate size change at a glance.
- **Export animation** (`export-gif`) — A: Film frames leave through an export arrow; B: Looping frames flow out of a rounded file; C: Three-frame strip moves into a save tray. **Suggested: A** — A frame strip plus outward arrow names animation export.
- **Export sprite sheet** (`export-sheet`) — A: Frame grid exits through an arrow; B: Tile sheet curls out from the canvas; C: Three stacked frame rows enter a tray. **Suggested: A** — A small grid is the clearest sprite-sheet cue.
- **Walk** (`walk`) — A: Opposite arm and leg swing; B: Long stride over a ground mark; C: Step cycle with an airy echo. **Suggested: A** — Crossed arm and leg swing reads as walking at 16 px.
- **Run** (`run`) — A: Forward lean with speed ticks; B: Wide sprint stride and a ground kick; C: Runner trailing a curved speed arc. **Suggested: A** — The leaning torso plus speed cue separates it from walking.
- **Jump** (`jump`) — A: Lifted pose with a spring cue; B: Tucked figure above a launch arc; C: Airborne figure with motion dots. **Suggested: B** — The tucked silhouette above a curved launch line is playful and clear.
- **Idle** (`idle`) — A: Calm upright pose with breath arcs; B: Seated easy pose; C: Neutral pose inside a soft pulse. **Suggested: A** — The breathing arcs make an otherwise quiet pose readable.
- **Punch** (`punch`) — A: Arm sweeps from a braced torso; B: Side stance with an extended fist; C: Compact impact burst meets the fist. **Suggested: B** — The straight side extension is distinct from a raised wave.
- **Kick** (`kick`) — A: One leg extends in a side kick; B: Knee lifts before a forward kick; C: High kick cuts across a motion arc. **Suggested: A** — A long, level leg line unmistakably signals a kick.
- **Wave** (`wave`) — A: Raised, bent arm over the head; B: Side wave with a small hand cue; C: Both arms lift in a friendly greeting. **Suggested: A** — One raised bent arm gives the clearest wave silhouette.
- **Hurt** (`hurt`) — A: Torso recoils under short impact rays; B: Crouched blob shields its middle; C: Angled recoil away from a sharp hit. **Suggested: C** — The tilted body and burst marks make the hurt pose distinct.
- **Win** (`win`) — A: Raised arms make a strong victory V; B: Celebration jump with bent knees; C: Open pose with small starbursts. **Suggested: A** — The high, open arms read as winning at icon size.

## Plug-in note
After the owner selects A/B/C, Claude can copy only that SVG into the corresponding animation-icon map, keep the visible text label, then check the chosen icon beside the existing family in dark/light themes. No integration code is included here.

## Evidence and credits
- **Evidence: NOT-TESTED in G-Warp.** These are icon proposals only; no app integration or app runtime test was done.
- **SOURCE-VERIFIED** for the existing reference family: public source snapshot `51d6518cd8a5f41b944282c537a29dfc5cd4dca4`, `app.html`, `gw-v4970-gemini-icons` entries Onion, Flipbook Play, Bones, and In-between.
- Credits/licence: new vector drawings made for this G-Warp proposal; no external artwork or icon set was copied into the options.
