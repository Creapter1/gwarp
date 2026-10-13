(() => {
  'use strict';

  /*
   * Safety limits for text joins and project lists.
   * Switch off before loading:
   *   window.GW_DISABLE_CHATGPT_TEXT_LIST_LIMITS = true;
   *
   * Existing over-limit lists are not trimmed on boot: preserving user data
   * is safer than silently deleting it. Further growth is refused.
   */
  const DISABLE_KEY = 'GW_DISABLE_CHATGPT_TEXT_LIST_LIMITS';
  const INSTALL_KEY = '__GW_CHATGPT_TEXT_LIST_LIMITS_V1__';
  const MAX_LIST_ITEMS = 200000;
  const MAX_JOIN_CHARS = 1000000;

  if (window[DISABLE_KEY] === true || window[INSTALL_KEY]) return;
  const GW = window.GW, Engine = window.Engine;
  if (!GW || !Engine || !Array.isArray(Engine.sprites)) {
    console.warn('[G-Warp limits] Not installed: expected window.GW and window.Engine.sprites.');
    return;
  }

  const state = {
    installed:true,maxListItems:MAX_LIST_ITEMS,maxJoinChars:MAX_JOIN_CHARS,
    cappedJoins:0,cappedListMutations:0,dispose:null
  };
  window[INSTALL_KEY] = state;
  const arrayRawToProxy = new WeakMap(), arrayProxyToRaw = new WeakMap();
  const dictRawToProxy = new WeakMap(), dictProxyToRaw = new WeakMap();
  const warnedLists = new WeakSet();
  let lastTextWarning = 0;

  function toast(message) {
    try {
      if (typeof GW.toast === 'function' && document.getElementById('toast')) GW.toast(message);
      else console.warn('[G-Warp limits]', message);
    } catch (_) {}
  }
  function warnText() {
    const now=Date.now(); if(now-lastTextWarning<5000)return;
    lastTextWarning=now; state.cappedJoins++;
    toast('Text reached G-Warp’s 1,000,000-character safety limit.');
  }
  function boundedText(value) {
    const s=String(value??'');
    if(s.length<=MAX_JOIN_CHARS)return s;
    warnText(); return s.slice(0,MAX_JOIN_CHARS);
  }
  function unwrapList(list){return list&&typeof list==='object'?(arrayProxyToRaw.get(list)||list):list;}
  function isArrayIndex(key){
    if(typeof key!=='string'||key==='')return -1;
    const n=Number(key);
    return Number.isInteger(n)&&n>=0&&n<4294967295&&String(n)===key?n:-1;
  }
  function warnList(list,name){
    state.cappedListMutations++;
    const raw=unwrapList(list);
    if(raw&&typeof raw==='object'&&!warnedLists.has(raw)){
      warnedLists.add(raw);
      toast('List "'+String(name||'list')+'" reached the 200,000-item safety limit.');
    }
  }
  function boundedItems(items,available,list,name){
    if(items.length<=available)return items;
    warnList(list,name); return items.slice(0,Math.max(0,available));
  }
  function protectList(input,name='list'){
    if(!Array.isArray(input))return input;
    if(arrayProxyToRaw.has(input))return input;
    const cached=arrayRawToProxy.get(input); if(cached)return cached;
    let proxy;
    proxy=new Proxy(input,{
      get(target,key,receiver){
        if(key==='push')return(...items)=>{
          const safe=boundedItems(items,MAX_LIST_ITEMS-target.length,proxy,name)
            .map(v=>typeof v==='string'?boundedText(v):v);
          return safe.length?Array.prototype.push.apply(proxy,safe):target.length;
        };
        if(key==='unshift')return(...items)=>{
          const safe=boundedItems(items,MAX_LIST_ITEMS-target.length,proxy,name)
            .map(v=>typeof v==='string'?boundedText(v):v);
          return safe.length?Array.prototype.unshift.apply(proxy,safe):target.length;
        };
        if(key==='splice')return function(start,deleteCount,...items){
          if(arguments.length===0)return Array.prototype.splice.call(proxy);
          const len=target.length;let s=Number(start);
          if(!Number.isFinite(s))s=0;s=Math.trunc(s);
          const index=s<0?Math.max(len+s,0):Math.min(s,len);
          let deleted=0;
          if(arguments.length===1)deleted=len-index;
          else{let d=Number(deleteCount);if(!Number.isFinite(d)||d<0)d=0;deleted=Math.min(Math.trunc(d),len-index);}
          const available=Math.max(0,MAX_LIST_ITEMS-(len-deleted));
          const safe=boundedItems(items,available,proxy,name).map(v=>typeof v==='string'?boundedText(v):v);
          if(arguments.length===1)return Array.prototype.splice.call(proxy,start);
          return Array.prototype.splice.call(proxy,start,deleteCount,...safe);
        };
        return Reflect.get(target,key,receiver);
      },
      set(target,key,value){
        if(key==='length'){
          const n=Number(value);
          if(Number.isFinite(n)&&n>MAX_LIST_ITEMS){
            warnList(proxy,name);
            // If an imported list is already oversized, don't erase its old
            // entries merely because another caller attempts to grow it.
            if(target.length>MAX_LIST_ITEMS)return true;
            return Reflect.set(target,'length',MAX_LIST_ITEMS,target);
          }
          return Reflect.set(target,key,value,target);
        }
        const index=isArrayIndex(key);
        if(index>=MAX_LIST_ITEMS&&index>=target.length){warnList(proxy,name);return true;}
        return Reflect.set(target,key,typeof value==='string'?boundedText(value):value,target);
      },
      defineProperty(target,key,desc){
        if(key==='length'&&Number(desc.value)>MAX_LIST_ITEMS){
          warnList(proxy,name);
          if(target.length>MAX_LIST_ITEMS)return true;
          desc={...desc,value:MAX_LIST_ITEMS};
        }
        const index=isArrayIndex(key);
        if(index>=MAX_LIST_ITEMS&&index>=target.length){warnList(proxy,name);return true;}
        if('value'in desc&&typeof desc.value==='string')desc={...desc,value:boundedText(desc.value)};
        return Reflect.defineProperty(target,key,desc);
      }
    });
    arrayRawToProxy.set(input,proxy);arrayProxyToRaw.set(proxy,input);return proxy;
  }
  function unwrapDictionary(v){return v&&typeof v==='object'?(dictProxyToRaw.get(v)||v):v;}
  function protectDictionary(input){
    if(!input||typeof input!=='object')return input;
    if(dictProxyToRaw.has(input))return input;
    const cached=dictRawToProxy.get(input);if(cached)return cached;
    const proxy=new Proxy(input,{
      get(target,key,receiver){const v=Reflect.get(target,key,receiver);return Array.isArray(v)?protectList(v,String(key)):v;},
      set(target,key,v,receiver){
        // Store raw arrays in the project's owned dictionaries and wrap them
        // on read. This prevents a temporary safety proxy leaking into saves.
        const value=Array.isArray(v)?unwrapList(protectList(v,String(key))):v;
        return Reflect.set(target,key,value,receiver);
      },
      defineProperty(target,key,desc){
        if('value'in desc&&Array.isArray(desc.value))
          desc={...desc,value:unwrapList(protectList(desc.value,String(key)))};
        return Reflect.defineProperty(target,key,desc);
      },
    });
    dictRawToProxy.set(input,proxy);dictProxyToRaw.set(proxy,input);return proxy;
  }

  const listsDescriptor=Object.getOwnPropertyDescriptor(Engine,'lists');
  let listsWrapped=false, wrappedListsGet=null, wrappedListsSet=null;
  if(listsDescriptor?.get&&listsDescriptor.configurable){
    wrappedListsGet=function(){return protectDictionary(listsDescriptor.get.call(this));};
    wrappedListsSet=function(value){if(listsDescriptor.set)listsDescriptor.set.call(this,unwrapDictionary(value));};
    Object.defineProperty(Engine,'lists',{configurable:true,enumerable:listsDescriptor.enumerable,get:wrappedListsGet,set:wrappedListsSet});
    listsWrapped=true;
  }

  const originalList=typeof GW.list==='function'?GW.list:null;
  const wrappedList=originalList?function(name){return protectList(originalList.apply(this,arguments),name);}:null;
  if(wrappedList)GW.list=wrappedList;

  const originalCreateList=typeof GW.createList==='function'?GW.createList:null;
  const wrappedCreateList=originalCreateList?function(name){
    const result=originalCreateList.apply(this,arguments);
    try{protectList(Engine.lists?.[String(name||'').trim()||'new list'],name);}catch(_){}
    return result;
  }:null;
  if(wrappedCreateList)GW.createList=wrappedCreateList;

  const V=window.GW_VARS;
  const originalGlobalLists=typeof V?.globalLists==='function'?V.globalLists:null;
  const wrappedGlobalLists=originalGlobalLists?function(){return protectDictionary(originalGlobalLists.apply(this,arguments));}:null;
  if(wrappedGlobalLists)V.globalLists=wrappedGlobalLists;
  const originalLocalListsOf=typeof V?.localListsOf==='function'?V.localListsOf:null;
  const wrappedLocalListsOf=originalLocalListsOf?function(sprite){return protectDictionary(originalLocalListsOf.apply(this,arguments));}:null;
  if(wrappedLocalListsOf)V.localListsOf=wrappedLocalListsOf;

  function scanLists(){
    try{const d=Engine.lists;for(const k of Object.keys(d||{}))protectList(d[k],k);}catch(_){}
    try{const d=originalGlobalLists?.call(V);for(const k of Object.keys(d||{}))protectList(d[k],k);}catch(_){}
    for(const sprite of Engine.sprites||[]){
      const d=sprite?.localLists;if(d&&typeof d==='object')for(const k of Object.keys(d))protectList(d[k],k);
    }
  }
  scanLists();

  const loadHooks=[];
  for(const [obj,key] of [[GW,'loadProject'],[window.GW8,'importSB3']]){
    const original=typeof obj?.[key]==='function'?obj[key]:null;if(!original)continue;
    const wrapped=function(){
      const result=original.apply(this,arguments);
      if(result&&typeof result.then==='function')return result.finally(scanLists);
      scanLists();return result;
    };
    obj[key]=wrapped;loadHooks.push(()=>{if(obj[key]===wrapped)obj[key]=original;});
  }

  const G9=window.GW9;
  const oldJoin=G9?.fastFN?.op_join;
  const wrappedJoin=typeof oldJoin==='function'?function(thread,node,owner){
    const left=boundedText(G9.evalNode(thread,node?.args?.[0],'value',owner));
    const rightFull=String(G9.evalNode(thread,node?.args?.[1],'value',owner)??'');
    const room=Math.max(0,MAX_JOIN_CHARS-left.length);
    if(rightFull.length>room)warnText();
    return left+rightFull.slice(0,room);
  }:null;
  if(wrappedJoin)G9.fastFN.op_join=wrappedJoin;

  const originalEval=typeof G9?.evalNode==='function'?G9.evalNode:null;
  const wrappedEval=originalEval?function(thread,node,expected,owner){
    const value=originalEval.apply(this,arguments);
    return node?.type==='op_join'?boundedText(value):value;
  }:null;
  if(wrappedEval)G9.evalNode=wrappedEval;

  let ThreadClass=null;try{ThreadClass=typeof ScriptThread!=='undefined'?ScriptThread:null;}catch(_){}
  const originalExecute=typeof ThreadClass?.prototype?.executeBlock==='function'?ThreadClass.prototype.executeBlock:null;
  const wrappedExecute=originalExecute?function(block){
    const value=originalExecute.apply(this,arguments);
    return block?.dataset?.type==='op_join'?boundedText(value):value;
  }:null;
  if(wrappedExecute)ThreadClass.prototype.executeBlock=wrappedExecute;

  state.capabilities={listsAccessorWrapped:listsWrapped,gwListWrapped:!!wrappedList,
    gwCreateListWrapped:!!wrappedCreateList,fastJoinWrapped:!!wrappedJoin,
    evalNodeWrapped:!!wrappedEval,legacyExecuteWrapped:!!wrappedExecute};
  state.scanLists=scanLists;
  function unwrapStoredListArrays(dict){
    const raw=unwrapDictionary(dict);
    if(!raw||typeof raw!=='object')return;
    for(const key of Object.keys(raw)){
      const value=raw[key];
      if(Array.isArray(value)&&arrayProxyToRaw.has(value))raw[key]=arrayProxyToRaw.get(value);
    }
  }
  function unwrapStoredLists(){
    try{if(originalGlobalLists)unwrapStoredListArrays(originalGlobalLists.call(V));}catch(_){}
    for(const sprite of Engine.sprites||[])try{unwrapStoredListArrays(sprite?.localLists);}catch(_){}
  }
  state.dispose=()=>{
    // Avoid leaving guarded array proxies stored in the project's live list
    // dictionaries when QA disables this module.
    unwrapStoredLists();
    if(wrappedList&&GW.list===wrappedList)GW.list=originalList;
    if(wrappedCreateList&&GW.createList===wrappedCreateList)GW.createList=originalCreateList;
    if(wrappedGlobalLists&&V.globalLists===wrappedGlobalLists)V.globalLists=originalGlobalLists;
    if(wrappedLocalListsOf&&V.localListsOf===wrappedLocalListsOf)V.localListsOf=originalLocalListsOf;
    if(G9?.fastFN&&wrappedJoin&&G9.fastFN.op_join===wrappedJoin)G9.fastFN.op_join=oldJoin;
    if(G9&&wrappedEval&&G9.evalNode===wrappedEval)G9.evalNode=originalEval;
    if(ThreadClass?.prototype&&wrappedExecute&&ThreadClass.prototype.executeBlock===wrappedExecute)ThreadClass.prototype.executeBlock=originalExecute;
    for(const undo of loadHooks)undo();
    if(listsWrapped&&Object.getOwnPropertyDescriptor(Engine,'lists')?.get===wrappedListsGet)
      Object.defineProperty(Engine,'lists',listsDescriptor);
    delete window[INSTALL_KEY];
  };
})();