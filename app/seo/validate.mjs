#!/usr/bin/env node
// Usage: node seo/validate.mjs <built.html> <content.json>
// Checks the page's JSON-LD with validateGraph and confirms FAQ text and the date are visible in the HTML.
import fs from "node:fs";
import { validateGraph } from "./structured-data.js";
const [htmlFile, contentFile] = process.argv.slice(2);
if (!htmlFile || !contentFile) { console.error("Usage: node seo/validate.mjs <built.html> <content.json>"); process.exit(2); }
const site = JSON.parse(fs.readFileSync(new URL("./site.json", import.meta.url)));
const content = JSON.parse(fs.readFileSync(contentFile));
const html = fs.readFileSync(htmlFile, "utf8");
const blocks = [...html.matchAll(/<script type="application\/ld\+json">(\{[\s\S]*?)<\/script>/g)];
const errors = [], warnings = [];
if (blocks.length !== 1) errors.push(`Expected 1 JSON-LD block, found ${blocks.length}`);
let graph = null;
try { graph = JSON.parse(blocks[0][1].replace(/\\u003c/g, "<")); } catch (e) { errors.push("JSON-LD is not valid JSON"); }
if (graph) { const r = validateGraph(graph, content, site); errors.push(...r.errors); warnings.push(...r.warnings); }
const text = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "").replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, " ");
for (const q of content.faq?.items || []) if (!text.includes(q.q.replace(/\s+/g, " "))) errors.push("FAQ question not visible: " + q.q);
if (!/Last Updated/i.test(text)) warnings.push("No visible Last Updated line");
for (const t of ["canonical", 'property="og:title"', 'name="twitter:card"', 'name="robots"']) if (!html.includes(t)) warnings.push("Head tag missing: " + t);
console.log(errors.length ? "FAIL" : "PASS", `${errors.length} errors, ${warnings.length} warnings`);
errors.forEach((e) => console.log("  ERROR  " + e)); warnings.forEach((w) => console.log("  warn   " + w));
process.exit(errors.length ? 1 : 0);
