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
| `grid`     | a matrix of buckets / categories           | `cells[]` → `items[]`          | frameworks, "the N Ps", 2×2s, comparison matrices       |
| `steps`    | an ordered process / checklist             | `steps[]`                      | how-tos, playbooks, numbered checklists                 |
| `funnel`   | progressive filtering / qualification      | `stages[]` (+ `drop[]`)        | "find your niche", lead/qualification funnels, elimination |
| `compare`  | two sides weighed against each other       | `left{}` vs `right{}`          | before/after, old vs new, myth vs reality, do/don't     |

`galaxy` and `flow` are the **diagram** metaphors (network/architecture look).
`grid`, `steps`, `funnel`, and `compare` are the **creator-card** metaphors —
bold, color-coded gradient boxes in the LinkedIn-infographic style of creators
like Vincent Pierri. They pair naturally with the `creator-pop` theme and the
`linkedin-*` presets (see [`design.md`](design.md)). All six share the same icon
kit and motion grammar. Adding a seventh means adding one builder to `LAYOUTS`
in `index.html` — see §7.

## 2. Pick a density

Before writing `frame.js`, choose how much of the concept should fit in one
loop. This can be a user question: **"How dense should this GIF be: sparse,
balanced, or dense?"**

| density    | best for                                      | galaxy budget                         | flow budget                         | label style                  |
| ---------- | --------------------------------------------- | ------------------------------------- | ----------------------------------- | ---------------------------- |
| `sparse`   | quick social share, executive summary, teaser | 2-3 zones, 2-3 satellites each        | 2-3 tiers, 2-3 items each           | 1-2 word labels              |
| `balanced` | default explainer GIF                         | 3-4 zones, 3 satellites each          | 3-4 tiers, 2-3 items each           | short labels, ~18 chars max  |
| `dense`    | reference map where detail matters            | 4 zones, 3-4 satellites each          | 4-5 tiers, 3-4 items each           | only if proof-check passes   |

Hard cap for a readable square GIF:

- **galaxy:** keep total visible nodes at or below 16 for normal use.
- **flow:** keep total visible items at or below 14 for normal use.
- Prefer fewer nodes with clearer labels over complete coverage.
- If the concept needs more detail, make multiple GIFs instead of one dense one.
- Preset `density` is authoring guidance; the engine does not add/remove nodes
  from it. Galaxy rendering still auto-condenses from actual satellite count.

Suggested user question:

```text
How dense should this be?
- Sparse: clean high-level summary
- Balanced: default explainer
- Dense: more complete, may need stricter proof-checking
```

## 3. Schema

### Shared top-level fields

```js
window.FRAME = {
  metaphor: "galaxy" | "flow" | "grid" | "steps" | "funnel" | "compare",  // default "galaxy"
  theme:    "editorial-light" | "technical-blueprint" | "product-polish" | "minimal-saas"
            | "sunset" | "ocean" | "forest" | "berry" | "creator-pop",
  preset:   "executive-explainer" | "engineering-map" | "product-workflow" | "social-share"
            | "linkedin-grid" | "linkedin-steps" | "linkedin-funnel" | "linkedin-compare",
  title:   "A Harnessed LLM Agent",
  kicker:  "Anatomy of an Agent", // small eyebrow above the title (optional)
  credit:  "concept-gif",         // bottom-left tag (optional)
  design:  { ink: "#16202e" },     // optional focused design token overrides
  /* ...metaphor-specific fields below... */
};
```

`theme`, `preset`, and `design` are optional. If `preset` provides a default
metaphor, the frame can omit `metaphor`; an explicit `metaphor` always wins.

### `galaxy` fields

```js
zones: [
  {
    id: "skills",            // unique id (used by orbit)
    label: "Skills",         // hub label
    color: "blue",           // a key in design.js palette, or use role
    role: "execution",       // optional semantic default for color/icon/motion
    x: 0.205, y: 0.46,       // normalized 0..1 hub position in the diagram box
    r: 0.150,                // zone radius (fraction of canvas; ~0.14-0.17)
    hub:  { icon: "bulb", motion: "glow" },
    sats: [                  // 2-6 satellites
      { label: "Operational Procedure", role: "input", icon: "flow", motion: "flow", a: 318, d: 1.02 },
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
    color: "blue",          // a key in design.js palette, or use role
    role: "input",          // optional semantic default for color/icon/motion
    items: [                // 1-4 components in a row
      { label: "Browser", role: "context", icon: "browser", motion: "flow" },
    ],
  },
],
```

Use 3-5 tiers and 1-4 items each. The engine sizes bands automatically.

### Semantic roles

Use roles when you want content to describe meaning instead of visual choices.
The engine maps each role to a default color, icon, and motion; explicit
`color`, `icon`, or `motion` values still override the role.

Built-in roles: `input context decision execution quality feedback platform`.

```js
tiers: [
  { label: "Signal", role: "input", items: [
    { label: "Customer signal" },
    { label: "Repo context", role: "context" },
  ] },
  { label: "Build", role: "execution", items: [
    { label: "Prototype" },
    { label: "Repo changes", icon: "git", motion: "orbit" },
  ] },
]
```

### Creator-card fields (`grid` · `steps` · `funnel` · `compare`)

