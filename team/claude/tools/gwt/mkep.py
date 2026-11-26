# Breaking G-Warp ep. 2 + 3 number checks against real Scratch
from sbgen import *
files={};a=Sprite()
MO=lambda op,v:R('operator_mathop',{'NUM':v},{'OPERATOR':[op,None]})
XP=R('motion_xposition');SZ=R('looks_size')
a.chain([FLAG,SET('log1000',MO('log',1000)),SET('log8',MO('log',8)),SET('ln',MO('ln',10)),SET('e',MO('e ^',1)),SET('ten',MO('10 ^',2.5)),SET('sqrt2',MO('sqrt',2)),
 R('looks_setsizeto',{'SIZE':'1e999'}),SET('sizeInf',SZ),R('looks_setsizeto',{'SIZE':100}),
 R('motion_setx',{'X':'10000000000'}),SET('x1e10',XP),R('motion_setx',{'X':'1e308'}),SET('x1e308',XP),R('motion_setx',{'X':'-1e308'}),SET('xm1e308',XP),R('motion_setx',{'X':0}),
 R('motion_changexby',{'DX':'1e308'}),SET('chg1e308',XP),R('motion_gotoxy',{'X':'Infinity','Y':'-Infinity'}),SET('gotoInf',J(XP,J(' ',R('motion_yposition')))),SET('done',1)])
save('ep.sb3',[target('Stage',{},[costume(files,'b1',BG('#ffffff'),240,180)],stage=True),target('A',a.B,[costume(files,'a',CIRC,30,30)],order=1)],files)
