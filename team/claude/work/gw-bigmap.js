/* gw-bigmap.js - Big map (parallax): a tool that builds a big, scrolling, wrap-around map out of picture layers.
   Claude, 23 Nov 2026 (owner: "the map is 2D so it will calculate a location ... to make it look like the parallax that moves";
   "don't create the game, create the tools so someone else can use them to create the game").

   You pick a picture for every layer (your own vector costumes / backdrops, or the example pictures), set how fast each
   layer follows the camera, and drag the live preview to see the parallax and the wrap-around. "Add to project" then adds
   one sprite per layer with the code already written in plain Scratch blocks (no extension, Scratch-compatible):
   global variables "cam x" / "cam y" (your own code moves the camera) and "world width". A picture wider than the stage
   is cut into stage-wide pieces (exact vector cuts), so a really big map works too. Nothing else in the project is touched.
   Developer mode only until the owner approves it. Kill switch: localStorage['gwarp-off-bigmap'] = '1'.
   1.1.0 (same day): the Stage sends "map: draw" every frame and everything on the map draws then, so the map and the
   sprites always use the same camera. "Sprites on the map": the player (the camera follows it, try-out arrow keys) and
   world objects (enemies, coins...) get world x / world y and plain Scratch code on the user's own sprites.
   API: window.GW_BIGMAP { open, pieces, layerScripts, worldScripts, stageScripts, add }. */
