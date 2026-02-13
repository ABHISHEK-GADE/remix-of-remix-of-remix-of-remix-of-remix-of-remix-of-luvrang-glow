import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCollections } from '@/api/shopify';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import festiveImg from '@/assets/collection-festive.jpg';
import weddingImg from '@/assets/collection-wedding.jpg';
import everydayImg from '@/assets/collection-everyday.jpg';

const fallbackCollections = [
  { title: 'Festive', handle: 'festive', image: festiveImg, description: 'Diwali, Navratri & more' },
  { title: 'Wedding', handle: 'wedding', image: weddingImg, description: 'Bridal & ceremony decor' },
  { title: 'Everyday Decor', handle: 'everyday', image: everydayImg, description: 'Elegant daily touches' },
];

export default function CollectionsSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data: shopifyCollections } = useQuery({
    queryKey: ['collections'],
    queryFn: () => getCollections(10),
  });

  const collections = shopifyCollections?.length
    ? shopifyCollections.map((c) => ({
        title: c.title,
        handle: c.handle,
        image: c.image?.url || festiveImg,
        description: c.description || '',
      }))
    : fallbackCollections;

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.7;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="section-spacing bg-background">
      <div className="container-luxury">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Shop Collections</h2>
            <p className="font-body text-muted-foreground mt-1 text-sm">Find the perfect rangoli for your occasion</p>
          </div>
          <div className="hidden sm:flex gap-2">
            <button onClick={() => scroll('left')} className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors" aria-label="Scroll left">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => scroll('right')} className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors" aria-label="Scroll right">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 -mx-4 px-4">
          {collections.map((col) => (
            <Link
              key={col.handle}
              to={`/collections/${col.handle}`}
              className="group relative overflow-hidden rounded-lg aspect-[3/4] min-w-[260px] sm:min-w-[300px] md:min-w-[320px] flex-shrink-0 snap-start hover-lift"
            >
              <img
                src={typeof col.image === 'string' ? col.image : col.image}
                alt={col.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-xl font-semibold text-background">{col.title}</h3>
                <p className="font-body text-background/70 text-sm mt-1">{col.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
