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
  salesCity?: string;
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
  salesCity?: string;
}

// Ürün güncelleme için input tipi
export interface UpdateProductInput extends Partial<CreateProductInput> {
  id: string;
}

// Türkiye illeri
export const TURKISH_CITIES: string[] = [
  "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin",
  "Aydın", "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa",
  "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Edirne", "Elazığ", "Erzincan",
  "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Isparta",
  "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir",
  "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla",
  "Muş", "Nevşehir", "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop",
  "Sivas", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van",
  "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman", "Kırıkkale", "Batman", "Şırnak",
  "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce",
];

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

