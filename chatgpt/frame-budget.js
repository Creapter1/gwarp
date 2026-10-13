(() => {
  'use strict';
  const DISABLE_KEY = 'GW_DISABLE_CHATGPT_FRAME_BUDGET';
  const INSTALL_KEY = '__GW_CHATGPT_FRAME_BUDGET_V1__';
  const BUDGET_MS = 200;
  if (window[DISABLE_KEY] === true || window[INSTALL_KEY]) return;

  let ThreadClass;
  try { ThreadClass = typeof ScriptThread !== 'undefined' ? ScriptThread : null; }
  catch (_) { ThreadClass = null; }
  if (!ThreadClass?.prototype || typeof ThreadClass.prototype.executeBlock !== 'function') {
    console.warn('[G-Warp frame budget] Not installed: expected ScriptThread.prototype.executeBlock.');
    return;
  }

  const originalExecuteBlock = ThreadClass.prototype.executeBlock;
  const startedAt = new WeakMap();
  const temporarilyYielded = new WeakSet();
  const state = { installed:true, budgetMs:BUDGET_MS, yieldCount:0, lastYieldAt:0, lastBlockType:'', dispose:null };
  window[INSTALL_KEY] = state;
  const now = () => performance.now();
  const stackOf = thread => Array.isArray(thread?.callStack) ? thread.callStack : [];
  const managedWarpFrames = thread => stackOf(thread).filter(frame =>
    frame?.type === 'custom' && (frame.warp === true || temporarilyYielded.has(frame))
  );

  function forceYield(thread, frames, block) {
    const live = frames.filter(frame => stackOf(thread).includes(frame) && frame.warp === true);
    if (!live.length || !window.Engine?.isRunning || thread.finished) return;
    if (stackOf(thread).some(frame => frame?.__gwChatGPTBudgetYield)) return;

    const t = now();
    for (const frame of live) {
      startedAt.set(frame,t);
      temporarilyYielded.add(frame);
      frame.warp = false;
    }

    // This one-iteration sentinel makes the interpreter return at its next
    // internal step boundary. left=2 yields now, and removes itself next step.
    thread.callStack.push({type:'loop',mode:'repeat',left:2,c:null,cur:null,i:0,__gwChatGPTBudgetYield:true});
    state.yieldCount++;
    state.lastYieldAt=t;
    state.lastBlockType=String(block?.dataset?.type || 'unknown');

    const resume=()=>{
      for(const frame of live){
        if(stackOf(thread).includes(frame) && frame.warp===false) frame.warp=true;
        temporarilyYielded.delete(frame);
        startedAt.set(frame,now());
      }
    };
    if(typeof window.queueMicrotask==='function') window.queueMicrotask(resume);
    else Promise.resolve().then(resume);
  }

  function budgetedExecuteBlock(block) {
    const thread=this, before=now(), frames=managedWarpFrames(thread);
    for(const frame of frames) if(!startedAt.has(frame)) startedAt.set(frame,before);
    let result;
    try { result=originalExecuteBlock.apply(thread,arguments); }
    finally {
      if(!frames.some(frame=>temporarilyYielded.has(frame))){
        const after=now();
        const live=frames.filter(frame=>stackOf(thread).includes(frame)&&frame.warp===true);
        if(live.length){
          const start=Math.min(...live.map(frame=>startedAt.get(frame)??before));
          if(after-start>=BUDGET_MS) forceYield(thread,live,block);
        }
      }
    }
    return result;
  }
  budgetedExecuteBlock.__gwChatGPTFrameBudget=true;
  ThreadClass.prototype.executeBlock=budgetedExecuteBlock;
  state.dispose=()=>{
    if(ThreadClass.prototype.executeBlock===budgetedExecuteBlock) ThreadClass.prototype.executeBlock=originalExecuteBlock;
    delete window[INSTALL_KEY];
  };
})();