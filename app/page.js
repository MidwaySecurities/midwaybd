import Image from "next/image";
import HeroSection from "./components/Home/hero-section";
import AccountOpenningSteps from "./components/Home/account-openning-step";
import Platform from "./components/Home/platform";
import Link from "next/link";
import Whatsapp from "./components/whatsapp-button";
import Regulators from "./components/Home/Regulators";
import FirstApproachModal from "./components/firstApproachModal";
import IndexGraph from "./components/Home/index-graph";
import Tickers from "./components/tickers";
import { getABlog } from "@/lib/actions/blog/getABlog";
import TabsSection from "./components/TabSection";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.midwaybd.com";

export async function generateMetadata() {
  const title =
    "Upcoming website | Midway Securities | Online Stock Trading Platform in Bangladesh";
  const description =
    "Trade online with Midway Securities — a DSE & CSE registered brokerage offering Real-time market trading, advanced charting, QuickTrade Pro mobile trading, and secure online account opening in Bangladesh.";

  return {
    title,
    description,
    keywords: [
      "Midway Securities",
      "DSE trading",
      "CSE trading",
      "Bangladesh stock market",
      "online share trading Bangladesh",
      "QuickTrade Pro",
      "open BO account Bangladesh",
      "stock brokerage Bangladesh",
    ],
    alternates: {
      canonical: SITE_URL,
    },
    openGraph: {
      title,
      description,
      url: SITE_URL,
      siteName: "Midway Securities",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: "https://www.midwaybd.com/uploads/6/0/4/6/60462737/quicktrade-pro-website-1-png-transparent-compressed_orig.png",
          width: 1200,
          height: 630,
          alt: "Midway Securities QuickTrade Pro trading platform",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        "https://www.midwaybd.com/uploads/6/0/4/6/60462737/quicktrade-pro-website-1-png-transparent-compressed_orig.png",
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
    other: {
      "revisit-after": "1 days",
    },
  };
}

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_PORTAL_URL}/blog/latest`)
  const result = await res.json();
  let newsData = [];
  try {
    const news = await fetch(`${process.env.NEXT_PUBLIC_PORTAL_URL}/public-web-news`, {
      next: { revalidate: 60 },
    });
    if (news.status === 200) {
      newsData = await news.json();
    } else {
      console.error("News fetch failed with status:", news.status);
    }
  } catch (err) {
    console.error("Error fetching news:", err);
  }

  const tabs = [
    {
      id: "blog",
      blog_id: result?.data?.slug,
      label: result?.data?.title,
      content: result?.data?.excerpt,
      createdAt: JSON.stringify(result?.data?.createdAt)?.slice(1, 11),
    },
    {
      id: "visual",
      label: "Bangladesh Capital Market Outlook: Key Investment Insights for 2025",
      content:
        "Stay ahead of the curve with our in-depth research on Bangladesh's capital market. This report highlights the latest market trends, sector performance, and policy changes shaping investment opportunities in 2025. Backed by data and expert analysis, it provides valuable guidance for retail and institutional investors to make informed trading decisions.",
      createdAt: "2025-08-02",
    },
    {
      id: "news",
      label: "DSE Market Update – August 2025",
      content:
        newsData?.data?.news?.data?.[0]?.content || "No news available",
      createdAt: "2025-08-03",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FinancialService",
        "@id": `${SITE_URL}/#organization`,
        name: "Midway Securities",
        url: SITE_URL,
        image:
          "https://www.midwaybd.com/uploads/6/0/4/6/60462737/quicktrade-pro-website-1-png-transparent-compressed_orig.png",
        description:
          "DSE & CSE registered brokerage offering online stock trading, Real-time market trading, and account opening in Bangladesh.",
        areaServed: "BD",
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Midway Securities",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="my-3" aria-label="Live market data">
        <div className="container mx-auto px-0 lg:px-4">
          <Tickers />
        </div>
      </section>

      <main>
        <section className="relative text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="lg:hidden relative py-0 md:py-6 pt-0">
            <div className="text-center bg-primary_color space-y-6 mb-0 p-6">
              <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
                Trade Online with
                <span className="block text-yellow-400">Latest Technologies</span>
              </h1>
              <p className="text-lg text-blue-100">
                Professional trading platform for Bangladesh's capital market
              </p>
            </div>
          </div>
        </section>

        <div className="lg:hidden">
          <HeroSection />
        </div>

        {/* <NewsTicker /> */}

        {/* QuickTrade Pro Showcase */}
        <section className="pb-8 pt-8 md:pt-0 bg-gradient-to-br from-gray-50 to-blue-50" aria-labelledby="quicktrade-heading">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12">
                  <div className="space-y-6">
                    <div className="inline-flex items-center bg-blue-100 text-primary_color px-4 py-2 rounded-full font-medium">
                      <span className="w-2 h-2 bg-primary_color rounded-full mr-2 animate-pulse"></span>
                      Latest Technology
                    </div>

                    <h2 id="quicktrade-heading" className="text-3xl lg:text-4xl font-bold text-gray-800">
                      <span className="text-secondary_color">QuickTrade Pro</span> -
                      <br />The Ultimate Trading App
                    </h2>

                    <p className="text-lg text-gray-600 leading-relaxed">
                      <strong>QuickTrade Pro</strong> is designed to streamline your trading experience with its powerful, user-friendly platform. Whether you're a seasoned trader or just starting, our features include Real-time market trading, advanced charting tools, and seamless trade execution.
                    </p>

                    <ul className="space-y-4 list-none">
                      <li className="flex items-center space-x-3">
                        <div className="w-6 h-6 text-primary_color items-center justify-center" aria-hidden="true">
                          <span className="text-sm font-bold">✓</span>
                        </div>
                        <span className="text-gray-700">Real-time market trading & analytics</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="w-6 h-6 text-primary_color items-center justify-center" aria-hidden="true">
                          <span className="text-sm font-bold">✓</span>
                        </div>
                        <span className="text-gray-700">Lightning-fast order execution</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="w-6 h-6 text-primary_color items-center justify-center" aria-hidden="true">
                          <span className="text-sm font-bold">✓</span>
                        </div>
                        <span className="text-gray-700">Advanced charting & technical indicators</span>
                      </li>
                    </ul>

                    <div className="pt-6">
                      <a
                        href="https://quicktradepro.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-secondary_color hover:from-blue-700 hover:to-blue-800 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        Get QuickTrade Pro
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden lg:block order-1 lg:order-2 text-center">
                <div className="relative inline-block">
                  <Image
                    src="https://www.midwaybd.com/uploads/6/0/4/6/60462737/quicktrade-pro-website-1-png-transparent-compressed_orig.png"
                    alt="QuickTrade Pro mobile trading app screen showing live Bangladesh stock market charts"
                    width={400}
                    height={300}
                    className="max-w-full h-auto filter drop-shadow-2xl"
                  />
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stock Chart Section */}
        <section className="py-16 bg-white" aria-labelledby="analytics-heading">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 id="analytics-heading" className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                DSEX INDEX: <span className="text-secondary_color">LIVE</span>
              </h2>
              {/* <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Stay informed with Real-time market trading, interactive charts, and comprehensive analysis tools
              </p> */}
            </div>

            <div className="bg-linear-to-br from-gray-50 to-white rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-200">
              <IndexGraph />
            </div>
          </div>
        </section>

        <section className="py-8 lg:py-16 bg-linear-to-br from-gray-100 to-blue-50 lg:hidden" aria-labelledby="regulators-heading">
          <div className="container mx-auto px-4">
            <div className="mt-8 text-center py-3">
              <div className="inline-flex items-start lg:items-center bg-blue-100 text-primary_color px-4 py-2 rounded-full">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                {/* inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium */}
                <span className="text-xl font-medium">Regulated & Licensed</span>
              </div>
            </div>
            <div className="text-center mb-12">
              <h2 id="regulators-heading" className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                Regulated & Trusted
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                We are regulated by multiple Bangladesh financial authorities ensuring your investments are safe and secure.
              </p>
            </div>
            <div className="max-w-4xl mx-auto lg:hidden">
              <Regulators />
            </div>
          </div>
        </section>

        {/* Account Opening Steps */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4">
            <AccountOpenningSteps />
          </div>
        </section>

        {/* Platform Section */}
        <section className="py-16 lg:py-24 bg-white" aria-labelledby="platforms-heading flex">
          <div className="flex justify-center">
            <div className="inline-flex items-center bg-blue-100 text-primary_color px-4 py-2 rounded-full font-medium mb-4">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse text-xl"></span>
              Multiple Platforms
            </div>
          </div>
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 id="platforms-heading" className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                Trading <span className="text-secondary_color">Platforms</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose from our range of professional trading platforms designed for every trader
              </p>
            </div>
            <Platform />
          </div>
        </section>

        {/* Regulators Section */}
        <section className="py-16 bg-gradient-to-br from-gray-100 to-blue-50 hidden lg:block" aria-labelledby="regulators-heading">
          <div className="container mx-auto px-4">
            <div className="mt-8 text-center py-3 text-xl">
              <div className="inline-flex items-center bg-blue-100 text-primary_color px-4 py-2 rounded-full">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                <span className="text-xl font-medium">Regulated & Licensed</span>
              </div>
            </div>
            <div className="text-center mb-12">
              <h2 id="regulators-heading" className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                Regulated & Trusted
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                We are regulated by multiple Bangladesh financial authorities ensuring your investments are safe and secure.
              </p>
            </div>
            <div className="max-w-4xl mx-auto hidden lg:block">
              <Regulators />
            </div>
          </div>
        </section>

        {/* News & Insights Section */}
        <section className="py-4 lg:py-24 bg-white" aria-labelledby="insights-heading">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 id="insights-heading" className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                Market Insights & Analysis
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Stay informed with the latest market news, research reports, and expert analysis
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-200">
                {/* Data fetched server-side above; all click/state handling
                    happens inside this client component now. */}
                <TabsSection tabs={tabs} />
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 lg:py-24 bg-secondary_color text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl lg:text-5xl font-bold leading-tight">
                Ready to Start Your Investment Journey?
              </h2>
              <p className="text-xl text-blue-100">
                Join thousands of successful investors who trust Midway Securities for their investment needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href='https://portal.midwaybd.com/bo/portal-login' target='_blank' rel='noopener noreferrer'>
                  <button className="bg-primary_color hover:bg-yellow-400 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Open BO Account
                  </button>
                </a>
                <Link href="/contact-us">
                  <button className="bg-white hover:bg-gray-100 text-secondary_color font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      {/* <Footer /> */}

      {/* Floating Elements */}

    </div>
  );
}