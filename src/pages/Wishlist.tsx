import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  return (
    <div className="container-luxury section-spacing text-center">
      <Heart size={48} className="mx-auto text-muted-foreground mb-4" />
      <h1 className="font-display text-3xl font-bold mb-4">My Wishlist</h1>
      <p className="text-muted-foreground font-body max-w-md mx-auto mb-8">
        Save your favorite rangoli designs here. Browse our collections and tap the heart icon to add items.
      </p>
      <Link
        to="/collections/festive"
        className="inline-block bg-primary text-primary-foreground font-body text-sm font-medium px-8 py-3.5 rounded-md hover:bg-primary/90 transition-colors"
      >
        Browse Collections
      </Link>
    </div>
  );
}