import { useParams, Link } from 'react-router-dom';
import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useCartStore } from '@/stores/cartStore';
import {
  Minus, Plus, ChevronDown, ChevronRight, Share2,
  Truck, Shield, Heart, Package, Star,
  Eye, Clock, Sparkles, Check, ShoppingBag, Zap,
  ChevronLeft, Award, MessageSquare,
} from 'lucide-react';
import { getProductByHandle, getProducts, formatPrice } from '@/api/shopify';
import type { ShopifyProduct } from '@/api/shopify';
import { toast } from 'sonner';
import SEO from '@/components/SEO';
import ProductCard from '@/components/ProductCard';
import OffersSection from '@/components/OffersSection';

/* ─── Accordion ──────────────────────────────────────────── */
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
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}
      >
        <div className="font-body text-sm text-muted-foreground leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ─── Deterministic Social Proof (same across all devices) ─ */
function useSocialProof() {
  const [viewers, setViewers] = useState(0);
  const [purchased, setPurchased] = useState(0);

  useEffect(() => {
    // Seed from current minute so all devices get same value, fluctuates every 30s
    const update = () => {
      const now = Date.now();
      const seed = Math.floor(now / 30000); // changes every 30 seconds
      // Simple deterministic pseudo-random from seed
      const hash1 = ((seed * 2654435761) >>> 0) % 1000;
      const hash2 = ((seed * 2246822519) >>> 0) % 1000;
      // Viewers: 5-60
      setViewers(5 + (hash1 % 56));
      // Purchased in last 5 hours: 3-20
      setPurchased(3 + (hash2 % 18));
    };

    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  return { viewers, purchased };
}

function SocialProofBanner() {
  const { viewers, purchased } = useSocialProof();
  return (
    <div className="flex items-center gap-5 font-body text-xs text-muted-foreground">
      <span className="flex items-center gap-1.5">
        <Eye size={13} className="text-primary" />
        <span className="font-medium text-foreground">{viewers}</span> viewing now
      </span>
      <span className="flex items-center gap-1.5">
        <Clock size={13} className="text-accent" />
        Purchased <span className="font-medium text-foreground">{purchased}×</span> in last 5h
      </span>
    </div>
  );
}

/* ─── Image Zoom on Hover ────────────────────────────────── */
function ZoomableImage({
  src,
  alt,
  children,
}: {
  src: string;
  alt: string;
  children?: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomed, setZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/5] rounded-2xl bg-secondary overflow-hidden cursor-zoom-in group"
      onMouseEnter={() => setZoomed(true)}
      onMouseLeave={() => setZoomed(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500"
        style={
          zoomed
            ? {
                transform: 'scale(2)',
                transformOrigin: `${position.x}% ${position.y}%`,
              }
            : undefined
        }
      />
      {!zoomed && children}
    </div>
  );
}

/* ─── Reviews Section ────────────────────────────────────── */
function ReviewsSection() {
  return (
    <section className="section-spacing border-t border-border">
      <div className="container-luxury">
        <div className="text-center mb-10">
          <p className="font-body text-xs tracking-[0.2em] uppercase text-primary font-semibold mb-2">
            What Customers Say
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Customer <span className="text-gradient-gold">Reviews</span>
          </h2>
        </div>

        {/* Rating summary */}
        <div className="max-w-2xl mx-auto text-center mb-10">
          <div className="flex items-center justify-center gap-1.5 mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={22} className="text-accent fill-accent" />
            ))}
          </div>
          <p className="font-display text-4xl font-bold text-foreground">4.9</p>
          <p className="font-body text-sm text-muted-foreground mt-1">Based on 120+ happy customers</p>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {[
            {
              name: 'Priya S.',
              location: 'Mumbai',
              rating: 5,
              text: 'Absolutely stunning rangoli! The colors are vibrant and the craftsmanship is exceptional. My guests always compliment it.',
              date: '2 weeks ago',
            },
            {
              name: 'Anita M.',
              location: 'Delhi',
              rating: 5,
              text: 'Perfect for daily pooja area decoration. Reusable and so easy to maintain. Already ordered my second set!',
              date: '1 month ago',
            },
            {
              name: 'Deepika R.',
              location: 'Bangalore',
              rating: 5,
              text: 'Bought this for Diwali and it was the highlight of our home decoration. Premium quality and beautiful packaging.',
              date: '3 weeks ago',
            },
          ].map((review, i) => (
            <div
              key={review.name}
              className="bg-secondary/30 border border-border/50 rounded-xl p-6 animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: review.rating }).map((_, s) => (
                  <Star key={s} size={14} className="text-accent fill-accent" />
                ))}
              </div>
              <p className="font-body text-sm text-foreground leading-relaxed mb-4">"{review.text}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body text-sm font-semibold text-foreground">{review.name}</p>
                  <p className="font-body text-xs text-muted-foreground">{review.location}</p>
                </div>
                <span className="font-body text-[10px] text-muted-foreground">{review.date}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="inline-flex items-center gap-2 font-body text-sm font-medium text-primary hover:underline">
            <MessageSquare size={16} /> Write a Review
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── Sticky Mobile CTA ──────────────────────────────────── */
function MobileStickyBar({
  product,
  price,
  onAddToCart,
  onBuyNow,
  isLoading,
  available,
}: {
  product: { title: string };
  price: string;
  onAddToCart: () => void;
  onBuyNow: () => void;
  isLoading: boolean;
  available: boolean;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background/95 backdrop-blur-md border-t border-border px-4 py-3 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-display text-sm font-semibold text-foreground truncate">{product.title}</p>
          <p className="font-body text-sm font-bold text-primary">{price}</p>
        </div>
        {available ? (
          <div className="flex gap-2 shrink-0">
            <button
              onClick={onAddToCart}
              disabled={isLoading}
              className="px-4 py-2.5 rounded-lg border border-primary text-primary font-body text-xs font-semibold hover:bg-primary/5 transition-colors disabled:opacity-50"
            >
              <ShoppingBag size={16} />
            </button>
            <button
              onClick={onBuyNow}
              disabled={isLoading}
              className="px-5 py-2.5 rounded-lg bg-accent text-accent-foreground font-body text-xs font-bold hover:bg-accent/90 transition-colors disabled:opacity-50"
            >
              Buy Now
            </button>
          </div>
        ) : (
          <span className="font-body text-sm font-semibold text-muted-foreground">Sold Out</span>
        )}
      </div>
    </div>
  );
}

/* ─── Main Product Page ──────────────────────────────────── */
export default function Product() {
  const { handle } = useParams<{ handle: string }>();
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const getCheckoutUrl = useCartStore((s) => s.getCheckoutUrl);

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
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  // Parse metafields
  const metafields = useMemo(() => {
    const mf: Record<string, string> = {};
    if (product?.metafields) {
      product.metafields.forEach((m: { key: string; value: string } | null) => {
        if (m) mf[m.key] = m.value;
      });
    }
    return mf;
  }, [product]);

  const careInstructions = metafields['care_instructions'] || metafields['care_guide'] || '';
  const materials = metafields['materials'] || '';
  const customBadge = metafields['badge'] || metafields['subtitle'] || '';

  // Related products
  const relatedProducts = useMemo(() => {
    if (!allProducts || !product) return [];
    return allProducts.filter((p) => p.node.handle !== product.handle).slice(0, 4);
  }, [allProducts, product]);

  // Reset state on product change
  useEffect(() => {
    setSelectedVariantIndex(0);
    setSelectedImageIndex(0);
    setQuantity(1);
    setAddedToCart(false);
  }, [handle]);

  /* ── Loading skeleton ─────────────────────────────────── */
  if (productLoading) {
    return (
      <div className="container-luxury py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="space-y-4">
            <div className="aspect-[4/5] rounded-2xl bg-secondary animate-pulse" />
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-lg bg-secondary animate-pulse" />
              ))}
            </div>
          </div>
          <div className="space-y-5">
            <div className="h-4 bg-secondary rounded animate-pulse w-1/4" />
            <div className="h-10 bg-secondary rounded animate-pulse w-3/4" />
            <div className="h-8 bg-secondary rounded animate-pulse w-1/3" />
            <div className="h-32 bg-secondary rounded animate-pulse" />
            <div className="h-14 bg-secondary rounded animate-pulse" />
            <div className="h-14 bg-secondary rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  /* ── Not found ─────────────────────────────────────────── */
  if (!product) {
    return (
      <div className="container-luxury py-20 text-center">
        <Sparkles size={48} className="mx-auto text-primary/30 mb-4" />
        <h1 className="font-display text-3xl font-bold mb-3">Product Not Found</h1>
        <p className="font-body text-muted-foreground mb-8 max-w-md mx-auto">
          This product may have been removed or the link is incorrect.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body text-sm font-medium px-8 py-3.5 rounded-lg hover:bg-primary/90 transition-colors"
        >
          <ChevronLeft size={16} /> Back to Shop
        </Link>
      </div>
    );
  }

  const variants = product.variants.edges.map((e: { node: any }) => e.node);
  const selectedVariant = variants[selectedVariantIndex] || variants[0];
  const images = product.images.edges;
  const mainImage = images[selectedImageIndex]?.node || selectedVariant.image || images[0]?.node;

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
  const totalPrice = formatPrice(
    String(parseFloat(selectedVariant.price.amount) * quantity),
    selectedVariant.price.currencyCode,
  );

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
    setAddedToCart(true);
    toast.success(`${product.title} added to cart!`, { position: 'top-center' });
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const handleBuyNow = async () => {
    if (!selectedVariant) return;
    await addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
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

  const handleWishlist = () => {
    setWishlisted(!wishlisted);
    toast.success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist!', { position: 'top-center' });
  };

  // Navigate images
  const prevImage = () => setSelectedImageIndex((i) => (i > 0 ? i - 1 : images.length - 1));
  const nextImage = () => setSelectedImageIndex((i) => (i < images.length - 1 ? i + 1 : 0));

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: images.map((img: any) => img.node.url),
    brand: { '@type': 'Brand', name: 'LuvRang' },
    offers: {
      '@type': 'Offer',
      price: selectedVariant.price.amount,
      priceCurrency: selectedVariant.price.currencyCode,
      availability: selectedVariant.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: window.location.href,
    },
  };

  return (
    <>
      <SEO
        title={product.title}
        description={product.description || `Shop ${product.title} — premium handmade rangoli by LuvRang.`}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container-luxury py-4 md:py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 font-body text-xs text-muted-foreground mb-5 animate-fade-up">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <ChevronRight size={12} />
          <span className="text-foreground truncate max-w-[200px]">{product.title}</span>
        </nav>

        {/* ── Main Layout ───────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
          {/* ── Thumbnail Strip (Desktop vertical) ──────────── */}
          <div className="hidden lg:flex lg:col-span-1 flex-col gap-2 pt-1 animate-fade-up">
            {images.map((img: { node: { url: string; altText: string | null } }, i: number) => (
              <button
                key={i}
                onClick={() => setSelectedImageIndex(i)}
                className={`relative aspect-square rounded-lg bg-secondary overflow-hidden border-2 transition-all ${
                  selectedImageIndex === i
                    ? 'border-primary ring-2 ring-primary/20'
                    : 'border-transparent hover:border-border/70'
                }`}
              >
                <img src={img.node.url} alt={img.node.altText || ''} className="w-full h-full object-cover" />
                {selectedImageIndex === i && (
                  <div className="absolute inset-0 bg-primary/5" />
                )}
              </button>
            ))}
          </div>

          {/* ── Main Image ──────────────────────────────────── */}
          <div className="lg:col-span-6 animate-fade-up">
            <ZoomableImage
              src={mainImage?.url || ''}
              alt={mainImage?.altText || product.title}
            >
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                <span className="bg-background/95 backdrop-blur-sm text-foreground text-[9px] sm:text-[10px] tracking-[0.15em] uppercase font-body font-semibold px-3 py-1.5 rounded-md shadow-sm">
                  {customBadge || 'Made to Order'}
                </span>
                {hasDiscount && savingsPercent > 0 && (
                  <span className="bg-accent text-accent-foreground text-[9px] sm:text-[10px] tracking-wide uppercase font-body font-bold px-3 py-1.5 rounded-md shadow-sm">
                    {savingsPercent}% OFF
                  </span>
                )}
              </div>

              {/* Image nav arrows */}
              {images.length > 1 && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full text-foreground/70 hover:text-foreground transition-all opacity-0 group-hover:opacity-100 shadow-sm z-10" aria-label="Previous image">
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full text-foreground/70 hover:text-foreground transition-all opacity-0 group-hover:opacity-100 shadow-sm z-10" aria-label="Next image">
                    <ChevronRight size={18} />
                  </button>
                </>
              )}

              {/* Image counter */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm text-foreground font-body text-[11px] font-medium px-3 py-1 rounded-full shadow-sm z-10">
                  {selectedImageIndex + 1} / {images.length}
                </div>
              )}
            </ZoomableImage>

            {/* Mobile thumbnails */}
            <div className="flex lg:hidden gap-2 mt-3 overflow-x-auto scrollbar-hide pb-1">
              {images.map((img: { node: { url: string; altText: string | null } }, i: number) => (
                <button
                  key={i}
                  onClick={() => setSelectedImageIndex(i)}
                  className={`flex-shrink-0 w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-lg bg-secondary overflow-hidden border-2 transition-all ${
                    selectedImageIndex === i
                      ? 'border-primary ring-1 ring-primary/20'
                      : 'border-transparent hover:border-border'
                  }`}
                >
                  <img src={img.node.url} alt={img.node.altText || ''} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* ── Product Info (Sticky) ───────────────────────── */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start animate-fade-up" style={{ animationDelay: '0.1s' }}>
            {/* Social proof */}
            <div className="mb-4">
              <SocialProofBanner />
            </div>

            {/* Product type */}
            {product.productType && (
              <p className="font-body text-[10px] sm:text-xs tracking-[0.2em] uppercase text-primary font-semibold mb-1.5">
                {product.productType}
              </p>
            )}

            <h1 className="font-display text-2xl sm:text-3xl lg:text-[2.5rem] font-bold text-foreground leading-[1.15]">
              {product.title}
            </h1>

            {/* Price block */}
            <div className="mt-4 flex items-end gap-3 font-body">
              <span className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
                {formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-muted-foreground line-through text-lg mb-0.5">
                    {formatPrice(selectedVariant.compareAtPrice.amount, selectedVariant.compareAtPrice.currencyCode)}
                  </span>
                  <span className="text-xs font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-full mb-0.5">
                    Save {savingsPercent}%
                  </span>
                </>
              )}
            </div>

            <p className="font-body text-[11px] text-muted-foreground mt-1">
              Tax included. Shipping calculated at checkout.
            </p>

            {/* Status badge */}
            <div className="mt-4 inline-flex items-center gap-2.5 gold-shimmer rounded-lg px-4 py-2.5">
              <Sparkles size={14} className="text-accent-foreground" />
              <span className="font-body text-xs text-accent-foreground font-semibold">
                Handcrafted to Order • Ships in 3–5 days
              </span>
            </div>

            <div className="border-t border-border mt-6 pt-6 space-y-6">
              {/* Variant Selector */}
              {variants.length > 1 && (
                <div>
                  <label className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3 block">
                    {variants[0].selectedOptions?.[0]?.name || 'Option'}:{' '}
                    <span className="text-foreground font-semibold normal-case tracking-normal">
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
                          setAddedToCart(false);
                        }}
                        disabled={!v.availableForSale}
                        className={`font-body text-sm px-5 py-2.5 rounded-lg border-2 transition-all duration-200 ${
                          selectedVariantIndex === i
                            ? 'border-primary bg-primary text-primary-foreground shadow-md'
                            : v.availableForSale
                            ? 'border-border text-foreground hover:border-primary/40 hover:bg-primary/5'
                            : 'border-border/50 text-muted-foreground/40 line-through cursor-not-allowed'
                        }`}
                      >
                        {v.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity + Buttons */}
              <div className="space-y-3">
                {/* Quantity */}
                <div className="flex items-center gap-4">
                  <label className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">
                    Quantity
                  </label>
                  <div className="inline-flex items-center border-2 border-border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 py-2.5 text-foreground/60 hover:text-foreground hover:bg-secondary/50 transition-colors"
                      aria-label="Decrease"
                    >
                      <Minus size={15} />
                    </button>
                    <span className="w-12 text-center font-body text-sm font-semibold border-x-2 border-border py-2.5">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3.5 py-2.5 text-foreground/60 hover:text-foreground hover:bg-secondary/50 transition-colors"
                      aria-label="Increase"
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={isLoading || !selectedVariant.availableForSale}
                  className={`w-full flex items-center justify-center gap-2.5 font-body text-sm font-semibold py-4 rounded-xl transition-all duration-300 active:scale-[0.98] disabled:opacity-50 ${
                    addedToCart
                      ? 'bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))]'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg'
                  }`}
                >
                  {!selectedVariant.availableForSale ? (
                    'Sold Out'
                  ) : addedToCart ? (
                    <>
                      <Check size={18} /> Added to Cart!
                    </>
                  ) : isLoading ? (
                    'Adding...'
                  ) : (
                    <>
                      <ShoppingBag size={18} /> Add to Cart — {totalPrice}
                    </>
                  )}
                </button>

                {/* Buy Now */}
                {selectedVariant.availableForSale && (
                  <button
                    onClick={handleBuyNow}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2.5 bg-accent text-accent-foreground font-body text-sm font-bold py-4 rounded-xl hover:bg-accent/90 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 shadow-md hover:shadow-lg"
                  >
                    <Zap size={18} /> Buy Now — {totalPrice}
                  </button>
                )}
              </div>
            </div>

            {/* ── Wishlist & Share (accessible, below CTA) ──── */}
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={handleWishlist}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border transition-all font-body text-xs font-medium ${
                  wishlisted
                    ? 'border-destructive/30 bg-destructive/5 text-destructive'
                    : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/20'
                }`}
              >
                <Heart size={15} fill={wishlisted ? 'currentColor' : 'none'} />
                {wishlisted ? 'Wishlisted' : 'Add to Wishlist'}
              </button>
              <button
                onClick={handleShare}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all font-body text-xs font-medium"
              >
                <Share2 size={15} /> Share
              </button>
            </div>

            {/* ── Trust Badges ──────────────────────────────── */}
            <div className="mt-7 grid grid-cols-3 gap-2.5">
              {[
                { icon: Truck, label: 'Free Shipping', sub: 'PAN India' },
                { icon: Award, label: 'Premium Quality', sub: 'Handcrafted' },
                { icon: Shield, label: 'Secure Payment', sub: '100% safe' },
              ].map(({ icon: BadgeIcon, label, sub }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center p-3.5 rounded-xl bg-secondary/40 border border-border/60 hover:border-primary/20 hover:bg-primary/[0.03] transition-all duration-200"
                >
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <BadgeIcon size={16} className="text-primary" />
                  </div>
                  <span className="font-body text-[10px] sm:text-[11px] font-semibold text-foreground leading-tight">{label}</span>
                  <span className="font-body text-[9px] text-muted-foreground mt-0.5">{sub}</span>
                </div>
              ))}
            </div>

            {/* ── Accordions ───────────────────────────────── */}
            <div className="mt-7 border-t border-border divide-y divide-border">
              {materials && (
                <AccordionItem title="Materials & Craft" icon={Sparkles} defaultOpen>
                  <p>{materials}</p>
                </AccordionItem>
              )}
              <AccordionItem title="Care Instructions" icon={Star}>
                {careInstructions ? (
                  <p>{careInstructions}</p>
                ) : (
                  <ul className="space-y-1.5 list-disc list-inside ml-1">
                    <li>Wipe gently with a dry or slightly damp cloth</li>
                    <li>Store flat in a cool, dry place</li>
                    <li>Avoid direct sunlight for prolonged periods</li>
                    <li>Keep away from water and moisture</li>
                  </ul>
                )}
              </AccordionItem>
              <AccordionItem title="Shipping & Delivery" icon={Package}>
                <ul className="space-y-1.5 list-disc list-inside ml-1">
                  <li>Made to order — crafted after your purchase</li>
                  <li>Ships within 3–5 business days</li>
                  <li>PAN India delivery via trusted couriers</li>
                  <li>Free shipping on all orders</li>
                </ul>
              </AccordionItem>
            </div>
          </div>
        </div>
      </div>

      {/* ── Description Section ──────────────────────────── */}
      <section className="section-spacing border-t border-border">
        <div className="container-luxury">
          <div className="text-center mb-10">
            <p className="font-body text-xs tracking-[0.2em] uppercase text-primary font-semibold mb-2">
              About This Product
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Product <span className="text-gradient-gold">Details</span>
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            {product.descriptionHtml ? (
              <div
                className="font-body text-muted-foreground text-base leading-relaxed prose prose-lg max-w-none
                  [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2
                  [&_strong]:text-foreground [&_strong]:font-semibold [&_a]:text-primary [&_a]:underline
                  [&_img]:rounded-xl [&_img]:my-6 [&_img]:w-full [&_img]:shadow-md
                  [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-4
                  [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-3
                  [&_p]:mb-4"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            ) : (
              <p className="font-body text-muted-foreground text-base leading-relaxed text-center">
                {product.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── Reviews Section ──────────────────────────────── */}
      <ReviewsSection />

      {/* ── You May Also Like (Upsell/Downsell) ─────────── */}
      {relatedProducts.length > 0 && (
        <section className="section-spacing border-t border-border">
          <div className="container-luxury">
            <div className="text-center mb-10">
              <p className="font-body text-xs tracking-[0.2em] uppercase text-primary font-semibold mb-2">
                Complete Your Collection
              </p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                You May Also <span className="text-gradient-gold">Love</span>
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
          </div>
        </section>
      )}

      {/* ── Offers Section ───────────────────────────────── */}
      <OffersSection />

      {/* Sticky mobile bar */}
      <MobileStickyBar
        product={product}
        price={formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        isLoading={isLoading}
        available={selectedVariant.availableForSale}
      />
    </>
  );
}
