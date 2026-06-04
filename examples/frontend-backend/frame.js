/* ============================================================
   FRAME — Frontend & Backend Architecture
   metaphor: "flow"  -> vertical tiers + downward marching arrows.
   The theme (a layered system) chose the metaphor; the look is the
   shared design.js. Tiers read top->bottom as a request flows down.
   ============================================================ */
window.FRAME = {
  metaphor: "flow",
  title: "Web App Architecture",
  kicker: "How a request flows",
  credit: "concept-gif",
  tiers: [
    { label: "Client", color: "blue", items: [
      { label: "Browser",  icon: "browser", motion: "flow" },
      { label: "Mobile App", icon: "user",  motion: "blink" },
    ] },
    { label: "Frontend", color: "teal", items: [
      { label: "UI Components", icon: "layers", motion: "shuffle" },
      { label: "App State",     icon: "cpu",    motion: "squish" },
      { label: "Routing",       icon: "git",    motion: "orbit" },
    ] },
    { label: "API Layer", color: "green", items: [
      { label: "Gateway",  icon: "plug",   motion: "flow" },
      { label: "Auth",     icon: "lock",   motion: "draw" },
      { label: "Services", icon: "server", motion: "blink" },
    ] },
    { label: "Data", color: "purple", items: [
      { label: "Database", icon: "database",  motion: "pulse" },
      { label: "Cache",    icon: "lightning", motion: "blink" },
      { label: "Storage",  icon: "cloud",     motion: "glow" },
    ] },
  ],
};
