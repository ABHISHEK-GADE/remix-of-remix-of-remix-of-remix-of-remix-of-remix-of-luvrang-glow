import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCollections } from '@/api/shopify';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import festiveImg from '@/assets/collection-festive.jpg';
import weddingImg from '@/assets/collection-wedding.jpg';
import everydayImg from '@/assets/collection-everyday.jpg';

const fallbackCollections = [
  { title: 'Festive', handle: 'festive', image: festiveImg, description: 'Diwali, Navratri & more', count: 24 },
  { title: 'Wedding', handle: 'wedding', image: weddingImg, description: 'Bridal & ceremony decor', count: 18 },
  { title: 'Everyday Decor', handle: 'everyday', image: everydayImg, description: 'Elegant daily touches', count: 12 },
];

export default function CollectionsSlider() {
  const { data: shopifyCollections } = useQuery({
    queryKey: ['collections'],
    queryFn: () => getCollections(10),
  });

  const collections = shopifyCollections?.length
    ? shopifyCollections.map((c) => ({
        title: c.node.title,
        handle: c.node.handle,
        image: c.node.image?.url || festiveImg,
        description: c.node.description || '',
        count: c.node.products?.edges?.length || 0,
      }))
    : fallbackCollections;

  const [active, setActive] = useState(0);
  const total = collections.length;

  const next = useCallback(() => setActive((p) => (p + 1) % total), [total]);
  const prev = useCallback(() => setActive((p) => (p - 1 + total) % total), [total]);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="py-10 md:py-14 bg-secondary/40">
      <div className="container-luxury">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2">Curated For You</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Shop by Collection</h2>
          </div>
          <Link
            to="/collections"
            className="hidden sm:inline-flex items-center gap-1.5 font-body text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {collections.map((col) => (
              <Link
                key={col.handle}
                to={`/collections/${col.handle}`}
                className="group relative flex-shrink-0 w-full aspect-[16/9] sm:aspect-[21/9]"
              >
                <img
                  src={typeof col.image === 'string' ? col.image : col.image}
                  alt={col.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-10">
                  <span className="inline-block text-[10px] uppercase tracking-widest font-body font-semibold text-accent mb-2">
                    {col.count}+ designs
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-background leading-tight">
                    {col.title}
                  </h3>
                  <p className="font-body text-background/60 text-xs sm:text-sm mt-1 max-w-md line-clamp-1">
                    {col.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 mt-3 text-xs sm:text-sm font-body font-medium text-accent group-hover:gap-2.5 transition-all duration-300">
                    Explore <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Nav arrows */}
          {total > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-background/20 backdrop-blur-sm text-background flex items-center justify-center hover:bg-background/40 transition-colors"
                aria-label="Previous collection"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-background/20 backdrop-blur-sm text-background flex items-center justify-center hover:bg-background/40 transition-colors"
                aria-label="Next collection"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          {/* Dots */}
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 sm:gap-2">
            {collections.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active ? 'bg-background w-6 sm:w-8' : 'bg-background/40 w-2'
                }`}
                aria-label={`Go to collection ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile View All */}
        <div className="sm:hidden text-center mt-6">
          <Link
            to="/collections"
            className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-primary hover:text-primary/80 transition-colors border border-primary rounded-md px-6 py-2.5"
          >
            View All Collections <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
