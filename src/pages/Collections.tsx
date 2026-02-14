import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCollections } from '@/api/shopify';
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
import SEO from '@/components/SEO';
import ProductCard from '@/components/ProductCard';
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
        products: c.node.products?.edges || [],
      }))
    : fallbackCollections.map((c) => ({ ...c, products: [] as any[] }));

  const featured = collections[0];
  const rest = collections.slice(1);

  return (
    <>
      <SEO
        title="All Collections"
        description="Browse all LuvRang rangoli collections — Festive, Wedding, Everyday & more. Premium handmade reusable rangoli for every celebration."
      />

      {/* Hero Banner */}
      <section className="relative overflow-hidden h-[240px] sm:h-[300px] md:h-[360px]">
        <img
          src={typeof featured.image === 'string' ? featured.image : featured.image}
          alt="Collections"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-background/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
              <Sparkles size={14} className="text-accent" />
              <span className="font-body text-[11px] uppercase tracking-widest text-background/90 font-medium">Handcrafted with Love</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-background">
              Our <span className="text-gradient-gold">Collections</span>
            </h1>
            <p className="font-body text-background/70 mt-3 max-w-lg mx-auto text-sm sm:text-base">
              Discover curated rangoli sets for every occasion
            </p>
          </div>
        </div>
      </section>

      <div className="container-luxury py-8 md:py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 font-body text-xs text-muted-foreground mb-10 animate-fade-up">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-foreground">Collections</span>
        </nav>

        {isLoading ? (
          <div className="space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="aspect-[4/5] rounded-xl bg-secondary animate-pulse" />
              <div className="space-y-4 flex flex-col justify-center">
                <div className="h-8 bg-secondary rounded animate-pulse w-1/2" />
                <div className="h-4 bg-secondary rounded animate-pulse w-3/4" />
                <div className="h-12 bg-secondary rounded animate-pulse w-40" />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-20">
            {/* Featured Collection — Large split layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center animate-fade-up">
              <Link
                to={`/collections/${featured.handle}`}
                className="group relative overflow-hidden rounded-2xl aspect-[4/5]"
              >
                <img
                  src={typeof featured.image === 'string' ? featured.image : featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
              <div className="flex flex-col justify-center">
                <span className="inline-flex items-center gap-1.5 font-body text-[10px] uppercase tracking-widest text-primary font-semibold mb-3">
                  <Sparkles size={12} /> Featured Collection
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                  {featured.title}
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-4 max-w-md">
                  {featured.description || 'Explore our most popular collection of premium handmade rangoli.'}
                </p>
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-body text-xs text-muted-foreground bg-secondary rounded-full px-3 py-1">
                    {featured.count}+ designs
                  </span>
                  <span className="font-body text-xs text-muted-foreground bg-secondary rounded-full px-3 py-1">
                    Made to Order
                  </span>
                </div>
                <Link
                  to={`/collections/${featured.handle}`}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body text-sm font-medium px-6 py-3 rounded-md hover:bg-primary/90 transition-colors w-fit"
                >
                  Explore {featured.title} <ArrowRight size={16} />
                </Link>

                {/* Preview products */}
                {featured.products.length > 0 && (
                  <div className="mt-8">
                    <p className="font-body text-xs text-muted-foreground mb-3">Popular in this collection</p>
                    <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                      {featured.products.slice(0, 4).map((p: any) => (
                        <Link
                          key={p.node.id}
                          to={`/product/${p.node.handle}`}
                          className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-secondary hover:ring-2 hover:ring-primary/30 transition-all"
                        >
                          {p.node.images?.edges?.[0]?.node?.url && (
                            <img
                              src={p.node.images.edges[0].node.url}
                              alt={p.node.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Other Collections Grid */}
            {rest.length > 0 && (
              <div>
                <div className="text-center mb-10 animate-fade-up">
                  <p className="font-body text-xs tracking-widest uppercase text-primary font-semibold mb-2">More To Explore</p>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">All Collections</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                  {rest.map((col, i) => (
                    <Link
                      key={col.handle}
                      to={`/collections/${col.handle}`}
                      className="group relative overflow-hidden rounded-xl animate-fade-up"
                      style={{ animationDelay: `${i * 0.08}s` }}
                    >
                      <div className="aspect-[4/5] overflow-hidden">
                        <img
                          src={typeof col.image === 'string' ? col.image : col.image}
                          alt={col.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
                        <span className="inline-block text-[9px] sm:text-[10px] uppercase tracking-widest font-body font-semibold text-accent mb-1.5">
                          {col.count}+ designs
                        </span>
                        <h3 className="font-display text-lg sm:text-xl md:text-2xl font-semibold text-background leading-tight">{col.title}</h3>
                        <p className="font-body text-background/60 text-[10px] sm:text-xs mt-1 line-clamp-2">{col.description}</p>
                        <span className="inline-flex items-center gap-1.5 mt-2.5 text-xs font-body font-medium text-accent group-hover:gap-2.5 transition-all duration-300">
                          Explore <ArrowRight size={13} />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Banner */}
            <section className="text-center py-12 px-6 rounded-2xl bg-primary/5 animate-fade-up">
              <h2 className="font-display text-xl sm:text-2xl font-bold mb-3">Can't Decide?</h2>
              <p className="font-body text-muted-foreground mb-6 max-w-md mx-auto text-sm">
                Browse all our products across every collection in one place.
              </p>
              <Link
                to="/collections/festive"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body text-sm font-medium px-8 py-3.5 rounded-md hover:bg-primary/90 transition-colors"
              >
                Shop All Products <ArrowRight size={16} />
              </Link>
            </section>
          </div>
        )}
      </div>
    </>
  );
}
