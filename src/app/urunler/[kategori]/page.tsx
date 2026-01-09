import { notFound } from "next/navigation";
import { ProductCard } from "@/components";
import { CATEGORIES, type Product, type ProductCategory } from "@/types";
import type { Metadata } from "next";

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
    title: "Klasik Koltuk Takımı 3+2+1",
    slug: "klasik-koltuk-takimi",
    category: "mobilya",
    description: "Şık ve zarif klasik koltuk takımı. Dayanıklı kumaş, masif ahşap ayaklar.",
    images: ["/demo/klasik-koltuk.jpg"],
    isInStock: true,
    isCampaign: false,
    originalPrice: 38000,
    createdAt: new Date(),
  },
  {
    id: "3",
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
    id: "5",
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
  {
    id: "8",
    title: "Çamaşır Makinesi 9kg",
    slug: "camasir-makinesi-9kg",
    category: "beyaz-esya",
    description: "9 kg kapasite, 1400 devir, A+++ enerji sınıfı.",
    images: ["/demo/camasir.jpg"],
    isInStock: true,
    isCampaign: false,
    originalPrice: 18000,
    createdAt: new Date(),
  },
];

interface PageProps {
  params: Promise<{ kategori: string }>;
}

// Kategori slug'ını validate et
function isValidCategory(slug: string): slug is ProductCategory {
  return CATEGORIES.some((c) => c.slug === slug);
}

// Statik params oluştur (SSG)
export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    kategori: category.slug,
  }));
}

// Dinamik metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { kategori } = await params;
  const category = CATEGORIES.find((c) => c.slug === kategori);
  
  if (!category) {
    return {
      title: "Kategori Bulunamadı",
    };
  }

  return {
    title: `${category.name} Ürünleri`,
    description: category.description,
    openGraph: {
      title: `${category.name} Ürünleri | Pergamon Mobilya`,
      description: category.description,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { kategori } = await params;
  
  // Kategori kontrolü
  if (!isValidCategory(kategori)) {
    notFound();
  }

  const category = CATEGORIES.find((c) => c.slug === kategori)!;
  
  // Bu kategoriye ait ürünleri filtrele
  // Firebase bağlantısından sonra: const products = await getProductsByCategory(kategori);
  const products = demoProducts.filter((p) => p.category === kategori);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Başlık */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4">
            <span className="text-5xl">{category.icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
              <p className="text-gray-600 mt-1">{category.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ürün Listesi */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {products.length > 0 ? (
          <>
            <p className="text-gray-500 mb-6">{products.length} ürün bulundu</p>
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
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Bu kategoride henüz ürün yok
            </h2>
            <p className="text-gray-600">
              Yakında yeni ürünler eklenecek. Takipte kalın!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

