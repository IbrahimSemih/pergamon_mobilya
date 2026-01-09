import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { WhatsAppButton } from "@/components";
import { CATEGORIES, type Product } from "@/types";
import { ChevronLeft, Check, X, Tag } from "lucide-react";
import type { Metadata } from "next";

// Demo ürünler - Firebase bağlantısından sonra silinecek
const demoProducts: Product[] = [
  {
    id: "1",
    title: "Modern Köşe Koltuk Takımı",
    slug: "modern-kose-koltuk-takimi",
    category: "mobilya",
    description: "Geniş ve konforlu köşe koltuk takımı. L şeklinde tasarım, yumuşak kumaş kaplama. Oturma grubu evinize modern bir hava katacak. Premium kalite kumaş ve dayanıklı ahşap iskelet ile uzun ömürlü kullanım sağlar.\n\nÖzellikler:\n- L şeklinde tasarım\n- Yumuşak sünger dolgu\n- Leke tutmaz kumaş\n- Dayanıklı ahşap iskelet\n- 3+2+1 kombinasyon",
    images: ["/demo/koltuk.jpg", "/demo/koltuk-2.jpg", "/demo/koltuk-3.jpg"],
    isInStock: true,
    isCampaign: true,
    campaignPrice: 45000,
    originalPrice: 55000,
    createdAt: new Date(),
  },
  {
    id: "5",
    title: "Ortopedik Yatak 160x200",
    slug: "ortopedik-yatak-160x200",
    category: "yatak-baza",
    description: "Visco memory foam teknolojisi ile üstün konfor. 10 yıl garanti. Omurga sağlığını destekleyen özel tasarım.\n\nÖzellikler:\n- Visco memory foam\n- Hava geçirgen yapı\n- Anti-alerjik kumaş\n- 160x200 cm boyut\n- 10 yıl garanti",
    images: ["/demo/yatak.jpg"],
    isInStock: true,
    isCampaign: false,
    originalPrice: 12000,
    createdAt: new Date(),
  },
  {
    id: "7",
    title: "A+ Enerji Buzdolabı",
    slug: "a-plus-enerji-buzdolabi",
    category: "beyaz-esya",
    description: "560 litre kapasite, No-Frost teknolojisi, dijital ekran. Enerji tasarruflu A+ sınıfı.\n\nÖzellikler:\n- 560 litre toplam kapasite\n- No-Frost teknolojisi\n- Dijital ekran\n- A+ enerji sınıfı\n- Paslanmaz çelik görünüm",
    images: ["/demo/buzdolabi.jpg"],
    isInStock: true,
    isCampaign: true,
    campaignPrice: 28000,
    originalPrice: 32000,
    createdAt: new Date(),
  },
];

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Statik params oluştur (SSG)
export async function generateStaticParams() {
  // Firebase bağlantısından sonra: const products = await getAllProducts();
  return demoProducts.map((product) => ({
    slug: product.slug,
  }));
}

// Dinamik metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  // Firebase bağlantısından sonra: const product = await getProductBySlug(slug);
  const product = demoProducts.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Ürün Bulunamadı",
    };
  }

  return {
    title: product.title,
    description: product.description.substring(0, 160),
    openGraph: {
      title: `${product.title} | Pergamon Mobilya`,
      description: product.description.substring(0, 160),
      images: product.images[0] ? [product.images[0]] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Firebase bağlantısından sonra: const product = await getProductBySlug(slug);
  const product = demoProducts.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const category = CATEGORIES.find((c) => c.slug === product.category);

  // Product Schema for SEO
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images,
    offers: {
      "@type": "Offer",
      availability: product.isInStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      price: product.isCampaign ? product.campaignPrice : product.originalPrice,
      priceCurrency: "TRY",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              href={`/urunler/${product.category}`}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-amber-700 transition-colors"
            >
              <ChevronLeft size={20} />
              <span>{category?.name || "Ürünler"}</span>
            </Link>
          </div>
        </div>

        {/* Ürün Detay */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Görseller */}
            <div className="space-y-4">
              {/* Ana görsel */}
              <div className="relative aspect-square bg-white rounded-2xl overflow-hidden border border-gray-200">
                {product.images[0] ? (
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <span className="text-gray-400 text-6xl">📦</span>
                  </div>
                )}

                {/* Kampanya badge */}
                {product.isCampaign && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                    <Tag size={16} />
                    Kampanya
                  </div>
                )}
              </div>

              {/* Küçük görseller */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.slice(0, 4).map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square bg-white rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:border-amber-500 transition-colors"
                    >
                      <Image
                        src={image}
                        alt={`${product.title} - ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="100px"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bilgiler */}
            <div className="space-y-6">
              {/* Kategori */}
              <span className="inline-flex items-center gap-2 text-sm font-medium text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
                {category?.icon} {category?.name}
              </span>

              {/* Başlık */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {product.title}
              </h1>

              {/* Fiyat */}
              {(product.originalPrice || product.campaignPrice) && (
                <div className="flex items-center gap-4">
                  {product.isCampaign && product.campaignPrice ? (
                    <>
                      <span className="text-3xl font-bold text-red-600">
                        {product.campaignPrice.toLocaleString("tr-TR")} ₺
                      </span>
                      {product.originalPrice && (
                        <span className="text-xl text-gray-400 line-through">
                          {product.originalPrice.toLocaleString("tr-TR")} ₺
                        </span>
                      )}
                      {product.originalPrice && (
                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-medium">
                          %{Math.round((1 - product.campaignPrice / product.originalPrice) * 100)} İndirim
                        </span>
                      )}
                    </>
                  ) : product.originalPrice ? (
                    <span className="text-3xl font-bold text-gray-900">
                      {product.originalPrice.toLocaleString("tr-TR")} ₺
                    </span>
                  ) : null}
                </div>
              )}

              {/* Stok durumu */}
              <div className="flex items-center gap-2">
                {product.isInStock ? (
                  <>
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Check size={14} className="text-green-600" />
                    </div>
                    <span className="text-green-700 font-medium">Stokta Mevcut</span>
                  </>
                ) : (
                  <>
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                      <X size={14} className="text-red-600" />
                    </div>
                    <span className="text-red-700 font-medium">Stokta Yok</span>
                  </>
                )}
              </div>

              {/* Açıklama */}
              <div className="prose prose-gray max-w-none">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Ürün Açıklaması</h3>
                <div className="text-gray-600 whitespace-pre-line leading-relaxed">
                  {product.description}
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="bg-amber-50 rounded-xl p-6 border border-amber-100">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Bu ürün hakkında bilgi almak ister misiniz?
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  WhatsApp üzerinden hızlıca iletişime geçin, fiyat ve stok bilgisi alalım.
                </p>
                <WhatsAppButton productTitle={product.title} variant="full" />
              </div>

              {/* Özellikler */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Hizmetlerimiz</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      🚚
                    </div>
                    <span className="text-sm text-gray-700">Ücretsiz Teslimat</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      🛠️
                    </div>
                    <span className="text-sm text-gray-700">Montaj Hizmeti</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      💳
                    </div>
                    <span className="text-sm text-gray-700">Taksit İmkanı</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      ✅
                    </div>
                    <span className="text-sm text-gray-700">2 Yıl Garanti</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

