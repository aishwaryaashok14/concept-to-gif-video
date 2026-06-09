/* ============================================================
   FRAME — How HyperFrames Works
   Metaphor: flow (a pipeline an HTML composition passes through
   to become a video). Read top -> bottom:
     Compose -> Make it deterministic -> Render loop -> Encode/output
   See frame.md for the schema, icon + motion catalogs.
   ============================================================ */
window.FRAME = {
  metaphor: "flow",
  theme: "editorial-light",
  title: "How HyperFrames Works",
  kicker: "HTML → Video, frame by frame",
  credit: "concept-gif",

  // Darken the amber hub so the white "Render loop" pill text clears WCAG AA
  // (the default amber #d99a1f gives only 2.44:1 against white).
  design: { palette: { amber: { hub: "#a8740f" } } },

  tiers: [
    // 1. WHAT IT IS — you author the video as a web page.
    { label: "Compose", color: "blue", items: [
      { label: "HTML composition",  icon: "code",      motion: "draw" },
      { label: "CSS & web fonts",   icon: "doc",       motion: "bob"  },
      { label: "GSAP · Lottie · 3D", icon: "orchestra", motion: "sway" },
    ] },

    // 2. THE CONTRACT — what makes a browser animation reproducible.
    { label: "Determinism", color: "purple", items: [
      { label: "Seek-driven",         icon: "clock",   motion: "sway"  },
      { label: "No random / clock",   icon: "lock",    motion: "pulse" },
      { label: "Same t → same frame", icon: "approve", motion: "draw" },
    ] },

    // 3. THE MECHANISM — headless browser seeks + screenshots each frame.
    { label: "Render loop", color: "amber", items: [
      { label: "Headless Chromium", icon: "browser", motion: "pulse" },
      { label: "Seek to time t",    icon: "search",  motion: "sway"  },
      { label: "Capture frame",     icon: "eye",     motion: "blink" },
    ] },

    // 4. OUTPUT — frames become a shareable file.
    { label: "Encode", color: "green", items: [
      { label: "ffmpeg encode",     icon: "gear",   motion: "spin"    },
      { label: "MP4 · WebM · MOV", icon: "papers", motion: "shuffle" },
      { label: "Looping GIF",       icon: "flow",   motion: "flow"    },
    ] },
  ],
};
