"""Lane C zoo: how numbers turn into text (join, list contents, length of): tiny/huge/float noise/-0/NaN/Infinity/rounding/mod/divide results."""
from sbgen import *
files={};a=Sprite()
L=lst('L')
ADD=lambda x:R('data_addtolist',{'ITEM':x},{'LIST':L})
CONT=R('data_listcontents',{},{'LIST':L})
LEN=lambda x:R('operator_length',{'STRING':x})
cases=[A('0.1','0.2'),M('divide','1','3'),M('multiply','1e21','1'),M('multiply','1e20','1'),M('divide','1','10000000'),
 M('multiply','-1','0'),M('divide','0','0'),M('divide','1','0'),M('divide','-1','0'),M('mod','-7','3'),M('mod','7','-3'),
 M('mod','5.5','2'),F('sqrt','-1'),R('operator_round',{'NUM':'-2.5'}),R('operator_round',{'NUM':'2.5'}),F('round','2.5'),M('multiply','123456789','1000000000'),
 F('10 ^','-7'),A('0x10','1'),A('1e-7','0'),M('subtract','0.3','0.1'),F('abs','-0'),F('ln','0'),F('floor','-0.5'),M('multiply','0.1','3')]
ch=[FLAG,R('data_deletealloflist',{},{'LIST':L})]
for i,e in enumerate(cases):
    k='f%02d'%(i+1); ch+= [T(k,J(e,'|')),ADD(e)]
ch+=[T('g01',CONT),T('g02',LEN(M('divide','1','3'))),T('g03',LEN(M('multiply','-1','0'))),T('zz_done','yes')]
a.chain(ch,None,0)
st=target('Stage',{},[costume(files,'b',BG('#fff'),240,180)],stage=True)
sp=target('A',a.B,[costume(files,'c1',CIRC,30,30)],order=1)
save('fmt.sb3',[st,sp],files)
