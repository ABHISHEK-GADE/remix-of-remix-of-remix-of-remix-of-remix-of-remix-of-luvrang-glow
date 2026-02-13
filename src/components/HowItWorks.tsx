const steps = [
  { step: '01', title: 'Place', desc: 'Set your rangoli on any flat surface — floor, table, or entrance' },
  { step: '02', title: 'Celebrate', desc: 'Enjoy the festive beauty it brings to your space' },
  { step: '03', title: 'Store', desc: 'Carefully store flat in the included packaging' },
  { step: '04', title: 'Reuse', desc: 'Bring it out for the next occasion, good as new' },
];

export default function HowItWorks() {
  return (
    <section className="section-spacing bg-secondary/30">
      <div className="container-luxury">
        <div className="text-center mb-14">
          <p className="font-body text-xs tracking-widest uppercase text-primary font-semibold mb-2">Simple & Elegant</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            How It <span className="text-gradient-gold">Works</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div
              key={s.step}
              className="relative text-center p-6 rounded-xl bg-background border border-border/50 hover-lift animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className="font-display text-5xl font-bold text-primary/10 leading-none">{s.step}</span>
              <h3 className="font-display text-lg font-semibold text-foreground mt-3 mb-2">{s.title}</h3>
              <p className="font-body text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-[2px] bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
