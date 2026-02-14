import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts, formatPrice, type ShopifyProduct } from '@/api/shopify';
import { useCartStore } from '@/stores/cartStore';
import { Package, Plus, Minus, X, ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { toast } from 'sonner';
import SEO from '@/components/SEO';

const MIN_BUNDLE_SIZE = 3;
const BUNDLE_DISCOUNT_PERCENT = 10;

export default function BundleBuilder() {
  const [selectedItems, setSelectedItems] = useState<Map<string, { product: ShopifyProduct; qty: number }>>(new Map());
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  const { data: products = [], isLoading: loadingProducts } = useQuery({
    queryKey: ['products', 'all-for-bundle'],
    queryFn: () => getProducts(50),
  });

  const toggleProduct = (product: ShopifyProduct) => {
    setSelectedItems((prev) => {
      const next = new Map(prev);
      if (next.has(product.node.id)) {
        next.delete(product.node.id);
      } else {
        next.set(product.node.id, { product, qty: 1 });
      }
      return next;
    });
  };

  const updateQty = (id: string, delta: number) => {
    setSelectedItems((prev) => {
      const next = new Map(prev);
      const item = next.get(id);
      if (!item) return prev;
      const newQty = item.qty + delta;
      if (newQty <= 0) {
        next.delete(id);
      } else {
        next.set(id, { ...item, qty: newQty });
      }
      return next;
    });
  };

  const totalItems = useMemo(
    () => Array.from(selectedItems.values()).reduce((s, i) => s + i.qty, 0),
    [selectedItems]
  );

  const subtotal = useMemo(
    () =>
      Array.from(selectedItems.values()).reduce(
        (s, i) => s + parseFloat(i.product.node.priceRange.minVariantPrice.amount) * i.qty,
        0
      ),
    [selectedItems]
  );

  const isBundleReady = totalItems >= MIN_BUNDLE_SIZE;
  const discount = isBundleReady ? subtotal * (BUNDLE_DISCOUNT_PERCENT / 100) : 0;
  const finalTotal = subtotal - discount;

  const handleAddBundle = async () => {
    if (!isBundleReady) return;
    for (const { product, qty } of selectedItems.values()) {
      const variant = product.node.variants.edges[0]?.node;
      if (!variant) continue;
      await addItem({
        product,
        variantId: variant.id,
        variantTitle: variant.title,
        price: variant.price,
        quantity: qty,
        selectedOptions: variant.selectedOptions,
      });
    }
    toast.success(`Bundle of ${totalItems} items added to cart!`);
    setSelectedItems(new Map());
  };

  return (
    <>
      <SEO title="Build Your Bundle" description="Create your own custom bundle and save! Pick 3 or more items to unlock exclusive discounts." />
      <div className="container-luxury section-spacing">
        <div className="text-center mb-10 animate-fade-up">
          <p className="font-body text-xs tracking-widest uppercase text-primary font-semibold mb-2">Mix & Match</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Build Your <span className="text-gradient-gold">Bundle</span>
          </h1>
          <p className="font-body text-muted-foreground mt-3 text-sm max-w-md mx-auto">
            Pick {MIN_BUNDLE_SIZE} or more items to unlock <strong>{BUNDLE_DISCOUNT_PERCENT}% off</strong> your entire bundle
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-[1fr_340px] gap-8">
          {/* Product Grid */}
          <div>
            {loadingProducts ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="aspect-[4/5] rounded-xl bg-secondary animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                {products.map((product) => {
                  const p = product.node;
                  const image = p.images.edges[0]?.node;
                  const price = p.priceRange.minVariantPrice;
                  const isSelected = selectedItems.has(p.id);
                  const selectedQty = selectedItems.get(p.id)?.qty ?? 0;

                  return (
                    <div
                      key={p.id}
                      className={`relative rounded-xl border-2 transition-all cursor-pointer overflow-hidden ${
                        isSelected
                          ? 'border-primary shadow-md ring-1 ring-primary/20'
                          : 'border-border/50 hover:border-border'
                      }`}
                      onClick={() => toggleProduct(product)}
                    >
                      <div className="relative aspect-[4/5] bg-secondary">
                        {image ? (
                          <img
                            src={image.url}
                            alt={image.altText || p.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground font-body text-sm">
                            No image
                          </div>
                        )}

                        {isSelected && (
                          <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md">
                            <Check size={14} strokeWidth={3} />
                          </div>
                        )}
                      </div>

                      <div className="p-3">
                        <h3 className="font-display text-sm font-medium text-foreground line-clamp-1">{p.title}</h3>
                        <p className="font-body text-xs text-muted-foreground mt-0.5">
                          {formatPrice(price.amount, price.currencyCode)}
                        </p>

                        {isSelected && (
                          <div
                            className="flex items-center justify-between mt-2 bg-secondary/70 rounded-lg px-2 py-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={() => updateQty(p.id, -1)}
                              className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-background transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="font-body text-sm font-semibold">{selectedQty}</span>
                            <button
                              onClick={() => updateQty(p.id, 1)}
                              className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-background transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Bundle Summary Sidebar */}
          <div className="mt-8 lg:mt-0">
            <div className="sticky top-28 bg-background border border-border/50 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Package size={20} className="text-primary" />
                <h2 className="font-display text-lg font-bold">Your Bundle</h2>
              </div>

              {selectedItems.size === 0 ? (
                <div className="text-center py-8">
                  <p className="font-body text-sm text-muted-foreground">
                    Select products to start building your bundle
                  </p>
                </div>
              ) : (
                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {Array.from(selectedItems.entries()).map(([id, { product, qty }]) => {
                    const p = product.node;
                    const image = p.images.edges[0]?.node;
                    const price = parseFloat(p.priceRange.minVariantPrice.amount);
                    return (
                      <div key={id} className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-secondary overflow-hidden flex-shrink-0">
                          {image && (
                            <img src={image.url} alt={p.title} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-body text-sm text-foreground line-clamp-1">{p.title}</p>
                          <p className="font-body text-xs text-muted-foreground">
                            {qty} × {formatPrice(String(price), 'INR')}
                          </p>
                        </div>
                        <button
                          onClick={() => toggleProduct(product)}
                          className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              <hr className="border-border my-4" />

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between font-body text-xs mb-1.5">
                  <span className="text-muted-foreground">{totalItems} / {MIN_BUNDLE_SIZE} items</span>
                  {!isBundleReady && (
                    <span className="text-primary font-medium">Add {MIN_BUNDLE_SIZE - totalItems} more</span>
                  )}
                  {isBundleReady && (
                    <span className="text-primary font-medium flex items-center gap-1">
                      <Check size={12} /> Discount unlocked!
                    </span>
                  )}
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((totalItems / MIN_BUNDLE_SIZE) * 100, 100)}%` }}
                  />
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-2 font-body text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">{formatPrice(String(subtotal), 'INR')}</span>
                </div>
                {isBundleReady && (
                  <div className="flex justify-between text-primary">
                    <span>Bundle discount ({BUNDLE_DISCOUNT_PERCENT}%)</span>
                    <span>−{formatPrice(String(discount), 'INR')}</span>
                  </div>
                )}
                <hr className="border-border" />
                <div className="flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span>{formatPrice(String(finalTotal), 'INR')}</span>
                </div>
              </div>

              <button
                onClick={handleAddBundle}
                disabled={!isBundleReady || isLoading}
                className="w-full mt-5 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-body text-sm font-medium px-6 py-3.5 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingBag size={16} />
                {isLoading ? 'Adding...' : isBundleReady ? 'Add Bundle to Cart' : `Pick ${MIN_BUNDLE_SIZE - totalItems} more`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
