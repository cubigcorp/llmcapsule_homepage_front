import HeroSection from '@/components/sections/HeroSection';
import PerformanceSection from '@/components/sections/PerformanceSection';
import SolutionSection from '@/components/sections/SolutionSection';
import ProcessSection from '@/components/sections/ProcessSection';
// import PricingSection from '@/components/sections/PricingSection';
import PartnersSection from '@/components/sections/PartnersSection';
import AboutSection from '@/components/sections/AboutSection';
import FAQSection from '@/components/sections/FAQSection';
import ContactSection from '@/components/sections/ContactSection';
import DemoSection from '@/components/sections/DemoSection';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/common/ScrollToTop';
export default function Home() {
  return (
    <main>
      <HeroSection />
      <PartnersSection />
      <AboutSection />
      <DemoSection />
      <PerformanceSection />
      <SolutionSection />
      <ProcessSection />

      {/* <PricingSection /> */}
      <FAQSection />
      <ContactSection />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
