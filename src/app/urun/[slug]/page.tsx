"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { WhatsAppButton } from "@/components";
import { CATEGORIES, type Product } from "@/types";
import { ChevronLeft, ShieldCheck, Truck, CreditCard, Star } from "lucide-react";
import { motion } from "framer-motion";
import { use } from "react";

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

export default function ProductDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  
  // Firebase bağlantısından sonra: const product = await getProductBySlug(slug);
  const product = demoProducts.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const category = CATEGORIES.find((c) => c.slug === product.category);

  return (
    <div className="min-h-screen bg-white pt-24 md:pt-32">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link
          href={`/urunler/${product.category}`}
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-amber-600 transition-colors"
        >
          <ChevronLeft size={14} />
          <span>{category?.name || "Ürünler"}</span>
        </Link>
      </div>

      {/* Ürün Detay */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Görsel Alanı */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="relative aspect-square bg-gray-50 rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-2xl">
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
                  <span className="text-gray-400 text-6xl opacity-20">📦</span>
                </div>
              )}

              {/* Kampanya badge */}
              {product.isCampaign && (
                <div className="absolute top-8 left-8 bg-red-600 text-white px-5 py-2 rounded-full text-xs font-black tracking-widest uppercase shadow-xl">
                  KAMPANYA
                </div>
              )}
            </div>

            {/* Küçük görseller */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square bg-white rounded-2xl overflow-hidden border border-gray-100 cursor-pointer hover:border-amber-600 transition-all hover:scale-105"
                  >
                    <Image
                      src={image}
                      alt={`${product.title} - ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Bilgi Alanı */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col h-full"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-black uppercase tracking-[0.3em] text-amber-600">
                {category?.name}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
              <div className="flex items-center gap-1 text-amber-500">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={12} fill="currentColor" />)}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter leading-none mb-6">
              {product.title}
            </h1>

            {/* Fiyat */}
            <div className="bg-gray-50 rounded-3xl p-8 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border border-gray-100">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Özel Fiyat Teklifi</p>
                <div className="flex items-baseline gap-4">
                  {product.isCampaign && product.campaignPrice ? (
                    <>
                      <span className="text-4xl font-black text-red-600 tracking-tighter">
                        {product.campaignPrice.toLocaleString("tr-TR")} ₺
                      </span>
                      {product.originalPrice && (
                        <span className="text-xl text-gray-300 line-through font-bold">
                          {product.originalPrice.toLocaleString("tr-TR")} ₺
                        </span>
                      )}
                    </>
                  ) : product.originalPrice ? (
                    <span className="text-4xl font-black text-gray-900 tracking-tighter">
                      {product.originalPrice.toLocaleString("tr-TR")} ₺
                    </span>
                  ) : (
                    <span className="text-2xl font-black text-gray-900 tracking-tighter uppercase">Fiyat Alın</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${product.isInStock ? "bg-green-500 animate-pulse" : "bg-gray-300"}`} />
                <span className={`text-xs font-black uppercase tracking-widest ${product.isInStock ? "text-green-700" : "text-gray-500"}`}>
                  {product.isInStock ? "STOKTA MEVCUT" : "TÜKENDİ"}
                </span>
              </div>
            </div>

            {/* Açıklama */}
            <div className="mb-10">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Ürün Detayları</h3>
              <div className="text-gray-600 font-medium leading-relaxed whitespace-pre-line text-lg">
                {product.description}
              </div>
            </div>

            {/* Hizmetler */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {[
                { icon: Truck, text: "Ücretsiz Teslimat", color: "text-blue-600" },
                { icon: ShieldCheck, text: "2 Yıl Garanti", color: "text-amber-600" },
                { icon: CreditCard, text: "Taksit Seçenekleri", color: "text-emerald-600" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white border border-gray-100 p-4 rounded-2xl shadow-sm">
                  <item.icon size={20} className={item.color} />
                  <span className="text-[10px] font-black uppercase tracking-tighter text-gray-900">{item.text}</span>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <div className="mt-auto">
              <WhatsAppButton productTitle={product.title} variant="full" className="w-full !py-6 !rounded-3xl !shadow-2xl shadow-green-500/20" />
              <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-4">
                Ürünle ilgili tüm sorularınız için uzman ekibimizle iletişime geçin.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
