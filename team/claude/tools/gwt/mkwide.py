from sbgen import *
files={};a=Sprite()
names=['a','score','player speed x','the longest variable name here','hp','i','Enemy_Count','z9']+['var%d'%i for i in range(30)]
a.chain([FLAG]+[SET(n,M('add',VAR(names[(i*7)%len(names)]),1)) for i,n in enumerate(names)])
save('wide.sb3',[target('Stage',{},[costume(files,'b1',BG('#ffffff'),240,180)],stage=True),target('A',a.B,[costume(files,'a',CIRC,30,30)],order=1)],files)
