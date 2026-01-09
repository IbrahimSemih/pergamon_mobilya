export * from "./product";

// Site bilgileri
export interface SiteConfig {
  name: string;
  description: string;
  phone: string;
  whatsapp: string;
  address: string;
  city: string;
  district: string;
  workingHours: string;
  socialMedia: {
    instagram?: string;
    facebook?: string;
  };
}

// LocalBusiness Schema için
export interface LocalBusinessSchema {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  telephone: string;
  address: {
    "@type": string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  openingHours: string;
  image: string;
  url: string;
}

