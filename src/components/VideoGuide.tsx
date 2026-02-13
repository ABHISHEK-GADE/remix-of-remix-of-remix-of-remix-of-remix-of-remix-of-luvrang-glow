import { Play } from 'lucide-react';

export default function VideoGuide() {
  return (
    <section className="section-spacing bg-background">
      <div className="container-luxury">
        <div className="text-center mb-14">
          <p className="font-body text-xs tracking-widest uppercase text-primary font-semibold mb-2">See It In Action</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Watch How It's <span className="text-gradient-gold">Done</span>
          </h2>
          <p className="font-body text-muted-foreground mt-3 text-sm max-w-lg mx-auto">See our handmade rangoli transform any space in seconds</p>
        </div>

        <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden bg-secondary/50 border border-border/50 aspect-video flex items-center justify-center animate-fade-up group cursor-pointer hover-lift">
          <div className="text-center p-8">
            <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Play size={32} className="text-primary ml-1" fill="currentColor" />
            </div>
            <p className="font-display text-lg font-semibold text-foreground mb-1">Video Coming Soon</p>
            <p className="font-body text-muted-foreground text-sm">Add your YouTube video URL to embed here</p>
          </div>
        </div>
      </div>
    </section>
  );
}
