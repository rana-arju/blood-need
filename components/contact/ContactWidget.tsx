"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Phone } from "lucide-react";

import { cn } from "@/lib/utils";
import { useOnClickOutside } from "@/hooks/use-click-outside";
import { WhatsAppChat } from "./WhatsAppChat";

interface ContactWidgetProps {
  phoneNumber: string;
  facebookPage: string;
  whatsappNumber: string;
  initialMessage?: string;
}

export function ContactWidget({
  phoneNumber = "+8801881220413",
  facebookPage = "techdictionary",
  whatsappNumber = "+8801881220413",
  initialMessage = "হ্যালো, আমি কিছু জানতে চাই / আমার একটি সমস্যা হয়েছে। দয়া করে সাহায্য করুন।",
}: ContactWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Close the widget when clicking outside
  useOnClickOutside(widgetRef as React.RefObject<HTMLElement>, () => {
    if (isOpen) setIsOpen(false);
    if (isWhatsAppOpen) setIsWhatsAppOpen(false);
  });

  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setIsWhatsAppOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, []);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
    if (isWhatsAppOpen) setIsWhatsAppOpen(false);
  };

  const openWhatsApp = () => {
    setIsWhatsAppOpen(true);
  };

  const closeWhatsApp = () => {
    setIsWhatsAppOpen(false);
  };

  const callPhone = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const openFacebookMessenger = () => {
    window.open(`https://m.me/${facebookPage}`, "_blank");
  };

  return (
    <div
      ref={widgetRef}
      className="fixed bottom-16 md:bottom-6 right-6 z-50 flex flex-col items-end"
      role="region"
      aria-label="Contact options"
    >
      {isWhatsAppOpen && (
        <WhatsAppChat
          whatsappNumber={whatsappNumber}
          initialMessage={initialMessage}
          onClose={closeWhatsApp}
        />
      )}

      <div
        className={cn(
          "flex flex-col gap-3 items-center mb-3 transition-all duration-300",
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        )}
      >
        {/* WhatsApp */}
        <button
          onClick={openWhatsApp}
          className="flex justify-center items-center w-12 h-12 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-0 focus:ring-green-400 focus:ring-offset-0"
          aria-label="Contact via WhatsApp"
        >
          <WhatsAppIcon />
        </button>

        {/* Facebook Messenger */}
        <button
          onClick={openFacebookMessenger}
          className="flex justify-center items-center w-12 h-12 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-0 focus:ring-blue-400 focus:ring-offset-0"
          aria-label="Contact via Facebook Messenger"
        >
          <MessengerIcon />
        </button>

        {/* Phone */}
        <button
          onClick={callPhone}
          className="flex justify-center items-center w-12 h-12 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-0 focus:ring-green-400 focus:ring-offset-0"
          aria-label="Contact via phone call"
        >
          <Phone className="w-6 h-6" />
        </button>
      </div>

      {/* Toggle button */}
      <button
        onClick={toggleWidget}
        className={cn(
          "flex justify-center items-center w-14 h-14 rounded-full text-white shadow-lg transition-colors focus:outline-none focus:ring-0 focus:ring-offset-0",
          isOpen
            ? "bg-primary hover:bg-primary/90 focus:ring-primary/50"
            : "bg-primary hover:bg-primary/90 focus:ring-primary/50"
        )}
        aria-expanded={isOpen}
        aria-controls="contact-options"
        aria-label={isOpen ? "Close contact options" : "Open contact options"}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}

// Custom SVG icons to match the design
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function MessengerIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z" />
    </svg>
  );
}
