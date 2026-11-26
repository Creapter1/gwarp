"""Lane C zoo (huge, odd shape): one 3,000-block straight script, 150-deep nested ifs, 40-deep nested repeats of 1,
a 1,000-item list built in warp. Checks the final values."""
import sys;sys.setrecursionlimit(20000)
from sbgen import *
files={};a=Sprite()
IF=lambda c,b:R('control_if',{'CONDITION':c,'SUBSTACK':b})
long=[CHG('n',1) if i%3 else CHG('m',2) for i in range(3000)]
nest=[CHG('d',1)]
for i in range(150):nest=[IF(C('gt',VAR('n'),i),nest+[CHG('e',1)])]
rep=[CHG('r',1)]
for i in range(40):rep=[REP(1,rep)]
a.chain([FLAG,SET('n',0),SET('m',0),SET('d',0),SET('e',0),SET('r',0)]+long+[T('k1',VAR('n')),T('k2',VAR('m'))]+nest+[T('k3',VAR('d')),T('k4',VAR('e'))]
 +rep+[T('k5',VAR('r')),R('data_deletealloflist',{},{'LIST':lst('L')}),
 REP(1000,[R('data_addtolist',{'ITEM':J('i',R('data_lengthoflist',{},{'LIST':lst('L')}))},{'LIST':lst('L')})]),
 T('k6',R('data_itemoflist',{'INDEX':'last'},{'LIST':lst('L')})),T('k7',R('data_itemnumoflist',{'ITEM':'i500'},{'LIST':lst('L')})),T('zz_done','yes')],None,0)
save('deep.sb3',[target('Stage',{},[costume(files,'b1',BG('#fff'),240,180)],stage=True),target('A',a.B,[costume(files,'c1',CIRC,30,30)],order=1)],files)
print(len(a.B),'blocks')
