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
