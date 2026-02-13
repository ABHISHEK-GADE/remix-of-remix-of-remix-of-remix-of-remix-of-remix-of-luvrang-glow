import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { createCheckout, isShopifyConfigured } from '@/api/shopify';
import { useState } from 'react';
import { toast } from 'sonner';

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal, totalItems } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (!isShopifyConfigured()) {
      toast.error('Shopify is not configured yet. Please add your store credentials.');
      return;
    }

    setCheckingOut(true);
    try {
      const lineItems = items.map((item) => ({
        variantId: item.variantId,
        quantity: item.quantity,
      }));
      const checkout = await createCheckout(lineItems);
      window.location.href = checkout.webUrl;
    } catch (err) {
      toast.error('Failed to create checkout. Please try again.');
      console.error(err);
    } finally {
      setCheckingOut(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-50" onClick={closeCart} />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-background z-50 shadow-elevated flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h2 className="font-display text-lg font-semibold">Your Cart ({totalItems})</h2>
          <button onClick={closeCart} className="p-1 text-foreground/60 hover:text-foreground transition-colors" aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} className="text-muted-foreground/30 mb-4" />
              <p className="font-body text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-5">
              {items.map((item) => {
                const image = item.variant.image || item.product.images.edges[0]?.node;
                return (
                  <div key={item.variantId} className="flex gap-4">
                    <div className="w-20 h-20 rounded-md overflow-hidden bg-secondary flex-shrink-0">
                      {image && (
                        <img src={image.url} alt={image.altText || item.product.title} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-body text-sm font-medium text-foreground truncate">{item.product.title}</h3>
                      {item.variant.title !== 'Default Title' && (
                        <p className="font-body text-xs text-muted-foreground mt-0.5">{item.variant.title}</p>
                      )}
                      <p className="font-body text-sm font-medium mt-1">
                        ₹{parseFloat(item.variant.price.amount).toLocaleString('en-IN')}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="w-7 h-7 rounded border border-border flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-body text-sm w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          className="w-7 h-7 rounded border border-border flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
                        >
                          <Plus size={12} />
                        </button>
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

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-5 space-y-4">
            <div className="bg-secondary/50 rounded-md px-4 py-3">
              <p className="font-body text-xs text-muted-foreground text-center">
                COD charges ₹59 at checkout • Prepaid orders ship free
              </p>
            </div>
            <div className="flex justify-between font-body text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={checkingOut}
              className="w-full bg-primary text-primary-foreground font-body text-sm font-medium py-3.5 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {checkingOut ? 'Redirecting...' : 'Checkout'}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
