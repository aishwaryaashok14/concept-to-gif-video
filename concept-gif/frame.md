# frame.md — the content (topic-agnostic schema)

This file defines **what a concept GIF says** and **which metaphor it uses**.
It is the human-readable schema; its machine mirror per topic is a
[`engine/frame.js`](engine/frame.js). To make a GIF about a new topic you write
**one `frame.js`** — nothing else changes. The look comes from
[`design.md`](design.md) / `design.js`; the engine and motion grammar are fixed.

> **The big idea: the theme picks the metaphor, not just the palette.**
> A taxonomy wants a *galaxy*; an architecture wants a *flow*. Choose the
> metaphor that matches the concept's shape, then fill its structure.

---

## 1. Pick a metaphor

`FRAME.metaphor` selects the layout. Choose by the **shape of the idea**:

| metaphor   | shape of idea                              | structure in frame.js          | good for                                                |
| ---------- | ------------------------------------------ | ------------------------------ | ------------------------------------------------------- |
| `galaxy`   | parts of a whole, orbiting a center        | `zones[]` → hub + `sats[]`     | anatomies, taxonomies, "the N pillars of X", ecosystems |
| `flow`     | stages a thing passes through, top→bottom  | `tiers[]` → `items[]`          | architectures, pipelines, request/response, layered systems |

Both share the same look, icon kit, and motion grammar. Adding a third
metaphor (e.g. `timeline`, `network`, `radial`) means adding one builder to
`LAYOUTS` in `index.html` — see §6.

## 2. Schema

### Shared top-level fields

```js
window.FRAME = {
  metaphor: "galaxy" | "flow",   // default "galaxy"
  title:   "A Harnessed LLM Agent",
  kicker:  "Anatomy of an Agent", // small eyebrow above the title (optional)
  credit:  "concept-gif",         // bottom-left tag (optional)
  /* ...metaphor-specific fields below... */
};
```

### `galaxy` fields

```js
zones: [
  {
    id: "skills",            // unique id (used by orbit)
    label: "Skills",         // hub label
    color: "blue",           // a key in design.js palette
    x: 0.205, y: 0.46,       // normalized 0..1 hub position in the diagram box
    r: 0.150,                // zone radius (fraction of canvas; ~0.14-0.17)
    hub:  { icon: "bulb", motion: "glow" },
    sats: [                  // 2-6 satellites
      { label: "Operational Procedure", icon: "flow", motion: "flow", a: 318, d: 1.02 },
      // a = compass angle around the hub (0=N, 90=E, 180=S, 270=W)
      // d = distance as a multiple of the zone radius (~1.0-1.15)
    ],
  },
],
orbit: ["skills", "harness", "protocols", "memory"], // dashed loop through hubs (optional)
```

Layout tips: place hubs to fill the square; let translucent blobs overlap
softly; spread satellites toward the *outside* of the cluster (away from
neighbors). Run `hyperframes inspect` to catch label overflow.

### `flow` fields

```js
tiers: [   // top -> bottom; arrows flow downward between tiers
  {
    label: "Client",        // tier pill (left)
    color: "blue",          // a key in design.js palette
    items: [                // 1-4 components in a row
      { label: "Browser", icon: "browser", motion: "flow" },
    ],
  },
],
```

Use 3-5 tiers and 1-4 items each. The engine sizes bands automatically.

## 3. Icon catalog

`icon` names map to SVGs in `index.html` `ICONS`. Each renders white inside a
hub, palette-colored inside a satellite/component.

- **Concept / agent:** `bulb harness brain network flow link decide sandbox
  orchestra eye compress approve evaluator papers graph bars persona user
  robots tools`
- **Technical / infra:** `server database cloud browser code plug gear shield
  chat layers terminal clock search globe lightning cpu git lock doc`

Pick the closest match; an unknown name falls back to `network`. To add a new
one, see §5.

## 4. Motion catalog

Every node takes exactly **one** `motion`. All are seamless over the loop and
seek-safe. Some need a matching `data-*` hook inside the icon (noted below);
if the hook is absent the motion degrades gracefully to the whole icon.

| motion    | effect                              | needs hook        |
| --------- | ----------------------------------- | ----------------- |
| `glow`    | aura breathes behind the node       | — (every node)    |
| `pulse`   | icon gently scales                  | —                 |
| `bob`     | icon floats up/down                 | —                 |
| `squish`  | icon compresses horizontally        | `[data-squish]`   |
| `sway`    | part rocks back and forth           | `[data-sway]`     |
| `spin`    | part rotates continuously           | `[data-spin]`     |
| `orbit`   | a group of dots circles             | `[data-orbit]`    |
| `blink`   | eyelid closes / indicator pulses    | `[data-lid]` or `[data-blink]` |
| `flow`    | dashes march along a path           | `[data-flow]`     |
| `draw`    | a stroke draws on and off           | `[data-draw]`     |
| `bars`    | bars rise and fall (stagger)        | `[data-bar]`      |
| `shuffle` | stacked cards cycle                 | `[data-card]`     |
| `morph`   | crossfade between two glyph states  | `[data-morph]`    |

Keep it calm: one motion per node, subtle amplitude. The loop should feel
alive, not busy.

## 5. Add a new icon

1. Draw it in a `0 0 100 100` viewBox using
   `fill="none" stroke="currentColor" stroke-width≈6.5`, round caps.
2. Mark the animated part with the right `data-*` hook from §4 (e.g. wrap a
   spinnable group in `<g data-spin>…</g>`).
3. Add it to the `ICONS` object in `index.html` (and keep the engine template
   in sync). Use `currentColor` so it adapts to hub/satellite contexts.

## 6. Add a new metaphor

Add a builder to `LAYOUTS` in `index.html`:

```js
LAYOUTS.timeline = function (F) {
  // read your own FRAME fields, append DOM to $blobs/$lines/$nodes via
  // makeNode(...) and svgEl(...), and add any structural ambient tweens to tl.
  // Per-node MOTION is applied automatically afterward.
};
```

Document its fields here and you're done — `FRAME.metaphor = "timeline"` routes
to it.

## 7. Worked examples

- **`examples/harnessed-llm-agent`** — `galaxy`. "A Harnessed LLM Agent": four
  zones (Skills, Harness, Memory, Protocols) of orbiting capabilities.
- **`examples/frontend-backend`** — `flow`. "Web App Architecture": four tiers
  (Client → Frontend → API Layer → Data) a request flows through.

Read either `frame.js` next to its rendered GIF to see the schema in practice.
