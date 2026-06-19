/* ============================================================
   STEPS metaphor — a numbered checklist / process running down a
   marching "progress" rail (Vincent-Pierri's "10-step checklist"
   shape, trimmed to 5 for a sparse, save-worthy post). Each step
   card animates its icon; the rail flows downward seamlessly.

   Schema:
     metaphor: "steps"  (or preset: "linkedin-steps")
     steps: [{ n?, label, color?/role?, icon?, motion?, detail? }]
   ============================================================ */
window.FRAME = {
  preset: "linkedin-steps",
  title: "5 Tests for a Viral Post",
  kicker: "Save-worthy by design",
  credit: "concept-gif",
  steps: [
    { n: 1, label: "Pain point", color: "rose", icon: "decide", motion: "morph",
      detail: "Solves a problem people feel" },
    { n: 2, label: "Actionable", color: "amber", icon: "approve", motion: "draw",
      detail: "Something they can use today" },
    { n: 3, label: "Low saturation", color: "blue", icon: "search", motion: "pulse",
      detail: "Not the same recycled post" },
    { n: 4, label: "Dense", color: "teal", icon: "layers", motion: "shuffle",
      detail: "Packed enough to save" },
    { n: 5, label: "Strong POV", color: "green", icon: "chat", motion: "pulse",
      detail: "Takes a stance, sparks replies" },
  ],
};
