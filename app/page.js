// import Image from "next/image";
// import TimeDate from "./components/Home/time-date";
// import FirstNavBar from "./components/Home/first-nav-bar";
// import HeroSection from "./components/Home/hero-section";
// import SubNav from "./components/Home/sub-nav";
// import TextScrollingHorizontally from "./components/Home/text-scrolling-horizontally";
// import Card from "./components/Home/card";
// import hero_image1 from "../public/images/home/hero-carousel/H1.png";
// import hero_image2 from "../public/images/home/hero-carousel/H2.png";
// import hero_image3 from "../public/images/home/hero-carousel/H3.png";
// import OurService from "./components/Home/our-service";
// import AccountOpenningSteps from "./components/Home/account-openning-step";
// import Platform from "./components/Home/platform";
// import PaymentMethod from "./components/Home/Payment-method";
// import Footer from "./components/Home/footer/footer";
// import Navigation from "./components/modal/navigation";
// import { useModalClose } from "./components/close-button-provider";
// import Link from "next/link";
// import Whatsapp from "./components/whatsapp-button";
// import ShiftToUs from "./components/Home/ShiftToUs";
// import Regulators from "./components/Home/Regulators";
// import FirstApproachModal from "./components/firstApproachModal";
// import IndexGraph from "./components/Home/index-graph";
// import Tabs from "./components/Tabs";
// import styles from "./components/Tabs.module.css";
// import Tickers from "./components/tickers";
// import { getABlog } from "@/lib/actions/blog/getABlog";
// import style from "./components/tickers.module.css";

// export default async function Home({ searchParams }) {
//   const data = await getABlog(`what-is-drib-quantity-and-its-benefits`);

//   // ✅ Safe News fetch with fallback
//   let newsData = { news: [] };
//   try {
//     const news = await fetch(`https://midwaybd.vercel.app/api/news`, {
//       next: { revalidate: 60 },
//     });
//     if (news.ok) {
//       newsData = await news.json();
//     } else {
//       console.error("News fetch failed with status:", news.status);
//     }
//   } catch (err) {
//     console.error("Error fetching news:", err);
//   }
//   const messages = [
//     newsData?.news?.[0]?.content ||
//     `The Dhaka Stock Exchange closed today on a mixed note as investors showed cautious optimism ahead of corporate earnings disclosures test good.`,
//   ];



//   const tabs = [
//     {
//       id: "blog",
//       blog_id: data?.blog?.slug,
//       label: data?.blog?.title,
//       content: data?.blog?.excerpt,
//       createdAt: JSON.stringify(data?.blog?.createdAt)?.slice(1, 11),
//     },
//     {
//       id: "visual",
//       label: "Bangladesh Capital Market Outlook: Key Investment Insights for 2025",
//       content:
//         "Stay ahead of the curve with our in-depth research on Bangladesh’s capital market. This report highlights the latest market trends, sector performance, and policy changes shaping investment opportunities in 2025. Backed by data and expert analysis, it provides valuable guidance for retail and institutional investors to make informed trading decisions.",
//       createdAt: "2025-08-02",
//     },
//     {
//       id: "news",
//       label: "DSE Market Update – August 2025",
//       content: newsData?.news?.[0]?.content || "No news available",
//       createdAt: "2025-08-03",
//     },
//   ];

//   const activeCity = searchParams.tab?.toLowerCase() || "london";
//   const activeTab = tabs.find((t) => t.id === activeCity) || tabs[0];

//   return (
//     <>
//       <div className={`md:hidden`}>
//         <div className="mt-8 m-auto">
//           <HeroSection />
//         </div>

//         {/* <TextScrollingHorizontally /> */}
//         <div className="mt-6 flex overflow-hidden border-y border-zinc-700 bg-zinc-900 px-4">
//           <ul className="animate-home-scroll hover:animate-home-scroll-slow flex gap-5 whitespace-nowrap py-2 px-4 text-white">
//             {[...messages, ...messages, ...messages, ...messages].map(
//               (message, index) => {
//                 const splitMessage = message.split(" ");

