/**
 * Tools hub rules. Everything the page says about "how many" or "which" is worked out from tools-content.json,
 * so adding, removing or switching off a tool never leaves old wording behind.
 *
 * A tool lives in groups[].tools. `live: false` (default is live) moves it to the Coming Soon block, takes it out of the
 * structured data and hides any "Not Sure Where to Start?" shortcut that points to it. Group cards that end up empty disappear.
 */
export const isLive = (t) => t.live !== false;

export const joinList = (a) => (a.length < 2 ? a.join("") : a.slice(0, -1).join(", ") + " and " + a[a.length - 1]);
const fill = (tpl, vars) => tpl.replace(/\{(\w+)\}/g, (_, k) => (vars[k] == null ? "" : vars[k]));

export function toolsModel(content) {
  const all = (content.groups || []).map((g) => ({ ...g, tools: g.tools || [] }));
  const groups = all.map((g) => ({ ...g, tools: g.tools.filter(isLive) })).filter((g) => g.tools.length);
  const pending = [...all.flatMap((g) => g.tools.filter((t) => !isLive(t))), ...((content.soon && content.soon.items) || [])];
  const liveTools = groups.flatMap((g) => g.tools);
  const hrefs = new Set(liveTools.map((t) => t.href));
  const start = ((content.start && content.start.items) || []).filter((s) => hrefs.has(s.href));
  return { groups, pending, liveTools, start };
}

/** Terms for the search description: each live group's topics, then the extra `term` of its live tools. */
export function topicTerms(groups) {
  return groups.flatMap((g) => [].concat(g.seoTopic || []).concat(g.tools.map((t) => t.term).filter(Boolean)));
}

/** Description and structured data built from what is live. Description is kept to 160 characters (trailing topics drop first). */
export function seoContent(content) {
  const m = toolsModel(content);
  const s = content.seo || {};
  const terms = topicTerms(m.groups);
  const build = (n) => fill(s.descriptionTemplate || "{topics}", { topics: joinList(terms.slice(0, n)) });
  let n = terms.length;
  while (n > 1 && build(n).length > 160) n--;
  const about = (s.about || []).map((a, i) => (i === 0 && s.aboutTemplate ? { ...a, description: fill(s.aboutTemplate, { topics: joinList(terms) }) } : a));
  const keywords = [...(s.keywords || []), ...m.liveTools.map((t) => t.keyword).filter(Boolean)];
  const itemList = m.liveTools.map((t) => ({ name: t.name, path: t.href, description: t.body }));
  return { ...content, seo: { ...s, description: terms.length ? build(n) : s.description, about, keywords, itemList } };
}
