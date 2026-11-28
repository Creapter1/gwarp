"""Lane C zoo: set / change variable edge cases - change by text, "", spaces, hex, 1e3, Infinity, NaN; change a text variable; set then read as number/text; list items changed through variables."""
from sbgen import *
files={}
L=[]
def t(i,init,by):
    L.extend([SET('v%02d'%i,init),CHG('v%02d'%i,by)])
cases=[(0,'abc'),(0,''),(0,' 5 '),(0,'0x10'),(0,'1e3'),(0,'Infinity'),(0,'-Infinity'),(0,'NaN'),(0,'true'),
 ('abc',1),('',1),(' 7',1),('1.50',0),('007',0),('Infinity',-1),('1e400',0),('-0',0),('0.1',0.2),('5',J('1','2')),('x',J('',''))]
for i,(a,b) in enumerate(cases):t(i,a,b)
st=Sprite()
st.chain([FLAG,WAIT(0.1)]+L+[T('o_j',J(VAR('v12'),VAR('v13'))),T('o_eq',C('equals',VAR('v16'),'0')),
 T('o_lt',C('lt',VAR('v14'),VAR('v15'))),T('zz_done','yes')],None,0)
save('chg.sb3',[target('Stage',st.B,[costume(files,'b1',BG('#fff'),240,180)],stage=True)],files)
