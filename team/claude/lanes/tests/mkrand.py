"""Lane C zoo: pick random edge cases - whole vs decimal results ("1.0", 1.5, " 2 ", ""), reversed range, same ends, text ends, Infinity, big numbers.
Each case runs 40 times; the result is only yes/no facts (all whole? all inside the range? min/max seen) so it is the same every run."""
from sbgen import *
files={};L=[]
RND=lambda a,b:R('operator_random',{'FROM':a,'TO':b})
EQ=lambda a,b:C('equals',a,b)
IFB=lambda c,body:R('control_if',{'CONDITION':c,'SUBSTACK':body})
cases=[(1,10),(10,1),(5,5),('1.0',3),(1,'3.0'),(1.5,3),(0,1),('',3),(' 2 ',4),('a','b'),('a',3),(-3,-1),('-1.0',1),(0.1,0.1),('0x2',5),('1e1',12),(2,'Infinity'),(0,1e9)]
for i,(a,b) in enumerate(cases):
    n='r%02d'%i
    nb=lambda v:{'':0,' 2 ':2,'a':0,'b':0,'0x2':2,'1e1':10,'Infinity':1e300}.get(v,v) if isinstance(v,str) and v not in('1.0','3.0','-1.0') else float(v)
    lo,hi=sorted([nb(a),nb(b)]);lo,hi=str(lo),str(hi)
    L+= [SET(n+'w','yes'),SET(n+'in','yes'),SET('x',RND(a,b)),
         REP(40,[SET('x',RND(a,b)),
            IFB(C('not',None,None) if False else R('operator_not',{'OPERAND':EQ(R('operator_round',{'NUM':VAR('x')}),VAR('x'))}),[SET(n+'w','no')]),
            IFB(R('operator_or',{'OPERAND1':C('lt',VAR('x'),lo),'OPERAND2':C('gt',VAR('x'),hi)}),[SET(n+'in','no')])])]
st=Sprite()
st.chain([FLAG,WAIT(0.1)]+L+[SET('zz_done','yes')],None,0)
save('rand.sb3',[target('Stage',st.B,[costume(files,'b1',BG('#fff'),240,180)],stage=True)],files)
