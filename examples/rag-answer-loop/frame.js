/* ============================================================
   FRAME — RAG Answer Loop
   metaphor: "flow" -> compact retrieval-to-answer pipeline.
   This example is intentionally sparse so it stays readable as a GIF.
   ============================================================ */
window.FRAME = {
  metaphor: "flow",
  title: "RAG Answer Loop",
  kicker: "Retrieval to grounded response",
  credit: "concept-gif",
  tiers: [
    { label: "Question", color: "blue", items: [
      { label: "User Query", icon: "user", motion: "blink" },
      { label: "Embed",      icon: "network", motion: "pulse" },
    ] },
    { label: "Retrieve", color: "teal", items: [
      { label: "Search", icon: "search", motion: "pulse" },
      { label: "Chunks", icon: "papers", motion: "shuffle" },
      { label: "Rank",   icon: "evaluator", motion: "draw" },
    ] },
    { label: "Generate", color: "green", items: [
      { label: "Prompt", icon: "doc", motion: "draw" },
      { label: "Model",  icon: "brain", motion: "glow" },
      { label: "Answer", icon: "approve", motion: "spin" },
    ] },
    { label: "Ground", color: "amber", items: [
      { label: "Citations", icon: "link", motion: "sway" },
      { label: "Trace",     icon: "graph", motion: "orbit" },
    ] },
  ],
};
