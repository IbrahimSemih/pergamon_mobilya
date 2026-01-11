import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage, isFirebaseConfigured } from "./firebase";
import type { Product, CreateProductInput, UpdateProductInput, ProductCategory } from "@/types";

const PRODUCTS_COLLECTION = "products";

// Firebase yapılandırması kontrolü
function checkFirebaseConfig() {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firebase yapılandırması bulunamadı. Lütfen .env.local dosyasını kontrol edin.");
  }
}

// Firestore timestamp'ı Date'e çevir
const convertTimestamp = (timestamp: Timestamp): Date => {
  return timestamp.toDate();
};

// Firestore dokümanını Product tipine çevir
const convertDocToProduct = (doc: any): Product => {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title,
    slug: data.slug,
    category: data.category,
    description: data.description,
    images: data.images || [],
    isInStock: data.isInStock ?? true,
    isCampaign: data.isCampaign ?? false,
    campaignPrice: data.campaignPrice,
    originalPrice: data.originalPrice,
    createdAt: data.createdAt ? convertTimestamp(data.createdAt) : new Date(),
    updatedAt: data.updatedAt ? convertTimestamp(data.updatedAt) : undefined,
  };
};

// Tüm ürünleri getir
export async function getAllProducts(): Promise<Product[]> {
  checkFirebaseConfig();
  const q = query(
    collection(db!, PRODUCTS_COLLECTION),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(convertDocToProduct);
}

// Kategoriye göre ürünleri getir
export async function getProductsByCategory(category: ProductCategory): Promise<Product[]> {
  checkFirebaseConfig();
  
  try {
    // Önce index ile deneyelim (orderBy ile)
    const q = query(
      collection(db!, PRODUCTS_COLLECTION),
      where("category", "==", category),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(convertDocToProduct);
  } catch (error: any) {
    // Index yoksa, orderBy olmadan deneyelim
    if (error?.code === "failed-precondition" || error?.message?.includes("index")) {
      console.warn("Firestore index bulunamadı, orderBy olmadan devam ediliyor...");
      const q = query(
        collection(db!, PRODUCTS_COLLECTION),
        where("category", "==", category)
      );
      const snapshot = await getDocs(q);
      const products = snapshot.docs.map(convertDocToProduct);
      // Client-side'da sırala
      return products.sort((a, b) => {
        const dateA = a.createdAt?.getTime() || 0;
        const dateB = b.createdAt?.getTime() || 0;
        return dateB - dateA; // Yeni önce
      });
    }
    throw error;
  }
}

// Kampanyalı ürünleri getir
export async function getCampaignProducts(): Promise<Product[]> {
  checkFirebaseConfig();
  
  try {
    // Önce index ile deneyelim (orderBy ile)
    const q = query(
      collection(db!, PRODUCTS_COLLECTION),
      where("isCampaign", "==", true),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(convertDocToProduct);
  } catch (error: any) {
    // Index yoksa, orderBy olmadan deneyelim
    if (error?.code === "failed-precondition" || error?.message?.includes("index")) {
      console.warn("Firestore index bulunamadı, orderBy olmadan devam ediliyor...");
      const q = query(
        collection(db!, PRODUCTS_COLLECTION),
        where("isCampaign", "==", true)
      );
      const snapshot = await getDocs(q);
      const products = snapshot.docs.map(convertDocToProduct);
      // Client-side'da sırala
      return products.sort((a, b) => {
        const dateA = a.createdAt?.getTime() || 0;
        const dateB = b.createdAt?.getTime() || 0;
        return dateB - dateA; // Yeni önce
      });
    }
    throw error;
  }
}

// Slug'a göre ürün getir
export async function getProductBySlug(slug: string): Promise<Product | null> {
  checkFirebaseConfig();
  const q = query(
    collection(db!, PRODUCTS_COLLECTION),
    where("slug", "==", slug),
    limit(1)
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return convertDocToProduct(snapshot.docs[0]);
}

// ID'ye göre ürün getir
export async function getProductById(id: string): Promise<Product | null> {
  checkFirebaseConfig();
  const docRef = doc(db!, PRODUCTS_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  return convertDocToProduct(docSnap);
}

// undefined değerleri temizle (Firestore undefined kabul etmez)
function removeUndefined<T extends Record<string, any>>(obj: T): Partial<T> {
  const cleaned: Partial<T> = {};
  for (const key in obj) {
    if (obj[key] !== undefined) {
      cleaned[key] = obj[key];
    }
  }
  return cleaned;
}

// Yeni ürün oluştur
export async function createProduct(input: CreateProductInput): Promise<Product> {
  checkFirebaseConfig();
  const cleanedInput = removeUndefined(input);
  const docRef = await addDoc(collection(db!, PRODUCTS_COLLECTION), {
    ...cleanedInput,
    createdAt: Timestamp.now(),
  });
  const newDoc = await getDoc(docRef);
  return convertDocToProduct(newDoc);
}

// Ürün güncelle
export async function updateProduct(input: UpdateProductInput): Promise<void> {
  checkFirebaseConfig();
  const { id, ...data } = input;
  const cleanedData = removeUndefined(data);
  const docRef = doc(db!, PRODUCTS_COLLECTION, id);
  await updateDoc(docRef, {
    ...cleanedData,
    updatedAt: Timestamp.now(),
  });
}

// Ürün sil
export async function deleteProduct(id: string): Promise<void> {
  checkFirebaseConfig();
  const docRef = doc(db!, PRODUCTS_COLLECTION, id);
  await deleteDoc(docRef);
}

// Görsel yükle
export async function uploadImage(file: File, path: string): Promise<string> {
  if (!storage) {
    throw new Error("Firebase Storage yapılandırması bulunamadı.");
  }
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

// Görsel sil
export async function deleteImage(path: string): Promise<void> {
  if (!storage) {
    throw new Error("Firebase Storage yapılandırması bulunamadı.");
  }
  const storageRef = ref(storage, path);
  await deleteObject(storageRef);
}

// Son eklenen ürünleri getir (Ana sayfa için)
export async function getLatestProducts(count: number = 8): Promise<Product[]> {
  checkFirebaseConfig();
  const q = query(
    collection(db!, PRODUCTS_COLLECTION),
    orderBy("createdAt", "desc"),
    limit(count)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(convertDocToProduct);
}

// Stokta olan ürün sayısı
export async function getInStockCount(): Promise<number> {
  checkFirebaseConfig();
  const q = query(
    collection(db!, PRODUCTS_COLLECTION),
    where("isInStock", "==", true)
  );
  const snapshot = await getDocs(q);
  return snapshot.size;
}

