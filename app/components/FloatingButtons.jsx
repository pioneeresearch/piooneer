"use client";
import { Phone, MessageCircle } from "lucide-react";

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-5 right-3 z-50 flex flex-col items-center gap-3 min-[380px]:bottom-6 min-[380px]:right-5">
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="grid h-12 w-12 place-items-center rounded-full bg-green-500 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-green-600"
      >
        <MessageCircle className="h-5 w-5" />
      </a>

      <a
        href="tel:+919876543210"
        aria-label="Call now"
        className="grid h-12 w-12 place-items-center rounded-full bg-sky-600 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-sky-700"
      >
        <Phone className="h-5 w-5" />
      </a>
    </div>
  );
}
