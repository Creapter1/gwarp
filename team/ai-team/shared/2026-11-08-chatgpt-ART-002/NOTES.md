Job: ART-002 — original robot library art
By: ChatGPT, lane L8-ART
Date (UTC): 2026-11-08T04:31:40Z

What it is: Three original, friendly robot designs in G-Warp's dark electric palette. Each design includes a four-frame walk cycle, for 12 SVG costume files total. All files share a 240 × 300 viewBox with its origin at the torso center; the torso stays fixed while limbs pose so the rotation point does not drift.
Where it goes in G-Warp: Proposed additions to the Choose a Sprite library. This package is a review proposal only; no live app files changed.
Options: A = Beacon Courier, rounded helmet and green energy core. B = Workshop Buddy, angular head and treaded boots. C = Orbit Sensor, orb-shaped head with side sensors and a central lens. My pick: A, because its simple face and clear silhouette should read well at small stage size.
Animation: Each option has four separate walk-frame costumes: robot-<A|B|C>-walk-1.svg through robot-<A|B|C>-walk-4.svg. Body and head remain fixed around the shared torso origin; arms and legs swing in opposing pairs.
Preview: Open preview.html from this folder. It shows each design on a 480 × 360 stage, dark and light backgrounds, manual frame controls, and an optional pivot crosshair.
How Claude plugs it in: After owner review and a selected option, import its four SVG frames as new sprite costumes through the existing sprite-library path. Keep this package separate until chosen.
How to test: Open preview.html. Check the three designs on both stage themes, step through each four-frame walk, and toggle the center mark. In a separate G-Warp test project, import one selected sequence, rotate the sprite, save/reopen the project, and verify Scratch/TurboWarp playback.
Evidence: SOURCE-VERIFIED for lane requirements; static source review only. Browser preview, G-Warp import/rotation, and saved-project compatibility are NOT-TESTED.
Credits / licences: Original vector art created for this proposal; no third-party assets or characters.
