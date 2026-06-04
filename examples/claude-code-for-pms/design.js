/* ============================================================
   DESIGN  —  the visual system (machine mirror of design.md)
   Swap these tokens to re-skin ANY frame. The engine reads
   window.DESIGN and applies it; nothing here is topic-specific.
   To change the title/label FONT, also edit the two font-family
   lines in index.html (HyperFrames embeds fonts from static CSS).
   ============================================================ */
window.DESIGN = {
  bg: "#f4f0ea",          // page background (tinted off-white, not pure #fff)
  panel: "#fffdf9",       // rounded card the diagram sits on
  panelBorder: "#eadfce",
  ink: "#211b16",         // headings + hub labels
  inkSoft: "#4d443a",     // satellite labels (>= WCAG AA on panel)
  kicker: "#7a6250",      // eyebrow text
  fontTitle: "'Outfit', system-ui, sans-serif",  // mirrored in index.html CSS
  fontLabel: "'Inter', system-ui, sans-serif",   // mirrored in index.html CSS

  // categorical zone palette. Each zone in frame.js names one key.
  // ring = dashed boundary, tint = blob wash, hub = disc fill, glow = aura.
  palette: {
    blue:   { ring: "#5b8fe8", tint: "#2f72da", hub: "#2765c4", glow: "#c7dcff" },
    green:  { ring: "#5daf81", tint: "#2f9e67", hub: "#247c50", glow: "#c8edd8" },
    purple: { ring: "#8d79df", tint: "#6f58d8", hub: "#6147c5", glow: "#ddd4ff" },
    amber:  { ring: "#dfa94b", tint: "#d58f23", hub: "#b87518", glow: "#f5dfab" },
    rose:   { ring: "#df6f88", tint: "#d74768", hub: "#bf3858", glow: "#f8ccd7" },
    teal:   { ring: "#3aaeb0", tint: "#13999b", hub: "#0d7f81", glow: "#bfe8e5" },
    slate:  { ring: "#8b887f", tint: "#68645c", hub: "#565149", glow: "#ded9ce" },
  },

  loop: 6,                // seconds — the seamless loop length
  ease: "sine.inOut",     // default easing for breathing motions
};
