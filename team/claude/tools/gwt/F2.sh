cd /home/claude/ref
for p in "mini 6000" "par 6000" "par2 6000" "probe 6000" "nat 6000" "join 6000" "stop 6000" "ep 6000" "par3 14000" "par4 6000"; do set -- $p; echo "== diff $1 $(node diff.js /home/claude/gwt/$1.sb3 $2 /home/claude/x2/app-fast.html 2>&1 | grep -E 'same as' | cut -c1-100)"; done
echo "== t_par"; node /home/claude/gwt/t_par.js /home/claude/x2/app-fast.html 2>&1 | grep FAIL | cut -c1-200
echo "== stat game"; node /home/claude/gwt/faststat.js /home/claude/priv/gh.sb3 /home/claude/x2/app-fast.html 9000 12000 | cut -c1-600
echo "== fps fast"; TAPS=8 node fps.js /home/claude/priv/gh.sb3 12000 /home/claude/x2/app-fast.html 2>&1 | tail -2 | cut -c1-300
echo "== bench fast"; node bench.js /home/claude/gwt/bench.sb3 /home/claude/x2/app-fast.html 2>&1 | tail -16 | head -8 | cut -c1-200
echo F-DONE
