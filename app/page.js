'use client'
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
export default function Home() {
  const { isModalOpen, closeModal, openModal } = useModalClose()
  return (
    <>
      <div className={`h-screen ${isModalOpen ? 'overflow-hidden' : ''}`}>
        <Navigation />
        <TimeDate />
        <div>
          <FirstNavBar />
        </div>
        <div>
          <SubNav />
        </div>
        <div className="mt-8 m-auto">
          <HeroSection />
        </div>
        <div className="mt-8 px-4 bg-black text-white py-1 font-bold">
          {/* <TextScrollingHorizontally /> */}
          <div class="overflow-x-auto whitespace-nowrap bg-gray-100 text-gray-800 text-sm p-2">
            <marquee behavior="scroll" direction="left" scrollamount="4">
              📈 DSE Index gains 45 points amid strong investor confidence — 🏦 Midway Securities announces new trading app 'QuickTrade Pro' — 📰 Latest IPO of ABC Textiles oversubscribed by 3.2x — 💼 Market closes higher led by banking and pharma sectors — 📊 Foreign investors show renewed interest in blue-chip stocks — 📢 AGM of XYZ Cement scheduled for July 10th, 2025 — 📉 DSE turnover crosses BDT 950 crore mark — Stay updated with Midway Securities for all market insights.
            </marquee>
          </div>
        </div>
        <div>
          <Card title={`Card Title`} cardDesc={`Card Description`}>
            <Image src={hero_image1} alt="Card Image" width={200} height={200} className="rounded-lg" />
          </Card>

          <Card title={`Card Title`} cardDesc={`Card Description`}>
            <Image src={hero_image2} alt="Card Image" width={200} height={200} className="rounded-lg" />
          </Card>
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

        <div className="section-gap px-4 bg-white py-1 font-bold">
          <PaymentMethod />
        </div>

        <div className="section-gap px-4 bg-white py-1 font-bold">
          <Footer />
        </div>
      </div>


      {/* <div className="hidden md:flex md:flex-col md:items-center md:justify-center h-screen font-bold text-2xl">
        <h1>Please use your mobile to see the mobile view.</h1>
      </div> */}
    </>
  );
}
