import HeroCarousol from "./hero-carousel";

const HeroSection = () => {
    return (
        <section className="hero-section">
            <div className="hero-content w-[80%] sm:w-[60%] md:w-[40%] lg:w-[35%] mx-auto">
                <HeroCarousol />
            </div>
        </section>
    );
}
export default HeroSection;