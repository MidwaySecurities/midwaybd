// Tool click tracking for the Tools hub. One event per tool card click, pushed to dataLayer (Google Tag Manager) and gtag when present.
// No personal data. Event: tool_click { tool, group, placement, page_path, language }.
// placement: "start_here" (Not Sure Where to Start?) or "group_card" (the group lists).
export function trackTool(tool, group, placement) {
  if (typeof window === "undefined") return;
  const evt = { event: "tool_click", tool, group, placement, page_path: window.location.pathname, language: document.documentElement.lang || "en" };
  (window.dataLayer = window.dataLayer || []).push(evt);
  if (typeof window.gtag === "function") window.gtag("event", "tool_click", evt);
}
/** Slug from an href: "/dividend-calculator" -> "dividend-calculator". */
export const toolSlug = (href) => href.split("/").filter(Boolean).pop();
