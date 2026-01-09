"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MapPin, ChevronDown } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Mobilya", href: "/urunler/mobilya" },
  { name: "Beyaz Eşya", href: "/urunler/beyaz-esya" },
  { name: "Yatak & Baza", href: "/urunler/yatak-baza" },
  { name: "Kampanyalar", href: "/kampanyalar" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    // İlk render'da scroll pozisyonunu kontrol et
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hydration sırasında tutarlılık için
  const headerClassName = mounted && (scrolled || !isHomePage) 
    ? "glass shadow-lg py-2" 
    : "bg-transparent py-4";

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${headerClassName}`}>
      {/* Üst bilgi çubuğu - Sadece scroll edilmediğinde ve mobilde değilken göster */}
      {!scrolled && (
        <div className="hidden md:block border-b border-gray-100/10 pb-4 mb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm font-medium">
            <div className="flex items-center gap-6">
              <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-2 hover:text-amber-600 transition-colors">
                <Phone size={14} />
                <span>{siteConfig.phone}</span>
              </a>
              <div className="flex items-center gap-2 text-gray-500">
                <MapPin size={14} />
                <span>{siteConfig.district}, {siteConfig.city}</span>
              </div>
            </div>
            <div className="text-gray-500">
              {siteConfig.workingHours}
            </div>
          </div>
        </div>
      )}

      {/* Ana navigasyon */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ rotate: 10 }}
              className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-xl flex items-center justify-center shadow-lg"
            >
              <span className="text-white font-bold text-xl italic">P</span>
            </motion.div>
            <div className="flex flex-col">
              <span className="font-black text-xl text-gray-900 tracking-tighter leading-none group-hover:text-amber-700 transition-colors">
                PERGAMON
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-amber-600 font-bold">
                Mobilya & Ev Gereçleri
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-bold tracking-wide transition-all duration-200 rounded-full hover:bg-amber-50 ${
                    isActive ? "text-amber-700" : "text-gray-700 hover:text-amber-700"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-1 left-4 right-4 h-0.5 bg-amber-600 rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link 
              href="/kampanyalar"
              className="hidden sm:flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-xs font-bold transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <span className="animate-pulse w-2 h-2 bg-white rounded-full" />
              KAMPANYALAR
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden p-2 rounded-xl text-gray-900 hover:bg-amber-50 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl mt-4 rounded-2xl shadow-xl border border-gray-100"
            >
              <div className="p-4 flex flex-col gap-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-4 py-4 text-base font-bold rounded-xl transition-all ${
                      pathname === item.href 
                        ? "bg-amber-50 text-amber-700" 
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
