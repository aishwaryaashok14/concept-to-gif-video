/* ============================================================
   FRAME — Observability & Evals (the AI quality loop)
   Galaxy, dense (4 zones x 4 satellites = 16 specifics + 4 hubs).
   Authored from the content brief: the four zones are the spine,
   the satellites are the committed specifics, the dashed orbit
   weaving the four hubs is the "closed loop" itself.

   coords: x,y normalized 0..1 inside the diagram box.
   Satellites omit a/d on purpose -> the engine fans them AWAY
   from the canvas centre (collision-aware) toward the 4 corners,
   leaving the middle clear for the orbit path.
   ============================================================ */
window.FRAME = {
  preset: "engineering-map",            // technical-blueprint look, dense map
  title: "Observability & Evals",
  kicker: "How AI systems stay trustworthy — offline + online",
  credit: "concept-gif",

  zones: [
    // ---- TL: offline, pre-ship judgment ----
    { id: "evals", label: "Eval Suite", color: "blue", x: 0.255, y: 0.32, r: 0.135,
      hub: { icon: "evaluator", motion: "glow" },
      sats: [
        { label: "Golden datasets",  icon: "database", motion: "pulse"   },
        { label: "LLM-as-judge",     icon: "persona",  motion: "morph"   },
        { label: "Scoring rubrics",  icon: "papers",   motion: "shuffle" },
        { label: "Regression suite", icon: "approve",  motion: "draw"    },
      ] },

    // ---- TR: online, production telemetry ----
    { id: "observability", label: "Observability", color: "teal", x: 0.745, y: 0.32, r: 0.135,
      hub: { icon: "eye", motion: "blink" },
      sats: [
        { label: "Traces & spans",  icon: "flow",      motion: "flow"  },
        { label: "Latency p50/p95", icon: "clock",     motion: "spin"  },
        { label: "Token & cost",    icon: "bars",      motion: "bars"  },
        { label: "Error rate",      icon: "lightning", motion: "pulse" },
      ] },

    // ---- BL: the metrics both halves actually score ----
    { id: "signals", label: "Quality Signals", color: "purple", x: 0.255, y: 0.76, r: 0.135,
      hub: { icon: "graph", motion: "bars" },
      sats: [
        { label: "Groundedness",       icon: "link",   motion: "sway"  },
        { label: "Hallucination rate", icon: "brain",  motion: "morph" },
        { label: "User feedback",      icon: "chat",   motion: "pulse" },
        { label: "Toxicity & safety",  icon: "shield", motion: "draw"  },
      ] },

    // ---- BR: the operational glue that closes the loop ----
    { id: "loop", label: "Closing the Loop", color: "amber", x: 0.745, y: 0.76, r: 0.135,
      hub: { icon: "link", motion: "sway" },
      sats: [
        { label: "CI quality gate",  icon: "gear",   motion: "spin"  },
        { label: "Drift detection",  icon: "search", motion: "draw"  },
        { label: "Prod → new evals", icon: "flow",   motion: "flow"  },
        { label: "A/B & canary",     icon: "decide", motion: "morph" },
      ] },
  ],

  // perimeter order so the dashed loop is a clean rounded square
  orbit: ["evals", "observability", "loop", "signals"],
};
