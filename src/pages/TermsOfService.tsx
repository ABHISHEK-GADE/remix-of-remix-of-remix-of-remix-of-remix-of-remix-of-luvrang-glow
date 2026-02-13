import { FileText, CreditCard, Copyright, AlertTriangle } from 'lucide-react';
import SEO from '@/components/SEO';
import PageHeader from '@/components/PageHeader';

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
        <PageHeader
          title="Terms of Service"
          subtitle="By using the LuvRang website and purchasing our products, you agree to the following terms and conditions."
          breadcrumb={[{ label: 'Terms of Service' }]}
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
          Last updated: February 2026. These terms may be updated periodically.
        </p>
      </div>
    </>
  );
}
