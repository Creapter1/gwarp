"""Lane C zoo: sensing 'of' block (stage/sprite props, local vars, missing names), costumes named like numbers, backdrop switching."""
from sbgen import *
files={};st=Sprite();a=Sprite();b=Sprite()
OFM=lambda t:R('sensing_of_object_menu',{},{'OBJECT':[t,t]})
OF=lambda t,p:R('sensing_of',{'OBJECT':OFM(t)},{'PROPERTY':[p,None]})
CN=lambda k:R('looks_costumenumbername',{},{'NUMBER_NAME':[k,None]})
SW=lambda c:R('looks_switchcostumeto',{'COSTUME':c})
BD=lambda k:R('looks_backdropnumbername',{},{'NUMBER_NAME':[k,None]})
SB=lambda c:R('looks_switchbackdropto',{'BACKDROP':R('looks_backdrops',{},{'BACKDROP':[c,c]})})
b.chain([FLAG,R('motion_gotoxy',{'X':'-33.5','Y':'12'}),R('motion_pointindirection',{'DIRECTION':'-90'}),
 R('looks_setsizeto',{'SIZE':'150'}),SW('3'),R('data_setvariableto',{'VALUE':'bee'},{'VARIABLE':['lv','lv']})],None,0)
a.chain([FLAG,WAIT(0.3),SB('b2'),
 T('o1',OF('B','x position')),T('o2',OF('B','y position')),T('o3',OF('B','direction')),T('o4',OF('B','size')),
 T('o5',OF('B','costume #')),T('o6',OF('B','costume name')),T('o7',OF('B','lv')),T('o8',OF('B','nosuch')),
 T('o9',OF('_stage_','backdrop #')),T('o10',OF('_stage_','backdrop name')),T('o11',OF('_stage_','sv')),
 T('o12',OF('_stage_','volume')),T('o13',OF('B','volume')),T('o14',OF('Nobody','x position')),
 SW('2'),T('o15',CN('name')),SW(A('1','1')),T('o16',CN('name')),SW('x'),T('o17',CN('name')),
 SW(' 3 '),T('o18',CN('name')),SW('true'),T('o19',CN('number')),SB('next backdrop'),T('o20',BD('number')),
 SB('previous backdrop'),T('o21',BD('name')),T('zz_done','yes')],None,0)
st.chain([FLAG,R('data_setvariableto',{'VALUE':'42'},{'VARIABLE':['sv','sv']}),SB('b1')],None,0)
cs=lambda ns:[costume(files,n,CIRC,30,30) for n in ns]
T_=[target('Stage',st.B,[costume(files,n,BG(c),240,180) for n,c in (('b1','#fff'),('b2','#eee'),('b3','#ddd'))],stage=True,variables={'sv':['sv',0]}),
 target('A',a.B,cs(['c1','3','x','2']),order=1),target('B',b.B,cs(['p','q','r']),order=2,variables={'lv':['lv',0]})]
save('of.sb3',T_,files)
