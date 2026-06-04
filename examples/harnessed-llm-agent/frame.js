/* ============================================================
   FRAME — A Harnessed LLM Agent   (metaphor: "galaxy")
   A cleaner, GIF-first version: three large zones, short labels,
   and only the most important satellite nodes.
   ============================================================ */
window.FRAME = {
  metaphor: "galaxy",
  title: "A Harnessed LLM Agent",
  kicker: "Anatomy of an Agent",
  credit: "concept-gif",
  zones: [
    { id: "skills", label: "Skills", color: "blue", x: 0.22, y: 0.42, r: 0.145,
      hub: { icon: "bulb", motion: "glow" },
      sats: [
        { label: "Procedures", icon: "flow",   motion: "flow" },
        { label: "Constraints", icon: "link",   motion: "sway" },
        { label: "Decisions",   icon: "decide", motion: "morph" },
      ] },
    { id: "runtime", label: "Runtime", color: "green", x: 0.52, y: 0.66, r: 0.155,
      hub: { icon: "harness", motion: "pulse" },
      sats: [
        { label: "Sandbox",       icon: "sandbox",   motion: "bob" },
        { label: "Orchestration", icon: "orchestra", motion: "pulse" },
        { label: "Approvals",     icon: "approve",   motion: "spin" },
      ] },
    { id: "memory", label: "Memory", color: "purple", x: 0.80, y: 0.40, r: 0.145,
      hub: { icon: "brain", motion: "glow" },
      sats: [
        { label: "Context",   icon: "papers",  motion: "shuffle" },
        { label: "Knowledge", icon: "graph",   motion: "orbit" },
        { label: "History",   icon: "bars",    motion: "bars" },
      ] },
  ],
  orbit: ["skills", "runtime", "memory"],
};
