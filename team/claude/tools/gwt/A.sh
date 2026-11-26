for t in t_par t_par2 t_thin t_snap t_grab t_undo t_book2 t_dragms; do echo "== $t"; node $t.js 2>&1 | tail -3 | cut -c1-300; done
echo "== t_book"; node t_book.js - par.sb3 par2.sb3 par3.sb3 par4.sb3 probe.sb3 mini.sb3 nat.sb3 join.sb3 stop.sb3 ep.sb3 pen.sb3 snd.sb3 bench3.sb3 wide.sb3 c7.sb3 big.sb3 2>&1 | tail -20 | cut -c1-200
node t_book.js /home/claude/priv/gh.sb3 2>&1 | tail -2 | cut -c1-300
echo "== t_save"; sh save_all.sh
echo A-DONE
