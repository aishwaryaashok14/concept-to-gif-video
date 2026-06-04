#!/usr/bin/env python3
"""Render the Skills vs Sub-Agents comparison GIF.

This is a fallback renderer for environments where the browser-based
HyperFrames renderer is unavailable. It draws the same static concept as a
clean, looping Pillow animation and can output normal or 2x ultra-HD files.
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
    "bg": "#eef1f6",
    "panel": "#ffffff",
    "border": "#e7eaf1",
    "ink": "#16202e",
    "soft": "#434c5c",
    "muted": "#7a8494",
    "blue": "#3b82f6",
    "blueSoft": "#eaf3ff",
    "green": "#128a54",
    "green2": "#54c08a",
    "greenSoft": "#e9f8f1",
}


def render(output: Path, preview: Path, export_scale: int) -> None:
    draw_scale = export_scale * 2

    def font(path: str, size: int) -> ImageFont.FreeTypeFont:
        return ImageFont.truetype(path, size * draw_scale)

    fonts = {
        "title": font(FONT_BLACK, 50),
        "kicker": font(FONT_BOLD, 15),
        "section": font(FONT_BLACK, 25),
        "body": font(FONT_BOLD, 17),
        "small": font(FONT_BOLD, 14),
        "tiny": font(FONT_BOLD, 11),
    }

    def hex_to_rgb(h: str) -> tuple[int, int, int]:
        h = h.lstrip("#")
        return tuple(int(h[i : i + 2], 16) for i in (0, 2, 4))

    def rgba(h: str, a: int) -> tuple[int, int, int, int]:
        return (*hex_to_rgb(h), a)

    def xy(v):
        return tuple(int(round(x * draw_scale)) for x in v)

    def rounded(draw: ImageDraw.ImageDraw, box, r, fill, outline=None, width=1) -> None:
        draw.rounded_rectangle(xy(box), radius=r * draw_scale, fill=fill, outline=outline, width=width * draw_scale)

    def text_size(draw: ImageDraw.ImageDraw, text: str, f) -> tuple[int, int]:
        b = draw.textbbox((0, 0), text, font=f)
        return b[2] - b[0], b[3] - b[1]

    def center_text(draw: ImageDraw.ImageDraw, box, text: str, f, fill, dy=0) -> None:
        x1, y1, x2, y2 = [v * draw_scale for v in box]
        tw, th = text_size(draw, text, f)
        draw.text((x1 + (x2 - x1 - tw) / 2, y1 + (y2 - y1 - th) / 2 + dy * draw_scale), text, font=f, fill=fill)

    def draw_arrow(draw: ImageDraw.ImageDraw, start, end, color, width=4, phase=0) -> None:
        sx, sy = start
        ex, ey = end
        pts = []
        for i in range(29):
            u = i / 28
            x = sx + (ex - sx) * u
            y = sy + (ey - sy) * u + math.sin((u * math.tau) + phase) * 7
            pts.append(xy((x, y)))
        draw.line(pts, fill=color, width=width * draw_scale, joint="curve")
        ang = math.atan2(pts[-1][1] - pts[-3][1], pts[-1][0] - pts[-3][0])
        head = []
        for off in (math.pi * 0.82, -math.pi * 0.82):
            head.append((pts[-1][0] + math.cos(ang + off) * 16 * draw_scale, pts[-1][1] + math.sin(ang + off) * 16 * draw_scale))
        draw.polygon([pts[-1], head[0], head[1]], fill=color)

    def icon_doc(draw, cx, cy, color, t):
        x, y = cx * draw_scale, cy * draw_scale
        w, h = 42 * draw_scale, 50 * draw_scale
        draw.rounded_rectangle((x - w / 2, y - h / 2, x + w / 2, y + h / 2), radius=6 * draw_scale, outline=color, width=4 * draw_scale, fill="white")
        for k in range(3):
            yy = y - 12 * draw_scale + k * 12 * draw_scale
            prog = 0.55 + 0.35 * math.sin(t * math.tau + k)
            draw.line((x - 12 * draw_scale, yy, x + (-12 + 24 * prog) * draw_scale, yy), fill=color, width=3 * draw_scale)

    def icon_tools(draw, cx, cy, color, t):
        rot = math.sin(t * math.tau) * 0.18
        for angle in (-0.75 + rot, 0.75 - rot):
            x1 = cx + math.cos(angle) * -20
            y1 = cy + math.sin(angle) * -20
            x2 = cx + math.cos(angle) * 22
            y2 = cy + math.sin(angle) * 22
            draw.line((x1 * draw_scale, y1 * draw_scale, x2 * draw_scale, y2 * draw_scale), fill=color, width=6 * draw_scale)
            draw.ellipse(((x2 - 6) * draw_scale, (y2 - 6) * draw_scale, (x2 + 6) * draw_scale, (y2 + 6) * draw_scale), fill=color)

    def icon_layers(draw, cx, cy, color, t):
        lift = math.sin(t * math.tau) * 4
        for i in range(3):
            y = cy + i * 12 - 12 + (lift if i == 0 else 0)
            pts = [(cx, y - 13), (cx + 28, y), (cx, y + 13), (cx - 28, y)]
            draw.line([xy(p) for p in pts + [pts[0]]], fill=color, width=4 * draw_scale)

    def icon_agent(draw, cx, cy, color, t):
        pulse = 1 + 0.06 * math.sin(t * math.tau)
        r = 17 * pulse
        draw.ellipse(xy((cx - r, cy - r, cx + r, cy + r)), outline=color, width=4 * draw_scale, fill="white")
        draw.line(xy((cx, cy + r, cx, cy + r + 18)), fill=color, width=4 * draw_scale)
        draw.line(xy((cx - 19, cy + r + 18, cx + 19, cy + r + 18)), fill=color, width=4 * draw_scale)
        draw.ellipse(xy((cx - 7, cy - 5, cx - 3, cy - 1)), fill=color)
        draw.ellipse(xy((cx + 3, cy - 5, cx + 7, cy - 1)), fill=color)

    def icon_eye(draw, cx, cy, color, t):
        open_amt = 1 - 0.5 * max(0, math.sin(t * math.tau * 2))
        draw.arc(xy((cx - 31, cy - 20 * open_amt, cx + 31, cy + 20 * open_amt)), 180, 360, fill=color, width=4 * draw_scale)
        draw.arc(xy((cx - 31, cy - 20 * open_amt, cx + 31, cy + 20 * open_amt)), 0, 180, fill=color, width=4 * draw_scale)
        draw.ellipse(xy((cx - 8, cy - 8, cx + 8, cy + 8)), fill=color)

    def icon_return(draw, cx, cy, color, t):
        off = math.sin(t * math.tau) * 5
        draw.arc(xy((cx - 26, cy - 22, cx + 26, cy + 22)), 25, 315, fill=color, width=5 * draw_scale)
        draw.polygon([xy((cx - 25 + off, cy - 2)), xy((cx - 42 + off, cy - 1)), xy((cx - 31 + off, cy + 14))], fill=color)

    skill_icons = [icon_doc, icon_tools, icon_layers]
    agent_icons = [icon_agent, icon_eye, icon_return]
    frames = []
    canvas = LOGICAL * draw_scale
    out_px = LOGICAL * export_scale

    for n in range(FRAME_COUNT):
        t = n / FRAME_COUNT
        im = Image.new("RGBA", (canvas, canvas), COL["bg"])
        d = ImageDraw.Draw(im)

        shadow = Image.new("RGBA", im.size, (0, 0, 0, 0))
        sd = ImageDraw.Draw(shadow)
        sd.rounded_rectangle(xy((28, 26, 872, 872)), radius=36 * draw_scale, fill=(20, 28, 46, 38))
        im.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(18 * draw_scale)))
        rounded(d, (24, 20, 876, 866), 34, COL["panel"], COL["border"], 2)

        center_text(d, (70, 38, 830, 75), "CAPABILITY PACKS VS DELEGATED WORKERS", fonts["kicker"], COL["muted"])
        center_text(d, (60, 76, 840, 135), "Skills vs Sub-Agents", fonts["title"], COL["ink"])

        left = (70, 190, 400, 735)
        right = (500, 190, 830, 735)
        center = (405, 320, 495, 610)
        rounded(d, left, 26, COL["blueSoft"], rgba(COL["blue"], 180), 2)
        rounded(d, right, 26, COL["greenSoft"], rgba(COL["green2"], 190), 2)
        rounded(d, center, 28, "#f7f9fc", "#d9dee8", 2)
        center_text(d, (410, 345, 490, 395), "Current", fonts["tiny"], COL["muted"])
        center_text(d, (410, 374, 490, 424), "Thread", fonts["body"], COL["ink"])
        center_text(d, (410, 500, 490, 552), "Choose", fonts["small"], COL["soft"])
        draw_arrow(d, (245, 460), (430, 460), rgba(COL["blue"], 170), 4, t * math.tau)
        draw_arrow(d, (470, 460), (655, 460), rgba(COL["green"], 170), 4, t * math.tau + math.pi)

        center_text(d, (95, 210, 375, 250), "SKILLS", fonts["section"], COL["blue"])
        center_text(d, (520, 210, 810, 250), "SUB-AGENTS", fonts["section"], COL["green"])
        center_text(d, (92, 254, 378, 292), "Load know-how into one agent", fonts["small"], COL["soft"])
        center_text(d, (512, 254, 818, 292), "Split work into focused agents", fonts["small"], COL["soft"])

        for i, (main, sub) in enumerate([("Instructions", "Rules + context"), ("Tooling", "APIs + helpers"), ("Patterns", "Repeatable workflow")]):
            wob = math.sin(t * math.tau + i * 1.2) * 4
            x1, y1, x2, y2 = 110, 360 + i * 115 - 42 + wob, 360, 360 + i * 115 + 42 + wob
            d.ellipse(xy((x1 - 18, y1 - 18, x1 + 88, y2 + 18)), fill=rgba(COL["blue"], int(38 + 22 * math.sin(t * math.tau + i))))
            rounded(d, (x1, y1, x2, y2), 20, "white", rgba(COL["blue"], 160), 2)
            skill_icons[i](d, 150, 360 + i * 115 + wob, COL["blue"], (t + i / 3) % 1)
            d.text(xy((198, 360 + i * 115 - 22 + wob)), main, font=fonts["body"], fill=COL["ink"])
            d.text(xy((198, 360 + i * 115 + 6 + wob)), sub, font=fonts["tiny"], fill=COL["muted"])

        cx, cy = 665, 475
        d.ellipse(xy((cx - 52, cy - 52, cx + 52, cy + 52)), fill="white", outline=COL["green"], width=4 * draw_scale)
        center_text(d, (cx - 45, cy - 23, cx + 45, cy + 8), "Task", fonts["small"], COL["green"])
        center_text(d, (cx - 45, cy + 2, cx + 45, cy + 34), "Owner", fonts["small"], COL["ink"])
        for i, (main, _) in enumerate([("Explore", "Find facts"), ("Build", "Make patch"), ("Report", "Return result")]):
            angle = t * math.tau * 0.16 + i * math.tau / 3 - math.pi / 2
            ax = cx + math.cos(angle) * 112
            ay = cy + math.sin(angle) * 112
            d.line(xy((cx, cy, ax, ay)), fill=rgba(COL["green2"], 110), width=2 * draw_scale)
            rounded(d, (ax - 62, ay - 50, ax + 62, ay + 50), 20, "white", rgba(COL["green2"], 170), 2)
            agent_icons[i](d, ax, ay - 12, COL["green"], (t + i / 3) % 1)
            center_text(d, (ax - 60, ay + 16, ax + 60, ay + 40), main, fonts["tiny"], COL["ink"])

        rounded(d, (92, 760, 378, 822), 18, "#f8fbff", "#dcecff", 1)
        rounded(d, (522, 760, 808, 822), 18, "#f7fcfa", "#d9f1e5", 1)
        center_text(d, (105, 766, 365, 790), "Best for reusable behavior", fonts["small"], COL["blue"])
        center_text(d, (105, 790, 365, 815), "One agent, better technique", fonts["tiny"], COL["soft"])
        center_text(d, (535, 766, 795, 790), "Best for parallel delegation", fonts["small"], COL["green"])
        center_text(d, (535, 790, 795, 815), "Many agents, scoped tasks", fonts["tiny"], COL["soft"])
        d.text(xy((52, 835)), "concept-gif", font=fonts["tiny"], fill="#8b94a3")

        frames.append(im.convert("RGB").resize((out_px, out_px), Image.Resampling.LANCZOS))

    preview.parent.mkdir(parents=True, exist_ok=True)
    output.parent.mkdir(parents=True, exist_ok=True)
    frames[0].save(preview)
    frames[0].save(output, save_all=True, append_images=frames[1:], duration=int(1000 / FPS), loop=0, optimize=True, disposal=2)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--ultra-hd", action="store_true", help="Render 1800x1800 instead of 900x900")
    args = parser.parse_args()

    stem = "skills-vs-sub-agents-ultra-hd" if args.ultra_hd else "skills-vs-sub-agents"
    export_scale = 2 if args.ultra_hd else 1
    render(Path("renders") / f"{stem}.gif", Path("renders") / f"{stem}-preview.png", export_scale)
    print(f"wrote renders/{stem}.gif")


if __name__ == "__main__":
    main()
