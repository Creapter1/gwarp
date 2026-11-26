import json,zipfile,hashlib
z=zipfile.ZipFile('move.sb3');pj=json.loads(z.read('project.json'));files={n:z.read(n) for n in z.namelist() if n!='project.json'}
B={};n=[0]
def nid():
    n[0]+=1;return f"b{n[0]}"
def R(op,inp=None,fld=None):return ('r',op,inp or {},fld or {})
def emit(e,parent):
    i=nid();_,op,inp,fld=e;ins={}
    for k,v in inp.items():
        if isinstance(v,tuple):
            c=emit(v,i);ins[k]=[2,c] if k in('CONDITION','OPERAND','OPERAND1b','OPERAND2b') or k.startswith('B_') else [3,c,[10,""]]
        else: ins[k]=[1,[10,str(v)]]
    B[i]={"opcode":op,"next":None,"parent":parent,"inputs":{k.replace('B_',''):v for k,v in ins.items()},"fields":{k:[v,None] if not isinstance(v,list) else v for k,v in fld.items()},"shadow":False,"topLevel":False}
    return i
V={};L={"L":["Lid",[]]}
def var(name):
    V.setdefault(name,[name,0]);return [name,name]
stmts=[]
def S(op,inp=None,fld=None):stmts.append(('r',op,inp or {},fld or {}))
exp={}
def T(name,e,want):
    S('data_setvariableto',{'VALUE':e},{'VARIABLE':var(name)});exp[name]=want
