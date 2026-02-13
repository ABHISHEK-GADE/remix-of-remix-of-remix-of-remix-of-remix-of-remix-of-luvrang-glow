import HeroSlider from '@/components/HeroSlider';
import CollectionsSlider from '@/components/CollectionsSlider';
import FeaturedProducts from '@/components/FeaturedProducts';
import BundleHighlights from '@/components/BundleHighlights';
import ProductsGrid from '@/components/ProductsGrid';
import HowItWorks from '@/components/HowItWorks';
import VideoGuide from '@/components/VideoGuide';
import WhyLuvRang from '@/components/WhyLuvRang';
import OffersSection from '@/components/OffersSection';
import CODBanner from '@/components/CODBanner';
import SEO from '@/components/SEO';

const Index = () => {
  return (
    <>
      <SEO
        title="Premium Handmade Reusable Rangoli"
        description="Shop LuvRang's premium handmade, reusable rangoli decor. Festive, wedding & everyday designs. Free shipping. COD available. PAN India delivery."
      />
      <HeroSlider />
      <CollectionsSlider />
      <FeaturedProducts />
      <BundleHighlights />
      <ProductsGrid
        title="You May Also Like"
        subtitle="Curated picks based on popular interest"
        count={16}
      />
      <HowItWorks />
      <VideoGuide />
      <WhyLuvRang />
      <OffersSection />
      <CODBanner />
    </>
  );
};

export default Index;
