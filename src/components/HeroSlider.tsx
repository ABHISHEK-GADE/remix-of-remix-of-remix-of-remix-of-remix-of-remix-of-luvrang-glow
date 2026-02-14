import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCollections } from '@/api/shopify';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroSlider() {
  const { data: shopifyCollections } = useQuery({
    queryKey: ['collections'],
    queryFn: () => getCollections(10),
  });

  const slides = (shopifyCollections || [])
    .filter((c) => c.node.image?.url)
    .slice(0, 5)
    .map((c) => ({
      image: c.node.image!.url,
      title: c.node.title,
      highlight: c.node.description?.slice(0, 40) || 'Handcrafted with Love',
      subtitle: c.node.description || 'Premium handmade reusable rangoli decor.',
      cta: `Shop ${c.node.title}`,
      link: `/collections/${c.node.handle}`,
    }));

  const [active, setActive] = useState(0);
  const total = slides.length;

  const next = useCallback(() => { if (total > 0) setActive((p) => (p + 1) % total); }, [total]);
  const prev = useCallback(() => { if (total > 0) setActive((p) => (p - 1 + total) % total); }, [total]);

  useEffect(() => {
    if (total === 0) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, total]);

  if (slides.length === 0) {
    return (
      <section className="relative overflow-hidden h-[50svh] sm:h-[480px] md:h-[560px] lg:h-[640px] xl:h-[720px] bg-secondary flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Premium Handmade <span className="text-gradient-gold">Rangoli</span>
          </h1>
          <p className="font-body text-muted-foreground mt-4 max-w-xl mx-auto">Mess-free. Reusable. Crafted for every celebration.</p>
          <Link to="/shop" className="inline-block mt-6 bg-primary text-primary-foreground font-body text-sm font-medium px-8 py-3.5 rounded-md hover:bg-primary/90 transition-colors">
            Shop Now
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden h-[50svh] sm:h-[480px] md:h-[560px] lg:h-[640px] xl:h-[720px]">
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === active ? 1 : 0, zIndex: i === active ? 1 : 0 }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "auto"}
          />
          <div className="absolute inset-0 bg-foreground/45" />
        </div>
      ))}

      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container-luxury text-center">
          <h1
            key={`title-${active}`}
            className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-background leading-tight max-w-4xl mx-auto animate-fade-up px-4"
          >
            {slides[active].title} —{' '}
            <span className="text-gradient-gold">{slides[active].highlight}</span>
          </h1>
          <p
            key={`sub-${active}`}
            className="font-body text-background/90 text-sm md:text-lg mt-4 md:mt-6 max-w-xl mx-auto animate-fade-up px-4"
            style={{ animationDelay: '0.15s' }}
          >
            {slides[active].subtitle}
          </p>
          <Link
            key={`cta-${active}`}
            to={slides[active].link}
            className="inline-block mt-6 md:mt-8 bg-background text-foreground font-body text-xs sm:text-sm font-medium tracking-wide px-6 sm:px-8 py-3 sm:py-3.5 rounded-md hover:bg-background/90 transition-colors animate-fade-up"
            style={{ animationDelay: '0.3s' }}
          >
            {slides[active].cta}
          </Link>
        </div>
      </div>

      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm text-background flex items-center justify-center hover:bg-background/40 transition-colors" aria-label="Previous slide">
        <ChevronLeft size={20} />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm text-background flex items-center justify-center hover:bg-background/40 transition-colors" aria-label="Next slide">
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === active ? 'bg-background w-8' : 'bg-background/40'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
