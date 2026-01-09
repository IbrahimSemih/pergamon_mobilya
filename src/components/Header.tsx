"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/config";

const navigation = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Mobilya", href: "/urunler/mobilya" },
  { name: "Beyaz Eşya", href: "/urunler/beyaz-esya" },
  { name: "Yatak & Baza", href: "/urunler/yatak-baza" },
  { name: "Kampanyalar", href: "/kampanyalar" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Üst bilgi çubuğu */}
      <div className="bg-amber-700 text-amber-50 py-2 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-1 hover:text-white transition-colors">
              <Phone size={14} />
              <span>{siteConfig.phone}</span>
            </a>
          </div>
          <div className="hidden sm:flex items-center gap-1">
            <MapPin size={14} />
            <span>{siteConfig.district}, {siteConfig.city}</span>
          </div>
        </div>
      </div>

      {/* Ana navigasyon */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-gray-900 tracking-tight">Pergamon</span>
              <span className="text-xs text-amber-700 -mt-1 font-medium">Mobilya</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-all duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-3 text-base font-medium text-gray-700 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

