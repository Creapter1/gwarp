"""Lane C zoo: Scratch maths/text quirks (number format, mod, round, divide by 0, case, letters, lists)."""
from sbgen import *
files={};a=Sprite()
L=lambda op,inp:R(op,inp)
LADD=lambda l,v:R('data_addtolist',{'ITEM':v},{'LIST':lst(l)})
LI=lambda l,i:R('data_itemoflist',{'INDEX':i},{'LIST':lst(l)})
a.chain([FLAG,R('data_deletealloflist',{},{'LIST':lst('Q')}),
 T('q1',M('add','0.1','0.2')),T('q2',M('mod','-7','3')),T('q3',M('mod','7','-3')),T('q4',M('divide','1','0')),T('q5',M('divide','-1','0')),
 T('q6',M('divide','0','0')),T('q7',L('operator_round',{'NUM':'2.5'})),T('q8',L('operator_round',{'NUM':'-2.5'})),
 T('q9',C('equals','ABC','abc')),T('q10',C('lt','10','9')),T('q11',C('lt','a','B')),T('q12',C('equals','1.0','1')),T('q13',C('equals',' 1','1')),
 T('q14',J('1e3','')),T('q15',M('add','1e3','0')),T('q16',M('multiply','0x10','1')),T('q17',L('operator_letter_of',{'LETTER':'0','STRING':'hey'})),
 T('q18',L('operator_letter_of',{'LETTER':'2.7','STRING':'hey'})),T('q19',L('operator_contains',{'STRING1':'Hello','STRING2':'LL'})),
 T('q20',F('sqrt','-1')),T('q21',F('ln','0')),T('q22',F('tan','90')),T('q23',F('floor','-0.5')),T('q24',F('abs','-0')),T('q25',M('add','','')),
 T('q26',M('add','Infinity','1')),T('q27',M('multiply','1e308','10')),T('q28',L('operator_length',{'STRING':'12.50'})),
 LADD('Q','1'),LADD('Q','2'),LADD('Q','3'),T('q29',LI('Q','last')),T('q30',LI('Q','0')),T('q31',LI('Q','4')),T('q32',R('data_listcontents',{},{'LIST':lst('Q')})),
 T('q33',R('data_itemnumoflist',{'ITEM':'2'},{'LIST':lst('Q')})),T('q34',R('data_listcontainsitem',{'ITEM':'02'},{'LIST':lst('Q')})),
 R('data_insertatlist',{'ITEM':'x','INDEX':'1.9'},{'LIST':lst('Q')}),T('q35',R('data_listcontents',{},{'LIST':lst('Q')})),
 R('motion_setx',{'X':'1000'}),T('q36',R('motion_xposition')),R('looks_setsizeto',{'SIZE':'1'}),T('q37',R('looks_size')),
 R('motion_pointindirection',{'DIRECTION':'-190'}),T('q38',R('motion_direction')),T('q39',M('subtract','5','')),T('q40','end')])
save('quirk.sb3',[target('Stage',{},[costume(files,'b1',BG('#fff'),240,180)],stage=True),target('A',a.B,[costume(files,'a',CIRC,30,30)],order=1)],files)
