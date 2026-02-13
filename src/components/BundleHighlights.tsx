import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/api/shopify';
import { Link } from 'react-router-dom';
import { formatPrice } from '@/api/shopify';

export default function BundleHighlights() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products', 'bundles'],
    queryFn: () => getProducts(6, 'tag:bundle'),
  });

  // If no bundle-tagged products, show section with message
  const bundles = products ?? [];

  return (
    <section className="section-spacing bg-secondary/30">
      <div className="container-luxury">
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Bundle & Save</h2>
          <p className="font-body text-muted-foreground mt-2 text-sm">Get more for less with our curated bundles</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-48 rounded-lg bg-secondary animate-pulse" />
            ))}
          </div>
        ) : bundles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bundles.map((b) => {
              const p = b.node;
              const price = p.priceRange.minVariantPrice;
              const compareAt = p.compareAtPriceRange?.minVariantPrice;
              const hasDiscount = compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount);
              const savings = hasDiscount
                ? Math.round(((parseFloat(compareAt.amount) - parseFloat(price.amount)) / parseFloat(compareAt.amount)) * 100)
                : 0;

              return (
                <Link
                  key={p.id}
                  to={`/product/${p.handle}`}
                  className="bg-background rounded-lg p-6 shadow-soft hover-lift text-center"
                >
                  {hasDiscount && savings > 0 && (
                    <span className="inline-block bg-accent text-accent-foreground text-[10px] font-body font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-4">
                      Save {savings}%
                    </span>
                  )}
                  <h3 className="font-display text-lg font-semibold text-foreground">{p.title}</h3>
                  <p className="font-body text-muted-foreground text-sm mt-1 line-clamp-2">{p.description}</p>
                  <div className="mt-4 flex items-center justify-center gap-2 font-body">
                    <span className="text-foreground font-semibold text-lg">{formatPrice(price.amount, price.currencyCode)}</span>
                    {hasDiscount && (
                      <span className="text-muted-foreground line-through text-sm">{formatPrice(compareAt.amount, compareAt.currencyCode)}</span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-center font-body text-muted-foreground py-8">No bundles available yet.</p>
        )}
      </div>
    </section>
  );
}
