import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search, Loader2, X } from 'lucide-react';
import { getProducts, type ShopifyProduct, formatPrice } from '@/api/shopify';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce(query, 350);

  // Search on debounced query change
  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setResults([]);
      setHasSearched(false);
      return;
    }
    let cancelled = false;
    const doSearch = async () => {
      setLoading(true);
      try {
        const products = await getProducts(10, debouncedQuery);
        if (!cancelled) {
          setResults(products);
          setHasSearched(true);
        }
      } catch {
        if (!cancelled) {
          setResults([]);
          setHasSearched(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    doSearch();
    return () => { cancelled = true; };
  }, [debouncedQuery]);

  // Reset on close
  useEffect(() => {
    if (!open) {
      setQuery('');
      setResults([]);
      setHasSearched(false);
    }
  }, [open]);

  const handleSelect = useCallback((handle: string) => {
    navigate(`/product/${handle}`);
    onOpenChange(false);
  }, [navigate, onOpenChange]);

  // Keyboard shortcut to open search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 gap-0 overflow-hidden">
        <DialogTitle className="sr-only">Search Products</DialogTitle>
        <div className="flex items-center border-b border-border px-4">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <Input
            ref={inputRef}
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-14 text-base"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-muted-foreground hover:text-foreground">
              <X size={16} />
            </button>
          )}
          {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground ml-1" />}
        </div>

        {/* Keyboard shortcut hint */}
        {!query && (
          <div className="p-6 text-center">
            <p className="text-sm text-muted-foreground">Start typing to search products</p>
            <p className="text-xs text-muted-foreground/60 mt-2">
              Tip: Press <kbd className="px-1.5 py-0.5 rounded border border-border bg-secondary text-[10px] font-mono">⌘K</kbd> to open search anytime
            </p>
          </div>
        )}

        {results.length > 0 && (
          <div className="max-h-80 overflow-y-auto p-2">
            {results.map((product) => {
              const img = product.node.images.edges[0]?.node.url;
              return (
                <button
                  key={product.node.id}
                  onClick={() => handleSelect(product.node.handle)}
                  className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-secondary transition-colors text-left group"
                >
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                    {img ? (
                      <img src={img} alt={product.node.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No img</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">{product.node.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {formatPrice(product.node.priceRange.minVariantPrice.amount, product.node.priceRange.minVariantPrice.currencyCode)}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {hasSearched && !loading && results.length === 0 && query.length >= 2 && (
          <div className="p-8 text-center">
            <p className="text-sm text-muted-foreground">No products found for "{query}"</p>
            <p className="text-xs text-muted-foreground/60 mt-1">Try a different search term</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}