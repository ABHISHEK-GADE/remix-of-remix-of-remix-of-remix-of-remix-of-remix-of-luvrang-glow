import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactUs() {
  return (
    <div className="container-luxury section-spacing">
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">Contact Us</h1>
      <div className="max-w-3xl font-body text-foreground/80 space-y-8">
        <p>We'd love to hear from you! Reach out to us for any queries, custom orders, or feedback.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center p-6 rounded-lg bg-secondary">
            <Mail className="text-primary mb-3" size={28} />
            <h3 className="font-display font-semibold mb-1">Email</h3>
            <p className="text-sm">support@luvrang.com</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-lg bg-secondary">
            <Phone className="text-primary mb-3" size={28} />
            <h3 className="font-display font-semibold mb-1">Phone</h3>
            <p className="text-sm">+91 98765 43210</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-lg bg-secondary">
            <MapPin className="text-primary mb-3" size={28} />
            <h3 className="font-display font-semibold mb-1">Location</h3>
            <p className="text-sm">India</p>
          </div>
        </div>
      </div>
    </div>
  );
}
