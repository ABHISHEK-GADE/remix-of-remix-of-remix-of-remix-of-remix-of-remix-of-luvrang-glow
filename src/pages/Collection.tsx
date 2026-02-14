import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { getCollectionByHandle, getProducts } from '@/api/shopify';
import SEO from '@/components/SEO';

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
    <>
      <SEO title={title} description={description || `Shop the ${title} collection at LuvRang. Premium handmade reusable rangoli.`} />
      <div className="container-luxury py-8 md:py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 font-body text-xs text-muted-foreground mb-8 animate-fade-up">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-foreground capitalize">{title}</span>
        </nav>

        <div className="text-center mb-14 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <p className="font-body text-xs tracking-widest uppercase text-primary font-semibold mb-2">Collection</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground capitalize">
            {title.split(' ').length > 1 ? (
              <>
                {title.split(' ').slice(0, -1).join(' ')}{' '}
                <span className="text-gradient-gold">{title.split(' ').slice(-1)}</span>
              </>
            ) : (
              <span className="text-gradient-gold">{title}</span>
            )}
          </h1>
          {description && <p className="font-body text-muted-foreground mt-3 max-w-lg mx-auto">{description}</p>}
          {!isLoading && (
            <p className="font-body text-xs text-muted-foreground mt-2">
              {products.length} {products.length === 1 ? 'product' : 'products'}
            </p>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-square rounded-xl bg-secondary animate-pulse" />
                <div className="h-4 bg-secondary rounded animate-pulse w-3/4" />
                <div className="h-3 bg-secondary rounded animate-pulse w-1/2" />
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {products.map((product, i) => (
              <div key={product.node.id} className="animate-fade-up" style={{ animationDelay: `${(i % 4) * 0.08}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-2xl bg-secondary/50 border border-border/50 animate-fade-up">
            <p className="font-display text-lg font-semibold text-foreground mb-2">No products found</p>
            <p className="font-body text-muted-foreground mb-6">This collection is being curated for you.</p>
            <Link to="/" className="inline-block bg-primary text-primary-foreground font-body text-sm font-medium px-8 py-3.5 rounded-md hover:bg-primary/90 transition-colors">
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
