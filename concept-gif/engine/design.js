/* ============================================================
   DESIGN  —  the visual system (machine mirror of design.md)
   Swap these tokens to re-skin ANY frame. The engine reads
   window.DESIGN and applies it; nothing here is topic-specific.
   To change the title/label FONT, also edit the two font-family
   lines in index.html (HyperFrames embeds fonts from static CSS).
   ============================================================ */
window.DESIGN = {
  bg: "#eef1f6",          // page background (tinted off-white, not pure #fff)
  panel: "#ffffff",       // rounded card the diagram sits on
  panelBorder: "#e7eaf1",
  ink: "#16202e",         // headings + hub labels
  inkSoft: "#434c5c",     // satellite labels (>= WCAG AA on panel)
  kicker: "#626c7e",      // eyebrow text
  fontTitle: "'Outfit', system-ui, sans-serif",  // mirrored in index.html CSS
  fontLabel: "'Inter', system-ui, sans-serif",   // mirrored in index.html CSS

  // categorical zone palette. Each zone in frame.js names one key.
  // ring = dashed boundary, tint = blob wash, hub = disc fill, glow = aura.
  palette: {
    blue:   { ring: "#5b9bf0", tint: "#3b82f6", hub: "#3b82f6", glow: "#bcd6ff" },
    green:  { ring: "#54c08a", tint: "#22b573", hub: "#128a54", glow: "#bff0d6" },
    purple: { ring: "#9d8bf0", tint: "#7c6cf0", hub: "#7059e8", glow: "#d7cffb" },
    amber:  { ring: "#e7b84d", tint: "#e0a72e", hub: "#d99a1f", glow: "#f6e3ad" },
    rose:   { ring: "#ef7b96", tint: "#e84f72", hub: "#dd3f63", glow: "#fbcdd8" },
    teal:   { ring: "#3fb6c4", tint: "#16a6b6", hub: "#0e95a4", glow: "#bfeaf0" },
    slate:  { ring: "#8a93a6", tint: "#5b6478", hub: "#4a5466", glow: "#d6dbe5" },
  },

  loop: 6,                // seconds — the seamless loop length
  ease: "sine.inOut",     // default easing for breathing motions
};
