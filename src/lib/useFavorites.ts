"use client";

import { useState, useEffect, useCallback } from "react";
import type { Product } from "@/types";

const FAVORITES_KEY = "pergamon_favorites";
const FAVORITES_EXPIRY_DAYS = 30;

interface FavoriteItem {
  productId: string;
  addedAt: number; // timestamp
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // localStorage'dan favorileri yükle ve süresi dolmuşları temizle
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        const parsed: FavoriteItem[] = JSON.parse(stored);
        const now = Date.now();
        const expiryMs = FAVORITES_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
        
        // Süresi dolmamış favorileri filtrele
        const validFavorites = parsed.filter(
          (item) => now - item.addedAt < expiryMs
        );
        
        setFavorites(validFavorites);
        
        // Temizlenmiş listeyi kaydet
        if (validFavorites.length !== parsed.length) {
          localStorage.setItem(FAVORITES_KEY, JSON.stringify(validFavorites));
        }
      } catch {
        localStorage.removeItem(FAVORITES_KEY);
      }
    }
  }, []);

  // Favorileri localStorage'a kaydet
  const saveFavorites = useCallback((items: FavoriteItem[]) => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
    setFavorites(items);
  }, []);

  // Favori ekle
  const addFavorite = useCallback((productId: string) => {
    const newFavorite: FavoriteItem = {
      productId,
      addedAt: Date.now(),
    };
    const updated = [...favorites.filter(f => f.productId !== productId), newFavorite];
    saveFavorites(updated);
  }, [favorites, saveFavorites]);

  // Favori kaldır
  const removeFavorite = useCallback((productId: string) => {
    const updated = favorites.filter((f) => f.productId !== productId);
    saveFavorites(updated);
  }, [favorites, saveFavorites]);

  // Favori toggle
  const toggleFavorite = useCallback((productId: string) => {
    if (isFavorite(productId)) {
      removeFavorite(productId);
    } else {
      addFavorite(productId);
    }
  }, [favorites]);

  // Favori mi kontrol et
  const isFavorite = useCallback((productId: string): boolean => {
    return favorites.some((f) => f.productId === productId);
  }, [favorites]);

  // Favori ID listesi
  const favoriteIds = favorites.map((f) => f.productId);

  // Favori sayısı
  const favoriteCount = favorites.length;

  // Tüm favorileri temizle
  const clearFavorites = useCallback(() => {
    localStorage.removeItem(FAVORITES_KEY);
    setFavorites([]);
  }, []);

  return {
    favorites,
    favoriteIds,
    favoriteCount,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    mounted,
  };
}

