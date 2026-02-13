import { User } from 'lucide-react';

export default function Account() {
  return (
    <div className="container-luxury section-spacing text-center">
      <User size={48} className="mx-auto text-muted-foreground mb-4" />
      <h1 className="font-display text-3xl font-bold mb-4">My Account</h1>
      <p className="text-muted-foreground font-body max-w-md mx-auto">
        Account functionality coming soon. You'll be able to track orders, manage addresses, and view your purchase history.
      </p>
    </div>
  );
}
