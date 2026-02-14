import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/api/shopify';
import ProductCard from '@/components/ProductCard';
import PageHeader from '@/components/PageHeader';
import SEO from '@/components/SEO';

export default function Shop() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products', 50],
    queryFn: () => getProducts(50),
  });

  return (
    <>
      <SEO title="Shop All Products" description="Browse our full collection of premium handmade reusable rangoli designs at LuvRang." />
      <div className="container-luxury py-8 md:py-16">
        <PageHeader
          title="Shop All Products"
          subtitle="Explore our entire range of handcrafted rangoli designs, made with love for every occasion."
          breadcrumb={[{ label: 'Shop' }]}
        />

        {!isLoading && products && (
          <p className="font-body text-xs text-muted-foreground -mt-8 mb-10">
            {products.length} {products.length === 1 ? 'product' : 'products'}
          </p>
        )}

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-[4/5] rounded-xl bg-secondary animate-pulse" />
                <div className="h-4 bg-secondary rounded animate-pulse w-3/4" />
                <div className="h-3 bg-secondary rounded animate-pulse w-1/2" />
              </div>
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {products.map((product, i) => (
              <div key={product.node.id} className="animate-fade-up" style={{ animationDelay: `${(i % 4) * 0.08}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center font-body text-muted-foreground py-8">No products available yet.</p>
        )}
      </div>
    </>
  );
}
