from sbgen import *
files={};a=Sprite()
LADD=lambda l,v:R('data_addtolist',{'ITEM':v},{'LIST':lst(l)});LI=lambda l,i:R('data_itemoflist',{'INDEX':i},{'LIST':lst(l)})
SAY=lambda t:R('looks_say',{'MESSAGE':t})
a.chain([FLAG,SET('a',3),SET('n','5'),LADD('L2','a'),T('x1',LI('L2',1)),SET('x2','a'),T('x3',J('a','n')),T('x4',A('n',1)),T('x5',C('equals','a',3)),T('x6',R('operator_length',{'STRING':'a'})),
 R('motion_setx',{'X':'n'}),T('x7',R('motion_xposition')),R('motion_movesteps',{'STEPS':'a'}),T('x8',R('motion_xposition')),LADD('L2','n'),T('x9',LI('L2',2)),R('control_repeat',{'TIMES':'a','SUBSTACK':[CHG('x10',1)]}),
 R('control_if',{'CONDITION':C('equals','n','5'),'SUBSTACK':[SET('x11','bad')]}),CHG('x12','n'),R('looks_setsizeto',{'SIZE':'a'}),T('x13',R('looks_size')),R('control_wait',{'DURATION':'a'}),T('x14','done')])
save('mini.sb3',[target('Stage',{},[costume(files,'b1',BG('#fff'),240,180)],stage=True),target('A',a.B,[costume(files,'a',CIRC,30,30)],order=1)],files)
