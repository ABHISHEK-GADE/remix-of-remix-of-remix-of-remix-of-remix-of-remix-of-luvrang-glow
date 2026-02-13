import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search, Loader2 } from 'lucide-react';
import { getProducts, type ShopifyProduct, formatPrice } from '@/api/shopify';

export function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (value: string) => {
    setQuery(value);
    if (value.length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const products = await getProducts(10, value);
      setResults(products);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (handle: string) => {
    navigate(`/product/${handle}`);
    onOpenChange(false);
    setQuery('');
    setResults([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 gap-0">
        <div className="flex items-center border-b border-border px-4">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-12"
            autoFocus
          />
          {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
        </div>
        {results.length > 0 && (
          <div className="max-h-80 overflow-y-auto p-2">
            {results.map((product) => {
              const img = product.node.images.edges[0]?.node.url;
              return (
                <button
                  key={product.node.id}
                  onClick={() => handleSelect(product.node.handle)}
                  className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-accent/10 transition-colors text-left"
                >
                  {img && (
                    <img src={img} alt={product.node.title} className="w-12 h-12 rounded object-cover" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{product.node.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatPrice(product.node.priceRange.minVariantPrice.amount, product.node.priceRange.minVariantPrice.currencyCode)}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
        {query.length >= 2 && !loading && results.length === 0 && (
          <p className="p-6 text-center text-sm text-muted-foreground">No products found.</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
