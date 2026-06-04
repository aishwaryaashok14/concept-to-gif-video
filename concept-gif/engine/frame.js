/* ============================================================
   FRAME  —  the content (machine mirror of frame.md)
   THIS is the only file you change to make a GIF about a new
   topic. Steps:
     1. Pick a title + an eyebrow (kicker).
     2. Break the concept into 3-5 zones (pillars). Give each a
        color (a key in design.js palette), a position (x,y),
        a radius (r), a hub icon, and 2-6 satellites.
     3. For every node choose an icon + a motion.
     4. (Optional) list the hub ids the dashed orbit weaves through.

   coords: x,y normalized 0..1 inside the diagram box.
   angle a: compass degrees around the hub (0=N, 90=E, 180=S, 270=W).
   d: satellite distance, a multiple of the zone radius (~1.0-1.15).

   icons & motions catalogs live in frame.md (and ICONS / MOTION in
   index.html). Quick reference:
   icons:   bulb harness brain network flow link decide sandbox
            orchestra eye compress approve evaluator papers graph
            bars persona user robots tools
   motions: glow pulse bob squish sway spin orbit blink flow draw
            bars shuffle morph
   roles:   input context decision execution quality feedback platform
   ============================================================ */
window.FRAME = {
  title: "How RAG Works",
  kicker: "Retrieval-Augmented Generation",
  credit: "concept-gif",
  zones: [
    { id: "retrieve", label: "Retrieve", color: "blue", x: 0.22, y: 0.40, r: 0.155,
      hub: { icon: "graph", motion: "orbit" },
      sats: [
        { label: "Query Embedding", icon: "network", motion: "pulse", a: 320, d: 1.04 },
        { label: "Vector Search",   role: "decision", a: 40,  d: 1.05 },
        { label: "Top-K Chunks",    icon: "papers",  motion: "shuffle", a: 200, d: 1.06 },
      ] },
    { id: "augment", label: "Augment", color: "green", x: 0.52, y: 0.62, r: 0.16,
      hub: { icon: "compress", motion: "squish" },
      sats: [
        { label: "Context Window", icon: "bars",      motion: "bars", a: 300, d: 1.05 },
        { label: "Prompt Assembly", icon: "orchestra", motion: "pulse", a: 30, d: 1.05 },
        { label: "Re-ranking",     icon: "evaluator", motion: "draw", a: 160, d: 1.06 },
      ] },
    { id: "generate", label: "Generate", color: "amber", x: 0.80, y: 0.36, r: 0.155,
      hub: { icon: "bulb", motion: "glow" },
      sats: [
        { label: "LLM Synthesis", icon: "brain", motion: "glow",  a: 40,  d: 1.05 },
        { label: "Grounded Answer", icon: "approve", motion: "spin", a: 150, d: 1.06 },
        { label: "Citations",    icon: "link",  motion: "sway",  a: 250, d: 1.05 },
      ] },
  ],
  orbit: ["retrieve", "augment", "generate"],
};
