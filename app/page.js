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
export default function Home() {
  return (
    <>
      <div className={`md:hidden`}>
        <div className="mt-8 m-auto">
          <HeroSection />
        </div>

        <div className="mt-8 px-4 bg-[#e6e6e9] text-white py-1 font-bold">
          {/* <TextScrollingHorizontally /> */}
          <div class="whitespace-nowrap bg-gray-100 text-gray-800 text-sm p-2">
            <marquee behavior="scroll" direction="left" scrollamount="4">
              📈 DSE Index gains 45 points amid strong investor confidence — 🏦 Midway Securities announces new trading app 'QuickTrade Pro' — 📰 Latest IPO of ABC Textiles oversubscribed by 3.2x — 💼 Market closes higher led by banking and pharma sectors — 📊 Foreign investors show renewed interest in blue-chip stocks — 📢 AGM of XYZ Cement scheduled for July 10th, 2025 — 📉 DSE turnover crosses BDT 950 crore mark — Stay updated with Midway Securities for all market insights.
            </marquee>
          </div>
        </div>
        <div className="mt-8">
          {/* <Card title={`QuickTrade Pro - The latest trading Mobile App`} cardDesc={`QuickTrade Pro - The latest trading Mobile App
​QuickTrade Pro is designed to streamline your trading experience with its powerful, user-friendly platform. Whether you're a seasoned trader or just starting, our features include real-time market data, advanced charting tools, and seamless trade execution.

Execute trades quickly and efficiently with QuickTrade Pro. Experience lightning-fast order execution and stay ahead of the market.`}>
            <Image src={`https://www.midwaybd.com/uploads/6/0/4/6/60462737/quicktrade-pro-website-1-png-transparent-compressed_orig.png`} alt="Card Image" width={200} height={200} className="rounded-lg py-3" />
          </Card> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            <div className="bg-white card-shadow rounded-lg p-4 py-8 flex flex-col items-center">
              <h1 className="text-3xl">trade online - using the latest <span className="text-[#d6ad60]">TECHNOLOGIES</span></h1>
              <div className="flex justify-center items-center py-4">
                <Image src={`https://www.midwaybd.com/uploads/6/0/4/6/60462737/quicktrade-pro-website-1-png-transparent-compressed_orig.png`} alt="Hero Image 1" width={275} height={200} className="rounded-lg py-3" />
              </div>
              <h1 className="text-3xl mb-4"><span className="text-[#5cc2e8]">QuickTrade Pro</span> - The latest trading Mobile App</h1>
              <p><span className="font-bold">QuickTrade Pro</span> is designed to streamline your trading experience with its powerful, user-friendly platform. Whether you're a seasoned trader or just starting, our features include real-time market data, advanced charting tools, and seamless trade execution.</p>

              <p className="mt-6">Execute trades quickly and efficiently with <span className="text-[#a88d2e]"><Link href={`quicktradepro.com`}>QuickTrade Pro.</Link></span> Experience lightning-fast order execution and stay ahead of the market.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            <div className="bg-white card-shadow rounded-lg p-4 py-8 flex flex-col items-center">
              <h1 className="text-3xl self-start">Why <span className="text-[#5CBCE0]">Choose</span> us?</h1>
              <div className="flex justify-center items-center py-4">
                <Image src={`https://www.midwaybd.com/uploads/6/0/4/6/60462737/midway-portal-live-insta-transparent-1_orig.png`} alt="Hero Image 1" width={275} height={200} className="rounded-lg py-3" />
              </div>
              <h1 className="text-2xl mb-4 uppercase">online BO account opening</h1>
              <p>​Open a BO Account with us online. You will never have to visit any of our branches.</p>
            </div>
          </div>
        </div>

        <div className="section-gap px-4 text-white py-1 font-bold">
          <OurService />
        </div>

        <div className="section-gap px-4 text-white py-1 font-bold">
          <AccountOpenningSteps />
        </div>

        <div className="section-gap px-4 text-white bg-white font-bold">
          <Platform />
        </div>

        <div className="section-gap px-4 my-16 text-white bg-white font-bold h-36">
            <Regulators />
        </div>  
        
        <div className="section-gap px-4 text-white bg-white font-bold">
          <ShiftToUs />
        </div>

        <div className="section-gap px-4 bg-white py-1 font-bold">
          <Footer />
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
