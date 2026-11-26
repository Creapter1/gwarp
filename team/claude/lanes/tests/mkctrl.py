"""Lane C zoo: control + list edge cases (repeat counts, wait until, stop, frame yields, list index words)."""
from sbgen import *
files={};a=Sprite();b=Sprite()
L=lambda:lst('L')
ADD=lambda v:R('data_addtolist',{'ITEM':v},{'LIST':L()})
ITEM=lambda i:R('data_itemoflist',{'INDEX':i},{'LIST':L()})
LEN=lambda:R('data_lengthoflist',{},{'LIST':L()})
UNTIL=lambda c,body:R('control_repeat_until',{'CONDITION':c,'SUBSTACK':body})
a.chain([FLAG,R('data_deletealloflist',{},{'LIST':L()}),SET('n',0),
 REP('2.5',[CHG('n',1)]),T('c1',VAR('n')),SET('n',0),REP('2.4',[CHG('n',1)]),T('c2',VAR('n')),
 SET('n',0),REP('abc',[CHG('n',1)]),T('c3',VAR('n')),SET('n',0),REP('-3',[CHG('n',1)]),T('c4',VAR('n')),
 SET('n',0),UNTIL(C('gt',VAR('n'),'4.5'),[CHG('n',1)]),T('c5',VAR('n')),
 SET('f',0),SET('n',0),REP('5',[CHG('n',1)]),T('c6',VAR('f')),
 R('control_wait_until',{'CONDITION':C('equals','1','1')}),T('c7','ok'),
 R('control_if_else',{'CONDITION':C('equals','ABC','abc'),'SUBSTACK':[T('c8','same')],'SUBSTACK2':[T('c8','diff')]}),
 R('control_if',{'CONDITION':C('lt','10','9'),'SUBSTACK':[T('c9','num-wrong')]}),
 ADD('x'),ADD('y'),ADD('z'),T('l1',ITEM('last')),T('l2',ITEM('0')),T('l3',ITEM('4')),T('l4',ITEM('1.7')),
 R('data_insertatlist',{'ITEM':'q','INDEX':'last'},{'LIST':L()}),T('l5',R('data_listcontents',{},{'LIST':L()})),
 R('data_replaceitemoflist',{'INDEX':'9','ITEM':'w'},{'LIST':L()}),T('l6',LEN()),
 R('data_deleteoflist',{'INDEX':'last'},{'LIST':L()}),T('l7',R('data_listcontents',{},{'LIST':L()})),
 T('l8',R('data_itemnumoflist',{'ITEM':'Y'},{'LIST':L()})),T('l9',R('data_listcontainsitem',{'ITEM':'Z'},{'LIST':L()})),
 R('data_deleteoflist',{'INDEX':'all'},{'LIST':L()}),T('l10',LEN()),
 R('data_insertatlist',{'ITEM':'a','INDEX':'5'},{'LIST':L()}),T('l11',LEN()),
 ADD('1'),ADD('2'),T('l12',R('data_listcontents',{},{'LIST':L()})),
 T('zz_done','yes'),R('control_stop',{},{'STOP_OPTION':['this script',None]},{'tagName':'mutation','children':[],'hasnext':'false'}),T('c10','after-stop')],None,0)
b.chain([FLAG,REP('3',[CHG('f',1)])],None,0)
save('ctrl.sb3',[target('Stage',{},[costume(files,'b1',BG('#fff'),240,180)],stage=True),
 target('A',a.B,[costume(files,'c1',CIRC,30,30)],order=1),target('B',b.B,[costume(files,'d',CIRC,30,30)],order=2)],files)
