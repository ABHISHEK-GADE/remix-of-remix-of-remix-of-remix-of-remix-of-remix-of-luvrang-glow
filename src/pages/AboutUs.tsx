import { Sparkles, Heart, Users, Award, Leaf, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

const values = [
  { icon: Sparkles, title: 'Artisan Craftsmanship', desc: 'Every rangoli is handcrafted by skilled artisans who pour love into every detail.' },
  { icon: Heart, title: 'Made with Love', desc: 'We believe celebrations deserve decor crafted with care and passion.' },
  { icon: Users, title: 'Community First', desc: 'We support local artisan communities and preserve traditional art forms.' },
  { icon: Award, title: 'Premium Quality', desc: 'Only the finest materials are used to ensure lasting beauty and durability.' },
  { icon: Leaf, title: 'Eco Friendly', desc: 'Reusable designs that reduce waste and are better for the environment.' },
  { icon: Gift, title: 'Perfect Gifting', desc: 'Beautifully packaged rangoli sets that make memorable gifts for loved ones.' },
];

const stats = [
  { value: '5000+', label: 'Happy Customers' },
  { value: '200+', label: 'Unique Designs' },
  { value: '28', label: 'States Shipped' },
  { value: '4.9\u2605', label: 'Average Rating' },
];

export default function AboutUs() {
  return (
    <>
      <SEO title="About Us" description="LuvRang creates premium handmade, reusable rangoli for every celebration. Learn our story and mission." />
      <div className="container-luxury section-spacing">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-up">
          <p className="font-body text-xs tracking-widest uppercase text-primary mb-3">Our Story</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Crafting Celebrations,{' '}
            <span className="text-gradient-gold">One Rangoli at a Time</span>
          </h1>
          <p className="font-body text-muted-foreground text-lg leading-relaxed">
            LuvRang is a premium brand dedicated to handmade, reusable rangoli decor — crafted for every celebration that matters.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => (
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

        {/* Story */}
        <div className="max-w-3xl mx-auto mb-20 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="font-display text-2xl font-semibold mb-6">How It All Started</h2>
          <div className="font-body text-foreground/80 space-y-4 leading-relaxed">
            <p>
              Born from a love for Indian traditions and a desire to bring beauty into everyday celebrations, LuvRang was founded to make premium rangoli art accessible to every home. We noticed that disposable rangoli materials were wasteful and often lacked the charm of traditional designs.
            </p>
            <p>
              We decided to create something different — handcrafted, reusable rangoli pieces that combine the elegance of traditional artistry with modern durability. Each piece is made to order, ensuring you receive a unique work of art.
            </p>
            <p>
              Today, LuvRang ships across India, bringing festive joy to homes for Diwali, weddings, housewarmings, and everyday decor. We are proud to support local artisans and preserve the rich heritage of rangoli art.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <p className="font-body text-xs tracking-widest uppercase text-primary mb-2">Our Values</p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="p-6 rounded-xl bg-secondary/50 border border-border/50 hover-lift animate-fade-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="w-12 h-12 mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                  <v.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-display text-base font-semibold mb-2">{v.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <section className="text-center py-16 px-8 rounded-2xl bg-primary/5 animate-fade-up">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Ready to Add Beauty to Your Celebrations?</h2>
          <p className="font-body text-muted-foreground mb-8 max-w-lg mx-auto">
            Browse our curated collections and find the perfect rangoli for your next occasion.
          </p>
          <Link
            to="/collections/festive"
            className="inline-block bg-primary text-primary-foreground font-body text-sm font-medium px-8 py-3.5 rounded-md hover:bg-primary/90 transition-colors"
          >
            Explore Collections
          </Link>
        </section>
      </div>
    </>
  );
}
