import Link from "next/link";
import {
  IconBell,
  IconBuildingBank,
  IconBuildingFactory,
  IconBuildingStore,
  IconCertificate,
  IconChartBar,
  IconChartCandle,
  IconChartPie,
  IconCrown,
  IconDeviceMobile,
  IconFileInvoice,
  IconHeadset,
  IconLayoutDashboard,
  IconMail,
  IconReceipt,
  IconSchool,
  IconStack2,
  IconUserPlus,
  IconWallet,
} from "@tabler/icons-react";
import { siteConfig } from "../../lib/site";

const PAGE_PATH = "/client-services";
const PAGE_TITLE = "Client Services: DSE Trading, BO Account & IPO Applications";
const PAGE_DESCRIPTION =
  "Trade DSE equities, mutual funds and bonds, open a BO account online, apply for IPOs and get tax-ready statements. All Midway Securities client services.";

export const metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: "website",
    url: PAGE_PATH,
    siteName: siteConfig.name,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    locale: siteConfig.locale,
  },
  twitter: {
    card: "summary",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

/* Full class strings so Tailwind can detect them */
const COLS = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  chips: "grid-cols-2 sm:grid-cols-3",
};

const SECTIONS = [
  {
    id: "trade-invest",
    title: "Trade & Invest",
    variant: "tile",
    cols: COLS[2],
    items: [
      {
        icon: IconDeviceMobile,
        title: "QuickTrade Pro",
        text: "Buy, sell, and track your portfolio from your phone",
      },
      {
        icon: IconLayoutDashboard,
        title: "Midway Portal",
        text: "Manage your BO Account, funds, and applications in one place",
      },
    ],
  },
  {
    id: "multi-asset-classes",
    title: "Multi-asset Classes",
    variant: "chip",
    cols: COLS.chips,
    items: [
      { icon: IconChartBar, title: "Equities" },
      { icon: IconChartPie, title: "Mutual Funds" },
      { icon: IconCertificate, title: "Govt & Corporate Bonds" },
      { icon: IconBuildingFactory, title: "SME / ATB Shares" },
      { icon: IconStack2, title: "Block Trade" },
      { icon: IconBuildingStore, title: "OTC Market" },
    ],
  },
  {
    id: "accounts-ipo",
    title: "Accounts & IPO",
    variant: "tile",
    cols: COLS[3],
    items: [
      {
        icon: IconUserPlus,
        title: "BO Account Opening",
        link : 'https://portal.midwaybd.com/bo/portal-login',
        text: "100% online — ৳150, no branch visit needed",
      },
      {
        icon: IconStack2,
        title: "IPO Applications",
        text: "Apply for any DSE-listed IPO directly through Midway",
      },
      {
        icon: IconCrown,
        title: "IPO Membership Club",
        text: "We auto-apply to every eligible IPO on your behalf",
      },
    ],
  },
  {
    id: "money-in-out",
    title: "Money In & Out",
    variant: "tile",
    cols: COLS[2],
    items: [
      {
        icon: IconWallet,
        title: "Easy Deposits",
        text: "Bank transfer, mobile banking, or credit card",
      },
      {
        icon: IconBuildingBank,
        title: "BEFTN Withdrawals",
        text: "Funds sent directly to your bank via Bangladesh Bank's BEFTN network",
      },
    ],
  },
  {
    id: "stay-informed",
    title: "Stay Informed",
    variant: "tile",
    cols: COLS[4],
    items: [
      {
        icon: IconMail,
        title: "Daily Emails & SMS",
        text: "Portfolio, ledger, and trade confirmations, free",
      },
      {
        icon: IconBell,
        title: "CDBL SMS Alerts",
        text: "Real-time debit and credit notifications",
      },
      {
        icon: IconFileInvoice,
        title: "Tax Report",
        text: "Yearly tax-ready investment statements",
      },
      {
        icon: IconReceipt,
        title: "Dividend Statement",
        text: "Full yearly record of dividends credited",
      },
    ],
  },
  {
    id: "support-education",
    title: "Support & Education",
    variant: "tile",
    cols: COLS[2],
    items: [
      {
        icon: IconHeadset,
        title: "Professional Staff",
        text: "Trained advisors for personalized investment guidance",
      },
      {
        icon: IconSchool,
        title: "DSE Training Academy",
        text: "Monthly courses on analysis, trading, and portfolio management",
      },
    ],
  },
];

