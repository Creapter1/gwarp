from sbgen import *
files={};a=Sprite()
LEN=lambda v:R('operator_length',{'STRING':v})
a.chain([FLAG,SET('f',J('0','5')),SET('f2',LEN(VAR('f'))),SET('g',J('1','.0')),SET('g2',LEN(VAR('g'))),SET('h',R('operator_letter_of',{'LETTER':1,'STRING':'007'})),SET('h2',J(VAR('h'),'x')),
 SET('k',J(' ','4')),SET('k2',LEN(VAR('k'))),SET('m',J('1e','3')),SET('m2',J(VAR('m'),'!')),R('data_addtolist',{'ITEM':J('0','7')},{'LIST':lst('L')}),SET('n2',LEN(R('data_itemoflist',{'INDEX':1},{'LIST':lst('L')}))),
 SET('p',M('add',J('0','5'),0)),SET('p2',LEN(VAR('p')))])
save('join.sb3',[target('Stage',{},[costume(files,'b1',BG('#ffffff'),240,180)],stage=True),target('A',a.B,[costume(files,'a',CIRC,30,30)],order=1)],files)
