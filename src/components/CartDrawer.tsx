import { X, Minus, Plus, ShoppingBag, ExternalLink, Loader2, Truck, CreditCard, Package, Check, Gift } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { formatPrice } from '@/api/shopify';
import { useEffect, useMemo } from 'react';

const BUNDLE_MIN = 3;
const BUNDLE_DISCOUNT_PERCENT = 5;
const FREE_SHIPPING_THRESHOLD = 999;

export default function CartDrawer() {
  const { items, isOpen, isLoading, isSyncing, closeCart, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = useCartStore(s => s.totalItems());
  const subtotal = useCartStore(s => s.subtotal());

  useEffect(() => { if (isOpen) syncCart(); }, [isOpen, syncCart]);

  const isBundleEligible = totalItems >= BUNDLE_MIN;
  const bundleDiscount = isBundleEligible ? subtotal * (BUNDLE_DISCOUNT_PERCENT / 100) : 0;
  const afterDiscount = subtotal - bundleDiscount;
  const freeShippingProgress = Math.min((afterDiscount / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const amountToFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - afterDiscount, 0);
  const itemsToBundle = Math.max(BUNDLE_MIN - totalItems, 0);

  const handleCheckout = () => {
    const url = getCheckoutUrl();
    if (url) {
      window.open(url, '_blank');
      closeCart();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-50" onClick={closeCart} />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full sm:max-w-md bg-background z-50 shadow-elevated flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={18} className="text-primary" />
            <h2 className="font-display text-lg font-semibold">Your Cart</h2>
            {totalItems > 0 && (
              <span className="bg-primary/10 text-primary text-xs font-body font-semibold px-2 py-0.5 rounded-full">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
          <button onClick={closeCart} className="p-1.5 rounded-md text-foreground/60 hover:text-foreground hover:bg-secondary transition-colors" aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress */}
        {items.length > 0 && (
          <div className="px-6 py-3 bg-secondary/30 border-b border-border">
            <div className="flex items-center justify-between font-body text-xs mb-1.5">
              {amountToFreeShipping > 0 ? (
                <span className="text-muted-foreground">
                  Add <strong className="text-foreground">{formatPrice(String(amountToFreeShipping), 'INR')}</strong> for free shipping
                </span>
              ) : (
                <span className="text-primary font-medium flex items-center gap-1">
                  <Check size={12} /> Free shipping unlocked!
                </span>
              )}
              <Truck size={14} className={amountToFreeShipping > 0 ? 'text-muted-foreground' : 'text-primary'} />
            </div>
            <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Bundle Nudge */}
        {items.length > 0 && !isBundleEligible && (
          <div className="px-6 py-3 bg-accent/5 border-b border-border">
            <div className="flex items-center gap-2">
              <Gift size={14} className="text-accent-foreground flex-shrink-0" />
              <p className="font-body text-xs text-accent-foreground">
                Add <strong>{itemsToBundle} more {itemsToBundle === 1 ? 'item' : 'items'}</strong> to unlock <strong>{BUNDLE_DISCOUNT_PERCENT}% bundle discount!</strong>
              </p>
            </div>
          </div>
        )}

        {isBundleEligible && (
          <div className="px-6 py-3 bg-primary/5 border-b border-border">
            <div className="flex items-center gap-2">
              <Package size={14} className="text-primary flex-shrink-0" />
              <p className="font-body text-xs text-primary font-medium flex items-center gap-1">
                <Check size={12} /> Bundle discount of {BUNDLE_DISCOUNT_PERCENT}% applied! You save {formatPrice(String(bundleDiscount), 'INR')}
              </p>
            </div>
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center mb-5">
                <ShoppingBag size={32} className="text-muted-foreground/30" />
              </div>
              <p className="font-display text-base font-semibold text-foreground mb-1">Your cart is empty</p>
              <p className="font-body text-sm text-muted-foreground mb-6">Discover our beautiful rangoli collection</p>
              <button
                onClick={closeCart}
                className="font-body text-sm text-primary font-medium hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, i) => {
                const image = item.product.node.images?.edges?.[0]?.node;
                const lineTotal = parseFloat(item.price.amount) * item.quantity;
                return (
                  <div
                    key={item.variantId}
                    className="flex gap-4 p-3 rounded-xl bg-secondary/20 border border-border/30 animate-fade-up"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <div className="w-20 h-24 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                      {image && (
                        <img src={image.url} alt={image.altText || item.product.node.title} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-sm font-medium text-foreground truncate">{item.product.node.title}</h3>
                      {item.variantTitle !== 'Default Title' && (
                        <p className="font-body text-xs text-muted-foreground mt-0.5">{item.variantTitle}</p>
                      )}
                      <p className="font-body text-sm font-semibold text-foreground mt-1">
                        {formatPrice(String(lineTotal), item.price.currencyCode)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border border-border rounded-md overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-secondary transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="font-body text-sm w-7 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-secondary transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.variantId)}
                          className="ml-auto font-body text-xs text-muted-foreground hover:text-destructive transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer / Summary */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-5 space-y-3 bg-background">
            {/* Pricing Breakdown */}
            <div className="space-y-2 font-body text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">{formatPrice(String(subtotal), 'INR')}</span>
              </div>
              {isBundleEligible && (
                <div className="flex justify-between text-primary">
                  <span>Bundle discount ({BUNDLE_DISCOUNT_PERCENT}%)</span>
                  <span>−{formatPrice(String(bundleDiscount), 'INR')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className={amountToFreeShipping <= 0 ? 'text-primary font-medium' : 'text-foreground'}>
                  {amountToFreeShipping <= 0 ? 'FREE' : 'Calculated at checkout'}
                </span>
              </div>
              <hr className="border-border" />
              <div className="flex justify-between font-semibold text-base pt-1">
                <span>Estimated Total</span>
                <span>{formatPrice(String(afterDiscount), 'INR')}</span>
              </div>
              {isBundleEligible && (
                <p className="text-xs text-primary font-medium text-right">
                  You're saving {formatPrice(String(bundleDiscount), 'INR')}!
                </p>
              )}
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-4 py-2">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Truck size={12} />
                <span className="font-body text-[10px]">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <CreditCard size={12} />
                <span className="font-body text-[10px]">Secure Payment</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Package size={12} />
                <span className="font-body text-[10px]">COD Available</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={isLoading || isSyncing}
              className="w-full bg-primary text-primary-foreground font-body text-sm font-semibold py-4 rounded-md hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
            >
              {isLoading || isSyncing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <ExternalLink className="w-4 h-4" />
                  Proceed to Checkout
                </>
              )}
            </button>

            <p className="font-body text-[10px] text-muted-foreground text-center">
              COD charges ₹59 at checkout • Prepaid orders ship free above ₹999
            </p>
          </div>
        )}
      </div>
    </>
  );
}
