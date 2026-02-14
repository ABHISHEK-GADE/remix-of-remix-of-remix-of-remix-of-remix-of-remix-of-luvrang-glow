import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/api/shopify';
import { Link } from 'react-router-dom';
import { formatPrice } from '@/api/shopify';
import { Package } from 'lucide-react';

export default function BundleHighlights() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products', 'bundles'],
    queryFn: () => getProducts(6, 'tag:bundle'),
  });

  const bundles = products ?? [];

  return (
    <section className="section-spacing bg-secondary/30">
      <div className="container-luxury">
        <div className="text-center mb-14">
          <p className="font-body text-xs tracking-widest uppercase text-primary font-semibold mb-2">Special Deals</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Bundle & <span className="text-gradient-gold">Save</span>
          </h2>
          <p className="font-body text-muted-foreground mt-3 text-sm">Get more for less with our curated bundles</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-48 rounded-xl bg-secondary animate-pulse" />
            ))}
          </div>
        ) : bundles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            {bundles.map((b, i) => {
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
                  className="bg-background rounded-xl p-6 border border-border/50 hover-lift text-center animate-fade-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
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
          <div className="text-center py-12 rounded-2xl bg-background border border-border/50 animate-fade-up">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Package size={28} className="text-primary" />
            </div>
            <p className="font-display text-lg font-semibold text-foreground mb-1">Bundles Coming Soon</p>
            <p className="font-body text-sm text-muted-foreground">We are curating exciting bundle deals for you</p>
          </div>
        )}
      </div>
    </section>
  );
}