A=lambda a,b:R('operator_add',{'NUM1':a,'NUM2':b});M=lambda o,a,b:R('operator_'+o,{'NUM1':a,'NUM2':b})
J=lambda a,b:R('operator_join',{'STRING1':a,'STRING2':b})
C=lambda o,a,b:R('operator_'+o,{'OPERAND1':a,'OPERAND2':b})
F=lambda f,x:R('operator_mathop',{'NUM':x},{'OPERATOR':f})
LST=["L","Lid"]
T('t01',J('a',A(1,'abc')),'a1')
T('t02',C('lt','10','9'),'false');T('t03',C('lt','apple','Banana'),'true')
T('t04',R('operator_round',{'NUM':'2.5'}),'3');T('t05',R('operator_round',{'NUM':'-2.5'}),'-2')
T('t06',M('mod',7,-3),'-2');T('t07',M('mod',-7,3),'2')
T('t08',M('divide',1,0),'Infinity');T('t09',M('divide',0,0),'NaN');T('t10',A(M('divide',0,0),1),'1')
T('t11',C('equals','',0),'false');T('t12',C('equals',' 5 ',5),'true');T('t13',A('0x10',0),'16')
T('t14',F('sqrt',-1),'NaN');T('t15',F('floor','abc'),'0');T('t16',F('sin',180),'0');T('t17',F('cos',90),'0');T('t18',F('tan',90),'Infinity')
T('t19',J(A('0.1','0.2'),''),'0.30000000000000004');T('t20',M('multiply',3,'1e3'),'3000')
T('t21',R('operator_letter_of',{'LETTER':1,'STRING':123}),'1');T('t22',R('operator_letter_of',{'LETTER':0,'STRING':'abc'}),'')
T('t23',R('operator_length',{'STRING':M('divide',1,3)}),'18')
T('t24',A(C('gt',2,1),1),'2');T('t25',F('10 ^',2),'100');T('t26',F('e ^',0),'1')
T('t27',R('operator_contains',{'STRING1':'Hello','STRING2':'ELL'}),'true')
T('t28',R('data_itemoflist',{'INDEX':5},{'LIST':LST}),'')
S('data_addtolist',{'ITEM':'a'},{'LIST':LST});S('data_addtolist',{'ITEM':5},{'LIST':LST});S('data_addtolist',{'ITEM':'c'},{'LIST':LST})
T('t29',R('data_listcontainsitem',{'ITEM':'A'},{'LIST':LST}),'true');T('t30',R('data_itemnumoflist',{'ITEM':'5'},{'LIST':LST}),'2')
T('t31',R('data_itemoflist',{'INDEX':'last'},{'LIST':LST}),'c')
S('data_insertatlist',{'ITEM':'z','INDEX':1},{'LIST':LST});S('data_replaceitemoflist',{'INDEX':'last','ITEM':'q'},{'LIST':LST});S('data_deleteoflist',{'INDEX':2},{'LIST':LST})
T('t32',R('data_listcontents',{},{'LIST':LST}),'z5q');T('t33',R('data_lengthoflist',{},{'LIST':LST}),'3')
S('data_addtolist',{'ITEM':'hi there'},{'LIST':LST});T('t34',R('data_listcontents',{},{'LIST':LST}),'z 5 q hi there')
S('data_setvariableto',{'VALUE':5},{'VARIABLE':var('t35')});S('data_changevariableby',{'VALUE':'abc'},{'VARIABLE':var('t35')});exp['t35']='5'
S('data_setvariableto',{'VALUE':0},{'VARIABLE':var('t36')});S('control_repeat',{'TIMES':'3.6','SUBSTACK?':None},{})
S('motion_setx',{'X':'abc'});T('t37',R('motion_xposition'),'0')
S('motion_setx',{'X':'12.345678'});T('t38',R('motion_xposition'),'12.345678')
S('motion_pointindirection',{'DIRECTION':270});T('t39',R('motion_direction'),'-90')
S('looks_setsizeto',{'SIZE':-5});T('t40',R('looks_size'),'8')
T('t41',C('equals','abc','ABC'),'true');T('t42',C('gt','b','a'),'true');T('t43',A('Infinity',1),'Infinity');T('t44',A(' ',5),'5')
T('t45',M('subtract','',3),'-3');T('t46',J(M('multiply',1e21,10),''),'1e+22');T('t47',C('equals','1.0','1'),'true');T('t48',C('equals','true',C('gt',2,1)),'true')
T('t49',R('operator_random',{'FROM':5,'TO':5}),'5');T('t50',F('abs','-0'),'0')
S('motion_glideto',{'SECS':'0.1','TO':('r','motion_glideto_menu',{},{'TO':'_random_'})});T('t51','done','done')
S('looks_switchbackdroptoandwait',{'BACKDROP':('r','looks_backdrops',{},{'BACKDROP':'b2'})});T('t52',R('data_variable',{},{'VARIABLE':var('bd')}),'waited')
S('looks_seteffectto',{'VALUE':25},{'EFFECT':'GHOST'});S('looks_changeeffectby',{'CHANGE':10},{'EFFECT':'COLOR'})
T('t53',R('looks_backdropnumbername',{},{'NUMBER_NAME':'name'}),'b2')
# emit chain
prev='hat';B['hat']={"opcode":"event_whenflagclicked","next":None,"parent":None,"inputs":{},"fields":{},"shadow":False,"topLevel":True,"x":20,"y":20}
for st in stmts:
    _,op,inp,fld=st
    if op=='control_repeat':
        i=nid();c=nid();B[c]={"opcode":"data_changevariableby","next":None,"parent":i,"inputs":{"VALUE":[1,[4,"1"]]},"fields":{"VARIABLE":var('t36')},"shadow":False,"topLevel":False}
        B[i]={"opcode":op,"next":None,"parent":prev,"inputs":{"TIMES":[1,[6,"3.6"]],"SUBSTACK":[2,c]},"fields":{},"shadow":False,"topLevel":False};exp['t36']='4'
    else:
        i=emit(st,prev)
        for k,v in list(B[i]['inputs'].items()):
            if k in('TO','BACKDROP') and v[0]==3: B[i]['inputs'][k]=[1,v[1]];B[v[1]]['shadow']=True
    B[prev]['next']=i;B[i]['parent']=prev;prev=i
sp=pj['targets'][1];st=pj['targets'][0];sp['blocks']=B
st['variables']={v[0]:[v[0],0] for v in V.values()};st['lists']={"Lid":["L",[]]}
bg2=b'<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360"><rect width="480" height="360" fill="#def"/></svg>';h=hashlib.md5(bg2).hexdigest();files[h+'.svg']=bg2
st['costumes'].append({"name":"b2","assetId":h,"md5ext":h+".svg","dataFormat":"svg","rotationCenterX":240,"rotationCenterY":180})
st['blocks']={"s1":{"opcode":"event_whenbackdropswitchesto","next":"s2","parent":None,"inputs":{},"fields":{"BACKDROP":["b2",None]},"shadow":False,"topLevel":True,"x":0,"y":0},
"s2":{"opcode":"control_wait","next":"s3","parent":"s1","inputs":{"DURATION":[1,[5,"0.3"]]},"fields":{},"shadow":False,"topLevel":False},
"s3":{"opcode":"data_setvariableto","next":None,"parent":"s2","inputs":{"VALUE":[1,[10,"waited"]]},"fields":{"VARIABLE":["bd","bd"]},"shadow":False,"topLevel":False}}
o=zipfile.ZipFile('par.sb3','w');o.writestr('project.json',json.dumps(pj));[o.writestr(k,d) for k,d in files.items()];o.close()
json.dump(exp,open('par.json','w'));print(len(exp),'checks')
