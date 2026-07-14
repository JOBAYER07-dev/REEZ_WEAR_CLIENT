import Hero from '@/components/Hero';
import CategorySection from '@/components/CategorySection';
import BestSellersSection from '@/components/BestSellersSection';
import FeaturesSection from '@/components/FeaturesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import NewsletterSection from '@/components/NewsletterSection';
import FaqSection from '@/components/FaqSection';

export default function Home() {
  return (
    <>
      <Hero />
      <CategorySection />
      <BestSellersSection />
      <FeaturesSection />
      <TestimonialsSection />
      <NewsletterSection />
      <FaqSection/>
    </>
  );
}
