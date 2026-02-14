import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProducts, getCollections, formatPrice } from '@/api/shopify';
import type { ShopifyProduct } from '@/api/shopify';
import ProductCard from '@/components/ProductCard';
import SEO from '@/components/SEO';
import { ChevronRight, SlidersHorizontal, X, ChevronDown, Grid3X3, LayoutGrid } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹500', min: 0, max: 500 },
  { label: '₹500 – ₹1,000', min: 500, max: 1000 },
  { label: '₹1,000 – ₹2,000', min: 1000, max: 2000 },
  { label: 'Over ₹2,000', min: 2000, max: Infinity },
];

function sortProducts(products: ShopifyProduct[], sort: SortOption): ShopifyProduct[] {
  const sorted = [...products];
  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => parseFloat(a.node.priceRange.minVariantPrice.amount) - parseFloat(b.node.priceRange.minVariantPrice.amount));
    case 'price-desc':
      return sorted.sort((a, b) => parseFloat(b.node.priceRange.minVariantPrice.amount) - parseFloat(a.node.priceRange.minVariantPrice.amount));
    case 'name-asc':
      return sorted.sort((a, b) => a.node.title.localeCompare(b.node.title));
    case 'name-desc':
      return sorted.sort((a, b) => b.node.title.localeCompare(a.node.title));
    default:
      return sorted;
  }
}