(function () {
  'use strict';
  try { if (localStorage.getItem('gwarp-off-bigmap') === '1') return; } catch (e) {}
  if (window.GW_BIGMAP) return;
  var EXAMPLES = {"Mountains": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"480\" height=\"200\" viewBox=\"0 0 480 200\"><g id=\"far\"><path d=\"M0 120 L40 59 L82 46 L114 108 L147 86 L195 47 L254 104 L290 44 L322 95 L365 48 L402 51 L449 94 L480 120 L480 200 L0 200 Z\" fill=\"#93c5fd\"/></g><g id=\"near\"><path d=\"M0 148 L40 100 L82 83 L114 141 L147 115 L195 89 L254 142 L290 78 L322 125 L365 91 L402 90 L449 129 L480 151 L480 200 L0 200 Z\" fill=\"#60a5fa\" opacity=\".8\"/></g></svg>", "Clouds": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"480\" height=\"140\" viewBox=\"0 0 480 140\" opacity=\".92\"><g transform=\"translate(70 60) scale(1.0)\"><ellipse cx=\"0\" cy=\"10\" rx=\"44\" ry=\"16\" fill=\"#ffffff\"/><circle cx=\"-16\" cy=\"0\" r=\"18\" fill=\"#ffffff\"/><circle cx=\"10\" cy=\"-6\" r=\"22\" fill=\"#ffffff\"/><ellipse cx=\"0\" cy=\"18\" rx=\"40\" ry=\"6\" fill=\"#dbeafe\"/></g><g transform=\"translate(210 95) scale(0.7)\"><ellipse cx=\"0\" cy=\"10\" rx=\"44\" ry=\"16\" fill=\"#ffffff\"/><circle cx=\"-16\" cy=\"0\" r=\"18\" fill=\"#ffffff\"/><circle cx=\"10\" cy=\"-6\" r=\"22\" fill=\"#ffffff\"/><ellipse cx=\"0\" cy=\"18\" rx=\"40\" ry=\"6\" fill=\"#dbeafe\"/></g><g transform=\"translate(330 45) scale(1.2)\"><ellipse cx=\"0\" cy=\"10\" rx=\"44\" ry=\"16\" fill=\"#ffffff\"/><circle cx=\"-16\" cy=\"0\" r=\"18\" fill=\"#ffffff\"/><circle cx=\"10\" cy=\"-6\" r=\"22\" fill=\"#ffffff\"/><ellipse cx=\"0\" cy=\"18\" rx=\"40\" ry=\"6\" fill=\"#dbeafe\"/></g><g transform=\"translate(430 100) scale(0.6)\"><ellipse cx=\"0\" cy=\"10\" rx=\"44\" ry=\"16\" fill=\"#ffffff\"/><circle cx=\"-16\" cy=\"0\" r=\"18\" fill=\"#ffffff\"/><circle cx=\"10\" cy=\"-6\" r=\"22\" fill=\"#ffffff\"/><ellipse cx=\"0\" cy=\"18\" rx=\"40\" ry=\"6\" fill=\"#dbeafe\"/></g></svg>", "City": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"480\" height=\"220\" viewBox=\"0 0 480 220\"><rect x=\"6\" y=\"89\" width=\"27\" height=\"131\" fill=\"#475569\"/><rect x=\"11\" y=\"109\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"11\" y=\"121\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"20\" y=\"121\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"20\" y=\"133\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"11\" y=\"145\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"20\" y=\"145\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"20\" y=\"169\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"45\" y=\"72\" width=\"46\" height=\"148\" fill=\"#1e293b\"/><rect x=\"50\" y=\"80\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"50\" y=\"92\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"59\" y=\"92\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"77\" y=\"92\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"59\" y=\"104\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"68\" y=\"104\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"77\" y=\"104\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"59\" y=\"116\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"68\" y=\"116\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"77\" y=\"116\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"50\" y=\"128\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"59\" y=\"128\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"77\" y=\"128\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"50\" y=\"140\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"59\" y=\"140\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"68\" y=\"140\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"50\" y=\"152\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"68\" y=\"152\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"68\" y=\"164\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"77\" y=\"164\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"101\" y=\"4\" width=\"44\" height=\"216\" fill=\"#334155\"/><rect x=\"124\" y=\"12\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"106\" y=\"24\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"115\" y=\"36\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"124\" y=\"36\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"106\" y=\"48\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"115\" y=\"48\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"124\" y=\"48\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"133\" y=\"48\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"106\" y=\"60\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"124\" y=\"60\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"133\" y=\"60\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"106\" y=\"72\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"124\" y=\"72\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"133\" y=\"72\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"106\" y=\"84\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"106\" y=\"96\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"115\" y=\"96\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"124\" y=\"96\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"115\" y=\"108\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"124\" y=\"108\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"133\" y=\"108\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"106\" y=\"120\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"115\" y=\"120\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"133\" y=\"120\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"106\" y=\"132\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"115\" y=\"132\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"124\" y=\"132\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"124\" y=\"144\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"115\" y=\"156\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"124\" y=\"168\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"133\" y=\"168\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"149\" y=\"18\" width=\"41\" height=\"202\" fill=\"#334155\"/><rect x=\"154\" y=\"26\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"172\" y=\"26\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"181\" y=\"26\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"163\" y=\"38\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"181\" y=\"38\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"172\" y=\"50\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"181\" y=\"50\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"154\" y=\"62\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"154\" y=\"74\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"163\" y=\"74\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"172\" y=\"74\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"154\" y=\"86\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"163\" y=\"86\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"172\" y=\"86\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"163\" y=\"98\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"181\" y=\"98\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"154\" y=\"110\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"172\" y=\"110\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"172\" y=\"122\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"154\" y=\"134\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"172\" y=\"134\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"154\" y=\"146\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"163\" y=\"146\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"172\" y=\"146\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"181\" y=\"146\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"154\" y=\"170\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"163\" y=\"170\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"172\" y=\"170\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"196\" y=\"-6\" width=\"42\" height=\"226\" fill=\"#1e293b\"/><rect x=\"228\" y=\"2\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"201\" y=\"14\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"219\" y=\"14\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"210\" y=\"26\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"228\" y=\"26\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"201\" y=\"38\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"210\" y=\"38\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"219\" y=\"38\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"228\" y=\"38\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"219\" y=\"50\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"201\" y=\"62\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"228\" y=\"62\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"201\" y=\"74\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"219\" y=\"74\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"201\" y=\"86\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"219\" y=\"86\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"210\" y=\"98\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"228\" y=\"98\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"201\" y=\"110\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"219\" y=\"110\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"201\" y=\"122\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"201\" y=\"134\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"219\" y=\"134\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"228\" y=\"134\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"201\" y=\"146\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"228\" y=\"146\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"210\" y=\"158\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"228\" y=\"158\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"210\" y=\"170\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"219\" y=\"170\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"228\" y=\"170\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"250\" y=\"54\" width=\"36\" height=\"166\" fill=\"#3f4a5e\"/><rect x=\"264\" y=\"62\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"255\" y=\"86\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"255\" y=\"98\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"264\" y=\"98\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"273\" y=\"98\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"264\" y=\"122\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"273\" y=\"122\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"264\" y=\"134\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"273\" y=\"134\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"264\" y=\"146\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"273\" y=\"146\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"273\" y=\"158\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"255\" y=\"170\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"264\" y=\"170\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"273\" y=\"170\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"296\" y=\"113\" width=\"43\" height=\"107\" fill=\"#334155\"/><rect x=\"301\" y=\"121\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"319\" y=\"121\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"328\" y=\"121\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"310\" y=\"133\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"319\" y=\"133\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"328\" y=\"133\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"301\" y=\"157\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"301\" y=\"169\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"310\" y=\"169\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"319\" y=\"169\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"328\" y=\"169\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"345\" y=\"102\" width=\"39\" height=\"118\" fill=\"#475569\"/><rect x=\"377\" y=\"110\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"368\" y=\"122\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"359\" y=\"134\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"377\" y=\"134\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"350\" y=\"146\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"377\" y=\"146\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"350\" y=\"158\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"359\" y=\"158\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"368\" y=\"158\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"377\" y=\"158\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"350\" y=\"170\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"368\" y=\"170\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"394\" y=\"22\" width=\"26\" height=\"198\" fill=\"#1e293b\"/><rect x=\"399\" y=\"30\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"408\" y=\"30\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"408\" y=\"42\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"408\" y=\"54\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"408\" y=\"66\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"399\" y=\"78\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"399\" y=\"90\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"399\" y=\"126\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"408\" y=\"126\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"399\" y=\"138\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"408\" y=\"138\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"399\" y=\"150\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"408\" y=\"150\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"408\" y=\"162\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"424\" y=\"116\" width=\"34\" height=\"104\" fill=\"#334155\"/><rect x=\"438\" y=\"124\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"429\" y=\"136\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"447\" y=\"136\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"429\" y=\"148\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"429\" y=\"160\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"438\" y=\"160\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"447\" y=\"160\" width=\"4\" height=\"5\" fill=\"#fde68a\" opacity=\".85\"/><rect x=\"0\" y=\"196\" width=\"480\" height=\"24\" fill=\"#1e293b\"/></svg>", "Ground": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"480\" height=\"120\" viewBox=\"0 0 480 120\"><rect x=\"0\" y=\"0\" width=\"480\" height=\"120\" fill=\"#4d7c0f\"/><rect x=\"0\" y=\"0\" width=\"480\" height=\"10\" fill=\"#84cc16\"/><rect x=\"0\" y=\"22\" width=\"480\" height=\"26\" fill=\"#3f3f46\"/><rect x=\"14\" y=\"33\" width=\"44\" height=\"4\" fill=\"#fafafa\"/><rect x=\"94\" y=\"33\" width=\"44\" height=\"4\" fill=\"#fafafa\"/><rect x=\"174\" y=\"33\" width=\"44\" height=\"4\" fill=\"#fafafa\"/><rect x=\"254\" y=\"33\" width=\"44\" height=\"4\" fill=\"#fafafa\"/><rect x=\"334\" y=\"33\" width=\"44\" height=\"4\" fill=\"#fafafa\"/><rect x=\"414\" y=\"33\" width=\"44\" height=\"4\" fill=\"#fafafa\"/><circle cx=\"20\" cy=\"78\" r=\"6\" fill=\"#365314\"/><circle cx=\"60\" cy=\"90\" r=\"9\" fill=\"#365314\"/><circle cx=\"100\" cy=\"102\" r=\"6\" fill=\"#365314\"/><circle cx=\"140\" cy=\"78\" r=\"9\" fill=\"#365314\"/><circle cx=\"180\" cy=\"90\" r=\"6\" fill=\"#365314\"/><circle cx=\"220\" cy=\"102\" r=\"9\" fill=\"#365314\"/><circle cx=\"260\" cy=\"78\" r=\"6\" fill=\"#365314\"/><circle cx=\"300\" cy=\"90\" r=\"9\" fill=\"#365314\"/><circle cx=\"340\" cy=\"102\" r=\"6\" fill=\"#365314\"/><circle cx=\"380\" cy=\"78\" r=\"9\" fill=\"#365314\"/><circle cx=\"420\" cy=\"90\" r=\"6\" fill=\"#365314\"/><circle cx=\"460\" cy=\"102\" r=\"9\" fill=\"#365314\"/></svg>"};
  var TILE = 480, OVER = 2;          /* every piece is 480 wide (+2 px overlap so no hairline seam shows, even when smoothed) */
  function devOn() { try { return !window.GW_DEV_MODE || window.GW_DEV_MODE.isOn(); } catch (e) { return true; } }
  function by(id) { return document.getElementById(id); }
  function toast(t) { try { if (window.GW_TOAST) return window.GW_TOAST(t); } catch (e) {} var d = document.createElement('div'); d.className = 'gwbm-toast'; d.textContent = t; document.body.appendChild(d); setTimeout(function () { d.remove(); }, 3000); }
  function fx(n) { return (Math.round(n * 1000) / 1000).toString(); }
  function mod(a, b) { return ((a % b) + b) % b; }     /* like Scratch's mod: never negative */

  /* ---------- pictures -> pieces ----------
     side  : a layer that repeats left/right (sky, hills, city): the picture is scaled evenly to a whole number of 480-wide pieces.
     giant : a giant map that scrolls in X and Y: cut into a grid of 480 x 360 pieces at its own size (no scaling).
     Every piece only keeps the shapes that touch it (big maps stay small), is clipped to its own window, and gets a
     transparent 24 px margin: Scratch pushes a sprite that is (almost) off the stage back in ("fencing"), and the margin
     keeps every piece's box over the stage so that never happens. The window is 2 px wider so no hairline seam shows. */
  var PAD = 24, CELL_H = 360;
  function measure(root) {
    var host = document.createElement('div'); host.style.cssText = 'position:fixed;left:-10000px;top:-10000px;width:10px;height:10px;overflow:hidden;visibility:hidden;pointer-events:none';
    var live = document.importNode(root, true); host.appendChild(live); document.body.appendChild(host);
    try {
      var inv = live.getScreenCTM(); inv = inv && inv.inverse(); var boxes = [];
      for (var i = 0; i < live.childNodes.length; i++) {
        var c = live.childNodes[i], b = null;
        if (c.nodeType === 1 && inv && c.getBBox) { try { var bb = c.getBBox(), m = inv.multiply(c.getScreenCTM()), sw = 0; try { sw = parseFloat(getComputedStyle(c).strokeWidth) || 0; } catch (e) {}
          [[bb.x, bb.y], [bb.x + bb.width, bb.y], [bb.x, bb.y + bb.height], [bb.x + bb.width, bb.y + bb.height]].forEach(function (p) { var x = m.a * p[0] + m.c * p[1] + m.e, y = m.b * p[0] + m.d * p[1] + m.f; if (!b) b = [x, y, x, y]; else { b[0] = Math.min(b[0], x); b[1] = Math.min(b[1], y); b[2] = Math.max(b[2], x); b[3] = Math.max(b[3], y); } });
          if (b) { b[0] -= sw; b[1] -= sw; b[2] += sw; b[3] += sw; } } catch (e) { b = null; } }
        boxes.push(b);      /* null = keep it everywhere (defs, styles, things that can't be measured) */
      }
      return boxes;
    } finally { host.remove(); }
  }
  function pieces(svgText, kind) {
    var doc = new DOMParser().parseFromString(String(svgText || ''), 'image/svg+xml'), root = doc.documentElement;
    if (!root || root.localName !== 'svg' || doc.getElementsByTagName('parsererror').length) throw new Error('This picture is not a vector (SVG) picture.');
    var vb = (root.getAttribute('viewBox') || '').trim().split(/[\s,]+/).map(Number), w = parseFloat(root.getAttribute('width')), h = parseFloat(root.getAttribute('height'));
    if (vb.length !== 4 || vb.some(isNaN) || vb[2] <= 0 || vb[3] <= 0) { if (!(w > 0 && h > 0)) throw new Error('This picture has no size.'); vb = [0, 0, w, h]; }
    if (!(w > 0)) w = vb[2]; if (!(h > 0)) h = vb[3];
    var giant = kind === 'giant', cols, rows, k, cellH;
    if (giant) { k = w / vb[2]; cols = Math.max(1, Math.ceil(w / TILE - 0.001)); rows = Math.max(1, Math.ceil(h / CELL_H - 0.001)); cellH = CELL_H; }
    else { cols = Math.max(1, Math.round(w / TILE)); k = cols * TILE / vb[2]; rows = 1; cellH = vb[3] * k; }
    if (cols * rows > 400) throw new Error('This picture is too big: ' + cols + ' x ' + rows + ' pieces (400 at most).');
    var boxes = measure(root), ser = new XMLSerializer(), keepAttr = [];
    for (var a = 0; a < root.attributes.length; a++) { var at = root.attributes[a]; if (!/^(width|height|viewBox|x|y|id|preserveAspectRatio|version|class|xml:space|baseProfile)$/.test(at.name) && at.name.indexOf('xmlns') !== 0 && at.name.indexOf('on') !== 0) keepAttr.push(at.name + '="' + at.value.replace(/&/g, '&amp;').replace(/"/g, '&quot;') + '"'); }
    var out = [];
    for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) {
      var ux = vb[0] + c * TILE / k, uy = vb[1] + r * cellH / k, uw = (TILE + OVER) / k, uh = (cellH + (giant ? OVER : 0)) / k, pu = PAD / k;   /* the window, in the picture's own units */
      /* the 2 px overlap at the right (and bottom) edge must show what comes next - for the last piece that is the start of
         the map again (it repeats), so a copy shifted by one whole map is added there */
      var body = '', W = vb[2], H = giant ? rows * CELL_H / k : vb[3], shifts = [[0, 0]];
      if (c === cols - 1) shifts.push([cols * TILE / k, 0]);
      if (giant && r === rows - 1) { shifts.push([0, H]); if (c === cols - 1) shifts.push([cols * TILE / k, H]); }
      shifts.forEach(function (sh) {
        var part = '';
        for (var i = 0; i < root.childNodes.length; i++) {
          var n = root.childNodes[i], b = boxes[i];
          if (n.nodeType === 3 || n.nodeType === 8) continue;
          if (n.nodeType === 1 && b && (b[2] + sh[0] < ux - 1 || b[0] + sh[0] > ux + uw + 1 || b[3] + sh[1] < uy - 1 || b[1] + sh[1] > uy + uh + 1)) continue;   /* doesn't touch this piece */
          part += ser.serializeToString(n);
        }
        if (part) body += sh[0] || sh[1] ? '<g transform="translate(' + fx(sh[0]) + ' ' + fx(sh[1]) + ')">' + part + '</g>' : part;
      });
      var id = 'gwbmc' + r + '_' + c, pw = TILE + OVER + 2 * PAD, ph = cellH + (giant ? OVER : 0) + 2 * PAD;
      /* starts at 0,0 and 1 unit = 1 pixel, so Scratch and G-Warp agree on its size and middle */
      out.push('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' + fx(pw) + '" height="' + fx(ph) + '" viewBox="0 0 ' + fx(pw) + ' ' + fx(ph) + '">'
        + '<defs><clipPath id="' + id + '"><rect x="' + fx(ux) + '" y="' + fx(uy) + '" width="' + fx(uw) + '" height="' + fx(uh) + '"/></clipPath></defs>'
        + '<g transform="matrix(' + fx(k) + ' 0 0 ' + fx(k) + ' ' + fx(-(ux - pu) * k) + ' ' + fx(-(uy - pu) * k) + ')"><g clip-path="url(#' + id + ')"' + (keepAttr.length ? ' ' + keepAttr.join(' ') : '') + '>' + body + '</g></g></svg>');
    }
    return { svgs: out, kind: giant ? 'giant' : 'side', cols: cols, rows: rows, n: cols * rows, h: cellH, scale: k * vb[2] / w || 1, pw: TILE + OVER + 2 * PAD, ph: cellH + (giant ? OVER : 0) + 2 * PAD, exact: giant ? (Math.abs(w - cols * TILE) < 0.5 && Math.abs(h - rows * CELL_H) < 0.5) : true };
  }

  /* ---------- Scratch blocks (plain Scratch 3 JSON, made the same way a Scratch project file stores them) ---------- */
  var seq = 0; function nid() { seq++; return 'gwbm' + Date.now().toString(36) + seq.toString(36); }
  function Blocks(vars) { this.b = {}; this.vars = vars; }
  Blocks.prototype.add = function (op, parent, inputs, fields, shadow, top) { var i = nid(); this.b[i] = { opcode: op, next: null, parent: parent, inputs: inputs || {}, fields: fields || {}, shadow: !!shadow, topLevel: !!top }; return i; };
  Blocks.prototype.V = function (n) { var v = this.vars(n); if (!v) throw new Error('unknown variable ' + n); return v; };
  Blocks.prototype.num = function (e, p, kind) { kind = kind || 4; if (typeof e === 'number') return [1, [kind, String(e)]]; if (e[0] === 'var') { var v = this.V(e[1]); return [3, [12, v[0], v[1]], [kind, '0']]; } return [3, this.expr(e, p), [kind, '0']]; };
  Blocks.prototype.text = function (e, p) { if (typeof e === 'number' || typeof e === 'string') return [1, [10, String(e)]]; if (e[0] === 'var') { var v = this.V(e[1]); return [3, [12, v[0], v[1]], [10, '']]; } return [3, this.expr(e, p), [10, '']]; };
  Blocks.prototype.expr = function (e, p) {
    var op = e[0], i, self = this, two = { '+': 'operator_add', '-': 'operator_subtract', '*': 'operator_multiply', '/': 'operator_divide', 'mod': 'operator_mod' };
    if (two[op]) { i = this.add(two[op], p); this.b[i].inputs = { NUM1: this.num(e[1], i), NUM2: this.num(e[2], i) }; return i; }
    if (op === 'floor' || op === 'abs') { i = this.add('operator_mathop', p, null, { OPERATOR: [op, null] }); this.b[i].inputs = { NUM: this.num(e[1], i) }; return i; }
    if (op === '<' || op === '>') { i = this.add(op === '<' ? 'operator_lt' : 'operator_gt', p); this.b[i].inputs = { OPERAND1: this.text(e[1], i), OPERAND2: this.text(e[2], i) }; return i; }
    if (op === 'or' || op === 'and') { i = this.add('operator_' + op, p); this.b[i].inputs = { OPERAND1: [2, this.expr(e[1], i)], OPERAND2: [2, this.expr(e[2], i)] }; return i; }
    if (op === '=') { i = this.add('operator_equals', p); this.b[i].inputs = { OPERAND1: this.text(e[1], i), OPERAND2: this.text(e[2], i) }; return i; }
    if (op === 'round') { i = this.add('operator_round', p); this.b[i].inputs = { NUM: this.num(e[1], i) }; return i; }
    if (op === 'join') { i = this.add('operator_join', p); this.b[i].inputs = { STRING1: this.text(e[1], i), STRING2: this.text(e[2], i) }; return i; }
    if (op === 'arg') return this.add('argument_reporter_string_number', p, null, { VALUE: [e[1], null] });
    if (op === 'key') { i = this.add('sensing_keypressed', p); var m = this.add('sensing_keyoptions', i, null, { KEY_OPTION: [e[1], null] }, true); this.b[i].inputs = { KEY_OPTION: [1, m] }; return i; }
    throw new Error('expr ' + op);
  };
  Blocks.prototype.stmt = function (s, p) {
    var op = s[0], i, v, m;
    if (op === 'set' || op === 'change') { v = this.V(s[1]); i = this.add(op === 'set' ? 'data_setvariableto' : 'data_changevariableby', p, null, { VARIABLE: [v[0], v[1]] }); this.b[i].inputs = { VALUE: op === 'set' ? this.text(s[2], i) : this.num(s[2], i) }; return i; }
    if (op === 'if') { i = this.add('control_if', p); this.b[i].inputs = { CONDITION: [2, this.expr(s[1], i)], SUBSTACK: [2, this.seq(s[2], i)] }; return i; }
    if (op === 'ifelse') { i = this.add('control_if_else', p); this.b[i].inputs = { CONDITION: [2, this.expr(s[1], i)], SUBSTACK: [2, this.seq(s[2], i)], SUBSTACK2: [2, this.seq(s[3], i)] }; return i; }
    if (op === 'forever') { i = this.add('control_forever', p); this.b[i].inputs = { SUBSTACK: [2, this.seq(s[1], i)] }; return i; }
    if (op === 'goto') { i = this.add('motion_gotoxy', p); this.b[i].inputs = { X: this.num(s[1], i), Y: this.num(s[2], i) }; return i; }
    if (op === 'costume') { i = this.add('looks_switchcostumeto', p); m = this.add('looks_costume', i, null, { COSTUME: [s[2], null] }, true); this.b[i].inputs = { COSTUME: [3, this.expr(s[1], i), m] }; return i; }
    if (op === 'show' || op === 'hide') return this.add('looks_' + op, p);
    if (op === 'broadcast') { i = this.add('event_broadcast', p); this.b[i].inputs = { BROADCAST_INPUT: [1, [11, s[1], bcid(s[1])]] }; return i; }
    if (op === 'clone') { i = this.add('control_create_clone_of', p); m = this.add('control_create_clone_of_menu', i, null, { CLONE_OPTION: ['_myself_', null] }, true); this.b[i].inputs = { CLONE_OPTION: [1, m] }; return i; }
    throw new Error('stmt ' + op);
  };
  Blocks.prototype.seq = function (list, p) { var first = null, prev = null, self = this; list.forEach(function (s) { var i = self.stmt(s, prev || p); if (prev) self.b[prev].next = i; else first = i; prev = i; }); return first; };
  Blocks.prototype.script = function (hat, list, x, y, note, comments) {
    var hf = Array.isArray(hat) ? hat : [hat, null], h = this.add(hf[0], null, null, hf[1], false, true); this.b[h].x = x; this.b[h].y = y; this.b[h].next = this.seq(list, h);
    if (note) { var c = nid(); comments[c] = { blockId: h, x: x + 470, y: y, width: 330, height: 60 + 17 * Math.ceil(note.length / 44), minimized: false, text: note }; this.b[h].comment = c; }
    return h;
  };

  /* a My Block: define <proccode> with number/text inputs (argNames), "run without screen refresh" = warp */
  Blocks.prototype.define = function (proccode, argNames, warp, list, x, y, note, comments) {
    var self = this, d = this.add('procedures_definition', null, null, null, false, true), pk = this.add('procedures_prototype', d, null, null, true), ids = argNames.map(function () { return nid(); }), ins = {};
    argNames.forEach(function (nm, k) { ins[ids[k]] = [1, self.add('argument_reporter_string_number', pk, null, { VALUE: [nm, null] }, true)]; });
    this.b[pk].inputs = ins;
    this.b[pk].mutation = { tagName: 'mutation', children: [], proccode: proccode, argumentids: JSON.stringify(ids), argumentnames: JSON.stringify(argNames), argumentdefaults: JSON.stringify(argNames.map(function () { return ''; })), warp: warp ? 'true' : 'false' };
    this.b[d].inputs = { custom_block: [1, pk] }; this.b[d].x = x; this.b[d].y = y; this.b[d].next = this.seq(list, d);
    if (note) { var c = nid(); comments[c] = { blockId: d, x: x + 470, y: y, width: 330, height: 60 + 17 * Math.ceil(note.length / 44), minimized: false, text: note }; this.b[d].comment = c; }
    return d;
  };
  var DRAW = 'map: draw';
  function bcid(name) { return 'gwbc-' + String(name).replace(/[^a-z0-9]+/gi, '-'); }
  function onDraw() { return ['event_whenbroadcastreceived', { BROADCAST_OPTION: [DRAW, bcid(DRAW)] }]; }

  /* the code of one layer.
     side : this sprite + 1 clone side by side (tile 0 / tile 1) always cover the stage; hidden when above / below the stage.
     giant: this sprite + 3 clones in a 2 x 2 square (tile x / tile y) always cover the stage, in X and Y. */
  function layerScripts(L, P, vars) {
    var B = new Blocks(vars), comments = {}, V = function (x) { return ['var', x]; };
    if (P.kind === 'giant') {
      var W = P.cols * TILE, H = P.rows * CELL_H;
      var place = [
        ['set', 'scroll x', ['mod', ['*', V('cam x'), L.speed], W]],
        ['set', 'scroll y', ['mod', ['*', V('cam y'), L.speedY], H]],
        ['costume', ['+', ['+', ['*', ['-', P.rows - 1, ['mod', ['+', ['floor', ['/', V('scroll y'), CELL_H]], V('tile y')], P.rows]], P.cols],
          ['mod', ['+', ['floor', ['/', V('scroll x'), TILE]], V('tile x')], P.cols]], 1], 'piece 1'],
        ['goto', ['-', ['*', V('tile x'), TILE], ['mod', V('scroll x'), TILE]], ['-', ['*', V('tile y'), CELL_H], ['mod', V('scroll y'), CELL_H]]]
      ];
      B.script('event_whenflagclicked', [['show'], ['set', 'tile x', 1], ['set', 'tile y', 0], ['clone'], ['set', 'tile y', 1], ['clone'], ['set', 'tile x', 0], ['clone'], ['set', 'tile y', 0]], 40, 40,
        'Giant map "' + L.name + '": ' + P.cols + ' x ' + P.rows + ' pieces of 480 x 360 (costumes "piece 1".., row by row from the top). '
        + 'This sprite and 3 clones make a 2 x 2 square (tile x / tile y) that always covers the stage. The map repeats for ever in X and Y. '
        + 'Camera 0, 0 = the middle of the bottom-left piece. Move the camera by changing "cam x" / "cam y" in your own code.', comments);
      B.script(onDraw(), place, 40, 420,
        'Runs every frame for this sprite and its clones ("map: draw" comes from the Stage after the camera moved). '
        + 'scroll x / scroll y = how far the map has moved (wraps round the whole map). Each copy shows the piece under its corner of the square.', comments);
      return { blocks: B.b, comments: comments };
    }
    var n = P.cols, ph = P.h;
    var place2 = [
      ['set', 'scroll', ['mod', ['*', V('cam x'), L.speed], n * TILE]],
      ['costume', ['+', ['mod', ['+', ['floor', ['/', V('scroll'), TILE]], V('tile')], n], 1], 'piece 1'],
      ['set', 'ypos', ['-', L.y, ['*', V('cam y'), L.speedY]]],
      ['goto', ['-', ['*', V('tile'), TILE], ['mod', V('scroll'), TILE]], V('ypos')],
      ['ifelse', ['or', ['<', ['+', V('ypos'), ph / 2], -180], ['>', ['-', V('ypos'), ph / 2], 180]], [['hide']], [['show']]]
    ];
    B.script('event_whenflagclicked', [['set', 'tile', 1], ['clone'], ['set', 'tile', 0]], 40, 40,
      'Big map layer "' + L.name + '": follows the camera at ' + L.speed + ' x its speed (1 = moves with the world, 0 = stays still). '
      + 'This sprite and one clone sit side by side (tile 0 and tile 1), so the ' + n + '-piece picture covers the stage at any camera position '
      + 'and repeats for ever. Move the camera by changing "cam x" and "cam y" in your own code.', comments);
    B.script(onDraw(), place2, 40, 360,
      'Runs every frame for this sprite and its clone ("map: draw" comes from the Stage after the camera moved). '
      + 'scroll = how far this layer has moved (wraps round the whole picture). The piece shown = the 480-wide piece under the camera. '
      + 'Hidden when fully above or below the stage.', comments);
    return { blocks: B.b, comments: comments };
  }
  /* the Stage sends "map: draw" every frame. Sprites run their own code first (and the player moves the camera), then
     everything on the map draws with the same camera, so the map and the sprites never slide against each other. */
  function stageScripts(vars) {
    var B = new Blocks(vars), comments = {};
    B.script('event_whenflagclicked', [['forever', [['broadcast', DRAW]]]], 40, 40,
      'BIG MAP: every frame this tells the map layers and the world sprites to draw ("map: draw"), after your sprites have moved '
      + 'and the camera has followed. So everything uses the same camera and nothing slides. Keep this script.', comments);
    return { blocks: B.b, comments: comments };
  }
  /* a sprite that lives in the world: "world x" / "world y" instead of x / y. role 'player' also moves the camera. */
  function worldScripts(role, o, vars) {
    var B = new Blocks(vars), comments = {}, V = function (x) { return ['var', x]; }, half = ['/', V('world width'), 2], m = Math.max(0, Math.round(o.margin || 0));
    var wrapDx = ['-', ['mod', ['+', ['-', V('world x'), V('cam x')], half], V('world width')], half];
    var start = [['set', 'world x', o.x], ['set', 'world y', o.y], ['set', 'hidden', 0]];
    if (role === 'player') {
      B.script('event_whenflagclicked', start.concat([['set', 'cam x', ['mod', V('world x'), V('world width')]], ['set', 'cam y', V('world y')], ['if', ['<', V('cam y'), 0], [['set', 'cam y', 0]]],
        ['forever', [['set', 'world x', ['mod', V('world x'), V('world width')]],
          ['change', 'cam x', ['*', wrapDx, o.follow]], ['set', 'cam x', ['mod', V('cam x'), V('world width')]],
          ['change', 'cam y', ['*', ['-', V('world y'), V('cam y')], o.follow]], ['if', ['<', V('cam y'), 0], [['set', 'cam y', 0]]]]]]), 40, 40,
        'PLAYER: the camera follows this sprite (' + (o.follow >= 1 ? 'locked' : 'smoothly, ' + o.follow + ' of the way each frame') + '). '
        + 'Move it with "change world x / world y" (not x / y): the map draws it on the stage. The world wraps: world x goes from 0 to "world width". '
        + 'The camera never goes below y 0 (the ground); delete that "if" if your world goes down.', comments);
      if (o.keys) B.script('event_whenflagclicked', [['forever', [['if', ['key', 'right arrow'], [['change', 'world x', 6]]], ['if', ['key', 'left arrow'], [['change', 'world x', -6]]],
        ['if', ['key', 'up arrow'], [['change', 'world y', 6]]], ['if', ['key', 'down arrow'], [['change', 'world y', -6]]]]]], 40, 560,
        'TRY-OUT: the arrow keys move the player so you can test the map right away. Delete this script when you write your own movement '
        + '(change world x / world y).', comments);
    } else {
      B.script('event_whenflagclicked', start, 40, 40,
        'WORLD OBJECT: lives on the map at world x / world y (starts where it was when the map code was added). Move it with '
        + '"change world x / world y". Clones keep their own world x / world y. To hide it, set "hidden" to 1 (the hide block alone '
        + 'would be undone by the map). To chase the player, use the sensing block ([world x] of [your player]).', comments);
    }
    B.script(onDraw(), [['set', 'screen x', wrapDx], ['set', 'screen y', ['-', V('world y'), V('cam y')]],
      ['ifelse', ['or', ['or', ['>', V('hidden'), 0], ['>', ['abs', V('screen x')], 240 + m]], ['>', ['abs', V('screen y')], 180 + m]],
        [['hide']], [['goto', V('screen x'), V('screen y')], ['show']]]], 40, role === 'player' ? (o.keys ? 820 : 560) : 300,
      'Runs every frame ("map: draw"): puts this sprite on the stage where its world spot is, seen from the camera. '
      + 'Hidden when it is off the stage (' + m + ' = half its size, so it never gets stuck at the edge).', comments);
    return { blocks: B.b, comments: comments };
  }
  function cameraScripts(vars, W) {
    var B = new Blocks(vars), comments = {}, V = function (x) { return ['var', x]; };
    B.script('event_whenflagclicked', [['set', 'cam x', 0], ['set', 'cam y', 0], ['set', 'world width', W], ['forever', [
      ['if', ['key', 'right arrow'], [['change', 'cam x', 8]]], ['if', ['key', 'left arrow'], [['change', 'cam x', -8]]],
      ['if', ['key', 'up arrow'], [['change', 'cam y', 6]]], ['if', ['key', 'down arrow'], [['change', 'cam y', -6]]],
      ['if', ['<', V('cam y'), 0], [['set', 'cam y', 0]]],
      ['if', ['>', V('cam x'), V('world width')], [['change', 'cam x', ['-', 0, V('world width')]]]], ['if', ['<', V('cam x'), 0], [['change', 'cam x', V('world width')]]]
    ]]], 40, 40, 'TEST CAMERA: arrow keys move the camera so you can try the map right away. When your player moves the camera '
      + '(for example: set cam x to your player\'s world x), delete this sprite. The world wraps: cam x goes from 0 to "world width".', comments);
    return { blocks: B.b, comments: comments };
  }
  /* world width that makes every layer line up again when the world wraps (W x speed must be a whole number of pictures) */
  function aligned(W, layers) { return layers.every(function (L) { var r = mod(W * L.speed, L.n * TILE); return r < 0.01 || L.n * TILE - r < 0.01; }); }   /* L.n = pieces across */
  function fixWidth(W, layers) { W = Math.max(TILE, Math.round(W / TILE) * TILE); for (var t = 0; t < 400; t++) { if (aligned(W + t * TILE, layers)) return W + t * TILE; } return null; }

  /* ---------- add to the project ---------- */
  function hex() { var s = ''; for (var i = 0; i < 32; i++) s += Math.floor(Math.random() * 16).toString(16); return s; }
  /* does this sprite (index) already have code that sends or answers "map: draw"? */
  function hasMapDraw(owner) {
    var ws = by('workspaceCanvas'); if (!ws || owner == null || owner < 0) return false;
    return [].some.call(ws.querySelectorAll('.block-stack'), function (st) { return st.dataset.owner === String(owner) && [].some.call(st.querySelectorAll('select'), function (x) { return x.value === DRAW; }); });
  }
  function margin(s) {     /* how far past the stage edge the sprite's middle can go before it must hide (Scratch keeps 15 px of a sprite on the stage) */
    try { var b = window.GW && GW.spriteBounds && GW.spriteBounds(s), w = b.right - b.left, h = b.top - b.bottom; if (isFinite(w) && isFinite(h) && w > 0 && h > 0) return Math.max(0, Math.ceil(Math.max(w, h) / 2) - Math.min(15, Math.floor(Math.min(w, h) / 2))); } catch (e) {}
    return 40;
  }
  /* people: [{ index, role: 'player' | 'object', follow (0..1), keys }] - code added to the project's own sprites */
  function add(layers, W, withCamera, people) {
    var api = window.GW_V1580_SB3; if (!api || !api.addSprites) return Promise.reject(new Error('This G-Warp version cannot add sprites yet.'));
    layers = layers || []; people = people || [];
    var E = window.Engine, stageVars = {}, gv = {}; [['cam x', 0], ['cam y', 0], ['world width', W]].forEach(function (p) { var i = nid(); stageVars[i] = p; gv[p[0]] = [p[0], i]; });
    var proxy = -1; try { proxy = window.GW_STAGE_SELECT && GW_STAGE_SELECT.proxyIdx ? GW_STAGE_SELECT.proxyIdx() : -1; } catch (e) {}
    var sc = hasMapDraw(proxy) ? { blocks: {}, comments: {} } : stageScripts(function (n) { return gv[n]; }), skipped = [];
    var files = {}, bc = {}; bc[bcid(DRAW)] = DRAW;
    var targets = [{ isStage: true, name: 'Stage', variables: stageVars, lists: {}, broadcasts: bc, blocks: sc.blocks, comments: sc.comments, costumes: [], sounds: [] }];
    people.forEach(function (P0) {
      var s = E.sprites[P0.index]; if (!s || s.isClone || s.stageProxy) return;
      if (hasMapDraw(P0.index)) { skipped.push(s.name); return; }
      var lv = {}, local = {};
      ['world x', 'world y', 'hidden', 'screen x', 'screen y'].forEach(function (n) { var i = nid(); lv[i] = [n, 0]; local[n] = [n, i]; });
      var code = worldScripts(P0.role, { x: Math.round(+s.x || 0), y: Math.round(+s.y || 0), margin: margin(s), follow: Math.max(0.01, Math.min(1, +P0.follow || 1)), keys: !!P0.keys }, function (n) { return local[n] || gv[n]; });
      targets.push({ isStage: false, gwSprite: P0.index, name: s.name, variables: lv, lists: {}, blocks: code.blocks, comments: code.comments, costumes: [], sounds: [] });
    });
    layers.forEach(function (L, li) {
      var P = L.pieces, lv = {}, local = {};
      (P.kind === 'giant' ? ['tile x', 'tile y', 'scroll x', 'scroll y'] : ['tile', 'scroll', 'ypos']).forEach(function (n) { var i = nid(); lv[i] = [n, 0]; local[n] = [n, i]; });
      var code = layerScripts({ name: L.name, speed: L.speed, y: L.y, speedY: L.speedY }, P, function (n) { return local[n] || gv[n]; });
      var cos = P.svgs.map(function (svg, k) { var id = hex(); files[id + '.svg'] = svg; return { name: 'piece ' + (k + 1), assetId: id, md5ext: id + '.svg', dataFormat: 'svg', bitmapResolution: 1, rotationCenterX: P.pw / 2, rotationCenterY: P.ph / 2 }; });
      targets.push({ isStage: false, name: 'Map: ' + L.name, variables: lv, lists: {}, blocks: code.blocks, comments: code.comments, costumes: cos, sounds: [],
        currentCostume: 0, visible: true, x: 0, y: P.kind === 'giant' ? 0 : L.y, size: 100, direction: 90, draggable: false, rotationStyle: "don't rotate", layerOrder: -1000 + li, volume: 100 });
    });
    if (withCamera) {
      var c = cameraScripts(function (n) { return gv[n]; }, W), cid = hex();
      files[cid + '.svg'] = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="none" stroke="#a78bfa" stroke-width="2"/><path d="M10 4v12M4 10h12" stroke="#a78bfa" stroke-width="2"/></svg>';
      targets.push({ isStage: false, name: 'Camera (test)', variables: {}, lists: {}, blocks: c.blocks, comments: c.comments, sounds: [],
        costumes: [{ name: 'camera', assetId: cid, md5ext: cid + '.svg', dataFormat: 'svg', bitmapResolution: 1, rotationCenterX: 10, rotationCenterY: 10 }],
        currentCostume: 0, visible: false, x: 0, y: 0, size: 100, direction: 90, draggable: false, rotationStyle: 'all around', layerOrder: -2000, volume: 100 });
    }
    return api.addSprites({ targets: targets }, files).then(function (r) {
      (r && r.sprites || []).forEach(function (i) { var sp = window.Engine.sprites[i]; if (sp) sp.__gwBigmap = true; });
      if (layers.length) try { var G = window.GW_VARS ? GW_VARS.globals() : window.Engine.variables; G['world width'] = W; } catch (e) {}   /* the newest map sets the world width */
      r = r || {}; r.skipped = skipped; return r;
    });
  }
  /* Undo / redo: G-Warp's undo brings back the scripts and variables but not the list of sprites, so undoing "Add to project"
     would leave map sprites without their code. The sprites this tool made are taken out on undo and put back on redo. */
  var stash = {};
  function wrapUndo(n) {
    var G = window.GW8; if (!G || !G.restore) { if (n < 120) setTimeout(function () { wrapUndo(n + 1); }, 250); return; }
    if (G.restore.__gwbm) return;
    var R0 = G.restore;
    G.restore = function (snap) {
      try {
        var E = window.Engine, names = snap && Array.isArray(snap.spriteState) ? snap.spriteState.map(function (x) { return x.name; }) : null;
        if (E && E.sprites && names) {
          for (var i = E.sprites.length - 1; i >= 0; i--) { var sp = E.sprites[i]; if (sp && sp.__gwBigmap && !sp.isClone && names.indexOf(sp.name) < 0) { stash[sp.name] = sp; E.sprites.splice(i, 1); } }
          names.forEach(function (nm, k) {
            if (!stash[nm] || E.sprites.some(function (x) { return x.name === nm; })) return;
            var at = Math.min(k, E.sprites.length); while (at > 0 && E.sprites[at - 1] && E.sprites[at - 1].isClone) at--;
            E.sprites.splice(at, 0, stash[nm]); delete stash[nm];
          });
          if (E.activeSpriteIndex >= E.sprites.length || (E.sprites[E.activeSpriteIndex] || {}).isClone) E.activeSpriteIndex = 0;
        }
      } catch (e) { console.warn('[big map undo]', e); }
      return R0.apply(this, arguments);
    };
    G.restore.__gwbm = true;
  }
  wrapUndo(0);

  /* ---------- the window ---------- */
  var CSS = '.gwbm-back{position:fixed;inset:0;z-index:100000;background:rgba(5,6,14,.62);display:flex;align-items:center;justify-content:center;font:13px system-ui,Segoe UI,sans-serif;color:#e6e8f5}'
    + '.gwbm{width:min(1040px,97vw);max-height:95vh;overflow:auto;background:#121628;border:1px solid #3b2f6b;border-radius:14px;box-shadow:0 0 0 1px rgba(34,197,94,.22),0 18px 60px rgba(0,0,0,.6);display:grid;grid-template-columns:auto 1fr}'
    + '.gwbm h2{grid-column:1/-1;margin:0;padding:12px 16px;font-size:15px;color:#fff;border-bottom:1px solid #2a2450;display:flex;align-items:center;gap:8px;background:linear-gradient(90deg,rgba(34,197,94,.16),rgba(139,92,246,.18))}'
    + '.gwbm h2 b{display:inline-flex;padding:0 6px;height:22px;border-radius:6px;align-items:center;background:#15803d;color:#fff;font-size:12px}.gwbm h2 small{margin-left:auto;color:#a5a9c9;font-weight:400}'
    + '.gwbm-view{padding:12px;display:flex;flex-direction:column;gap:8px}.gwbm-view canvas{width:480px;height:360px;border-radius:8px;border:1px solid #2a2f4d;cursor:grab;touch-action:none;background:#7dd3fc}'
    + '.gwbm-view canvas:active{cursor:grabbing}.gwbm-hint{color:#8e93b5;font-size:12px;max-width:480px}.gwbm-cam{color:#c9cce6;font-variant-numeric:tabular-nums}'
    + '.gwbm-side{border-left:1px solid #2a2450;padding:12px;display:flex;flex-direction:column;gap:8px;min-width:0}'
    + '.gwbm-people{display:flex;flex-direction:column;gap:4px}.gwbm-who{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}'
    + '.gwbm-steps{display:flex;flex-wrap:wrap;gap:6px}.gwbm-steps span{padding:3px 9px;border-radius:999px;background:#12261b;border:1px solid #1f6f3f;color:#d7f5e1;font-size:12px;white-space:pre}'
    + '.gwbm-sec{color:#86efac;font-weight:600;font-size:12px;text-transform:uppercase;letter-spacing:.04em;margin-top:2px}'
    + '.gwbm-row{display:flex;align-items:center;gap:6px;flex-wrap:wrap}.gwbm-row label{color:#c9cce6}'
    + '.gwbm input[type=number]{width:62px;background:#0b0e1c;color:#fff;border:1px solid #2f3456;border-radius:6px;padding:2px 4px}'
    + '.gwbm select{background:#0b0e1c;color:#fff;border:1px solid #2f3456;border-radius:6px;padding:3px;max-width:190px}'
    + '.gwbm-layers{display:flex;flex-direction:column;gap:6px;max-height:330px;overflow:auto}'
    + '.gwbm-layer{border:1px solid #262b48;border-radius:8px;padding:6px;display:grid;grid-template-columns:1fr auto;gap:4px 8px;background:#0f1324}'
    + '.gwbm-layer .top{grid-column:1/-1;display:flex;gap:6px;align-items:center}.gwbm-layer .top input[type=text]{flex:1;min-width:0;background:#0b0e1c;color:#fff;border:1px solid #2f3456;border-radius:6px;padding:2px 6px}'
    + '.gwbm-layer .nums{grid-column:1/-1;display:flex;gap:8px;flex-wrap:wrap;color:#a5a9c9;font-size:12px}.gwbm-layer .nums label{display:flex;gap:4px;align-items:center}'
    + '.gwbm-layer .info{grid-column:1/-1;color:#8e93b5;font-size:11px}'
    + '.gwbm button{border:1px solid #3b3270;background:#1d1838;color:#fff;border-radius:8px;padding:5px 9px;cursor:pointer;font:inherit}'
    + '.gwbm button:hover{border-color:#22c55e}.gwbm button.go{background:#15803d;border-color:#22c55e}.gwbm button.small{padding:2px 7px}.gwbm button:disabled{opacity:.5;cursor:default}'
    + '.gwbm-warn{color:#fcd34d;font-size:12px}.gwbm-err{color:#fca5a5;font-size:12px}'
    + '.gwbm-toast{position:fixed;left:50%;bottom:28px;transform:translateX(-50%);background:#14532d;color:#fff;border:1px solid #22c55e;border-radius:10px;padding:8px 14px;z-index:100001;font:13px system-ui,sans-serif}'
    + '@media (max-width:900px){.gwbm{grid-template-columns:1fr}.gwbm-side{border-left:0;border-top:1px solid #2a2450}}';
  function ensureCss() { if (by('gwbmCss')) return; var s = document.createElement('style'); s.id = 'gwbmCss'; s.textContent = CSS; document.head.appendChild(s); }
  function el(tag, a, kids) { var e = document.createElement(tag); if (a) for (var k in a) { if (k === 'text') e.textContent = a[k]; else if (k.slice(0, 2) === 'on') e.addEventListener(k.slice(2), a[k]); else e.setAttribute(k, a[k]); } (kids || []).forEach(function (c) { if (c) e.appendChild(c); }); return e; }

  function bigEnough(svg) { try { var d = new DOMParser().parseFromString(svg, 'image/svg+xml').documentElement, vb = (d.getAttribute('viewBox') || '').split(/[\s,]+/).map(Number), w = parseFloat(d.getAttribute('width')) || vb[2], h = parseFloat(d.getAttribute('height')) || vb[3]; return w > 720 && h > 540; } catch (e) { return false; } }
  /* every vector picture in the project, plus the examples */
  function sources() {
    var E = window.Engine || {}, out = [];
    Object.keys(EXAMPLES).forEach(function (n) { out.push({ key: 'ex:' + n, label: 'Example: ' + n, group: 'Examples', svg: EXAMPLES[n], name: n }); });
    (E.backdrops || []).forEach(function (b, i) { if (b && b.svg) out.push({ key: 'bd:' + i, label: b.name, group: 'Backdrops', svg: b.svg, name: b.name }); });
    (E.sprites || []).forEach(function (s, si) { if (s.stageProxy) return; (s.costumes || []).forEach(function (c, ci) { if (c && c.svg) out.push({ key: 'sp:' + si + ':' + ci, label: s.name + ' / ' + c.name, group: 'Sprite: ' + s.name, svg: c.svg, name: c.name }); }); });
    return out;
  }

  var cur = null;
  function close() { if (!cur) return; cancelAnimationFrame(cur.raf); try { cur.back.remove(); } catch (e) {} window.removeEventListener('keydown', cur.onKey, true); window.removeEventListener('keyup', cur.onKey, true); cur = null; }
  function open(first) {
    ensureCss(); close();
    var SRC = sources(), byKey = {}; SRC.forEach(function (s) { byKey[s.key] = s; });
    var layers = [{ key: 'ex:Mountains', kind: 'side', speed: 0.2, y: 20, speedY: 0.25 }, { key: 'ex:Clouds', kind: 'side', speed: 0.4, y: 110, speedY: 0.5 }, { key: 'ex:City', kind: 'side', speed: 0.7, y: -36, speedY: 0.7 }, { key: 'ex:Ground', kind: 'side', speed: 1, y: -180, speedY: 1 }];
    if (first && byKey[first]) layers = [{ key: first, kind: bigEnough(byKey[first].svg) ? 'giant' : 'side', speed: 1, y: 0, speedY: 1 }];
    /* 1.2.0 (Claude, 25 Nov, owner: "samples must match what the user made"): when the project already has its own pictures
       (a drawn backdrop, a wide scenery costume) Big map starts with THOSE, back to front, instead of the example city. */
    var mine = [];
    if (!(first && byKey[first])) {
      SRC.forEach(function (o) {
        if (o.group === 'Examples' || mine.length >= 4) return;
        var d; try { d = new DOMParser().parseFromString(o.svg, 'image/svg+xml').documentElement; } catch (e) { return; }
        var vb = (d.getAttribute('viewBox') || '').split(/[\s,]+/).map(Number), w = parseFloat(d.getAttribute('width')) || vb[2] || 0, h = parseFloat(d.getAttribute('height')) || vb[3] || 0;
        var shapes = d.querySelectorAll('path,rect,circle,ellipse,polygon,polyline,line,text,image').length;
        if (o.group === 'Backdrops' ? shapes >= 2 : (w >= 400 && shapes >= 1)) mine.push({ o: o, w: w, h: h });
      });
      if (mine.length) layers = mine.map(function (m, i) {
        var sp = mine.length === 1 ? 1 : Math.round((0.2 + 0.8 * i / (mine.length - 1)) * 10) / 10, giant = bigEnough(m.o.svg);
        return { key: m.o.key, kind: giant ? 'giant' : 'side', speed: sp, speedY: sp, y: (!giant && m.h && m.h < 300) ? Math.round(-180 + m.h / 2) : 0 };
      });
    }
    var startNote = mine.length ? 'Started with your own picture' + (mine.length > 1 ? 's' : '') + ': ' + mine.map(function (m) { return m.o.name; }).join(', ') + '. The example pictures are in each layer\'s picture menu.'
      : (first && byKey[first]) ? '' : 'These are example pictures. Draw a backdrop, or a scenery costume 400 or more wide, and Big map starts with your own.';
    var st = { camX: 0, camY: 0, W: 4800, camera: true, fly: false, follow: 0.2, keys: true };
    var PE = (window.Engine && Engine.sprites || []).map(function (sp, i) { return { index: i, sp: sp, role: '' }; })
      .filter(function (o) { var sp = o.sp; return sp && !sp.isClone && !sp.stageProxy && !sp.__gwBigmap && !/^(Map: |Camera \(test\))/.test(sp.name || ''); });
    var cv = el('canvas', { width: 480, height: 360, 'aria-label': 'Map preview: drag to move the camera' }), g = cv.getContext('2d');
    var camLbl = el('span', { class: 'gwbm-cam' }), warn = el('div', { class: 'gwbm-warn' }), err = el('div', { class: 'gwbm-err' });
    var sky = null; try { var E = window.Engine, bd = E && E.backdrops && E.backdrops[E.activeBackdrop || 0]; if (bd && (bd.svgImage || bd.image)) { sky = new Image(); sky.src = bd.svgImage || bd.image; } } catch (e) {}
    function prep(L) {
      var s = byKey[L.key]; L.name = L.name || (s ? s.name : 'layer');
      try { L.pieces = pieces(s.svg, L.kind); L.err = ''; } catch (e) { L.pieces = null; L.err = e.message; }
      L.imgs = (L.pieces ? L.pieces.svgs : []).map(function (svg) { var im = new Image(); im.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg); return im; });
    }
    layers.forEach(prep);
    function good() { return layers.filter(function (L) { return L.pieces; }).map(function (L) { return { n: L.pieces.cols, speed: +L.speed || 0 }; }); }
    function check() {
      var ok = aligned(st.W, good()); warn.textContent = '';
      if (!ok) { var f = fixWidth(st.W, good()); warn.textContent = 'World width ' + st.W + ' makes some layers jump when the world wraps. ' + (f ? 'Use ' + f + ' (button) or change a speed.' : 'Change a layer speed (use steps of 0.1).'); fixBtn.disabled = !f; fixBtn.dataset.w = f || ''; }
      fixBtn.style.display = ok ? 'none' : '';
    }
    function draw() {
      cur && (cur.raf = requestAnimationFrame(draw));
      if (st.fly) { st.camX = mod(st.camX + 6, st.W); }
      g.clearRect(0, 0, 480, 360);
      if (sky && sky.complete && sky.naturalWidth) g.drawImage(sky, 0, 0, 480, 360); else { var gr = g.createLinearGradient(0, 0, 0, 360); gr.addColorStop(0, '#1e3a8a'); gr.addColorStop(1, '#bae6fd'); g.fillStyle = gr; g.fillRect(0, 0, 480, 360); }
      layers.forEach(function (L) {        /* the same sums as the blocks, so what you see here is what the project shows */
        if (!L.pieces) return; var P = L.pieces, im, t, x, y;
        if (P.kind === 'giant') {
          var sx = mod(st.camX * L.speed, P.cols * TILE), sy = mod(st.camY * L.speedY, P.rows * CELL_H);
          for (var tx = 0; tx < 2; tx++) for (var ty = 0; ty < 2; ty++) {
            var col = mod(Math.floor(sx / TILE) + tx, P.cols), row = P.rows - 1 - mod(Math.floor(sy / CELL_H) + ty, P.rows);
            x = tx * TILE - mod(sx, TILE); y = ty * CELL_H - mod(sy, CELL_H); im = L.imgs[row * P.cols + col];
            if (im && im.complete && im.naturalWidth) g.drawImage(im, 240 + x - P.pw / 2, 180 - y - P.ph / 2, P.pw, P.ph);
          }
          return;
        }
        var scroll = mod(st.camX * L.speed, P.cols * TILE), ypos = L.y - st.camY * L.speedY;
        if (ypos + P.h / 2 < -180 || ypos - P.h / 2 > 180) return;
        for (t = 0; t < 2; t++) {
          var piece = mod(Math.floor(scroll / TILE) + t, P.cols); x = t * TILE - mod(scroll, TILE); im = L.imgs[piece];
          if (im && im.complete && im.naturalWidth) g.drawImage(im, 240 + x - P.pw / 2, 180 - ypos - P.ph / 2, P.pw, P.ph);
        }
      });
      PE.forEach(function (o) {     /* the world sprites at their start spot, seen from this camera */
        if (!o.role) return; var x = mod((+o.sp.x || 0) - st.camX + st.W / 2, st.W) - st.W / 2, y = (+o.sp.y || 0) - st.camY;
        if (Math.abs(x) > 260 || Math.abs(y) > 200) return;
        g.beginPath(); g.arc(240 + x, 180 - y, 7, 0, 7); g.fillStyle = o.role === 'player' ? '#a78bfa' : '#facc15'; g.fill(); g.lineWidth = 2; g.strokeStyle = '#0b1020'; g.stroke();
        g.font = '12px system-ui, sans-serif'; g.fillStyle = '#fff'; g.fillText(o.sp.name, 240 + x + 10, 180 - y + 4);
      });
      camLbl.textContent = 'camera  x ' + Math.round(st.camX) + '   y ' + Math.round(st.camY);
    }
    var drag = null;
    cv.addEventListener('pointerdown', function (e) { drag = { x: e.clientX, y: e.clientY, cx: st.camX, cy: st.camY }; st.fly = false; flyBtn.textContent = 'Fly'; try { cv.setPointerCapture(e.pointerId); } catch (x) {} });
    cv.addEventListener('pointermove', function (e) { if (!drag) return; st.camX = mod(drag.cx - (e.clientX - drag.x) * 2, st.W); st.camY = Math.max(0, drag.cy + (e.clientY - drag.y) * 2); });
    cv.addEventListener('pointerup', function () { drag = null; }); cv.addEventListener('pointercancel', function () { drag = null; });
    var list = el('div', { class: 'gwbm-layers' });
    function srcSelect(L) {
      var s = el('select', { 'aria-label': 'Picture' }), groups = {};
      SRC.forEach(function (o) { if (!groups[o.group]) { groups[o.group] = el('optgroup', { label: o.group }); s.appendChild(groups[o.group]); } var op = el('option', { value: o.key, text: o.label }); if (o.key === L.key) op.selected = true; groups[o.group].appendChild(op); });
      s.addEventListener('change', function () { L.key = s.value; L.name = byKey[s.value].name; prep(L); rows(); check(); });
      return s;
    }
    function kindSelect(L) {
      var s = el('select', { 'aria-label': 'Layer type', title: 'Side layer: repeats left and right (sky, hills, city). Giant map: a big picture that scrolls in X and Y, cut into 480 x 360 pieces.' },
        [el('option', { value: 'side', text: 'Side layer' }), el('option', { value: 'giant', text: 'Giant map (X and Y)' })]);
      s.value = L.kind || 'side';
      s.addEventListener('change', function () { L.kind = s.value; prep(L); rows(); check(); });
      return s;
    }
    function numIn(L, key, label, step, min, max, title) {
      var i = el('input', { type: 'number', step: step, value: L[key], title: title, 'aria-label': label });
      if (min != null) i.min = min; if (max != null) i.max = max;
      i.addEventListener('change', function () { var v = +i.value; if (isNaN(v)) v = 0; if (min != null) v = Math.max(min, v); if (max != null) v = Math.min(max, v); L[key] = v; i.value = v; check(); });
      return el('label', { title: title }, [document.createTextNode(label), i]);
    }
    function rows() {
      list.innerHTML = '';
      layers.forEach(function (L, i) {
        var name = el('input', { type: 'text', value: L.name, 'aria-label': 'Layer name' }); name.addEventListener('change', function () { L.name = name.value.trim() || 'layer'; });
        var up = el('button', { type: 'button', class: 'small', title: 'Move back', text: 'Back' }), dn = el('button', { type: 'button', class: 'small', title: 'Move to the front', text: 'Front' }), rm = el('button', { type: 'button', class: 'small', title: 'Remove this layer', text: 'Remove' });
        up.disabled = i === 0; dn.disabled = i === layers.length - 1; rm.disabled = layers.length < 2;
        up.addEventListener('click', function () { layers.splice(i - 1, 0, layers.splice(i, 1)[0]); rows(); });
        dn.addEventListener('click', function () { layers.splice(i + 1, 0, layers.splice(i, 1)[0]); rows(); });
        rm.addEventListener('click', function () { layers.splice(i, 1); rows(); check(); });
        var P = L.pieces, info = !P ? ('Can\'t use this picture: ' + L.err) : P.kind === 'giant'
          ? (P.cols + ' x ' + P.rows + ' pieces of 480 x 360' + (P.exact ? '' : ' - tip: a picture that is a multiple of 480 x 360 repeats with no empty strip'))
          : (P.cols + (P.cols === 1 ? ' piece' : ' pieces') + ' of 480 x ' + Math.round(P.h) + (Math.abs(P.scale - 1) > 0.01 ? ' (picture scaled to ' + Math.round(P.scale * 100) + '%)' : ''));
        list.appendChild(el('div', { class: 'gwbm-layer' }, [
          el('div', { class: 'top' }, [el('b', { text: String(i + 1) }), name, up, dn, rm]),
          el('div', { class: 'nums' }, [srcSelect(L), kindSelect(L)]),
          el('div', { class: 'nums' }, [numIn(L, 'speed', 'Speed ', 0.1, 0, 2, 'How fast this layer follows the camera left/right: 1 = with the world, 0.2 = far away, 0 = never moves'),
            numIn(L, 'speedY', 'Up/down ', 0.05, 0, 2, 'How fast it follows the camera up and down'), L.kind === 'giant' ? null : numIn(L, 'y', 'Height ', 5, null, null, 'Where the middle of the picture sits (stage y) when the camera is at y 0')]),
          el('div', { class: 'info', text: info })]));
      });
    }
    var widthIn = el('input', { type: 'number', step: 480, min: 480, value: st.W, 'aria-label': 'World width' });
    widthIn.addEventListener('change', function () { st.W = Math.max(TILE, Math.round(+widthIn.value || TILE)); widthIn.value = st.W; check(); });
    var fixBtn = el('button', { type: 'button', class: 'small', text: 'Fix width' }); fixBtn.addEventListener('click', function () { var f = +fixBtn.dataset.w; if (f) { st.W = f; widthIn.value = f; check(); } });
    var camChk = el('input', { type: 'checkbox', id: 'gwbmCam' }); camChk.checked = true; camChk.addEventListener('change', function () { st.camera = camChk.checked; });
    var addLayerSel = el('select', { 'aria-label': 'Add a layer' }, [el('option', { value: '', text: 'Add a layer...' })].concat(SRC.map(function (o) { return el('option', { value: o.key, text: o.label }); })));
    addLayerSel.addEventListener('change', function () { if (!addLayerSel.value) return; var gi = bigEnough(byKey[addLayerSel.value].svg), L = { key: addLayerSel.value, kind: gi ? 'giant' : 'side', speed: gi ? 1 : 0.5, y: 0, speedY: gi ? 1 : 0.5 }; prep(L); layers.push(L); addLayerSel.value = ''; rows(); check(); });
    var flyBtn = el('button', { type: 'button', text: 'Fly' }); flyBtn.addEventListener('click', function () { st.fly = !st.fly; flyBtn.textContent = st.fly ? 'Stop' : 'Fly'; });
    var resetBtn = el('button', { type: 'button', text: 'Camera to 0' }); resetBtn.addEventListener('click', function () { st.camX = 0; st.camY = 0; });
    /* sprites in the world: the player (the camera follows it) and world objects (enemies, coins...) */
    var peopleBox = el('div', { class: 'gwbm-people' });
    var followSel = el('select', { 'aria-label': 'Camera follow' }, [['1', 'Camera: locked on the player'], ['0.2', 'Camera: smooth'], ['0.08', 'Camera: very smooth']].map(function (o) { var op = el('option', { value: o[0], text: o[1] }); if (+o[0] === st.follow) op.selected = true; return op; }));
    followSel.addEventListener('change', function () { st.follow = +followSel.value; });
    var keysChk = el('input', { type: 'checkbox', id: 'gwbmKeys' }); keysChk.checked = st.keys; keysChk.addEventListener('change', function () { st.keys = keysChk.checked; });
    function hasPlayer() { return PE.some(function (o) { return o.role === 'player'; }); }
    function people() {
      peopleBox.innerHTML = '';
      if (!PE.length) peopleBox.appendChild(el('div', { class: 'info', text: 'No sprites yet. Add your player or enemies first, then open Big map again.' }));
      PE.forEach(function (o) {
        var sel = el('select', { 'aria-label': o.sp.name + ' on the map' }, [['', 'Not on the map'], ['player', 'Player (camera follows)'], ['object', 'World object']].map(function (x) { var op = el('option', { value: x[0], text: x[1] }); if (x[0] === o.role) op.selected = true; return op; }));
        sel.addEventListener('change', function () { if (sel.value === 'player') PE.forEach(function (q) { if (q.role === 'player') q.role = ''; }); o.role = sel.value; people(); });
        peopleBox.appendChild(el('div', { class: 'gwbm-row' }, [el('span', { class: 'gwbm-who', text: o.sp.name, title: o.sp.name }), sel]));
      });
      var pl = hasPlayer();
      followSel.disabled = keysChk.disabled = !pl;
      camChk.disabled = pl; if (pl) { camChk.checked = false; st.camera = false; }
      codeBtn.disabled = !PE.some(function (o) { return o.role; });
    }
    function chosen() { return PE.filter(function (o) { return o.role; }).map(function (o) { return { index: o.index, role: o.role, follow: st.follow, keys: st.keys }; }); }
    var addBtn = el('button', { type: 'button', class: 'go', text: 'Add to project' }), closeBtn = el('button', { type: 'button', text: 'Close' });
    var codeBtn = el('button', { type: 'button', text: 'Add sprite code only', title: 'Only add the map code to the chosen sprites (for a map you added before)' });
    closeBtn.addEventListener('click', close);
    function run(use) {
      var who = chosen(); err.textContent = '';
      if (use && !use.length) { err.textContent = 'Add at least one layer with a picture.'; return; }
      addBtn.disabled = codeBtn.disabled = true;
      add((use || []).map(function (L) { return { name: L.name, speed: +L.speed || 0, y: +L.y || 0, speedY: +L.speedY || 0, pieces: L.pieces }; }), st.W, use ? st.camera && !hasPlayer() : false, who).then(function (r) {
        close();
        var bits = []; if (use) bits.push(use.length + ' map layer' + (use.length > 1 ? 's' : '')); if (who.length - (r.skipped || []).length > 0) bits.push('map code on ' + (who.length - r.skipped.length) + ' sprite' + (who.length - r.skipped.length > 1 ? 's' : ''));
        if (use && st.camera && !hasPlayer()) bits.push('a test camera (arrow keys)');
        var cam = hasPlayer() && (window.Engine.sprites || []).some(function (x) { return x.name === 'Camera (test)' && !x.isClone; });
        toast('Added ' + bits.join(', ') + '.' + (r.skipped && r.skipped.length ? ' Already on the map: ' + r.skipped.join(', ') + '.' : '') + (cam ? ' Delete the "Camera (test)" sprite: the player moves the camera now.' : '') + ' Press Start to try it.');
      }, function (e) { addBtn.disabled = codeBtn.disabled = false; err.textContent = 'Could not add the map: ' + (e && e.message || e); });
    }
    addBtn.addEventListener('click', function () { run(layers.filter(function (L) { return L.pieces; })); });
    codeBtn.addEventListener('click', function () { run(null); });
    var box = el('div', { class: 'gwbm', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Big map' }, [
      el('h2', {}, [el('b', { text: 'MAP' }), document.createTextNode('Big map (parallax layers)'), el('small', { text: 'Developer preview' })]),
      el('div', { class: 'gwbm-view' }, [cv, el('div', { class: 'gwbm-row' }, [flyBtn, resetBtn, camLbl]),
        el('div', { class: 'gwbm-hint', text: 'Drag the picture to move the camera. Back layers move slower than front layers: that is the parallax. The world repeats: keep flying and you come back where you started.' })]),
      el('div', { class: 'gwbm-side' }, [
        el('div', { class: 'gwbm-steps' }, [el('span', { text: '1  Pick a picture for each layer' }), el('span', { text: '2  Drag the preview or press Fly' }), el('span', { text: '3  Add to project' })]),
        startNote ? el('div', { class: 'gwbm-hint', id: 'gwbmStartNote', text: startNote }) : null,
        el('div', { class: 'gwbm-sec', text: 'World' }),
        el('div', { class: 'gwbm-row' }, [el('label', { text: 'World width' }), widthIn, fixBtn]), warn,
        el('div', { class: 'gwbm-row' }, [camChk, el('label', { for: 'gwbmCam', text: 'Add a test camera (arrow keys)' })]),
        el('div', { class: 'gwbm-sec', text: 'Layers (back to front)' }), list, addLayerSel,
        el('div', { class: 'gwbm-sec', text: 'Sprites on the map' }), peopleBox,
        el('div', { class: 'gwbm-row' }, [followSel]), el('div', { class: 'gwbm-row' }, [keysChk, el('label', { for: 'gwbmKeys', text: 'Arrow keys move the player (try-out)' })]),
        el('div', { class: 'gwbm-row', style: 'margin-top:auto' }, [addBtn, codeBtn, closeBtn]), err,
        el('div', { class: 'gwbm-hint', text: 'Adds one sprite per layer ("Map: ...") with its code, plus the variables cam x, cam y and world width. Sprites you put on the map get world x / world y and code that draws them in the right place; the player moves the camera. Everything is plain Scratch blocks. Nothing else in your project changes.' })
      ])
    ]);
    var back = el('div', { class: 'gwbm-back' }, [box]);
    back.addEventListener('pointerdown', function (e) { if (e.target === back) close(); });
    var onKey = function (e) { if (e.key === 'Escape') { e.stopPropagation(); e.preventDefault(); close(); return; } if (back.contains(e.target)) e.stopPropagation(); };
    window.addEventListener('keydown', onKey, true); window.addEventListener('keyup', onKey, true);
    document.body.appendChild(back);
    cur = { back: back, onKey: onKey, raf: 0 };
    rows(); people(); check(); draw();
    return true;
  }

  /* right-click a costume or backdrop: "Big map (parallax)..." starts the tool with that picture as the first layer */
  var last = null;
  document.addEventListener('contextmenu', function (e) {
    var it = e.target && e.target.closest && e.target.closest('#costumesSidebar .gw7-cos-item'); last = null; if (!it) return;
    var E = window.Engine || {}, i = +it.dataset.index, s = E.sprites && E.sprites[E.activeSpriteIndex];
    var stageOn = false; try { stageOn = !!(window.GW_STAGE_SELECT && GW_STAGE_SELECT.isStage()); } catch (x) {}
    if (stageOn && E.backdrops && E.backdrops[i] && E.backdrops[i].svg) last = 'bd:' + i;
    else if (s && s.costumes && s.costumes[i] && s.costumes[i].svg) last = 'sp:' + E.activeSpriteIndex + ':' + i;
  }, true);
  function addMenuItem(menu) {
    if (!devOn() || !last || menu.querySelector('[data-gwbm]')) return;
    var key = last, b = document.createElement('button');
    b.type = 'button'; b.setAttribute('role', 'menuitem'); b.setAttribute('data-gwbm', '1'); b.textContent = 'Big map (parallax)…';
    b.addEventListener('click', function (ev) { ev.stopPropagation(); try { menu.remove(); } catch (x) {} open(key); });
    var del = menu.querySelector('.gw37-danger'); menu.insertBefore(b, del || null);
  }
  function watch() { new MutationObserver(function (ms) { ms.forEach(function (m) { m.addedNodes.forEach(function (n) { if (n.id === 'gw37Menu') addMenuItem(n); }); }); }).observe(document.body, { childList: true }); }
  if (document.body) watch(); else document.addEventListener('DOMContentLoaded', watch);

  /* a button in the costume editor's top row (Developer mode) */
  function entry() {
    var row = by('gwCostumeModeV15'); if (!row) return false;
    var b = by('gwbmBtn');
    if (!b) {
      b = document.createElement('button'); b.type = 'button'; b.id = 'gwbmBtn'; b.className = 'gw-costume-mode gw18-entry';
      b.title = 'Big map: make a big scrolling, repeating map out of picture layers (parallax), with the code in plain Scratch blocks';
      b.innerHTML = '<i class="fa-solid fa-map" aria-hidden="true"></i> Big map';
      b.addEventListener('click', function () { open(); });
      row.appendChild(b);
    }
    b.style.display = devOn() ? '' : 'none';
    return true;
  }
  (function boot(n) { if (!entry() && n < 120) setTimeout(function () { boot(n + 1); }, 500); })(0);
  window.addEventListener('gwarp-devmode', function () { entry(); });

  window.GW_BIGMAP = { version: '1.2.0', open: open, close: close, pieces: pieces, layerScripts: layerScripts, worldScripts: worldScripts, stageScripts: stageScripts, add: add, examples: EXAMPLES, _aligned: aligned, _fixWidth: fixWidth, _hasMapDraw: hasMapDraw };
  window.GW_SB3_BLOCKS = { Blocks: Blocks, nid: nid, hex: hex };   /* shared with SVG 360 (turn code) */
})();
