"""Lane C zoo: every 'of' maths function and the number operators on edge values (trig at 90/180, inverse trig out of range, ln/log of 0 and negatives, e^/10^, mod with negatives, round halves, divide by zero, text as numbers)."""
from sbgen import *
files={};a=Sprite()
D=lambda x,y:M('divide',x,y);MOD=lambda x,y:M('mod',x,y);RND=lambda x:R('operator_round',{'NUM':x})
fs=[('sin',30),('sin',180),('cos',90),('cos',60),('tan',90),('tan',-90),('tan',45),('asin',2),('asin',0.5),('acos',-1),('acos',1.5),
 ('atan',1),('atan','Infinity'),('ln',0),('ln',-1),('log',100),('log',0),('e ^',1),('e ^',-800),('10 ^',3),('10 ^',400),
 ('ceiling',-0.5),('floor','abc'),('abs','-0'),('sqrt',-4),('sqrt',''),('sin',' 90 '),('cos','1e3')]
s=[FLAG,WAIT(0.2)]+[T('f%d'%i,F(f,x)) for i,(f,x) in enumerate(fs)]
s+=[T('m1',MOD(-7,3)),T('m2',MOD(7,-3)),T('m3',MOD(5.5,2)),T('m4',MOD(5,0)),T('m5',MOD('x',3)),
 T('r1',RND(2.5)),T('r2',RND(-2.5)),T('r3',RND(-0.4)),T('r4',RND('1e2')),
 T('d1',D(1,0)),T('d2',D(-1,0)),T('d3',D(0,0)),T('d4',D(1,3)),T('d5',M('multiply','0x10',2)),T('d6',M('subtract','  4','1 ')),
 T('d7',A('Infinity',1)),T('d8',A('-Infinity','Infinity')),T('d9',M('multiply',0.1,3)),T('d10',A('0b11','0o7')),
 T('zz_done','yes')]
a.chain(s,None,0)
save('math.sb3',[target('Stage',{},[costume(files,'bg1',BG('#fff'),240,180)],stage=True),target('A',a.B,[costume(files,'c1',CIRC,30,30)],order=1)],files)
