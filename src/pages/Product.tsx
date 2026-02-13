import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useCartStore } from '@/stores/cartStore';
import { Minus, Plus, ChevronDown, ChevronRight, Share2, Truck, RotateCcw, Shield } from 'lucide-react';
import { getProductByHandle, formatPrice } from '@/api/shopify';
import { toast } from 'sonner';

export default function Product() {
  const { handle } = useParams<{ handle: string }>();
  const addItem = useCartStore(s => s.addItem);
  const isLoading = useCartStore(s => s.isLoading);

  const { data: product, isLoading: productLoading } = useQuery({
    queryKey: ['product', handle],
    queryFn: () => getProductByHandle(handle!),
    enabled: !!handle,
  });

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [careOpen, setCareOpen] = useState(false);
  const [deliveryOpen, setDeliveryOpen] = useState(false);

  if (productLoading) {
    return (
      <div className="container-luxury py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div className="space-y-4">
            <div className="aspect-square rounded-lg bg-secondary animate-pulse" />
            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-md bg-secondary animate-pulse" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-8 bg-secondary rounded animate-pulse w-3/4" />
            <div className="h-6 bg-secondary rounded animate-pulse w-1/4" />
            <div className="h-20 bg-secondary rounded animate-pulse" />
            <div className="h-12 bg-secondary rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-luxury py-16 text-center">
        <h1 className="font-display text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="font-body text-muted-foreground mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="inline-block bg-primary text-primary-foreground font-body text-sm font-medium px-8 py-3.5 rounded-md hover:bg-primary/90 transition-colors">
          Back to Home
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

  const hasDiscount = selectedVariant.compareAtPrice && parseFloat(selectedVariant.compareAtPrice.amount) > parseFloat(selectedVariant.price.amount);
  const savingsPercent = hasDiscount
    ? Math.round(((parseFloat(selectedVariant.compareAtPrice.amount) - parseFloat(selectedVariant.price.amount)) / parseFloat(selectedVariant.compareAtPrice.amount)) * 100)
    : 0;

  return (
    <div className="container-luxury py-8 md:py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 font-body text-xs text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight size={12} />
        <Link to="/collections/festive" className="hover:text-foreground transition-colors">Shop</Link>
        <ChevronRight size={12} />
        <span className="text-foreground truncate max-w-[200px]">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-xl bg-secondary overflow-hidden relative group">
            {mainImage ? (
              <img
                src={mainImage.url}
                alt={mainImage.altText || product.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground font-body text-sm">Product Image</div>
            )}
            {hasDiscount && savingsPercent > 0 && (
              <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-xs font-body font-bold px-3 py-1.5 rounded-md">
                {savingsPercent}% OFF
              </span>
            )}
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {images.slice(0, 4).map((img: { node: { url: string; altText: string | null } }, i: number) => (
                <button
                  key={i}
                  onClick={() => setSelectedImageIndex(i)}
                  className={`aspect-square rounded-lg bg-secondary overflow-hidden border-2 transition-colors ${
                    selectedImageIndex === i ? 'border-primary' : 'border-transparent hover:border-border'
                  }`}
                >
                  <img src={img.node.url} alt={img.node.altText || ''} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <div className="flex items-start justify-between gap-4">
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">{product.title}</h1>
            <button onClick={handleShare} className="p-2 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0" aria-label="Share">
              <Share2 size={20} />
            </button>
          </div>

          <div className="mt-4 flex items-baseline gap-3 font-body">
            <span className="text-2xl font-semibold text-foreground">
              {formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}
            </span>
            {hasDiscount && (
              <>
                <span className="text-muted-foreground line-through text-lg">
                  {formatPrice(selectedVariant.compareAtPrice.amount, selectedVariant.compareAtPrice.currencyCode)}
                </span>
                <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-1 rounded">
                  Save {savingsPercent}%
                </span>
              </>
            )}
          </div>

          <p className="font-body text-xs text-muted-foreground mt-1">Tax included. Shipping calculated at checkout.</p>

          <div className="mt-4 inline-flex items-center gap-2 bg-primary/5 rounded-md px-3 py-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-body text-xs text-foreground">Made to Order • Ships in 3–5 days</span>
          </div>

          <p className="font-body text-muted-foreground text-sm leading-relaxed mt-6">{product.description}</p>

          {/* Variant Selector */}
          {variants.length > 1 && (
            <div className="mt-8">
              <label className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-3 block">
                {variants[0].selectedOptions?.[0]?.name || 'Option'}: <span className="text-foreground font-medium normal-case tracking-normal">{selectedVariant.title}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {variants.map((v: any, i: number) => (
                  <button
                    key={v.id}
                    onClick={() => { setSelectedVariantIndex(i); setQuantity(1); }}
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

          {/* Quantity */}
          <div className="mt-8">
            <label className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-3 block">Quantity</label>
            <div className="inline-flex items-center border border-border rounded-md">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2.5 text-foreground/60 hover:text-foreground transition-colors" aria-label="Decrease quantity">
                <Minus size={16} />
              </button>
              <span className="w-12 text-center font-body text-sm">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2.5 text-foreground/60 hover:text-foreground transition-colors" aria-label="Increase quantity">
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={isLoading || !selectedVariant.availableForSale}
            className="mt-8 w-full bg-primary text-primary-foreground font-body text-sm font-medium py-4 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 active:scale-[0.98]"
          >
            {!selectedVariant.availableForSale
              ? 'Sold Out'
              : isLoading
              ? 'Adding...'
              : `Add to Cart — ${formatPrice(String(parseFloat(selectedVariant.price.amount) * quantity), selectedVariant.price.currencyCode)}`
            }
          </button>

          {/* Trust Badges */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center text-center p-3 rounded-lg bg-secondary/50">
              <Truck size={18} className="text-primary mb-1.5" />
              <span className="font-body text-[10px] text-muted-foreground">Free Prepaid Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 rounded-lg bg-secondary/50">
              <RotateCcw size={18} className="text-primary mb-1.5" />
              <span className="font-body text-[10px] text-muted-foreground">Easy Returns</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 rounded-lg bg-secondary/50">
              <Shield size={18} className="text-primary mb-1.5" />
              <span className="font-body text-[10px] text-muted-foreground">Secure Payment</span>
            </div>
          </div>

          {/* Payment Notes */}
          <div className="mt-4 space-y-2 font-body text-xs text-muted-foreground">
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
          <div className="mt-10 border-t border-border divide-y divide-border">
            <button onClick={() => setCareOpen(!careOpen)} className="w-full flex items-center justify-between py-4 font-body text-sm text-foreground">
              Care Instructions
              <ChevronDown size={16} className={`transition-transform duration-200 ${careOpen ? 'rotate-180' : ''}`} />
            </button>
            {careOpen && (
              <div className="pb-4 font-body text-sm text-muted-foreground leading-relaxed animate-fade-in">
                <ul className="space-y-1.5 list-disc list-inside">
                  <li>Wipe gently with a dry or slightly damp cloth</li>
                  <li>Store flat in a cool, dry place</li>
                  <li>Avoid direct sunlight for prolonged periods</li>
                  <li>Keep away from water and moisture</li>
                </ul>
              </div>
            )}
            <button onClick={() => setDeliveryOpen(!deliveryOpen)} className="w-full flex items-center justify-between py-4 font-body text-sm text-foreground">
              Delivery Information
              <ChevronDown size={16} className={`transition-transform duration-200 ${deliveryOpen ? 'rotate-180' : ''}`} />
            </button>
            {deliveryOpen && (
              <div className="pb-4 font-body text-sm text-muted-foreground leading-relaxed animate-fade-in">
                <ul className="space-y-1.5 list-disc list-inside">
                  <li>Made to order — crafted after your purchase</li>
                  <li>Ships within 3–5 business days</li>
                  <li>PAN India delivery via trusted couriers</li>
                  <li>Cash on Delivery available (₹59 extra)</li>
                  <li>Prepaid orders enjoy free shipping</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}