function Tile({ icon: Icon, title, text }) {
  return (
    <li className="rounded-lg border-neutral-800/20 border-[0.5px] border-line p-3 transition-colors hover:border-secondary">
      {/* <Icon size={18} className="block text-primary" aria-hidden="true" /> */}
      <h3 className="mt-1.5 text-lg font-medium">{title}</h3>
      <p className="mt-1 text-sm text-ink-2">{text}</p>
    </li>
  );
}

function Chip({ icon: Icon, title }) {
  return (
    <li className="flex items-center gap-1.5 rounded-lg border-neutral-800/20 border-[0.5px] border-line px-2.5 py-[9px] text-sm">
      {/* <Icon size={14} className="shrink-0 text-primary" aria-hidden="true" /> */}
      {/* Chips are plain labels, so use a span rather than a heading */}
      <span>{title}</span>
    </li>
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteConfig.url}${PAGE_PATH}#webpage`,
      url: `${siteConfig.url}${PAGE_PATH}`,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      inLanguage: "en",
      isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
      about: { "@id": `${siteConfig.url}/#organization` },
      breadcrumb: { "@id": `${siteConfig.url}${PAGE_PATH}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteConfig.url}${PAGE_PATH}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        {
          "@type": "ListItem",
          position: 2,
          name: "Client Services",
          item: `${siteConfig.url}${PAGE_PATH}`,
        },
      ],
    },
    {
      "@type": "FinancialService",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      areaServed: "BD",
    },
  ],
};

export default function ClientServicesPage() {
  return (
    <>
      <div className="container mx-auto lg:p-4 py-0">
        <div className="mx-auto container shadow-xl rounded-2xl bg-white p-3 px-4 lg:p-8">
          <div className="overflow-hidden rounded-2xl border-neutral-800/20 border-[0.5px] border-line bg-surface-2">
            {/* Top bar */}
            <header className="flex items-center justify-between gap-3 border-b-[0.5px] border-neutral-800/20 border-line px-4 py-2.5 hidden">
              <Link
                href="/"
                className="flex items-center gap-2 text-sm font-medium"
                aria-label={`${siteConfig.name} home`}
              >
                <IconChartCandle size={18} className="text-primary" aria-hidden="true" />
                {siteConfig.name}
              </Link>
              <nav aria-label="Breadcrumb" className="text-xs text-ink-2">
                <ol className="flex items-center gap-1">
                  <li>
                    <Link href="/" className="hover:text-primary">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="text-ink">
                    Client Services
                  </li>
                </ol>
              </nav>
            </header>

            <main>
              {/* Hero */}
              <section className="border-b-[0.5px] border-neutral-800/20 border-line px-5 py-6">
                <p className="text-3xl font-bold text-black mb-4 sm:mb-5">Client Services</p>
                <h1 className="text-xl sm:text-2xl font-semibold text-black leading-snug mb-3">
                  Everything you need to invest on the DSE
                </h1>
                <p className="max-w-[460px] text-base leading-[1.6] text-ink-2">
                  From mobile trading to tax reports — the full suite of services
                  available to every Midway client.
                </p>
              </section>

              {/* Service groups */}
              {SECTIONS.map((section) => (
                <section
                  key={section.id}
                  aria-labelledby={section.id}
                  className="border-b-[0.5px] border-neutral-800/20 border-line px-5 py-[18px] last:border-b-0"
                >
                  <h2 id={section.id} className="text-xl font-semibold text-black mb-4 sm:mb-5">
                    {section.title}
                  </h2>
                  <ul className={`grid gap-2.5 ${section.cols}`}>
                    {section.items.map((item) =>
                      section.variant === "chip" ? (
                        <Chip key={item.title} {...item} />
                      ) : item.link?(
                        <Link className="cursor-pointer hover:text-secondary_color" href={item.link}><Tile key={item.title} {...item} /></Link>
                      ):(<Tile key={item.title} {...item} />)
                    )}
                  </ul>
                </section>
              ))}
            </main>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}