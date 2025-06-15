import Image from "next/image";
import TimeDate from "./components/Home/time-date";
import FirstNavBar from "./components/Home/first-nav-bar";
import HeroSection from "./components/Home/hero-section";
import SubNav from "./components/Home/sub-nav";
import TextScrollingHorizontally from "./components/Home/text-scrolling-horizontally";
import Card from "./components/Home/card";
// import cardImage from '/images/home/hero-carousel/h1.png'
export default function Home() {
  return (
    <>
      <div className="md:hidden">
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
          <Card title={`Card Title`} cardDesc={`Card Description`}>
            <Image src={`../public/images/home/hero-carousel/h1.png`} alt="Card Image" width={200} height={200} className="rounded-lg" />
          </Card>
          <Card title={`Card Title`} cardDesc={`Card Description`}>
            <Image src={`../public/images/home/hero-carousel/h2.png`} alt="Card Image" width={200} height={200} className="rounded-lg" />
          </Card>
          <Card title={`Card Title`} cardDesc={`Card Description`}>
            <Image src={`../public/images/home/hero-carousel/h3.png`} alt="Card Image" width={200} height={200} className="rounded-lg" />
          </Card>
          <Card title={`Card Title`} cardDesc={`Card Description`}>
            <Image src={`../public/images/home/hero-carousel/h4.png`} alt="Card Image" width={200} height={200} className="rounded-lg" />
          </Card>
        </div>
      </div>


      <div className="hidden md:flex md:flex-col md:items-center md:justify-center h-screen font-bold text-2xl">
        <h1>Use user mobile to see the mobile view.</h1>
      </div>
    </>
  );
}
