import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
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
    <div className="container-luxury py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground capitalize">{title}</h1>
        {description && <p className="font-body text-muted-foreground mt-3 max-w-lg mx-auto">{description}</p>}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-lg bg-secondary animate-pulse" />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.node.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center font-body text-muted-foreground py-16">
          No products found in this collection.
        </p>
      )}
    </div>
  );
}
