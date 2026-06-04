# design.md — the visual system (topic-agnostic)

This file defines **how a concept GIF looks**. It is the human-readable
source of truth; its machine mirror is [`engine/design.js`](engine/design.js),
which the engine reads at runtime. Change a token here, change it in
`design.js`, re-render. Nothing in this file is topic-specific — the same
look is reused for every concept. (For *what* the GIF says, see
[`frame.md`](frame.md).)

---

## Canvas

| Token        | Value          | Notes                                            |
| ------------ | -------------- | ------------------------------------------------ |
| Aspect       | **Square**     | 1080×1080. (`data-resolution="square"`.)         |
| Loop         | **6 s**, seamless | `DESIGN.loop`. Frame at t=0 == frame at t=loop. |
| FPS (render) | 30 (mp4), 20 (gif) | GIF downsamples for size.                     |
| Output       | MP4 → looping GIF | HyperFrames renders MP4/WebM/MOV; ffmpeg makes the GIF. |

The whole piece is **one looping scene** — no scene cuts, no entrance/exit.
Every element is visible the whole time and animates *in place*.

## Color

A **tinted off-white** stage (never pure `#fff`/`#000`) holds a rounded white
panel. The diagram is **color-coded by zone**: each pillar of the concept owns
one hue from a categorical palette.

| Role        | Token             | Demo value | Use                                  |
| ----------- | ----------------- | ---------- | ------------------------------------ |
| Background  | `bg`              | `#eef1f6`  | page behind the panel                |
| Panel       | `panel`           | `#ffffff`  | the card the diagram sits on         |
| Ink         | `ink`             | `#16202e`  | title + hub labels                   |
| Ink (soft)  | `inkSoft`         | `#434c5c`  | satellite labels (≥ WCAG AA on panel)|
| Kicker      | `kicker`          | `#626c7e`  | eyebrow text                         |

**Zone palette** (`DESIGN.palette`) — one entry per zone. Each has four shades:

```
ring  — dashed boundary circle + connectors
tint  — soft blob wash behind the zone (used at ~8% opacity)
hub   — filled hub disc
glow  — aura behind every node in the zone
```

Built-in keys: `blue green purple amber rose teal slate`. Pick one per zone;
re-order or add keys for more pillars. Keep zones visually distinct.

**Contrast is enforced** by `hyperframes validate` (WCAG AA). If a label dips
below 4.5:1 (3:1 for the kicker), darken `inkSoft`/`kicker` — don't invent a
new color.

## Typography

| Slot              | Font     | Weight | Size  |
| ----------------- | -------- | ------ | ----- |
| Title             | `Outfit` | 800    | 70px  |
| Hub label         | `Inter`  | 800    | 30px  |
| Satellite label   | `Inter`  | 600    | 18px  |
| Kicker            | `Inter`  | 700    | 19px  |

⚠ **Fonts must be HyperFrames-supported and written as literals in static CSS**
(the compiler embeds fonts by scanning the CSS, not the runtime DOM). The two
`font-family` lines live in `index.html`. To change fonts: pick from the
supported list (Inter, Outfit, Montserrat, Poppins, Archivo, …), edit those two
CSS lines **and** the `fontTitle`/`fontLabel` notes in `design.js`. Pair one
display face (title) with one text face (labels).

## Icon style

Flat **duotone line icons** drawn in a `0 0 100 100` viewBox:

- `stroke="currentColor"`, `stroke-width` ≈ 6.5, round caps/joins.
- `currentColor` makes each icon adapt: **white inside hubs**, **zone-colored
  inside satellites** — one icon, two contexts.
- A few filled accents (`fill="currentColor"` at low opacity) add weight.
- No photoreal/skeuomorphic icons, no emoji, no external icon fonts.

## Motion language

Calm, continuous, **seamless** — the loop should be invisible.

- **One micro-loop per node.** Each icon does exactly one thing (glow, pulse,
  blink, spin, draw…). Never stack two motions on one element.
- **Subtle.** Scale ≤ 1.12, drift ≤ 8px, rotation drift ≤ 8° (full spins are
  allowed for gears/loaders). The viewer should feel life, not distraction.
- **Seamless over the loop.** Yoyo motions use an even number of half-cycles;
  linear motions (spins, dash-marches) complete a whole number of cycles. The
  engine's `yoyo()`/`cycle()` helpers enforce this — trust them.
- **Ambient drift.** Dashed zone rings and the weaving "orbit" path sway gently.
- **Deterministic.** No `Math.random()`/`Date.now()`. Phase offsets come from
  node index so nodes breathe out of sync but reproducibly.
- **Default ease** `sine.inOut` for breathing; `none` for linear loops.

## Layout system — metaphor decides the structure

The **theme picks the metaphor** (the structure), not just the palette. The
look in this file is shared across every metaphor; the structure is chosen per
topic in `frame.js` (`FRAME.metaphor`). See [`frame.md`](frame.md) for the
catalog. Two are built in:

- **`galaxy`** (anatomies / taxonomies) — a reserved title band, then 3–5
  **zones** placed by normalized `x,y`, each a soft **blob** + **dashed ring** +
  central **hub** (icon + label), with **satellites** ringing each hub at a
  compass `angle`/`distance` and a dashed **orbit path** weaving through.
- **`flow`** (architectures / pipelines) — stacked **tiers** (color-coded bands
  with a pill label) holding a row of **components**, joined by downward
  **marching arrows** so the eye reads top→bottom.

Fill the square and let translucent blobs/bands breathe. Run `hyperframes
inspect` to catch label overflow. New metaphors are one builder in `LAYOUTS`.

## What NOT to do

- ❌ Pure `#000`/`#fff` — tint toward the palette.
- ❌ Gradient text, neon, glow-on-dark — this is a light, editorial infographic.
- ❌ More than one motion per node, or motion big enough to read as "moving."
- ❌ Fonts via CSS variable only (won't embed) or unsupported font names.
- ❌ Identical zones — vary hue, icon, and satellite count so the eye has order.
