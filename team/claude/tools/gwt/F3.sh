cd /home/claude/ref
echo "-- fast OFF (hooks only)"; for p in "stop 6000" "par3 14000" "par4 6000" "par 6000"; do set -- $p; echo "== diff $1 $(node diff.js /home/claude/gwt/$1.sb3 $2 /home/claude/x2/app.html 2>&1 | grep -E 'same as' | cut -c1-100)"; done
echo "== t_par off"; node /home/claude/gwt/t_par.js /home/claude/x2/app.html 2>&1 | grep FAIL | cut -c1-100
echo "-- fast ON"
sh /home/claude/gwt/F2.sh
