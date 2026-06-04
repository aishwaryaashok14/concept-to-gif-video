#!/usr/bin/env bash
# Convert a rendered MP4 into a high-quality, infinitely-looping GIF.
# Usage: ./render-gif.sh renders/out.mp4 [renders/out.gif] [width] [fps]
set -euo pipefail

IN="${1:?usage: render-gif.sh <in.mp4> [out.gif] [width] [fps]}"
OUT="${2:-${IN%.*}.gif}"
W="${3:-900}"
FPS="${4:-20}"
PAL="$(mktemp -t cgpal).png"

# 1) build an optimal palette from the whole clip
ffmpeg -y -i "$IN" -vf "fps=${FPS},scale=${W}:-1:flags=lanczos,palettegen=stats_mode=full" "$PAL" -loglevel error
# 2) apply it (error-diffusion dithering keeps line art and tiny labels cleaner)
ffmpeg -y -i "$IN" -i "$PAL" \
  -lavfi "fps=${FPS},scale=${W}:-1:flags=lanczos[x];[x][1:v]paletteuse=dither=sierra2_4a" \
  "$OUT" -loglevel error
rm -f "$PAL"

echo "wrote $OUT ($(du -h "$OUT" | cut -f1))"
