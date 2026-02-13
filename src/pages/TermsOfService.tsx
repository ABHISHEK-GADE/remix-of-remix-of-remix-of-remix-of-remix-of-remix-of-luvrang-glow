import { FileText, CreditCard, Copyright, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

const sections = [
  {
    icon: FileText,
    title: 'Products',
    content: 'All products are handmade and may have slight variations in color and design. Product images are representative and the actual product may differ slightly. This is a hallmark of handcrafted artistry.',
  },
  {
    icon: CreditCard,
    title: 'Orders & Payment',
    content: 'We accept online payments and Cash on Delivery (COD). Orders are confirmed upon successful payment or COD verification. COD orders may incur an additional handling charge.',
  },
  {
    icon: Copyright,
    title: 'Intellectual Property',
    content: 'All content on this website including images, text, and designs are the property of LuvRang and may not be reproduced without permission.',
  },
  {
    icon: AlertTriangle,
    title: 'Limitation of Liability',
    content: 'LuvRang shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services.',
  },
];

export default function TermsOfService() {
  return (
    <>
      <SEO title="Terms of Service" description="Read the terms and conditions for using the LuvRang website and purchasing our handmade rangoli products." />
      <div className="container-luxury section-spacing">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-up">
          <p className="font-body text-xs tracking-widest uppercase text-primary mb-3">Legal</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Terms of{' '}
            <span className="text-gradient-gold">Service</span>
          </h1>
          <p className="font-body text-muted-foreground text-lg leading-relaxed">
            By using the LuvRang website and purchasing our products, you agree to the following terms and conditions.
          </p>
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
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Need Clarification?</h2>
          <p className="font-body text-muted-foreground mb-8 max-w-lg mx-auto">
            If you have any questions about our terms, feel free to reach out to our support team.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-primary text-primary-foreground font-body text-sm font-medium px-8 py-3.5 rounded-md hover:bg-primary/90 transition-colors"
          >
            Contact Us
          </Link>
        </section>

        <p className="font-body text-xs text-muted-foreground mt-10 text-center">
          Last updated: February 2026
        </p>
      </div>
    </>
  );
}
