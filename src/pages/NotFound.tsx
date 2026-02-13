import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="container-luxury section-spacing text-center">
      <h1 className="font-display text-7xl md:text-9xl font-bold text-primary/10">404</h1>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-4">Page Not Found</h2>
      <p className="font-body text-muted-foreground mt-3 max-w-md mx-auto">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 mt-8 bg-primary text-primary-foreground font-body text-sm font-medium px-8 py-3.5 rounded-md hover:bg-primary/90 transition-colors"
      >
        <Home size={16} /> Back to Home
      </Link>
    </div>
  );
};

export default NotFound;