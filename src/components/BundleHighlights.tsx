import { Link } from 'react-router-dom';
import { Package, ArrowRight } from 'lucide-react';

export default function BundleHighlights() {
  return (
    <section className="section-spacing bg-secondary/30">
      <div className="container-luxury">
        <div className="max-w-2xl mx-auto text-center animate-fade-up">
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-primary/10 flex items-center justify-center">
            <Package size={28} className="text-primary" />
          </div>
          <p className="font-body text-xs tracking-widest uppercase text-primary font-semibold mb-2">Mix & Match</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Build Your Own <span className="text-gradient-gold">Bundle</span>
          </h2>
          <p className="font-body text-muted-foreground mt-3 text-sm max-w-md mx-auto">
            Pick 3 or more products and get <strong>10% off</strong> your entire bundle. Mix your favourites and save!
          </p>
          <Link
            to="/bundle-builder"
            className="inline-flex items-center gap-2 mt-8 bg-primary text-primary-foreground font-body text-sm font-medium px-8 py-3.5 rounded-md hover:bg-primary/90 transition-colors"
          >
            Start Building
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
