# 🔍 Firestore Index Kurulum Rehberi

## Sorun
Firebase Console'da şu hataları alıyorsun:
- `The query requires an index` - category + createdAt
- `The query requires an index` - isCampaign + createdAt

## Çözüm: Index'leri Oluştur

### Yöntem 1: Otomatik (Önerilen) ✅

Hata mesajındaki linklere tıkla:
1. Console'da görünen **mavi linke tıkla** (Create index)
2. Index oluşturulmasını bekle (1-2 dakika)
3. Sayfayı yenile

### Yöntem 2: Manuel Oluşturma

1. [Firebase Console](https://console.firebase.google.com/) → Projen
2. Sol menüden **Firestore Database** seç
3. **Indexes** (Index'ler) sekmesine git
4. **Create Index** (Index oluştur) butonuna tıkla

#### Index 1: Kategori + Tarih
- **Collection ID**: `products`
- **Fields to index**:
  - Field 1: `category` → **Ascending**
  - Field 2: `createdAt` → **Descending**
- **Create** butonuna tıkla

#### Index 2: Kampanya + Tarih
- **Collection ID**: `products`
- **Fields to index**:
  - Field 1: `isCampaign` → **Ascending**
  - Field 2: `createdAt` → **Descending**
- **Create** butonuna tıkla

### Index Durumu

Index'ler oluşturulurken:
- ⏳ **Building** → Oluşturuluyor (1-2 dakika)
- ✅ **Enabled** → Hazır, kullanılabilir

**Not**: Index'ler oluşturulana kadar (1-2 dakika) sorgular çalışmayabilir. Bekle ve sayfayı yenile.

## Kontrol

Index'ler oluşturulduktan sonra:
1. Sayfayı yenile
2. Hata mesajları kaybolmalı
3. Ürünler görünmeli

---

## Hızlı Linkler

Eğer hata mesajındaki linkler çalışmazsa, manuel olarak:
1. [Firebase Console - Indexes](https://console.firebase.google.com/project/pergamon-mobilya/firestore/indexes)

