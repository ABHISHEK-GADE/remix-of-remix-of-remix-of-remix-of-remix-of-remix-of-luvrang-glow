import HeroSection from '@/components/HeroSection';
import CollectionsGrid from '@/components/CollectionsGrid';
import FeaturedProducts from '@/components/FeaturedProducts';
import BundleHighlights from '@/components/BundleHighlights';
import HowItWorks from '@/components/HowItWorks';
import WhyLuvRang from '@/components/WhyLuvRang';
import CODBanner from '@/components/CODBanner';

const Index = () => {
  return (
    <>
      <HeroSection />
      <CollectionsGrid />
      <FeaturedProducts />
      <BundleHighlights />
      <HowItWorks />
      <WhyLuvRang />
      <CODBanner />
    </>
  );
};

export default Index;
