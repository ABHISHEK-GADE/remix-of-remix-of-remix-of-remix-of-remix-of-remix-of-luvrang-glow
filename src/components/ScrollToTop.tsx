import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLocation, useNavigationType } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navType = useNavigationType();
  const [showButton, setShowButton] = useState(false);

  // Scroll to top on every route change (including initial load)
  useEffect(() => {
    // Immediate scroll
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Multiple fallbacks to beat layout shifts from lazy-loaded images/components
    const timers = [50, 150, 300, 600].map(ms =>
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }, ms)
    );
    return () => timers.forEach(clearTimeout);
  }, [pathname]);

  // Show/hide back-to-top button
  useEffect(() => {
    const handler = () => setShowButton(window.scrollY > 400);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!showButton) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-primary text-primary-foreground shadow-elevated flex items-center justify-center hover:bg-primary/90 transition-all duration-300 animate-fade-in"
      aria-label="Scroll to top"
    >
      <ArrowUp size={18} />
    </button>
  );
}
