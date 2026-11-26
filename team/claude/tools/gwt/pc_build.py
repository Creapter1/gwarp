#!/usr/bin/env python3
"""Build the owner's PC copy of app.html from /home/claude/rel/app.html.
Usage: python3 pc_build.py <letter>   (next letter after STATE.json's; PC keeps number 15.69.0 and only the letter changes)
Writes into /mnt/user-data/outputs/pc/: app.html (new) and before-v15690<letter>-app.html (= the PC's current file).
Then commit BOTH to the PC with device_commit_files (backup first), plus a CLAUDE-CHANGES-v15.69.0<letter>.md."""
import re,sys,json,shutil,os
L=sys.argv[1];out='/mnt/user-data/outputs/pc';st=json.load(open('/home/claude/gwt/STATE.json'))
assert len(L)==1 and L>st['letter'],('letter must come after',st['letter'])
shutil.copy(out+'/app.html',f'{out}/before-v15690{L}-app.html')
s=open('/home/claude/rel/app.html').read()
a="<!-- website build: the private local-AI helper (gwarp-ollama.js) is not included -->";assert s.count(a)==1
s=s.replace(a,'<script src="gwarp-ollama.js?v=15602"></script><!-- private build: local Ollama for G-Spark (Claude) -->')
s,n=re.subn(r"version:'15\.70\.\d+',label:'Beta v15\.70\.\d+'",f"version:'15.69.0',label:'Beta v15.69.0{L}'",s);assert n==1
open(out+'/app.html','w').write(s);st['letter']=L;json.dump(st,open('/home/claude/gwt/STATE.json','w'));print('built PC app v15.69.0'+L,len(s))
