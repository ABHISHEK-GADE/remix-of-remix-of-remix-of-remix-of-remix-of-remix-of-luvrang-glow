import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; to?: string }[];
}

export default function PageHeader({ title, subtitle, breadcrumb }: PageHeaderProps) {
  return (
    <div className="mb-12 animate-fade-up">
      {breadcrumb && breadcrumb.length > 0 && (
        <nav className="flex items-center gap-2 font-body text-xs text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          {breadcrumb.map((item, i) => (
            <span key={i} className="flex items-center gap-2">
              <ChevronRight size={12} />
              {item.to ? (
                <Link to={item.to} className="hover:text-foreground transition-colors">{item.label}</Link>
              ) : (
                <span className="text-foreground">{item.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}
      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">{title}</h1>
      {subtitle && (
        <p className="font-body text-muted-foreground mt-3 max-w-2xl">{subtitle}</p>
      )}
    </div>
  );
}