export default function Shop() {
  const [sort, setSort] = useState<SortOption>('featured');
  const [priceRange, setPriceRange] = useState(0);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [gridCols, setGridCols] = useState<3 | 4>(4);

  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ['products', 50],
    queryFn: () => getProducts(50),
  });

  const { data: collections } = useQuery({
    queryKey: ['collections'],
    queryFn: () => getCollections(20),
  });

  // Build a map of collection handle → product IDs
  const collectionProductMap = useMemo(() => {
    if (!collections) return new Map<string, Set<string>>();
    const map = new Map<string, Set<string>>();
    for (const col of collections) {
      const ids = new Set(col.node.products.edges.map((p) => p.node.id));
      map.set(col.node.handle, ids);
    }
    return map;
  }, [collections]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    let filtered = [...products];

    // Filter by collection
    if (selectedCollection) {
      const ids = collectionProductMap.get(selectedCollection);
      if (ids) {
        filtered = filtered.filter((p) => ids.has(p.node.id));
      }
    }

    // Filter by price
    const range = PRICE_RANGES[priceRange];
    if (range && range.max !== Infinity || range.min > 0) {
      filtered = filtered.filter((p) => {
        const price = parseFloat(p.node.priceRange.minVariantPrice.amount);
        return price >= range.min && price <= range.max;
      });
    }

    return sortProducts(filtered, sort);
  }, [products, selectedCollection, priceRange, sort, collectionProductMap]);

  const activeFilterCount = (selectedCollection ? 1 : 0) + (priceRange > 0 ? 1 : 0);

  const clearFilters = () => {
    setSelectedCollection(null);
    setPriceRange(0);
  };

  const FilterSidebar = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={isMobile ? '' : 'sticky top-24'}>
      <div className="space-y-6">
        {/* Collections filter */}
        <div>
          <h3 className="font-display text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <ChevronDown size={14} className="text-muted-foreground" />
            Collections
          </h3>
          <div className="space-y-1 pl-1">
            <button
              onClick={() => setSelectedCollection(null)}
              className={`block w-full text-left font-body text-sm py-1.5 px-2 rounded-md transition-colors ${
                !selectedCollection ? 'text-primary bg-primary/5 font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              }`}
            >
              All Products
            </button>
            {collections?.map((col) => (
              <button
                key={col.node.handle}
                onClick={() => setSelectedCollection(col.node.handle === selectedCollection ? null : col.node.handle)}
                className={`block w-full text-left font-body text-sm py-1.5 px-2 rounded-md transition-colors ${
                  selectedCollection === col.node.handle ? 'text-primary bg-primary/5 font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
              >
                {col.node.title}
                <span className="text-xs text-muted-foreground ml-1">({col.node.products.edges.length})</span>
              </button>
            ))}
          </div>
        </div>

        <hr className="border-border" />

        {/* Price filter */}
        <div>
          <h3 className="font-display text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <ChevronDown size={14} className="text-muted-foreground" />
            Price Range
          </h3>
          <div className="space-y-1 pl-1">
            {PRICE_RANGES.map((range, i) => (
              <button
                key={range.label}
                onClick={() => setPriceRange(i === priceRange ? 0 : i)}
                className={`block w-full text-left font-body text-sm py-1.5 px-2 rounded-md transition-colors ${
                  priceRange === i ? 'text-primary bg-primary/5 font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {activeFilterCount > 0 && (
          <>
            <hr className="border-border" />
            <button
              onClick={clearFilters}
              className="font-body text-xs font-medium text-destructive hover:text-destructive/80 transition-colors"
            >
              Clear all filters
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <>
      <SEO title="Shop All Products" description="Browse our full collection of premium handmade reusable rangoli designs at LuvRang." />
      <div className="container-luxury py-8 md:py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 font-body text-xs text-muted-foreground mb-8 animate-fade-up">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-foreground">Shop</span>
        </nav>

        {/* Page Title */}
        <div className="mb-10 animate-fade-up" style={{ animationDelay: '0.05s' }}>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Shop <span className="text-gradient-gold">All Products</span>
          </h1>
          <p className="font-body text-muted-foreground mt-2 max-w-2xl text-sm">
            Explore our entire range of handcrafted rangoli designs, made with love for every occasion.
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-border animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-3">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden inline-flex items-center gap-2 font-body text-sm text-foreground border border-border rounded-md px-3 py-2 hover:bg-secondary/50 transition-colors"
            >
              <SlidersHorizontal size={16} />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <p className="font-body text-xs text-muted-foreground hidden sm:block">
              {productsLoading ? 'Loading...' : `${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''}`}
            </p>

            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="hidden sm:inline-flex items-center gap-1 font-body text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={12} /> Clear filters
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Grid toggle — desktop only */}
            <div className="hidden md:flex items-center border border-border rounded-md overflow-hidden">
              <button
                onClick={() => setGridCols(3)}
                className={`p-2 transition-colors ${gridCols === 3 ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                aria-label="3-column grid"
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-2 transition-colors ${gridCols === 4 ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                aria-label="4-column grid"
              >
                <LayoutGrid size={16} />
              </button>
            </div>

            {/* Sort */}
            <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
              <SelectTrigger className="w-[160px] font-body text-sm bg-background border-border">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border z-50">
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Name: A – Z</SelectItem>
                <SelectItem value="name-desc">Name: Z – A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Main layout: sidebar + grid */}
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-56 shrink-0 animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <FilterSidebar />
          </aside>

          {/* Mobile sidebar overlay */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-foreground/30" onClick={() => setSidebarOpen(false)} />
              <div className="absolute left-0 top-0 bottom-0 w-72 bg-background border-r border-border p-6 overflow-y-auto animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-lg font-semibold text-foreground">Filters</h2>
                  <button onClick={() => setSidebarOpen(false)} className="p-1 text-muted-foreground hover:text-foreground">
                    <X size={20} />
                  </button>
                </div>
                <FilterSidebar isMobile />
              </div>
            </div>
          )}

          {/* Products grid */}
          <div className="flex-1 min-w-0">
            {productsLoading ? (
              <div className={`grid grid-cols-2 sm:grid-cols-3 ${gridCols === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-3 sm:gap-4 md:gap-6`}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <div className="aspect-[4/5] rounded-xl bg-secondary animate-pulse" />
                    <div className="h-4 bg-secondary rounded animate-pulse w-3/4" />
                    <div className="h-3 bg-secondary rounded animate-pulse w-1/2" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className={`grid grid-cols-2 sm:grid-cols-3 ${gridCols === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-3 sm:gap-4 md:gap-6`}>
                {filteredProducts.map((product, i) => (
                  <div key={product.node.id} className="animate-fade-up" style={{ animationDelay: `${(i % 4) * 0.08}s` }}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 rounded-2xl bg-secondary/50 border border-border/50 animate-fade-up">
                <p className="font-display text-lg font-semibold text-foreground mb-2">No products found</p>
                <p className="font-body text-muted-foreground mb-6 text-sm">Try adjusting your filters to find what you're looking for.</p>
                <button
                  onClick={clearFilters}
                  className="inline-block bg-primary text-primary-foreground font-body text-sm font-medium px-8 py-3 rounded-md hover:bg-primary/90 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
