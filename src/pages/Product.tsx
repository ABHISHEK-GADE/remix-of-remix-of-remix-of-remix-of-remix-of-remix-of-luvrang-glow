import { useParams, Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useCartStore } from '@/stores/cartStore';
import {
  Minus, Plus, ChevronDown, ChevronRight, Share2,
  Truck, RotateCcw, Shield, Heart, Package, Star,
} from 'lucide-react';
import { getProductByHandle, getProducts, formatPrice } from '@/api/shopify';
import type { ShopifyProduct } from '@/api/shopify';
import { toast } from 'sonner';
import SEO from '@/components/SEO';
import ProductCard from '@/components/ProductCard';

function AccordionItem({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon?: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 font-body text-sm font-medium text-foreground group"
      >
        <span className="flex items-center gap-2.5">
          {Icon && <Icon size={16} className="text-primary" />}
          {title}
        </span>
        <ChevronDown
          size={16}
          className={`text-muted-foreground transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="pb-4 font-body text-sm text-muted-foreground leading-relaxed animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
}

export default function Product() {
  const { handle } = useParams<{ handle: string }>();
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  const { data: product, isLoading: productLoading } = useQuery({
    queryKey: ['product', handle],
    queryFn: () => getProductByHandle(handle!),
    enabled: !!handle,
  });

  const { data: allProducts } = useQuery({
    queryKey: ['products', 12],
    queryFn: () => getProducts(12),
  });

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Related products — exclude current
  const relatedProducts = useMemo(() => {
    if (!allProducts || !product) return [];
    return allProducts.filter((p) => p.node.handle !== product.handle).slice(0, 4);
  }, [allProducts, product]);

  if (productLoading) {
    return (
      <div className="container-luxury py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="space-y-4">
            <div className="aspect-[4/5] rounded-xl bg-secondary animate-pulse" />
            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-lg bg-secondary animate-pulse" />
              ))}
            </div>
          </div>
          <div className="space-y-5">
            <div className="h-5 bg-secondary rounded animate-pulse w-1/3" />
            <div className="h-8 bg-secondary rounded animate-pulse w-3/4" />
            <div className="h-7 bg-secondary rounded animate-pulse w-1/4" />
            <div className="h-24 bg-secondary rounded animate-pulse" />
            <div className="h-14 bg-secondary rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-luxury py-16 text-center">
        <h1 className="font-display text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="font-body text-muted-foreground mb-6">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/shop"
          className="inline-block bg-primary text-primary-foreground font-body text-sm font-medium px-8 py-3.5 rounded-md hover:bg-primary/90 transition-colors"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const variants = product.variants.edges.map((e: { node: any }) => e.node);
  const selectedVariant = variants[selectedVariantIndex] || variants[0];
  const images = product.images.edges;
  const mainImage = images[selectedImageIndex]?.node || selectedVariant.image || images[0]?.node;

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success(`${product.title} added to cart!`, { position: 'top-center' });
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: product.title, url });
    } else {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    }
  };

  const hasDiscount =
    selectedVariant.compareAtPrice &&
    parseFloat(selectedVariant.compareAtPrice.amount) > parseFloat(selectedVariant.price.amount);
  const savingsPercent = hasDiscount
    ? Math.round(
        ((parseFloat(selectedVariant.compareAtPrice.amount) - parseFloat(selectedVariant.price.amount)) /
          parseFloat(selectedVariant.compareAtPrice.amount)) *
          100,
      )
    : 0;

  return (
    <>
      <SEO
        title={product.title}
        description={product.description || `Shop ${product.title} — premium handmade rangoli by LuvRang.`}
      />

      <div className="container-luxury py-6 md:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 font-body text-xs text-muted-foreground mb-6 animate-fade-up">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <ChevronRight size={12} />
          <span className="text-foreground truncate max-w-[200px]">{product.title}</span>
        </nav>

        {/* Main product layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* ── Image Gallery ────────────────────────────── */}
          <div className="animate-fade-up">
            {/* Main image */}
            <div className="relative aspect-[4/5] rounded-xl bg-secondary overflow-hidden group">
              {mainImage ? (
                <img
                  src={mainImage.url}
                  alt={mainImage.altText || product.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground font-body text-sm">
                  Product Image
                </div>
              )}
              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                <span className="bg-background/90 backdrop-blur-sm text-foreground text-[9px] sm:text-[10px] tracking-widest uppercase font-body font-medium px-2.5 py-1.5 rounded-md">
                  Made to Order
                </span>
                {hasDiscount && savingsPercent > 0 && (
                  <span className="bg-accent text-accent-foreground text-[9px] sm:text-[10px] tracking-wide uppercase font-body font-bold px-2.5 py-1.5 rounded-md">
                    {savingsPercent}% OFF
                  </span>
                )}
              </div>
              {/* Share button */}
              <button
                onClick={handleShare}
                className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm rounded-full text-foreground/70 hover:text-foreground transition-colors"
                aria-label="Share"
              >
                <Share2 size={16} />
              </button>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2.5 mt-4 overflow-x-auto scrollbar-hide pb-1">
                {images.map((img: { node: { url: string; altText: string | null } }, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIndex(i)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-secondary overflow-hidden border-2 transition-all ${
                      selectedImageIndex === i
                        ? 'border-primary ring-1 ring-primary/20'
                        : 'border-transparent hover:border-border'
                    }`}
                  >
                    <img
                      src={img.node.url}
                      alt={img.node.altText || ''}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Info (sticky on desktop) ─────────── */}
          <div className="lg:sticky lg:top-24 lg:self-start animate-fade-up" style={{ animationDelay: '0.1s' }}>
            {/* Product type tag */}
            {product.productType && (
              <p className="font-body text-[10px] sm:text-xs tracking-widest uppercase text-primary font-semibold mb-2">
                {product.productType}
              </p>
            )}

            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight">
              {product.title}
            </h1>

            {/* Price */}
            <div className="mt-4 flex items-baseline gap-3 font-body">
              <span className="text-2xl sm:text-3xl font-semibold text-foreground">
                {formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-muted-foreground line-through text-base sm:text-lg">
                    {formatPrice(selectedVariant.compareAtPrice.amount, selectedVariant.compareAtPrice.currencyCode)}
                  </span>
                  <span className="text-xs font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                    Save {savingsPercent}%
                  </span>
                </>
              )}
            </div>

            <p className="font-body text-[11px] text-muted-foreground mt-1.5">
              Tax included. Shipping calculated at checkout.
            </p>

            {/* Status badge */}
            <div className="mt-4 inline-flex items-center gap-2.5 bg-primary/5 border border-primary/10 rounded-lg px-4 py-2.5">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-body text-xs text-foreground font-medium">Made to Order • Ships in 3–5 days</span>
            </div>

            {/* Description */}
            <p className="font-body text-muted-foreground text-sm leading-relaxed mt-5">
              {product.description}
            </p>

            <div className="border-t border-border mt-6 pt-6">
              {/* Variant Selector */}
              {variants.length > 1 && (
                <div className="mb-6">
                  <label className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-3 block">
                    {variants[0].selectedOptions?.[0]?.name || 'Option'}:{' '}
                    <span className="text-foreground font-medium normal-case tracking-normal">
                      {selectedVariant.title}
                    </span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {variants.map((v: any, i: number) => (
                      <button
                        key={v.id}
                        onClick={() => {
                          setSelectedVariantIndex(i);
                          setQuantity(1);
                        }}
                        disabled={!v.availableForSale}
                        className={`font-body text-sm px-4 py-2.5 rounded-md border transition-all ${
                          selectedVariantIndex === i
                            ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                            : v.availableForSale
                            ? 'border-border text-foreground hover:border-foreground/30'
                            : 'border-border text-muted-foreground/40 line-through cursor-not-allowed'
                        }`}
                      >
                        {v.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity + Add to Cart row */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Quantity */}
                <div className="inline-flex items-center border border-border rounded-md shrink-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-3 text-foreground/60 hover:text-foreground transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center font-body text-sm font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-3 text-foreground/60 hover:text-foreground transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={isLoading || !selectedVariant.availableForSale}
                  className="flex-1 bg-primary text-primary-foreground font-body text-sm font-medium py-3.5 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 active:scale-[0.98]"
                >
                  {!selectedVariant.availableForSale
                    ? 'Sold Out'
                    : isLoading
                    ? 'Adding...'
                    : `Add to Cart — ${formatPrice(
                        String(parseFloat(selectedVariant.price.amount) * quantity),
                        selectedVariant.price.currencyCode,
                      )}`}
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 grid grid-cols-3 gap-2">
              {[
                { icon: Truck, label: 'Free Prepaid Shipping' },
                { icon: RotateCcw, label: 'Easy Returns' },
                { icon: Shield, label: 'Secure Payment' },
              ].map(({ icon: BadgeIcon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center p-3 rounded-lg bg-secondary/50 border border-border/50"
                >
                  <BadgeIcon size={18} className="text-primary mb-1.5" />
                  <span className="font-body text-[10px] text-muted-foreground leading-tight">{label}</span>
                </div>
              ))}
            </div>

            {/* Payment notes */}
            <div className="mt-5 space-y-2 font-body text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span>COD available — ₹59 extra charge</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Prepaid — Free shipping, no extra charges</span>
              </div>
            </div>

            {/* Accordions */}
            <div className="mt-8 border-t border-border divide-y divide-border">
              <AccordionItem title="Care Instructions" icon={Star}>
                <ul className="space-y-1.5 list-disc list-inside ml-1">
                  <li>Wipe gently with a dry or slightly damp cloth</li>
                  <li>Store flat in a cool, dry place</li>
                  <li>Avoid direct sunlight for prolonged periods</li>
                  <li>Keep away from water and moisture</li>
                </ul>
              </AccordionItem>
              <AccordionItem title="Delivery Information" icon={Package}>
                <ul className="space-y-1.5 list-disc list-inside ml-1">
                  <li>Made to order — crafted after your purchase</li>
                  <li>Ships within 3–5 business days</li>
                  <li>PAN India delivery via trusted couriers</li>
                  <li>Cash on Delivery available (₹59 extra)</li>
                  <li>Prepaid orders enjoy free shipping</li>
                </ul>
              </AccordionItem>
            </div>
          </div>
        </div>

        {/* ── You May Also Like ──────────────────────────── */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 md:mt-24 border-t border-border pt-12">
            <div className="text-center mb-10">
              <p className="font-body text-xs tracking-widest uppercase text-primary font-semibold mb-2">
                Discover More
              </p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                You May Also <span className="text-gradient-gold">Like</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {relatedProducts.map((p: ShopifyProduct, i: number) => (
                <div
                  key={p.node.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
