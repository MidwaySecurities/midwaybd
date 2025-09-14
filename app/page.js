// import Image from "next/image";
// import TimeDate from "./components/Home/time-date";
// import FirstNavBar from "./components/Home/first-nav-bar";
// import HeroSection from "./components/Home/hero-section";
// import SubNav from "./components/Home/sub-nav";
// import TextScrollingHorizontally from "./components/Home/text-scrolling-horizontally";
// import Card from "./components/Home/card";
// import hero_image1 from '../public/images/home/hero-carousel/H1.png'
// import hero_image2 from '../public/images/home/hero-carousel/H2.png'
// import hero_image3 from '../public/images/home/hero-carousel/H3.png'
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
// import styles from "./components/Tabs.module.css"
// import Tickers from "./components/tickers";
// import { getABlog } from "@/lib/actions/blog/getABlog";
// import style from './components/tickers.module.css';



// export default async function Home({ searchParams }) {
//   const messages = [
//     "The Dhaka Stock Exchange closed today on a mixed note as investors showed cautious optimism ahead of corporate earnings disclosures test good.",
//   ];
//   const data = await getABlog(`what-is-drib-quantity-and-its-benefits`)
//   const news = await fetch(`https://midwaybd.vercel.app/api/news`, {
//     next: {
//       revalidate: 60
//     }
//   })
//   const newsData = await news.json()
//   const tabs = [
//     { id: "blog", blog_id: data?.blog?.slug, label: data?.blog?.title, content: data?.blog?.excerpt, createdAt: JSON.stringify(data?.blog?.createdAt)?.slice(1, 11) },
//     { id: "visual", label: "Bangladesh Capital Market Outlook: Key Investment Insights for 2025", content: "Stay ahead of the curve with our in-depth research on Bangladesh’s capital market. This report highlights the latest market trends, sector performance, and policy changes shaping investment opportunities in 2025. Backed by data and expert analysis, it provides valuable guidance for retail and institutional investors to make informed trading decisions.", createdAt: "2025-08-02" },
//     { id: "news", label: "DSE Market Update – August 2025", content: newsData?.news?newsData.news[0].content:'' , createdAt: "2025-08-03" },
//   ];
//   const activeCity = searchParams.tab?.toLowerCase() || "london";
//   const activeTab = tabs.find((t) => t.id === activeCity) || tabs[0];
//   return (
//     <>
//       <div className={`md:hidden`}>
//         <div className="mt-8 m-auto">
//           <HeroSection />
//         </div>

//           {/* <TextScrollingHorizontally /> */}
//           <div className="mt-6 flex overflow-hidden border-y border-zinc-700 bg-zinc-900 px-4">
//             <ul className="animate-home-scroll hover:animate-home-scroll-slow flex gap-5 whitespace-nowrap py-2 px-4 text-white">
//               {[...messages, ...messages, ...messages, ...messages].map(
//                 (message, index) => {
//                   const splitMessage = message.split(" ");

//                   return (
//                     <li key={message} className={'gap-2 text-white transition-colors duration-200 ease-in-out'}>
//                       <Link
//                         href={'/'}
//                         target="_blank"
//                         className="flex items-center gap-1"
//                       >
//                         <p>{splitMessage.slice(0, -1).join(" ")}</p>
//                       </Link>
//                     </li>
//                   );
//                 },
//               )}
//             </ul>
//           </div>
//         <div className="mt-8 px-4">
//           <Tickers />
//         </div>
//         <div className="mt-8">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 px-2">
//             <div className="bg-white card-shadow rounded-lg p-4 py-8 flex flex-col items-center">
//               <h1 className={`text-3xl uppercase`} >trade online - using the latest <span className="text-[#d6ad60]">TECHNOLOGIES</span></h1>
//               <div className="flex justify-center items-center py-4">
//                 <Image src={`https://www.midwaybd.com/uploads/6/0/4/6/60462737/quicktrade-pro-website-1-png-transparent-compressed_orig.png`} alt="Hero Image 1" width={275} height={200} className="rounded-lg py-3" />
//               </div>
//               <h1 className={`text-3xl mb-4 uppercase`}><span className="text-[#5cc2e8]">QuickTrade Pro</span> - The latest trading Mobile App</h1>
//               <p><span className="font-bold">QuickTrade Pro</span> is designed to streamline your trading experience with its powerful, user-friendly platform. Whether you're a seasoned trader or just starting, our features include real-time market data, advanced charting tools, and seamless trade execution.</p>

//               <p className="mt-6">Execute trades quickly and efficiently with <span className="text-[#a88d2e]"><Link href={`quicktradepro.com`}>QuickTrade Pro.</Link></span> Experience lightning-fast order execution and stay ahead of the market.</p>
//             </div>
//           </div>

//           <div className="section-gap">
//             <h1 className="text-2xl text-center mb-4 uppercase">Stock area chart</h1>
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
//           <h1 className="text-center text-black pb-2 text-3xl mt-8 uppercase">Our Regulators</h1>
//           <Regulators />
//         </div>
//         <div className="section-gap px-2 text-black bg-white rounded-lg">
//           <Tabs activeCity={activeTab.id} />
//           {/* <Suspense fallback='Loading'> */}
//           <div className={`${styles.tabcontent}`}>
//             <h3 className="font-bold mb-2">{activeTab.label}</h3>
//             <p className="text-sm text-gray-500 mb-2">
//               Created on: {activeTab.createdAt}
//             </p>
//             <p>{activeTab.content}...<Link href={`blogs/${activeTab.blog_id}`} className="text-qtp_btn_bg_color underline">more</Link></p>
//           </div>
//           {/* </Suspense> */}

