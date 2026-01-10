import Link from "next/link";
import { Phone, MapPin, Clock, Instagram, Facebook, Mail, ArrowRight, MessageSquare } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-400 overflow-hidden">
      {/* Newsletter / CTA Section */}
      <div className="relative border-b border-white/5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[100px] -mt-48" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-3xl font-black text-white tracking-tight mb-4 uppercase">Eviniz İçin En İyisini İsteyin</h2>
              <p className="text-gray-500 font-medium">Bergama&apos;daki showroomumuzu ziyaret edin veya WhatsApp üzerinden anında bilgi alın.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <a 
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-2xl font-black text-xs tracking-widest transition-all shadow-xl shadow-green-900/20 active:scale-95"
              >
                <MessageSquare size={18} /> WHATSAPP DESTEK
              </a>
              <Link 
                href="/urunler/mobilya"
                className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-2xl font-black text-xs tracking-widest transition-all active:scale-95"
              >
                ÜRÜNLERİ İNCELE <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-8 group">
              <div className="w-10 h-10 bg-linear-to-br from-amber-600 to-amber-800 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl italic">P</span>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl text-white tracking-tighter leading-none uppercase">Pergamon</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-amber-600 font-bold mt-1">Mobilya</span>
              </div>
            </Link>
            <p className="text-sm font-medium leading-relaxed mb-8 text-gray-500">
              {siteConfig.description}
            </p>
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: siteConfig.socialMedia.instagram },
                { icon: Facebook, href: siteConfig.socialMedia.facebook }
              ].map((social, i) => social.href && (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-amber-600 hover:border-amber-600 hover:text-white transition-all duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-black text-xs tracking-[0.2em] uppercase mb-8">Hızlı Menü</h3>
            <ul className="space-y-4">
              {[
                { name: "Ana Sayfa", href: "/" },
                { name: "Mobilya", href: "/urunler/mobilya" },
                { name: "Beyaz Eşya", href: "/urunler/beyaz-esya" },
                { name: "Yatak & Baza", href: "/urunler/yatak-baza" },
                { name: "Kampanyalar", href: "/kampanyalar" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm font-bold hover:text-amber-500 transition-colors flex items-center gap-2 group">
                    <div className="w-1 h-1 bg-amber-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-black text-xs tracking-[0.2em] uppercase mb-8">İletişim Bilgileri</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0 text-amber-500">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Telefon Hattı</div>
                  <a href={`tel:${siteConfig.phone}`} className="text-sm font-black text-gray-300 hover:text-amber-500 transition-colors">
                    {siteConfig.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0 text-amber-500">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Mağaza Adresi</div>
                  <div className="text-sm font-bold text-gray-300 leading-relaxed">
                    {siteConfig.address}, {siteConfig.district}, {siteConfig.city}
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="text-white font-black text-xs tracking-[0.2em] uppercase mb-8">Çalışma Saatleri</h3>
            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-amber-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <Clock size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-black text-amber-600/50 uppercase tracking-widest">Açılış - Kapanış</div>
                  <div className="text-sm font-black text-white">09:00 - 19:00</div>
                </div>
              </div>
              <p className="text-xs font-medium leading-relaxed text-gray-500 italic">
                Pazar günleri randevu üzerine hizmet vermekteyiz. Lütfen önceden iletişime geçiniz.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-xs font-bold tracking-widest text-gray-600 uppercase">
              © 2026 {siteConfig.name}. TÜM HAKLARI SAKLIDIR.
            </p>
            <div className="flex gap-8">
              <Link href="#" className="text-[10px] font-black tracking-widest uppercase hover:text-white transition-colors">Mesafeli Satış Sözleşmesi</Link>
              <Link href="#" className="text-[10px] font-black tracking-widest uppercase hover:text-white transition-colors">KVKK Aydınlatma Metni</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