//                 return (
//                   <li
//                     key={message}
//                     className={
//                       "gap-2 text-white transition-colors duration-200 ease-in-out"
//                     }
//                   >
//                     <Link
//                       href={"/"}
//                       target="_blank"
//                       className="flex items-center gap-1"
//                     >
//                       <p>{newsData?.news?.[0]?.title}: {splitMessage.slice(0, -1).join(" ")}</p>
//                     </Link>
//                   </li>
//                 );
//               }
//             )}
//           </ul>
//         </div>

//         <div className="mt-8 px-4">
//           <Tickers />
//         </div>

//         <div className="mt-8">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 px-2">
//             <div className="bg-white card-shadow rounded-lg p-4 py-8 flex flex-col items-center">
//               <h1 className={`text-3xl uppercase`}>
//                 trade online - using the latest{" "}
//                 <span className="text-[#d6ad60]">TECHNOLOGIES</span>
//               </h1>
//               <div className="flex justify-center items-center py-4">
//                 <Image
//                   src={`https://www.midwaybd.com/uploads/6/0/4/6/60462737/quicktrade-pro-website-1-png-transparent-compressed_orig.png`}
//                   alt="Hero Image 1"
//                   width={275}
//                   height={200}
//                   className="rounded-lg py-3"
//                 />
//               </div>
//               <h1 className={`text-3xl mb-4 uppercase`}>
//                 <span className="text-[#5cc2e8]">QuickTrade Pro</span> - The
//                 latest trading Mobile App
//               </h1>
//               <p>
//                 <span className="font-bold">QuickTrade Pro</span> is designed to
//                 streamline your trading experience with its powerful,
//                 user-friendly platform. Whether you're a seasoned trader or just
//                 starting, our features include real-time market data, advanced
//                 charting tools, and seamless trade execution.
//               </p>

//               <p className="mt-6">
//                 Execute trades quickly and efficiently with{" "}
//                 <span className="text-[#a88d2e]">
//                   <Link href={`quicktradepro.com`}>QuickTrade Pro.</Link>
//                 </span>{" "}
//                 Experience lightning-fast order execution and stay ahead of the
//                 market.
//               </p>
//             </div>
//           </div>

//           <div className="section-gap">
//             <h1 className="text-2xl text-center mb-4 uppercase">
//               Stock area chart
//             </h1>
//             <IndexGraph />
//           </div>
//         </div>

//         <div className="section-gap px-2 text-white py-1 font-bold">
//           <OurService />
//         </div>

//         <div className="section-gap px-2 text-white py-1 font-bold">
//           <AccountOpenningSteps />
//         </div>

//         <div className="section-gap px-2 text-white bg-white font-bold">
//           <Platform />
//         </div>

//         <div className="section-gap px-4 my-16 text-white bg-white font-bold h-36">
//           <h1 className="text-center text-black pb-2 text-3xl mt-8 uppercase">
//             Our Regulators
//           </h1>
//           <Regulators />
//         </div>

//         <div className="section-gap px-2 text-black bg-white rounded-lg">
//           <Tabs activeCity={activeTab.id} />
//           <div className={`${styles.tabcontent}`}>
//             <h3 className="font-bold mb-2">{activeTab.label}</h3>
//             <p className="text-sm text-gray-500 mb-2">
//               Created on: {activeTab.createdAt}
//             </p>
//             <p>
//               {activeTab.content}...
//               <Link
//                 href={`blogs/${activeTab.blog_id}`}
//                 className="text-qtp_btn_bg_color underline"
//               >
//                 more
//               </Link>
//             </p>
//           </div>
//         </div>

//         <div>
//           <Whatsapp />
//         </div>
//       </div>

//       <div className="hidden md:flex md:flex-col md:items-center md:justify-center h-screen font-bold text-2xl">
//         <h1>Please use your mobile to see the mobile view.</h1>
//       </div>
//       <FirstApproachModal />
//     </>
//   );
// }


