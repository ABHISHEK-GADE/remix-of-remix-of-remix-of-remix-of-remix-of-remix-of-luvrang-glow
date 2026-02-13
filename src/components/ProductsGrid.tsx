import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/api/shopify';
import ProductCard from './ProductCard';

interface ProductsGridProps {
  title: string;
  subtitle: string;
  count?: number;
}

export default function ProductsGrid({ title, subtitle, count = 8 }: ProductsGridProps) {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products', count],
    queryFn: () => getProducts(count),
  });

  return (
    <section className="section-spacing bg-background">
      <div className="container-luxury">
        <div className="text-center mb-14">
          <p className="font-body text-xs tracking-widest uppercase text-primary font-semibold mb-2">Explore</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
          <p className="font-body text-muted-foreground mt-3 text-sm">{subtitle}</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: Math.min(count, 8) }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-square rounded-xl bg-secondary animate-pulse" />
                <div className="h-4 bg-secondary rounded animate-pulse w-3/4" />
                <div className="h-3 bg-secondary rounded animate-pulse w-1/2" />
              </div>
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.slice(0, count).map((product, i) => (
              <div key={product.node.id} className="animate-fade-up" style={{ animationDelay: `${(i % 4) * 0.08}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center font-body text-muted-foreground py-8">No products available yet.</p>
        )}
      </div>
    </section>
  );
}
