import HeroSection from '@/components/sections/HeroSection';
import PerformanceSection from '@/components/sections/PerformanceSection';
import SolutionSection from '@/components/sections/SolutionSection';
import ProcessSection from '@/components/sections/ProcessSection';
import PricingSection from '@/components/sections/PricingSection';
import PartnersSection from '@/components/sections/PartnersSection';
import FAQSection from '@/components/sections/FAQSection';
import ContactSection from '@/components/sections/ContactSection';
export default function Home() {
  return (
    <main>
      <HeroSection />
      <PerformanceSection />
      <SolutionSection />
      <ProcessSection />
      <PartnersSection />
      <PricingSection />
      <FAQSection />
      <ContactSection />
    </main>
  );
}
