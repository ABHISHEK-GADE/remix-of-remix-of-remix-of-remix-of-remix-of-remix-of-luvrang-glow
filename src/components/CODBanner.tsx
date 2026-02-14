import { Truck, CreditCard, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CODBanner() {
  return (
    <section className="bg-primary text-primary-foreground py-10 md:py-16">
      <div className="container-luxury">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
            Shop With <span className="text-gradient-gold">Confidence</span>
          </h2>
          <p className="font-body text-primary-foreground/70 text-sm">
            Multiple payment options to suit your preference
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto mb-10">
          {[
            { icon: CreditCard, title: 'COD Available', desc: 'Cash on Delivery at just \u20B959' },
            { icon: Truck, title: 'Free Prepaid Shipping', desc: 'All prepaid orders ship free' },
            { icon: Shield, title: 'Secure Payments', desc: 'UPI, Cards, Net Banking & more' },
          ].map((item, i) => (
            <div
              key={item.title}
              className="text-center p-3 sm:p-5 rounded-xl bg-primary-foreground/10 backdrop-blur-sm animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <item.icon size={20} className="mx-auto mb-2 sm:mb-3 text-accent" />
              <h3 className="font-display text-xs sm:text-sm font-semibold mb-0.5 sm:mb-1">{item.title}</h3>
              <p className="font-body text-primary-foreground/70 text-[10px] sm:text-xs hidden sm:block">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <Link
            to="/collections/festive"
            className="inline-block bg-background text-foreground font-body text-sm font-medium px-8 py-3.5 rounded-md hover:bg-background/90 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    </section>
  );
}
