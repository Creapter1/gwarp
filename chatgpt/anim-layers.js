/* ANIM-L1: standalone Layers panel proposal. Not loaded by app.html. */
(() => {
  'use strict';
  if (window.GW_ANIM_LAYERS) return;
  if (window.GW_FEATURE_OFF?.('animLayers')) return;

  const DRAW = new Set(['path','rect','circle','ellipse','line','polyline','polygon','text','image','use','g']);
  const COLORS = ['#ef4444','#f59e0b','#22c55e','#06b6d4','#3b82f6','#a855f7','#ec4899','#84cc16'];
  const CE = () => window.GW_V15_COSTUME_EDITOR;
  const state = () => window.GW_ANIM?.state;
  const paintSvg = () => document.getElementById('gwVectorCanvasV15');
  const xml = () => new XMLSerializer();
  let n = 0, panel = null, list = null, observer = null, style = null, mode = null;
  const hidden = new Set(), active = { paint:null, anim:null, hover:null };
  const uid = p => p + '-' + (++n).toString(36) + '-' + Math.random().toString(36).slice(2,7);

  function isPaintArt(el, svg) {
    return !!el && el.nodeType === 1 && el.parentNode === svg &&
      !/^(defs|style|title|metadata)$/i.test(el.localName) &&
      !/^(gwV153|gwpe|gwTx|gwEr)/.test(el.id || '') &&
      !el.classList?.contains('gw-svg-selection') &&
      !el.classList?.contains('gw-svg-handle') &&
      !el.classList?.contains('gw-v153-selected');
  }
  function paintItems() {
    const svg = paintSvg(); if (!svg) return [];
    const nodes = [...svg.children].filter(el => isPaintArt(el,svg));
    let changed = false;
    nodes.forEach(el => { if (!el.dataset.gwLayerKey) { el.dataset.gwLayerKey = uid('paint'); changed = true; } });
    if (changed) { try { CE()?.save?.(true); } catch {} }
    return nodes.map((node,i) => makeItem(node,node.dataset.gwLayerKey,i,'paint')).reverse();
  }
  function partPaths(root) {
    let node=root,base=[];
    for(let depth=0;depth<24;depth++){
      const kids=[...node.children].map((el,i)=>[el,i]).filter(([el])=>DRAW.has(el.localName)&&!/^gw18/.test(el.id||''));
      if(kids.length===1&&kids[0][0].localName==='g'){base.push(kids[0][1]);node=kids[0][0];continue;}
      return kids.map(([,i])=>base.concat(i).join('/'));
    }
    return [];
  }
  function at(root,path){let el=root;for(const i of String(path).split('/').map(Number)){el=el?.children?.[i];if(!el)return null;}return el;}
  function makeItem(node,key,i,kind,extra={}) {
    const tag=node.localName||'shape';
    const meta=kind==='anim'?state()?.anim?.layerMeta?.[key]:null;
    const name=node.getAttribute('data-gw-layer-name')||meta?.name||node.getAttribute('aria-label')||node.id||
      ((tag==='g'?'Group':tag[0].toUpperCase()+tag.slice(1))+' '+(i+1));
    const anim=state()?.anim, boneId=extra.boneId||null, bi=boneId?anim?.bones?.findIndex(b=>b.id===boneId):-1;
    return {node,key,index:i,kind,name,locked:kind==='paint'?node.dataset.gwLayerLocked==='1':!!anim?.layerMeta?.[key]?.locked,
      boneId,boneColor:bi>=0?COLORS[bi%COLORS.length]:null,path:extra.path||null};
  }
  function animationItems() {
    const st=state(),anim=st?.anim,view=st?.view;
    if(!anim||!view)return [];
    const paths=window.GW_ANIM?.partPaths?.(view)||partPaths(view);
    return paths.map((p,i)=>{
      const node=at(view,p);if(!node)return null;
      const key=node.dataset.gwLayerKey||p;
      return makeItem(node,key,i,'anim',{path:p,boneId:anim.parts?.[key]||anim.parts?.[p]||null});
    }).filter(Boolean).reverse();
  }

  function ensureAnimationIds(anim,view) {
    if(!anim?.svg||!view)return {changed:false,keys:[],paths:[]};
    const root=new DOMParser().parseFromString(anim.svg,'image/svg+xml').documentElement;
    if(!root||root.localName!=='svg')return {changed:false,keys:[],paths:[]};
    const a=partPaths(root),b=window.GW_ANIM?.partPaths?.(view)||partPaths(view);
    if(a.length!==b.length)return {changed:false,keys:[],paths:b};
    const old=anim.parts||{},next={},keys=[];let changed=false;
    a.forEach((p,i)=>{
      const x=at(root,p),y=at(view,b[i]);if(!x||!y)return;
      const key=x.dataset.gwLayerKey||y.dataset.gwLayerKey||uid('anim');
      if(x.dataset.gwLayerKey!==key){x.dataset.gwLayerKey=key;changed=true;}
      y.dataset.gwLayerKey=key;
      const bone=old[p]||old[key];if(bone)next[key]=bone;
      keys.push(key);
    });
    if(JSON.stringify(old)!==JSON.stringify(next)){anim.parts=next;changed=true;}
    if(changed)anim.svg=xml().serializeToString(root);
    anim.layerMeta ||= {};
    anim.frames?.forEach(frame=>{if(!Array.isArray(frame.layerOrder))frame.layerOrder=keys.slice().reverse();});
    return {changed,keys,paths:b};
  }

  function applyOrder(root,orderedKeys) {
    const paths=partPaths(root),nodes=paths.map(p=>at(root,p)).filter(Boolean);
    if(!nodes.length)return false;
    const parent=nodes[0].parentNode;
    if(!parent||nodes.some(x=>x.parentNode!==parent))return false;
    const keyed=new Map(nodes.map(x=>[x.dataset.gwLayerKey,x]));
    const bottom=orderedKeys.slice().reverse().map(k=>keyed.get(k)).filter(Boolean);
    if(bottom.length!==nodes.length)return false;
    const children=[...parent.children],slots=[];
    children.forEach((el,i)=>{if(nodes.includes(el))slots.push(i);});
    if(slots.length!==nodes.length)return false;
    const desired=children.slice();slots.forEach((slot,i)=>desired[slot]=bottom[i]);
    desired.forEach(el=>parent.appendChild(el));return true;
  }
  function applyFrameOrder(root,anim,index) {
    const frame=anim?.frames?.[index], paths=partPaths(root), keys=paths.map(p=>at(root,p)?.dataset.gwLayerKey);
    if(!keys.length||keys.some(k=>!k))return false;
    return applyOrder(root,Array.isArray(frame?.layerOrder)?frame.layerOrder:keys.slice().reverse());
  }
  function applyCurrentFrame(st=state()) {
    if(!st?.anim||!st.view||st.mode!=='animate')return false;
    const before=new Map((st.parts||[]).map(p=>{const el=at(st.view,p);return [el?.dataset.gwLayerKey,st.orig?.get(p)??''];}));
    const ok=applyFrameOrder(st.view,st.anim,st.frame||0);
    if(ok&&window.GW_ANIM?.partPaths){
      st.parts=window.GW_ANIM.partPaths(st.view);
      st.orig=new Map(st.parts.map(p=>[p,before.get(at(st.view,p)?.dataset.gwLayerKey)??'']));
      st.parts.forEach(p=>{const el=at(st.view,p);if(el)el.setAttribute('data-gw18-part',p);});
    }
    return ok;
  }
  function setFrameOrder(anim,index,keys) {
    if(!anim?.frames?.[index])return false;
    anim.frames[index].layerOrder=keys.slice();return true;
  }

  function thumbnail(item) {
    const src=item.kind==='paint'?paintSvg():state()?.view;
    if(!src)return '';
    const copy=src.cloneNode(true);
    copy.querySelectorAll('#gwTxOverlay,#gwV153Overlay,#gw18Onion,#gw18Bones,#gw18Ghost,#gwV153Grid,#gwV153GridDefs').forEach(x=>x.remove());
    if(item.kind==='paint'){
      const keep=[...copy.children].find(x=>x.dataset.gwLayerKey===item.key);if(!keep)return '';
      [...copy.children].filter(x=>isPaintArt(x,copy)&&x!==keep).forEach(x=>x.remove());
    }else{
      const paths=partPaths(src),ix=paths.findIndex(p=>at(src,p)?.dataset.gwLayerKey===item.key);
      if(ix<0)return '';
      const parentPath=paths[ix].split('/').slice(0,-1).join('/'),parent=parentPath?at(copy,parentPath):copy,keep=at(copy,paths[ix]);
      if(!parent||!keep)return '';
      [...parent.children].filter(x=>DRAW.has(x.localName)&&x!==keep).forEach(x=>x.remove());
    }
    copy.setAttribute('width','80');copy.setAttribute('height','64');copy.setAttribute('preserveAspectRatio','xMidYMid meet');
    return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(xml().serializeToString(copy));
  }

  function orderPaint(keys) {
    const svg=paintSvg();if(!svg)return false;
    const nodes=[...svg.children].filter(x=>isPaintArt(x,svg));
    const map=new Map(nodes.map(x=>[x.dataset.gwLayerKey,x])),bottom=keys.slice().reverse().map(k=>map.get(k)).filter(Boolean);
    if(bottom.length!==nodes.length)return false;
    const all=[...svg.children],slots=[];all.forEach((x,i)=>{if(isPaintArt(x,svg))slots.push(i);});
    const next=all.slice();slots.forEach((slot,i)=>next[slot]=bottom[i]);next.forEach(x=>svg.appendChild(x));
    try{CE()?.save?.(true);}catch{}return true;
  }
  function setName(item,value) {
    const name=String(value||'').trim().slice(0,80);if(!name)return;
    if(item.kind==='paint'){item.node.dataset.gwLayerName=name;try{CE()?.save?.(true);}catch{}}
    else {const a=state()?.anim;if(a){a.layerMeta||={};a.layerMeta[item.key]||={};a.layerMeta[item.key].name=name;}}
  }
  function setLock(item,value) {
    if(item.kind==='paint'){item.node.dataset.gwLayerLocked=value?'1':'0';try{CE()?.save?.(true);}catch{}}
    else {const a=state()?.anim;if(a){a.layerMeta||={};a.layerMeta[item.key]||={};a.layerMeta[item.key].locked=!!value;}}
  }
  function styleState() {
    if(!style){style=document.createElement('style');style.id='gw-anim-layers-preview-style';document.head.appendChild(style);}
    const rules=[];
    const add=(root,key,css)=>{if(/^[a-z0-9-]+$/i.test(key||'')){rules.push(root+' [data-gw-layer-key="'+key+'"]{'+css+'}');}};
    [...paintItems(),...animationItems()].forEach(x=>{
      if(hidden.has(x.key))add(x.kind==='paint'?'#gwVectorCanvasV15':'#gw18Svg',x.key,'display:none!important');
    });
    if(active.paint)add('#gwVectorCanvasV15',active.paint,'filter:drop-shadow(0 0 4px #4ade80)!important');
    if(active.anim)add('#gw18Svg',active.anim,'filter:drop-shadow(0 0 4px #4ade80)!important');
    if(active.hover){add('#gwVectorCanvasV15',active.hover,'filter:drop-shadow(0 0 5px #8b5cf6)!important');add('#gw18Svg',active.hover,'filter:drop-shadow(0 0 5px #8b5cf6)!important');}
    style.textContent=rules.join('\n');
  }
  function selectItem(item) {
    active[item.kind]=item.key;
    if(item.kind==='paint')window.GW_TRANSFORM?.selectLayer?.(item.node);
    else if(item.boneId){window.GW_ANIM?.selectPart?.(item.key);const st=state();if(st)st.bone=item.boneId;}
    styleState();
  }
  function button(text,title,fn){const b=document.createElement('button');b.type='button';b.textContent=text;b.title=title;b.setAttribute('aria-label',title);b.addEventListener('click',fn);return b;}

  function addCss() {
    if(document.getElementById('gw-anim-layers-css'))return;
    const s=document.createElement('style');s.id='gw-anim-layers-css';
    s.textContent='#gwAnimLayersPanel{position:fixed;z-index:9998;right:18px;top:104px;width:268px;max-width:calc(100vw - 24px);max-height:calc(100vh - 126px);display:flex;flex-direction:column;background:#111327;border:1px solid #4a3b79;border-radius:12px;box-shadow:0 16px 48px #000a;color:#e5e7eb;font:12px system-ui,sans-serif}'+
    '#gwAnimLayersPanel[hidden]{display:none!important}#gwAnimLayersPanel .head{display:flex;align-items:center;gap:8px;padding:9px 10px;border-bottom:1px solid #34344a;font-weight:800}#gwAnimLayersPanel .head span{flex:1}'+
    '#gwAnimLayersPanel button{background:#1a2038;border:1px solid #34344a;color:#e5e7eb;border-radius:7px;padding:4px 7px;font:inherit;cursor:pointer}#gwAnimLayersPanel button:hover{border-color:#8b5cf6;background:#24264a}'+
    '#gwAnimLayersPanel .rows{overflow:auto;padding:6px;display:flex;flex-direction:column;gap:4px}#gwAnimLayersPanel .layer{display:grid;grid-template-columns:44px minmax(0,1fr) auto;gap:7px;align-items:center;border:1px solid transparent;border-radius:8px;padding:5px;background:#171a2c}'+
    '#gwAnimLayersPanel .layer[aria-selected=true]{border-color:#4ade80;background:#1a2630}#gwAnimLayersPanel .layer.drag-over{border-color:#8b5cf6}#gwAnimLayersPanel .thumb{width:44px;height:36px;object-fit:contain;background:#e5e7eb;border-radius:5px}'+
    '#gwAnimLayersPanel .meta{min-width:0;display:flex;flex-direction:column;gap:3px}#gwAnimLayersPanel input{width:100%;min-width:0;border:1px solid #34344a;background:#0b0e1a;color:#e5e7eb;border-radius:5px;padding:3px 5px;font:11px system-ui}'+
    '#gwAnimLayersPanel .sub{font-size:10px;color:#a1a1b5}#gwAnimLayersPanel .dot{width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:5px}#gwAnimLayersPanel .actions{display:flex;gap:3px;flex-direction:column}#gwAnimLayersPanel .actions button{font-size:10px;padding:3px 5px}#gwAnimLayersPanel .foot{border-top:1px solid #34344a;padding:8px;color:#a1a1b5;font-size:10px;line-height:1.35}';
    document.head.appendChild(s);
  }
  function mount() {
    if(panel?.isConnected)return;
    panel=document.createElement('section');panel.id='gwAnimLayersPanel';panel.hidden=true;
    panel.innerHTML='<div class="head"><span>Layers</span><button type="button" data-close aria-label="Close Layers">×</button></div><div class="rows" role="list"></div><div class="foot">Top row = front. Hide is editing-only and is not saved into exported artwork.</div>';
    panel.querySelector('[data-close]').addEventListener('click',close);list=panel.querySelector('.rows');document.body.appendChild(panel);
  }
  function addToggle(host,kind) {
    if(!host||host.querySelector('[data-gw-anim-layers-toggle]'))return;
    const b=button('Layers','Open Layers panel',()=>open(kind));b.dataset.gwAnimLayersToggle='1';
    b.style.cssText='margin-left:6px;border:1px solid #8b5cf6;border-radius:8px;background:#17172a;color:#ddd6fe;padding:6px 9px;font:700 11px system-ui;cursor:pointer';
    host.appendChild(b);
  }
  function renderRows() {
    if(!list||!panel||panel.hidden)return;
    const kind=mode,items=kind==='paint'?paintItems():animationItems();list.textContent='';
    items.forEach(item=>{
      const row=document.createElement('div');row.className='layer';row.draggable=true;row.dataset.key=item.key;row.setAttribute('role','listitem');row.setAttribute('aria-selected',String(active[kind]===item.key));
      const img=document.createElement('img');img.className='thumb';img.alt=item.name+' preview';img.src=thumbnail(item);
      const meta=document.createElement('div');meta.className='meta';
      const input=document.createElement('input');input.type='text';input.maxLength=80;input.value=item.name;input.setAttribute('aria-label','Rename '+item.name);
      input.addEventListener('change',()=>{setName(item,input.value);renderRows();});
      const sub=document.createElement('div');sub.className='sub';
      if(kind==='anim'&&item.boneColor){const dot=document.createElement('i');dot.className='dot';dot.style.background=item.boneColor;sub.append(dot,document.createTextNode('Attached to bone'));}
      else sub.textContent=kind==='anim'?'Unassigned art part':'Artwork layer';
      meta.append(input,sub);
      const actions=document.createElement('div');actions.className='actions';
      actions.append(
        button(hidden.has(item.key)?'Show':'Hide','Toggle edit-only visibility',()=>{hidden.has(item.key)?hidden.delete(item.key):hidden.add(item.key);styleState();renderRows();}),
        button(item.locked?'Unlock':'Lock','Toggle editing lock',()=>{setLock(item,!item.locked);renderRows();})
      );
      row.append(img,meta,actions);
      row.addEventListener('click',e=>{if(e.target.closest('button,input'))return;selectItem(item);renderRows();});
      row.addEventListener('mouseenter',()=>{active.hover=item.key;styleState();});
      row.addEventListener('mouseleave',()=>{active.hover=null;styleState();});
      row.addEventListener('dragstart',e=>{e.dataTransfer?.setData('text/plain',item.key);e.dataTransfer.effectAllowed='move';});
      row.addEventListener('dragover',e=>{e.preventDefault();row.classList.add('drag-over');});
      row.addEventListener('dragleave',()=>row.classList.remove('drag-over'));
      row.addEventListener('drop',e=>{
        e.preventDefault();row.classList.remove('drag-over');
        const from=e.dataTransfer?.getData('text/plain'),to=item.key;if(!from||from===to)return;
        const rows=kind==='paint'?paintItems():animationItems(),source=rows.find(x=>x.key===from),target=rows.find(x=>x.key===to);
        if(!source||!target||source.locked||target.locked)return;
        const keys=rows.map(x=>x.key),i=keys.indexOf(from),j=keys.indexOf(to);
        if(i<0||j<0)return;keys.splice(i,1);keys.splice(j,0,from);
        if(kind==='paint')orderPaint(keys);
        else {
          const st=state(),a=st?.anim,index=st?.frame||0;
          if(st?.mode!=='animate'||!a)return;
          setFrameOrder(a,index,keys);
          // Claude adds the showPose hook to apply the order to the live view.
          applyCurrentFrame(st);
        }
        renderRows();
      });
      list.append(row);
    });
    styleState();
  }
  function open(kind){mount();mode=kind;panel.hidden=false;renderRows();}
  function close(){if(panel)panel.hidden=true;active.hover=null;styleState();}
  function render(){if(panel&&!panel.hidden)renderRows();}
  function boot(){
    addCss();mount();
    const scan=()=>{
      addToggle(document.getElementById('gwCosHead')||document.getElementById('gwpeFoot'),'paint');
      addToggle(document.querySelector('#gw18Anim .gw18-head'),'anim');
    };
    scan();observer=new MutationObserver(scan);observer.observe(document.body,{childList:true,subtree:true});
    document.addEventListener('change',e=>{if(e.target?.closest?.('#gw18Anim,#gwCostumeEditorV15'))render();},true);
  }
  const api={version:1,paintItems,animationItems,ensureAnimationIds,applyFrameOrder,applyCurrentFrame,setFrameOrder,orderPaint,render,open,close,state:{hidden,active,panel}};
  window.GW_ANIM_LAYERS=api;
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
