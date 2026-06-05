/* ============================================================
   FRAME — Multi-Agent Orchestration   (metaphor: "galaxy")
   A diamond of four zones that tells the orchestration loop:
   an Orchestrator (top) decomposes a goal and dispatches it to
   parallel specialist Agents (right); their work converges into
   Synthesis (bottom); Coordination (left) is the connective
   tissue. A dashed orbit weaves the control loop through them.

   coords: x,y normalized 0..1 in the diagram box.
   angle a: compass degrees (0=N, 90=E, 180=S, 270=W).
   d: satellite distance, a multiple of the zone radius.
   ============================================================ */
window.FRAME = {
  metaphor: "galaxy",
  title: "Multi-Agent Orchestration",
  kicker: "Anatomy of an Agent System",
  credit: "concept-gif",
  zones: [
    // ---- Orchestrator: plans the work and dispatches it (top) ----
    { id: "orchestrator", label: "Orchestrator", color: "purple", x: 0.5, y: 0.24, r: 0.145,
      hub: { icon: "orchestra", motion: "pulse" },
      sats: [
        { label: "Decompose", icon: "git",   motion: "orbit", a: 305, d: 1.2 },
        { label: "Schedule",  icon: "clock", motion: "spin",  a: 0,   d: 1.12 },
        { label: "Route",     icon: "plug",  motion: "flow",  a: 55,  d: 1.2 },
      ] },

    // ---- Agents: the parallel specialist workers (right) ----
    { id: "agents", label: "Agents", color: "blue", x: 0.79, y: 0.54, r: 0.145,
      hub: { icon: "robots", motion: "pulse" },
      sats: [
        { label: "Researcher", icon: "search", motion: "bob",   a: 35,  d: 1.18 },
        { label: "Coder",      icon: "code",   motion: "sway",  a: 72,  d: 1.12 },
        { label: "Reviewer",   icon: "eye",    motion: "blink", a: 110, d: 1.12 },
        { label: "Tester",     icon: "shield", motion: "draw",  a: 150, d: 1.18 },
      ] },

    // ---- Synthesis: results converge into one answer (bottom) ----
    { id: "synthesis", label: "Synthesis", color: "green", x: 0.5, y: 0.77, r: 0.15,
      hub: { icon: "compress", motion: "squish" },
      sats: [
        { label: "Aggregate", icon: "layers",  motion: "shuffle", a: 230, d: 1.05 },
        { label: "Verify",    icon: "approve", motion: "spin",    a: 180, d: 0.92 },
        { label: "Result",    icon: "bulb",    motion: "glow",    a: 130, d: 1.05 },
      ] },

    // ---- Coordination: how agents share + hand off work (left) ----
    { id: "coordination", label: "Coordination", color: "teal", x: 0.21, y: 0.54, r: 0.145,
      hub: { icon: "network", motion: "orbit" },
      sats: [
        { label: "Messaging",    icon: "chat",     motion: "blink", a: 325, d: 1.18 },
        { label: "Shared State", icon: "database", motion: "pulse", a: 270, d: 1.12 },
        { label: "Handoffs",     icon: "link",     motion: "sway",  a: 215, d: 1.18 },
      ] },
  ],
  orbit: ["orchestrator", "agents", "synthesis", "coordination"],
};
