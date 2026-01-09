"use client";

import Image from "next/image";
import Link from "next/link";
import { Tag, ArrowRight, ExternalLink } from "lucide-react";
import type { Product } from "@/types";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const categoryLabels = {
    "mobilya": "Mobilya",
    "beyaz-esya": "Beyaz Eşya",
    "yatak-baza": "Yatak & Baza",
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link 
        href={`/urun/${product.slug}`}
        className="group block relative bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] transition-all duration-500 border border-gray-100"
      >
        {/* Görsel Alanı */}
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <span className="text-gray-400 text-6xl opacity-20">📦</span>
            </div>
          )}
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Kampanya badge */}
          {product.isCampaign && (
            <div className="absolute top-4 left-4 z-10">
              <div className="bg-red-600 text-white px-3 py-1.5 rounded-full text-[10px] font-black tracking-[0.1em] uppercase flex items-center gap-1.5 shadow-lg shadow-red-600/30">
                <Tag size={10} strokeWidth={3} />
                KAMPANYA
              </div>
            </div>
          )}

          {/* Stok durumu */}
          {!product.isInStock && (
            <div className="absolute inset-0 z-20 bg-white/80 backdrop-blur-[2px] flex items-center justify-center p-6 text-center">
              <span className="text-gray-900 text-xs font-black tracking-widest uppercase border-2 border-gray-900 px-4 py-2 rounded-full">
                TÜKENDİ
              </span>
            </div>
          )}

          {/* Hızlı Bakış Butonu */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <span className="bg-white text-gray-900 px-6 py-2.5 rounded-full text-[10px] font-black tracking-widest uppercase flex items-center gap-2 shadow-xl">
              İNCELE <ExternalLink size={12} strokeWidth={3} />
            </span>
          </div>
        </div>

        {/* İçerik Alanı */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600">
              {categoryLabels[product.category]}
            </span>
            <div className="h-px flex-1 bg-gray-100" />
          </div>

          <h3 className="font-bold text-gray-900 text-lg group-hover:text-amber-700 transition-colors line-clamp-1 mb-2">
            {product.title}
          </h3>

          <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-4">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            {/* Fiyat Alanı */}
            <div className="flex flex-col">
              {product.isCampaign && product.campaignPrice ? (
                <>
                  <span className="text-2xl font-black text-red-600 tracking-tighter">
                    {product.campaignPrice.toLocaleString("tr-TR")} ₺
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through font-bold">
                      {product.originalPrice.toLocaleString("tr-TR")} ₺
                    </span>
                  )}
                </>
              ) : (
                <span className="text-2xl font-black text-gray-900 tracking-tighter">
                  {product.originalPrice ? `${product.originalPrice.toLocaleString("tr-TR")} ₺` : "Fiyat Alın"}
                </span>
              )}
            </div>

            {/* Link İkonu */}
            <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-amber-600 group-hover:border-amber-600 transition-all duration-300">
              <ArrowRight size={18} className="text-gray-400 group-hover:text-white transition-colors" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
