import { useParams } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import type { ShopifyProduct } from '@/api/shopify';

// Mock data for when Shopify isn't connected
const mockCollectionData: Record<string, { title: string; description: string; products: ShopifyProduct[] }> = {
  festive: {
    title: 'Festive Collection',
    description: 'Premium handmade rangoli for Diwali, Navratri, and every festive occasion.',
    products: [
      {
        id: '1', handle: 'royal-blue-mandala', title: 'Royal Blue Mandala', description: '', descriptionHtml: '',
        tags: [], productType: 'Rangoli', images: { edges: [] },
        variants: { edges: [{ node: { id: 'v1', title: 'Default Title', availableForSale: true, price: { amount: '1299', currencyCode: 'INR' }, compareAtPrice: null, selectedOptions: [], image: null } }] },
        priceRange: { minVariantPrice: { amount: '1299', currencyCode: 'INR' }, maxVariantPrice: { amount: '1299', currencyCode: 'INR' } },
        compareAtPriceRange: { minVariantPrice: { amount: '0', currencyCode: 'INR' }, maxVariantPrice: { amount: '0', currencyCode: 'INR' } },
      },
      {
        id: '4', handle: 'diwali-special', title: 'Diwali Special Rangoli', description: '', descriptionHtml: '',
        tags: [], productType: 'Rangoli', images: { edges: [] },
        variants: { edges: [{ node: { id: 'v4', title: 'Default Title', availableForSale: true, price: { amount: '999', currencyCode: 'INR' }, compareAtPrice: { amount: '1499', currencyCode: 'INR' }, selectedOptions: [], image: null } }] },
        priceRange: { minVariantPrice: { amount: '999', currencyCode: 'INR' }, maxVariantPrice: { amount: '999', currencyCode: 'INR' } },
        compareAtPriceRange: { minVariantPrice: { amount: '1499', currencyCode: 'INR' }, maxVariantPrice: { amount: '1499', currencyCode: 'INR' } },
      },
    ],
  },
  wedding: {
    title: 'Wedding Collection',
    description: 'Elegant rangoli pieces for the most special day of your life.',
    products: [
      {
        id: '3', handle: 'wedding-elegance', title: 'Wedding Elegance', description: '', descriptionHtml: '',
        tags: [], productType: 'Rangoli', images: { edges: [] },
        variants: { edges: [{ node: { id: 'v3', title: 'Default Title', availableForSale: true, price: { amount: '2599', currencyCode: 'INR' }, compareAtPrice: null, selectedOptions: [], image: null } }] },
        priceRange: { minVariantPrice: { amount: '2599', currencyCode: 'INR' }, maxVariantPrice: { amount: '2599', currencyCode: 'INR' } },
        compareAtPriceRange: { minVariantPrice: { amount: '0', currencyCode: 'INR' }, maxVariantPrice: { amount: '0', currencyCode: 'INR' } },
      },
    ],
  },
  everyday: {
    title: 'Everyday Decor',
    description: 'Beautiful rangoli for everyday home decoration.',
    products: [
      {
        id: '2', handle: 'golden-lotus', title: 'Golden Lotus Set', description: '', descriptionHtml: '',
        tags: [], productType: 'Rangoli', images: { edges: [] },
        variants: { edges: [{ node: { id: 'v2', title: 'Default Title', availableForSale: true, price: { amount: '1899', currencyCode: 'INR' }, compareAtPrice: { amount: '2499', currencyCode: 'INR' }, selectedOptions: [], image: null } }] },
        priceRange: { minVariantPrice: { amount: '1899', currencyCode: 'INR' }, maxVariantPrice: { amount: '1899', currencyCode: 'INR' } },
        compareAtPriceRange: { minVariantPrice: { amount: '2499', currencyCode: 'INR' }, maxVariantPrice: { amount: '2499', currencyCode: 'INR' } },
      },
    ],
  },
};

export default function Collection() {
  const { handle } = useParams<{ handle: string }>();
  const collection = mockCollectionData[handle || ''] || mockCollectionData.festive;

  return (
    <div className="container-luxury py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">{collection.title}</h1>
        <p className="font-body text-muted-foreground mt-3 max-w-lg mx-auto">{collection.description}</p>
      </div>

      {collection.products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {collection.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center font-body text-muted-foreground py-16">
          No products found. Connect your Shopify store to load products.
        </p>
      )}
    </div>
  );
}
