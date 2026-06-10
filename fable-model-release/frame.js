/* ============================================================
   FRAME — Claude Fable 5 Release   (metaphor: "galaxy")
   A diamond of four zones around the release story:
   Fable 5 itself (top) — what it is and where it sits;
   Specs (right) — the headline numbers; The Family (bottom) —
   how the existing models compare; API Surface (left) — what
   actually changes when you call it. A dashed orbit ties the
   release narrative through all four.

   Source of facts: claude-api skill, cached 2026-05-26 —
   Fable 5 = new tier above Opus, $10/$50 per MTok, 1M context,
   128K output, adaptive thinking only, sampling params removed,
   explicit thinking:"disabled" returns 400 (omit instead).

   coords: x,y normalized 0..1 in the diagram box.
   angle a: compass degrees (0=N, 90=E, 180=S, 270=W).
   d: satellite distance, a multiple of the zone radius.
   ============================================================ */
window.FRAME = {
  metaphor: "galaxy",
  theme: "product-polish",
  title: "Claude Fable 5",
  kicker: "Anthropic Model Release",
  credit: "concept-gif",
  zones: [
    // ---- Fable 5: the headline — what it is (top) ----
    { id: "fable", label: "Fable 5", color: "purple", x: 0.5, y: 0.24, r: 0.145,
      hub: { icon: "brain", motion: "glow" },
      sats: [
        { label: "Tier Above Opus",   icon: "layers",    motion: "pulse", a: 305, d: 1.2 },
        { label: "Most Intelligent",  icon: "bulb",      motion: "glow",  a: 0,   d: 1.12 },
        { label: "$10 / $50 per MTok", icon: "bars",     motion: "bars",  a: 55,  d: 1.2 },
      ] },

    // ---- Specs: the numbers people screenshot (right) ----
    { id: "specs", label: "Specs", color: "blue", x: 0.79, y: 0.54, r: 0.145,
      hub: { icon: "cpu", motion: "pulse" },
      sats: [
        { label: "1M Context",       icon: "database",  motion: "pulse", a: 35,  d: 1.18 },
        { label: "128K Max Output",  icon: "doc",       motion: "bob",   a: 90,  d: 1.14 },
        { label: "Effort up to Max", icon: "lightning", motion: "glow",  a: 145, d: 1.18 },
      ] },

    // ---- The Family: how the rest of the lineup compares (bottom) ----
    { id: "family", label: "The Family", color: "green", x: 0.5, y: 0.77, r: 0.15,
      hub: { icon: "robots", motion: "pulse" },
      sats: [
        { label: "Opus 4.8 · $5/$25",  icon: "graph",     motion: "draw",  a: 118, d: 1.12 },
        { label: "Sonnet 4.6 · Fast",  icon: "lightning", motion: "pulse", a: 180, d: 1.28 },
        { label: "Haiku 4.5 · 200K",   icon: "clock",     motion: "spin",  a: 242, d: 1.12 },
      ] },

    // ---- API Surface: what differs when you call it (left) ----
    { id: "api", label: "API Surface", color: "amber", x: 0.21, y: 0.54, r: 0.145,
      hub: { icon: "plug", motion: "sway" },
      sats: [
        { label: "Adaptive Thinking",  icon: "decide", motion: "morph", a: 325, d: 1.18 },
        { label: "No Temp / Top-p",    icon: "gear",   motion: "spin",  a: 270, d: 1.12 },
        { label: "No 'disabled' Flag", icon: "lock",   motion: "blink", a: 215, d: 1.18 },
      ] },
  ],
  orbit: ["fable", "specs", "family", "api"],
};
