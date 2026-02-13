import { Shield, Eye, Lock, Mail } from 'lucide-react';
import SEO from '@/components/SEO';
import PageHeader from '@/components/PageHeader';

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
    content: 'For privacy-related queries, reach out to us at support@luvrang.com. We aim to respond within 24–48 hours.',
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <SEO title="Privacy Policy" description="Learn how LuvRang collects, uses, and protects your personal information. Your privacy matters to us." />
      <div className="container-luxury section-spacing">
        <PageHeader
          title="Privacy Policy"
          subtitle="At LuvRang, we are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your personal information."
          breadcrumb={[{ label: 'Privacy Policy' }]}
        />

        <div className="max-w-3xl space-y-6">
          {sections.map((s, i) => (
            <div
              key={s.title}
              className="flex gap-4 p-6 rounded-xl bg-secondary/50 border border-border/50 animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <s.icon size={20} className="text-primary" />
              </div>
              <div>
                <h2 className="font-display text-lg font-semibold text-foreground mb-2">{s.title}</h2>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{s.content}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="font-body text-xs text-muted-foreground mt-10 max-w-3xl">
          Last updated: February 2026. This policy may be updated periodically. Please check back for any changes.
        </p>
      </div>
    </>
  );
}
