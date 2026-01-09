import Image from "next/image";
import Link from "next/link";
import { Tag } from "lucide-react";
import type { Product } from "@/types";

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
    <Link 
      href={`/urun/${product.slug}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      {/* Görsel */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400 text-4xl">📦</span>
          </div>
        )}
        
        {/* Kampanya badge */}
        {product.isCampaign && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Tag size={12} />
            Kampanya
          </div>
        )}

        {/* Stok durumu */}
        {!product.isInStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium">
              Stokta Yok
            </span>
          </div>
        )}
      </div>

      {/* İçerik */}
      <div className="p-4">
        {/* Kategori */}
        <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-1 rounded-md">
          {categoryLabels[product.category]}
        </span>

        {/* Başlık */}
        <h3 className="mt-2 font-semibold text-gray-900 group-hover:text-amber-700 transition-colors line-clamp-2">
          {product.title}
        </h3>

        {/* Açıklama */}
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>

        {/* Fiyat (varsa) */}
        {(product.originalPrice || product.campaignPrice) && (
          <div className="mt-3 flex items-center gap-2">
            {product.isCampaign && product.campaignPrice && (
              <>
                <span className="text-lg font-bold text-red-600">
                  {product.campaignPrice.toLocaleString("tr-TR")} ₺
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {product.originalPrice.toLocaleString("tr-TR")} ₺
                  </span>
                )}
              </>
            )}
            {!product.isCampaign && product.originalPrice && (
              <span className="text-lg font-bold text-gray-900">
                {product.originalPrice.toLocaleString("tr-TR")} ₺
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}

