while ! grep -q B-DONE B.log; do sleep 5; done
echo "== t_par2"; node t_par2.js 2>&1 | tail -3 | cut -c1-300
cd /home/claude/ref
for p in "par 6000" "par2 6000" "probe 6000" "mini 6000" "nat 6000" "join 6000" "stop 6000" "ep 6000" "par3 14000" "par4 6000"; do set -- $p; echo "== diff $1"; node diff.js /home/claude/gwt/$1.sb3 $2 2>&1 | tail -4 | cut -c1-240; done
echo "== diff par4 BASE"; node diff.js /home/claude/gwt/par4.sb3 6000 /home/claude/base/app.html 2>&1 | tail -2 | cut -c1-240
cd /home/claude/gwt
echo "== play"; node play.js /home/claude/priv/gh.sb3 "" 8 9000 /home/claude/gwt/shot.png "JSON.stringify({state:Engine.variables.state})" 2>&1 | tail -4 | cut -c1-300
echo "== mem"; node mem.js /home/claude/priv/gh.sb3 2>&1 | tail -3 | cut -c1-300
cd /home/claude/ref
echo "== fps new"; TAPS=8 node fps.js /home/claude/priv/gh.sb3 12000 2>&1 | tail -4 | cut -c1-300
echo "== fps base"; TAPS=8 node fps.js /home/claude/priv/gh.sb3 12000 /home/claude/base/app.html 2>&1 | tail -4 | cut -c1-300
echo "== bench"; node bench.js 2>&1 | tail -12 | cut -c1-200
echo C-DONE
