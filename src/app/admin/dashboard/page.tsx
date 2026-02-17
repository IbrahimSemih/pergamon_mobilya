"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { 
  LogOut, 
  Package, 
  Tag, 
  Plus, 
  Loader2,
  LayoutDashboard,
  Settings,
  TrendingUp,
  Eye
} from "lucide-react";
import type { Product } from "@/types";

// Demo veriler
const demoStats = {
  totalProducts: 8,
  inStock: 7,
  campaigns: 4,
  categories: 3,
};

const demoProducts: Product[] = [
  {
    id: "1",
    title: "Modern Köşe Koltuk Takımı",
    slug: "modern-kose-koltuk-takimi",
    category: "mobilya",
    description: "Geniş ve konforlu köşe koltuk takımı.",
    images: [],
    isInStock: true,
    isCampaign: true,
    campaignPrice: 45000,
    originalPrice: 55000,
    salesCity: "İzmir",
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Ortopedik Yatak 160x200",
    slug: "ortopedik-yatak-160x200",
    category: "yatak-baza",
    description: "Visco memory foam teknolojisi.",
    images: [],
    isInStock: true,
    isCampaign: false,
    originalPrice: 12000,
    salesCity: "İzmir",
    createdAt: new Date(),
  },
];

export default function AdminDashboard() {
  const { user, loading: authLoading, signOut } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(demoProducts);
  const [stats] = useState(demoStats);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/admin");
    }
  }, [user, authLoading, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/admin");
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Üst bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">P</span>
              </div>
              <span className="font-semibold text-gray-900">Admin Panel</span>
            </div>
            
            <div className="flex items-center gap-4">
              <Link
                href="/"
                target="_blank"
                className="text-gray-600 hover:text-amber-600 text-sm flex items-center gap-1"
              >
                <Eye size={16} />
                <span className="hidden sm:inline">Siteyi Görüntüle</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors text-sm"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Çıkış</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Başlık */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Hoş geldiniz, {user.email}</p>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Toplam Ürün</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalProducts}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Package size={24} className="text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Stokta</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.inStock}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp size={24} className="text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Kampanyalı</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.campaigns}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <Tag size={24} className="text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Kategoriler</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.categories}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <LayoutDashboard size={24} className="text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Hızlı İşlemler */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Link
            href="/admin/urunler/yeni"
            className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 text-white hover:from-amber-600 hover:to-amber-700 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">Yeni Ürün Ekle</h3>
                <p className="text-amber-100 text-sm mt-1">Kataloga ürün ekleyin</p>
              </div>
              <Plus size={32} className="group-hover:scale-110 transition-transform" />
            </div>
          </Link>
          
          <Link
            href="/admin/urunler"
            className="bg-white rounded-xl p-6 border border-gray-200 hover:border-amber-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">Ürünleri Yönet</h3>
                <p className="text-gray-500 text-sm mt-1">Düzenle, sil, güncelle</p>
              </div>
              <Package size={32} className="text-gray-400 group-hover:text-amber-600 transition-colors" />
            </div>
          </Link>
          
          <Link
            href="/admin/ayarlar"
            className="bg-white rounded-xl p-6 border border-gray-200 hover:border-amber-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">Ayarlar</h3>
                <p className="text-gray-500 text-sm mt-1">Site ayarlarını düzenle</p>
              </div>
              <Settings size={32} className="text-gray-400 group-hover:text-amber-600 transition-colors" />
            </div>
          </Link>
        </div>

        {/* Son Eklenen Ürünler */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Son Eklenen Ürünler</h2>
            <Link href="/admin/urunler" className="text-amber-600 hover:text-amber-700 text-sm font-medium">
              Tümünü Gör →
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {products.slice(0, 5).map((product) => (
              <div key={product.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                    📦
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{product.title}</h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {product.isCampaign && (
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">
                      Kampanya
                    </span>
                  )}
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    product.isInStock 
                      ? "bg-green-100 text-green-700" 
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {product.isInStock ? "Stokta" : "Tükendi"}
                  </span>
                  <Link
                    href={`/admin/urunler/${product.id}`}
                    className="text-amber-600 hover:text-amber-700 text-sm font-medium"
                  >
                    Düzenle
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

