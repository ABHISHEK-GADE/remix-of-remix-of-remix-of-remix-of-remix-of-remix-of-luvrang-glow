import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

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

    // Send via WhatsApp as a simple working solution
    const text = `New enquiry from LuvRang website%0A%0AName: ${encodeURIComponent(form.name)}%0AEmail: ${encodeURIComponent(form.email)}%0APhone: ${encodeURIComponent(form.phone || 'Not provided')}%0AMessage: ${encodeURIComponent(form.message)}`;
    window.open(`https://wa.me/917028696998?text=${text}`, '_blank');

    toast({ title: 'Redirecting to WhatsApp…', description: 'Your message is ready to send.' });
    setLoading(false);
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="container-luxury section-spacing">
      <div className="text-center mb-12">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">Contact Us</h1>
        <p className="font-body text-muted-foreground max-w-xl mx-auto">
          We'd love to hear from you! Reach out for any queries, custom orders, or feedback.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-body text-sm font-medium text-foreground mb-1.5 block">Name *</label>
            <Input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required />
          </div>
          <div>
            <label className="font-body text-sm font-medium text-foreground mb-1.5 block">Email *</label>
            <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
          </div>
          <div>
            <label className="font-body text-sm font-medium text-foreground mb-1.5 block">Phone</label>
            <Input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
          </div>
          <div>
            <label className="font-body text-sm font-medium text-foreground mb-1.5 block">Message *</label>
            <Textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us how we can help…" rows={5} required />
          </div>
          <Button type="submit" disabled={loading} className="w-full gap-2">
            <Send size={16} />
            {loading ? 'Sending…' : 'Send Message'}
          </Button>
        </form>

        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex items-start gap-4 p-5 rounded-lg bg-secondary">
            <Mail className="text-primary mt-0.5" size={24} />
            <div>
              <h3 className="font-display font-semibold mb-1">Email</h3>
              <a href="mailto:support@luvrang.com" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">support@luvrang.com</a>
            </div>
          </div>
          <div className="flex items-start gap-4 p-5 rounded-lg bg-secondary">
            <Phone className="text-primary mt-0.5" size={24} />
            <div>
              <h3 className="font-display font-semibold mb-1">Phone / WhatsApp</h3>
              <a href="tel:+917028696998" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">+91 7028696998</a>
            </div>
          </div>
          <div className="flex items-start gap-4 p-5 rounded-lg bg-secondary">
            <MapPin className="text-primary mt-0.5" size={24} />
            <div>
              <h3 className="font-display font-semibold mb-1">Location</h3>
              <p className="font-body text-sm text-muted-foreground">India — PAN India Shipping Available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
