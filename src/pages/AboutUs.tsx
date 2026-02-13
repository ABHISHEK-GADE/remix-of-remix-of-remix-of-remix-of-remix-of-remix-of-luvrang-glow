import { Sparkles, Heart, Users, Award } from 'lucide-react';

const values = [
  { icon: Sparkles, title: 'Artisan Craftsmanship', desc: 'Every rangoli is handcrafted by skilled artisans who pour love into every detail.' },
  { icon: Heart, title: 'Made with Love', desc: 'We believe celebrations deserve decor crafted with care and passion.' },
  { icon: Users, title: 'Community First', desc: 'We support local artisan communities and preserve traditional art forms.' },
  { icon: Award, title: 'Premium Quality', desc: 'Only the finest materials are used to ensure lasting beauty and durability.' },
];

export default function AboutUs() {
  return (
    <div className="container-luxury section-spacing">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">About LuvRang</h1>
        <p className="font-body text-muted-foreground text-lg leading-relaxed">
          LuvRang is a premium brand dedicated to handmade, reusable rangoli decor — crafted for every celebration that matters.
        </p>
      </div>

      {/* Story */}
      <div className="max-w-3xl mx-auto mb-20">
        <h2 className="font-display text-2xl font-semibold mb-4">Our Story</h2>
        <div className="font-body text-foreground/80 space-y-4 leading-relaxed">
          <p>
            Born from a love for Indian traditions and a desire to bring beauty into everyday celebrations, LuvRang was founded to make premium rangoli art accessible to every home. We noticed that disposable rangoli materials were wasteful and often lacked the charm of traditional designs.
          </p>
          <p>
            That's when we decided to create something different — handcrafted, reusable rangoli pieces that combine the elegance of traditional artistry with modern durability. Each piece is made to order, ensuring you receive a unique work of art.
          </p>
          <p>
            Today, LuvRang ships across India, bringing festive joy to homes for Diwali, weddings, housewarmings, and everyday decor. We're proud to support local artisans and preserve the rich heritage of rangoli art.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="mb-16">
        <h2 className="font-display text-2xl font-semibold text-center mb-10">What We Stand For</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v) => (
            <div key={v.title} className="text-center p-6 rounded-lg bg-secondary">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <v.icon size={24} className="text-primary" />
              </div>
              <h3 className="font-display text-base font-semibold mb-2">{v.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
