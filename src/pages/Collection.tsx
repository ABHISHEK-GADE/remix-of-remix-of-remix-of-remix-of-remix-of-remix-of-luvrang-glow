import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { getCollectionByHandle, getProducts } from '@/api/shopify';

export default function Collection() {
  const { handle } = useParams<{ handle: string }>();

  const { data: collection, isLoading: collectionLoading } = useQuery({
    queryKey: ['collection', handle],
    queryFn: () => getCollectionByHandle(handle!),
    enabled: !!handle,
  });

  const { data: allProducts, isLoading: productsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(20),
    enabled: !handle,
  });

  const isLoading = handle ? collectionLoading : productsLoading;
  const products = collection?.products?.edges ?? allProducts ?? [];
  const title = collection?.title ?? handle?.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()) ?? 'All Products';
  const description = collection?.description ?? '';

  return (
    <div className="container-luxury py-8 md:py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 font-body text-xs text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight size={12} />
        <span className="text-foreground capitalize">{title}</span>
      </nav>

      <div className="text-center mb-12">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground capitalize">{title}</h1>
        {description && <p className="font-body text-muted-foreground mt-3 max-w-lg mx-auto">{description}</p>}
        {!isLoading && (
          <p className="font-body text-xs text-muted-foreground mt-2">
            {products.length} {products.length === 1 ? 'product' : 'products'}
          </p>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-square rounded-lg bg-secondary animate-pulse" />
              <div className="h-4 bg-secondary rounded animate-pulse w-3/4" />
              <div className="h-3 bg-secondary rounded animate-pulse w-1/2" />
            </div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.node.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="font-body text-muted-foreground mb-4">No products found in this collection yet.</p>
          <Link to="/" className="inline-block bg-primary text-primary-foreground font-body text-sm font-medium px-8 py-3.5 rounded-md hover:bg-primary/90 transition-colors">
            Back to Home
          </Link>
        </div>
      )}
    </div>
  );
}