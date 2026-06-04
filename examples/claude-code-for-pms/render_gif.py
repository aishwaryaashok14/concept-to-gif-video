#!/usr/bin/env python3
"""Render the Claude Code for PMs concept GIF with Pillow.

This is a local fallback for environments where HyperFrames cannot be
downloaded. It mirrors frame.js as a clean looping product-workflow graphic.
"""

from __future__ import annotations

import argparse
import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont


LOGICAL = 900
FPS = 18
DURATION = 6
FRAME_COUNT = FPS * DURATION

FONT_REG = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_BLACK = "/System/Library/Fonts/Supplemental/Arial Black.ttf"

COL = {
    "bg": "#f4f0ea",
    "panel": "#fffdf9",
    "border": "#eadfce",
    "ink": "#211b16",
    "soft": "#4d443a",
    "muted": "#7a6250",
    "teal": "#0d7f81",
    "teal_ring": "#3aaeb0",
    "teal_soft": "#e6f5f2",
    "amber": "#b87518",
    "amber_ring": "#dfa94b",
    "amber_soft": "#fff3dc",
    "purple": "#6147c5",
    "purple_ring": "#8d79df",
    "purple_soft": "#f0ecff",
    "rose": "#bf3858",
    "rose_ring": "#df6f88",
    "rose_soft": "#fdeaf0",
    "arrow": "#302821",
}

TIERS = [
    ("Signal", "teal", [("Customer signal", "chat"), ("Metrics", "bars"), ("Repo context", "search")]),
    ("Product Intent", "amber", [("PRD", "doc"), ("Acceptance", "check"), ("Priorities", "decide")]),
    ("Claude Code", "purple", [("Prototype", "code"), ("Repo changes", "git"), ("Review loop", "review")]),
    ("Launch Learning", "rose", [("QA pass", "shield"), ("Ship notes", "papers"), ("Insights", "graph")]),
]


