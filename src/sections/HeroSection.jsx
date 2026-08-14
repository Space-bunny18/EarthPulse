import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Globe from "../components/Globe/Globe";
import Background from "../components/Background/Background";

function HeroSection() {
  return (
    <section className="hero-section">
      <Background />
      <Navbar />

      <div className="container hero-layout">
        <Hero />
        <Globe />
      </div>
    </section>
  );
}

export default HeroSection;