import Image from "next/image";
import TimeDate from "./components/Home/time-date";
import FirstNavBar from "./components/Home/first-nav-bar";
import HeroSection from "./components/Home/hero-section";
import SubNav from "./components/Home/sub-nav";
import TextScrollingHorizontally from "./components/Home/text-scrolling-horizontally";
import Card from "./components/Home/card";
import hero_image1 from "../public/images/home/hero-carousel/H1.png";
import hero_image2 from "../public/images/home/hero-carousel/H2.png";
import hero_image3 from "../public/images/home/hero-carousel/H3.png";
import OurService from "./components/Home/our-service";
import AccountOpenningSteps from "./components/Home/account-openning-step";
import Platform from "./components/Home/platform";
import PaymentMethod from "./components/Home/Payment-method";
import Footer from "./components/Home/footer/footer";
import Navigation from "./components/modal/navigation";
import { useModalClose } from "./components/close-button-provider";
import Link from "next/link";
import Whatsapp from "./components/whatsapp-button";
import ShiftToUs from "./components/Home/ShiftToUs";
import Regulators from "./components/Home/Regulators";
import FirstApproachModal from "./components/firstApproachModal";
import IndexGraph from "./components/Home/index-graph";
import Tabs from "./components/Tabs";
import styles from "./components/Tabs.module.css";
import Tickers from "./components/tickers";
import { getABlog } from "@/lib/actions/blog/getABlog";
import style from "./components/tickers.module.css";

