import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '917028696998';
const WHATSAPP_MESSAGE = encodeURIComponent('Hi! I have a query about LuvRang products.');

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-elevated flex items-center justify-center hover:scale-110 transition-transform duration-300 animate-fade-in"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={26} fill="white" />
    </a>
  );
}