def render(output: Path, preview: Path, export_scale: int) -> None:
    draw_scale = export_scale * 2
    canvas = LOGICAL * draw_scale
    out_px = LOGICAL * export_scale

    def font(path: str, size: int) -> ImageFont.FreeTypeFont:
        return ImageFont.truetype(path, size * draw_scale)

    fonts = {
        "title": font(FONT_BLACK, 49),
        "kicker": font(FONT_BOLD, 14),
        "pill": font(FONT_BLACK, 17),
        "label": font(FONT_BOLD, 16),
        "small": font(FONT_BOLD, 12),
    }

    def hex_to_rgb(h: str) -> tuple[int, int, int]:
        h = h.lstrip("#")
        return tuple(int(h[i : i + 2], 16) for i in (0, 2, 4))

    def rgba(h: str, a: int) -> tuple[int, int, int, int]:
        return (*hex_to_rgb(h), a)

    def xy(v):
        return tuple(int(round(x * draw_scale)) for x in v)

    def rounded(draw: ImageDraw.ImageDraw, box, r, fill, outline=None, width=1) -> None:
        draw.rounded_rectangle(
            xy(box),
            radius=r * draw_scale,
            fill=fill,
            outline=outline,
            width=width * draw_scale,
        )

    def text_size(draw: ImageDraw.ImageDraw, text: str, f) -> tuple[int, int]:
        b = draw.textbbox((0, 0), text, font=f)
        return b[2] - b[0], b[3] - b[1]

    def center_text(draw: ImageDraw.ImageDraw, box, text: str, f, fill, dy=0) -> None:
        x1, y1, x2, y2 = [v * draw_scale for v in box]
        tw, th = text_size(draw, text, f)
        draw.text(
            (x1 + (x2 - x1 - tw) / 2, y1 + (y2 - y1 - th) / 2 + dy * draw_scale),
            text,
            font=f,
            fill=fill,
        )

    def draw_dashed_arrow(draw: ImageDraw.ImageDraw, x, y1, y2, phase) -> None:
        dash = 9
        gap = 9
        offset = (phase * 44) % (dash + gap)
        y = y1 - offset
        while y < y2:
            a = max(y, y1)
            b = min(y + dash, y2)
            if b > y1:
                draw.line(xy((x, a, x, b)), fill=rgba(COL["arrow"], 150), width=3 * draw_scale)
            y += dash + gap
        draw.line(xy((x - 8, y2 - 10, x, y2)), fill=rgba(COL["arrow"], 150), width=3 * draw_scale)
        draw.line(xy((x + 8, y2 - 10, x, y2)), fill=rgba(COL["arrow"], 150), width=3 * draw_scale)

    def card(draw: ImageDraw.ImageDraw, cx, cy, color, label, icon_name, phase) -> None:
        glow = 25 + int(16 * (0.5 + 0.5 * math.sin(phase * math.tau)))
        draw.ellipse(xy((cx - 49, cy - 49, cx + 49, cy + 49)), fill=rgba(color, glow))
        rounded(draw, (cx - 56, cy - 54, cx + 56, cy + 54), 22, "white", rgba(color, 185), 2)
        draw_icon(draw, icon_name, cx, cy - 10, color, phase)
        center_text(draw, (cx - 70, cy + 22, cx + 70, cy + 48), label, fonts["small"], COL["ink"])

    def draw_icon(draw: ImageDraw.ImageDraw, name, cx, cy, color, phase) -> None:
        s = draw_scale
        p = phase * math.tau

        if name == "chat":
            rounded(draw, (cx - 25, cy - 21, cx + 25, cy + 17), 7, None, color, 4)
            draw.line(xy((cx - 9, cy + 17, cx - 18, cy + 28, cx - 15, cy + 13)), fill=color, width=4 * s)
            for i in range(3):
                alpha = 90 + int(130 * (0.5 + 0.5 * math.sin(p + i * 0.9)))
                draw.ellipse(xy((cx - 12 + i * 12, cy - 3, cx - 7 + i * 12, cy + 2)), fill=rgba(color, alpha))
        elif name == "bars":
            draw.line(xy((cx - 26, cy + 23, cx + 27, cy + 23)), fill=color, width=4 * s)
            for i, h in enumerate((26, 38, 20)):
                scale = 0.65 + 0.35 * (0.5 + 0.5 * math.sin(p + i * 1.3))
                x = cx - 20 + i * 20
                draw.rounded_rectangle(xy((x, cy + 22 - h * scale, x + 10, cy + 23)), radius=2 * s, fill=color)
        elif name == "search":
            r = 19 + 2 * math.sin(p)
            draw.ellipse(xy((cx - r, cy - r, cx + r, cy + r)), outline=color, width=4 * s)
            draw.line(xy((cx + 14, cy + 14, cx + 29, cy + 29)), fill=color, width=5 * s)
        elif name == "doc":
            rounded(draw, (cx - 21, cy - 27, cx + 21, cy + 29), 5, "white", color, 4)
            for i in range(3):
                w = 15 + 14 * (0.5 + 0.5 * math.sin(p + i))
                draw.line(xy((cx - 11, cy - 7 + i * 12, cx - 11 + w, cy - 7 + i * 12)), fill=color, width=3 * s)
        elif name == "check":
            draw.ellipse(xy((cx - 25, cy - 25, cx + 25, cy + 25)), outline=color, width=4 * s)
            wob = math.sin(p) * 2
            draw.line(xy((cx - 13, cy + wob, cx - 3, cy + 11 + wob, cx + 17, cy - 13 + wob)), fill=color, width=5 * s)
        elif name == "decide":
            a = 0.5 + 0.5 * math.sin(p)
            draw.line(xy((cx - 18, cy - 12, cx - 1, cy + 5, cx + 18, cy - 15)), fill=rgba(color, int(70 + 185 * a)), width=5 * s)
            draw.line(xy((cx - 17, cy + 14, cx + 17, cy + 14)), fill=rgba(color, int(230 - 130 * a)), width=5 * s)
        elif name == "code":
            wob = math.sin(p) * 4
            draw.line(xy((cx - 5, cy - 24, cx - 15, cy + 28)), fill=color, width=4 * s)
            draw.line(xy((cx - 23 - wob, cy - 11, cx - 35 - wob, cy, cx - 23 - wob, cy + 11)), fill=color, width=5 * s)
            draw.line(xy((cx + 23 + wob, cy - 11, cx + 35 + wob, cy, cx + 23 + wob, cy + 11)), fill=color, width=5 * s)
        elif name == "git":
            angle = p
            pts = [(cx - 19, cy - 16), (cx + 20, cy - 16), (cx, cy + 23)]
            for a, b in ((0, 1), (0, 2), (1, 2)):
                draw.line(xy((*pts[a], *pts[b])), fill=color, width=3 * s)
            for i, (x, y) in enumerate(pts):
                ox = math.cos(angle + i * 2.1) * 2
                oy = math.sin(angle + i * 2.1) * 2
                draw.ellipse(xy((x - 7 + ox, y - 7 + oy, x + 7 + ox, y + 7 + oy)), fill=color)
        elif name == "review":
            rounded(draw, (cx - 20, cy - 27, cx + 20, cy + 27), 5, "white", color, 4)
            draw.line(xy((cx - 9, cy - 5, cx - 1, cy + 4, cx + 12, cy - 12)), fill=color, width=4 * s)
            draw.line(xy((cx - 9, cy + 16, cx + 10, cy + 16)), fill=color, width=3 * s)
        elif name == "shield":
            draw.polygon([xy((cx, cy - 28)), xy((cx - 24, cy - 17)), xy((cx - 19, cy + 15)), xy((cx, cy + 30)), xy((cx + 19, cy + 15)), xy((cx + 24, cy - 17))], outline=color, fill=None)
            draw.line(xy((cx - 10, cy, cx - 2, cy + 9, cx + 14, cy - 10)), fill=color, width=4 * s)
        elif name == "papers":
            off = math.sin(p) * 4
            rounded(draw, (cx - 15, cy - 25 + off, cx + 23, cy + 23 + off), 5, "white", color, 3)
            rounded(draw, (cx - 25, cy - 17 - off, cx + 13, cy + 31 - off), 5, "white", color, 3)
            draw.line(xy((cx - 14, cy + 1 - off, cx + 5, cy + 1 - off)), fill=color, width=3 * s)
        elif name == "graph":
            pts = [(cx - 22, cy + 16), (cx - 5, cy - 4), (cx + 9, cy + 5), (cx + 24, cy - 19)]
            draw.line([xy(pnt) for pnt in pts], fill=color, width=4 * s)
            for i, (x, y) in enumerate(pts):
                pulse = 1 + 0.18 * math.sin(p + i)
                r = 5 * pulse
                draw.ellipse(xy((x - r, y - r, x + r, y + r)), fill=color)

    frames = []
    for n in range(FRAME_COUNT):
        t = n / FRAME_COUNT
        im = Image.new("RGBA", (canvas, canvas), COL["bg"])
        d = ImageDraw.Draw(im)

        shadow = Image.new("RGBA", im.size, (0, 0, 0, 0))
        sd = ImageDraw.Draw(shadow)
        sd.rounded_rectangle(xy((28, 30, 872, 874)), radius=38 * draw_scale, fill=(33, 27, 22, 36))
        im.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(18 * draw_scale)))
        rounded(d, (24, 22, 876, 866), 36, COL["panel"], COL["border"], 2)

        center_text(d, (80, 46, 820, 78), "FROM PRODUCT INTENT TO SHIPPED LEARNING", fonts["kicker"], COL["muted"])
        center_text(d, (58, 82, 842, 136), "Claude Code for PMs", fonts["title"], COL["ink"])

        box_x, box_y, box_w, box_h = 62, 166, 776, 666
        gap = 26
        band_h = (box_h - gap * 3) / 4
        item_xs = [366, 544, 722]

        for i, (tier_label, key, items) in enumerate(TIERS):
            top = box_y + i * (band_h + gap)
            cy = top + band_h / 2
            color = COL[key]
            ring = COL[f"{key}_ring"]
            soft = COL[f"{key}_soft"]

            rounded(d, (box_x, top, box_x + box_w, top + band_h), 24, soft, ring, 2)
            rounded(d, (box_x + 22, cy - 27, box_x + 184, cy + 27), 14, color, None, 1)
            center_text(d, (box_x + 28, cy - 18, box_x + 178, cy + 18), tier_label, fonts["pill"], "white")

            for j, (label, icon_name) in enumerate(items):
                bob = math.sin(t * math.tau + i * 0.7 + j * 0.9) * 3
                card(d, item_xs[j], cy + bob, color, label, icon_name, (t + i * 0.13 + j * 0.09) % 1)

            if i < len(TIERS) - 1:
                draw_dashed_arrow(d, 450, top + band_h + 7, top + band_h + gap - 8, t)

        rounded(d, (92, 838, 808, 878), 14, "#fff8ee", "#ecd6b7", 1)
        center_text(
            d,
            (108, 844, 792, 870),
            "PM loop: signals -> specs -> repo changes -> launch learning",
            fonts["small"],
            COL["soft"],
        )

        frames.append(im.convert("RGB").resize((out_px, out_px), Image.Resampling.LANCZOS))

    preview.parent.mkdir(parents=True, exist_ok=True)
    output.parent.mkdir(parents=True, exist_ok=True)
    frames[0].save(preview)
    frames[0].save(
        output,
        save_all=True,
        append_images=frames[1:],
        duration=int(1000 / FPS),
        loop=0,
        optimize=True,
        disposal=2,
    )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--ultra-hd", action="store_true", help="Render 1800x1800 instead of 900x900")
    args = parser.parse_args()

    stem = "claude-code-for-pms-ultra-hd" if args.ultra_hd else "claude-code-for-pms"
    export_scale = 2 if args.ultra_hd else 1
    render(Path("renders") / f"{stem}.gif", Path("renders") / f"{stem}-preview.png", export_scale)
    print(f"wrote renders/{stem}.gif")


if __name__ == "__main__":
    main()
