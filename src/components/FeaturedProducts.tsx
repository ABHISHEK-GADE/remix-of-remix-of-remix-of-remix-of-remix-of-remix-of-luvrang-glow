import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/api/shopify';
import ProductCard from './ProductCard';

export default function FeaturedProducts() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => getProducts(8),
  });

  return (
    <section className="section-spacing bg-background">
      <div className="container-luxury">
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Featured Products</h2>
          <p className="font-body text-muted-foreground mt-2 text-sm">Our most loved handmade pieces</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-lg bg-secondary animate-pulse" />
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center font-body text-muted-foreground py-8">No products available yet.</p>
        )}
      </div>
    </section>
  );
}
