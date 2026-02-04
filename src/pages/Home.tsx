import { HeroCarousel } from '../components/home/HeroCarousel';
import { BrandsSection } from '../components/home/BrandsSection';
import { BranchesSection } from '../components/home/BranchesSection';
import { CTASection } from '../components/home/CTASection';

export function Home() {
  return (
    <>
      <HeroCarousel />
      <BrandsSection />
      <BranchesSection />
      <CTASection />
    </>
  );
}
