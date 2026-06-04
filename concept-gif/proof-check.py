#!/usr/bin/env python3
"""Proof-check a rendered concept GIF for readability regressions.

The checker is intentionally conservative and dependency-light: it uses Pillow
only, samples frames across the loop, and reports simple visual heuristics:

- clutter: edge density across the full frame and local tiles
- jitter: unusually large frame-to-frame changes and loop seam jumps
- lanes: optional manifest-defined color paths that should remain continuous

Usage:
  python3 concept-gif/proof-check.py examples/foo/renders/foo.gif \
    --manifest examples/foo/proof.json \
    --out examples/foo/renders/proof/foo-proof
"""

from __future__ import annotations

import argparse
import json
import math
import statistics
from pathlib import Path
from typing import Any

from PIL import Image, ImageDraw, ImageFont, ImageSequence


DEFAULTS = {
    "samples": 12,
    "max_edge_density": 0.115,
    "max_tile_edge_density": 0.24,
    "max_frame_delta": 0.070,
    "max_delta_spike_ratio": 2.35,
    "max_loop_delta": 0.060,
}


def load_manifest(path: Path | None) -> dict[str, Any]:
    if not path:
        return {}
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def load_frames(path: Path) -> list[Image.Image]:
    im = Image.open(path)
    frames = []
    for frame in ImageSequence.Iterator(im):
        frames.append(frame.convert("RGB"))
    if not frames:
        raise ValueError(f"No frames found in {path}")
    return frames


def sample_frames(frames: list[Image.Image], count: int) -> list[tuple[int, Image.Image]]:
    count = max(1, min(count, len(frames)))
    if count == 1:
        return [(0, frames[0])]
    idxs = sorted({round(i * (len(frames) - 1) / (count - 1)) for i in range(count)})
    return [(i, frames[i]) for i in idxs]


def gray(rgb: tuple[int, int, int]) -> int:
    r, g, b = rgb
    return int(0.299 * r + 0.587 * g + 0.114 * b)


def edge_density(im: Image.Image, threshold: int = 38) -> float:
    w, h = im.size
    px = im.load()
    edges = 0
    total = max(1, (w - 1) * (h - 1))
    for y in range(h - 1):
        for x in range(w - 1):
            g = gray(px[x, y])
            if abs(g - gray(px[x + 1, y])) > threshold or abs(g - gray(px[x, y + 1])) > threshold:
                edges += 1
    return edges / total


def max_tile_edge_density(im: Image.Image, tiles: int = 6) -> float:
    w, h = im.size
    tw, th = w // tiles, h // tiles
    vals = []
    for ty in range(tiles):
        for tx in range(tiles):
            box = (tx * tw, ty * th, w if tx == tiles - 1 else (tx + 1) * tw, h if ty == tiles - 1 else (ty + 1) * th)
            vals.append(edge_density(im.crop(box)))
    return max(vals) if vals else 0.0


def frame_delta(a: Image.Image, b: Image.Image) -> float:
    if a.size != b.size:
        b = b.resize(a.size)
    w, h = a.size
    ap, bp = a.load(), b.load()
    total = 0
    for y in range(h):
        for x in range(w):
            ar, ag, ab = ap[x, y]
            br, bg, bb = bp[x, y]
            total += abs(ar - br) + abs(ag - bg) + abs(ab - bb)
    return total / (w * h * 255 * 3)


def parse_color(value: str) -> tuple[int, int, int]:
    v = value.strip().lstrip("#")
    if len(v) != 6:
        raise ValueError(f"Expected #rrggbb color, got {value!r}")
    return tuple(int(v[i : i + 2], 16) for i in (0, 2, 4))


def color_match(pixel: tuple[int, int, int], target: tuple[int, int, int], tolerance: int) -> bool:
    return math.sqrt(sum((pixel[i] - target[i]) ** 2 for i in range(3))) <= tolerance


def check_lane(frame: Image.Image, lane: dict[str, Any]) -> dict[str, Any]:
    x, y, w, h = [int(v) for v in lane["rect"]]
    axis = lane.get("axis", "x")
    target = parse_color(lane["color"])
    tolerance = int(lane.get("tolerance", 92))
    min_coverage = float(lane.get("min_coverage", 0.28))
    max_gap = float(lane.get("max_gap", 0.48))
    crop = frame.crop((x, y, x + w, y + h))
    px = crop.load()
    columns = w if axis == "x" else h
    hits: list[bool] = []
    for i in range(columns):
        found = False
        if axis == "x":
            for yy in range(h):
                if color_match(px[i, yy], target, tolerance):
                    found = True
                    break
        else:
            for xx in range(w):
                if color_match(px[xx, i], target, tolerance):
                    found = True
                    break
        hits.append(found)

    coverage = sum(hits) / max(1, len(hits))
    longest_gap = 0
    current = 0
    for hit in hits:
        if hit:
            longest_gap = max(longest_gap, current)
            current = 0
        else:
            current += 1
    longest_gap = max(longest_gap, current)
    gap_ratio = longest_gap / max(1, len(hits))
    passed = coverage >= min_coverage and gap_ratio <= max_gap
    return {
        "id": lane.get("id", "lane"),
        "passed": passed,
        "coverage": round(coverage, 4),
        "min_coverage": min_coverage,
        "max_gap_ratio": max_gap,
        "gap_ratio": round(gap_ratio, 4),
        "rect": [x, y, w, h],
    }


