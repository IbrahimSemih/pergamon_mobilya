import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { WhatsAppButton } from "./WhatsAppButton";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900 overflow-hidden">
      {/* Dekoratif elementler */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-300 rounded-full blur-3xl" />
      </div>
      
      {/* Grid deseni */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <Sparkles size={16} className="text-amber-300" />
            <span className="text-amber-100 text-sm font-medium">Bergama&apos;nın Güvenilir Adresi</span>
          </div>

          {/* Başlık */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Evinizi{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-300">
              Hayallerinize
            </span>{" "}
            Göre Döşeyin
          </h1>

          {/* Alt başlık */}
          <p className="mt-6 text-lg md:text-xl text-amber-100/80 leading-relaxed max-w-2xl">
            Mobilya, beyaz eşya ve yatak-baza ürünlerinde geniş ürün yelpazemiz ve 
            uygun fiyat garantimizle hizmetinizdeyiz.
          </p>

          {/* CTA Butonları */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link 
              href="/urunler/mobilya"
              className="inline-flex items-center justify-center gap-2 bg-white text-amber-900 px-6 py-3 rounded-xl font-semibold hover:bg-amber-50 transition-colors"
            >
              <span>Ürünleri Keşfet</span>
              <ArrowRight size={20} />
            </Link>
            <WhatsAppButton variant="full" />
          </div>

          {/* İstatistikler */}
          <div className="mt-12 grid grid-cols-3 gap-6 sm:gap-12 max-w-lg">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white">500+</div>
              <div className="text-amber-200/60 text-sm mt-1">Mutlu Müşteri</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white">15+</div>
              <div className="text-amber-200/60 text-sm mt-1">Yıllık Deneyim</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white">1000+</div>
              <div className="text-amber-200/60 text-sm mt-1">Ürün Çeşidi</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

