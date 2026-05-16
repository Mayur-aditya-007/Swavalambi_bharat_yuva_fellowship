"use client";

import Link from "next/link";
import { SiWhatsapp } from 'react-icons/si';

interface WhatsAppButtonProps {
  /** Optional custom message preset text (URL encoded spaces will handle cleanly) */
  customMessage?: string;
}

export function WhatsAppButton({ 
  customMessage = "Hello! I would like to get more information about the fellowship program." 
}: WhatsAppButtonProps) {
  
  // Format phone number with country code (91 for India)
  const phoneNumber = "919685322910"; 
  const encodedMessage = encodeURIComponent(customMessage);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#22c35e] hover:scale-110 active:scale-95 transition-all duration-200 group group-hover:shadow-xl"
      aria-label="Contact us on WhatsApp"
    >
      {/* Dynamic Popover Text (Appears when hovering over the button) */}
      <span className="absolute right-16 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 text-xs font-medium px-3 py-1.5 rounded-lg shadow-md opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap border border-zinc-100 dark:border-zinc-800">
        Chat with us
      </span>

      {/* WhatsApp Chat Icon */}
<SiWhatsapp size={24} color="#fff" />

    </Link>
  );
}