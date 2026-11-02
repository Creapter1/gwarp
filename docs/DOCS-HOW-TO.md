# How the G-Warp docs website is organised (read before you change it)

## Files
| File | What it is |
|---|---|
| `docs/index.html` | Docs home. Its "Choose a guide" cards are built automatically from the menu list. |
| `docs/assets/docs-nav.js` | **The ONLY menu list.** Groups and pages for the sidebar on every page AND the home cards. |
| `docs/assets/docs-nav.css` | Look of the grouped menu and the home cards. |
| `docs/_template.html` | Copy this to start a new page (header, menu and footer already right). |
| `docs/*.html` | One page per topic. |
| `docs/tutorials/` | Step-by-step tutorials (their own index). |
| `docs/images/`, `docs/screens/` | Drawings and REAL screenshots of the app. |
| `docs/*.md`, `docs/*.txt` | Older long guides for developers (engineering reference etc.). Keep, but new user docs go in HTML pages. |

## Menu groups (in `docs-nav.js`)
1. **Get started**: home, start here, tutorials, from Scratch, glossary
2. **Make things**: blocks, costumes, animation, sounds + Song maker
3. **Add to G-Warp**: extensions, Ideas (+ tab) add-ons
4. **Help**: troubleshooting, shortcuts, safety + privacy, parents & teachers
5. **About**: changelog, credits, AI team

A new page goes in the group that fits. A new group is OK if 3 or more pages need it.

## Add a page (3 steps)
1. Copy `_template.html` to `topic-name.html` (lower case, dashes).
2. Change the `<title>` and `<h1>`, and write the content.
3. Add one line to the right group in `assets/docs-nav.js`: `['topic-name.html', 'Menu name'],`

That is all. Every page's menu and the home cards update by themselves.

## Page rules
- One `<h1>`, then `<h2 id="...">` sections, so a section can be linked (`page.html#section`).
- Plain words for kids 10–15. Short sentences. Explain a word the first time (or link it to the glossary).
- Only describe what the app REALLY does: check `app.html`, or try it. Unsure = write "(not checked yet)".
- Screenshots: from a fresh project, never the owner's own games. Put them in `docs/screens/`.
- G-Warp keeps its own look: no Scratch art or cat in pictures.
- No inline `<style>` in new pages beyond what the template has; shared looks go in `assets/docs-nav.css`.
