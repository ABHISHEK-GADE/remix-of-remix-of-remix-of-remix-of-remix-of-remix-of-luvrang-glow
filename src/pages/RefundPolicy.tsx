import { RotateCcw, Clock, Ban, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

const sections = [
  {
    icon: RotateCcw,
    title: 'Returns',
    content: 'Items can be returned within 7 days of delivery if they arrive damaged or defective. The product must be unused and in its original packaging.',
  },
  {
    icon: Clock,
    title: 'Refund Process',
    content: 'Once we receive and inspect the returned item, refunds will be processed within 5-7 business days to your original payment method.',
  },
  {
    icon: Ban,
    title: 'Non-Returnable Items',
    content: 'Custom or personalized orders cannot be returned unless they arrive damaged or differ significantly from the order specifications.',
  },
  {
    icon: Mail,
    title: 'How to Request a Return',
    content: 'Email us at support@luvrang.com with your order number and photos of the issue. Our team will guide you through the return process within 24 hours.',
  },
];

export default function RefundPolicy() {
  return (
    <>
      <SEO title="Refund & Return Policy" description="Learn about LuvRang return and refund policies. Easy returns within 7 days for damaged or defective items." />
      <div className="container-luxury section-spacing">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-up">
          <p className="font-body text-xs tracking-widest uppercase text-primary mb-3">Hassle-Free Returns</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Refund &{' '}
            <span className="text-gradient-gold">Return Policy</span>
          </h1>
          <p className="font-body text-muted-foreground text-lg leading-relaxed">
            We want you to be completely satisfied with your LuvRang purchase. Please review our refund and return guidelines below.
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
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Need Help with a Return?</h2>
          <p className="font-body text-muted-foreground mb-8 max-w-lg mx-auto">
            Our support team is here to make the process smooth and easy for you.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-primary text-primary-foreground font-body text-sm font-medium px-8 py-3.5 rounded-md hover:bg-primary/90 transition-colors"
          >
            Contact Support
          </Link>
        </section>
      </div>
    </>
  );
}
