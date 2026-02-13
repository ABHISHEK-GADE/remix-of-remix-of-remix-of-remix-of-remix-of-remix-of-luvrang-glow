import { Truck, IndianRupee, Wallet, MapPin } from 'lucide-react';
import SEO from '@/components/SEO';
import PageHeader from '@/components/PageHeader';

const sections = [
  {
    icon: Truck,
    title: 'Shipping Timeline',
    content: 'Orders are dispatched within 2-3 business days. Delivery typically takes 5-7 business days depending on your location across India.',
  },
  {
    icon: IndianRupee,
    title: 'Shipping Charges',
    content: 'Free shipping on prepaid orders above \u20B9999. A flat shipping fee of \u20B999 applies to orders below this amount.',
  },
  {
    icon: Wallet,
    title: 'Cash on Delivery',
    content: 'COD is available PAN India. An additional COD handling charge of \u20B949 applies. Prepaid orders enjoy free shipping with no extra charges.',
  },
  {
    icon: MapPin,
    title: 'Order Tracking',
    content: 'Once shipped, you will receive a tracking link via SMS and email to monitor your delivery status in real-time.',
  },
];

export default function ShippingPolicy() {
  return (
    <>
      <SEO title="Shipping & Delivery" description="Free shipping on orders above \u20B9999. PAN India delivery in 5-7 days. COD available." />
      <div className="container-luxury section-spacing">
        <PageHeader
          title="Shipping & Delivery"
          subtitle="We ship across India with care to ensure your rangoli reaches you in perfect condition."
          breadcrumb={[{ label: 'Shipping Policy' }]}
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
