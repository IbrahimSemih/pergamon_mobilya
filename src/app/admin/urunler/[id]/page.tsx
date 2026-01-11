"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { getProductById, updateProduct, uploadImage, deleteImage } from "@/lib/api";
import { CATEGORIES, type ProductCategory } from "@/types";
import { 
  ArrowLeft, 
  Save, 
  Loader2, 
  Upload, 
  X,
  Image as ImageIcon 
} from "lucide-react";
import { use } from "react";

// Slug oluşturma fonksiyonu
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditProductPage({ params }: PageProps) {
  const { id } = use(params);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(true);
  
  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState<ProductCategory>("mobilya");
  const [description, setDescription] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [campaignPrice, setCampaignPrice] = useState("");
  const [isInStock, setIsInStock] = useState(true);
  const [isCampaign, setIsCampaign] = useState(false);
  const [existingImages, setExistingImages] = useState<string[]>([]); // Mevcut görseller (URL'ler)
  const [newImages, setNewImages] = useState<string[]>([]); // Yeni eklenen görseller (base64 önizleme)
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]); // Yeni yüklenecek dosyalar

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/admin");
    }
  }, [user, authLoading, router]);

  // Ürün bilgilerini yükle
  useEffect(() => {
    if (user && !authLoading && id) {
      loadProduct();
    }
  }, [user, authLoading, id]);

  const loadProduct = async () => {
    try {
      setLoadingProduct(true);
      const product = await getProductById(id);
      
      if (!product) {
        alert("Ürün bulunamadı.");
        router.push("/admin/urunler");
        return;
      }

      setTitle(product.title);
      setSlug(product.slug);
      setCategory(product.category);
      setDescription(product.description);
      setOriginalPrice(product.originalPrice?.toString() || "");
      setCampaignPrice(product.campaignPrice?.toString() || "");
      setIsInStock(product.isInStock);
      setIsCampaign(product.isCampaign);
      setExistingImages(product.images || []);
    } catch (error) {
      console.error("Ürün yüklenemedi:", error);
      alert("Ürün yüklenirken bir hata oluştu: " + (error as Error).message);
      router.push("/admin/urunler");
    } finally {
      setLoadingProduct(false);
    }
  };

  // Başlık değiştiğinde slug otomatik oluştur (sadece slug boşsa)
  useEffect(() => {
    if (!slug && title) {
      setSlug(generateSlug(title));
    }
  }, [title, slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Yeni görselleri Firebase Storage'a yükle
      const uploadedImageUrls: string[] = [];
      
      for (let i = 0; i < newImageFiles.length; i++) {
        const file = newImageFiles[i];
        const fileName = `products/${slug}-${Date.now()}-${i}.${file.name.split('.').pop()}`;
        const imageUrl = await uploadImage(file, fileName);
        uploadedImageUrls.push(imageUrl);
      }

      // Tüm görselleri birleştir (mevcut + yeni)
      const allImages = [...existingImages, ...uploadedImageUrls];

      // Ürünü güncelle
      const productData: any = {
        id,
        title,
        slug,
        category,
        description,
        images: allImages,
        isInStock,
        isCampaign,
      };

      // Sadece tanımlı fiyatları ekle (undefined değerleri Firestore kabul etmez)
      if (originalPrice) {
        productData.originalPrice = Number(originalPrice);
      }
      if (campaignPrice && isCampaign) {
        productData.campaignPrice = Number(campaignPrice);
      }

      await updateProduct(productData);
      
      router.push("/admin/urunler");
    } catch (error) {
      console.error("Ürün güncellenemedi:", error);
      alert("Ürün güncellenirken bir hata oluştu: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      // Dosyayı upload listesine ekle
      setNewImageFiles((prev) => [...prev, file]);
      
      // Önizleme için base64'e çevir
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setNewImages((prev) => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setNewImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  if (authLoading || loadingProduct || !user) {
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Link
                href="/admin/urunler"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
              </Link>
              <span className="font-semibold text-gray-900">Ürünü Düzenle</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Temel Bilgiler */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Temel Bilgiler</h2>
            
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ürün Adı *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Örn: Modern Köşe Koltuk Takımı"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-gray-50"
                  placeholder="otomatik-olusturulur"
                />
                <p className="text-xs text-gray-500 mt-1">
                  URL: pergamonmobilya.com/urun/{slug || "..."}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ProductCategory)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Açıklama *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                  placeholder="Ürün özelliklerini ve açıklamasını yazın..."
                  required
                />
              </div>
            </div>
          </div>

          {/* Fiyat ve Stok */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Fiyat ve Stok</h2>
            
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fiyat (₺)
                  </label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="0"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kampanya Fiyatı (₺)
                  </label>
                  <input
                    type="number"
                    value={campaignPrice}
                    onChange={(e) => setCampaignPrice(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="0"
                    min="0"
                    disabled={!isCampaign}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isInStock}
                    onChange={(e) => setIsInStock(e.target.checked)}
                    className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500"
                  />
                  <span className="text-gray-700">Stokta Mevcut</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isCampaign}
                    onChange={(e) => setIsCampaign(e.target.checked)}
                    className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                  />
                  <span className="text-gray-700">Kampanyalı Ürün</span>
                </label>
              </div>
            </div>
          </div>

          {/* Görseller */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Ürün Görselleri</h2>
            
            <div className="space-y-4">
              {/* Mevcut görseller */}
              {existingImages.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Mevcut Görseller</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {existingImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={image}
                            alt={`Mevcut görsel ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeExistingImage(index)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={14} />
                        </button>
                        {index === 0 && (
                          <span className="absolute bottom-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded">
                            Kapak
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Yeni görsel yükleme alanı */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Yeni Görsel Ekle</h3>
                <label className="block cursor-pointer">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-amber-500 transition-colors">
                    <Upload size={32} className="mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-600 font-medium">
                      Görselleri sürükleyin veya tıklayın
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      PNG, JPG, WEBP (maks. 5MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Yeni eklenen görseller (önizleme) */}
              {newImages.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Yeni Eklenen Görseller</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {newImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={image}
                            alt={`Yeni görsel ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeNewImage(index)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {existingImages.length === 0 && newImages.length === 0 && (
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <ImageIcon size={16} />
                  <span>Henüz görsel eklenmedi</span>
                </div>
              )}
            </div>
          </div>

          {/* Kaydet butonu */}
          <div className="flex justify-end gap-4">
            <Link
              href="/admin/urunler"
              className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
            >
              İptal
            </Link>
            <button
              type="submit"
              disabled={loading || !title || !description}
              className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Güncelleniyor...</span>
                </>
              ) : (
                <>
                  <Save size={20} />
                  <span>Değişiklikleri Kaydet</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

