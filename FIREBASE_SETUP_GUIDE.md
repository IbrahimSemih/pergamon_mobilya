# 🔥 Firebase Kurulum Rehberi
## Pergamon Mobilya Projesi İçin Adım Adım Kurulum

---

## 📋 Gereksinimler

- Google hesabı
- Firebase Console erişimi
- Proje klasörüne erişim
- Terminal/Command Prompt

---

## 🚀 ADIM 1: Firebase Projesi Oluşturma

### 1.1 Firebase Console'a Git
1. Tarayıcıda [Firebase Console](https://console.firebase.google.com/) adresine git
2. Google hesabınla giriş yap

### 1.2 Yeni Proje Oluştur
1. **"Add project"** veya **"Proje Ekle"** butonuna tıkla
2. **Proje adı**: `pergamon-mobilya` (veya istediğin isim)
3. **Continue** (Devam) butonuna tıkla
4. **Google Analytics** seçeneğini açık bırak (önerilir)
5. Analytics hesabı seç veya yeni hesap oluştur
6. **Create project** (Proje oluştur) butonuna tıkla
7. Proje oluşturulmasını bekle (30-60 saniye)
8. **Continue** butonuna tıkla

---

## 🔧 ADIM 2: Web Uygulaması Ekleme

### 2.1 Web App Oluştur
1. Firebase Console'da projenin ana sayfasında
2. **Web** ikonuna tıkla (</> simgesi)
3. **App nickname**: `Pergamon Mobilya Web`
4. **Firebase Hosting** seçeneğini şimdilik işaretleme
5. **Register app** (Uygulamayı kaydet) butonuna tıkla

### 2.2 Firebase Config Bilgilerini Kopyala
Aşağıdaki bilgileri görüntüleyeceksin (sonraki adımda kullanacağız):

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "pergamon-mobilya.firebaseapp.com",
  projectId: "pergamon-mobilya",
  storageBucket: "pergamon-mobilya.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

**Not**: Bu bilgileri bir yere kopyala, sonraki adımda kullanacağız.

---

## 💾 ADIM 3: Environment Variables Ayarlama

### 3.1 .env.local Dosyası Oluştur
Proje kök dizininde (package.json'un yanında) `.env.local` dosyası oluştur:

**Windows PowerShell:**
```powershell
New-Item -Path .env.local -ItemType File
```

**Veya manuel olarak:**
- Proje klasöründe sağ tık → Yeni → Metin Belgesi
- İsmini `.env.local` yap (uzantıyı değiştir)

### 3.2 Environment Variables Ekle
`.env.local` dosyasını aç ve aşağıdaki bilgileri doldur:

```env
# Firebase Yapılandırması
# Firebase Console > Project Settings > General > Your apps > Config
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=pergamon-mobilya.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=pergamon-mobilya
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=pergamon-mobilya.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890

# Site URL (Production için)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Önemli:**
- `AIzaSy...` yerine Firebase Console'dan aldığın gerçek `apiKey` değerini yaz
- `pergamon-mobilya` yerine kendi proje ID'ni yaz
- Diğer değerleri de Firebase Console'dan kopyaladığın değerlerle değiştir

---

## 🗄️ ADIM 4: Firestore Database Oluşturma

### 4.1 Firestore'u Aktif Et
1. Firebase Console'da sol menüden **Firestore Database** seç
2. **Create database** (Veritabanı oluştur) butonuna tıkla
3. **Production mode** seç (güvenlik kuralları sonra ayarlayacağız)
4. **Next** (İleri) butonuna tıkla
5. **Location** (Konum) seç:
   - Türkiye için: `europe-west3` (Frankfurt) veya `europe-west1` (Belgium)
   - En yakın: `europe-west3` önerilir
6. **Enable** (Etkinleştir) butonuna tıkla
7. Veritabanı oluşturulmasını bekle (30-60 saniye)

### 4.2 İlk Collection Oluştur
1. Firestore Database sayfasında **Start collection** (Koleksiyon başlat) butonuna tıkla
2. **Collection ID**: `products` yaz
3. **Document ID**: Otomatik oluşturulsun (Auto-ID)
4. İlk test dokümanı için alanlar ekle:
   - **Field**: `title`, **Type**: `string`, **Value**: `Test Ürün`
   - **Field**: `category`, **Type**: `string`, **Value**: `mobilya`
   - **Field**: `createdAt`, **Type**: `timestamp`, **Value**: (şu anki zaman)
5. **Save** (Kaydet) butonuna tıkla

---

## 🔐 ADIM 5: Authentication Ayarlama

### 5.1 Authentication'ı Aktif Et
1. Firebase Console'da sol menüden **Authentication** seç
2. **Get started** (Başlayın) butonuna tıkla
3. **Sign-in method** (Giriş yöntemi) sekmesine git

### 5.2 Email/Password Yöntemini Aktif Et
1. **Email/Password** satırına tıkla
2. **Enable** (Etkinleştir) toggle'ını aç
3. **Email link (passwordless sign-in)** seçeneğini şimdilik kapalı bırak
4. **Save** (Kaydet) butonuna tıkla

### 5.3 İlk Admin Kullanıcısı Oluştur
1. **Users** (Kullanıcılar) sekmesine git
2. **Add user** (Kullanıcı ekle) butonuna tıkla
3. **Email**: Admin e-posta adresini gir (örn: `admin@pergamonmobilya.com`)
4. **Password**: Güçlü bir şifre gir (en az 8 karakter)
5. **Add user** (Kullanıcı ekle) butonuna tıkla
6. Bu bilgileri not al (admin paneli girişi için kullanılacak)

---

## 📦 ADIM 6: Storage (Depolama) Ayarlama

### 6.1 Storage'ı Aktif Et
1. Firebase Console'da sol menüden **Storage** seç
2. **Get started** (Başlayın) butonuna tıkla
3. **Start in production mode** seç (güvenlik kuralları sonra ayarlayacağız)
4. **Next** (İleri) butonuna tıkla
5. **Location**: Firestore ile aynı location'ı seç (`europe-west3`)
6. **Done** (Tamam) butonuna tıkla

### 6.2 Storage Klasör Yapısı
Storage'da şu klasör yapısını oluştur (manuel olarak):
- `products/` - Ürün görselleri için
- `blog/` - Blog yazı görselleri için (gelecekte)

---

## 🔒 ADIM 7: Security Rules Ayarlama

### 7.1 Firestore Security Rules
1. Firebase Console'da **Firestore Database** > **Rules** sekmesine git
2. Aşağıdaki kuralları yapıştır:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Ürünler: Herkes okuyabilir, sadece authenticated kullanıcılar yazabilir
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Kategoriler: Herkes okuyabilir, sadece admin yazabilir
    match /categories/{categoryId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Yorumlar: Herkes okuyabilir, authenticated kullanıcılar yazabilir
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null 
        && request.auth.uid == resource.data.userId;
    }
    
    // Blog yazıları: Herkes okuyabilir, sadece admin yazabilir
    match /blog/{blogId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

3. **Publish** (Yayınla) butonuna tıkla

### 7.2 Storage Security Rules
1. Firebase Console'da **Storage** > **Rules** sekmesine git
2. Aşağıdaki kuralları yapıştır:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Ürün görselleri: Herkes okuyabilir, sadece authenticated kullanıcılar yazabilir
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null
        && request.resource.size < 5 * 1024 * 1024  // 5MB limit
        && request.resource.contentType.matches('image/.*');
    }
    
    // Blog görselleri: Herkes okuyabilir, sadece authenticated kullanıcılar yazabilir
    match /blog/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null
        && request.resource.size < 5 * 1024 * 1024
        && request.resource.contentType.matches('image/.*');
    }
  }
}
```

3. **Publish** (Yayınla) butonuna tıkla

---

## 📊 ADIM 8: Firestore Index'leri Oluşturma

### 8.1 Composite Index Oluştur
1. Firebase Console'da **Firestore Database** > **Indexes** sekmesine git
2. **Create Index** (Index oluştur) butonuna tıkla
3. **Collection ID**: `products` seç
4. Aşağıdaki index'leri oluştur:

**Index 1: Kategori + Kampanya + Tarih**
- Field 1: `category` (Ascending)
- Field 2: `isCampaign` (Ascending)
- Field 3: `createdAt` (Descending)
- **Create** (Oluştur) butonuna tıkla

**Index 2: Kategori + Stok + Tarih**
- Field 1: `category` (Ascending)
- Field 2: `isInStock` (Ascending)
- Field 3: `createdAt` (Descending)
- **Create** (Oluştur) butonuna tıkla

**Index 3: Slug (Unique)**
- Field 1: `slug` (Ascending)
- **Create** (Oluştur) butonuna tıkla

**Not**: Index'lerin oluşturulması birkaç dakika sürebilir.

---

## ✅ ADIM 9: Projeyi Test Etme

### 9.1 Development Server'ı Başlat
Terminal'de:
```bash
npm run dev
```

### 9.2 Admin Paneline Giriş Yap
1. Tarayıcıda `http://localhost:3000/admin` adresine git
2. Firebase'de oluşturduğun admin e-posta ve şifre ile giriş yap
3. Dashboard'u kontrol et

### 9.3 İlk Ürünü Ekle
1. Admin panelinde **"Yeni Ürün Ekle"** butonuna tıkla
2. Ürün bilgilerini doldur
3. Görsel yükle (Storage'a kaydedilecek)
4. **"Ürünü Kaydet"** butonuna tıkla
5. Ana sayfada ürünün göründüğünü kontrol et

### 9.4 Console'da Hata Kontrolü
1. Tarayıcıda **F12** tuşuna bas (Developer Tools)
2. **Console** sekmesine git
3. Firebase bağlantı hataları var mı kontrol et
4. Hata yoksa başarılı! ✅

---

## 🐛 Sorun Giderme

### Sorun 1: "Firebase: Error (auth/invalid-api-key)"
**Çözüm:**
- `.env.local` dosyasındaki `NEXT_PUBLIC_FIREBASE_API_KEY` değerini kontrol et
- Firebase Console'dan doğru API key'i kopyaladığından emin ol
- Development server'ı yeniden başlat (`Ctrl+C` sonra `npm run dev`)

### Sorun 2: "Missing or insufficient permissions"
**Çözüm:**
- Firestore Security Rules'ı kontrol et
- Storage Security Rules'ı kontrol et
- Admin kullanıcısı ile giriş yaptığından emin ol

### Sorun 3: "Index not found"
**Çözüm:**
- Firestore Index'lerinin oluşturulduğunu kontrol et
- Index oluşturulması birkaç dakika sürebilir, bekle
- Gerekli index'leri oluştur

### Sorun 4: Görseller yüklenmiyor
**Çözüm:**
- Storage bucket'ın doğru yapılandırıldığını kontrol et
- Storage Security Rules'ı kontrol et
- Dosya boyutunun 5MB'dan küçük olduğundan emin ol

---

## 📝 Kontrol Listesi

Kurulum tamamlandı mı? Şunları kontrol et:

- [ ] Firebase projesi oluşturuldu
- [ ] Web app eklendi ve config bilgileri alındı
- [ ] `.env.local` dosyası oluşturuldu ve dolduruldu
- [ ] Firestore Database aktif edildi
- [ ] Authentication aktif edildi ve Email/Password açıldı
- [ ] İlk admin kullanıcısı oluşturuldu
- [ ] Storage aktif edildi
- [ ] Firestore Security Rules yazıldı
- [ ] Storage Security Rules yazıldı
- [ ] Firestore Index'leri oluşturuldu
- [ ] Development server çalışıyor
- [ ] Admin paneline giriş yapılabiliyor
- [ ] İlk ürün eklenebiliyor

---

## 🎉 Tebrikler!

Firebase bağlantısı tamamlandı! Artık:
- ✅ Ürünleri Firestore'a kaydedebilirsin
- ✅ Görselleri Storage'a yükleyebilirsin
- ✅ Admin paneli çalışıyor
- ✅ Gerçek verilerle site çalışıyor

---

## 📚 Sonraki Adımlar

1. **Demo verileri temizle**: `src/app/page.tsx` ve diğer sayfalardaki demo ürünleri kaldır
2. **Gerçek ürünleri ekle**: Admin panelinden ürünleri eklemeye başla
3. **Görselleri yükle**: Ürün görsellerini Storage'a yükle
4. **SEO ayarları**: Production URL'ini `.env.local`'e ekle
5. **Analytics**: Google Analytics'i yapılandır

---

## 💡 İpuçları

- **Maliyet takibi**: Firebase Console'da **Usage and billing** sekmesinden kullanımı takip et
- **Bütçe uyarıları**: Firebase Console'da bütçe limitleri ayarla
- **Backup**: Önemli veriler için düzenli backup al
- **Performance**: Firestore Index'lerini optimize et
- **Security**: Security Rules'ı düzenli olarak gözden geçir

---

## 🆘 Yardım

Sorun mu yaşıyorsun?
1. Firebase Console'da **Help** sekmesine bak
2. [Firebase Dokümantasyonu](https://firebase.google.com/docs) incele
3. Console hatalarını kontrol et
4. `.env.local` dosyasını tekrar kontrol et

