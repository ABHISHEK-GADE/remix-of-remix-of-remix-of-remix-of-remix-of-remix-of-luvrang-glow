import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCollections } from '@/api/shopify';
import { ArrowRight, ChevronRight } from 'lucide-react';
import SEO from '@/components/SEO';
import festiveImg from '@/assets/collection-festive.jpg';
import weddingImg from '@/assets/collection-wedding.jpg';
import everydayImg from '@/assets/collection-everyday.jpg';

const fallbackCollections = [
  { title: 'Festive', handle: 'festive', image: festiveImg, description: 'Diwali, Navratri & more — celebrate with stunning handcrafted rangoli', count: 24 },
  { title: 'Wedding', handle: 'wedding', image: weddingImg, description: 'Bridal & ceremony decor — make your special day even more beautiful', count: 18 },
  { title: 'Everyday Decor', handle: 'everyday', image: everydayImg, description: 'Elegant daily touches — add beauty to your home every day', count: 12 },
];

export default function Collections() {
  const { data: shopifyCollections, isLoading } = useQuery({
    queryKey: ['collections'],
    queryFn: () => getCollections(20),
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
    <>
      <SEO
        title="All Collections"
        description="Browse all LuvRang rangoli collections — Festive, Wedding, Everyday & more. Premium handmade reusable rangoli for every celebration."
      />
      <div className="container-luxury py-8 md:py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 font-body text-xs text-muted-foreground mb-8 animate-fade-up">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-foreground">Collections</span>
        </nav>

        <div className="text-center mb-14 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <p className="font-body text-xs tracking-widest uppercase text-primary font-semibold mb-2">Browse</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Our <span className="text-gradient-gold">Collections</span>
          </h1>
          <p className="font-body text-muted-foreground mt-3 max-w-lg mx-auto">
            Discover curated rangoli sets for every occasion — from festive celebrations to everyday elegance.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] rounded-xl bg-secondary animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {collections.map((col, i) => (
              <Link
                key={col.handle}
                to={`/collections/${col.handle}`}
                className="group relative overflow-hidden rounded-xl aspect-[4/3] animate-fade-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <img
                  src={typeof col.image === 'string' ? col.image : col.image}
                  alt={col.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <span className="inline-block text-[10px] uppercase tracking-widest font-body font-semibold text-accent mb-2">
                    {col.count}+ designs
                  </span>
                  <h2 className="font-display text-xl md:text-2xl font-semibold text-background leading-tight">{col.title}</h2>
                  <p className="font-body text-background/60 text-xs sm:text-sm mt-1 line-clamp-2">{col.description}</p>
                  <span className="inline-flex items-center gap-1.5 mt-3 text-xs font-body font-medium text-accent group-hover:gap-2.5 transition-all duration-300">
                    Explore Collection <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
