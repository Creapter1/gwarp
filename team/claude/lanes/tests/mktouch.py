"""Lane C zoo: touching sprite / edge / mouse, touching color, color touching color, distance to, with hidden and ghost sprites."""
from sbgen import *
files={};a=Sprite();b=Sprite()
GO=lambda x,y:R('motion_gotoxy',{'X':x,'Y':y})
TO=lambda o:R('sensing_touchingobject',{'TOUCHINGOBJECTMENU':R('sensing_touchingobjectmenu',{},{'TOUCHINGOBJECTMENU':[o,None]})})
DI=lambda o:R('operator_round',{'NUM':R('sensing_distanceto',{'DISTANCETOMENU':R('sensing_distancetomenu',{},{'DISTANCETOMENU':[o,None]})})})
TC=lambda c:R('sensing_touchingcolor',{'COLOR':c})
CC=lambda c,d:R('sensing_coloristouchingcolor',{'COLOR':c,'COLOR2':d})
GH=lambda v:R('looks_seteffectto',{'VALUE':v},{'EFFECT':['GHOST',None]})
a.chain([FLAG,GO(0,0),WAIT(0.3),T('t1',TO('B')),T('t2',TO('_edge_')),T('t3',DI('B')),T('t4',TC('#ff0000')),T('t5',TC('#00ff00')),
 T('t6',CC('#8b5cf6','#ff0000')),GO(-240,0),T('t7',TO('_edge_')),T('t8',DI('B')),GO(200,150),T('t9',TO('B')),T('t10',TC('#ff0000')),
 GO(20,0),R('looks_hide'),T('t11',TO('B')),T('t12',DI('B')),R('looks_show'),GH(100),T('t13',TO('B')),T('t14',TC('#ff0000')),GH(0),
 T('t15',DI('_mouse_')),T('t16',DI('Nope')),T('zz_done','yes')],None,0)
b.chain([FLAG,GO(40,0)],None,0)
RED='<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><rect width="60" height="60" fill="#ff0000"/></svg>'
save('touch.sb3',[target('Stage',{},[costume(files,'bg1',BG('#fff'),240,180)],stage=True),
 target('A',a.B,[costume(files,'c1',CIRC,30,30)],order=1),target('B',b.B,[costume(files,'red',RED,30,30)],order=2)],files)
