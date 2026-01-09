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
import { db, storage } from "./firebase";
import type { Product, CreateProductInput, UpdateProductInput, ProductCategory } from "@/types";

const PRODUCTS_COLLECTION = "products";

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
  const q = query(
    collection(db, PRODUCTS_COLLECTION),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(convertDocToProduct);
}

// Kategoriye göre ürünleri getir
export async function getProductsByCategory(category: ProductCategory): Promise<Product[]> {
  const q = query(
    collection(db, PRODUCTS_COLLECTION),
    where("category", "==", category),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(convertDocToProduct);
}

// Kampanyalı ürünleri getir
export async function getCampaignProducts(): Promise<Product[]> {
  const q = query(
    collection(db, PRODUCTS_COLLECTION),
    where("isCampaign", "==", true),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(convertDocToProduct);
}

// Slug'a göre ürün getir
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const q = query(
    collection(db, PRODUCTS_COLLECTION),
    where("slug", "==", slug),
    limit(1)
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return convertDocToProduct(snapshot.docs[0]);
}

// ID'ye göre ürün getir
export async function getProductById(id: string): Promise<Product | null> {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  return convertDocToProduct(docSnap);
}

// Yeni ürün oluştur
export async function createProduct(input: CreateProductInput): Promise<Product> {
  const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
    ...input,
    createdAt: Timestamp.now(),
  });
  const newDoc = await getDoc(docRef);
  return convertDocToProduct(newDoc);
}

// Ürün güncelle
export async function updateProduct(input: UpdateProductInput): Promise<void> {
  const { id, ...data } = input;
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: Timestamp.now(),
  });
}

// Ürün sil
export async function deleteProduct(id: string): Promise<void> {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await deleteDoc(docRef);
}

// Görsel yükle
export async function uploadImage(file: File, path: string): Promise<string> {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

// Görsel sil
export async function deleteImage(path: string): Promise<void> {
  const storageRef = ref(storage, path);
  await deleteObject(storageRef);
}

// Son eklenen ürünleri getir (Ana sayfa için)
export async function getLatestProducts(count: number = 8): Promise<Product[]> {
  const q = query(
    collection(db, PRODUCTS_COLLECTION),
    orderBy("createdAt", "desc"),
    limit(count)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(convertDocToProduct);
}

// Stokta olan ürün sayısı
export async function getInStockCount(): Promise<number> {
  const q = query(
    collection(db, PRODUCTS_COLLECTION),
    where("isInStock", "==", true)
  );
  const snapshot = await getDocs(q);
  return snapshot.size;
}