export default async function Home({ searchParams }) {
  const data = await getABlog(`what-is-drib-quantity-and-its-benefits`);

  // ✅ Safe News fetch with fallback
  let newsData = { news: [] };
  try {
    const news = await fetch(`https://midwaybd.vercel.app/api/news`, {
      next: { revalidate: 60 },
    });
    if (news.ok) {
      newsData = await news.json();
    } else {
      console.error("News fetch failed with status:", news.status);
    }
  } catch (err) {
    console.error("Error fetching news:", err);
  }
  const messages = [
    newsData?.news?.[0]?.content ||
    `The Dhaka Stock Exchange closed today on a mixed note as investors showed cautious optimism ahead of corporate earnings disclosures test good.`,
  ];

  const tabs = [
    {
      id: "blog",
      blog_id: data?.blog?.slug,
      label: data?.blog?.title,
      content: data?.blog?.excerpt,
      createdAt: JSON.stringify(data?.blog?.createdAt)?.slice(1, 11),
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
      content: newsData?.news?.[0]?.content || "No news available",
      createdAt: "2025-08-03",
    },
  ];

  const activeCity = searchParams.tab?.toLowerCase() || "blog";
  const activeTab = tabs.find((t) => t.id === activeCity) || tabs[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      {/* <div className="sticky top-0 z-50 bg-white shadow-sm">
        <FirstNavBar />
        <div className="hidden lg:block">
          <SubNav />
        </div>
      </div> */}

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Desktop Hero */}
        {/* <div className="hidden lg:block relative">
          <div className="container mx-auto px-6 py-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
              <div className="space-y-8">
                <div className="space-y-6">
                  <h1 className="text-5xl xl:text-6xl font-bold leading-tight">
                    Trade Online with
                    <span className="block text-yellow-400">Latest Technologies</span>
                  </h1>
                  <p className="text-xl text-blue-100 leading-relaxed">
                    Experience professional trading with QuickTrade Pro - your gateway to Bangladesh's capital market with real-time data, advanced analytics, and seamless execution.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Start Trading Now
                  </button>
                  <button className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-bold px-8 py-4 rounded-full transition-all duration-300">
                    Watch Demo
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-6 pt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">50K+</div>
                    <div className="text-blue-200">Active Traders</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">₹10M+</div>
                    <div className="text-blue-200">Daily Volume</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">99.9%</div>
                    <div className="text-blue-200">Uptime</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative z-10">
                  <HeroSection />
                </div>
                <div className="absolute -top-10 -right-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Mobile Hero */}
        <div className="lg:hidden relative px-4 py-12">
          <div className="text-center space-y-6 mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
              Trade Online with
              <span className="block text-yellow-400">Latest Technologies</span>
            </h1>
            <p className="text-lg text-blue-100">
              Professional trading platform for Bangladesh's capital market
            </p>
          </div>
          <HeroSection />
        </div>
      </section>

      {/* Live News Ticker */}
      <div className="bg-gray-900 border-y border-gray-700">
        <div className="flex overflow-hidden">
          <div className="flex items-center bg-red-600 px-4 py-3 min-w-fit z-10">
            <span className="text-white font-bold text-sm uppercase tracking-wide">Breaking News</span>
          </div>
          <ul className="animate-home-scroll hover:animate-home-scroll-slow flex gap-8 whitespace-nowrap py-3 px-4 text-white">
            {[...messages, ...messages, ...messages, ...messages].map(
              (message, index) => {
                const splitMessage = message.split(" ");
                return (
                  <li key={`${message}-${index}`} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <Link href="/" className="hover:text-yellow-400 transition-colors">
                      <span className="font-medium">{newsData?.news?.[0]?.title}:</span> {splitMessage.slice(0, -1).join(" ")}
                    </Link>
                  </li>
                );
              }
            )}
          </ul>
        </div>
      </div>

      {/* Market Tickers */}
      <section className="bg-white py-6 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Live Market Data</h2>
            {/* <TimeDate /> */}
          </div>
          <Tickers />
        </div>
      </section>

      {/* QuickTrade Pro Showcase */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12">
                <div className="space-y-6">
                  <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                    Latest Technology
                  </div>

                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
                    <span className="text-blue-600">QuickTrade Pro</span> -
                    <br />The Ultimate Trading App
                  </h2>

                  <p className="text-lg text-gray-600 leading-relaxed">
                    <strong>QuickTrade Pro</strong> is designed to streamline your trading experience with its powerful, user-friendly platform. Whether you're a seasoned trader or just starting, our features include real-time market data, advanced charting tools, and seamless trade execution.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-sm">✓</span>
                      </div>
                      <span className="text-gray-700">Real-time market data & analytics</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-sm">✓</span>
                      </div>
                      <span className="text-gray-700">Lightning-fast order execution</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-sm">✓</span>
                      </div>
                      <span className="text-gray-700">Advanced charting & technical indicators</span>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Link
                      href="quicktradepro.com"
                      className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Get QuickTrade Pro
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 text-center">
              <div className="relative inline-block">
                <Image
                  src="https://www.midwaybd.com/uploads/6/0/4/6/60462737/quicktrade-pro-website-1-png-transparent-compressed_orig.png"
                  alt="QuickTrade Pro Mobile App"
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Live Market Analytics
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay informed with real-time market data, interactive charts, and comprehensive analysis tools
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-200">
            <IndexGraph />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Comprehensive trading solutions designed to meet all your investment needs
            </p>
          </div>
          <OurService />
        </div>
      </section>

      {/* Account Opening Steps */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Start Trading in 3 Simple Steps
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Open your trading account quickly and securely with our streamlined process
            </p>
          </div>
          <AccountOpenningSteps />
        </div>
      </section>

      {/* Platform Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Trading Platforms
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our range of professional trading platforms designed for every trader
            </p>
          </div>
          <Platform />
        </div>
      </section>

      {/* Regulators Section */}
      <section className="py-16 bg-gradient-to-br from-gray-100 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Regulated & Trusted
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              We are regulated by leading financial authorities ensuring your investments are safe and secure
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Regulators />
          </div>
        </div>
      </section>

      {/* News & Insights Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Market Insights & Analysis
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay informed with the latest market news, research reports, and expert analysis
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-200">
              <Tabs activeCity={activeTab.id} />
              <div className={`${styles.tabcontent} mt-6`}>
                <div className="space-y-4">
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-800 leading-tight">
                      {activeTab.label}
                    </h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {activeTab.createdAt}
                    </span>
                  </div>

                  <div className="prose prose-lg text-gray-600 leading-relaxed">
                    {activeTab.content}
                    {activeTab.blog_id && (
                      <>
                        ...{" "}
                        <Link
                          href={`blogs/${activeTab.blog_id}`}
                          className="text-blue-600 hover:text-blue-700 underline font-medium"
                        >
                          Read More
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-5xl font-bold leading-tight">
              Ready to Start Your Trading Journey?
            </h2>
            <p className="text-xl text-blue-100">
              Join thousands of successful traders who trust Midway Securities for their investment needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                Open Trading Account
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold px-8 py-4 rounded-full transition-all duration-300">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <Footer /> */}

      {/* Floating Elements */}
      <Whatsapp />
      <FirstApproachModal />


    </div>
  );
}
