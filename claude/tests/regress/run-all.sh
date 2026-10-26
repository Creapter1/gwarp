#!/bin/bash
# Claude's regression tests for G-Warp (saved 2026-10-26 so the next session doesn't rewrite them).
# Usage (repo root):  bash claude/tests/regress/run-all.sh [app.html]
# First time in a fresh cloud box: npm needs the proxy override (registry.npmjs.org is in NO_PROXY but has no DNS here):
#   cd claude/tests/regress && NO_PROXY= no_proxy= npm i --no-audit --no-fund --noproxy=example.invalid playwright@1.56.0 jszip@3.10.1 @fortawesome/fontawesome-free@6.4.0 && cd -
#   (pre-installed Chromium: do NOT run "playwright install")
set -u; APP="${1:-app.html}"; D="$(dirname "$0")"; export NODE_PATH="$D/node_modules:/opt/npm-tools/node_modules"
for t in motion_t cm_t newblocks test_gwrap_pack stageclick test_mascot test_anim icon_t music_play; do
  echo "=== $t"; timeout 300 node "$D/$t.js" "$APP" 2>&1 | grep -E "FAIL|ALL PASS|pass$|errors|played" | tail -6
done
echo "=== qa-kit smoke"; (cd ai-team/tools/qa-kit && timeout 300 node smoke-app.js 2>&1 | tail -1)
echo "Expected: motion 8 PASS, cm 21 PASS, newblocks/gwrap_pack/stageclick ALL PASS, mascot 11/11, anim 16/18 (2 old checks), icons dup 0, music played x3, smoke ALL PASS"
