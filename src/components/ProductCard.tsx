import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import type { ShopifyProduct } from '@/api/shopify';
import { formatPrice } from '@/api/shopify';
import { useWishlistStore } from '@/stores/wishlistStore';

interface ProductCardProps {
  product: ShopifyProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const p = product.node;
  const image = p.images.edges[0]?.node;
  const price = p.priceRange.minVariantPrice;
  const compareAt = p.compareAtPriceRange?.minVariantPrice;
  const hasDiscount = compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount);
  const savings = hasDiscount
    ? Math.round(((parseFloat(compareAt.amount) - parseFloat(price.amount)) / parseFloat(compareAt.amount)) * 100)
    : 0;

  const { toggleItem, isInWishlist } = useWishlistStore();
  const wishlisted = isInWishlist(p.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
  };

  return (
    <Link to={`/product/${p.handle}`} className="group block">
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

        <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-background/95 backdrop-blur-sm text-foreground text-[9px] sm:text-[10px] tracking-widest uppercase font-body font-medium px-2 py-1 sm:px-3 sm:py-1.5 rounded-md shadow-sm">
          Made to Order
        </span>

        {hasDiscount && savings > 0 && (
          <span className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-accent text-accent-foreground text-[8px] sm:text-[10px] tracking-wide uppercase font-body font-bold px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-md">
            Save {savings}%
          </span>
        )}

        <button
          onClick={handleWishlistClick}
          className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-background transition-colors"
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={16}
            className={wishlisted ? 'fill-destructive text-destructive' : 'text-muted-foreground'}
          />
        </button>
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
  );
}
