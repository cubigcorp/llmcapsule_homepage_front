import HeroSection from '@/components/sections/HeroSection';
import PerformanceSection from '@/components/sections/PerformanceSection';
import SolutionSection from '@/components/sections/SolutionSection';
import ProcessSection from '@/components/sections/ProcessSection';
import PricingSection from '@/components/sections/PricingSection';
import PartnersSection from '@/components/sections/PartnersSection';
import FAQSection from '@/components/sections/FAQSection';
import ContactSection from '@/components/sections/ContactSection';
import DemoSection from '@/components/sections/DemoSection';
import Footer from '@/components/layout/Footer';
export default function Home() {
  return (
    <main style={{ width: 'fit-content', margin: '0 auto' }}>
      <HeroSection />
      <PerformanceSection />
      <SolutionSection />
      <ProcessSection />
      <DemoSection />
      <PartnersSection />
      <PricingSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
