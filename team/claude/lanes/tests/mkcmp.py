"""Lane C zoo: comparison quirks. = < > with case, spaces, numeric strings, empty, Infinity, NaN, booleans in joins."""
from sbgen import *
files={};a=Sprite()
EQ=lambda x,y:R('operator_equals',{'OPERAND1':x,'OPERAND2':y})
LT=lambda x,y:R('operator_lt',{'OPERAND1':x,'OPERAND2':y})
GT=lambda x,y:R('operator_gt',{'OPERAND1':x,'OPERAND2':y})
cases=[EQ('abc','ABC'),EQ('1','1.0'),EQ(' 1','1'),EQ('','0'),EQ('0x10','16'),EQ('1e3','1000'),
 LT('10','9'),LT('a','B'),GT('abc','abd'),LT('','1'),GT('Infinity','1e308'),EQ('NaN','nan'),
 LT('-0','0'),EQ('-0','0'),GT('true','false'),EQ(' ',''),LT('1a','2'),EQ('00','0'),GT('9','10a')]
ch=[FLAG]+[T('c%02d'%i,J(e,'')) for i,e in enumerate(cases)]+[T('zz_done','yes')]
a.chain(ch,None,0)
st=target('Stage',{},[costume(files,'b',BG('#fff'),240,180)],stage=True)
sp=target('A',a.B,[costume(files,'c1',CIRC,30,30)],order=1)
save('cmp.sb3',[st,sp],files)
