Job: phone recipes PH-001..060        By: the owner's phone chatbot (prompt ai-team/phone/PHONE-BOT-PROMPT.txt); checked + fixed by Claude
Date (UTC): 2026-10-26
What it is: 60 GWrap AI recipes (follow mouse, spin, pulse, bounce, fade, ... walls, buttons, enemies, quiz, dice, camera, pet, win).
Fixes by Claude: value nodes used as block inputs -> reporter blocks {"r": ...} (prompt was wrong, fixed); "prep" vars/lists added;
  r-ph-enemy-chase-player rewritten (point towards Player + move 2) because the format can't read another sprite's x inside a condition.
Evidence: validate_gwrap_pack.py -> 60 recipes, 0 errors, 0 warnings, PASS (also no id clash with claude/gwrap-pack.json).
  NOT-TESTED in G-Warp yet (merge + build test planned: claude/PLAN-NEXT.md C1b).
How Claude plugs it in: add as a pack to GWrap AI (grep -n "const PACKS" app.html), then ask GWrap AI 5 of the q's and build them.
