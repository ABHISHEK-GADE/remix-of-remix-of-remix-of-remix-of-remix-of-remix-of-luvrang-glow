import { Link } from 'react-router-dom';
import festiveImg from '@/assets/collection-festive.jpg';
import weddingImg from '@/assets/collection-wedding.jpg';
import everydayImg from '@/assets/collection-everyday.jpg';

const collections = [
  { title: 'Festive', handle: 'festive', image: festiveImg, description: 'Diwali, Navratri & more' },
  { title: 'Wedding', handle: 'wedding', image: weddingImg, description: 'Bridal & ceremony decor' },
  { title: 'Everyday Decor', handle: 'everyday', image: everydayImg, description: 'Elegant daily touches' },
];

export default function CollectionsGrid() {
  return (
    <section className="section-spacing bg-background">
      <div className="container-luxury">
        <div className="text-center mb-14">
          <p className="font-body text-xs tracking-widest uppercase text-primary font-semibold mb-2">Browse</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Shop <span className="text-gradient-gold">Collections</span>
          </h2>
          <p className="font-body text-muted-foreground mt-3 text-sm">Find the perfect rangoli for your occasion</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((col, i) => (
            <Link
              key={col.handle}
              to={`/collections/${col.handle}`}
              className="group relative overflow-hidden rounded-xl aspect-[3/4] hover-lift animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <img
                src={col.image}
                alt={col.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-xl font-semibold text-background">{col.title}</h3>
                <p className="font-body text-background/70 text-sm mt-1">{col.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
