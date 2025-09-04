import Image from "next/image";
import TimeDate from "./components/Home/time-date";
import FirstNavBar from "./components/Home/first-nav-bar";
import HeroSection from "./components/Home/hero-section";
import SubNav from "./components/Home/sub-nav";
import TextScrollingHorizontally from "./components/Home/text-scrolling-horizontally";
import Card from "./components/Home/card";
import hero_image1 from '../public/images/home/hero-carousel/H1.png'
import hero_image2 from '../public/images/home/hero-carousel/H2.png'
import hero_image3 from '../public/images/home/hero-carousel/H3.png'
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
import styles from "./components/Tabs.module.css"
import Tickers from "./components/tickers";
import { getABlog } from "@/lib/actions/blog/getABlog";
import { Suspense } from "react";




export default async function Home({ searchParams }) {

  const data = await getABlog(`what-is-drib-quantity-and-its-benefits`)
  console.log(data)
  console.log(JSON.stringify(data?.blog?.createdAt))
  const news = await fetch(`https://www.amarstock.com/info/News`)
  const newsData = await news.json()
  console.log(newsData)
  const tabs = [
    { id: "blog", blog_id: data?.blog?.slug, label: data?.blog?.title, content: data?.blog?.excerpt, createdAt: JSON.stringify(data?.blog?.createdAt)?.slice(1, 11) },
    { id: "visual", label: "Bangladesh Capital Market Outlook: Key Investment Insights for 2025", content: "Stay ahead of the curve with our in-depth research on Bangladesh’s capital market. This report highlights the latest market trends, sector performance, and policy changes shaping investment opportunities in 2025. Backed by data and expert analysis, it provides valuable guidance for retail and institutional investors to make informed trading decisions.", createdAt: "2025-08-02" },
    { id: "news", label: "DSE Market Update – August 2025", content: "Daily highlights of trading activity from Dhaka and Chittagong Stock Exchanges, including index performance, top gainers, and turnover leaders.", createdAt: "2025-08-03" },
  ];
  const activeCity = searchParams.tab?.toLowerCase() || "london";
  const activeTab = tabs.find((t) => t.id === activeCity) || tabs[0];
  return (
    <>
      <div className={`md:hidden`}>
        <div className="mt-8 m-auto">
          <HeroSection />
        </div>

        <div className="mt-8 px-4 bg-[#e6e6e9] text-white py-1 font-bold">
          {/* <TextScrollingHorizontally /> */}
          <div className="whitespace-nowrap bg-gray-100 text-gray-800 text-sm p-2">
            <marquee behavior="scroll" direction="left" scrollamount="4">
              📈 DSE Index gains 45 points amid strong investor confidence — 🏦 Midway Securities announces new trading app 'QuickTrade Pro' — 📰 Latest IPO of ABC Textiles oversubscribed by 3.2x — 💼 Market closes higher led by banking and pharma sectors — 📊 Foreign investors show renewed interest in blue-chip stocks — 📢 AGM of XYZ Cement scheduled for July 10th, 2025 — 📉 DSE turnover crosses BDT 950 crore mark — Stay updated with Midway Securities for all market insights.
            </marquee>
          </div>
        </div>
        <div className="mt-8 px-4">
          <Tickers />
        </div>
        <div className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 px-2">
            <div className="bg-white card-shadow rounded-lg p-4 py-8 flex flex-col items-center">
              <h1 className={`text-3xl uppercase`} >trade online - using the latest <span className="text-[#d6ad60]">TECHNOLOGIES</span></h1>
              <div className="flex justify-center items-center py-4">
                <Image src={`https://www.midwaybd.com/uploads/6/0/4/6/60462737/quicktrade-pro-website-1-png-transparent-compressed_orig.png`} alt="Hero Image 1" width={275} height={200} className="rounded-lg py-3" />
              </div>
              <h1 className={`text-3xl mb-4 uppercase`}><span className="text-[#5cc2e8]">QuickTrade Pro</span> - The latest trading Mobile App</h1>
              <p><span className="font-bold">QuickTrade Pro</span> is designed to streamline your trading experience with its powerful, user-friendly platform. Whether you're a seasoned trader or just starting, our features include real-time market data, advanced charting tools, and seamless trade execution.</p>

              <p className="mt-6">Execute trades quickly and efficiently with <span className="text-[#a88d2e]"><Link href={`quicktradepro.com`}>QuickTrade Pro.</Link></span> Experience lightning-fast order execution and stay ahead of the market.</p>
            </div>
          </div>

          <div className="section-gap">
            <h1 className="text-2xl text-center mb-4 uppercase">Stock area chart</h1>
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
          <h1 className="text-center text-black pb-2 text-3xl mt-8 uppercase">Our Regulators</h1>
          <Regulators />
        </div>
        <div className="section-gap px-2 text-black bg-white rounded-lg">
          <Tabs activeCity={activeTab.id} />
          {/* <Suspense fallback='Loading'> */}
            <div className={`${styles.tabcontent}`}>
              <h3 className="font-bold mb-2">{activeTab.label}</h3>
              <p className="text-sm text-gray-500 mb-2">
                Created on: {activeTab.createdAt}
              </p>
              <p>{activeTab.content}...<Link href={`blogs/${activeTab.blog_id}`} className="text-qtp_btn_bg_color underline">more</Link></p>
            </div>
          {/* </Suspense> */}

        </div>
        {/* 
        <div className="section-gap px-2 text-white bg-white font-bold">
          <ShiftToUs />
        </div> */}

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
