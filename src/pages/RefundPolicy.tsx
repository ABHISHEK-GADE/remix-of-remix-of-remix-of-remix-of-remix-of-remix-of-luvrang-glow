import { RotateCcw, Clock, Ban, Mail } from 'lucide-react';
import SEO from '@/components/SEO';
import PageHeader from '@/components/PageHeader';

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
        <PageHeader
          title="Refund & Return Policy"
          subtitle="We want you to be completely satisfied with your LuvRang purchase. Please review our refund and return guidelines below."
          breadcrumb={[{ label: 'Refund Policy' }]}
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
      </div>
    </>
  );
}
