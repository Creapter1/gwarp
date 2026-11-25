import json,zipfile,hashlib
z=zipfile.ZipFile('move.sb3');pj=json.loads(z.read('project.json'));files={n:z.read(n) for n in z.namelist() if n!='project.json'}
B={};n=[0];V={};exp={}
def nid():
    n[0]+=1;return f"b{n[0]}"
def var(v):
    V[v]=1;return [v,v]
def R(op,inp=None,fld=None,mut=None):return ('r',op,inp or {},fld or {},mut)
def emit(e,parent):
    i=nid();_,op,inp,fld,mut=e;ins={}
    for k,v in inp.items():
        if isinstance(v,list): # substack of statements
            ins[k]=[2,chain(v,i)] if v else None
        elif isinstance(v,tuple):
            c=emit(v,i)
            if v[1].endswith('_menu') or v[1] in('looks_costume',): B[c]['shadow']=True;ins[k]=[1,c]
            else: ins[k]=[2,c] if k in('CONDITION','OPERAND') else [3,c,[10,""]]
        else: ins[k]=[1,[10,str(v)]]
    B[i]={"opcode":op,"next":None,"parent":parent,"inputs":{k:v for k,v in ins.items() if v},"fields":{k:[v,None] if not isinstance(v,list) else v for k,v in fld.items()},"shadow":False,"topLevel":False}
    if mut:B[i]['mutation']=mut
    return i
def chain(stmts,parent,top=False,y=0):
    first=None;prev=None
    for st in stmts:
        i=emit(st,prev or parent)
        if prev:B[prev]['next']=i
        else:
            first=i
            if top:B[i].update(parent=None,topLevel=True,x=20,y=y)
        prev=i
    return first
SET=lambda v,e:R('data_setvariableto',{'VALUE':e},{'VARIABLE':var(v)})
CHG=lambda v,e:R('data_changevariableby',{'VALUE':e},{'VARIABLE':var(v)})
VAR=lambda v:R('data_variable',{},{'VARIABLE':var(v)})
def T(name,e,want):exp[name]=want;return SET(name,e)
A=lambda a,b:R('operator_add',{'NUM1':a,'NUM2':b});M=lambda o,a,b:R('operator_'+o,{'NUM1':a,'NUM2':b})
C=lambda o,a,b:R('operator_'+o,{'OPERAND1':a,'OPERAND2':b});J=lambda a,b:R('operator_join',{'STRING1':a,'STRING2':b})
CN=R('looks_costumenumbername',{},{'NUMBER_NAME':'number'})
SW=lambda v:R('looks_switchcostumeto',{'COSTUME':v if isinstance(v,tuple) else R('looks_costume',{},{'COSTUME':'a'})}) 
def SWn(v):
    return ('r','looks_switchcostumeto',{'COSTUME':A(v,0)},{},None)
