/* ============================================================
   GRID metaphor — an NxM framework of color-coded cards, the
   most common LinkedIn infographic shape (here: the "4 Ps"
   content mix). Each card animates its header icon on its own
   seamless period.

   Schema:
     metaphor: "grid"  (or preset: "linkedin-grid")
     cols?: 2 | 3      — columns (default 2 for <=4 cells, else 3)
     cells: [{ label, color?/role?, icon?, motion?, items: ["…"] }]
   ============================================================ */
window.FRAME = {
  preset: "linkedin-grid",
  title: "The 4-P Content Mix",
  kicker: "Rotate one per week",
  credit: "concept-gif",
  cols: 2,
  cells: [
    { label: "Personal", color: "rose", icon: "user", motion: "pulse",
      items: ["Stories", "Wins & failures", "Lessons learned"] },
    { label: "Practical", color: "blue", icon: "doc", motion: "bob",
      items: ["Frameworks", "Templates", "How-to guides"] },
    { label: "Point of View", color: "amber", icon: "bulb", motion: "sway",
      items: ["Contrarian takes", "Industry myths", "Predictions"] },
    { label: "Promo", color: "green", icon: "bars", motion: "pulse",
      items: ["Client results", "Your offer", "Proof & demos"] },
  ],
};
