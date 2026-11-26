cd /home/claude/ref
echo "== bench40 build o"; node bench.js /home/claude/gwt/bench40.sb3 /home/claude/rel/app.html 2>&1 | tail -16 | head -8 | cut -c1-90
echo "== bench40 experiment"; node bench.js /home/claude/gwt/bench40.sb3 /home/claude/x2/app-fast.html 2>&1 | tail -16 | head -8 | cut -c1-90
echo "== par3 old way x6"; for i in 1 2 3 4 5 6; do node diff.js /home/claude/gwt/par3.sb3 14000 /home/claude/rel/app.html 2>&1 | grep -v "^m2[12]" | tail -2 | tr '\n' ' '; echo; done
echo G-DONE
