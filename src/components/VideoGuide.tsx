export default function VideoGuide() {
  return (
    <section className="section-spacing bg-background">
      <div className="container-luxury">
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Watch How It's Done</h2>
          <p className="font-body text-muted-foreground mt-2 text-sm">See our handmade rangoli in action</p>
        </div>

        <div className="max-w-3xl mx-auto rounded-xl overflow-hidden bg-secondary aspect-video flex items-center justify-center">
          {/* Replace with actual YouTube/video embed */}
          <div className="text-center p-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-primary ml-1">
                <path d="M8 5.14v14l11-7-11-7z" fill="currentColor" />
              </svg>
            </div>
            <p className="font-body text-muted-foreground text-sm">Video coming soon</p>
            <p className="font-body text-muted-foreground/60 text-xs mt-1">Add your YouTube video URL to embed here</p>
          </div>
        </div>
      </div>
    </section>
  );
}
