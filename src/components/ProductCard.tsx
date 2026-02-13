import { Link } from 'react-router-dom';
import type { ShopifyProduct } from '@/api/shopify';

interface ProductCardProps {
  product: ShopifyProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const image = product.images.edges[0]?.node;
  const price = product.priceRange.minVariantPrice;
  const compareAt = product.compareAtPriceRange?.minVariantPrice;
  const hasDiscount = compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount);
  const savings = hasDiscount
    ? Math.round(((parseFloat(compareAt.amount) - parseFloat(price.amount)) / parseFloat(compareAt.amount)) * 100)
    : 0;

  return (
    <Link to={`/product/${product.handle}`} className="group block">
      <div className="relative overflow-hidden rounded-lg bg-secondary aspect-square mb-4">
        {image ? (
          <img
            src={image.url}
            alt={image.altText || product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground font-body text-sm">
            No image
          </div>
        )}

        {/* Made to Order Badge */}
        <span className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm text-foreground text-[10px] tracking-widest uppercase font-body font-medium px-3 py-1.5 rounded-sm">
          Made to Order
        </span>

        {/* Savings Badge */}
        {hasDiscount && savings > 0 && (
          <span className="absolute top-3 right-3 bg-accent text-accent-foreground text-[10px] tracking-wide uppercase font-body font-bold px-2.5 py-1.5 rounded-sm">
            Save {savings}%
          </span>
        )}
      </div>

      <h3 className="font-display text-base font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
        {product.title}
      </h3>

      <div className="flex items-center gap-2 font-body text-sm">
        <span className="text-foreground font-medium">
          ₹{parseFloat(price.amount).toLocaleString('en-IN')}
        </span>
        {hasDiscount && (
          <span className="text-muted-foreground line-through text-xs">
            ₹{parseFloat(compareAt.amount).toLocaleString('en-IN')}
          </span>
        )}
      </div>
    </Link>
  );
}
