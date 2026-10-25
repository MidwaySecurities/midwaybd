#!/usr/bin/env node
// Usage: node seo/generate-seo-files.mjs [rootDir=..] [outDir=./generated]
// Scans every *-jsx/*.json that has a `seo` block (and no noindex) and writes sitemap.xml and llms.txt.
import fs from "node:fs"; import path from "node:path";
import { abs } from "./structured-data.js";
const here = path.dirname(new URL(import.meta.url).pathname);
const root = path.resolve(process.argv[2] || path.join(here, ".."));
const out = path.resolve(process.argv[3] || path.join(here, "generated"));
const site = JSON.parse(fs.readFileSync(path.join(here, "site.json")));
const pages = [];
for (const d of fs.readdirSync(root).filter((n) => n.endsWith("-jsx"))) for (const f of fs.readdirSync(path.join(root, d)).filter((n) => n.endsWith(".json"))) {
  let c; try { c = JSON.parse(fs.readFileSync(path.join(root, d, f))); } catch { continue; }
  const s = c.seo; if (!s || s.noindex) continue;
  pages.push({ path: s.path, title: s.title, description: s.description, lastmod: s.dateModified, section: s.section || "Pages" });
}
pages.sort((a, b) => a.path.localeCompare(b.path));
fs.mkdirSync(out, { recursive: true });
const x = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
fs.writeFileSync(path.join(out, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` + pages.map((p) => `  <url><loc>${x(abs(p.path, site.origin))}</loc><lastmod>${p.lastmod}</lastmod></url>`).join("\n") + `\n</urlset>\n`);
const by = {}; pages.forEach((p) => (by[p.section] ||= []).push(p));
let t = `# ${site.name}\n\n> ${site.tagline}\n\n`;
for (const [s, ps] of Object.entries(by)) t += `## ${s}\n` + ps.map((p) => `- [${p.title}](${abs(p.path, site.origin)}): ${p.description}`).join("\n") + "\n\n";
fs.writeFileSync(path.join(out, "llms.txt"), t);
console.log(`${pages.length} indexable pages -> ${out}/sitemap.xml, llms.txt`);
