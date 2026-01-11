"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "@/components";
import { getCampaignProducts } from "@/lib/api";
import { generateGeneralWhatsAppLink } from "@/lib/config";
import type { Product } from "@/types";
import { Tag, Clock, Percent, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CampaignsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const campaignProducts = await getCampaignProducts();
      setProducts(campaignProducts);
    } catch (error) {
      console.error("Kampanyalı ürünler yüklenemedi:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 md:pt-32">
      {/* Hero Banner */}
      <div className="bg-[#0f172a] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[100px] -mr-48 -mt-48" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase mb-6 shadow-lg shadow-red-600/20">
              <Zap size={12} fill="currentColor" /> KISITLI SÜRE
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6">
              BÜYÜK <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">
                FIRSAT GÜNLERİ
              </span>
            </h1>
            <p className="text-gray-400 text-lg font-medium max-w-xl mb-10">
              Seçili ürünlerde dev indirimler başladı. Bergama&apos;nın en iyi fiyatlarıyla tanışın. Stoklar tükenmeden yerinizi ayırtın.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Percent, label: "%40'a Varan", sub: "Net İndirim" },
                { icon: Clock, label: "Hızlı Teslimat", sub: "Aynı Gün Sevkiyat" },
                { icon: Tag, label: "Fiyat Garantisi", sub: "En İyi Teklif" }
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
                  <item.icon size={24} className="text-red-500" />
                  <div>
                    <div className="font-black text-white text-sm uppercase tracking-tighter">{item.label}</div>
                    <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Ürün Listesi */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-2xl aspect-[3/4] animate-pulse" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
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
        ) : (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
            <div className="text-7xl mb-6">🏷️</div>
            <h2 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight">
              Aktif kampanya bulunmuyor
            </h2>
            <p className="text-gray-500 font-medium">
              Yeni indirimler ve fırsatlar için bizi takipte kalın.
            </p>
          </div>
        )}
      </div>

      {/* WhatsApp Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-amber-50 rounded-[2.5rem] p-12 md:p-20 text-center border border-amber-100">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter mb-6 uppercase">
            SİZE ÖZEL TEKLİF ALIN
          </h2>
          <p className="text-gray-600 font-medium text-lg mb-10 max-w-2xl mx-auto">
            Toplu alışverişlerde veya belirli ürün gruplarında size özel ek indirimler sunuyoruz. WhatsApp üzerinden bize ulaşın.
          </p>
          <a
            href={generateGeneralWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-green-600 hover:bg-green-500 text-white px-10 py-5 rounded-2xl font-black text-sm tracking-widest transition-all shadow-xl shadow-green-900/20 active:scale-95"
          >
            📱 WHATSAPP İLE TEKLİF AL <ArrowRight size={20} />
          </a>
        </div>
      </section>
    </div>
  );
}


