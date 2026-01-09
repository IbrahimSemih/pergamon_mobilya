"use client";

import { HeroSection, CategoryCard, ProductCard } from "@/components";
import { CATEGORIES } from "@/types";
import type { Product } from "@/types";
import Link from "next/link";
import { ArrowRight, Truck, Shield, CreditCard, Headphones, Sparkles, Star, Zap } from "lucide-react";
import { motion } from "framer-motion";

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
    id: "3",
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
    id: "4",
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
];

const features = [
  {
    icon: Truck,
    title: "Ücretsiz Teslimat",
    description: "Bergama ve çevresine ücretsiz teslimat",
    color: "bg-blue-500",
  },
  {
    icon: Shield,
    title: "Tam Garanti",
    description: "Tüm ürünlerde 2 yıl yetkili servis garantisi",
    color: "bg-amber-500",
  },
  {
    icon: CreditCard,
    title: "Taksit İmkanı",
    description: "Peşin fiyatına 12 aya varan taksit",
    color: "bg-emerald-500",
  },
  {
    icon: Headphones,
    title: "7/24 Destek",
    description: "Satış sonrası WhatsApp destek hattı",
    color: "bg-purple-500",
  },
];

export default function HomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="bg-white">
      <HeroSection />

      {/* Trust Badges */}
      <section className="relative z-20 -mt-10 md:-mt-16 mb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="bg-white p-6 rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col items-center text-center group hover:border-amber-500/30 transition-all duration-500"
            >
              <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                <feature.icon size={28} />
              </div>
              <h3 className="font-black text-gray-900 text-sm uppercase tracking-tighter">{feature.title}</h3>
              <p className="text-gray-500 text-[11px] mt-2 font-medium leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Kategoriler */}
      <section className="section-padding bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-px bg-amber-600" />
                <span className="text-xs font-black uppercase tracking-[0.3em] text-amber-600">Koleksiyonlar</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-none text-balance">
                Her İhtiyaca Uygun <span className="gradient-text italic">Premium</span> Çözümler
              </h2>
            </div>
            <p className="text-gray-500 font-medium max-w-[280px]">
              Evinizin her köşesi için özenle seçilmiş ürün gruplarımızı inceleyin.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {CATEGORIES.map((category) => (
              <motion.div key={category.slug} variants={itemVariants}>
                <CategoryCard category={category} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Öne Çıkan Ürünler */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-px bg-amber-600" />
                <span className="text-xs font-black uppercase tracking-[0.3em] text-amber-600">Vitrin</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-none">
                Popüler <span className="gradient-text">Seçimler</span>
              </h2>
            </div>
            
            <Link 
              href="/urunler/mobilya"
              className="group flex items-center gap-4 bg-gray-50 hover:bg-amber-600 text-gray-900 hover:text-white px-8 py-4 rounded-full font-black text-xs tracking-widest transition-all"
            >
              <span>TÜM ÜRÜNLERİ GÖR</span>
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-900 group-hover:scale-110 transition-transform">
                <ArrowRight size={16} />
              </div>
            </Link>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {demoProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modern Kampanya Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-[#0f172a] rounded-[2.5rem] overflow-hidden p-10 md:p-20"
        >
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[100px] -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-600/10 rounded-full blur-[80px] -ml-40 -mb-40" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase mb-6 shadow-lg shadow-red-600/20">
                <Zap size={12} fill="currentColor" /> KISITLI SÜRE
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tighter mb-8">
                SEZON SONU <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">
                  %40 İNDİRİM
                </span>
              </h2>
              <p className="text-gray-400 text-lg font-medium mb-10 max-w-md">
                Yeni sezon ürünleri gelmeden önce stokları eritiyoruz. Kaçırılmayacak fırsatları yakalayın.
              </p>
              <Link
                href="/kampanyalar"
                className="inline-flex items-center gap-4 bg-white text-gray-900 px-10 py-5 rounded-2xl font-black text-sm tracking-widest hover:bg-red-50 transition-all active:scale-95 shadow-xl"
              >
                FIRSATLARI YAKALA <ArrowRight size={20} />
              </Link>
            </div>
            
            <div className="hidden lg:flex justify-end">
              <div className="relative">
                <div className="w-80 h-80 rounded-[3rem] border-2 border-dashed border-white/10 flex items-center justify-center p-4">
                  <div className="w-full h-full bg-gradient-to-br from-red-600 to-amber-600 rounded-[2.5rem] shadow-2xl flex flex-col items-center justify-center text-white p-10 text-center">
                    <Sparkles size={48} className="mb-4" />
                    <span className="text-6xl font-black tracking-tighter mb-2">%40</span>
                    <span className="text-xs font-black tracking-widest uppercase">NET İNDİRİM</span>
                  </div>
                </div>
                {/* Floating tags */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-white text-gray-900 p-4 rounded-2xl shadow-xl font-black text-xs"
                >
                  STOKLARLA SINIRLI!
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Professional "Why Us" */}
      <section className="section-padding bg-gray-50/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative z-10 aspect-square rounded-[3rem] overflow-hidden border border-gray-100 shadow-2xl"
              >
                {/* Buraya mağaza görseli gelecek */}
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <Star size={64} className="mx-auto mb-4 opacity-20" />
                    <p className="font-black tracking-widest uppercase text-xs">Pergamon Showroom</p>
                  </div>
                </div>
              </motion.div>
              {/* Decorative background circle */}
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-amber-100 rounded-full blur-[80px] -z-10" />
              
              {/* Floating Stat */}
              <motion.div 
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -bottom-10 -right-10 bg-white p-8 rounded-3xl shadow-2xl z-20 border border-gray-50"
              >
                <div className="text-5xl font-black text-amber-600 tracking-tighter mb-1">15+</div>
                <div className="text-xs font-black text-gray-900 uppercase tracking-widest">Yıllık Tecrübe</div>
              </motion.div>
            </div>

            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-px bg-amber-600" />
                <span className="text-xs font-black uppercase tracking-[0.3em] text-amber-600">Neden Biz?</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-none mb-10 text-balance">
                Bergama&apos;da Güvenin <br />
                <span className="gradient-text">Sembolü</span> Olduk
              </h2>
              
              <div className="space-y-8">
                {[
                  { title: "Küratörlü Seçki", desc: "Sadece en kaliteli markaları ve uzun ömürlü ürünleri koleksiyonumuza dahil ediyoruz." },
                  { title: "Eksper Danışmanlık", desc: "Showroom ekibimiz eviniz için en uygun ölçü ve renk seçiminde size yardımcı olur." },
                  { title: "Lojistik Gücü", desc: "Kendi araç filomuzla nakliye ve montaj süreçlerini hatasız yönetiyoruz." }
                ].map((item, i) => (
                  <motion.div 
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-amber-600 font-black">
                      0{i + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-gray-900 mb-2 uppercase tracking-tight">{item.title}</h3>
                      <p className="text-gray-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 pt-10 border-t border-gray-100 flex items-center gap-8">
                <div>
                  <div className="text-2xl font-black text-gray-900">5,000+</div>
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Teslimat</div>
                </div>
                <div className="w-px h-10 bg-gray-100" />
                <div>
                  <div className="text-2xl font-black text-gray-900">100%</div>
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Müşteri Memnuniyeti</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
