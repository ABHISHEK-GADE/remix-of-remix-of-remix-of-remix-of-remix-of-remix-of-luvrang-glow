import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

export default function Header() {
  const { openCart, totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container-luxury flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 -ml-2 text-foreground"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <Link to="/" className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            LuvRang
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-body text-sm tracking-wide">
            <Link to="/" className="text-foreground/70 hover:text-foreground transition-colors">Home</Link>
            <Link to="/collections/festive" className="text-foreground/70 hover:text-foreground transition-colors">Festive</Link>
            <Link to="/collections/wedding" className="text-foreground/70 hover:text-foreground transition-colors">Wedding</Link>
            <Link to="/collections/everyday" className="text-foreground/70 hover:text-foreground transition-colors">Everyday</Link>
          </nav>

          {/* Cart */}
          <button onClick={openCart} className="relative p-2 -mr-2 text-foreground" aria-label="Open cart">
            <ShoppingBag size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-border bg-background px-6 py-4 space-y-3 font-body text-sm animate-fade-in">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-foreground">Home</Link>
            <Link to="/collections/festive" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-foreground/70">Festive</Link>
            <Link to="/collections/wedding" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-foreground/70">Wedding</Link>
            <Link to="/collections/everyday" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-foreground/70">Everyday</Link>
          </nav>
        )}
      </header>
    </>
  );
}
