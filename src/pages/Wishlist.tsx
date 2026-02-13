import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

export default function Wishlist() {
  return (
    <>
      <SEO title="My Wishlist" description="Save your favorite LuvRang rangoli designs and shop them when you are ready." />
      <div className="container-luxury section-spacing text-center">
        <div className="animate-fade-up">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
            <Heart size={32} className="text-destructive" />
          </div>
          <h1 className="font-display text-3xl font-bold mb-3">My Wishlist</h1>
          <p className="text-muted-foreground font-body max-w-md mx-auto mb-10">
            Save your favorite rangoli designs here. Browse our collections and tap the heart icon to add items you love.
          </p>
        </div>

        <div className="animate-fade-up" style={{ animationDelay: '0.15s' }}>
          <Link
            to="/collections/festive"
            className="inline-block bg-primary text-primary-foreground font-body text-sm font-medium px-8 py-3.5 rounded-md hover:bg-primary/90 transition-colors"
          >
            Browse Collections
          </Link>
        </div>
      </div>
    </>
  );
}
