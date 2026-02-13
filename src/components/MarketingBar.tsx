export default function MarketingBar() {
  return (
    <div className="bg-foreground text-background/50 text-center py-3 px-4 font-body text-[11px] tracking-wide">
      Marketing by{' '}
      <a
        href="https://twicescale.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-background/70 hover:text-background transition-colors font-medium"
      >
        Twice Scale
      </a>
    </div>
  );
}
