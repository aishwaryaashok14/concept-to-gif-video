/* ============================================================
   FRAME — Skills vs Sub-Agents
   metaphor: "flow" -> side-by-side capability vs delegation model.
   Kept sparse so the generated GIF reads cleanly at small sizes.
   ============================================================ */
window.FRAME = {
  metaphor: "flow",
  title: "Skills vs Sub-Agents",
  kicker: "Capability packs vs delegated workers",
  credit: "concept-gif",
  tiers: [
    { label: "Skills", color: "blue", items: [
      { label: "Instructions", icon: "doc", motion: "draw" },
      { label: "Tools",        icon: "tools", motion: "sway" },
      { label: "Patterns",     icon: "layers", motion: "shuffle" },
    ] },
    { label: "Use When", color: "teal", items: [
      { label: "Same Thread", icon: "chat", motion: "blink" },
      { label: "Repeatable",  icon: "approve", motion: "spin" },
      { label: "Domain Fit",  icon: "search", motion: "pulse" },
    ] },
    { label: "Sub-Agents", color: "green", items: [
      { label: "Delegate", icon: "orchestra", motion: "pulse" },
      { label: "Explore",  icon: "eye", motion: "blink" },
      { label: "Return",   icon: "link", motion: "sway" },
    ] },
  ],
};
