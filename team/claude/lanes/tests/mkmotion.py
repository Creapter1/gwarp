"""Lane C zoo: motion/looks edge cases (fencing, wrap of direction, size limits, effects, layers, rotation style)."""
from sbgen import *
files={};a=Sprite();b=Sprite()
X=lambda:R('motion_xposition');Y=lambda:R('motion_yposition');D=lambda:R('motion_direction')
GO=lambda x,y:R('motion_gotoxy',{'X':x,'Y':y})
a.chain([FLAG,GO('0','0'),R('looks_setsizeto',{'SIZE':'100'}),
 R('motion_setx',{'X':'-5000'}),T('m1',X()),R('motion_sety',{'Y':'5000'}),T('m2',Y()),
 GO('0','0'),R('motion_changexby',{'DX':'1e6'}),T('m3',X()),
 R('motion_pointindirection',{'DIRECTION':'180'}),T('m4',D()),R('motion_turnright',{'DEGREES':'1'}),T('m5',D()),
 R('motion_pointindirection',{'DIRECTION':'540'}),T('m6',D()),R('motion_pointindirection',{'DIRECTION':'-180'}),T('m7',D()),
 R('motion_pointindirection',{'DIRECTION':'abc'}),T('m8',D()),
 GO('0','0'),R('motion_pointindirection',{'DIRECTION':'90'}),R('motion_movesteps',{'STEPS':'10.5'}),T('m9',X()),
 GO('3.14159','-2.5'),T('m10',X()),T('m11',Y()),
 R('motion_pointtowards',{'TOWARDS':R('motion_pointtowards_menu',{},{'TOWARDS':['B','B']})}),T('m12',F('round',D())),
 R('looks_setsizeto',{'SIZE':'100000'}),T('m13',R('looks_size')),R('looks_setsizeto',{'SIZE':'-50'}),T('m14',R('looks_size')),
 R('looks_setsizeto',{'SIZE':'100'}),R('looks_changesizeby',{'CHANGE':'-0.5'}),T('m15',R('looks_size')),
 R('looks_seteffectto',{'VALUE':'250'},{'EFFECT':['GHOST',None]}),R('looks_changeeffectby',{'CHANGE':'-30'},{'EFFECT':['GHOST',None]}),
 T('m16','fx'),R('looks_cleargraphiceffects'),
 R('looks_gotofrontback',{},{'FRONT_BACK':['back',None]}),T('m17',R('looks_costumenumbername',{},{'NUMBER_NAME':['number',None]})),
 R('looks_switchcostumeto',{'COSTUME':R('looks_costume',{},{'COSTUME':['c2','c2']})}),T('m18',R('looks_costumenumbername',{},{'NUMBER_NAME':['name',None]})),
 R('looks_switchcostumeto',{'COSTUME':'7'}),T('m19',R('looks_costumenumbername',{},{'NUMBER_NAME':['number',None]})),
 R('looks_nextcostume'),T('m20',R('looks_costumenumbername',{},{'NUMBER_NAME':['number',None]})),
 R('looks_switchcostumeto',{'COSTUME':'0'}),T('m21',R('looks_costumenumbername',{},{'NUMBER_NAME':['number',None]})),
 R('looks_switchcostumeto',{'COSTUME':'1.6'}),T('m22',R('looks_costumenumbername',{},{'NUMBER_NAME':['number',None]})),
 R('motion_setrotationstyle',{},{'STYLE':['left-right',None]}),R('motion_pointindirection',{'DIRECTION':'-45'}),T('m23',D()),
 GO('0','0'),R('motion_glidesecstoxy',{'SECS':'0','X':'50','Y':'60'}),T('m24',J(X(),J(',',Y()))),
 R('looks_hide'),T('m25',R('sensing_touchingobject',{'TOUCHINGOBJECTMENU':R('sensing_touchingobjectmenu',{},{'TOUCHINGOBJECTMENU':['B','B']})})),
 R('looks_show'),GO('100','0'),T('m26',R('sensing_distanceto',{'DISTANCETOMENU':R('sensing_distancetomenu',{},{'DISTANCETOMENU':['B','B']})})),
 T('m27',R('sensing_of',{'OBJECT':R('sensing_of_object_menu',{},{'OBJECT':['B','B']})},{'PROPERTY':['x position',None]})),
 T('m28',R('sensing_of',{'OBJECT':R('sensing_of_object_menu',{},{'OBJECT':['B','B']})},{'PROPERTY':['costume #',None]})),
 T('zz_done','yes')])
save('motion.sb3',[target('Stage',{},[costume(files,'b1',BG('#fff'),240,180)],stage=True),
 target('A',a.B,[costume(files,'c1',CIRC,30,30),costume(files,'c2',CIRC,30,30),costume(files,'c3',CIRC,30,30)],order=1),
 target('B',b.B,[costume(files,'d',CIRC,30,30)],order=2,x=-30,y=40)],files)