//         </div>
//         {/* 
//         <div className="section-gap px-2 text-white bg-white font-bold">
//           <ShiftToUs />
//         </div> */}

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
  const messages = [
    "The Dhaka Stock Exchange closed today on a mixed note as investors showed cautious optimism ahead of corporate earnings disclosures test good.",
  ];

  // ✅ Blog fetch
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
        "Stay ahead of the curve with our in-depth research on Bangladesh’s capital market. This report highlights the latest market trends, sector performance, and policy changes shaping investment opportunities in 2025. Backed by data and expert analysis, it provides valuable guidance for retail and institutional investors to make informed trading decisions.",
      createdAt: "2025-08-02",
    },
    {
      id: "news",
      label: "DSE Market Update – August 2025",
      content: newsData?.news?.[0]?.content || "No news available",
      createdAt: "2025-08-03",
    },
  ];

  const activeCity = searchParams.tab?.toLowerCase() || "london";
  const activeTab = tabs.find((t) => t.id === activeCity) || tabs[0];

  return (
    <>
      <div className={`md:hidden`}>
        <div className="mt-8 m-auto">
          <HeroSection />
        </div>

        {/* <TextScrollingHorizontally /> */}
        <div className="mt-6 flex overflow-hidden border-y border-zinc-700 bg-zinc-900 px-4">
          <ul className="animate-home-scroll hover:animate-home-scroll-slow flex gap-5 whitespace-nowrap py-2 px-4 text-white">
            {[...messages, ...messages, ...messages, ...messages].map(
              (message, index) => {
                const splitMessage = message.split(" ");

                return (
                  <li
                    key={message}
                    className={
                      "gap-2 text-white transition-colors duration-200 ease-in-out"
                    }
                  >
                    <Link
                      href={"/"}
                      target="_blank"
                      className="flex items-center gap-1"
                    >
                      <p>{splitMessage.slice(0, -1).join(" ")}</p>
                    </Link>
                  </li>
                );
              }
            )}
          </ul>
        </div>

        <div className="mt-8 px-4">
          <Tickers />
        </div>

        <div className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 px-2">
            <div className="bg-white card-shadow rounded-lg p-4 py-8 flex flex-col items-center">
              <h1 className={`text-3xl uppercase`}>
                trade online - using the latest{" "}
                <span className="text-[#d6ad60]">TECHNOLOGIES</span>
              </h1>
              <div className="flex justify-center items-center py-4">
                <Image
                  src={`https://www.midwaybd.com/uploads/6/0/4/6/60462737/quicktrade-pro-website-1-png-transparent-compressed_orig.png`}
                  alt="Hero Image 1"
                  width={275}
                  height={200}
                  className="rounded-lg py-3"
                />
              </div>
              <h1 className={`text-3xl mb-4 uppercase`}>
                <span className="text-[#5cc2e8]">QuickTrade Pro</span> - The
                latest trading Mobile App
              </h1>
              <p>
                <span className="font-bold">QuickTrade Pro</span> is designed to
                streamline your trading experience with its powerful,
                user-friendly platform. Whether you're a seasoned trader or just
                starting, our features include real-time market data, advanced
                charting tools, and seamless trade execution.
              </p>

              <p className="mt-6">
                Execute trades quickly and efficiently with{" "}
                <span className="text-[#a88d2e]">
                  <Link href={`quicktradepro.com`}>QuickTrade Pro.</Link>
                </span>{" "}
                Experience lightning-fast order execution and stay ahead of the
                market.
              </p>
            </div>
          </div>

          <div className="section-gap">
            <h1 className="text-2xl text-center mb-4 uppercase">
              Stock area chart
            </h1>
            <IndexGraph />
          </div>
        </div>

        <div className="section-gap px-2 text-white py-1 font-bold">
          <OurService />
        </div>

        <div className="section-gap px-2 text-white py-1 font-bold">
          <AccountOpenningSteps />
        </div>

        <div className="section-gap px-2 text-white bg-white font-bold">
          <Platform />
        </div>

        <div className="section-gap px-4 my-16 text-white bg-white font-bold h-36">
          <h1 className="text-center text-black pb-2 text-3xl mt-8 uppercase">
            Our Regulators
          </h1>
          <Regulators />
        </div>

        <div className="section-gap px-2 text-black bg-white rounded-lg">
          <Tabs activeCity={activeTab.id} />
          <div className={`${styles.tabcontent}`}>
            <h3 className="font-bold mb-2">{activeTab.label}</h3>
            <p className="text-sm text-gray-500 mb-2">
              Created on: {activeTab.createdAt}
            </p>
            <p>
              {activeTab.content}...
              <Link
                href={`blogs/${activeTab.blog_id}`}
                className="text-qtp_btn_bg_color underline"
              >
                more
              </Link>
            </p>
          </div>
        </div>

        <div>
          <Whatsapp />
        </div>
      </div>

      <div className="hidden md:flex md:flex-col md:items-center md:justify-center h-screen font-bold text-2xl">
        <h1>Please use your mobile to see the mobile view.</h1>
      </div>
      <FirstApproachModal />
    </>
  );
}
