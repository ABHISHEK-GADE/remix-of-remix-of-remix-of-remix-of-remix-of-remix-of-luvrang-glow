const steps = [
  { step: '01', title: 'Place', desc: 'Set your rangoli on any flat surface' },
  { step: '02', title: 'Celebrate', desc: 'Enjoy the festive beauty it brings' },
  { step: '03', title: 'Store', desc: 'Carefully store after the celebration' },
  { step: '04', title: 'Reuse', desc: 'Bring it out for the next occasion' },
];

export default function HowItWorks() {
  return (
    <section className="section-spacing bg-secondary/30">
      <div className="container-luxury">
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">How It Works</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {steps.map((s) => (
            <div key={s.step} className="text-center">
              <span className="font-display text-4xl font-bold text-primary/15">{s.step}</span>
              <h3 className="font-display text-lg font-semibold text-foreground mt-2">{s.title}</h3>
              <p className="font-body text-xs text-muted-foreground mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
