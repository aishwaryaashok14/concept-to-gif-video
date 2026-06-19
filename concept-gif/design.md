# design.md — the visual system (topic-agnostic)

This file defines **how a concept GIF looks**. Its machine mirror is
[`engine/design.js`](engine/design.js), which now acts as a reusable design
registry: base tokens + named themes + composition presets + semantic roles.
Most GIFs should choose a `theme` or `preset` in `frame.js` instead of editing
`design.js` per topic. (For *what* the GIF says, see [`frame.md`](frame.md).)

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

## Themes And Presets

Style can be a user choice before writing `frame.js`. Keep the choices few and
meaningful; do not offer endless palette knobs.

Suggested user question:

```text
Which visual style should this use?
- Editorial light: clean default infographic
- Technical blueprint: sharper, cooler, more diagram-like
- Product polish: warmer, presentation-ready
```

**Polish themes** keep the same categorical hues (blue=blue, green=green, …) and
only shift temperature, neutrals, and styling:

| style | use when | design direction |
| --- | --- | --- |
| `editorial-light` | default, clear explainers | white panel, soft categorical hues, calm micro-motion |
| `technical-blueprint` | engineering, architecture, systems | cooler blue/teal/slate palette, thinner lines, tighter labels |
| `product-polish` | stakeholder/shareable output | slightly warmer palette, stronger hierarchy, softer shadows |
| `minimal-saas` | operational/product diagrams | restrained UI-like styling, lower shadow, tighter radius |

**Bold color stories** *recolor the whole palette* into a new categorical scheme
— reach for these when the user wants a visibly different color scheme, not just
a different polish. Here the seven palette keys are **slots, not literal hues**
(e.g. in `sunset`, key `purple` renders as coral); a frame still picks one key
per zone for separation, and the theme decides the actual colors.

| style | mood | the seven slots render as |
| --- | --- | --- |
| `sunset` | warm, energetic | coral · gold · rose · orchid · tangerine · raspberry · taupe |
| `ocean` | cool, calm | indigo · azure · emerald · teal · gold · magenta · steel |
| `forest` | earthy, natural | clay · moss · forest · denim · ochre · rust · stone |
| `berry` | vivid jewel | violet · blue · teal · gold · amber · magenta · plum |
| `creator-pop` | bold LinkedIn-infographic | saturated blue · green · violet · amber · pink · teal · slate, big radius, punchy |

`creator-pop` is built for the **creator-card metaphors** (`grid`, `steps`,
`funnel`, `compare`) — bold, color-coded gradient boxes in the style of
LinkedIn infographic creators like Vincent Pierri. White text on color fills is
auto-darkened to AA by the engine's `deepGrad()`. Reach for it (or the
`linkedin-*` presets) when the goal is a punchy, save-worthy social post rather
than a calm editorial diagram.

Set the selected theme in `frame.js`:

```js
window.FRAME = {
  theme: "product-polish",
  title: "Claude Code for PMs",
  /* ... */
};
```

Presets bundle a theme with product decisions like default metaphor, role order,
advisory density, and motion intensity. The engine consumes `motionScale` by
scaling micro-motion amplitudes, and consumes `roleOrder` by assigning role
colors/defaults to tiers or zones that omit both `color` and `role`.

| preset | theme | use when |
| --- | --- | --- |
| `executive-explainer` | `editorial-light` | sparse, high-level stakeholder summary |
| `engineering-map` | `technical-blueprint` | denser system or architecture map |
| `product-workflow` | `product-polish` | staged PM/product/launch workflows |
| `social-share` | `product-polish` | fewer nodes, stronger hierarchy |
| `linkedin-grid` | `creator-pop` | framework matrix / "the N Ps" (sets `metaphor: grid`) |
| `linkedin-steps` | `creator-pop` | numbered checklist / process (sets `metaphor: steps`) |
| `linkedin-funnel` | `creator-pop` | filtering / qualification funnel (sets `metaphor: funnel`) |
| `linkedin-compare` | `creator-pop` | before/after, old vs new (sets `metaphor: compare`) |

`density` is authoring metadata: use it to decide how much content belongs in
one GIF and how strict proof-checking should be. The engine still auto-condenses
galaxy rendering from actual node count; it does not remove or add nodes from
the preset density value.

Use a preset when the output type is clear:

```js
window.FRAME = {
  preset: "product-workflow",
  title: "Claude Code for PMs",
  tiers: [/* ... */],
};
```

Frames may still provide focused overrides without forking the whole design:

```js
design: {
  ink: "#201a14",
  radius: { panel: "36px" },
}
```

The selected theme or preset should not change the topic structure; that is
still the job of `frame.js`. If you change title/label fonts, also edit the
static font-family lines in `index.html`.

## Semantic Roles

Nodes can use semantic `role`s instead of hardcoded color/icon/motion choices.
The engine maps roles through `DESIGN.roles`.

| role | default color | default icon | default motion |
| --- | --- | --- | --- |
| `input` | `teal` | `chat` | `flow` |
| `context` | `blue` | `search` | `draw` |
| `decision` | `amber` | `decide` | `morph` |
| `execution` | `purple` | `code` | `sway` |
| `quality` | `green` | `approve` | `draw` |
| `feedback` | `rose` | `graph` | `bars` |
| `platform` | `slate` | `server` | `pulse` |

You can still override any node explicitly:

```js
{ label: "Repo changes", role: "execution", icon: "git", motion: "orbit" }
```

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
catalog. Six are built in — two **diagram** metaphors and four **creator-card**
metaphors:

- **`galaxy`** (anatomies / taxonomies) — a reserved title band, then 3–5
  **zones** placed by normalized `x,y`, each a soft **blob** + **dashed ring** +
  central **hub** (icon + label), with **satellites** ringing each hub at a
  compass `angle`/`distance` and a dashed **orbit path** weaving through.
- **`flow`** (architectures / pipelines) — stacked **tiers** (color-coded bands
  with a pill label) holding a row of **components**, joined by downward
  **marching arrows** so the eye reads top→bottom.
- **`grid`** (frameworks / matrices) — an N×M of color-coded gradient **cards**,
  each with a header icon + label and a short bulleted list.
- **`steps`** (checklists / processes) — numbered **badges** down a marching
  progress **rail**, each beside an icon+label card.
- **`funnel`** (filtering / qualification) — **narrowing** stacked bars; rejected
  **chips** in the gutter fade and drop away each loop.
- **`compare`** (before/after) — two **columns** with a center **VS** badge, the
  winning side glowing.

The `grid`/`steps`/`funnel`/`compare` cards are the bold, save-worthy
LinkedIn-infographic shapes; they pair with `creator-pop` / the `linkedin-*`
presets, and put white text on color via `deepGrad()` (auto-darkened to AA).
Fill the square and let translucent blobs/bands breathe. Run `hyperframes
inspect` to catch label overflow. New metaphors are one builder in `LAYOUTS`.

## What NOT to do

- ❌ Pure `#000`/`#fff` — tint toward the palette.
- ❌ Gradient text, neon, glow-on-dark — this is a light, editorial infographic.
- ❌ More than one motion per node, or motion big enough to read as "moving."
- ❌ Fonts via CSS variable only (won't embed) or unsupported font names.
- ❌ Identical zones — vary hue, icon, and satellite count so the eye has order.
