import { Sparkles, RotateCcw, Gem, Truck } from 'lucide-react';

const features = [
  { icon: Sparkles, title: 'Handmade', desc: 'Each piece is meticulously handcrafted by skilled artisans' },
  { icon: RotateCcw, title: 'Reusable', desc: 'Use it year after year — built to last celebrations' },
  { icon: Gem, title: 'Premium Materials', desc: 'High-quality materials for a luxurious finish' },
  { icon: Truck, title: 'PAN India Delivery', desc: 'We ship across India with care and speed' },
];

export default function WhyLuvRang() {
  return (
    <section className="section-spacing bg-background">
      <div className="container-luxury">
        <div className="text-center mb-14">
          <p className="font-body text-xs tracking-widest uppercase text-primary font-semibold mb-2">The LuvRang Difference</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Why Choose <span className="text-gradient-gold">LuvRang</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="text-center p-4 sm:p-6 rounded-xl bg-secondary/50 border border-border/50 hover-lift animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                <f.icon size={22} className="text-primary sm:hidden" />
                <f.icon size={24} className="text-primary hidden sm:block" />
              </div>
              <h3 className="font-display text-base font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="font-body text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
