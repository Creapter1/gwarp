"""Lane C zoo: switch costume / backdrop to odd values (names, numbers as text, a costume named '2', 0, -1, 1.5, '', next/previous, Infinity, NaN) read back by number and name."""
from sbgen import *
files={};a=Sprite()
SW=lambda x:R('looks_switchcostumeto',{'COSTUME':x})
NUM=R('looks_costumenumbername',{},{'NUMBER_NAME':['number',None]})
NAM=R('looks_costumenumbername',{},{'NUMBER_NAME':['name',None]})
BD=lambda x:R('looks_switchbackdropto',{'BACKDROP':x})
BN=R('looks_backdropnumbername',{},{'NUMBER_NAME':['number',None]})
NX=R('looks_nextcostume')
ch=[FLAG]
vals=['b','2','3',' 1 ','0','-1','1.5','2.5','','next costume','previous costume','Infinity','NaN','B','4','true','x']
for i,v in enumerate(vals):
  ch+=[SW('a'),SW(v),T('c%02d'%i,J(NUM,J('|',NAM)))]
ch+=[SW('c'),NX,T('c90',NUM),NX,T('c91',NUM),A_:=None] if False else [SW('c'),NX,T('c90',NUM),NX,T('c91',NUM)]
for i,v in enumerate(['two','2','0','next backdrop','previous backdrop','random backdrop','9']):
  ch+=[BD('one'),BD(v),T('b%02d'%i,BN if v!='random backdrop' else C('gt',BN,0))]
ch+=[T('zz_done','yes')]
a.chain(ch,None,0)
st=target('Stage',{},[costume(files,n,BG(c),240,180) for n,c in [('one','#fff'),('two','#eee'),('three','#ddd')]],stage=True)
sp=target('A',a.B,[costume(files,n,CIRC,30,30) for n in ['a','b','2','c']],order=1)
save('cost.sb3',[st,sp],files)
