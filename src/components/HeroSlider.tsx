import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import heroImage from '@/assets/hero-rangoli.jpg';
import festiveImg from '@/assets/collection-festive.jpg';
import weddingImg from '@/assets/collection-wedding.jpg';

const slides = [
  {
    image: heroImage,
    title: 'Reusable Handmade Rangoli',
    highlight: 'Crafted for Every Celebration',
    subtitle: 'Mess-free. Reusable. Premium festive decor.',
    cta: 'Shop Collection',
    link: '/collections/festive',
  },
  {
    image: festiveImg,
    title: 'Festive Collection',
    highlight: 'Diwali & Navratri Specials',
    subtitle: 'Celebrate with stunning handcrafted pieces.',
    cta: 'Explore Festive',
    link: '/collections/festive',
  },
  {
    image: weddingImg,
    title: 'Wedding Collection',
    highlight: 'Bridal & Ceremony Decor',
    subtitle: 'Make your special day even more beautiful.',
    cta: 'Shop Wedding',
    link: '/collections/wedding',
  },
];

export default function HeroSlider() {
  const [active, setActive] = useState(0);

  const next = useCallback(() => setActive((p) => (p + 1) % slides.length), []);
  const prev = useCallback(() => setActive((p) => (p - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

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
            className="font-body text-background/80 text-sm md:text-lg mt-4 md:mt-6 max-w-xl mx-auto animate-fade-up px-4"
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

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm text-background flex items-center justify-center hover:bg-background/40 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm text-background flex items-center justify-center hover:bg-background/40 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === active ? 'bg-background w-8' : 'bg-background/40'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
