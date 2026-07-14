import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategorySection from '@/components/CategorySection';
import BestSellersSection from '@/components/BestSellersSection';
import FeaturesSection from '@/components/FeaturesSection';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <CategorySection />
      <BestSellersSection />
      <FeaturesSection />
    </>
  );
}
