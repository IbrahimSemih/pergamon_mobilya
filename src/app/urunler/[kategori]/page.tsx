"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components";
import { getProductsByCategory } from "@/lib/api";
import { CATEGORIES, type Product, type ProductCategory } from "@/types";
import { motion } from "framer-motion";
import { use } from "react";

interface PageProps {
  params: Promise<{ kategori: string }>;
}

// Kategori slug'ını validate et
function isValidCategory(slug: string): slug is ProductCategory {
  return CATEGORIES.some((c) => c.slug === slug);
}

export default function CategoryPage({ params }: PageProps) {
  const { kategori } = use(params);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Kategori kontrolü
  if (!isValidCategory(kategori)) {
    notFound();
  }

  const category = CATEGORIES.find((c) => c.slug === kategori)!;

  useEffect(() => {
    loadProducts();
  }, [kategori]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const fetchedProducts = await getProductsByCategory(kategori);
      setProducts(fetchedProducts);
      console.log(`Kategori "${kategori}" için ${fetchedProducts.length} ürün bulundu:`, fetchedProducts);
    } catch (error: any) {
      console.error("Ürünler yüklenemedi:", error);
      // Index hatası ise kullanıcıya bilgi ver
      if (error?.code === "failed-precondition" || error?.message?.includes("index")) {
        console.warn("Firestore index oluşturulması gerekiyor. FIRESTORE_INDEX_SETUP.md dosyasına bakın.");
      }
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

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
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-2xl aspect-[3/4] animate-pulse" />
            ))}
          </div>
        ) : products.length > 0 ? (
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


