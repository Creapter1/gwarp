# ChatGPT lanes — several ChatGPT sessions at the same time, never mixed up

Owner (2026-10-26): use every Freebuff session (~50 min each) on a different task, *"as long as it's separate, and they always
know exactly what they're working on."*

**How:** one session = one lane. Open a new Freebuff session (or ChatGPT chat), copy ONE lane's part from `LANES.txt` (all 9 lane prompts are in that one file), done.
Each lane has its own job file, its own folder `team/chatgpt/lanes/<lane>/` and its own log, so two lanes never write the same file
(the only shared place is the drop box, where each job gets its own new folder).

| Lane | Paste this | Works on | Best place |
|---|---|---|---|
| L1-ANIM | `LANES.txt` → L1-ANIM | animation list, then music icons | chatgpt.com or Freebuff |
| L2-AILAB | `LANES.txt` → L2-AILAB | G-Warp's own AI model (AIM-0..9) | chatgpt.com (research) / Freebuff |
| L3-BLOCKS | `LANES.txt` → L3-BLOCKS | 880 block jobs | Freebuff |
| L4-EXT | `LANES.txt` → L4-EXT | 920 extension jobs | Freebuff + chatgpt.com |
| L5-UI | `LANES.txt` → L5-UI | 354 button / icon / words jobs | Freebuff + chatgpt.com |
| L6-RECIPES | `LANES.txt` → L6-RECIPES | 200 recipe jobs | Freebuff |
| L7-TEST | `LANES.txt` → L7-TEST | 80 kid-critic + chaos jobs | Freebuff |
| L8-ART | `LANES.txt` → L8-ART | 40 art jobs | chatgpt.com or Freebuff |
| L9-WEB | `LANES.txt` → L9-WEB | the whole website redesign (W0-W4) | chatgpt.com + Freebuff |

**Rules that make it safe:**
- Never run the **same lane in two sessions at once**. Two different lanes at once is fine.
- A lane that disconnects just starts again with the same file. It reads its own log and its job marks and goes on.
- Lanes don't write `AI-TEAM.txt` / `AI-TEAM-TODO.md` / `MERGE-QUEUE.txt`; Claude collects results from `team/chatgpt/lanes/*/`.
- To change a lane: edit `make_lanes.py` and run `python3 team/ai-team/lanes/make_lanes.py` (it rewrites `LANES.txt`).
