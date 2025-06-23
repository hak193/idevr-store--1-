
import { HeroSection } from '@/components/sections/hero-section';
import { FeaturesSection } from '@/components/sections/features-section';
import { ProductsShowcase } from '@/components/sections/products-showcase';
import { ServicesShowcase } from '@/components/sections/services-showcase';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { CTASection } from '@/components/sections/cta-section';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <ProductsShowcase />
      <ServicesShowcase />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
