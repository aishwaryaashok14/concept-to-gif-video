/* ============================================================
   FUNNEL metaphor — progressive filtering, the Vincent-Pierri
   "find your niche" shape. Each stage is narrower than the last;
   rejected items (drop) drift out and fade, then return — a
   seamless loop that reads as "filtering".

   Schema:
     metaphor: "funnel"  (or preset: "linkedin-funnel")
     stages: [{ label, color?/role?, icon?, motion?,
                note?  — small subtitle line on the bar
                keep?  — survivors badge on the right of the bar
                drop?  — ["…"] chips that fall away beside the bar }]
   ============================================================ */
window.FRAME = {
  preset: "linkedin-funnel",
  title: "How to Find Your Niche",
  kicker: "Gifted? 7 skills, 1 offer",
  credit: "concept-gif",
  stages: [
    { label: "List what you can solve", color: "blue", icon: "papers", motion: "shuffle",
      note: "Every skill you have", keep: "7 skills" },
    { label: "Can you teach it?", color: "teal", icon: "bulb", motion: "pulse",
      keep: "4 left", drop: ["Too niche"] },
    { label: "Do you enjoy it?", color: "amber", icon: "approve", motion: "draw",
      keep: "2 left", drop: ["Drains you"] },
    { label: "Urgent demand?", color: "purple", icon: "bars", motion: "bob",
      keep: "1 left", drop: ["Vitamin"] },
    { label: "Pick one buyer", color: "green", icon: "user", motion: "sway",
      note: "That is your niche", keep: "Done" },
  ],
};
