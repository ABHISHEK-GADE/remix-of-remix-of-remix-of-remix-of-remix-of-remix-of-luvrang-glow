import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, ChevronDown } from 'lucide-react';
import type { ShopifyProduct, ShopifyVariant } from '@/api/shopify';

// Mock product for demo
const mockProduct: ShopifyProduct = {
  id: '1',
  handle: 'royal-blue-mandala',
  title: 'Royal Blue Mandala Rangoli',
  description: 'A stunning handmade rangoli featuring intricate blue mandala patterns with gold accents. Perfect for Diwali, housewarming, and festive celebrations.',
  descriptionHtml: '<p>A stunning handmade rangoli featuring intricate blue mandala patterns with gold accents. Perfect for Diwali, housewarming, and festive celebrations.</p>',
  tags: ['festive', 'mandala', 'blue'],
  productType: 'Rangoli',
  images: { edges: [] },
  variants: {
    edges: [
      {
        node: {
          id: 'v1-small',
          title: 'Small (12 inch)',
          availableForSale: true,
          price: { amount: '1299', currencyCode: 'INR' },
          compareAtPrice: null,
          selectedOptions: [{ name: 'Size', value: 'Small (12 inch)' }],
          image: null,
        },
      },
      {
        node: {
          id: 'v1-medium',
          title: 'Medium (18 inch)',
          availableForSale: true,
          price: { amount: '1899', currencyCode: 'INR' },
          compareAtPrice: null,
          selectedOptions: [{ name: 'Size', value: 'Medium (18 inch)' }],
          image: null,
        },
      },
      {
        node: {
          id: 'v1-large',
          title: 'Large (24 inch)',
          availableForSale: true,
          price: { amount: '2599', currencyCode: 'INR' },
          compareAtPrice: null,
          selectedOptions: [{ name: 'Size', value: 'Large (24 inch)' }],
          image: null,
        },
      },
    ],
  },
  priceRange: { minVariantPrice: { amount: '1299', currencyCode: 'INR' }, maxVariantPrice: { amount: '2599', currencyCode: 'INR' } },
  compareAtPriceRange: { minVariantPrice: { amount: '0', currencyCode: 'INR' }, maxVariantPrice: { amount: '0', currencyCode: 'INR' } },
};

export default function Product() {
  const { handle } = useParams<{ handle: string }>();
  const { addItem } = useCart();
  const product = mockProduct; // Replace with API call when Shopify is connected

  const variants = product.variants.edges.map((e) => e.node);
  const [selectedVariant, setSelectedVariant] = useState<ShopifyVariant>(variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [careOpen, setCareOpen] = useState(false);
  const [deliveryOpen, setDeliveryOpen] = useState(false);

  const handleAddToCart = () => {
    addItem(product, selectedVariant, quantity);
  };

  return (
    <div className="container-luxury py-8 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg bg-secondary overflow-hidden">
            {product.images.edges[0] ? (
              <img
                src={product.images.edges[0].node.url}
                alt={product.images.edges[0].node.altText || product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground font-body text-sm">
                Product Image
              </div>
            )}
          </div>
          {product.images.edges.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.edges.slice(0, 4).map((img, i) => (
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
            <span className="text-2xl font-semibold text-foreground">
              ₹{parseFloat(selectedVariant.price.amount).toLocaleString('en-IN')}
            </span>
            {selectedVariant.compareAtPrice && parseFloat(selectedVariant.compareAtPrice.amount) > 0 && (
              <span className="text-muted-foreground line-through">
                ₹{parseFloat(selectedVariant.compareAtPrice.amount).toLocaleString('en-IN')}
              </span>
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
                Size
              </label>
              <div className="flex flex-wrap gap-2">
                {variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`font-body text-sm px-4 py-2.5 rounded-md border transition-colors ${
                      selectedVariant.id === v.id
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
            <label className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-3 block">
              Quantity
            </label>
            <div className="inline-flex items-center border border-border rounded-md">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2.5 text-foreground/60 hover:text-foreground transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="w-12 text-center font-body text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2.5 text-foreground/60 hover:text-foreground transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="mt-8 w-full bg-primary text-primary-foreground font-body text-sm font-medium py-4 rounded-md hover:bg-primary/90 transition-colors"
          >
            Add to Cart — ₹{(parseFloat(selectedVariant.price.amount) * quantity).toLocaleString('en-IN')}
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
            <button
              onClick={() => setCareOpen(!careOpen)}
              className="w-full flex items-center justify-between py-4 font-body text-sm text-foreground"
            >
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

            <button
              onClick={() => setDeliveryOpen(!deliveryOpen)}
              className="w-full flex items-center justify-between py-4 font-body text-sm text-foreground"
            >
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
