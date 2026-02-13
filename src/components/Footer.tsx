import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container-luxury py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-display text-2xl font-bold mb-4">LuvRang</h3>
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
              <li><span className="text-background/60">Shipping & Delivery</span></li>
              <li><span className="text-background/60">Care Instructions</span></li>
              <li><span className="text-background/60">Return Policy</span></li>
              <li><span className="text-background/60">Contact Us</span></li>
            </ul>
          </div>

          {/* Contact */}
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
          <p>PAN India Shipping • Cash on Delivery Available</p>
        </div>
      </div>
    </footer>
  );
}
