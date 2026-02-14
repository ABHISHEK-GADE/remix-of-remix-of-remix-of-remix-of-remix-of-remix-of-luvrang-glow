import { Heart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useWishlistStore } from '@/stores/wishlistStore';
import { formatPrice } from '@/api/shopify';

export default function Wishlist() {
  const { items, removeItem } = useWishlistStore();

  return (
    <>
      <SEO title="My Wishlist" description="Save your favorite LuvRang rangoli designs and shop them when you are ready." />
      <div className="container-luxury section-spacing">
        <div className="text-center animate-fade-up mb-8 sm:mb-12">
          <h1 className="font-display text-3xl font-bold mb-3">My Wishlist</h1>
          <p className="text-muted-foreground font-body max-w-md mx-auto">
            {items.length > 0
              ? `You have ${items.length} item${items.length > 1 ? 's' : ''} saved.`
              : 'Save your favorite rangoli designs here. Browse our collections and tap the heart icon to add items you love.'}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
              <Heart size={32} className="text-destructive" />
            </div>
            <Link
              to="/shop"
              className="inline-block bg-primary text-primary-foreground font-body text-sm font-medium px-8 py-3.5 rounded-md hover:bg-primary/90 transition-colors"
            >
              Browse Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            {items.map((product) => {
              const p = product.node;
              const image = p.images.edges[0]?.node;
              const price = p.priceRange.minVariantPrice;
              const compareAt = p.compareAtPriceRange?.minVariantPrice;
              const hasDiscount = compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount);

              return (
                <div key={p.id} className="group relative">
                  <Link to={`/product/${p.handle}`} className="block">
                    <div className="relative overflow-hidden rounded-lg sm:rounded-xl bg-secondary aspect-[4/5] mb-2 sm:mb-4">
                      {image ? (
                        <img
                          src={image.url}
                          alt={image.altText || p.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground font-body text-sm">
                          No image
                        </div>
                      )}
                    </div>

                    <h3 className="font-display text-sm sm:text-base font-medium text-foreground mb-0.5 sm:mb-1 group-hover:text-primary transition-colors line-clamp-1">
                      {p.title}
                    </h3>

                    <div className="flex items-center gap-1.5 sm:gap-2 font-body text-xs sm:text-sm">
                      <span className="text-foreground font-medium">
                        {formatPrice(price.amount, price.currencyCode)}
                      </span>
                      {hasDiscount && (
                        <span className="text-muted-foreground line-through text-xs">
                          {formatPrice(compareAt.amount, compareAt.currencyCode)}
                        </span>
                      )}
                    </div>
                  </Link>

                  <button
                    onClick={() => removeItem(p.id)}
                    className="absolute top-2 right-2 sm:top-3 sm:right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-destructive/10 transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 size={14} className="text-muted-foreground hover:text-destructive" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
