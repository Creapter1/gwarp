Claude's browser tests (Playwright + Chromium). Run: NODE_PATH=<playwright> node test_cos.js ../../app.html
harness.js serves Tailwind/Font Awesome/JSZip offline (needs local copies; see the file).
test_cos.js  = costume editor checklist (DeepSeek's CHECKLIST-costumes.txt, run for real) - 20 checks
test_4600.js = chaos/clone-freeze guard   test_4601.js = Report a bug   test_4611.js = #scratch links
test_4700.js = "item # of" gives the same answers as Scratch compare (13,200 random cases)
test_4640.js = Power lines: node test_4640.js ../../app.html <powerlines.sb3> [shot.png] (wires while running, sparks, Stop clears, switch, zoom, clicks pass through)
test_cosanim.js = costume animation: Animation tab for everyone, G-Spark walk/wave, stale frames, rename, blocks, rigging a drawn costume, Onion skin + Flipbook Play (27 checks)
smoke.js = node smoke.js ../../app.html <project.sb3> [shot.png] : load, Start, 6 s -> load time, FPS, worst frame, clones, unsupported blocks, Stop time, errors (used for the private test projects)
test_select.js = costume Select tool: move/resize/rotate every shape type, undo, marquee, arrows, zoom, costume switch, grow-to-fit, Paint new placement, group/ungroup, flip, circle reshape, Bitmap Select
test_grok_anim.js = Grok's GA1 costume fixtures (node test_grok_anim.js ../../app.html ../../grok/ANIM-FIXTURES.json)
test_grok_fixtures.js = Grok's GR1 parity fixtures + extra-fixtures.json (node test_grok_fixtures.js ../../app.html ../../grok/fixtures.json)
