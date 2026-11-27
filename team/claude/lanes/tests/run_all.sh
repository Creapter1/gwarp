#!/bin/sh
# Lane C: whole test list, one test at a time (parallel runs made t_snap crash, see BUGS.md 6).
# Setup as in PROGRESS.md section 3. Usage: sh run_all.sh [app.html] > all.log   (about 25 min; run with nohup)
# Builds the lane C zoo with the generators here, then: app tests, Book, save, undo, Scratch referee on every zoo file.
# Tests that need the owner's game print SKIP when /home/claude/priv/gh.sb3 is missing.
APP=${1:-/home/claude/rel/app.html}; L=$(cd "$(dirname "$0")" && pwd); G=/home/claude/gwt; GH=/home/claude/priv/gh.sb3
cp $L/mk*.py $G/ && cd $G && for m in $L/mk*.py; do python3 $(basename $m) >/dev/null; done; export APP
Z="list2 mini nat c7 par par2 par3 par4 probe pen snd bench3 wide join stop ep quirk order motion ctrl proc vol time text touch math deep lay9 big vars2500"
for t in t_par t_par2 t_snap t_book2; do echo "== $t"; node $t.js 2>&1 | grep -v "^$" | grep -v "^list " | tail -2 | cut -c1-200; done
for t in t_thin t_undo t_dragms t_grab; do echo "== $t"; [ -f $GH ] && node $t.js 2>&1 | tail -2 | cut -c1-200 || echo SKIP; done
echo "== t_book"; node t_book.js - $(for p in $Z; do printf "%s.sb3 " $p; done) 2>&1 | grep -E "^(OK|FAIL|BAD)" | cut -c1-120
echo "== t_save"; node t_save.js PALETTE $(for p in $Z; do printf "%s.sb3 " $p; done) 2>&1 | grep -E "^(OK|FAIL|BAD)" | cut -c1-120
echo "== t_undob"; for p in $Z; do node t_undob.js $p.sb3 2>&1 | grep -E "^(OK|FAIL|BAD)" | cut -c1-120; done
echo "== referee"; cd /home/claude/ref
for p in par:6000 par2:6000 probe:6000 mini:6000 nat:6000 join:6000 stop:6000 ep:6000 par3:14000 par4:6000 quirk:6000 order:6000 motion:6000 ctrl:6000 proc:6000 vol:6000 time:6000 text:6000 touch:6000 math:6000 of:6000 fence:6000 sndv:6000 bd:6000 clvar:6000 list2:8000 yield:5000 waitu:6000 deep:15000 $(for i in $(seq 1 15); do printf "lay$i:5000 "; done); do
  n=${p%:*}; printf "%-7s " $n; node diff.js $G/$n.sb3 ${p#*:} $APP 2>&1 | grep -v '^$' | head -4 | tr '\n' ' ' | cut -c1-220; echo; done
[ -f $GH ] && { cd $G; echo "== play"; node play.js $GH "" 8 9000 $G/shot.png "JSON.stringify({state:Engine.variables.state})" 2>&1 | tail -2 | cut -c1-200; } || echo "== play SKIP"
echo ALL-DONE
