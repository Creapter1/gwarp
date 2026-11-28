"""Lane C zoo: text and numbers used as true/false (if, not, and, or, wait until, repeat until) - Scratch toBoolean rules."""
from sbgen import *
files={};a=Sprite()
vals=['true','false','FALSE','False','0','1','','0.0','-0',' ','no','00','0e0','NaN']
IF=lambda c,y,n:R('control_if_else',{'CONDITION':c,'SUBSTACK':y,'SUBSTACK2':n})
ch=[FLAG]
for i,v in enumerate(vals):
    k='b%02d'%(i+1)
    ch+=[T('v',v),IF(VAR('v'),T(k,'T'),T(k,'F')),
         T('n%02d'%(i+1),R('operator_not',{'OPERAND':VAR('v')})),
         T('a%02d'%(i+1),R('operator_and',{'OPERAND1':VAR('v'),'OPERAND2':C('equals','1','1')})),
         T('o%02d'%(i+1),R('operator_or',{'OPERAND1':VAR('v'),'OPERAND2':C('equals','1','2')}))]
ch+=[T('c',0),T('v','false'),R('control_repeat_until',{'CONDITION':VAR('v'),'SUBSTACK':[CHG('c',1),R('control_if',{'CONDITION':C('gt',VAR('c'),'4'),'SUBSTACK':T('v','x')})]}),
     T('r01',VAR('c')),T('zz_done','yes')]
a.chain(ch,None,0)
st=target('Stage',{},[costume(files,'b',BG('#fff'),240,180)],stage=True)
sp=target('A',a.B,[costume(files,'c1',CIRC,30,30)],order=1)
save('bool.sb3',[st,sp],files)
