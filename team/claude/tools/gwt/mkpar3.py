from sbgen import *
files={};a=Sprite();b=Sprite();st=Sprite()
TIMER=R('sensing_timer');RESET=R('sensing_resettimer')
GO=lambda x,y:R('motion_gotoxy',{'X':x,'Y':y});DIR=lambda d:R('motion_pointindirection',{'DIRECTION':d})
X=R('motion_xposition');Y=R('motion_yposition');D=R('motion_direction')
TOUCH=lambda w:R('sensing_touchingobject',{'TOUCHINGOBJECTMENU':R('sensing_touchingobjectmenu',{},{'TOUCHINGOBJECTMENU':w})})
OF=lambda p,o:R('sensing_of',{'OBJECT':R('sensing_of_object_menu',{},{'OBJECT':o})},{'PROPERTY':p})
BC=lambda m:R('event_broadcast_menu',{},{'BROADCAST_OPTION':[m,m]})
LADD=lambda l,v:R('data_addtolist',{'ITEM':v},{'LIST':lst(l)});LC=lambda l:R('data_listcontents',{},{'LIST':lst(l)})
LI=lambda l,i:R('data_itemoflist',{'INDEX':i},{'LIST':lst(l)});LLEN=lambda l:R('data_lengthoflist',{},{'LIST':lst(l)})
main=[FLAG,
 RESET,SET('a',0),REP(100,[CHG('a',1)]),T('q01',C('lt',TIMER,'0.5')),
 RESET,REP(10,[R('motion_movesteps',{'STEPS':0})]),T('q02',C('gt',TIMER,'0.2')),T('q02b',C('lt',TIMER,'0.6')),
 SET('a',0),REP(0,[CHG('a',1)]),REP(-3,[CHG('a',1)]),REP('2.5',[CHG('a',1)]),T('q03',VAR('a')),
 RESET,WAIT(0),T('q04',C('lt',TIMER,'0.2')),
 GO(0,0),DIR(90),R('motion_glidesecstoxy',{'SECS':'0.2','X':100,'Y':50}),T('m01',X),T('m02',Y),
 GO(230,0),R('motion_movesteps',{'STEPS':30}),T('m03',X),R('motion_ifonedgebounce'),T('m04',D),T('m05',X),
 GO(0,0),R('motion_pointtowards',{'TOWARDS':R('motion_pointtowards_menu',{},{'TOWARDS':'B'})}),T('m06',D),R('motion_goto',{'TO':R('motion_goto_menu',{},{'TO':'B'})}),T('m07',X),T('m08',Y),
 GO(0,0),R('motion_setrotationstyle',{},{'STYLE':'left-right'}),DIR(-90),T('m09',D),R('motion_setrotationstyle',{},{'STYLE':'all around'}),
 DIR(0),R('motion_turnleft',{'DEGREES':370}),T('m10',D),DIR(90),R('motion_movesteps',{'STEPS':-10}),T('m11',X),
 R('motion_setx',{'X':'100.6'}),T('m12',X),R('motion_changeyby',{'DY':'-3.25'}),T('m13',Y),DIR('abc'),T('m14',D),
 GO(0,0),DIR(45),R('motion_ifonedgebounce'),T('m15',D),GO(0,170),DIR(0),R('motion_movesteps',{'STEPS':30}),R('motion_ifonedgebounce'),T('m16',D),T('m17',Y),
 GO(-240,-180),DIR(-135),R('motion_movesteps',{'STEPS':50}),T('m18',X),T('m19',Y),R('motion_ifonedgebounce'),T('m20',D),T('m21',X),T('m22',Y),
 GO(0,0),DIR(90),R('motion_changexby',{'DX':'1e3'}),T('m23',X),GO(0,0),DIR(100),R('motion_movesteps',{'STEPS':10}),T('m24',X),T('m25',Y),DIR(90),GO(0,0),
 R('looks_setsizeto',{'SIZE':100}),R('looks_changesizeby',{'CHANGE':50}),T('k01',R('looks_size')),R('looks_setsizeto',{'SIZE':'30.5'}),T('k02',R('looks_size')),R('looks_setsizeto',{'SIZE':100}),
 R('looks_switchbackdropto',{'BACKDROP':R('looks_backdrops',{},{'BACKDROP':'b2'})}),T('k03',R('looks_backdropnumbername',{},{'NUMBER_NAME':'number'})),R('looks_nextbackdrop'),T('k04',R('looks_backdropnumbername',{},{'NUMBER_NAME':'name'})),
 R('looks_switchcostumeto',{'COSTUME':R('looks_costume',{},{'COSTUME':'b'})}),T('k05',R('looks_costumenumbername',{},{'NUMBER_NAME':'name'})),R('looks_switchcostumeto',{'COSTUME':R('looks_costume',{},{'COSTUME':'a'})}),
 GO(100,100),T('s01',TOUCH('B')),R('looks_hide'),T('s02',TOUCH('B')),R('looks_show'),GO(0,0),T('s03',TOUCH('B')),GO(150,100),T('s03b',TOUCH('B')),GO(161,100),T('s03c',TOUCH('B')),GO(0,0),
 T('s04',R('sensing_distanceto',{'DISTANCETOMENU':R('sensing_distancetomenu',{},{'DISTANCETOMENU':'B'})})),
 T('s05',OF('x position','B')),T('s06',OF('direction','B')),T('s07',OF('costume #','B')),T('s08',OF('costume name','B')),T('s09',OF('size','B')),T('s10',OF('volume','B')),T('s11',OF('loc','B')),T('s12',OF('backdrop name','_stage_')),T('s12b',OF('y position','B')),
 GO(240,0),T('s13',TOUCH('_edge_')),GO(0,0),T('s14',TOUCH('_edge_')),GO(209,0),T('s14b',TOUCH('_edge_')),GO(211,0),T('s14c',TOUCH('_edge_')),GO(0,0),
 T('s15',R('sensing_touchingcolor',{'COLOR':'#ffffff'})),T('s16',R('sensing_touchingcolor',{'COLOR':'#ff0000'})),GO(100,100),T('s16b',R('sensing_touchingcolor',{'COLOR':'#8b5cf6'})),GO(0,0),
 T('s17',R('sensing_keypressed',{'KEY_OPTION':R('sensing_keyoptions',{},{'KEY_OPTION':'space'})})),T('s18',R('sensing_mousedown')),T('s19',C('gt',R('sensing_dayssince2000'),9000)),
 R('event_broadcastandwait',{'BROADCAST_INPUT':BC('m1')}),T('b01',VAR('who')),T('b02',LC('ORD')),
 R('motion_setx',{'X':33}),SET('cl',0),REP(310,[R('control_create_clone_of',{'CLONE_OPTION':R('control_create_clone_of_menu',{},{'CLONE_OPTION':'_myself_'})})]),WAIT('2.5'),T('c01',VAR('cl')),T('c02',VAR('clx')),
 R('event_broadcast',{'BROADCAST_INPUT':BC('kill')}),WAIT('0.3'),R('motion_setx',{'X':0}),
 R('data_deletealloflist',{},{'LIST':lst('L2')}),LADD('L2','a'),LADD('L2','b'),LADD('L2','c'),R('data_insertatlist',{'ITEM':'z','INDEX':0},{'LIST':lst('L2')}),T('l01',LC('L2')),
 R('data_insertatlist',{'ITEM':'y','INDEX':4},{'LIST':lst('L2')}),T('l02',LC('L2')),R('data_insertatlist',{'ITEM':'x','INDEX':6},{'LIST':lst('L2')}),T('l03',LLEN('L2')),
 R('data_deleteoflist',{'INDEX':'last'},{'LIST':lst('L2')}),R('data_replaceitemoflist',{'INDEX':0,'ITEM':'q'},{'LIST':lst('L2')}),T('l04',LC('L2')),T('l05',LI('L2','1.7')),T('l06',LI('L2','abc')),
 LADD('L2',A(1,2)),T('l07',R('data_itemnumoflist',{'ITEM':'3'},{'LIST':lst('L2')})),T('l08',R('data_itemnumoflist',{'ITEM':'nope'},{'LIST':lst('L2')})),T('l09',R('data_listcontainsitem',{'ITEM':'B'},{'LIST':lst('L2')})),
 R('data_deletealloflist',{},{'LIST':lst('L2')}),T('l10',LI('L2','last')),R('data_deleteoflist',{'INDEX':1},{'LIST':lst('L2')}),T('l11',LLEN('L2')),LADD('L2',''),T('l12',LLEN('L2')),T('l13',R('data_listcontainsitem',{'ITEM':''},{'LIST':lst('L2')})),
 LADD('L2','hello world'),T('l14',LC('L2')),R('data_deleteoflist',{'INDEX':'all'},{'LIST':lst('L2')}),T('l15',LLEN('L2')),LADD('L2','1'),LADD('L2','2'),R('data_deleteoflist',{'INDEX':'1.9'},{'LIST':lst('L2')}),T('l16',LC('L2')),
 R('data_replaceitemoflist',{'INDEX':'last','ITEM':M('divide',1,3)},{'LIST':lst('L2')}),T('l17',LI('L2',1)),T('l18',LC('L2')),
 T('o01',R('operator_letter_of',{'LETTER':'2.9','STRING':'hello'})),T('o02',R('operator_length',{'STRING':'0.50'})),T('o03',R('operator_length',{'STRING':M('divide',1,4)})),
 T('o04',C('equals','010',10)),T('o05',C('equals','1e2',100)),T('o06',C('equals','abc','ABC ')),T('o07',C('lt','','a')),T('o08',C('equals','true',1)),T('o09',M('mod',5,0)),T('o10',M('mod',-5,0)),T('o11',J('',M('mod',-4,2))),
 T('o12',R('operator_round',{'NUM':'1.4999'})),T('o13',F('floor','-1.5')),T('o14',F('ceiling','-1.5')),T('o15',F('abs','-3')),T('o16',F('e ^',1)),T('o17',F('10 ^',-1)),T('o18',F('log',1000)),T('o19',F('asin',2)),T('o20',F('acos',0)),
 T('o21',F('atan',1)),T('o22',F('sin',30)),T('o23',F('cos',60)),T('o24',F('tan',45)),T('o25',F('sqrt',16)),T('o26',F('ln',0)),T('o27',F('tan',270)),T('o28',F('sin','1e10')),T('o29',F('log',-1)),T('o30',F('10 ^',20)),
 T('o31',M('divide',1,3)),T('o32',M('multiply','1e21',1)),T('o33',A('0.1','0.7')),T('o34',J('',M('divide',1,'-0'))),T('o35',J(C('lt',1,2),'')),T('o36',A(3,C('lt',1,2))),T('o37',M('multiply','5','5')),
 T('o38',C('lt','a','B')),T('o39',C('lt','Z','a')),SET('o40','007'),T('o41',J(VAR('o40'),'')),CHG('o40',1),T('o42',VAR('o40')),T('o43',R('operator_random',{'FROM':3,'TO':3})),T('o44',J('a b','  c ')),
 T('o45',R('operator_contains',{'STRING1':'','STRING2':''})),T('o46',R('operator_and',{'OPERAND1':C('lt',1,2),'OPERAND2':C('gt',1,2)})),T('o47',R('operator_or',{'OPERAND1':C('lt',1,2)})),T('o48',R('operator_not',{})),
 T('o49',C('gt','10','9.5')),T('o50',C('equals',' ',0)),T('o51',A('1,000',1)),T('o52',A('.5','5.')),T('o53',M('subtract','--5',1)),T('o54',A('0b11','0o17')),T('o55',R('operator_round',{'NUM':'1e20'})),T('o56',M('multiply',-1,0)),
 T('o57',C('equals','NaN',M('divide',0,0))),T('o58',C('gt',M('divide',0,0),0)),T('o59',C('equals','Infinity',M('divide',1,0))),T('o60',R('operator_length',{'STRING':C('lt',1,2)})),
 T('zz_done','yes'),R('control_stop',{},{'STOP_OPTION':'this script'},{"tagName":"mutation","children":[],"hasnext":"false"})]
