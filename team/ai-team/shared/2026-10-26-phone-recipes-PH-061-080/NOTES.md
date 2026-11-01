Job: phone recipes PH-061..080 (probably made by another model after the daily Opus limit)       Checked + fixed by Claude, 2026-10-26
Fixed: plain values inside conditions -> literal nodes (fix_phone_pack.py now does this); r-ph-follow-sprite rewritten (it read its
  own position) ; r-ph-dodge-falling fixed (stopped at once because it starts touching the top edge).
Dropped (4): r-ph-pen-trail-stamp, r-ph-pen-square, r-ph-pen-star, r-ph-random-pen-colour - pen blocks are not in G-Warp's list,
  so they didn't draw what their titles promise.
Evidence: validate_gwrap_pack.py -> 16 recipes, 0 errors, 0 warnings, PASS (no id clash with PH-001..060 or Claude's pack).
  NOT-TESTED in G-Warp yet (merge with PH-001..060, plan C1b).
