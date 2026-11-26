#!/bin/sh
# usage: g.sh <regex> [file] [ctx]  -> line:col and ctx chars around each match
f=${2:-/home/claude/rel/app.html}; c=${3:-120}
grep -n -o -E ".{0,$c}($1).{0,$c}" "$f" | head -${4:-40}
