import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, Search, Heart } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { useState, useEffect } from 'react';
import { SearchDialog } from '@/components/SearchDialog';
import logo from '@/assets/logo.svg';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/collections', label: 'Collections' },
  { to: '/shop', label: 'Shop', matchPrefix: '/product' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact Us' },
];


export default function Header() {
  const openCart = useCartStore((s) => s.openCart);
  const totalItems = useCartStore((s) => s.totalItems());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Add scroll shadow
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <header className={`sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border transition-shadow duration-300 ${scrolled ? 'shadow-soft' : ''}`}>
        <div className="container-luxury flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Left: Menu + Logo */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 -ml-2 text-foreground"
              aria-label="Toggle menu">
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <Link to="/" className="flex items-center">
              <img alt="LuvRang" className="h-10 sm:h-14 md:h-16 w-auto" src="/lovable-uploads/9517ffe1-54ed-44a8-99f4-b9c452b0e430.png" />
            </Link>
          </div>

          {/* Center: Desktop Nav */}
          <nav className="hidden lg:flex items-center justify-center gap-6 font-body text-sm tracking-wide whitespace-nowrap">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to || 
                (link.label === 'Collections' && location.pathname.startsWith('/collections/')) ||
                (link.label === 'Shop' && location.pathname.startsWith('/product'));
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`transition-colors ${
                    isActive ? 'text-primary font-medium' : 'text-foreground/70 hover:text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Action Icons */}
          <div className="flex items-center justify-end gap-0.5 md:gap-1">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-foreground/70 hover:text-foreground transition-colors"
              aria-label="Search">

              <Search size={20} />
            </button>
            <Link
              to="/wishlist"
              className="hidden sm:flex p-2 text-foreground/70 hover:text-foreground transition-colors"
              aria-label="Wishlist">

              <Heart size={20} />
            </Link>
            <Link
              to="/account"
              className="p-2 text-foreground/70 hover:text-foreground transition-colors"
              aria-label="Account">
              <User size={20} />
            </Link>
            <button
              onClick={openCart}
              className="relative p-2 -mr-2 text-foreground/70 hover:text-foreground transition-colors"
              aria-label="Open cart">

              <ShoppingBag size={20} />
              {totalItems > 0 &&
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-fade-in">
                  {totalItems}
                </span>
              }
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen &&
        <nav className="lg:hidden border-t border-border bg-background px-6 py-4 space-y-1 font-body text-sm animate-fade-in">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to || 
                (link.label === 'Collections' && location.pathname.startsWith('/collections/')) ||
                (link.label === 'Shop' && location.pathname.startsWith('/product'));
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`block py-3 px-2 rounded-md transition-colors ${
                    isActive ? 'text-primary bg-primary/5 font-medium' : 'text-foreground/70 hover:text-foreground hover:bg-secondary/50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <hr className="border-border my-2" />
            <Link to="/wishlist" className="flex items-center gap-3 py-3 px-2 text-foreground/70 hover:text-foreground rounded-md hover:bg-secondary/50 transition-colors">
              <Heart size={18} /> Wishlist
            </Link>
            <Link to="/account" className="flex items-center gap-3 py-3 px-2 text-foreground/70 hover:text-foreground rounded-md hover:bg-secondary/50 transition-colors">
              <User size={18} /> My Account
            </Link>
          </nav>
        }
      </header>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>);

}