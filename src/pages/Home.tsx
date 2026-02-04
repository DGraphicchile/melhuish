import { HeroCarousel } from '../components/home/HeroCarousel';
import { IntroSection } from '../components/home/IntroSection';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { ImageStrip } from '../components/home/ImageStrip';
import { BrandsSection } from '../components/home/BrandsSection';
import { FeatureBar } from '../components/home/FeatureBar';
import { SalesRoomSection } from '../components/home/SalesRoomSection';
import { FinalCTAStrip } from '../components/home/FinalCTAStrip';

export function Home() {
  return (
    <>
      <HeroCarousel />
      <section className="reveal-section bg-white">
        <IntroSection />
      </section>
      <section className="reveal-section">
        <WhyChooseUs />
      </section>
      <section className="reveal-section">
        <ImageStrip />
      </section>
      <section className="reveal-section">
        <BrandsSection />
      </section>
      <section className="reveal-section">
        <FeatureBar />
      </section>
      <section className="reveal-section home-final-section">
        <SalesRoomSection />
      </section>
      <FinalCTAStrip />
    </>
  );
}
