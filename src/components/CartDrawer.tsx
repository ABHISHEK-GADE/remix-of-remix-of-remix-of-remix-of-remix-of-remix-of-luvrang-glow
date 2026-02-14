import { X, Minus, Plus, ShoppingBag, ExternalLink, Loader2 } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { formatPrice } from '@/api/shopify';
import { useEffect } from 'react';

export default function CartDrawer() {
  const { items, isOpen, isLoading, isSyncing, closeCart, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = useCartStore(s => s.totalItems());
  const subtotal = useCartStore(s => s.subtotal());

  useEffect(() => { if (isOpen) syncCart(); }, [isOpen, syncCart]);

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
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h2 className="font-display text-lg font-semibold">Your Cart ({totalItems})</h2>
          <button onClick={closeCart} className="p-1 text-foreground/60 hover:text-foreground transition-colors" aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} className="text-muted-foreground/30 mb-4" />
              <p className="font-body text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-5">
              {items.map((item) => {
                const image = item.product.node.images?.edges?.[0]?.node;
                return (
                  <div key={item.variantId} className="flex gap-4">
                    <div className="w-20 h-20 rounded-md overflow-hidden bg-secondary flex-shrink-0">
                      {image && (
                        <img src={image.url} alt={image.altText || item.product.node.title} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-body text-sm font-medium text-foreground truncate">{item.product.node.title}</h3>
                      {item.variantTitle !== 'Default Title' && (
                        <p className="font-body text-xs text-muted-foreground mt-0.5">{item.variantTitle}</p>
                      )}
                      <p className="font-body text-sm font-medium mt-1">
                        {formatPrice(item.price.amount, item.price.currencyCode)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)} className="w-7 h-7 rounded border border-border flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors">
                          <Minus size={12} />
                        </button>
                        <span className="font-body text-sm w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)} className="w-7 h-7 rounded border border-border flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors">
                          <Plus size={12} />
                        </button>
                        <button onClick={() => removeItem(item.variantId)} className="ml-auto font-body text-xs text-muted-foreground hover:text-destructive transition-colors">
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

        {items.length > 0 && (
          <div className="border-t border-border px-6 py-5 space-y-4">
            <div className="bg-secondary/50 rounded-md px-4 py-3">
              <p className="font-body text-xs text-muted-foreground text-center">
                COD charges ₹59 at checkout • Prepaid orders ship free
              </p>
            </div>
            <div className="flex justify-between font-body text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold">{formatPrice(String(subtotal), items[0]?.price.currencyCode || 'INR')}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isLoading || isSyncing}
              className="w-full bg-primary text-primary-foreground font-body text-sm font-medium py-3.5 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading || isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ExternalLink className="w-4 h-4" /> Proceed to Checkout</>}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
