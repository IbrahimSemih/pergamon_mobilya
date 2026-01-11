import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import { Header, Footer, WhatsAppButton } from "@/components";
import { siteConfig, siteUrl } from "@/lib/config";
import { AdminLayoutWrapper } from "@/components/AdminLayoutWrapper";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} | ${siteConfig.district} Mobilya, Beyaz Eşya`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "mobilya",
    "beyaz eşya",
    "yatak",
    "baza",
    "bergama",
    "izmir",
    "pergamon mobilya",
    "ev eşyası",
    "koltuk takımı",
    "yemek odası",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Google Search Console doğrulaması eklenecek
    // google: "verification_token",
  },
};

// LocalBusiness Schema
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  name: siteConfig.name,
  description: siteConfig.description,
  telephone: siteConfig.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address,
    addressLocality: siteConfig.district,
    addressRegion: siteConfig.city,
    addressCountry: "TR",
  },
  openingHours: "Mo-Sa 09:00-19:00",
  image: `${siteUrl}/og-image.jpg`,
  url: siteUrl,
  priceRange: "₺₺",
  paymentAccepted: "Cash, Credit Card",
  currenciesAccepted: "TRY",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <AdminLayoutWrapper>
        {children}
        </AdminLayoutWrapper>
      </body>
    </html>
  );
}
