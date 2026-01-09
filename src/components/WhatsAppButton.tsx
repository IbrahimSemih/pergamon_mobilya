"use client";

import { MessageCircle } from "lucide-react";
import { generateGeneralWhatsAppLink, generateProductWhatsAppLink } from "@/lib/config";

interface WhatsAppButtonProps {
  productTitle?: string;
  variant?: "floating" | "inline" | "full";
  className?: string;
}

export function WhatsAppButton({ productTitle, variant = "floating", className = "" }: WhatsAppButtonProps) {
  const link = productTitle 
    ? generateProductWhatsAppLink(productTitle)
    : generateGeneralWhatsAppLink();

  if (variant === "floating") {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group ${className}`}
        aria-label="WhatsApp ile iletişime geç"
      >
        <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Bize Yazın
        </span>
      </a>
    );
  }

  if (variant === "inline") {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors ${className}`}
      >
        <MessageCircle size={20} />
        <span>WhatsApp</span>
      </a>
    );
  }

  // full variant
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg ${className}`}
    >
      <MessageCircle size={24} />
      <span>WhatsApp ile Bilgi Al</span>
    </a>
  );
}

