import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCollections } from '@/api/shopify';
import { ArrowRight } from 'lucide-react';
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

  return (
    <section className="py-10 md:py-14 bg-secondary/40">
      <div className="container-luxury">
        <div className="text-center mb-8">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2">Curated For You</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Shop by Collection</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {collections.slice(0, 3).map((col, i) => (
            <Link
              key={col.handle}
              to={`/collections/${col.handle}`}
              className={`group relative overflow-hidden rounded-xl ${
                i === 0 ? 'col-span-2 sm:col-span-1 sm:row-span-2 aspect-[16/9] sm:aspect-auto sm:h-full' : 'aspect-[4/3]'
              }`}
            >
              <img
                src={typeof col.image === 'string' ? col.image : col.image}
                alt={col.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 md:p-6">
                <span className="inline-block text-[10px] uppercase tracking-widest font-body font-semibold text-accent mb-2">
                  {col.count}+ designs
                </span>
                <h3 className="font-display text-base md:text-xl font-semibold text-background leading-tight">{col.title}</h3>
                <p className="font-body text-background/60 text-[10px] sm:text-xs mt-0.5 sm:mt-1 line-clamp-1">{col.description}</p>
                <span className="inline-flex items-center gap-1.5 mt-3 text-xs font-body font-medium text-accent group-hover:gap-2.5 transition-all duration-300">
                  Explore <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
