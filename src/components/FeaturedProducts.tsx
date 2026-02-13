import type { ShopifyProduct } from '@/api/shopify';
import ProductCard from './ProductCard';

// Mock products for display when Shopify isn't connected
const mockProducts: ShopifyProduct[] = [
  {
    id: '1', handle: 'royal-blue-mandala', title: 'Royal Blue Mandala Rangoli', description: '', descriptionHtml: '',
    tags: [], productType: 'Rangoli',
    images: { edges: [] },
    variants: { edges: [{ node: { id: 'v1', title: 'Default Title', availableForSale: true, price: { amount: '1299', currencyCode: 'INR' }, compareAtPrice: null, selectedOptions: [], image: null } }] },
    priceRange: { minVariantPrice: { amount: '1299', currencyCode: 'INR' }, maxVariantPrice: { amount: '1299', currencyCode: 'INR' } },
    compareAtPriceRange: { minVariantPrice: { amount: '0', currencyCode: 'INR' }, maxVariantPrice: { amount: '0', currencyCode: 'INR' } },
  },
  {
    id: '2', handle: 'golden-lotus', title: 'Golden Lotus Festive Set', description: '', descriptionHtml: '',
    tags: [], productType: 'Rangoli',
    images: { edges: [] },
    variants: { edges: [{ node: { id: 'v2', title: 'Default Title', availableForSale: true, price: { amount: '1899', currencyCode: 'INR' }, compareAtPrice: { amount: '2499', currencyCode: 'INR' }, selectedOptions: [], image: null } }] },
    priceRange: { minVariantPrice: { amount: '1899', currencyCode: 'INR' }, maxVariantPrice: { amount: '1899', currencyCode: 'INR' } },
    compareAtPriceRange: { minVariantPrice: { amount: '2499', currencyCode: 'INR' }, maxVariantPrice: { amount: '2499', currencyCode: 'INR' } },
  },
  {
    id: '3', handle: 'wedding-elegance', title: 'Wedding Elegance Collection', description: '', descriptionHtml: '',
    tags: [], productType: 'Rangoli',
    images: { edges: [] },
    variants: { edges: [{ node: { id: 'v3', title: 'Default Title', availableForSale: true, price: { amount: '2599', currencyCode: 'INR' }, compareAtPrice: null, selectedOptions: [], image: null } }] },
    priceRange: { minVariantPrice: { amount: '2599', currencyCode: 'INR' }, maxVariantPrice: { amount: '2599', currencyCode: 'INR' } },
    compareAtPriceRange: { minVariantPrice: { amount: '0', currencyCode: 'INR' }, maxVariantPrice: { amount: '0', currencyCode: 'INR' } },
  },
  {
    id: '4', handle: 'diwali-special', title: 'Diwali Special Rangoli', description: '', descriptionHtml: '',
    tags: [], productType: 'Rangoli',
    images: { edges: [] },
    variants: { edges: [{ node: { id: 'v4', title: 'Default Title', availableForSale: true, price: { amount: '999', currencyCode: 'INR' }, compareAtPrice: { amount: '1499', currencyCode: 'INR' }, selectedOptions: [], image: null } }] },
    priceRange: { minVariantPrice: { amount: '999', currencyCode: 'INR' }, maxVariantPrice: { amount: '999', currencyCode: 'INR' } },
    compareAtPriceRange: { minVariantPrice: { amount: '1499', currencyCode: 'INR' }, maxVariantPrice: { amount: '1499', currencyCode: 'INR' } },
  },
];

export default function FeaturedProducts() {
  return (
    <section className="section-spacing bg-background">
      <div className="container-luxury">
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Featured Products</h2>
          <p className="font-body text-muted-foreground mt-2 text-sm">Our most loved handmade pieces</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
