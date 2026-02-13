import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import SEO from '@/components/SEO';
import PageHeader from '@/components/PageHeader';

export default function ContactUs() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: 'Please fill in all required fields', variant: 'destructive' });
      return;
    }
    setLoading(true);

    const text = `New enquiry from LuvRang website%0A%0AName: ${encodeURIComponent(form.name)}%0AEmail: ${encodeURIComponent(form.email)}%0APhone: ${encodeURIComponent(form.phone || 'Not provided')}%0AMessage: ${encodeURIComponent(form.message)}`;
    window.open(`https://wa.me/917028696998?text=${text}`, '_blank');

    toast({ title: 'Redirecting to WhatsApp...', description: 'Your message is ready to send.' });
    setLoading(false);
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <>
      <SEO title="Contact Us" description="Get in touch with LuvRang for custom orders, queries, or feedback. WhatsApp, email, or call us." />
      <div className="container-luxury section-spacing">
        <div className="text-center mb-14 animate-fade-up">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">Get In Touch</h1>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Have a question about our rangoli designs, need a custom order, or just want to say hello? We are here to help.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-5 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="font-body text-sm font-medium text-foreground mb-1.5 block">Name *</label>
                <Input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required />
              </div>
              <div>
                <label className="font-body text-sm font-medium text-foreground mb-1.5 block">Email *</label>
                <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
              </div>
            </div>
            <div>
              <label className="font-body text-sm font-medium text-foreground mb-1.5 block">Phone</label>
              <Input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
            </div>
            <div>
              <label className="font-body text-sm font-medium text-foreground mb-1.5 block">Message *</label>
              <Textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your requirements, custom design ideas, or any questions..." rows={6} required />
            </div>
            <Button type="submit" disabled={loading} size="lg" className="w-full gap-2">
              <Send size={16} />
              {loading ? 'Sending...' : 'Send via WhatsApp'}
            </Button>
            <p className="font-body text-xs text-muted-foreground text-center">
              Your message will be sent directly to our WhatsApp for a quick response.
            </p>
          </form>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            {[
              { icon: MessageCircle, title: 'WhatsApp', value: '+91 7028696998', href: 'https://wa.me/917028696998', sub: 'Fastest way to reach us' },
              { icon: Mail, title: 'Email', value: 'support@luvrang.in', href: 'mailto:support@luvrang.in', sub: 'For detailed inquiries' },
              { icon: Phone, title: 'Phone', value: '+91 7028696998', href: 'tel:+917028696998', sub: 'Mon-Sat, 10AM-7PM' },
              { icon: MapPin, title: 'Location', value: 'India', href: undefined, sub: 'PAN India Shipping' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 p-5 rounded-xl bg-secondary/50 border border-border/50 hover-lift">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold mb-0.5">{item.title}</h3>
                  {item.href ? (
                    <a href={item.href} className="font-body text-sm text-foreground hover:text-primary transition-colors">{item.value}</a>
                  ) : (
                    <p className="font-body text-sm text-foreground">{item.value}</p>
                  )}
                  <p className="font-body text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}

            <div className="flex items-center gap-3 p-4 rounded-xl bg-accent/10 border border-accent/20">
              <Clock size={18} className="text-accent flex-shrink-0" />
              <p className="font-body text-xs text-foreground">
                <strong>Response Time:</strong> We typically reply within 1-2 hours during business hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
