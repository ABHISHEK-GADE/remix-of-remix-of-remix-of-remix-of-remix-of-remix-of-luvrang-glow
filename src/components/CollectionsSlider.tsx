import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCollections } from '@/api/shopify';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback, useRef } from 'react';

export default function CollectionsSlider() {
  const { data: shopifyCollections, isLoading } = useQuery({
    queryKey: ['collections'],
    queryFn: () => getCollections(10),
  });

  const collections = (shopifyCollections || []).map((c) => ({
    title: c.node.title,
    handle: c.node.handle,
    image: c.node.image?.url || '',
    description: c.node.description || '',
    count: c.node.products?.edges?.length || 0,
  }));

  const [active, setActive] = useState(0);
  const total = collections.length;
  const scrollRef = useRef<HTMLDivElement>(null);

  const next = useCallback(() => { if (total > 0) setActive((p) => (p + 1) % total); }, [total]);
  const prev = useCallback(() => { if (total > 0) setActive((p) => (p - 1 + total) % total); }, [total]);

  useEffect(() => {
    if (total === 0) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next, total]);

  const hasInteracted = useRef(false);

  useEffect(() => {
    if (!hasInteracted.current) {
      hasInteracted.current = true;
      return;
    }
    if (scrollRef.current) {
      const child = scrollRef.current.children[active] as HTMLElement;
      if (child) {
        child.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [active]);

  if (isLoading) {
    return (
      <section className="py-10 md:py-14 bg-secondary/40">
        <div className="container-luxury">
          <div className="text-center mb-14">
            <p className="font-body text-xs tracking-widest uppercase text-primary font-semibold mb-2">Browse</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Shop by <span className="text-gradient-gold">Collection</span>
            </h2>
          </div>
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 rounded-xl bg-secondary animate-pulse" style={{ width: 'clamp(200px, 45vw, 320px)', aspectRatio: '4/5' }} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (collections.length === 0) return null;

  return (
    <section className="py-10 md:py-14 bg-secondary/40">
      <div className="container-luxury">
        <div className="text-center mb-14">
          <div className="text-center flex-1">
            <p className="font-body text-xs tracking-widest uppercase text-primary font-semibold mb-2">Browse</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Shop by <span className="text-gradient-gold">Collection</span>
            </h2>
            <p className="font-body text-muted-foreground mt-3 text-sm">Find the perfect rangoli for your occasion</p>
          </div>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
          >
            {collections.map((col, i) => (
              <Link
                key={col.handle}
                to={`/collections/${col.handle}`}
                className={`group relative flex-shrink-0 overflow-hidden rounded-xl snap-center transition-all duration-500 ${
                  i === active ? 'ring-2 ring-primary/30 ring-offset-2 ring-offset-secondary/40' : ''
                }`}
                style={{ width: 'clamp(200px, 45vw, 320px)' }}
                onMouseEnter={() => setActive(i)}
              >
                <div className="aspect-[4/5] relative overflow-hidden">
                  {col.image ? (
                    <img
                      src={col.image}
                      alt={col.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-secondary flex items-center justify-center">
                      <span className="font-display text-lg text-muted-foreground">{col.title}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <span className="inline-block text-[9px] sm:text-[10px] uppercase tracking-widest font-body font-semibold text-accent mb-1.5">
                      {col.count}+ designs
                    </span>
                    <h3 className="font-display text-lg sm:text-xl font-semibold text-background leading-tight">
                      {col.title}
                    </h3>
                    <p className="font-body text-background/70 text-[10px] sm:text-xs mt-1 line-clamp-1">
                      {col.description}
                    </p>
                    <span className="inline-flex items-center gap-1 mt-2.5 text-[11px] sm:text-xs font-body font-medium text-accent group-hover:gap-2 transition-all duration-300">
                      Explore <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {total > 3 && (
            <>
              <button
                onClick={prev}
                className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background shadow-card text-foreground items-center justify-center hover:bg-secondary transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background shadow-card text-foreground items-center justify-center hover:bg-secondary transition-colors"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>

        <div className="flex justify-center gap-1.5 mt-5">
          {collections.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? 'bg-primary w-6' : 'bg-border w-1.5'
              }`}
              aria-label={`Go to collection ${i + 1}`}
            />
          ))}
        </div>

        <div className="text-center mt-10 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <Link
            to="/collections"
            className="inline-block border border-primary text-primary font-body text-sm font-medium px-8 py-3 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            View All Collections
          </Link>
        </div>
      </div>
    </section>
  );
}
