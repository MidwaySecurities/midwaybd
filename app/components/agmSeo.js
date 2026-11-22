// agmSeo.js — structured data + crawlable summary for the DSE AGM calendar (server-safe, no React).
import { SOURCE as D_SOURCE, RAW as D_RAW, MARKET as D_MARKET, IPO as D_IPO } from "./dseAgmData";
const DEF = { SOURCE: D_SOURCE, RAW: D_RAW, MARKET: D_MARKET, IPO: D_IPO };
const MON = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };
const iso = (s) => { if (/^\d{4}-\d{2}-\d{2}$/.test(s || "")) return s; const m = /^(\d{1,2})-([A-Za-z]{3})-(\d{2})/.exec(s || ""); return m ? `20${ m[3] } -${ String(MON[m[2].toLowerCase()]).padStart(2, "0") } -${ m[1].padStart(2, "0") }` : null; };
const MONS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fmt = (d) => `${+d.slice(8)} ${MONS[+d.slice(5, 7) - 1]} ${d.slice(0, 4)}`;
const title = (n) => n.replace(/\s+/g, " ").trim().replace(/\b(\w)(\w*)/g, (w, a, b) => (b === b.toUpperCase() && b.length > 1 ? w : a.toUpperCase() + b));

/** Upcoming meetings from today (YYYY-MM-DD), earliest first. /
export function upcoming(today, limit = 25, data = DEF) {
const { RAW, MARKET } = data;
return RAW.map((r, i) => ({ r, i, d: iso(r[5]), rec: iso(r[6]) }))
.filter((x) => x.d && x.d >= today && x.r[8] !== "Cancelled")
.sort((a, b) => a.d.localeCompare(b.d) || a.r[0].localeCompare(b.r[0])).slice(0, limit)
.map(({ r, i, d, rec }) => ({ name: title(r[0]), type: r[1], date: d, record: rec, purpose: r[4], mode: r[8], venue: r[7], code: MARKET[i]?.code || null }));
}
const MODE = { Digital: "OnlineEventAttendanceMode", Hybrid: "MixedEventAttendanceMode", Physical: "OfflineEventAttendanceMode" };
/* Dated IPO subscriptions (open or upcoming). Undated pipeline entries are not emitted as events. /
export function upcomingIpos(today, data = DEF) {
return (data.IPO || []).map((p) => ({ name: p.name, start: iso(p.subStart), end: iso(p.subEnd), lottery: iso(p.lottery), listing: iso(p.listing), method: p.method, offerPrice: p.offerPrice, size: p.size }))
.filter((p) => p.start && (p.end || p.start) >= today).sort((a, b) => a.start.localeCompare(b.start));
}
export function buildJsonLd({ today, pageUrl, limit = 25, data = DEF } = {}) {
const SOURCE = data.SOURCE;
const ev = upcoming(today, limit, data);
const ipos = upcomingIpos(today, data);
return {
@context": "Schema.org - Schema.org ",
@graph": [
{ "@type": "WebPage", name: "DSE AGM, EGM & Record Dates Calendar", description: "Interactive calendar of Dhaka Stock Exchange AGMs, EGMs, record dates and proposed dividends.", inLanguage: "en", ...(pageUrl ? { url: pageUrl } : {}), dateModified: SOURCE.lastUpdated, isBasedOn: SOURCE.url, publisher: { "@type": "Organization", name: "Dhaka Stock Exchange PLC", url: "Dhaka Stock Exchange — Bangladesh's Capital Market " } },
{ "@type": "ItemList", name: "Upcoming AGM and EGM meetings", numberOfItems: ev.length,
itemListElement: ev.map((e, k) => ({ "@type": "ListItem", position: k + 1, item: {
@type": "BusinessEvent", name: ${e.name} ${e.type}, startDate: e.date, description: e.purpose,
eventStatus: "EventScheduled - Schema.org Enumeration Member ",
eventAttendanceMode: <https://schema.org/${MODE[e.mode]> || "MixedEventAttendanceMode"},
location: e.mode === "Digital" || e.mode === "Hybrid" || !e.venue || /notified|n/a/i.test(e.venue) ? { "@type": "VirtualLocation", url: e.code ? <https://www.dse.com.bd/company/${e.code}> : "Dhaka Stock Exchange — Bangladesh's Capital Market " } : { "@type": "Place", name: e.venue.slice(0, 120), address: "Bangladesh" },
organizer: { "@type": "Organization", name: e.name, ...(e.code ? { url: <https://www.dse.com.bd/company/${e.code}> } : {}) },
} })) },
...(ipos.length ? [{ "@type": "ItemList", name: "IPO subscriptions", numberOfItems: ipos.length,
itemListElement: ipos.map((p, k) => ({ "@type": "ListItem", position: k + 1, item: {
@type": "BusinessEvent", name: ${p.name} IPO subscription, startDate: p.start, ...(p.end ? { endDate: p.end } : {}),
description: [p.method, p.offerPrice ? offer price BDT ${p.offerPrice} : null, p.lottery ? lottery ${p.lottery} : null, p.listing ? listing ${p.listing} : null].filter(Boolean).join("; ") || "Initial public offering on the Dhaka Stock Exchange",
eventStatus: "EventScheduled - Schema.org Enumeration Member ", eventAttendanceMode: "OnlineEventAttendanceMode - Schema.org Enumeration Member ",
location: { "@type": "VirtualLocation", url: "Dhaka Stock Exchange — Bangladesh's Capital Market " }, organizer: { "@type": "Organization", name: p.name },
} })) }] : []),
],
};
}
/* Plain-text rows for a server-rendered, crawlable table. */
export const summaryRows = (today, limit = 25, data = DEF) => upcoming(today, limit, data).map((e) => ({ ...e, dateLabel: fmt(e.date), recordLabel: e.record ? fmt(e.record) : "To be notified" }));