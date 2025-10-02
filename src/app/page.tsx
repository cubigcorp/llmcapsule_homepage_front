import HeroSection from '@/components/sections/HeroSection';
import PerformanceSection from '@/components/sections/PerformanceSection';
import CTASection from '@/components/sections/CTASection';
import PricingSection from '@/components/sections/PricingSection';
import PartnersSection from '@/components/sections/PartnersSection';
import AboutSection from '@/components/sections/AboutSection';
import FAQSection from '@/components/sections/FAQSection';
import ContactSection from '@/components/sections/ContactSection';
import DemoSection from '@/components/sections/DemoSection';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/common/ScrollToTop';
export default function Home() {
  return (
    <main style={{ overflowX: 'hidden' }}>
      <HeroSection />
      <PartnersSection />
      <AboutSection />
      <DemoSection />
      <PerformanceSection />
      <CTASection />
      <PricingSection />

      <FAQSection />
      <ContactSection />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