PROC='add %s %s';ARG=lambda nm:R('argument_reporter_string_number',{},{'VALUE':nm})
mutc=lambda warp:{"tagName":"mutation","children":[],"proccode":PROC,"argumentids":'["a1","a2"]',"warp":warp}
CALL=lambda a,b:R('procedures_call',{'a1':a,'a2':b},{},mutc("true"))
FACT=lambda x:R('procedures_call',{'f1':x},{},{"tagName":"mutation","children":[],"proccode":"fact %s","argumentids":'["f1"]',"warp":"true"})
main=[R('event_whenflagclicked'),
 SWn(5),T('u01',CN,'2'),SWn(0),T('u02',CN,'3'),SWn(-1),T('u03',CN,'2'),SWn('1.5'),T('u04',CN,'2'),
 R('looks_switchcostumeto',{'COSTUME':R('operator_join',{'STRING1':'c','STRING2':''})}),T('u05',CN,'3'),
 R('looks_switchcostumeto',{'COSTUME':R('operator_join',{'STRING1':'nope','STRING2':''})}),T('u06',CN,'3'),
 R('looks_nextcostume'),T('u07',CN,'1'),
 R('motion_pointindirection',{'DIRECTION':450}),T('u08',R('motion_direction'),'90'),
 R('motion_pointindirection',{'DIRECTION':170}),R('motion_turnright',{'DEGREES':15}),T('u09',R('motion_direction'),'-175'),
 R('motion_gotoxy',{'X':1000,'Y':-1000}),T('u10',R('motion_xposition'),'257'),T('u11',R('motion_yposition'),'-197'),
 R('motion_gotoxy',{'X':0,'Y':0}),R('motion_pointindirection',{'DIRECTION':45}),R('motion_movesteps',{'STEPS':10}),T('u12',R('motion_xposition'),'7.0710678118654755'),
 R('motion_gotoxy',{'X':0,'Y':0}),R('motion_pointindirection',{'DIRECTION':90}),
 T('u13',M('mod','5.5',2),'1.5'),T('u14',J('',R('operator_round',{'NUM':'-0.5'})),'0'),T('u15',C('gt','abc',5),'true'),
 CALL(3,4),T('u16',VAR('res'),'7'),SET('f',1),FACT(5),T('u17',VAR('f'),'120'),
 SET('bw',0),R('event_broadcastandwait',{'BROADCAST_INPUT':R('event_broadcast_menu',{},{'BROADCAST_OPTION':['go','go']})}),T('u18',VAR('bw'),'2'),
 SET('cl',0),R('control_repeat',{'TIMES':3,'SUBSTACK':[R('control_create_clone_of',{'CLONE_OPTION':R('control_create_clone_of_menu',{},{'CLONE_OPTION':'_myself_'})})]}),
 R('control_wait',{'DURATION':'0.3'}),T('u19',VAR('cl'),'3'),
 SET('k',0),R('control_repeat_until',{'CONDITION':C('gt',VAR('k'),4),'SUBSTACK':[CHG('k',2)]}),T('u20',VAR('k'),'6'),
 R('control_if_else',{'CONDITION':C('lt',1,2),'SUBSTACK':[SET('u21','yes')],'SUBSTACK2':[SET('u21','no')]}),
 R('sensing_resettimer'),R('control_wait',{'DURATION':'0.2'}),T('u22',C('gt',R('sensing_timer'),'0.15'),'true'),
 SET('o',0),R('control_stop',{},{'STOP_OPTION':'other scripts in sprite'},{"tagName":"mutation","children":[],"hasnext":"true"}),R('control_wait',{'DURATION':'0.3'}),T('u23',VAR('o'),'0'),
 T('u24',R('operator_length',{'STRING':''}),'0'),T('u25',M('multiply','0.1',3),'0.30000000000000004'),
 T('u26',C('equals',R('operator_round',{'NUM':R('operator_random',{'FROM':'1.0','TO':'2'})}),R('operator_random',{'FROM':'1.5','TO':'1.5'})),'false'),
 T('u27',R('sensing_of',{'OBJECT':R('sensing_of_object_menu',{},{'OBJECT':'_stage_'})},{'PROPERTY':'backdrop #'}),'1'),
 T('u28',J(R('operator_mathop',{'NUM':2},{'OPERATOR':'sqrt'}),''),'1.4142135623730951'),
 R('control_stop',{},{'STOP_OPTION':'this script'},{"tagName":"mutation","children":[],"hasnext":"false"}),
]
exp['u21']='yes'
chain(main,None,True,0)
# definitions
def define(code,ids,names,body,y):
    d=nid();p=nid();B[p]={"opcode":"procedures_prototype","next":None,"parent":d,"inputs":{},"fields":{},"shadow":True,"topLevel":False,"mutation":{"tagName":"mutation","children":[],"proccode":code,"argumentids":json.dumps(ids),"argumentnames":json.dumps(names),"argumentdefaults":json.dumps([""]*len(ids)),"warp":"true"}}
    for i_,nm in zip(ids,names):
        a=nid();B[a]={"opcode":"argument_reporter_string_number","next":None,"parent":p,"inputs":{},"fields":{"VALUE":[nm,None]},"shadow":True,"topLevel":False};B[p]['inputs'][i_]=[1,a]
    B[d]={"opcode":"procedures_definition","next":None,"parent":None,"inputs":{"custom_block":[1,p]},"fields":{},"shadow":False,"topLevel":True,"x":600,"y":y}
    c=chain(body,d);B[d]['next']=c
define(PROC,["a1","a2"],["a","b"],[SET('res',A(ARG('a'),ARG('b')))],0)
define("fact %s",["f1"],["n"],[R('control_if',{'CONDITION':C('gt',ARG('n'),1),'SUBSTACK':[SET('f',M('multiply',VAR('f'),ARG('n'))),FACT(M('subtract',ARG('n'),1))]})],200)
chain([R('event_whenbroadcastreceived',{},{'BROADCAST_OPTION':['go','go']}),CHG('bw',1),R('control_wait',{'DURATION':'0.2'}),CHG('bw',1)],None,True,500)
chain([R('control_start_as_clone'),CHG('cl',1),R('control_delete_this_clone')],None,True,700)
chain([R('event_whenflagclicked'),R('control_wait',{'DURATION':'2.2'}),SET('o',1)],None,True,900)
sp=pj['targets'][1];st=pj['targets'][0];sp['blocks']=B
c0=sp['costumes'][0];sp['costumes']=[dict(c0,name=x) for x in 'abc']
st['variables']={v:[v,0] for v in V};st['broadcasts']={'go':'go'}
o=zipfile.ZipFile('par2.sb3','w');o.writestr('project.json',json.dumps(pj));[o.writestr(k,d) for k,d in files.items()];o.close()
json.dump(exp,open('par2.json','w'));print(len(exp))
