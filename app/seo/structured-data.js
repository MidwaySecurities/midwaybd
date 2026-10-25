/**
 * Midway structured data and head metadata: ONE shared, framework-free module for every page.
 *
 * Rules this module enforces by construction:
 *  - JSON-LD is generated from the SAME content object the page renders (FAQ, breadcrumb, title, description),
 *    so structured data can never drift from the visible text.
 *  - One @graph per page with stable @ids, so search engines and AI systems can link the entities
 *    (Organization > WebSite > WebPage > WebApplication / FAQPage / BreadcrumbList).
 *  - No ratings, reviews, prices of financial products or return promises are ever emitted.
 *
 * Usage (React / Next.js):
 *   import site from "../seo/site.json";
 *   import { buildGraph } from "../seo/structured-data";
 *   const graph = buildGraph(content, site);          // render with <JsonLd graph={graph} />
 *   export const metadata = toNextMetadata(buildHead(content, site));   // Next.js app router
 * Usage (static / other frameworks): headToHtml(buildHead(content, site)) returns the <head> tags.
 *
 * Page content contract (content.seo, all optional except where noted; older pages fall back to content.meta):
 *   type: "tool" | "landing" | "hub" | "article" | "app"   (default "tool")
 *   path (required, or meta.path), title, description, image, datePublished, dateModified (ISO yyyy-mm-dd)
 *   section: "Tools" | "Government Bonds" | ...  (used by llms.txt and sitemap grouping)
 *   breadcrumb: [{ name, path }]  (default: built from header.breadcrumb names + site.pathNames + page path)
 *   about: [{ name, description? }], keywords: [..], sources: [{ name, url }]
 *   app: { name, subCategory, featureList: [..], version }   (tool and app pages)
 *   noindex: true to keep a page out of search
 * Visible content contract: content.faq.items = [{ q, a }]; the same objects drive the visible Q&A and the FAQPage schema.
 */

