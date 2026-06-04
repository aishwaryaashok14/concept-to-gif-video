# concept → gif

Turn **any concept** into a looping, animated infographic GIF. Describe the idea
as data; a fixed engine renders it as a seamless square loop where every element
has a subtle micro-motion. Built on [HyperFrames](https://hyperframes.heygen.com)
(HTML-as-video), inspired by the [Daily Dose of DS](https://www.dailydoseofds.com)
concept-map style.

|  `galaxy` metaphor — anatomies / taxonomies  |  `flow` metaphor — architectures / pipelines  |
| :---: | :---: |
| ![A Harnessed LLM Agent](examples/harnessed-llm-agent/renders/harness.gif) | ![Web App Architecture](examples/frontend-backend/renders/fb.gif) |

## The idea: separate look, content, and metaphor

A "theme" should decide the **metaphor** (the visual structure), not just the
palette. So three things are split:

| File         | Role                              | Changes per…            |
| ------------ | --------------------------------- | ----------------------- |
| `design.js`  | the **look** (palette, type, motion feel) | brand / style    |
| `frame.js`   | the **content** + the **metaphor**        | every topic      |
| `index.html` | the **engine** (icons, motion grammar, layouts) | never (per topic) |

To make a GIF about a new topic you write **one `frame.js`** — pick a metaphor,
list the groups, give every node an icon and a motion. The engine does the rest.

```
window.FRAME = {
  metaphor: "galaxy",            // or "flow"
  title: "A Harnessed LLM Agent",
  zones: [
    { id:"skills", label:"Skills", color:"blue", x:0.2, y:0.4, r:0.15,
      hub:{ icon:"bulb", motion:"glow" },
      sats:[ { label:"Decision Heuristics", icon:"decide", motion:"morph" }, … ] },
    …
  ],
};
```

## Metaphors

- **`galaxy`** — groups orbit a center: a hub (icon + label) ringed by
  satellites, with a dashed orbit weaving through. For *parts of a whole*.
- **`flow`** — stacked, color-coded tiers of components joined by downward
  marching arrows. For *stages a thing passes through* (request → response).

The theme picks the metaphor. Adding a third (`timeline`, `network`, …) is one
builder in `LAYOUTS` — see [`concept-gif/frame.md`](concept-gif/frame.md) §6.

## Motion grammar

Every node gets exactly one seamless, seek-safe micro-loop:
`glow · pulse · bob · squish · sway · spin · orbit · blink · flow · draw · bars ·
shuffle · morph`. They loop perfectly (no seam) because each spans the full loop
and returns to its start; variety comes from different periods, not staggered
starts.

## Make your own

```bash
cp -r concept-gif/engine my-gif && cd my-gif
$EDITOR frame.js                      # describe your concept (see concept-gif/frame.md)
npx hyperframes lint && npx hyperframes validate && npx hyperframes inspect
npx hyperframes render --quality standard --resolution square -o renders/out.mp4
../concept-gif/render-gif.sh renders/out.mp4   # mp4 -> looping gif
```

## Repo layout

```
concept-gif/            the reusable skill
  SKILL.md              when/how to use it (Claude Code skill)
  design.md             the look — spec for design.js
  frame.md              the content — schema + metaphor / icon / motion catalogs
  render-gif.sh         mp4 -> looping gif helper (ffmpeg)
  engine/               index.html (engine) · design.js · frame.js · vendor/gsap.min.js
examples/
  harnessed-llm-agent/  galaxy — "A Harnessed LLM Agent"
  frontend-backend/     flow   — "Web App Architecture"
```

## Notes

- Output is a **square, seamless, looping** GIF (rendered MP4 → GIF via ffmpeg).
- Self-contained: GSAP is vendored locally; rendering is deterministic and needs
  no network.
- Fonts (Outfit / Inter by default) are embedded by HyperFrames from static CSS —
  to change them, edit the two `font-family` lines in `index.html` and pick a
  supported font.

Made with [HyperFrames](https://hyperframes.heygen.com) · concept-map style after
[Daily Dose of DS](https://www.dailydoseofds.com).
