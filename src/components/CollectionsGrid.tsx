import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCollections } from '@/api/shopify';

export default function CollectionsGrid() {
  const { data: shopifyCollections, isLoading } = useQuery({
    queryKey: ['collections'],
    queryFn: () => getCollections(10),
  });

  const collections = (shopifyCollections || []).map((c) => ({
    title: c.node.title,
    handle: c.node.handle,
    image: c.node.image?.url || '',
    description: c.node.description || '',
  }));

  return (
    <section className="section-spacing bg-background">
      <div className="container-luxury">
        <div className="text-center mb-14">
          <p className="font-body text-xs tracking-widest uppercase text-primary font-semibold mb-2">Browse</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Shop <span className="text-gradient-gold">Collections</span>
          </h2>
          <p className="font-body text-muted-foreground mt-3 text-sm">Find the perfect rangoli for your occasion</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-xl bg-secondary animate-pulse" />
            ))}
          </div>
        ) : collections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {collections.slice(0, 6).map((col, i) => (
              <Link
                key={col.handle}
                to={`/collections/${col.handle}`}
                className="group relative overflow-hidden rounded-xl aspect-[3/4] hover-lift animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {col.image ? (
                  <img
                    src={col.image}
                    alt={col.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-secondary flex items-center justify-center">
                    <span className="font-display text-2xl text-muted-foreground">{col.title}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-xl font-semibold text-background">{col.title}</h3>
                  <p className="font-body text-background/70 text-sm mt-1">{col.description}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center font-body text-muted-foreground py-8">No collections available yet.</p>
        )}
      </div>
    </section>
  );
}
