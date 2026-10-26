# ChatGPT lanes — several ChatGPT sessions at the same time, never mixed up

Owner (2026-10-26): use every Freebuff session (~50 min each) on a different task, *"as long as it's separate, and they always
know exactly what they're working on."*

**How:** one session = one lane. Open a new Freebuff session (or ChatGPT chat), paste ONE `LANE-*.txt` file, done.
Each lane has its own job file, its own folder `chatgpt/lanes/<lane>/` and its own log, so two lanes never write the same file
(the only shared place is the drop box, where each job gets its own new folder).

| Lane | Paste this | Works on | Best place |
|---|---|---|---|
| L1-ANIM | `LANE-L1-ANIM.txt` | animation list, then music icons | chatgpt.com or Freebuff |
| L2-AILAB | `LANE-L2-AILAB.txt` | G-Warp's own AI model (AIM-0..9) | chatgpt.com (research) / Freebuff |
| L3-BLOCKS | `LANE-L3-BLOCKS.txt` | 880 block jobs | Freebuff |
| L4-EXT | `LANE-L4-EXT.txt` | 920 extension jobs | Freebuff + chatgpt.com |
| L5-UI | `LANE-L5-UI.txt` | 354 button / icon / words jobs | Freebuff + chatgpt.com |
| L6-RECIPES | `LANE-L6-RECIPES.txt` | 200 recipe jobs | Freebuff |
| L7-TEST | `LANE-L7-TEST.txt` | 80 kid-critic + chaos jobs | Freebuff |
| L8-ART | `LANE-L8-ART.txt` | 40 art jobs | chatgpt.com or Freebuff |
| L9-WEB | `LANE-L9-WEB.txt` | the whole website redesign (W0-W4) | chatgpt.com + Freebuff |

**Rules that make it safe:**
- Never run the **same lane in two sessions at once**. Two different lanes at once is fine.
- A lane that disconnects just starts again with the same file. It reads its own log and its job marks and goes on.
- Lanes don't write `AI-TEAM.txt` / `TODO.txt` / `MERGE-QUEUE.txt`; Claude collects results from `chatgpt/lanes/*/`.
- To change a lane: edit `make_lanes.py` and run `python3 ai-team/lanes/make_lanes.py`.
