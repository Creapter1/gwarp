# "stop this script" inside My Blocks (Scratch: it only ends that My Block; the caller goes on)
from sbgen import *
files={};a=Sprite()
def mut(code,warp):return {"tagName":"mutation","children":[],"proccode":code,"argumentids":"[]","warp":"true" if warp else "false"}
CALL=lambda code,warp=True:R('procedures_call',{},{},mut(code,warp))
def define(sp,code,body,y,warp=True):
    d=sp.nid();p=sp.nid();B=sp.B
    B[p]={"opcode":"procedures_prototype","next":None,"parent":d,"inputs":{},"fields":{},"shadow":True,"topLevel":False,"mutation":dict(mut(code,warp),argumentnames="[]",argumentdefaults="[]")}
    B[d]={"opcode":"procedures_definition","next":None,"parent":None,"inputs":{"custom_block":[1,p]},"fields":{},"shadow":False,"topLevel":True,"x":700,"y":y}
    B[d]['next']=sp.chain(body,d)
STOP=lambda what='this script':R('control_stop',{},{'STOP_OPTION':[what,None]},{"tagName":"mutation","children":[],"hasnext":"false"})
IF=lambda c,body:R('control_if',{'CONDITION':c,'SUBSTACK':body})
define(a,'plain',[SET('a',1),STOP(),SET('a',2)],0,False)
define(a,'warped',[SET('b',1),REP(10,[CHG('b',1),IF(C('gt',VAR('b'),4),[STOP()])]),SET('b',99)],200,True)
define(a,'inner',[CHG('n',1),IF(C('gt',VAR('n'),0),[STOP()]),CHG('n',100)],400,True)
define(a,'outer',[CALL('inner'),CHG('n',10),CALL('inner'),CHG('n',10)],600,True)
define(a,'inloop',[REP(5,[CHG('k',1),IF(C('equals',VAR('k'),3),[STOP()])]),SET('k',-1)],800,False)
a.chain([FLAG,SET('n',0),SET('k',0),CALL('plain',False),SET('after1',5),CALL('warped'),SET('after2',VAR('b')),CALL('outer'),SET('after3',VAR('n')),CALL('inloop',False),SET('after4',VAR('k')),SET('done',1)])
a.chain([FLAG,SET('top',1),STOP(),SET('top',2)])
a.chain([FLAG,SET('lp',0),REP(5,[CHG('lp',1),IF(C('equals',VAR('lp'),2),[STOP()])]),SET('lp',-1)])
save('stop.sb3',[target('Stage',{},[costume(files,'b1',BG('#ffffff'),240,180)],stage=True),target('A',a.B,[costume(files,'a',CIRC,30,30)],order=1)],files)