export const abs = (path, origin) => (/^https?:\/\//.test(path) ? path : origin.replace(/\/$/, "") + (path.startsWith("/") ? path : "/" + path));

export function pageInfo(content, site) {
  const seo = content.seo || {};
  const meta = content.meta || {};
  const path = seo.path || meta.path || "/";
  const names = (content.header && content.header.breadcrumb) || [];
  const crumbs = seo.breadcrumb ||
    names.map((n, i) => ({ name: n, path: i === names.length - 1 ? path : (site.pathNames && site.pathNames[n]) || "/" }));
  return {
    type: seo.type || "tool",
    path,
    url: abs(path, site.origin),
    title: seo.title || meta.title || site.name,
    description: seo.description || meta.description || "",
    image: seo.image || site.defaultImage,
    datePublished: seo.datePublished || null,
    dateModified: seo.dateModified || null,
    language: seo.inLanguage || site.language || "en",
    section: seo.section || null,
    about: seo.about || [],
    keywords: seo.keywords || [],
    sources: seo.sources || [],
    app: seo.app || null,
    noindex: !!seo.noindex,
    canonical: seo.canonical ? abs(seo.canonical, site.origin) : abs(path, site.origin),
    alternates: seo.alternates || {},
    videos: seo.videos || [],
    name: (content.header && content.header.headline) || (seo.app && seo.app.name) || meta.title || "",
    crumbs,
  };
}

/* ---------- <head> ---------- */
export function buildHead(content, site) {
  const p = pageInfo(content, site);
  const alternates = { [p.language]: p.url, "x-default": p.url };
  Object.entries(p.alternates).forEach(([l, path]) => { alternates[l] = abs(path, site.origin); });
  const image = abs(p.image, site.origin);
  return {
    title: p.title,
    description: p.description,
    canonical: p.canonical,
    robots: p.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    language: p.language,
    themeColor: site.themeColor,
    alternates,
    openGraph: { type: p.type === "article" ? "article" : "website", siteName: site.name, title: p.title, description: p.description, url: p.url, image, locale: p.language === "bn" ? "bn_BD" : "en_BD" },
    twitter: { card: "summary_large_image", title: p.title, description: p.description, image },
    modified: p.dateModified,
  };
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
export function headToHtml(h) {
  const t = [];
  t.push(`<title>${esc(h.title)}</title>`);
  t.push(`<meta name="description" content="${esc(h.description)}">`);
  t.push(`<link rel="canonical" href="${esc(h.canonical)}">`);
  t.push(`<meta name="robots" content="${esc(h.robots)}">`);
  t.push(`<meta name="theme-color" content="${esc(h.themeColor)}">`);
  Object.entries(h.alternates).forEach(([l, u]) => t.push(`<link rel="alternate" hreflang="${esc(l)}" href="${esc(u)}">`));
  const og = h.openGraph;
  [["og:type", og.type], ["og:site_name", og.siteName], ["og:title", og.title], ["og:description", og.description], ["og:url", og.url], ["og:image", og.image], ["og:locale", og.locale]]
    .forEach(([k, v]) => t.push(`<meta property="${k}" content="${esc(v)}">`));
  const tw = h.twitter;
  [["twitter:card", tw.card], ["twitter:title", tw.title], ["twitter:description", tw.description], ["twitter:image", tw.image]]
    .forEach(([k, v]) => t.push(`<meta name="${k}" content="${esc(v)}">`));
  if (h.modified) t.push(`<meta property="article:modified_time" content="${esc(h.modified)}">`);
  return t.join("\n");
}

export function toNextMetadata(h) {
  return {
    title: h.title, description: h.description, alternates: { canonical: h.canonical, languages: h.alternates },
    robots: h.robots, themeColor: h.themeColor,
    openGraph: { type: h.openGraph.type, siteName: h.openGraph.siteName, title: h.openGraph.title, description: h.openGraph.description, url: h.openGraph.url, images: [h.openGraph.image], locale: h.openGraph.locale },
    twitter: { card: h.twitter.card, title: h.twitter.title, description: h.twitter.description, images: [h.twitter.image] },
  };
}

/* ---------- JSON-LD ---------- */
const prune = (o) => {
  if (Array.isArray(o)) return o.map(prune).filter((v) => v !== undefined);
  if (o && typeof o === "object") {
    const out = {};
    Object.entries(o).forEach(([k, v]) => { const x = prune(v); if (x !== undefined && x !== null && x !== "" && !(Array.isArray(x) && x.length === 0)) out[k] = x; });
    return Object.keys(out).length ? out : undefined;
  }
  return o;
};

export function organizationNode(site) {
  const o = site.organization || {};
  const origin = site.origin.replace(/\/$/, "");
  const hours = o.officeHours && {
    "@type": "OpeningHoursSpecification", dayOfWeek: o.officeHours.days, opens: o.officeHours.opens, closes: o.officeHours.closes,
  };
  return prune({
    "@type": ["Organization", "FinancialService"],
    "@id": origin + "/#organization",
    name: site.name, legalName: o.legalName, url: origin + "/", slogan: site.tagline,
    logo: site.logo && { "@type": "ImageObject", url: abs(site.logo, origin) },
    sameAs: o.sameAs, telephone: o.phone, email: o.email,
    address: o.address && { "@type": "PostalAddress", ...o.address },
    geo: o.geo && { "@type": "GeoCoordinates", ...o.geo },
    areaServed: { "@type": "Country", name: "Bangladesh" },
    openingHoursSpecification: hours,
    contactPoint: [
      { "@type": "ContactPoint", contactType: "customer support", telephone: o.phone, email: o.email, hoursAvailable: hours },
      o.whatsapp && { "@type": "ContactPoint", contactType: "customer support", telephone: o.whatsapp, contactOption: "WhatsApp" },
    ].filter(Boolean),
    identifier: (o.identifiers || []).map((i) => ({ "@type": "PropertyValue", name: i.name, value: i.value })),
  });
}

export function buildGraph(content, site) {
  const p = pageInfo(content, site);
  const origin = site.origin.replace(/\/$/, "");
  const orgId = origin + "/#organization", siteId = origin + "/#website";
  const pageId = p.url + "#webpage", appId = p.url + "#app", faqId = p.url + "#faq", crumbId = p.url + "#breadcrumb";
  const faq = (content.faq && content.faq.items) || [];
  const isTool = p.type === "tool" || p.type === "app";
  const isHub = p.type === "hub" || p.type === "collection";
  const listId = p.url + "#list";
  const items = (content.seo && content.seo.itemList) || ((content.groups || []).flatMap((g) => g.tools || [])).map((t) => ({ name: t.name, path: t.href, description: t.body }));

  const graph = [
    organizationNode(site),
    prune({ "@type": "WebSite", "@id": siteId, url: origin + "/", name: site.name, inLanguage: site.language, publisher: { "@id": orgId } }),
    prune({
      "@type": isHub ? ["WebPage", "CollectionPage"] : "WebPage", "@id": pageId, url: p.url, name: p.title, headline: p.name, description: p.description,
      inLanguage: p.language, isPartOf: { "@id": siteId }, publisher: { "@id": orgId },
      breadcrumb: { "@id": crumbId },
      about: p.about.map((a) => ({ "@type": "Thing", name: a.name, description: a.description })),
      keywords: p.keywords.length ? p.keywords.join(", ") : undefined,
      datePublished: p.datePublished, dateModified: p.dateModified,
      primaryImageOfPage: p.image && { "@type": "ImageObject", url: abs(p.image, origin) },
      mainEntity: isTool && p.app ? { "@id": appId } : isHub && items.length ? { "@id": listId } : undefined,
      hasPart: faq.length ? { "@id": faqId } : undefined,
      citation: p.sources.map((s) => ({ "@type": "CreativeWork", name: s.name, url: s.url })),
      potentialAction: { "@type": "ReadAction", target: [p.url] },
    }),
  ];
  if (isTool && p.app) {
    graph.push(prune({
      "@type": "WebApplication", "@id": appId, name: p.app.name || p.name, url: p.url, description: p.description,
      applicationCategory: "FinanceApplication", applicationSubCategory: p.app.subCategory,
      operatingSystem: "Any", browserRequirements: "Requires JavaScript", softwareVersion: p.app.version,
      isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "BDT" },
      featureList: p.app.featureList, inLanguage: p.language, areaServed: { "@type": "Country", name: "Bangladesh" },
      provider: { "@id": orgId }, publisher: { "@id": orgId }, mainEntityOfPage: { "@id": pageId },
    }));
  }
  p.videos.forEach((v, i) => graph.push(prune({
    "@type": "VideoObject", "@id": p.url + "#video" + (i + 1), name: v.name, description: v.description,
    thumbnailUrl: v.thumbnail && abs(v.thumbnail, origin), uploadDate: v.uploadDate, embedUrl: v.embedUrl, contentUrl: v.contentUrl,
    duration: v.duration, inLanguage: v.inLanguage || p.language, publisher: { "@id": orgId }, isPartOf: { "@id": pageId },
  })));
  if (isHub && items.length) {
    graph.push({
      "@type": "ItemList", "@id": listId, name: p.name, numberOfItems: items.length, itemListOrder: "https://schema.org/ItemListUnordered",
      itemListElement: items.map((t, i) => prune({ "@type": "ListItem", position: i + 1, name: t.name, url: abs(t.path, origin), description: t.description })),
    });
  }
  if (faq.length) {
    graph.push({
      "@type": "FAQPage", "@id": faqId, url: p.url + "#faq", isPartOf: { "@id": pageId }, inLanguage: p.language,
      mainEntity: faq.map((f, i) => ({ "@type": "Question", "@id": p.url + "#q" + (i + 1), name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    });
  }
  graph.push({
    "@type": "BreadcrumbList", "@id": crumbId,
    itemListElement: p.crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: abs(c.path, origin) })),
  });
  return { "@context": "https://schema.org", "@graph": graph };
}

/** Safe string for a <script type="application/ld+json"> body (prevents </script> breakouts). */
export const graphToString = (graph) => JSON.stringify(graph).replace(/</g, "\\u003c");

/* ---------- validation (used by seo/validate.mjs and any CI test) ---------- */
export function validateGraph(graph, content, site) {
  const errors = [], warnings = [];
  const nodes = graph["@graph"] || [];
  const ids = new Set();
  nodes.forEach((n) => { if (n["@id"]) { if (ids.has(n["@id"])) errors.push("Duplicate @id " + n["@id"]); ids.add(n["@id"]); } });
  const walk = (o, f) => { if (Array.isArray(o)) o.forEach((x) => walk(x, f)); else if (o && typeof o === "object") { f(o); Object.values(o).forEach((x) => walk(x, f)); } };
  walk(nodes, (o) => { const k = Object.keys(o); if (k.length === 1 && k[0] === "@id" && !ids.has(o["@id"])) errors.push("Unresolved @id reference " + o["@id"]); });
  const types = nodes.flatMap((n) => [].concat(n["@type"]));
  ["Organization", "WebSite", "WebPage", "BreadcrumbList"].forEach((t) => { if (!types.includes(t)) errors.push("Missing " + t); });
  const p = pageInfo(content, site);
  if (!p.dateModified) warnings.push("seo.dateModified is missing (freshness signal)");
  else if (!/^\d{4}-\d{2}-\d{2}/.test(p.dateModified)) errors.push("dateModified must be ISO");
  if (p.title.length > 65) warnings.push("Title is " + p.title.length + " characters (aim for 60 or fewer)");
  if (p.description.length > 160) warnings.push("Description is " + p.description.length + " characters (aim for 155 or fewer)");
  if (p.description.length < 70) warnings.push("Description is short");
  const faq = (content.faq && content.faq.items) || [];
  const fq = nodes.find((n) => n["@type"] === "FAQPage");
  if (faq.length && !fq) errors.push("FAQPage missing although the page has FAQ items");
  if (fq) {
    if (fq.mainEntity.length !== faq.length) errors.push("FAQ count differs from visible FAQ");
    fq.mainEntity.forEach((q, i) => { if (q.name !== faq[i].q || q.acceptedAnswer.text !== faq[i].a) errors.push("FAQ " + (i + 1) + " differs from visible text"); });
  }
  const bc = nodes.find((n) => n["@type"] === "BreadcrumbList");
  if (bc) bc.itemListElement.forEach((i) => { if (!/^https?:\/\//.test(i.item)) errors.push("Breadcrumb item must be an absolute URL: " + i.item); });
  const text = JSON.stringify(nodes);
  if (/"(aggregateRating|review|reviewRating)"/.test(text)) errors.push("Ratings or reviews must not be published unless they are real and approved");
  const bad = text.match(/[^.]*guarantee[^.]*/gi) || [];
  bad.forEach((s) => { if (!/\b(no|not|never|cannot|without)\b/i.test(s)) warnings.push("Check wording near 'guarantee': " + s.slice(0, 80)); });
  return { errors, warnings };
}
