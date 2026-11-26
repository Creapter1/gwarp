for f in PALETTE mini.sb3 nat.sb3 c7.sb3 par.sb3 par2.sb3 par3.sb3 par4.sb3 probe.sb3 join.sb3 stop.sb3 ep.sb3 pen.sb3 snd.sb3 bench3.sb3 wide.sb3 big.sb3 vars2500.sb3 /home/claude/priv/gh.sb3; do node t_save.js $f 2>&1 | grep -v 'all OK'; done
echo DONE
