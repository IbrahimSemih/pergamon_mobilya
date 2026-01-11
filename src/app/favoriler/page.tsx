"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, Trash2, Clock, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "@/components";
import { useFavorites } from "@/lib/useFavorites";
import { getProductById } from "@/lib/api";
import { isFirebaseConfigured } from "@/lib/firebase";
import type { Product } from "@/types";

export default function FavoritesPage() {
  const { favoriteIds, clearFavorites, mounted } = useFavorites();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Favori ürünleri yükle
  useEffect(() => {
    async function loadFavoriteProducts() {
      if (!mounted) return;
      
      if (!isFirebaseConfigured) {
        setLoading(false);
        return;
      }

      if (favoriteIds.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      try {
        const loadedProducts: Product[] = [];
        
        for (const id of favoriteIds) {
          const product = await getProductById(id);
          if (product) {
            loadedProducts.push(product);
          }
        }
        
        setProducts(loadedProducts);
      } catch (error) {
        console.error("Favori ürünler yüklenirken hata:", error);
      } finally {
        setLoading(false);
      }
    }

    loadFavoriteProducts();
  }, [favoriteIds, mounted]);

  // SSR sırasında loading göster
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 md:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-10 w-48 bg-gray-200 rounded mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-4">
                  <div className="aspect-[4/5] bg-gray-200 rounded-xl mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 md:pt-32">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Heart size={16} fill="currentColor" />
              FAVORİ ÜRÜNLERİM
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
              Beğendiğiniz Ürünler
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Favorilerinize eklediğiniz ürünler burada listelenir. 
              Favoriler 30 gün boyunca saklanır.
            </p>
            
            {favoriteIds.length > 0 && (
              <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <ShoppingBag size={16} />
                  {favoriteIds.length} ürün
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={16} />
                  30 gün saklanır
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-4 animate-pulse">
                  <div className="aspect-[4/5] bg-gray-200 rounded-xl mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : favoriteIds.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart size={40} className="text-gray-300" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Henüz favoriniz yok
              </h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Beğendiğiniz ürünleri favorilere ekleyerek daha sonra kolayca ulaşabilirsiniz.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Ürünleri Keşfet
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          ) : (
            <>
              {/* Actions */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-900">
                  {products.length} Favori Ürün
                </h2>
                <button
                  onClick={clearFavorites}
                  className="flex items-center gap-2 text-red-500 hover:text-red-600 font-medium transition-colors"
                >
                  <Trash2 size={18} />
                  Tümünü Temizle
                </button>
              </div>

              {/* Product Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                <AnimatePresence>
                  {products.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      {favoriteIds.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Favorilerinizi Paylaşın
            </h2>
            <p className="text-gray-600 mb-6">
              Beğendiğiniz ürünler hakkında bilgi almak için WhatsApp üzerinden bize ulaşın.
            </p>
            <a
              href={`https://wa.me/905516775287?text=${encodeURIComponent("Merhaba, favori ürünlerim hakkında bilgi almak istiyorum.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold transition-colors"
            >
              WhatsApp ile İletişime Geç
              <ArrowRight size={18} />
            </a>
          </div>
        </section>
      )}
    </div>
  );
}

