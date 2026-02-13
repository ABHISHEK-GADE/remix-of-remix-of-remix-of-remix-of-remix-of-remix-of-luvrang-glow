import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useCartStore } from '@/stores/cartStore';
import { Minus, Plus, ChevronDown } from 'lucide-react';
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
  const [careOpen, setCareOpen] = useState(false);
  const [deliveryOpen, setDeliveryOpen] = useState(false);

  if (productLoading) {
    return (
      <div className="container-luxury py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div className="aspect-square rounded-lg bg-secondary animate-pulse" />
          <div className="space-y-4">
            <div className="h-8 bg-secondary rounded animate-pulse w-3/4" />
            <div className="h-6 bg-secondary rounded animate-pulse w-1/4" />
            <div className="h-20 bg-secondary rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-luxury py-16 text-center">
        <p className="font-body text-muted-foreground">Product not found.</p>
      </div>
    );
  }

  const variants = product.variants.edges.map((e: { node: any }) => e.node);
  const selectedVariant = variants[selectedVariantIndex] || variants[0];

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
    toast.success('Added to cart!', { position: 'top-center' });
  };

  const mainImage = selectedVariant.image || product.images.edges[0]?.node;

  return (
    <div className="container-luxury py-8 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg bg-secondary overflow-hidden">
            {mainImage ? (
              <img src={mainImage.url} alt={mainImage.altText || product.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground font-body text-sm">Product Image</div>
            )}
          </div>
          {product.images.edges.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.edges.slice(0, 4).map((img: { node: { url: string; altText: string | null } }, i: number) => (
                <div key={i} className="aspect-square rounded-md bg-secondary overflow-hidden cursor-pointer">
                  <img src={img.node.url} alt={img.node.altText || ''} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">{product.title}</h1>

          <div className="mt-4 flex items-baseline gap-3 font-body">
            <span className="text-2xl font-semibold text-foreground">{formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}</span>
            {selectedVariant.compareAtPrice && parseFloat(selectedVariant.compareAtPrice.amount) > 0 && (
              <span className="text-muted-foreground line-through">{formatPrice(selectedVariant.compareAtPrice.amount, selectedVariant.compareAtPrice.currencyCode)}</span>
            )}
          </div>

          <div className="mt-4 inline-flex items-center gap-2 bg-primary/5 rounded-md px-3 py-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="font-body text-xs text-foreground">Made to Order • Ships in 3–5 days</span>
          </div>

          <p className="font-body text-muted-foreground text-sm leading-relaxed mt-6">{product.description}</p>

          {/* Variant Selector */}
          {variants.length > 1 && (
            <div className="mt-8">
              <label className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-3 block">
                {variants[0].selectedOptions?.[0]?.name || 'Option'}
              </label>
              <div className="flex flex-wrap gap-2">
                {variants.map((v: any, i: number) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariantIndex(i)}
                    className={`font-body text-sm px-4 py-2.5 rounded-md border transition-colors ${
                      selectedVariantIndex === i
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border text-foreground hover:border-foreground/30'
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
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2.5 text-foreground/60 hover:text-foreground transition-colors"><Minus size={16} /></button>
              <span className="w-12 text-center font-body text-sm">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2.5 text-foreground/60 hover:text-foreground transition-colors"><Plus size={16} /></button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={isLoading}
            className="mt-8 w-full bg-primary text-primary-foreground font-body text-sm font-medium py-4 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Adding...' : `Add to Cart — ${formatPrice(String(parseFloat(selectedVariant.price.amount) * quantity), selectedVariant.price.currencyCode)}`}
          </button>

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
              <ChevronDown size={16} className={`transition-transform ${careOpen ? 'rotate-180' : ''}`} />
            </button>
            {careOpen && (
              <div className="pb-4 font-body text-sm text-muted-foreground leading-relaxed">
                <ul className="space-y-1 list-disc list-inside">
                  <li>Wipe gently with a dry or slightly damp cloth</li>
                  <li>Store flat in a cool, dry place</li>
                  <li>Avoid direct sunlight for prolonged periods</li>
                  <li>Keep away from water and moisture</li>
                </ul>
              </div>
            )}
            <button onClick={() => setDeliveryOpen(!deliveryOpen)} className="w-full flex items-center justify-between py-4 font-body text-sm text-foreground">
              Delivery Information
              <ChevronDown size={16} className={`transition-transform ${deliveryOpen ? 'rotate-180' : ''}`} />
            </button>
            {deliveryOpen && (
              <div className="pb-4 font-body text-sm text-muted-foreground leading-relaxed">
                <ul className="space-y-1 list-disc list-inside">
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
