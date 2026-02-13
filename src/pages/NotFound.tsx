import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import SEO from '@/components/SEO';

const NotFound = () => {
  return (
    <>
      <SEO title="Page Not Found" description="The page you are looking for does not exist." />
      <div className="container-luxury section-spacing text-center">
        <div className="animate-fade-up">
          <h1 className="font-display text-8xl md:text-[10rem] font-bold text-primary/10 leading-none">404</h1>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-2">Page Not Found</h2>
          <p className="font-body text-muted-foreground mt-4 max-w-md mx-auto">
            The page you are looking for does not exist or has been moved. Let us get you back on track.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 font-body text-sm font-medium px-6 py-3 rounded-md border border-border text-foreground hover:bg-secondary transition-colors"
            >
              <ArrowLeft size={16} /> Go Back
            </button>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body text-sm font-medium px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
            >
              <Home size={16} /> Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
