"""Lane C zoo: fencing and size limits (go to far away, huge/tiny size, direction wrap, bounce, glide 0, sizes with effects)."""
from sbgen import *
files={};a=Sprite()
GO=lambda x,y:R('motion_gotoxy',{'X':x,'Y':y});X=R('motion_xposition');Y=R('motion_yposition');D=R('motion_direction')
SZ=R('looks_size');SS=lambda v:R('looks_setsizeto',{'SIZE':v});CS=lambda v:R('looks_changesizeby',{'CHANGE':v})
PD=lambda v:R('motion_pointindirection',{'DIRECTION':v});TR=lambda v:R('motion_turnright',{'DEGREES':v})
EF=lambda e,v:R('looks_seteffectto',{'VALUE':v},{'EFFECT':[e,None]})
a.chain([FLAG,SS(100),GO(0,0),PD(90),
 GO(9999,0),T('f1',X),GO(-9999,9999),T('f2',X),T('f3',Y),GO('abc',5),T('f4',X),R('motion_setx',{'X':'1e9'}),T('f5',X),
 R('motion_changeyby',{'DY':'-5000'}),T('f6',Y),GO(0,0),
 SS(100000),T('z1',SZ),SS(0),T('z2',SZ),SS(-50),T('z3',SZ),SS(100),CS(1e6),T('z4',SZ),SS('xyz'),T('z5',SZ),SS(100),
 PD(270),T('d1',D),PD(-190),T('d2',D),PD(180),T('d3',D),PD(-180),T('d4',D),TR(725),T('d5',D),PD(540.5),T('d6',D),PD('abc'),T('d7',D),
 PD(90),GO(235,0),R('motion_ifonedgebounce'),T('b1',D),T('b2',X),
 R('motion_glidesecstoxy',{'SECS':0,'X':50,'Y':60}),T('g1',X),T('g2',Y),R('motion_glidesecstoxy',{'SECS':-1,'X':7,'Y':8}),T('g3',X),
 EF('GHOST',50),SS(300),GO(9999,0),T('e1',X),T('e2',SZ),EF('GHOST',0),T('zz_done','yes')],None,0)
save('fence.sb3',[target('Stage',{},[costume(files,'b1',BG('#fff'),240,180)],stage=True),
 target('A',a.B,[costume(files,'c1',CIRC,30,30)],order=1)],files)
