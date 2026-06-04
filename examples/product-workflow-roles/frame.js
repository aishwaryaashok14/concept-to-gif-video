/* ============================================================
   FRAME — Product Workflow Roles
   Demonstrates preset, roleOrder, semantic roles, and explicit overrides.
   ============================================================ */
window.FRAME = {
  preset: "product-workflow",
  title: "Product Workflow Roles",
  kicker: "Preset-driven flow example",
  credit: "concept-gif",
  tiers: [
    { label: "Signal", items: [
      { label: "Customer signal" },
      { label: "Metrics", icon: "bars", motion: "bars" },
      { label: "Repo context", role: "context" },
    ] },
    { label: "Intent", items: [
      { label: "PRD", icon: "doc", motion: "draw" },
      { label: "Acceptance" },
      { label: "Priorities" },
    ] },
    { label: "Build", items: [
      { label: "Prototype" },
      { label: "Repo changes", icon: "git", motion: "orbit" },
      { label: "Review loop", icon: "evaluator", motion: "shuffle" },
    ] },
    { label: "Learn", items: [
      { label: "QA pass", role: "quality" },
      { label: "Ship notes", icon: "papers", motion: "shuffle" },
      { label: "Insights" },
    ] },
  ],
};
