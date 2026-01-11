"use client";

import { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { WhatsAppButton } from "@/components";
import { FavoriteButton } from "@/components/FavoriteButton";
import { ShareButton } from "@/components/ShareButton";
import { CATEGORIES, type Product } from "@/types";
import { ChevronLeft, ShieldCheck, Truck, CreditCard, Star, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { use } from "react";
import { getProductBySlug } from "@/lib/api";
import { isFirebaseConfigured } from "@/lib/firebase";
import { siteUrl } from "@/lib/config";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    async function fetchProduct() {
      if (!isFirebaseConfigured) {
        setError("Firebase yapılandırması bulunamadı.");
        setLoading(false);
        return;
      }

      try {
        const data = await getProductBySlug(slug);
        if (!data) {
          router.push("/404");
          return;
        }
        setProduct(data);
      } catch (err) {
        console.error("Ürün yüklenirken hata:", err);
        setError("Ürün yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug, router]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-24 md:pt-32 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-amber-600 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Ürün yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen bg-white pt-24 md:pt-32 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-medium mb-4">{error || "Ürün bulunamadı."}</p>
          <Link 
            href="/"
            className="text-amber-600 hover:text-amber-700 font-bold underline"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
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
              {product.images[selectedImage] ? (
                <Image
                  src={product.images[selectedImage]}
                  alt={product.title}
                  fill
                  className="object-cover transition-opacity duration-300"
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
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square bg-white rounded-2xl overflow-hidden border-2 cursor-pointer transition-all hover:scale-105 ${
                      selectedImage === index 
                        ? "border-amber-600 ring-2 ring-amber-600/20" 
                        : "border-gray-100 hover:border-amber-400"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} - ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </button>
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

            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter leading-none mb-4">
              {product.title}
            </h1>

            {/* Favori ve Paylaş Butonları */}
            <div className="flex items-center gap-3 mb-6">
              <FavoriteButton productId={product.id} variant="full" />
              <ShareButton 
                url={`${siteUrl}/urun/${product.slug}`}
                title={product.title}
                description={product.description}
              />
            </div>

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
