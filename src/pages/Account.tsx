import { ExternalLink, User, Package, MapPin, Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

export default function Account() {
  return (
    <>
      <SEO title="My Account – LuvRang" description="Manage your LuvRang account, orders, and preferences." />

      <div className="container-luxury section-spacing">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <p className="font-body text-xs tracking-widest uppercase text-primary mb-3">Your Account</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-5">
            Welcome to <span className="text-gradient-gold">LuvRang</span>
          </h1>
          <p className="font-body text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
            Sign in to manage your orders, save addresses, and keep track of your favourite rangoli designs.
          </p>
        </div>

        {/* Sign In Card */}
        <div className="max-w-md mx-auto mb-14 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <div className="rounded-xl bg-secondary/50 border border-border/50 p-8 text-center space-y-5 hover-lift">
            <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
              <User size={28} className="text-primary" />
            </div>
            <div>
              <h2 className="font-display text-xl md:text-2xl font-semibold mb-2">Account Access</h2>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                Sign in to your Shopify-powered account to view orders, manage addresses, and more.
              </p>
            </div>
            <a
              href="https://shop.luvrang.in/account/login"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body text-sm font-medium px-8 py-3.5 rounded-md hover:bg-primary/90 transition-colors"
            >
              Sign In / Register <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="text-center mb-10 animate-fade-up" style={{ animationDelay: "0.15s" }}>
            <p className="font-body text-xs tracking-widest uppercase text-primary mb-2">Quick Access</p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold">Manage Your Account</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: Package,
                title: "My Orders",
                desc: "Track & manage orders",
                href: "https://shop.luvrang.in/account",
                external: true,
              },
              {
                icon: MapPin,
                title: "Addresses",
                desc: "Manage saved addresses",
                href: "https://shop.luvrang.in/account",
                external: true,
              },
              { icon: Heart, title: "Wishlist", desc: "Your saved items", to: "/wishlist" },
              { icon: ShoppingBag, title: "Shop Now", desc: "Browse all products", to: "/shop" },
            ].map((item, i) => {
              const content = (
                <>
                  <div className="w-12 h-12 mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon size={22} className="text-primary" />
                  </div>
                  <h3 className="font-display text-base font-semibold mb-1">{item.title}</h3>
                  <p className="font-body text-xs text-muted-foreground">{item.desc}</p>
                </>
              );
              const cls =
                "flex flex-col items-center text-center p-6 rounded-xl bg-secondary/50 border border-border/50 hover-lift animate-fade-up";

              return item.to ? (
                <Link key={item.title} to={item.to} className={cls} style={{ animationDelay: `${0.2 + i * 0.08}s` }}>
                  {content}
                </Link>
              ) : (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cls}
                  style={{ animationDelay: `${0.2 + i * 0.08}s` }}
                >
                  {content}
                </a>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <section
          className="text-center py-16 px-8 rounded-2xl bg-primary/5 animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Need Help With Your Order?</h2>
          <p className="font-body text-muted-foreground mb-8 max-w-lg mx-auto">
            Our team is always ready to assist you with custom orders, tracking, or any questions.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-primary text-primary-foreground font-body text-sm font-medium px-8 py-3.5 rounded-md hover:bg-primary/90 transition-colors"
          >
            Contact Us
          </Link>
        </section>
      </div>
    </>
  );
}
