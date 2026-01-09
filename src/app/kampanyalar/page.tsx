import { ProductCard } from "@/components";
import type { Product } from "@/types";
import type { Metadata } from "next";
import { Tag, Clock, Percent } from "lucide-react";

export const metadata: Metadata = {
  title: "Kampanyalar",
  description: "Pergamon Mobilya kampanyalı ürünleri. Mobilya, beyaz eşya ve yatak-baza ürünlerinde özel indirimler.",
  openGraph: {
    title: "Kampanyalar | Pergamon Mobilya",
    description: "Mobilya, beyaz eşya ve yatak-baza ürünlerinde özel indirimler.",
  },
};

// Demo kampanyalı ürünler - Firebase bağlantısından sonra silinecek
const campaignProducts: Product[] = [
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
    id: "4",
    title: "TV Ünitesi Modern",
    slug: "tv-unitesi-modern",
    category: "mobilya",
    description: "240 cm genişlik, kapaklı ve raflı bölümler. LED aydınlatma dahil.",
    images: ["/demo/tv-unitesi.jpg"],
    isInStock: true,
    isCampaign: true,
    campaignPrice: 8500,
    originalPrice: 11000,
    createdAt: new Date(),
  },
  {
    id: "6",
    title: "Baza Seti 160x200",
    slug: "baza-seti-160x200",
    category: "yatak-baza",
    description: "Sandıklı baza + başlık. Kumaş kaplama, metal ayaklar.",
    images: ["/demo/baza.jpg"],
    isInStock: true,
    isCampaign: true,
    campaignPrice: 9000,
    originalPrice: 11500,
    createdAt: new Date(),
  },
  {
    id: "7",
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
];

export default function CampaignsPage() {
  // Firebase bağlantısından sonra: const products = await getCampaignProducts();
  const products = campaignProducts;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-4">
            <Tag size={32} />
            <h1 className="text-3xl md:text-4xl font-bold">Kampanyalı Ürünler</h1>
          </div>
          <p className="text-red-100 text-lg max-w-2xl">
            Seçili ürünlerde %30&apos;a varan indirimlerden yararlanın. 
            Kampanyalar stoklarla sınırlıdır, acele edin!
          </p>
          
          {/* Kampanya bilgi kartları */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
              <Percent size={24} className="text-red-200" />
              <div>
                <div className="font-bold text-white">%30&apos;a Varan</div>
                <div className="text-red-200 text-sm">İndirim Fırsatı</div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
              <Clock size={24} className="text-red-200" />
              <div>
                <div className="font-bold text-white">Sınırlı Süre</div>
                <div className="text-red-200 text-sm">Stoklar Tükenmeden</div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
              <Tag size={24} className="text-red-200" />
              <div>
                <div className="font-bold text-white">{products.length} Ürün</div>
                <div className="text-red-200 text-sm">Kampanyada</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ürün Listesi */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in opacity-0"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏷️</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Şu an aktif kampanya bulunmuyor
            </h2>
            <p className="text-gray-600">
              Yeni kampanyalardan haberdar olmak için bizi takip edin!
            </p>
          </div>
        )}
      </div>

      {/* Alt Banner */}
      <div className="bg-amber-50 border-t border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Kampanyalardan Haberdar Olun!
          </h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            WhatsApp üzerinden bize yazın, yeni kampanya ve indirimlerden ilk siz haberdar olun.
          </p>
          <a
            href={`https://wa.me/905551234567?text=${encodeURIComponent("Merhaba, kampanyalardan haberdar olmak istiyorum.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            📱 WhatsApp ile Kayıt Ol
          </a>
        </div>
      </div>
    </div>
  );
}

