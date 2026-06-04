/* ============================================================
   FRAME — Web App Architecture
   A compact flow: fewer tiers and shorter labels for GIF readability.
   ============================================================ */
window.FRAME = {
  metaphor: "flow",
  title: "Web App Architecture",
  kicker: "How a request flows",
  credit: "concept-gif",
  tiers: [
    { label: "Client", color: "blue", items: [
      { label: "Browser", icon: "browser", motion: "flow" },
      { label: "Mobile",  icon: "user",    motion: "blink" },
      { label: "Routing", icon: "git",     motion: "orbit" },
    ] },
    { label: "Application", color: "teal", items: [
      { label: "UI",       icon: "layers", motion: "shuffle" },
      { label: "State",    icon: "cpu",    motion: "squish" },
      { label: "Services", icon: "server", motion: "blink" },
    ] },
    { label: "Platform", color: "green", items: [
      { label: "Gateway",  icon: "plug",     motion: "flow" },
      { label: "Auth",     icon: "lock",     motion: "draw" },
      { label: "Database", icon: "database", motion: "pulse" },
    ] },
  ],
};
