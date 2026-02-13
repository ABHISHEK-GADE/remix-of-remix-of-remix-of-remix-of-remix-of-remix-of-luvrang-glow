import { Link } from 'react-router-dom';
import { Gift, Percent, CreditCard } from 'lucide-react';

const offers = [
  {
    icon: Percent,
    title: 'Festival Sale — Up to 30% Off',
    desc: 'On select festive rangoli collections',
    cta: 'Shop Now',
    link: '/collections/festive',
  },
  {
    icon: Gift,
    title: 'Bundle & Save More',
    desc: 'Get 3 or more pieces at exclusive prices',
    cta: 'View Bundles',
    link: '/collections/everyday',
  },
  {
    icon: CreditCard,
    title: 'Free Shipping on Prepaid',
    desc: 'All prepaid orders ship free across India',
    cta: 'Start Shopping',
    link: '/collections/festive',
  },
];

export default function OffersSection() {
  return (
    <section className="section-spacing bg-primary/5">
      <div className="container-luxury">
        <div className="text-center mb-14">
          <p className="font-body text-xs tracking-widest uppercase text-primary font-semibold mb-2">Limited Time</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Current <span className="text-gradient-gold">Offers</span>
          </h2>
          <p className="font-body text-muted-foreground mt-3 text-sm">Don't miss out on these exclusive deals</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer, i) => (
            <Link
              key={offer.title}
              to={offer.link}
              className="bg-background rounded-xl p-6 border border-border/50 hover-lift text-center group animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-lg bg-accent/10 flex items-center justify-center">
                <offer.icon size={24} className="text-accent" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-1">{offer.title}</h3>
              <p className="font-body text-muted-foreground text-sm mb-4">{offer.desc}</p>
              <span className="font-body text-sm font-medium text-primary group-hover:underline">{offer.cta} →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
