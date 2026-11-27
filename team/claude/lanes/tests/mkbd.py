"""Lane C zoo: switch backdrop by number results, wrap, rounding, names like numbers, next/previous/random words as names."""
from sbgen import *
files={};a=Sprite()
BD=lambda k:R('looks_backdropnumbername',{},{'NUMBER_NAME':[k,None]})
SBV=lambda v:R('looks_switchbackdropto',{'BACKDROP':v})
SB=lambda c:SBV(R('looks_backdrops',{},{'BACKDROP':[c,c]}))
a.chain([FLAG,SB('b1'),SBV(A('1','1')),T('d1',BD('name')),SBV(A('4','1')),T('d2',BD('name')),
 SBV(A('0','0')),T('d3',BD('name')),SBV(A('-1','0')),T('d4',BD('name')),SBV(A('1.6','0')),T('d5',BD('number')),
 SB('2'),T('d6',BD('name')),SB(' 3 '),T('d7',BD('name')),SB('nosuch'),T('d8',BD('name')),
 SB('next backdrop'),T('d9',BD('name')),SB('next backdrop'),SB('next backdrop'),SB('next backdrop'),T('d10',BD('number')),
 SB('previous backdrop'),T('d11',BD('number')),SB('b1'),SB('previous backdrop'),T('d12',BD('name')),
 SBV(A('7','0')),T('d13',BD('number')),SB(''),T('d14',BD('number')),T('zz_done','yes')],None,0)
T_=[target('Stage',{},[costume(files,n,BG(c),240,180) for n,c in (('b1','#fff'),('3','#eee'),('x','#ddd'),('2','#ccc'))],stage=True),
 target('A',a.B,[costume(files,'c1',CIRC,30,30)],order=1)]
save('bd.sb3',T_,files)
