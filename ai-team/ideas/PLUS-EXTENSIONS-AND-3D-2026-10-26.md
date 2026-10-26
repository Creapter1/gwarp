# Owner's ideas, 2026-10-26 11:52 — IDEAS ONLY (not being built yet)

Owner: *"This is just a plan ... just an idea that's still running around."*

## 1. "Plus" extensions for the Costume maker and the Music maker

People can add something "more crazy" to the **Costumes** editor and the **Song maker / Spark Studio**: a new brush, a new effect, a new
instrument, a new beat style, a new level effect. This connects to **Tab Plus** (`TAB-PLUS-2026-10-26.md`): a Plus extension can bring
its own tools or its own tab.

**Needed first (before anyone can make one):** a small, safe G-Warp **Plus API**. It's a fixed list of things an add-on may do. For
example: add a brush/effect to the paint editor, add an instrument/sound generator, add a beat pattern, add a level effect for Spark
Studio. Add-ons get no access to the internet, the project's other data or the page. They must be marked Safe/Moderate/Dangerous like
extensions, and they must never run JavaScript blocks in projects. (Claude designs it when the owner says go; ChatGPT reviews it.)

## 2. The "any AI" prompt that FIRST asks "What are you trying to make?"

Owner: one prompt anybody can paste into **any** AI, paid or free. The AI must **not** start working. Its first answer must be the
question *"What are you trying to make?"*. Then it builds the Plus extension from the user's answer, with rules so it doesn't add useless
stuff and only fixes what is there.

**DRAFT** (finished once the Plus API exists; the parts in <...> get filled then):

```
You are helping someone make a "Plus" add-on for G-Warp, a free block-coding app for kids (like Scratch).
IMPORTANT: Do NOT write any code yet. Your FIRST reply must be exactly this question and nothing else:
"What are you trying to make? (for example: a glitter brush for costumes, a new drum style for the Song maker)"

After they answer:
1. Repeat back in 1-2 short sentences what you will make. Ask ONE question only if something important is missing.
2. Make it using ONLY the G-Warp Plus API below. One file. Plain JavaScript. No other libraries. No internet. No network requests.
3. Rules:
   - Make exactly what they asked. Do not add extra features, menus, settings or "bonus" ideas.
   - Keep it small and simple. Prefer 50 good lines over 500.
   - When they ask for a change or report a bug: fix ONLY that. Don't rewrite or "improve" other parts.
   - No personal data, no logins, no tracking, no ads, nothing scary or rude. It is for kids.
   - No Scratch cat, no other company's characters, logos or brands. No "made by AI" text.
   - Never use eval, new Function, fetch, XMLHttpRequest, WebSocket or anything that reaches outside G-Warp.
4. Then tell them in 3 steps how to add it: <G-Warp: Costumes or Song maker → Plus (+) → Add from file / paste code>.
5. If they say it doesn't work: ask what they saw (error text or what happened), then fix only that.

G-Warp Plus API:
<filled in when Claude makes the API: register(), paint tools, sound/instrument generator, beat pattern, level effect, limits>
```

## 3. G-Warp 3D (far future)

After G-Warp matches Scratch, make **the same app in 3D**: the same blocks, but sprites and the stage in 3D.
- **Online:** a basic, simple 3D runner in the browser.
- **Full 3D:** the downloaded desktop version (`GWARP-DESKTOP-EXE-2026-10-26.md`).
- Basic but fun. The owner will think about it more later. Related: the "3D vector" costume idea in `../FUTURE-IDEAS.txt` / the airplane notes.
