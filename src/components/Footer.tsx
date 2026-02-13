import { Link } from 'react-router-dom';
import logo from '@/assets/logo.svg';

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container-luxury py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/">
              <img alt="LuvRang" className="h-12 w-auto mb-4" src="/lovable-uploads/c215f2b6-eda0-4abe-bddd-d297d28651ad.png" />
            </Link>
            <p className="text-background/60 text-sm leading-relaxed font-body">
              Premium handmade reusable rangoli — crafted for every celebration.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-body text-xs tracking-widest uppercase mb-4 text-background/40">Shop</h4>
            <ul className="space-y-2 font-body text-sm">
              <li><Link to="/collections/festive" className="text-background/60 hover:text-background transition-colors">Festive Collection</Link></li>
              <li><Link to="/collections/wedding" className="text-background/60 hover:text-background transition-colors">Wedding Collection</Link></li>
              <li><Link to="/collections/everyday" className="text-background/60 hover:text-background transition-colors">Everyday Decor</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-body text-xs tracking-widest uppercase mb-4 text-background/40">Information</h4>
            <ul className="space-y-2 font-body text-sm">
              <li><Link to="/shipping-policy" className="text-background/60 hover:text-background transition-colors">Shipping & Delivery</Link></li>
              <li><Link to="/refund-policy" className="text-background/60 hover:text-background transition-colors">Return & Refund Policy</Link></li>
              <li><Link to="/privacy-policy" className="text-background/60 hover:text-background transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-background/60 hover:text-background transition-colors">Terms of Service</Link></li>
              <li><Link to="/contact" className="text-background/60 hover:text-background transition-colors">Contact Us</Link></li>
              <li><Link to="/about" className="text-background/60 hover:text-background transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-body text-xs tracking-widest uppercase mb-4 text-background/40">Connect</h4>
            <ul className="space-y-2 font-body text-sm">
              <li><a href="#" className="text-background/60 hover:text-background transition-colors">Instagram</a></li>
              <li><a href="#" className="text-background/60 hover:text-background transition-colors">Facebook</a></li>
              <li><a href="#" className="text-background/60 hover:text-background transition-colors">WhatsApp</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 font-body text-xs text-background/40">
          <p>© {new Date().getFullYear()} LuvRang. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-background/60 transition-colors">Privacy</Link>
            <Link to="/terms-of-service" className="hover:text-background/60 transition-colors">Terms</Link>
            <span>PAN India Shipping • COD Available</span>
          </div>
        </div>
      </div>
    </footer>);

}