import Image from "next/image";
import TimeDate from "./components/Home/time-date";
import FirstNavBar from "./components/Home/first-nav-bar";
import HeroSection from "./components/Home/hero-section";
import SubNav from "./components/Home/sub-nav";

export default function Home() {
  return (
    <div>
      <TimeDate />
      <FirstNavBar />
      <SubNav />
      <HeroSection />
    </div>
  );
}
