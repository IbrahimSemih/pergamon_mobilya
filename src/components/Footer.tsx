import Link from "next/link";
import { Phone, MapPin, Clock, Instagram, Facebook } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Ana içerik */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Marka */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-white tracking-tight">Pergamon</span>
                <span className="text-xs text-amber-500 -mt-1 font-medium">Mobilya</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="text-white font-semibold mb-4">Kategoriler</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/urunler/mobilya" className="text-sm hover:text-amber-500 transition-colors">
                  Mobilya
                </Link>
              </li>
              <li>
                <Link href="/urunler/beyaz-esya" className="text-sm hover:text-amber-500 transition-colors">
                  Beyaz Eşya
                </Link>
              </li>
              <li>
                <Link href="/urunler/yatak-baza" className="text-sm hover:text-amber-500 transition-colors">
                  Yatak & Baza
                </Link>
              </li>
              <li>
                <Link href="/kampanyalar" className="text-sm hover:text-amber-500 transition-colors">
                  Kampanyalar
                </Link>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-white font-semibold mb-4">İletişim</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <a href={`tel:${siteConfig.phone}`} className="text-sm hover:text-amber-500 transition-colors">
                    {siteConfig.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  {siteConfig.address}<br />
                  {siteConfig.district}, {siteConfig.city}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  {siteConfig.workingHours}
                </div>
              </li>
            </ul>
          </div>

          {/* Sosyal Medya */}
          <div>
            <h3 className="text-white font-semibold mb-4">Bizi Takip Edin</h3>
            <div className="flex gap-3">
              {siteConfig.socialMedia.instagram && (
                <a
                  href={siteConfig.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-amber-600 transition-colors"
                >
                  <Instagram size={20} />
                </a>
              )}
              {siteConfig.socialMedia.facebook && (
                <a
                  href={siteConfig.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-amber-600 transition-colors"
                >
                  <Facebook size={20} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Alt çizgi */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} {siteConfig.name}. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}

