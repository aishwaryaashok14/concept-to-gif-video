/* ============================================================
   COMPARE metaphor — two columns with a center VS badge, the
   "stale milk in a beautiful glass" vs "actually gets saved"
   contrast. The right (winning) column glows; the left blinks.

   Schema:
     metaphor: "compare"  (or preset: "linkedin-compare")
     vs?: "VS"            — center badge text
     left:  { label, color?/role?, icon?, motion?, items: ["…"] }
     right: { label, color?/role?, icon?, motion?, items: ["…"] }
   ============================================================ */
window.FRAME = {
  preset: "linkedin-compare",
  title: "Why Most Infographics Flop",
  kicker: "Beautiful is not saved",
  credit: "concept-gif",
  vs: "VS",
  left: {
    label: "Looks Good", color: "slate", icon: "eye", motion: "blink",
    items: ["Pretty template", "Generic tips", "Reader scrolls past", "0 saves"],
  },
  right: {
    label: "Gets Saved", color: "green", icon: "approve", motion: "draw",
    items: ["Real pain point", "Usable today", "Reader stops + saves", "Shares & DMs"],
  },
};