These build bold, color-coded gradient cards (the LinkedIn-infographic look).
Each card carries one icon that takes a `motion`; text on the colored fills is
auto-darkened for WCAG AA. Omit `color`/`role` and the engine auto-rotates
categorical colors. Use the `linkedin-*` presets to inherit `creator-pop` + the
right metaphor. **Keep motion even and moderate** across cards (e.g. `pulse`,
`bob`, `sway`, `shuffle`) — on a mostly-static infographic, one oversized motion
(`bars`, `spin`) or a near-static one (`glow`) skews proof-check's spike ratio.

```js
// grid — a matrix of buckets (the "4 Ps", a 2×2, a comparison matrix)
metaphor: "grid",
cols: 2,                         // optional; default 2 for ≤4 cells, else 3
cells: [
  { label: "Personal", color: "rose", icon: "user", motion: "pulse",
    items: ["Stories", "Wins & failures", "Lessons learned"] },   // 2-4 short items
],

// steps — an ordered checklist down a marching progress rail
metaphor: "steps",
steps: [
  { n: 1, label: "Pain point", color: "rose", icon: "decide", motion: "morph",
    detail: "Solves a problem people feel" },                     // detail optional
],

// funnel — narrowing filter stages; rejected chips fade + drop away each loop
metaphor: "funnel",
stages: [
  { label: "Can you teach it?", color: "teal", icon: "bulb", motion: "pulse",
    note: "subtitle on the bar",       // optional
    keep: "4 left",                    // optional survivors badge (right of bar)
    drop: ["Too niche"] },             // optional rejected chips — keep them SHORT (≤ ~12 chars)
],

// compare — two columns weighed against each other, with a center VS badge
metaphor: "compare",
vs: "VS",                              // optional center badge text
left:  { label: "Looks Good", color: "slate", icon: "eye", motion: "blink",
         items: ["Pretty template", "Generic tips", "0 saves"] },
right: { label: "Gets Saved", color: "green", icon: "approve", motion: "draw",
         items: ["Real pain point", "Usable today", "Shares & DMs"] },
```

Budgets (sparse, the card default): `grid` 4-6 cells × 2-4 items · `steps` 4-6
steps · `funnel` 4-5 stages · `compare` 3-5 paired rows. Cards are text-first —
fewer, sharper items beat dense ones. Run `hyperframes inspect` to catch overflow.

## 4. Icon catalog

`icon` names map to SVGs in `index.html` `ICONS`. Each renders white inside a
hub, palette-colored inside a satellite/component.

- **Concept / agent:** `bulb harness brain network flow link decide sandbox
  orchestra eye compress approve evaluator papers graph bars persona user
  robots tools`
- **Technical / infra:** `server database cloud browser code plug gear shield
  chat layers terminal clock search globe lightning cpu git lock doc`

Pick the closest match; an unknown name falls back to `network`. To add a new
one, see §6.

## 5. Motion catalog

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

## 6. Add a new icon

1. Draw it in a `0 0 100 100` viewBox using
   `fill="none" stroke="currentColor" stroke-width≈6.5`, round caps.
2. Mark the animated part with the right `data-*` hook from §5 (e.g. wrap a
   spinnable group in `<g data-spin>…</g>`).
3. Add it to the `ICONS` object in `index.html` (and keep the engine template
   in sync). Use `currentColor` so it adapts to hub/satellite contexts.

## 7. Add a new metaphor

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

Two builder styles exist in `LAYOUTS`:
- **Node builders** (`galaxy`, `flow`) emit `.node` elements via `makeNode(...)`;
  the engine applies their `motion` automatically in a final pass.
- **Card builders** (`grid`, `steps`, `funnel`, `compare`) build their own card
  DOM and call `MOTION[m](iconWrapper)` directly — the wrapper only needs a
  `.node-icon` child. Use `deepGrad(P)` for any white-text-on-color fill (it
  darkens the lighter palette slots enough for AA) and put text in an inner
  `<span>` so the contrast validator samples the box, not the glyph.

## 8. Worked examples

- **`examples/harnessed-llm-agent`** — `galaxy`. "A Harnessed LLM Agent":
  three zones (Skills, Runtime, Memory) with short labels.
- **`examples/frontend-backend`** — `flow`. "Web App Architecture": three tiers
  (Client → Application → Platform) a request flows through.
- **`examples/rag-answer-loop`** — `flow`. "RAG Answer Loop": compact
  retrieval-to-answer pipeline.
- **`examples/product-workflow-roles`** — `flow`. Demonstrates `preset`,
  `roleOrder`, and semantic role defaults.
- **`examples/skills-vs-sub-agents`** — `flow` plus rendered assets,
  proof-check manifest, and normal/UHD fallback GIF renderer.

Creator-card metaphors (LinkedIn-infographic style, `creator-pop` theme):

- **`examples/linkedin-niche-funnel`** — `funnel`. "How to Find Your Niche":
  5-stage filtering with rejected chips dropping away.
- **`examples/linkedin-content-4ps`** — `grid`. "The 4-P Content Mix": a 2×2 of
  color-coded framework cards.
- **`examples/linkedin-viral-checklist`** — `steps`. "5 Tests for a Viral Post":
  numbered checklist down a marching rail.
- **`examples/linkedin-stale-vs-saved`** — `compare`. "Why Most Infographics
  Flop": two columns + VS badge. Each ships a `proof.json` that relaxes
  `delta_spike_ratio` for the sparse-motion card family.

Read either `frame.js` next to its rendered GIF to see the schema in practice.
