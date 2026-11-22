// app/dse-calendar/page.jsx  (Next.js App Router, server component)
import DseAgmCalendar from "../../components/DseAgmCalendar";
import { buildJsonLd, summaryRows } from "../../components/agmSeo";

const URL = "https://YOUR-DOMAIN/dse-calendar"; // set your canonical URL
export const metadata = {
  title: "DSE AGM, EGM, IPO & Record Dates Calendar",
  description: "Dhaka Stock Exchange AGM and EGM dates, upcoming IPO subscriptions, record dates and proposed dividends in one calendar.",
  alternates: { canonical: URL },
  openGraph: { title: "DSE AGM, EGM, IPO & Record Dates Calendar", type: "website", url: URL },
};
export const revalidate = 3600; // pick up the daily data file without a full rebuild

export default function Page() {
  const today = new Date(Date.now() + 6 * 3600e3).toISOString().slice(0, 10); // Dhaka date
  const rows = summaryRows(today, 25);
  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd({ today, pageUrl: URL })).replace(/</g, "\\u003c") }} />
      {/* No theme prop: starts light, visitors can switch to Midnight. theme="light" | "dark" forces one. */}
      <DseAgmCalendar />
      {/* Crawlable summary (visually hidden) */}
      <section className="sr-only" aria-label="Upcoming DSE AGM and EGM meetings">
        <h2>Upcoming DSE AGM and EGM meetings</h2>
        <table>
          <thead><tr><th scope="col">Company</th><th scope="col">Meeting</th><th scope="col">Record date</th><th scope="col">Dividend</th></tr></thead>
          <tbody>{rows.map((r) => (
            <tr key={r.name + r.date}><th scope="row">{r.name} ({r.type})</th><td><time dateTime={r.date}>{r.dateLabel}</time></td><td>{r.recordLabel}</td><td>{r.purpose}</td></tr>
          ))}</tbody>
        </table>
      </section>
    </main>
  );
}
