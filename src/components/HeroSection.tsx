import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-rangoli.jpg';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Premium handmade rangoli by LuvRang"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/40" />
      </div>

      <div className="relative container-luxury py-28 md:py-40 lg:py-52 text-center">
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-background leading-tight max-w-4xl mx-auto animate-fade-up">
          Reusable Handmade Rangoli —{' '}
          <span className="text-gradient-gold">Crafted for Every Celebration</span>
        </h1>
        <p className="font-body text-background/80 text-base md:text-lg mt-6 max-w-xl mx-auto animate-fade-up" style={{ animationDelay: '0.15s' }}>
          Mess-free. Reusable. Premium festive decor.
        </p>
        <Link
          to="/collections/festive"
          className="inline-block mt-8 bg-background text-foreground font-body text-sm font-medium tracking-wide px-8 py-3.5 rounded-md hover:bg-background/90 transition-colors animate-fade-up"
          style={{ animationDelay: '0.3s' }}
        >
          Shop Collection
        </Link>
      </div>
    </section>
  );
}
