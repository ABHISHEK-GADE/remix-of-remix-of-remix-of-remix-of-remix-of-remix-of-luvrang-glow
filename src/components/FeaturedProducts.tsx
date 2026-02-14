import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/api/shopify';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

export default function FeaturedProducts() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => getProducts(8),
  });

  return (
    <section className="section-spacing bg-background">
      <div className="container-luxury">
        <div className="text-center mb-14">
          <p className="font-body text-xs tracking-widest uppercase text-primary font-semibold mb-2">Bestsellers</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Featured <span className="text-gradient-gold">Products</span>
          </h2>
          <p className="font-body text-muted-foreground mt-3 text-sm">Our most loved handmade pieces</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-square rounded-xl bg-secondary animate-pulse" />
                <div className="h-4 bg-secondary rounded animate-pulse w-3/4" />
                <div className="h-3 bg-secondary rounded animate-pulse w-1/2" />
              </div>
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {products.map((product, i) => (
              <div key={product.node.id} className="animate-fade-up" style={{ animationDelay: `${(i % 4) * 0.08}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center font-body text-muted-foreground py-8">No products available yet.</p>
        )}

        {products && products.length > 0 && (
          <div className="text-center mt-10 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Link
              to="/collections/festive"
              className="inline-block border border-primary text-primary font-body text-sm font-medium px-8 py-3 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              View All Products
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