a.chain(main,None,0)
a.chain([FLAG,LADD('ORD','A2')],None,2000);a.chain([FLAG,LADD('ORD','A3')],None,2100)
a.chain([R('event_whenbroadcastreceived',{},{'BROADCAST_OPTION':['m1','m1']}),SET('who','A')],None,2200)
a.chain([R('control_start_as_clone'),CHG('cl',1),SET('clx',X)],None,2300)
a.chain([R('event_whenbroadcastreceived',{},{'BROADCAST_OPTION':['kill','kill']}),R('control_delete_this_clone')],None,2400)
b.chain([FLAG,LADD('ORD','B1')],None,0);b.chain([R('event_whenbroadcastreceived',{},{'BROADCAST_OPTION':['m1','m1']}),SET('who','B')],None,100)
st.chain([FLAG,LADD('ORD','S1')],None,0)
cs=lambda:[costume(files,n,CIRC,30,30) for n in 'abc']
T0=target('Stage',st.B,[costume(files,'b1',BG('#ffffff'),240,180),costume(files,'b2',BG('#ddeeff'),240,180)],stage=True)
TA=target('A',a.B,cs(),order=2);TB=target('B',b.B,cs(),order=1,x=100,y=100,direction=30,volume=80,currentCostume=1);TB['variables']={'loc':['loc',7]}
save('par3.sb3',[T0,TB,TA],files,broadcasts=['m1','kill']);print(len(V),'vars')
