"use client";

import { notFound } from "next/navigation";
import { ProductCard } from "@/components";
import { CATEGORIES, type Product, type ProductCategory } from "@/types";
import { motion } from "framer-motion";
import { use } from "react";

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

export default function CategoryPage({ params }: PageProps) {
  const { kategori } = use(params);
  
  // Kategori kontrolü
  if (!isValidCategory(kategori)) {
    notFound();
  }

  const category = CATEGORIES.find((c) => c.slug === kategori)!;
  const products = demoProducts.filter((p) => p.category === kategori);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 md:pt-32">
      {/* Başlık */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center gap-6"
          >
            <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center text-5xl shadow-sm border border-amber-100">
              {category.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-px bg-amber-600" />
                <span className="text-xs font-black uppercase tracking-[0.3em] text-amber-600">Kategori</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-none">
                {category.name} <span className="gradient-text italic">Koleksiyonu</span>
              </h1>
              <p className="text-gray-500 mt-4 max-w-2xl font-medium">{category.description}</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Ürün Listesi */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {products.length > 0 ? (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4 mb-10"
            >
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs font-black uppercase tracking-widest text-gray-400">
                {products.length} ÜRÜN LİSTELENİYOR
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </motion.div>

            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24 bg-white rounded-[3rem] shadow-sm border border-gray-100"
          >
            <div className="text-7xl mb-6">📦</div>
            <h2 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight">
              Henüz ürün eklenmemiş
            </h2>
            <p className="text-gray-500 font-medium">
              Bu kategorideki ürünlerimiz çok yakında burada olacak.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}


