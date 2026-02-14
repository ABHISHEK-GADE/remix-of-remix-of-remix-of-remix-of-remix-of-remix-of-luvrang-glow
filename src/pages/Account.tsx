import { ExternalLink, User, Package, MapPin, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import PageHeader from '@/components/PageHeader';

export default function Account() {
  return (
    <>
      <SEO title="My Account – LuvRang" description="Manage your LuvRang account, orders, and preferences." />
      <PageHeader title="My Account" breadcrumb={[{ label: 'Account' }]} />

      <section className="container-luxury py-10 md:py-16">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Login / Account Access Card */}
          <div className="rounded-xl border border-border bg-card p-6 md:p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <User size={28} className="text-primary" />
            </div>
            <h2 className="font-display text-xl md:text-2xl text-foreground">Welcome to LuvRang</h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Sign in to your account to view orders, manage addresses, and more.
            </p>
            <a
              href="https://shop.luvrang.in/account/login"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Sign In / Register <ExternalLink size={16} />
            </a>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href="https://shop.luvrang.in/account"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-5 hover:border-primary/30 hover:shadow-soft transition-all text-center"
            >
              <Package size={22} className="text-primary" />
              <span className="text-sm font-medium text-foreground">My Orders</span>
              <span className="text-xs text-muted-foreground">Track & manage orders</span>
            </a>
            <a
              href="https://shop.luvrang.in/account"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-5 hover:border-primary/30 hover:shadow-soft transition-all text-center"
            >
              <MapPin size={22} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Addresses</span>
              <span className="text-xs text-muted-foreground">Manage saved addresses</span>
            </a>
            <Link
              to="/wishlist"
              className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-5 hover:border-primary/30 hover:shadow-soft transition-all text-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              <span className="text-sm font-medium text-foreground">Wishlist</span>
              <span className="text-xs text-muted-foreground">Your saved items</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
