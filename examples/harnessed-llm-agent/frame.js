/* ============================================================
   FRAME — A Harnessed LLM Agent   (metaphor: "galaxy")
   The only file you edit per topic. Satellites are auto-placed to
   fan outward from each hub (no hand-set angles needed); add a/d to
   a satellite only if you want to override its position.
   Icon + motion catalogs live in frame.md.
   ============================================================ */
window.FRAME = {
  metaphor: "galaxy",
  title: "A Harnessed LLM Agent",
  kicker: "Anatomy of an Agent",
  credit: "concept-gif",
  zones: [
    { id: "skills", label: "Skills", color: "blue", x: 0.195, y: 0.39, r: 0.150,
      hub: { icon: "bulb", motion: "glow" },
      sats: [
        { label: "Operational Procedure", icon: "flow",   motion: "flow" },
        { label: "Normative Constraints", icon: "link",   motion: "sway" },
        { label: "Decision Heuristics",   icon: "decide", motion: "morph" },
      ] },
    { id: "harness", label: "Harness", color: "green", x: 0.49, y: 0.55, r: 0.158,
      hub: { icon: "harness", motion: "pulse" },
      sats: [
        { label: "Sandbox",                 icon: "sandbox",   motion: "bob" },
        { label: "Sub-Agent Orchestration", icon: "orchestra", motion: "pulse" },
        { label: "Observability",           icon: "eye",       motion: "blink" },
        { label: "Compression",             icon: "compress",  motion: "squish" },
        { label: "Approval Loop",           icon: "approve",   motion: "spin" },
        { label: "Evaluator",               icon: "evaluator", motion: "draw" },
      ] },
    { id: "memory", label: "Memory", color: "purple", x: 0.805, y: 0.28, r: 0.150,
      hub: { icon: "brain", motion: "glow" },
      sats: [
        { label: "Working Context",     icon: "papers",  motion: "shuffle" },
        { label: "Semantic Knowledge",  icon: "graph",   motion: "orbit" },
        { label: "Episodic Experience", icon: "bars",    motion: "bars" },
        { label: "Personalized Memory", icon: "persona", motion: "glow" },
      ] },
    { id: "protocols", label: "Protocols", color: "amber", x: 0.775, y: 0.805, r: 0.135,
      hub: { icon: "network", motion: "orbit" },
      sats: [
        { label: "Agent-User",  icon: "user",   motion: "blink" },
        { label: "Agent-Agent", icon: "robots", motion: "sway" },
        { label: "Agent-Tools", icon: "tools",  motion: "sway" },
      ] },
  ],
  orbit: ["skills", "harness", "protocols", "memory"],
};
