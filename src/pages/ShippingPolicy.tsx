import { Truck, IndianRupee, Wallet, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

const sections = [
  {
    icon: Truck,
    title: 'Shipping Timeline',
    content: 'Orders are dispatched within 2-3 business days. Delivery typically takes 5-7 business days depending on your location across India.',
  },
  {
    icon: IndianRupee,
    title: 'Shipping Charges',
    content: 'Free shipping on prepaid orders above \u20B9999. A flat shipping fee of \u20B999 applies to orders below this amount.',
  },
  {
    icon: Wallet,
    title: 'Cash on Delivery',
    content: 'COD is available PAN India. An additional COD handling charge of \u20B949 applies. Prepaid orders enjoy free shipping with no extra charges.',
  },
  {
    icon: MapPin,
    title: 'Order Tracking',
    content: 'Once shipped, you will receive a tracking link via SMS and email to monitor your delivery status in real-time.',
  },
];

const highlights = [
  { value: 'Free', label: 'Prepaid Shipping' },
  { value: '5-7', label: 'Days Delivery' },
  { value: '28', label: 'States Covered' },
  { value: '\u20B949', label: 'COD Charge' },
];

export default function ShippingPolicy() {
  return (
    <>
      <SEO title="Shipping & Delivery" description="Free shipping on orders above \u20B9999. PAN India delivery in 5-7 days. COD available." />
      <div className="container-luxury section-spacing">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-up">
          <p className="font-body text-xs tracking-widest uppercase text-primary mb-3">Fast & Reliable</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Shipping &{' '}
            <span className="text-gradient-gold">Delivery</span>
          </h1>
          <p className="font-body text-muted-foreground text-lg leading-relaxed">
            We ship across India with care to ensure your rangoli reaches you in perfect condition.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {highlights.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-xl bg-secondary/50 border border-border/50 animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <p className="font-display text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
              <p className="font-body text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Sections */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {sections.map((s, i) => (
              <div
                key={s.title}
                className="p-6 rounded-xl bg-secondary/50 border border-border/50 hover-lift animate-fade-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="w-12 h-12 mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                  <s.icon size={22} className="text-primary" />
                </div>
                <h2 className="font-display text-base font-semibold mb-2">{s.title}</h2>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{s.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <section className="text-center py-16 px-8 rounded-2xl bg-primary/5 animate-fade-up">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Ready to Order?</h2>
          <p className="font-body text-muted-foreground mb-8 max-w-lg mx-auto">
            Browse our collections and enjoy free shipping on prepaid orders.
          </p>
          <Link
            to="/collections/festive"
            className="inline-block bg-primary text-primary-foreground font-body text-sm font-medium px-8 py-3.5 rounded-md hover:bg-primary/90 transition-colors"
          >
            Shop Now
          </Link>
        </section>
      </div>
    </>
  );
}
