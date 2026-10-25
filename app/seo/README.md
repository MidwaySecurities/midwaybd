# Midway Structured Data Standard (all pages, from now on)

Every page ships with machine-readable data built from the SAME content JSON that renders the visible text, so the two can never drift.

## Files
- `site.json`: organisation facts (name, address, phone, WhatsApp, hours, social links, BSEC/DSE/CDBL identifiers). Edit once, applies everywhere. `logo` and `defaultImage` now point to real files in `public/brand/` and `public/og/` (23 Oct 2026). Copy `public/` into the site root so the paths resolve.
- `structured-data.js`: framework-free. `buildGraph` (JSON-LD @graph), `buildHead` / `headToHtml` / `toNextMetadata` (title, description, canonical, robots, hreflang, Open Graph, Twitter), `validateGraph`.
- `JsonLd.jsx`: `<JsonLd content site />`. Render on the server.
- `validate.mjs`: `node seo/validate.mjs built.html content.json` (fails on schema errors or hidden FAQ text).
- `generate-seo-files.mjs`: writes `generated/sitemap.xml` and `generated/llms.txt` from every content JSON with a `seo` block.

## Graph produced
Organization (+FinancialService), WebSite, WebPage (dateModified, breadcrumb, citation), WebApplication (tools only, free, BDT), FAQPage, BreadcrumbList. Stable `@id`s, absolute URLs.

## Per-page checklist
1. Add a `seo` block to the content JSON: `type`, `path`, `title` (≤65 chars), `description` (70–160), `datePublished`, `dateModified` (ISO), `section`, `image`, `about`, `keywords`, `sources`, and `app` for tools.
2. Visible on the page: one H1, worked example, sources, FAQ (FAQ in JSON-LD must match the visible FAQ word for word), glossary where terms appear.
3. Render `<JsonLd>` on the server and apply `buildHead` / `toNextMetadata`.
4. Update `dateModified` whenever numbers or rules change.
5. Run `validate.mjs` before upload; regenerate sitemap and llms.txt.

## Hard rules
No ratings or reviews markup. No return promises or "guaranteed" wording. No fee figures. Taka only. Rates shown as examples must be labelled as examples.

## Business decision for you
`robots.txt` should allow search and AI crawlers (Googlebot, Bingbot, GPTBot, ClaudeBot, PerplexityBot, Google-Extended) if you want to be cited by AI answer engines. Blocking them removes Midway from those answers. Decide, then add the rules.

Note (17 Oct 2026): the visible Short Answer box and Last Updated date are optional; the owner removed them from the Tools hub. `dateModified` stays in the schema and must still be updated.

## Status
On this standard: Bond Interest Calculator, Tools hub, Treasury Bond Center. Other pages still use inline JSON-LD and need retrofitting, one at a time.

## Brand files and share images (23 Oct 2026)
`public/brand/`: midway-logo.png (full, with tagline), midway-logo-square-512.png (used in schema), quicktrade-pro-logo.png (navy and sky), quicktrade-pro-logo-light.png (white and sky, transparent). `public/og/`: one 1200x630 image per page, made by `og-generator/make_og.py` from each page's `seo` block (run it again after a title or section changes).
