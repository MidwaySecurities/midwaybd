import Image from "next/image";
import TimeDate from "./components/Home/time-date";
import FirstNavBar from "./components/Home/first-nav-bar";
import HeroSection from "./components/Home/hero-section";
import SubNav from "./components/Home/sub-nav";
import TextScrollingHorizontally from "./components/Home/text-scrolling-horizontally";
import Card from "./components/Home/card";
import cardImage from '../public/images/home/hero-carousel/h1.png'
export default function Home() {
  return (
    <div>
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
        <TextScrollingHorizontally />
      </div>
      <div>
        <Card title={`Card Title`} cardImageSrc={cardImage} cardDesc={`Card Description`} />
        <Card title={`Card Title`} cardImageSrc={cardImage} cardDesc={`Card Description`} />
        <Card title={`Card Title`} cardImageSrc={cardImage} cardDesc={`Card Description`} />
      </div>
    </div>
  );
}
