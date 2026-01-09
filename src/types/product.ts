// Ürün kategorileri
export type ProductCategory = "mobilya" | "beyaz-esya" | "yatak-baza";

// Ana ürün tipi
export interface Product {
  id: string;
  title: string;
  slug: string;
  category: ProductCategory;
  description: string;
  images: string[];
  isInStock: boolean;
  isCampaign: boolean;
  campaignPrice?: number;
  originalPrice?: number;
  createdAt: Date;
  updatedAt?: Date;
}

// Ürün oluşturma için input tipi
export interface CreateProductInput {
  title: string;
  slug: string;
  category: ProductCategory;
  description: string;
  images: string[];
  isInStock: boolean;
  isCampaign: boolean;
  campaignPrice?: number;
  originalPrice?: number;
}

// Ürün güncelleme için input tipi
export interface UpdateProductInput extends Partial<CreateProductInput> {
  id: string;
}

// Kategori bilgisi
export interface CategoryInfo {
  slug: ProductCategory;
  name: string;
  description: string;
  icon: string;
}

// Kategoriler listesi
export const CATEGORIES: CategoryInfo[] = [
  {
    slug: "mobilya",
    name: "Mobilya",
    description: "Oturma grupları, yemek odaları, TV üniteleri ve daha fazlası",
    icon: "🪑",
  },
  {
    slug: "beyaz-esya",
    name: "Beyaz Eşya",
    description: "Buzdolabı, çamaşır makinesi, bulaşık makinesi",
    icon: "🧊",
  },
  {
    slug: "yatak-baza",
    name: "Yatak & Baza",
    description: "Ortopedik yataklar, bazalar ve yatak odası takımları",
    icon: "🛏️",
  },
];

