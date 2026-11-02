# How to make a G-Warp IDEA (a "+" tab add-on)
For Helken (Freebuff) or any AI. Owner: Creapter. Read this, then make ONE file.

## What an idea is
A small app the owner wants to TRY inside G-Warp before it is built in for real. It shows in the green **＋** tab:
- **Costumes** tab: the ＋ next to Animation
- **Sounds** tab: the ＋ next to Tone test (after Song maker)

The ＋ shows only in **Developer mode** (More → Settings → Developer mode). The owner presses **Load idea…** and picks your file. It runs in its own frame, so it can never break G-Warp. If it is bad, he presses **Remove**.

## The file (pick one)
**A. One HTML file** (`.html`, or `.txt` with the same content). This is the best choice.
```html
<!doctype html><html><head>
<title>Bone helper</title>                              <!-- the name on the tab (40 letters max) -->
<meta name="gw-area" content="costumes">                <!-- costumes | sounds -->
<meta name="gw-icon" content="🦴">                      <!-- one emoji -->
<style> body{margin:0;padding:16px;background:#0b0f1d;color:#e5e7eb;font:600 14px system-ui} </style>
</head><body>
  ... your app ...
<script> /* use window.GW (below) */ </script>
</body></html>
```
**B. JSON:** `{ "name": "...", "area": "costumes", "icon": "🦴", "html": "<!doctype html>..." }`, or use `"css"`, `"body"` and `"js"` instead of `"html"`.

Everything goes in ONE file: no other files, and no internet links (it must work offline). Pictures are inline SVG or data: URLs.

## What your idea can use: `window.GW`
| Call | What it does |
|---|---|
| `GW.sprite()` | the selected sprite (`name`, `x`, `y`, `costumes[]`, `sounds[]`, `gwAnimations[]`, …). READ it; do not change it directly |
| `GW.engine()` | the whole engine (`sprites`, `variables`, `lists`, …), read only |
| `GW.project()` | the whole project as data (a copy) |
| `GW.addCostumeSVG(svgText, name)` | adds a NEW costume (SVG) to the selected sprite. This is the safe way to give G-Warp a drawing |
| `GW.playNote(midi, seconds, volume)` | plays a note with the instrument picked in Sounds → Instruments (60 = middle C) |
| `GW.song()` | the Song maker (`setMyPart(layer, notes)`, `play()`, `stop()`, `state`) |
| `GW.anim()` | the Animation editor (read its `state` to show things) |
| `GW.toast("text")` | shows a small message in G-Warp |

## Rules
1. Plain words a 10–15-year-old understands. Every button gets a `title` tooltip.
2. Dark look like G-Warp: background `#0b0f1d`, text `#e5e7eb`, purple `#8b5cf6`, green `#4ade80`. Costumes ideas may use green; music ideas use red (`#ef4444`).
3. It must fit any size (it fills the editor area) and work at 1000×700.
4. Never delete or overwrite the user's things. Only ADD (a new costume, a new sound, a new part).
5. No `alert()` / `prompt()`. Use your own small boxes.
6. Test it: open the file in Chrome by itself first (with `window.GW` missing it should say "Open me in G-Warp's ＋ tab" and not crash).
7. Save it as `ai all worcks\g-warp-ideas\<area>-<short-name>.html`, plus a 3-line `<same name>.txt`: what it does, how to test it, and what is not done.

## Example
`star-maker.html` (in this folder): pick the number of points and a colour, then **Add as a costume**.

## When the owner likes an idea 100%
He tells Claude: "build <idea> in for real". The idea file is the spec and a working demo, and it then becomes part of the real editor.
