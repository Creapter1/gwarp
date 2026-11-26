"""Lane C zoo: timer / reset timer, wait timing, answer before any ask, compare and maths quirks (results kept coarse so they are not random)."""
from sbgen import *
files={};a=Sprite()
TMR=R('sensing_timer');RST=R('sensing_resettimer');ANS=R('sensing_answer');RND=lambda x:R('operator_round',{'NUM':x})
a.chain([FLAG,RST,T('t1',C('lt',TMR,0.05)),WAIT(0.5),T('t2',C('gt',TMR,0.4)),T('t3',C('lt',TMR,0.9)),RST,T('t4',C('lt',TMR,0.05)),
 REP(10,[WAIT(0)]),T('t5',C('lt',TMR,0.6)),T('a1',ANS),T('a2',J(ANS,'x')),
 T('c1',C('equals','ABC','abc')),T('c2',C('equals',' 1','1')),T('c3',C('lt','10','9')),T('c4',C('lt','10a','9a')),
 T('c5',C('equals','1e3','1000')),T('c6',C('gt','Infinity',1e308)),T('c7',C('equals','0x10','16')),T('c8',C('equals','','0')),
 T('m1',M('mod',-7,3)),T('m2',M('mod',7,-3)),T('m3',RND(-2.5)),T('m4',RND(2.5)),T('m5',F('abs','-0')),T('m6',F('sqrt',-1)),
 T('m7',F('ln',0)),T('m8',F('floor','1e2')),T('m9',F('10 ^',-1)),T('m10',M('divide',0,0)),T('m11',A('0x1f',1)),T('m12',A(' 2 ',3)),
 T('zz_done','yes')],None,0)
save('time.sb3',[target('Stage',{},[costume(files,'b1',BG('#fff'),240,180)],stage=True),
 target('A',a.B,[costume(files,'c1',CIRC,30,30)],order=1)],files)
