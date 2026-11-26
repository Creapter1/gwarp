# python3 mkvars.py N -> varsN.sb3 : a Stage with N variables and a small script (Breaking G-Warp ep. 2: 2,500+ variables froze and crashed the app)
from sbgen import *
import sys
N=int(sys.argv[1]);files={};a=Sprite();st=Sprite()
a.chain([FLAG]+[SET('v%d'%i,i) for i in range(0,N,max(1,N//40))]+[SET('done',1)])
V={('id_v%d'%i):['v%d'%i,0] for i in range(N)}
T=[target('Stage',{},[costume(files,'b1',BG('#ffffff'),240,180)],stage=True),target('A',a.B,[costume(files,'a',CIRC,30,30)],order=1)]
import json,zipfile
save('vars%d.sb3'%N,T,files)
# add the N variables to the Stage inside the saved file
z=zipfile.ZipFile('vars%d.sb3'%N);pj=json.loads(z.read('project.json'));others={n:z.read(n) for n in z.namelist() if n!='project.json'};z.close()
stg=[t for t in pj['targets'] if t['isStage']][0]
for i in range(N):
    if not any(v[0]=='v%d'%i for v in stg['variables'].values()): stg['variables']['idv%d'%i]=['v%d'%i,0]
z=zipfile.ZipFile('vars%d.sb3'%N,'w',zipfile.ZIP_DEFLATED);z.writestr('project.json',json.dumps(pj));[z.writestr(n,b) for n,b in others.items()];z.close()
print(N,'variables on the stage:',len(stg['variables']))
