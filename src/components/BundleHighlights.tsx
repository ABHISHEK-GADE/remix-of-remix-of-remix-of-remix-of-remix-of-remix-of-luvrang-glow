import { Link } from 'react-router-dom';

// Mock bundle data — will be replaced by Shopify data
const bundles = [
  {
    id: '1',
    title: 'Festive Starter Bundle',
    pieces: '3 Pieces',
    originalPrice: 2999,
    bundlePrice: 2499,
    handle: 'festive-starter-bundle',
  },
  {
    id: '2',
    title: 'Wedding Grand Bundle',
    pieces: '5 Pieces',
    originalPrice: 5999,
    bundlePrice: 4799,
    handle: 'wedding-grand-bundle',
  },
  {
    id: '3',
    title: 'Complete Home Collection',
    pieces: '7 Pieces',
    originalPrice: 7999,
    bundlePrice: 5999,
    handle: 'complete-home-collection',
  },
];

export default function BundleHighlights() {
  return (
    <section className="section-spacing bg-secondary/30">
      <div className="container-luxury">
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Bundle & Save</h2>
          <p className="font-body text-muted-foreground mt-2 text-sm">Get more for less with our curated bundles</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bundles.map((b) => (
            <Link
              key={b.id}
              to={`/product/${b.handle}`}
              className="bg-background rounded-lg p-6 shadow-soft hover-lift text-center"
            >
              <span className="inline-block bg-accent text-accent-foreground text-[10px] font-body font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-4">
                Save {Math.round(((b.originalPrice - b.bundlePrice) / b.originalPrice) * 100)}%
              </span>
              <h3 className="font-display text-lg font-semibold text-foreground">{b.title}</h3>
              <p className="font-body text-muted-foreground text-sm mt-1">{b.pieces}</p>
              <div className="mt-4 flex items-center justify-center gap-2 font-body">
                <span className="text-foreground font-semibold text-lg">₹{b.bundlePrice.toLocaleString('en-IN')}</span>
                <span className="text-muted-foreground line-through text-sm">₹{b.originalPrice.toLocaleString('en-IN')}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
