import { HeroSection, CategoryCard, ProductCard } from "@/components";
import { CATEGORIES } from "@/types";
import type { Product } from "@/types";
import Link from "next/link";
import { ArrowRight, Truck, Shield, CreditCard, Headphones } from "lucide-react";

// Demo ürünler - Firebase bağlantısından sonra silinecek
const demoProducts: Product[] = [
  {
    id: "1",
    title: "Modern Köşe Koltuk Takımı",
    slug: "modern-kose-koltuk-takimi",
    category: "mobilya",
    description: "Geniş ve konforlu köşe koltuk takımı. L şeklinde tasarım, yumuşak kumaş kaplama.",
    images: ["/demo/koltuk.jpg"],
    isInStock: true,
    isCampaign: true,
    campaignPrice: 45000,
    originalPrice: 55000,
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Ortopedik Yatak 160x200",
    slug: "ortopedik-yatak-160x200",
    category: "yatak-baza",
    description: "Visco memory foam teknolojisi ile üstün konfor. 10 yıl garanti.",
    images: ["/demo/yatak.jpg"],
    isInStock: true,
    isCampaign: false,
    originalPrice: 12000,
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "A+ Enerji Buzdolabı",
    slug: "a-plus-enerji-buzdolabi",
    category: "beyaz-esya",
    description: "560 litre kapasite, No-Frost teknolojisi, dijital ekran.",
    images: ["/demo/buzdolabi.jpg"],
    isInStock: true,
    isCampaign: true,
    campaignPrice: 28000,
    originalPrice: 32000,
    createdAt: new Date(),
  },
  {
    id: "4",
    title: "Yemek Odası Takımı",
    slug: "yemek-odasi-takimi",
    category: "mobilya",
    description: "6 kişilik masa ve sandalye seti. Masif ahşap, modern tasarım.",
    images: ["/demo/yemek-odasi.jpg"],
    isInStock: true,
    isCampaign: false,
    originalPrice: 35000,
    createdAt: new Date(),
  },
];

const features = [
  {
    icon: Truck,
    title: "Ücretsiz Teslimat",
    description: "Bergama ve çevresine ücretsiz teslimat",
  },
  {
    icon: Shield,
    title: "Garanti",
    description: "Tüm ürünlerde 2 yıl garanti",
  },
  {
    icon: CreditCard,
    title: "Taksit İmkanı",
    description: "12 aya varan taksit seçenekleri",
  },
  {
    icon: Headphones,
    title: "Destek",
    description: "7/24 WhatsApp destek hattı",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Özellikler */}
      <section className="bg-white py-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="flex items-center gap-3 animate-fade-in opacity-0"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <feature.icon size={24} className="text-amber-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{feature.title}</h3>
                  <p className="text-xs text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kategoriler */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Kategorilerimiz</h2>
            <p className="mt-2 text-gray-600">İhtiyacınıza göre ürün kategorisini seçin</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CATEGORIES.map((category, index) => (
              <div 
                key={category.slug}
                className="animate-fade-in opacity-0"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Öne Çıkan Ürünler */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Öne Çıkan Ürünler</h2>
              <p className="mt-2 text-gray-600">En beğenilen ürünlerimizi keşfedin</p>
            </div>
            <Link 
              href="/urunler/mobilya"
              className="hidden sm:flex items-center gap-2 text-amber-700 font-medium hover:text-amber-800 transition-colors"
            >
              <span>Tümünü Gör</span>
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {demoProducts.map((product, index) => (
              <div 
                key={product.id}
                className="animate-fade-in opacity-0"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link 
              href="/urunler/mobilya"
              className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-6 py-3 rounded-xl font-medium hover:bg-amber-200 transition-colors"
            >
              <span>Tüm Ürünleri Gör</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Kampanya Banner */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🎉 Sezon Sonu İndirimleri Başladı!
          </h2>
          <p className="text-red-100 text-lg mb-8 max-w-2xl mx-auto">
            Seçili ürünlerde %30&apos;a varan indirimlerden yararlanın. 
            Kampanya stoklarla sınırlıdır.
          </p>
          <Link
            href="/kampanyalar"
            className="inline-flex items-center gap-2 bg-white text-red-700 px-8 py-4 rounded-xl font-bold hover:bg-red-50 transition-colors shadow-lg"
          >
            <span>Kampanyaları Gör</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Neden Biz */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Neden Pergamon Mobilya?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-amber-700 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">15 Yıllık Deneyim</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Bergama ve çevresinde 15 yılı aşkın süredir güvenilir hizmet sunuyoruz.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-amber-700 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Kaliteli Ürünler</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Türkiye&apos;nin önde gelen markalarından seçilmiş kaliteli ürünler.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-amber-700 font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Uygun Fiyat</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Rakipsiz fiyatlarla kaliteli ürünlere sahip olun.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-amber-700 font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Hızlı Teslimat</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Siparişleriniz en kısa sürede kapınıza teslim edilir.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">🏠</div>
                  <p className="text-amber-800 font-medium">
                    Hayalinizdeki eve bir adım daha yakınsınız
                  </p>
                </div>
              </div>
              {/* Dekoratif element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-amber-400 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
