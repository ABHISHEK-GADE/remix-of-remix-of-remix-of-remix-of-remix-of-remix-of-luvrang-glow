import { useEffect, useState } from 'react';

const announcements = [
  'PAN India Shipping • Free on Prepaid Orders',
  'Cash on Delivery Available (₹59)',
  'Made to Order • Premium Handmade Rangoli',
  '🎉 Festival Special — Up to 30% Off',
];

export default function AnnouncementBar() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % announcements.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-primary text-primary-foreground overflow-hidden h-9 flex items-center justify-center relative">
      {announcements.map((text, i) => (
        <span
          key={i}
          className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm font-body tracking-wide transition-all duration-500 ease-in-out"
          style={{
            opacity: i === current ? 1 : 0,
            transform: i === current ? 'translateY(0)' : 'translateY(100%)',
          }}
        >
          {text}
        </span>
      ))}
    </div>
  );
}
