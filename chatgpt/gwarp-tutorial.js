(() => {
  'use strict';
  // GWrap tutorial (ChatGPT team, v1.0). NOT wired into app.html yet.
  // To turn on later: add  <script src="chatgpt/gwarp-tutorial.js"></script>  before </body>,
  // then call  GW_TUTORIAL.start('basics')  (or 'code', or 'music').
  // Safety: no network, no eval, no storage writes. Lessons only highlight things on the page.
  // A "Do it" button can only click the buttons listed in ALLOWED, and only after the learner presses it.
  if (window.GW_TUTORIAL) return;                       // safe if loaded twice
  if (window.GW_FEATURE_OFF?.('tutorial')) return;      // switch-off key

  const $ = id => document.getElementById(id);

  // The only buttons a lesson may press. Anything else is ignored.
  const ALLOWED = {
    tabCode: 'gwMainTabCode',
    tabCostumes: 'gwMainTabCostumes',
    tabSounds: 'gwMainTabSounds',
    musicGenerate: 'gwMusicGenerate',
    musicPlay: 'gwMusicPlay',
    musicStop: 'gwMusicStop',
    musicAdd: 'gwMusicAddToSprite'
  };

  const LESSONS = {
    basics: {
      title: 'Basics: how G-Warp works',
      steps: [
        { title: 'Welcome', text: 'G-Warp works like Scratch: the same blocks give the same results. It has its own look. Press Next to go on, or Close at any time.' },
        { title: 'The Code tab', text: 'Scripts are made by snapping blocks together. Your code lives in the Code tab.', target: 'gwMainTabCode', action: { key: 'tabCode', label: 'Open Code' } },
        { title: 'Start and Stop', text: 'Start (the green flag) runs every script that begins with a flag block. Stop ends them all at once.', target: 'greenFlagBtn' },
        { title: 'Costumes', text: 'Costumes are the pictures a sprite can wear. Draw, import or edit them here.', target: 'gwMainTabCostumes', action: { key: 'tabCostumes', label: 'Open Costumes' } },
        { title: 'Sounds', text: 'Sounds are audio clips. Music Maker is at the top of this tab.', target: 'gwMainTabSounds', action: { key: 'tabSounds', label: 'Open Sounds' } }
      ]
    },
    code: {
      title: 'Code: your first script',
      steps: [
        { title: 'Build a script', text: 'Drag a "when green flag clicked" block into the code area. Then drag a "move 10 steps" block under it.', target: 'gwWorkbenchCodeRegion', action: { key: 'tabCode', label: 'Go to Code' } },
        { title: 'Run it', text: 'Press Start. Your sprite moves. Press Stop to end the scripts.', target: 'greenFlagBtn' },
        { title: 'Ask the helper', text: 'In the "What do you want to make?" box, type an idea such as "gravity" or "countdown", then press Add these blocks. Type /help to see every command.', target: 'gwAiAsk' },
        { title: 'Undo a mistake', text: 'Type /undo in the helper box to take back your last change.', target: 'gwAiAsk' }
      ]
    },
    music: {
      title: 'Music: make a loop',
      steps: [
        { title: 'Open the Sounds tab', text: 'Music Maker lives in the Sounds tab.', target: 'gwMainTabSounds', action: { key: 'tabSounds', label: 'Open Sounds' } },
        { title: 'Pick a style and mood', text: 'Style sets the genre, for example Lo-Fi or Synthwave. Mood sets the feel, for example Relaxed or Intense.', target: 'gwMusicStyle' },
        { title: 'Set speed and length', text: 'BPM is the speed: 120 is a steady beat. Duration is how long the loop is: 5 seconds, 4 bars or 8 bars.', target: 'gwMusicBpm' },
        { title: 'Pick a seed', text: 'The same seed gives the same tune. Press the dice button next to Generate for a new one.', target: 'gwMusicSeed' },
        { title: 'Generate a loop', text: 'This makes melody, bass, drums and chords. The status line under the buttons says what was made.', target: 'gwMusicGenerate', action: { key: 'musicGenerate', label: 'Generate Loop' } },
        { title: 'Listen', text: 'Play the loop. Loop is on by default, so it repeats until you press Stop.', target: 'gwMusicPlay', action: { key: 'musicPlay', label: 'Play' } },
        { title: 'Save it to a sprite', text: 'This renders a WAV file and adds it to the selected sprite\'s sounds.', target: 'gwMusicAddToSprite', action: { key: 'musicAdd', label: 'Add Mix to Sprite Sounds' } },
        { title: 'Play it in a script', text: 'Go to the Code tab and use a play-sound block with your new sound. Press Start to hear it.', action: { key: 'tabCode', label: 'Go to Code' } }
      ]
    }
  };

  const state = { track: null, i: 0, marked: null };
  let card = null;

  function clearMark() {
    if (state.marked) { state.marked.el.style.outline = state.marked.prev; state.marked = null; }
  }

  function mark(id) {
    clearMark();
    const el = id && $(id);
    if (!el) return;
    state.marked = { el, prev: el.style.outline };
    el.style.outline = '3px solid #4ade80';
    el.scrollIntoView?.({ block: 'nearest' });
  }

  function ensureCard() {
    if (card) return card;
    card = document.createElement('section');
    card.id = 'gwTutorialCard';
    card.setAttribute('role', 'dialog');
    card.setAttribute('aria-live', 'polite');
    card.style.cssText = 'position:fixed;right:16px;bottom:16px;z-index:99999;width:300px;max-width:calc(100vw - 32px);background:#0f172a;color:#e2e8f0;border:2px solid #8b5cf6;border-radius:12px;padding:14px;font:13px/1.45 system-ui,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.5)';
    document.body.appendChild(card);
    return card;
  }

  function button(label, onClick, primary) {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = label;
    b.style.cssText = `padding:6px 10px;margin:4px 4px 0 0;border-radius:8px;border:1px solid ${primary ? '#4ade80' : '#475569'};background:${primary ? '#14532d' : '#1e293b'};color:#f8fafc;cursor:pointer`;
    b.addEventListener('click', onClick);
    return b;
  }

  function render() {
    const lesson = LESSONS[state.track];
    const step = lesson.steps[state.i];
    const c = ensureCard();
    c.textContent = '';

    const head = document.createElement('div');
    head.style.cssText = 'font-size:11px;color:#a78bfa;font-weight:bold;margin-bottom:4px';
    head.textContent = `${lesson.title}  (${state.i + 1}/${lesson.steps.length})`;

    const title = document.createElement('h3');
    title.style.cssText = 'margin:0 0 6px;font-size:15px;color:#4ade80';
    title.textContent = step.title;

    const text = document.createElement('p');
    text.style.margin = '0 0 8px';
    text.textContent = step.text;

    const row = document.createElement('div');
    if (step.action) row.appendChild(button(step.action.label, () => doAction(step.action.key)));
    row.appendChild(button('Back', prev));
    const last = state.i === lesson.steps.length - 1;
    row.appendChild(button(last ? 'Finish' : 'Next', next, true));
    row.appendChild(button('Close', stop));

    c.append(head, title, text, row);
    mark(step.target);
  }

  // Only the allow-listed buttons can be pressed.
  function doAction(key) {
    if (!Object.prototype.hasOwnProperty.call(ALLOWED, key)) return;
    $(ALLOWED[key])?.click();
  }

  function start(track) {
    if (!Object.prototype.hasOwnProperty.call(LESSONS, track)) return false;
    state.track = track;
    state.i = 0;
    render();
    return true;
  }

  function next() {
    const lesson = LESSONS[state.track];
    if (!lesson) return;
    if (state.i >= lesson.steps.length - 1) { stop(); return; }
    state.i++;
    render();
  }

  function prev() {
    if (!LESSONS[state.track] || state.i === 0) return;
    state.i--;
    render();
  }

  function stop() {
    clearMark();
    if (card) { card.remove(); card = null; }
    state.track = null;
  }

  // Escape closes the lesson while it is open.
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && state.track) stop();
  });

  window.GW_TUTORIAL = {
    start,
    next,
    prev,
    stop,
    tracks: () => Object.keys(LESSONS).map(id => ({ id, title: LESSONS[id].title, steps: LESSONS[id].steps.length })),
    lessons: LESSONS
  };
})();
