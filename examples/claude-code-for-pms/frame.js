/* ============================================================
   FRAME — Claude Code for PMs
   A compact flow for how product managers can turn intent into shipped work.
   ============================================================ */
window.FRAME = {
  metaphor: "flow",
  title: "Claude Code for PMs",
  kicker: "From product intent to shipped learning",
  credit: "product workflow",
  tiers: [
    { label: "Signal", color: "teal", items: [
      { label: "Customer signal", icon: "chat", motion: "blink" },
      { label: "Metrics", icon: "bars", motion: "bars" },
      { label: "Repo context", icon: "search", motion: "draw" },
    ] },
    { label: "Product Intent", color: "amber", items: [
      { label: "PRD", icon: "doc", motion: "draw" },
      { label: "Acceptance", icon: "approve", motion: "draw" },
      { label: "Priorities", icon: "decide", motion: "morph" },
    ] },
    { label: "Claude Code", color: "purple", items: [
      { label: "Prototype", icon: "code", motion: "sway" },
      { label: "Repo changes", icon: "git", motion: "orbit" },
      { label: "Review loop", icon: "evaluator", motion: "shuffle" },
    ] },
    { label: "Launch Learning", color: "rose", items: [
      { label: "QA pass", icon: "shield", motion: "glow" },
      { label: "Ship notes", icon: "papers", motion: "shuffle" },
      { label: "Insights", icon: "graph", motion: "orbit" },
    ] },
  ],
};
