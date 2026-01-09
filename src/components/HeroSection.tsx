"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Play, Star } from "lucide-react";
import { WhatsAppButton } from "./WhatsAppButton";
import { motion } from "framer-motion";

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] },
    },
  };

  return (
    <section className="relative min-h-[90vh] flex items-center bg-[#0f172a] overflow-hidden pt-20">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-600/20 rounded-full blur-[120px] -mr-96 -mt-96 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-900/30 rounded-full blur-[100px] -ml-48 -mb-48" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E")` }} />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            {/* Badge */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-amber-500/10 backdrop-blur-md border border-amber-500/20 rounded-full px-5 py-2 mb-8"
            >
              <Sparkles size={16} className="text-amber-400" />
              <span className="text-amber-200 text-xs font-black tracking-widest uppercase">
                Bergama&apos;nın En Büyük Mağazası
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight text-balance"
            >
              Evinizi{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">
                Premium
              </span>{" "}
              Kaliteyle Yenileyin
            </motion.h1>

            {/* Description */}
            <motion.p 
              variants={itemVariants}
              className="mt-8 text-lg md:text-xl text-gray-400 leading-relaxed text-balance"
            >
              Lüks mobilya koleksiyonları, son teknoloji beyaz eşyalar ve konforlu yatak çözümleri. 
              Hayalinizdeki yaşam alanını bugün oluşturmaya başlayın.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="mt-12 flex flex-col sm:flex-row gap-5"
            >
              <Link 
                href="/urunler/mobilya"
                className="group relative inline-flex items-center justify-center gap-3 bg-amber-600 hover:bg-amber-500 text-white px-8 py-4 rounded-2xl font-black text-sm tracking-widest transition-all shadow-xl shadow-amber-900/20 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10 uppercase">Koleksiyonu Keşfet</span>
                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </Link>
              
              <div className="flex items-center">
                <WhatsAppButton variant="full" className="!bg-white/5 !border-white/10 !text-white hover:!bg-white/10" />
              </div>
            </motion.div>

            {/* Social Proof */}
            <motion.div 
              variants={itemVariants}
              className="mt-16 flex items-center gap-6"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-[#0f172a] bg-gray-800 flex items-center justify-center text-xs font-bold text-white">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-4 border-[#0f172a] bg-amber-600 flex items-center justify-center text-xs font-bold text-white">
                  +1k
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-gray-500 text-sm mt-1">
                  <span className="text-white font-bold">1,250+</span> Mutlu Bergamalı
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="hidden lg:block relative"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0f172a] via-transparent to-transparent z-10" />
              {/* Buraya şık bir görsel gelecek, şimdilik placeholder stilize bir kutu */}
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center p-12">
                  <div className="w-24 h-24 bg-amber-600/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-amber-600/30">
                    <Star size={40} className="text-amber-500 animate-spin-slow" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">Yeni Sezon</h3>
                  <p className="text-gray-400 font-medium">Premium Mobilya Koleksiyonu</p>
                </div>
              </div>
            </div>
            
            {/* Floating Card */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-2xl z-20 max-w-[240px]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Play size={16} className="text-green-600 fill-green-600" />
                </div>
                <div className="text-xs font-black text-gray-900 uppercase tracking-tighter">Hızlı Teslimat</div>
              </div>
              <p className="text-gray-500 text-[11px] leading-relaxed">
                Bergama içine aynı gün içerisinde ücretsiz montaj ve teslimat garantisi.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
