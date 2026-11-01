(() => {
  'use strict';
  // GWrap AI knowledge pack (ChatGPT/Claude team, v1.0).
  // Adds 5 recipes + 2 tips to the GWrap AI helper, and a small set of SAFE
  // slash commands typed in the “What do you want to make?” box.
  // It never runs code, never sends data anywhere, and only clicks buttons
  // that already exist in app.html.
  if (window.GW_AI_PACK) return;                       // safe if loaded twice
  if (window.GW_FEATURE_OFF?.('gwAiPack')) return;     // switch-off key

  const $ = id => document.getElementById(id);
  const V = () => window.GW_V1571;                     // exposed by app.html
  const TABS = { code: 'gwMainTabCode', costumes: 'gwMainTabCostumes', sounds: 'gwMainTabSounds' };
  const COMMANDS = ['/help', '/start', '/stop', '/undo', '/check', '/open code|costumes|sounds', '/add <idea>'];

  function say(msg, kind) {
    const s = $('gwAiStatus'); if (!s) return;
    s.textContent = msg; s.dataset.kind = kind || '';
  }

  function recipes(B) {
    const { blk, cblk, ifEdge, firstSound } = B;
    return [
      { id: 'gravity', emoji: '🪂', title: 'Fall with gravity', keys: ['gravity', 'fall', 'falling', 'drop', 'platformer', 'weight', 'heavy'],
        steps: ['When the green flag is clicked…', 'keep going forever,', 'and move down 3 steps each time. Pair it with “Jump when space is pressed”.'],
        build: () => [[blk('when_flag'), cblk('forever', [blk('change_y', ['-3'])])]] },
      { id: 'shake', emoji: '📳', title: 'Shake when clicked', keys: ['shake', 'wobble', 'tremble', 'vibrate', 'shiver', 'rattle'],
        steps: ['When clicked, move 5 steps right 10 times,', 'then 5 steps left 10 times, so it ends where it started.'],
        build: () => [[blk('when_clicked'), cblk('repeat', [blk('change_x', ['5'])], ['10']), cblk('repeat', [blk('change_x', ['-5'])], ['10'])]] },
      { id: 'click-sound', emoji: '🔊', title: 'Play a sound when clicked', keys: ['pop', 'boop', 'click', 'sound', 'noise', 'beep', 'effect'],
        steps: ['When the sprite is clicked, play its first sound.', 'Add or record more sounds in the Sounds tab.'],
        build: () => [[blk('when_clicked'), blk('play_sound', [], [firstSound()])]] },
      { id: 'countdown', emoji: '⏱️', title: 'Countdown from 10', keys: ['countdown', 'timer', 'count', 'down', 'clock', 'seconds', 'time', 'limit'],
        steps: ['Make a variable called countdown and show it.', 'When the green flag is clicked, set it to 10.', 'Repeat 10 times: wait 1 second, then subtract 1.'],
        prep: () => { try { if (!Object.prototype.hasOwnProperty.call(window.Engine?.variables || {}, 'countdown')) window.GW?.createVariable?.('countdown'); } catch {} },
        build: () => [[blk('when_flag'), blk('set_var', ['10'], ['countdown']), blk('show_var', [], ['countdown']),
          cblk('repeat', [blk('wait', ['1']), blk('change_var', ['-1'], ['countdown'])], ['10'])]] },
      { id: 'turn-away', emoji: '↪️', title: 'Turn away from the edge', keys: ['turn', 'bounce', 'away', 'edge', 'reverse', 'border', 'wall'],
        steps: ['Keep moving forever.', 'If the sprite touches the edge, turn around by 180 degrees.'],
        build: () => [[blk('when_flag'), cblk('forever', [blk('move', ['4']), ifEdge([blk('turn_cw', ['180'])])])]] }
    ];
  }

  function tips() {
    return [
      { id: 'tip-start', emoji: '🚩', title: 'Start and stop your game', keys: ['start', 'run', 'play', 'stop', 'test', 'green', 'flag', 'begin', 'go'],
        text: 'Press the green flag (Start) to run every script that begins with a flag block. Press Stop to end them all at once.',
        action: ['Press Start', () => $('greenFlagBtn')?.click()] },
      { id: 'tip-commands', emoji: '⌨️', title: 'Type commands', keys: ['command', 'commands', 'help', 'slash', 'shortcut', 'shortcuts'],
        text: 'In the box above, type a slash command: /start, /stop, /undo, /check, /open code, /open costumes, /open sounds, /add followed by an idea, or /help. These are the only things the helper runs.',
        action: ['Show commands', () => showHelp()] }
    ];
  }

  function showHelp() {
    const box = $('gwAiAnswer'); if (!box) return;
    box.innerHTML = '';
    const card = document.createElement('div');
    card.className = 'gw7-ai-card'; card.dataset.kind = 'tip';
    const b = document.createElement('b'); b.textContent = '⌨️ Commands'; card.appendChild(b);
    const p = document.createElement('p');
    p.textContent = 'These are the only commands I run. I never run code.';
    card.appendChild(p);
    const ul = document.createElement('ul');
    COMMANDS.forEach(c => { const li = document.createElement('li'); li.textContent = c; ul.appendChild(li); });
    card.appendChild(ul);
    box.appendChild(card);
    say('Type a command in the box and press Enter.', 'ok');
  }

  // Safe runner: a fixed list of actions. Anything else is refused.
  function run(text) {
    const [cmd = '', ...rest] = text.slice(1).trim().toLowerCase().split(/\s+/);
    const arg = rest.join(' ');
    switch (cmd) {
      case 'help': showHelp(); return;
      case 'start': $('greenFlagBtn')?.click(); say('Started. Press Stop to end the scripts.', 'ok'); return;
      case 'stop': $('stopBtn')?.click(); say('Stopped all scripts.', 'ok'); return;
      case 'undo': try { window.GW8?.undo?.(); say('Undid the last change.', 'ok'); } catch { say('Nothing to undo.', 'warn'); } return;
      case 'check': { const f = V()?.checkProject?.() || []; say(f.length ? 'Checked. See the results below “Check my project”.' : 'Nothing to check yet.', 'ok'); return; }
      case 'open': {
        const id = TABS[arg];
        if (!id) { say('I can open: code, costumes, sounds. Example: /open costumes', 'warn'); return; }
        $(id)?.click(); say(`Opened ${arg}.`, 'ok'); return;
      }
      case 'add': {
        const hit = (V()?.match?.(arg) || []).find(x => x.kind === 'recipe');
        if (!arg || !hit) { say('No idea matches that yet. Try /help, or pick one of the ideas above.', 'warn'); return; }
        V().addRecipe(hit.r.id); return;
      }
      default:
        say(`I can’t run “/${cmd}”. Commands: /start, /stop, /undo, /check, /open, /add, /help. I never run code.`, 'warn');
    }
  }

  // Intercept only slash commands; normal questions still go to the built-in matcher.
  document.addEventListener('submit', e => {
    const input = $('gwAiAsk');
    if (!input || e.target !== input.form) return;
    const text = input.value.trim();
    if (!text.startsWith('/')) return;
    e.preventDefault(); e.stopImmediatePropagation();
    input.value = '';
    run(text);
  }, true);

  // Show a chip for each new recipe that doesn't already have one.
  function addChips(list) {
    const box = document.querySelector('#sec-gwrap .gw7-ai-chips');
    if (!box) return false;
    list.forEach(r => {
      if (box.querySelector(`[data-recipe="${r.id}"]`)) return;
      const btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'gw7-ai-chip'; btn.setAttribute('role', 'listitem');
      btn.dataset.recipe = r.id; btn.textContent = r.emoji + ' ' + r.title;
      btn.addEventListener('click', () => V()?.showAnswer?.([{ r, kind: 'recipe' }]));
      box.appendChild(btn);
    });
    return true;
  }

  function init() {
    const v = V(); if (!v?.blocks || !Array.isArray(v.recipes)) return false;
    const added = recipes(v.blocks);
    added.forEach(r => { if (!v.recipes.some(x => x.id === r.id)) v.recipes.push(r); });
    tips().forEach(t => { if (!v.tips.some(x => x.id === t.id)) v.tips.push(t); });
    const placed = addChips(added);
    window.GW_AI_PACK = { version: '1.0', commands: COMMANDS, run, recipes: added.map(r => r.id) };
    return placed;
  }

  // app.html builds the helper late, so wait for both it and the helper section.
  let tries = 0;
  const timer = setInterval(() => {
    tries++;
    const ready = init();
    if (ready || tries > 80) clearInterval(timer);
  }, 250);
})();
