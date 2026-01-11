import type { SiteConfig } from "@/types";

// Site yapılandırması - Gerçek bilgilerle güncellenecek
export const siteConfig: SiteConfig = {
  name: "Pergamon Mobilya",
  description: "Kaliteli mobilya, beyaz eşya ve yatak-baza ürünlerinde güvenilir adresiniz. Uygun fiyat ve kaliteli hizmet garantisiyle yanınızdayız.",
  phone: "+90 551 677 5287",
  whatsapp: "905516775287", // Sadece rakamlar (WhatsApp API için)
  address: "Atatürk Caddesi No: 123",
  city: "İzmir",
  district: "Bergama",
  workingHours: "Pazartesi-Cumartesi: 09:00-19:00",
  socialMedia: {
    instagram: "https://instagram.com/pergamonmobilya",
    facebook: "https://facebook.com/pergamonmobilya",
  },
};

// WhatsApp mesaj linki oluştur
export function generateWhatsAppLink(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodedMessage}`;
}

// Ürün için WhatsApp linki
export function generateProductWhatsAppLink(productTitle: string): string {
  const message = `Merhaba, "${productTitle}" ürünü hakkında bilgi almak istiyorum.`;
  return generateWhatsAppLink(message);
}

// Genel soru için WhatsApp linki
export function generateGeneralWhatsAppLink(): string {
  const message = "Merhaba, ürünleriniz hakkında bilgi almak istiyorum.";
  return generateWhatsAppLink(message);
}

// SEO için site URL'i
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pergamonmobilya.com";

