import HeroSection from '@/components/sections/HeroSection';
import PerformanceSection from '@/components/sections/PerformanceSection';
import SolutionSection from '@/components/sections/SolutionSection';
import ProcessSection from '@/components/sections/ProcessSection';
import PricingSection from '@/components/sections/PricingSection';
export default function Home() {
  return (
    <main>
      <HeroSection />
      <PerformanceSection />
      <SolutionSection />
      <ProcessSection />
      <PricingSection />
    </main>
  );
}
