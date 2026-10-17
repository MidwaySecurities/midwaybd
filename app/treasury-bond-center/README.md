# Treasury Bond Center (React/Tailwind + JSON)

Files: `TreasuryBondCenterPage.jsx`, `treasury-bond-center-content.json`, `YieldCurve.jsx`, `yield-curve.json`, `icons.jsx`.
Mobile-first (base = phone, `md:` = desktop). Brand colors as arbitrary values, no Tailwind config needed.

## Sections
Header (+ "New to bonds?" link) · yield curve with tenor toggle · Next Auction box (apply-by date) · Recent Auction Results · Auction Frequency · Calculator card · Reissued Bonds explainer with worked example (sample figures, labelled) · glossary · How to Apply · CTA · disclaimer · mobile sticky bar.

## Data
`python ../gsec-daily-update/gsec_update.py --publish-center .` refreshes `yield-curve.json`, `results.*` and `nextAuction` from Bangladesh Bank. Everything else is hand-edited copy.

## Rules applied
- Apply in the Midway Portal by Thursday 1:00 PM for next week's auction (Sunday rule removed, 7 Oct 2026).
- Portal link `https://portal.midwaybd.com/`. No bond fee shown (WhatsApp only). Reissue wording, 10% AIT, BB deposits interest and principal.
- Only the one stock-market-listed Sukuk can be traded via Midway; T-Bills and Government Sukuk auctions are not open to brokerage clients.

## Open items
1. ~~Compliance read~~ Replaced by the disclaimer line: all data are taken from Bangladesh Bank's website.
2. Final routes: `/government-bonds`, `/treasury-bond-center/auction-calendar`, `/bond-interest-calculator`.
3. Worked example uses sample figures; keep the "Illustrative" badge.
4. Preview files `treasury-bond-center-v2-mockup(.html/-mobile.html)` are rendered from this JSX.
