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
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Why LuvRang</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((f) => (
            <div key={f.title} className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/5 flex items-center justify-center">
                <f.icon size={24} className="text-primary" />
              </div>
              <h3 className="font-display text-base font-semibold text-foreground mb-1">{f.title}</h3>
              <p className="font-body text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
