/* ============================================================
   DESIGN — reusable themes, presets, and semantic roles.

   New frames can stay content-first:
     theme: "product-polish",
     preset: "product-workflow",
     role: "input" | "decision" | "execution" | "feedback"

   Backwards compatible: the engine still accepts older design.js files that
   assign a raw window.DESIGN object instead of this registry.
   To change title/label FONTS, also edit the two font-family lines in
   index.html because HyperFrames embeds fonts from static CSS.
   ============================================================ */
(function () {
  const base = {
    bg: "#eef1f6",
    panel: "#ffffff",
    panelBorder: "#e7eaf1",
    ink: "#16202e",
    inkSoft: "#434c5c",
    kicker: "#626c7e",
    fontTitle: "'Outfit', system-ui, sans-serif",
    fontLabel: "'Inter', system-ui, sans-serif",

    radius: {
      panel: "40px",
      band: "30px",
      pill: "14px",
    },
    shadow: {
      panel: "0 24px 60px -30px rgba(20,28,46,.28)",
    },

    palette: {
      blue:   { ring: "#5b9bf0", tint: "#3b82f6", hub: "#3b82f6", glow: "#bcd6ff" },
      green:  { ring: "#54c08a", tint: "#22b573", hub: "#128a54", glow: "#bff0d6" },
      purple: { ring: "#9d8bf0", tint: "#7c6cf0", hub: "#7059e8", glow: "#d7cffb" },
      amber:  { ring: "#e7b84d", tint: "#e0a72e", hub: "#d99a1f", glow: "#f6e3ad" },
      rose:   { ring: "#ef7b96", tint: "#e84f72", hub: "#dd3f63", glow: "#fbcdd8" },
      teal:   { ring: "#3fb6c4", tint: "#16a6b6", hub: "#0e95a4", glow: "#bfeaf0" },
      slate:  { ring: "#8a93a6", tint: "#5b6478", hub: "#4a5466", glow: "#d6dbe5" },
    },

    roles: {
      input:     { color: "teal",   icon: "chat",    motion: "flow" },
      context:   { color: "blue",   icon: "search",  motion: "draw" },
      decision:  { color: "amber",  icon: "decide",  motion: "morph" },
      execution: { color: "purple", icon: "code",    motion: "sway" },
      quality:   { color: "green",  icon: "approve", motion: "draw" },
      feedback:  { color: "rose",   icon: "graph",   motion: "bars" },
      platform:  { color: "slate",  icon: "server",  motion: "pulse" },
    },

    loop: 6,
    ease: "sine.inOut",
    motionScale: 1,
  };

  const themes = {
    "editorial-light": {},

    "technical-blueprint": {
      bg: "#edf3f7",
      panel: "#fbfdff",
      panelBorder: "#d5e3ec",
      ink: "#132232",
      inkSoft: "#3e4c5c",
      kicker: "#607184",
      radius: { panel: "28px", band: "20px", pill: "10px" },
      shadow: { panel: "0 18px 44px -34px rgba(19,34,50,.32)" },
      palette: {
        blue:   { ring: "#4287d7", tint: "#2c73c7", hub: "#255fa8", glow: "#c8ddf6" },
        green:  { ring: "#42a883", tint: "#24966e", hub: "#157855", glow: "#c7eadb" },
        purple: { ring: "#817ce0", tint: "#625bd2", hub: "#5148b5", glow: "#d8d5fb" },
        amber:  { ring: "#c99b3d", tint: "#bd8427", hub: "#976416", glow: "#eeddaa" },
        rose:   { ring: "#d76d85", tint: "#c94967", hub: "#a8344d", glow: "#f4cad3" },
        teal:   { ring: "#2ba6b8", tint: "#108da0", hub: "#0d7080", glow: "#c4e8ee" },
        slate:  { ring: "#7d8b9d", tint: "#556477", hub: "#445163", glow: "#d8dee7" },
      },
    },

    "product-polish": {
      bg: "#f4f0ea",
      panel: "#fffdf9",
      panelBorder: "#eadfce",
      ink: "#211b16",
      inkSoft: "#4d443a",
      kicker: "#7a6250",
      radius: { panel: "42px", band: "30px", pill: "14px" },
      shadow: { panel: "0 26px 64px -31px rgba(33,27,22,.30)" },
      palette: {
        blue:   { ring: "#5b8fe8", tint: "#2f72da", hub: "#2765c4", glow: "#c7dcff" },
        green:  { ring: "#5daf81", tint: "#2f9e67", hub: "#247c50", glow: "#c8edd8" },
        purple: { ring: "#8d79df", tint: "#6f58d8", hub: "#6147c5", glow: "#ddd4ff" },
        amber:  { ring: "#dfa94b", tint: "#d58f23", hub: "#b87518", glow: "#f5dfab" },
        rose:   { ring: "#df6f88", tint: "#d74768", hub: "#bf3858", glow: "#f8ccd7" },
        teal:   { ring: "#3aaeb0", tint: "#13999b", hub: "#0d7f81", glow: "#bfe8e5" },
        slate:  { ring: "#8b887f", tint: "#68645c", hub: "#565149", glow: "#ded9ce" },
      },
    },

    "minimal-saas": {
      bg: "#f5f7fa",
      panel: "#ffffff",
      panelBorder: "#dde3ea",
      ink: "#18202b",
      inkSoft: "#46515f",
      kicker: "#6b7685",
      radius: { panel: "24px", band: "18px", pill: "10px" },
      shadow: { panel: "0 14px 40px -30px rgba(24,32,43,.24)" },
    },

    /* --- Bold color stories. Unlike the themes above (which keep blue=blue and
       only shift temperature/polish), these RECOLOR the palette keys into a new
       categorical scheme. Treat the seven keys as distinct *slots*, not literal
       hues — frame.js still picks one key per zone for separation. --- */

    "sunset": { // warm: coral · gold · rose · orchid
      bg: "#f7efe6", panel: "#fffdf9", panelBorder: "#f0e2d2",
      ink: "#2a1d15", inkSoft: "#5b4636", kicker: "#876953",
      palette: {
        purple: { ring: "#ee7d6a", tint: "#e0533f", hub: "#cf4733", glow: "#f8cfc6" }, // coral
        blue:   { ring: "#e3ab46", tint: "#cf8a14", hub: "#b8790f", glow: "#f4e0a6" }, // gold
        green:  { ring: "#ec789a", tint: "#d43f6e", hub: "#bd3460", glow: "#fbccd8" }, // rose
        teal:   { ring: "#b783dd", tint: "#9b53c9", hub: "#8642b4", glow: "#e6d3f6" }, // orchid
        amber:  { ring: "#efa451", tint: "#e07b1f", hub: "#c46916", glow: "#f8d9b0" }, // tangerine
        rose:   { ring: "#d97089", tint: "#c23a5a", hub: "#a72d4a", glow: "#f3c6d0" }, // raspberry
        slate:  { ring: "#978a7f", tint: "#6e5f54", hub: "#574a40", glow: "#ded3c8" }, // taupe
      },
    },

    "ocean": { // cool: indigo · azure · emerald · teal
      bg: "#e9f1f5", panel: "#ffffff", panelBorder: "#d7e6ee",
      ink: "#0f2430", inkSoft: "#3a5562", kicker: "#5a7886",
      palette: {
        purple: { ring: "#7a80e4", tint: "#4b54d4", hub: "#3d45bd", glow: "#cdd0f8" }, // indigo
        blue:   { ring: "#5aaeec", tint: "#1f8fe0", hub: "#1877c0", glow: "#bfe1f8" }, // azure
        green:  { ring: "#4cc09a", tint: "#0e9e7a", hub: "#0b8266", glow: "#bff0df" }, // emerald
        teal:   { ring: "#45b4c2", tint: "#0c93a6", hub: "#0a7a8a", glow: "#bfeaf0" }, // teal
        amber:  { ring: "#d0a955", tint: "#b88a2a", hub: "#9a7221", glow: "#ecdcae" }, // muted gold
        rose:   { ring: "#d973a8", tint: "#c43d86", hub: "#a82f70", glow: "#f3cce3" }, // cool magenta
        slate:  { ring: "#7b8ea1", tint: "#4a6076", hub: "#3a4c5f", glow: "#d3dce4" }, // steel
      },
    },

    "forest": { // earthy: clay · moss · forest · denim
      bg: "#f1eee7", panel: "#fffefb", panelBorder: "#e6e0d3",
      ink: "#232017", inkSoft: "#54503f", kicker: "#7c7560",
      palette: {
        purple: { ring: "#d4836b", tint: "#c0593b", hub: "#a64a30", glow: "#f0d2c6" }, // clay
        blue:   { ring: "#9aac54", tint: "#6f7d27", hub: "#5c6820", glow: "#e0e7bd" }, // moss
        green:  { ring: "#6fa588", tint: "#3f7d5a", hub: "#326449", glow: "#cfe6da" }, // forest
        teal:   { ring: "#7894ad", tint: "#4a6b8a", hub: "#3c5872", glow: "#d2dee9" }, // denim
        amber:  { ring: "#cda14e", tint: "#b07d1e", hub: "#946818", glow: "#ecdcaf" }, // ochre
        rose:   { ring: "#cc7a6d", tint: "#b04a3a", hub: "#943c2f", glow: "#f0cfc8" }, // rust
        slate:  { ring: "#938d80", tint: "#6b6457", hub: "#544e44", glow: "#ddd7ca" }, // stone
      },
    },

    "berry": { // vivid jewel: violet · blue · teal · gold
      bg: "#f3eef7", panel: "#ffffff", panelBorder: "#e7def0",
      ink: "#1d1430", inkSoft: "#4b4060", kicker: "#6b5e85",
      palette: {
        purple: { ring: "#a07cf0", tint: "#7c3aed", hub: "#6a2cd6", glow: "#ddccfb" }, // violet
        blue:   { ring: "#5a8bf2", tint: "#2563eb", hub: "#1d50c4", glow: "#c6d8fb" }, // blue
        green:  { ring: "#45b8ad", tint: "#0d9488", hub: "#0a7a70", glow: "#bfeae6" }, // teal-green
        teal:   { ring: "#e7b052", tint: "#d9920f", hub: "#bd7d0c", glow: "#f6e3ad" }, // gold
        amber:  { ring: "#f2ab4e", tint: "#ea8a0c", hub: "#cb750a", glow: "#f9dcae" }, // amber
        rose:   { ring: "#d566b8", tint: "#c2299a", hub: "#a52281", glow: "#f3cdec" }, // magenta
        slate:  { ring: "#897aa0", tint: "#5b4a6e", hub: "#473a57", glow: "#ddd3e8" }, // plum-grey
      },
    },

    /* --- Creator-pop: the bold, saturated, rounded "LinkedIn infographic" look
       (modelled on Vincent Pierri's animated posts). Punchy gradient boxes, high
       contrast, larger corner radius. Pairs with the card metaphors below
       (grid · steps · funnel · compare). Keys stay categorical slots. --- */
    "creator-pop": {
      bg: "#f6f3ff", panel: "#ffffff", panelBorder: "#e7e0fb",
      ink: "#1b1030", inkSoft: "#564a6b", kicker: "#7c5cf0",
      radius: { panel: "48px", band: "30px", pill: "16px" },
      shadow: { panel: "0 30px 72px -32px rgba(58,38,118,.34)" },
      palette: {
        blue:   { ring: "#5b8cff", tint: "#3b6bff", hub: "#2f55e6", glow: "#cdd9ff" },
        green:  { ring: "#37cc8b", tint: "#12b877", hub: "#0c9a61", glow: "#bdf2db" },
        purple: { ring: "#a06bff", tint: "#7c3aed", hub: "#6a26d9", glow: "#e0ccff" },
        amber:  { ring: "#ffb43d", tint: "#f59e0b", hub: "#d97a06", glow: "#ffe6ad" },
        rose:   { ring: "#ff6f9c", tint: "#f43f7a", hub: "#dc2f66", glow: "#ffccdd" },
        teal:   { ring: "#2ec5d8", tint: "#0bb3c7", hub: "#0894a6", glow: "#bdeff5" },
        slate:  { ring: "#9aa0b4", tint: "#6b7186", hub: "#565b6e", glow: "#dde0ea" },
      },
      motionScale: 1.05,
    },
  };

  const presets = {
    "executive-explainer": {
      theme: "editorial-light",
      density: "sparse",
      motionScale: 0.82,
    },
    "engineering-map": {
      theme: "technical-blueprint",
      density: "dense",
      motionScale: 0.72,
    },
    "product-workflow": {
      theme: "product-polish",
      density: "balanced",
      metaphor: "flow",
      roleOrder: ["input", "decision", "execution", "feedback"],
      motionScale: 0.9,
    },
    "social-share": {
      theme: "product-polish",
      density: "sparse",
      motionScale: 1.05,
      radius: { panel: "44px", band: "32px" },
    },

    /* --- LinkedIn-creator presets: bundle creator-pop with a card metaphor.
       A frame can just say `preset: "linkedin-grid"` and fill in its cells. --- */
    "linkedin-grid": {
      theme: "creator-pop",
      metaphor: "grid",
      density: "sparse",
      motionScale: 1.05,
    },
    "linkedin-steps": {
      theme: "creator-pop",
      metaphor: "steps",
      density: "sparse",
      motionScale: 1.0,
    },
    "linkedin-funnel": {
      theme: "creator-pop",
      metaphor: "funnel",
      density: "sparse",
      motionScale: 1.0,
    },
    "linkedin-compare": {
      theme: "creator-pop",
      metaphor: "compare",
      density: "sparse",
      motionScale: 1.0,
    },
  };

  function isObject(value) {
    return value && typeof value === "object" && !Array.isArray(value);
  }

  function merge(...parts) {
    const out = {};
    parts.filter(isObject).forEach((part) => {
      Object.entries(part).forEach(([key, value]) => {
        if (isObject(value) && isObject(out[key])) out[key] = merge(out[key], value);
        else if (isObject(value)) out[key] = merge(value);
        else out[key] = value;
      });
    });
    return out;
  }

  function resolveDesign(frame = {}, config = {}) {
    const presetName = frame.preset || config.preset || "editorial-light";
    const preset = presets[presetName] || {};
    const themeName = frame.theme || config.theme || preset.theme || "editorial-light";
    return merge(base, themes[themeName], preset, config.design, frame.design);
  }

  window.DESIGN_SYSTEM = { base, themes, presets, roles: base.roles, merge, resolveDesign };
  window.resolveDesign = resolveDesign;
  // Fallback for tools that inspect DESIGN before frame.js loads. The engine
  // resolves again with the real FRAME before rendering.
  window.DESIGN = resolveDesign({}, window.GIF_CONFIG || {});
})();
