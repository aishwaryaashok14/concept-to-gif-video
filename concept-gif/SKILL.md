---
name: concept-gif
description: >-
  Turn any concept into a looping, animated infographic GIF — a clean
  hub-and-satellite "galaxy" or a layered "flow" diagram where every element
  has a subtle micro-motion, rendered as a seamless square loop via HyperFrames.
  Use when the user wants an explainer GIF, an animated concept map or
  architecture diagram, a shareable looping infographic, or says things like
  "make a gif about X", "turn this concept into a moving graphic", or "animate
  this diagram". The theme picks the metaphor (structure), design.js picks the
  look, frame.js picks the content.
---

# concept-gif

Make a looping, animated concept GIF about **any** topic. One fixed engine
renders a data file (`frame.js`) with a theme file (`design.js`) into a seamless
square loop where every node has a subtle, seek-safe micro-motion.

**The model:** `design.js` = the look (shared) · `frame.js` = the content +
**metaphor** (per topic) · `index.html` = the engine (never edited per topic).

> The big idea: **the theme picks the metaphor, not just the palette.** A
> taxonomy → `galaxy`; an architecture → `flow`. Pick the structure that matches
> the concept, then fill it in.

## Workflow

1. **Understand the concept, density, style, and metaphor.** Read
   [`frame.md`](frame.md) §§1–2 and [`design.md`](design.md) §Style presets.
   If the user has not implied a detail level, ask:
   "How dense should this be: sparse, balanced, or dense?"
   - `sparse` — clean high-level summary
   - `balanced` — default explainer
   - `dense` — more complete, but must pass stricter proof-checking

   If the user has not implied a visual style, ask:
   "Which visual style should this use?"
   - `editorial-light` — clean default infographic
   - `technical-blueprint` — sharper, cooler, more diagram-like
   - `product-polish` — warmer, presentation-ready

   When an ask-question / choice tool is available, use it for these choices so
   the user can pick density and style quickly. Otherwise ask the same questions
   in plain chat. If the user does not answer, default to `balanced` and
   `editorial-light`.

   Then decompose the topic into groups:
   - `galaxy` — groups orbit a center (anatomies, taxonomies, "N pillars of X").
   - `flow` — groups are stages a thing passes through top→bottom (architectures,
     pipelines, request flows).

2. **Scaffold a project.** Copy the engine into a new folder:
   ```bash
   cp -r <skill>/concept-gif/engine my-gif && cd my-gif
   ```
   It contains `index.html` (engine), `design.js`, `frame.js`, `vendor/gsap.min.js`.
   Add a `hyperframes.json` if you want `npx hyperframes` niceties (optional —
   copy one from `examples/`).

3. **Write `frame.js`.** This is the only file you author per topic. Follow the
   schema, density budget, and the **icon catalog** + **motion catalog** in
   [`frame.md`](frame.md). Give every node an `icon` and one `motion`.

4. **Apply the selected style in `design.js`.** Palette, loop length, easing —
   see [`design.md`](design.md). If you change the title/label **font**, also
   edit the two `font-family` lines in `index.html` (HyperFrames embeds fonts
   from static CSS) and use a supported font (Inter, Outfit, Montserrat,
   Poppins…).

5. **Verify the source.** Always run before rendering:
   ```bash
   npx hyperframes lint && npx hyperframes validate && npx hyperframes inspect
   ```
   Fix errors; address contrast warnings; `inspect` must report 0 layout issues.

6. **Render + make the GIF.**
   ```bash
   npx hyperframes render --quality standard --resolution square -o renders/out.mp4
   ./render-gif.sh renders/out.mp4 renders/out.gif      # mp4 -> looping gif (ffmpeg)
   ```

7. **Proof-check the rendered GIF.** Use `proof-check.py` to sample the actual
   GIF and catch clutter, blocked connector lanes, jitter, and loop seam jumps:
   ```bash
   python3 ../../concept-gif/proof-check.py renders/out.gif --out renders/proof/out
   # add --manifest proof.json when arrows/connectors need lane checks
   ```
   A `proof.json` manifest is optional, but recommended whenever arrows or
   connector paths matter. It defines the colored lanes that should remain
   visible through the loop.

8. **Look at it.** Review the proof contact sheet and the GIF itself. Iterate on
   `frame.js` positions/angles if labels crowd, paths are hidden, or motion reads
   as jitter instead of a smooth loop.

## Hard rules (inherited from HyperFrames + this engine)

- **Seamless loop:** every motion spans the full `DESIGN.loop` and returns to its
  start. Don't add start-time offsets — they break the seam. Variety comes from
  different *periods* per motion. The engine's `yoyo()`/`cycle()` enforce this.
- **One motion per node.** Never stack two motions on one element.
- **Deterministic:** no `Math.random()` / `Date.now()` / network at render
  (GSAP is vendored locally).
- **Fonts come from static CSS**, not runtime injection.
- **Density is a product decision:** do not pack in every subtopic by default.
  Ask for sparse / balanced / dense when unclear, and split into multiple GIFs
  when a dense version would exceed the readable node budget.
- **Style is an intake decision:** ask for editorial-light / technical-blueprint
  / product-polish when unclear. Keep style changes in `design.js`; keep concept
  structure in `frame.js`.

## Extending

- **New icon** → add an SVG to `ICONS` in `index.html` with the right `data-*`
  hook (frame.md §6).
- **New metaphor** → add a builder to `LAYOUTS` in `index.html` (frame.md §7),
  then `FRAME.metaphor` routes to it.

## References

- [`design.md`](design.md) — the look: canvas, palette, type, icon style, motion language.
- [`frame.md`](frame.md) — the content: metaphor catalog, frame.js schema, icon catalog, motion catalog.
- `examples/harnessed-llm-agent` — sparse/balanced galaxy.
- `examples/frontend-backend` and `examples/rag-answer-loop` — compact flows.
- `examples/skills-vs-sub-agents` — complete generated example with GIF,
  ultra-HD GIF, proof manifest, and fallback renderer.
