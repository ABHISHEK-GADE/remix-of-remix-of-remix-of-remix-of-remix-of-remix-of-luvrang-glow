import { Shield, Eye, Lock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

const sections = [
  {
    icon: Eye,
    title: 'Information We Collect',
    content: 'We collect information you provide directly, such as your name, email address, shipping address, and payment details when placing an order. We may also collect browsing data to improve your shopping experience.',
  },
  {
    icon: Shield,
    title: 'How We Use Your Information',
    content: 'Your information is used to process orders, communicate updates, improve our services, and send promotional content (with your consent). We never sell your data to third parties.',
  },
  {
    icon: Lock,
    title: 'Data Security',
    content: 'We implement industry-standard security measures to protect your data. Payment information is processed securely through our payment partners and is never stored on our servers.',
  },
  {
    icon: Mail,
    title: 'Contact Us',
    content: 'For privacy-related queries, reach out to us at support@luvrang.in. We aim to respond within 24-48 hours.',
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <SEO title="Privacy Policy" description="Learn how LuvRang collects, uses, and protects your personal information. Your privacy matters to us." />
      <div className="container-luxury section-spacing">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-up">
          <p className="font-body text-xs tracking-widest uppercase text-primary mb-3">Your Privacy Matters</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Privacy{' '}
            <span className="text-gradient-gold">Policy</span>
          </h1>
          <p className="font-body text-muted-foreground text-lg leading-relaxed">
            At LuvRang, we are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your personal information.
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
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Have Questions About Your Data?</h2>
          <p className="font-body text-muted-foreground mb-8 max-w-lg mx-auto">
            We are happy to answer any privacy-related questions. Reach out and we will get back to you promptly.
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