def scaled_lane(lane: dict[str, Any], frame_size: tuple[int, int], base_size: list[int] | tuple[int, int] | None) -> dict[str, Any]:
    if not base_size:
        return lane
    bw, bh = base_size
    fw, fh = frame_size
    sx, sy = fw / bw, fh / bh
    out = dict(lane)
    x, y, w, h = lane["rect"]
    out["rect"] = [round(x * sx), round(y * sy), round(w * sx), round(h * sy)]
    return out


def make_contact_sheet(samples: list[tuple[int, Image.Image]], lanes: list[dict[str, Any]], lane_results: dict[str, list[dict[str, Any]]], out: Path) -> None:
    thumbs = []
    font = ImageFont.load_default()
    for idx, frame in samples:
        thumb = frame.copy()
        draw = ImageDraw.Draw(thumb)
        for lane in lanes:
            lane_id = lane.get("id", "lane")
            result = next((r for r in lane_results.get(str(idx), []) if r["id"] == lane_id), None)
            color = (18, 138, 84) if result and result["passed"] else (220, 63, 99)
            x, y, w, h = [int(v) for v in lane["rect"]]
            draw.rectangle((x, y, x + w, y + h), outline=color, width=4)
            draw.text((x + 4, y + 4), lane_id, fill=color, font=font)
        draw.text((18, 18), f"frame {idx}", fill=(22, 32, 46), font=font)
        thumbs.append(thumb.resize((300, 300), Image.Resampling.LANCZOS))
    sheet = Image.new("RGB", (300 * len(thumbs), 300), "white")
    for i, thumb in enumerate(thumbs):
        sheet.paste(thumb, (i * 300, 0))
    sheet.save(out)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("gif", type=Path)
    parser.add_argument("--manifest", type=Path)
    parser.add_argument("--out", type=Path, help="Output stem for .json and .png report files")
    parser.add_argument("--warn-only", action="store_true")
    args = parser.parse_args()

    manifest = {**DEFAULTS, **load_manifest(args.manifest)}
    frames = load_frames(args.gif)
    samples = sample_frames(frames, int(manifest["samples"]))

    edge_vals = [edge_density(frame) for _, frame in samples]
    tile_vals = [max_tile_edge_density(frame) for _, frame in samples]
    deltas = [frame_delta(frames[i], frames[i + 1]) for i in range(len(frames) - 1)]
    loop_delta = frame_delta(frames[-1], frames[0])
    median_delta = statistics.median(deltas) if deltas else 0.0
    max_delta = max(deltas) if deltas else 0.0
    spike_ratio = max_delta / max(median_delta, 0.0001)

    lane_results: dict[str, list[dict[str, Any]]] = {}
    lanes = [scaled_lane(lane, frames[0].size, manifest.get("base_size")) for lane in manifest.get("lanes", [])]
    for idx, frame in samples:
        lane_results[str(idx)] = [check_lane(frame, lane) for lane in lanes]

    checks = [
        {
            "id": "overall_edge_density",
            "passed": max(edge_vals) <= float(manifest["max_edge_density"]),
            "value": round(max(edge_vals), 4),
            "limit": manifest["max_edge_density"],
        },
        {
            "id": "local_tile_edge_density",
            "passed": max(tile_vals) <= float(manifest["max_tile_edge_density"]),
            "value": round(max(tile_vals), 4),
            "limit": manifest["max_tile_edge_density"],
        },
        {
            "id": "max_frame_delta",
            "passed": max_delta <= float(manifest["max_frame_delta"]),
            "value": round(max_delta, 4),
            "limit": manifest["max_frame_delta"],
        },
        {
            "id": "delta_spike_ratio",
            "passed": spike_ratio <= float(manifest["max_delta_spike_ratio"]),
            "value": round(spike_ratio, 4),
            "limit": manifest["max_delta_spike_ratio"],
        },
        {
            "id": "loop_seam_delta",
            "passed": loop_delta <= float(manifest["max_loop_delta"]),
            "value": round(loop_delta, 4),
            "limit": manifest["max_loop_delta"],
        },
    ]

    flat_lanes = [r for frame_results in lane_results.values() for r in frame_results]
    lane_passed = all(r["passed"] for r in flat_lanes)
    if lanes:
        checks.append({"id": "lane_continuity", "passed": lane_passed, "failed": [r for r in flat_lanes if not r["passed"]]})

    passed = all(c["passed"] for c in checks)
    report = {
        "gif": str(args.gif),
        "passed": passed,
        "frame_count": len(frames),
        "size": list(frames[0].size),
        "sampled_frames": [idx for idx, _ in samples],
        "checks": checks,
        "lane_results": lane_results,
    }

    out_stem = args.out or args.gif.with_suffix("")
    out_stem.parent.mkdir(parents=True, exist_ok=True)
    json_path = out_stem.with_suffix(".proof.json")
    png_path = out_stem.with_suffix(".proof.png")
    json_path.write_text(json.dumps(report, indent=2), encoding="utf-8")
    make_contact_sheet(samples, lanes, lane_results, png_path)

    status = "PASS" if passed else "FAIL"
    print(f"{status} proof-check: {args.gif}")
    print(f"  report: {json_path}")
    print(f"  contact sheet: {png_path}")
    for check in checks:
        if check["passed"]:
            print(f"  OK   {check['id']}")
        else:
            print(f"  FAIL {check['id']}: {check}")

    return 0 if passed or args.warn_only else 1


if __name__ == "__main__":
    raise SystemExit(main())
