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
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
          <p className="font-body text-muted-foreground mt-2 text-sm">{subtitle}</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: Math.min(count, 8) }).map((_, i) => (
              <div key={i} className="aspect-square rounded-lg bg-secondary animate-pulse" />
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.slice(0, count).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center font-body text-muted-foreground py-8">No products available yet.</p>
        )}
      </div>
    </section>
  );
}
