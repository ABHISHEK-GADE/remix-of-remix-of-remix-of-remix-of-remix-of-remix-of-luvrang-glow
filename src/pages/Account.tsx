import { User, Package, MapPin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

const features = [
  { icon: Package, title: 'Order Tracking', desc: 'Track your orders in real-time' },
  { icon: MapPin, title: 'Saved Addresses', desc: 'Manage your delivery addresses' },
  { icon: Heart, title: 'Wishlist', desc: 'Save your favorite designs' },
];

export default function Account() {
  return (
    <>
      <SEO title="My Account" description="Manage your LuvRang account, track orders, and view your purchase history." />
      <div className="container-luxury section-spacing">
        <div className="text-center max-w-lg mx-auto animate-fade-up">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <User size={32} className="text-primary" />
          </div>
          <h1 className="font-display text-3xl font-bold mb-3">My Account</h1>
          <p className="text-muted-foreground font-body mb-10">
            Account functionality coming soon. You will be able to track orders, manage addresses, and view your purchase history.
          </p>
        </div>

        <div className="max-w-lg mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="text-center p-5 rounded-xl bg-secondary/50 border border-border/50 animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <f.icon size={22} className="mx-auto text-primary mb-2" />
              <h3 className="font-display text-sm font-semibold mb-1">{f.title}</h3>
              <p className="font-body text-xs text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <Link
            to="/"
            className="inline-block bg-primary text-primary-foreground font-body text-sm font-medium px-8 py-3.5 rounded-md hover:bg-primary/90 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </>
  );
}
