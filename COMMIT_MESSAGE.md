feat: Firebase entegrasyonu, admin panel ve ürün detay sayfası

## 🔥 Firebase Entegrasyonu
- Firebase Firestore ve Storage yapılandırması eklendi
- Environment variables (.env.local) desteği
- Demo modu: Firebase yapılandırması yoksa demo mod aktif
- Firebase Authentication entegrasyonu

## 📦 Ürün Yönetimi
- Ürün ekleme sayfası Firebase Storage ile görsel yükleme
- Ürün düzenleme sayfası eklendi (/admin/urunler/[id])
- Ürün listeleme sayfası Firebase'den veri çekiyor
- Ürün silme fonksiyonu aktif

## 🌐 Frontend Güncellemeleri
- Ana sayfa: Firebase'den son ürünleri çekiyor
- Kategori sayfaları: Firebase'den kategoriye göre ürünler
- Kampanyalar sayfası: Firebase'den kampanyalı ürünler
- **Ürün detay sayfası (/urun/[slug])**: Firebase entegrasyonu
  - Ürün bilgileri Firebase'den dinamik yükleme
  - Interaktif görsel galerisi (tıklanabilir küçük görseller)
  - Loading ve error state'leri
  - Fiyat, stok durumu, açıklama gösterimi
  - WhatsApp ile iletişim butonu
- Tüm sayfalarda loading state'leri eklendi

## 🛠️ Teknik İyileştirmeler
- Next.js Image config: Firebase Storage domain'leri eklendi
- Firestore index hata yönetimi: Index yoksa fallback çözüm
- Server Component hataları düzeltildi (not-found.tsx)
- Router.push hatası düzeltildi (useEffect içine taşındı)

## 📚 Dokümantasyon
- FIREBASE_SETUP_GUIDE.md: Detaylı Firebase kurulum rehberi
- FIRESTORE_INDEX_SETUP.md: Firestore index oluşturma rehberi
- TECHNOLOGY_RECOMMENDATIONS.md: Teknoloji önerileri

## 🐛 Hata Düzeltmeleri
- Firebase API key hatası düzeltildi
- Hydration hataları giderildi
- Event handler Server Component hatası düzeltildi
- Firestore index eksikliği için fallback mekanizması

## ✨ Yeni Özellikler
- Ürün görselleri Firebase Storage'a yükleniyor
- Ürün düzenleme sayfası ile mevcut ürünler güncellenebiliyor
- Görsel yönetimi: Mevcut görseller silinebilir, yeni görseller eklenebilir
- **Ürün detay sayfası**: Ürün kartlarına tıklayınca detaylı bilgi sayfası

