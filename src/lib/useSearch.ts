"use client";

import { useState, useCallback, useMemo } from "react";
import type { Product, ProductCategory } from "@/types";

export type SortOption = "newest" | "oldest" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

export interface FilterState {
  query: string;
  categories: ProductCategory[];
  priceMin: number | null;
  priceMax: number | null;
  inStockOnly: boolean;
  campaignOnly: boolean;
  sortBy: SortOption;
}

export const defaultFilters: FilterState = {
  query: "",
  categories: [],
  priceMin: null,
  priceMax: null,
  inStockOnly: false,
  campaignOnly: false,
  sortBy: "newest",
};

export function useSearch(products: Product[]) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  // Filtre değiştirme
  const updateFilter = useCallback(<K extends keyof FilterState>(
    key: K, 
    value: FilterState[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  // Tüm filtreleri sıfırla
  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  // Kategori toggle
  const toggleCategory = useCallback((category: ProductCategory) => {
    setFilters(prev => {
      const exists = prev.categories.includes(category);
      return {
        ...prev,
        categories: exists 
          ? prev.categories.filter(c => c !== category)
          : [...prev.categories, category]
      };
    });
  }, []);

  // Filtrelenmiş ve sıralanmış ürünler
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Arama sorgusu filtresi
    if (filters.query.trim()) {
      const searchTerms = filters.query.toLowerCase().split(" ").filter(Boolean);
      result = result.filter(product => {
        const searchableText = `${product.title} ${product.description}`.toLowerCase();
        return searchTerms.every(term => searchableText.includes(term));
      });
    }

    // Kategori filtresi
    if (filters.categories.length > 0) {
      result = result.filter(product => 
        filters.categories.includes(product.category)
      );
    }

    // Fiyat aralığı filtresi
    if (filters.priceMin !== null) {
      result = result.filter(product => {
        const price = product.isCampaign && product.campaignPrice 
          ? product.campaignPrice 
          : product.originalPrice || 0;
        return price >= filters.priceMin!;
      });
    }

    if (filters.priceMax !== null) {
      result = result.filter(product => {
        const price = product.isCampaign && product.campaignPrice 
          ? product.campaignPrice 
          : product.originalPrice || 0;
        return price <= filters.priceMax!;
      });
    }

    // Stok durumu filtresi
    if (filters.inStockOnly) {
      result = result.filter(product => product.isInStock);
    }

    // Kampanya filtresi
    if (filters.campaignOnly) {
      result = result.filter(product => product.isCampaign);
    }

    // Sıralama
    switch (filters.sortBy) {
      case "newest":
        result.sort((a, b) => {
          const dateA = a.createdAt?.getTime() || 0;
          const dateB = b.createdAt?.getTime() || 0;
          return dateB - dateA;
        });
        break;
      case "oldest":
        result.sort((a, b) => {
          const dateA = a.createdAt?.getTime() || 0;
          const dateB = b.createdAt?.getTime() || 0;
          return dateA - dateB;
        });
        break;
      case "price-asc":
        result.sort((a, b) => {
          const priceA = a.isCampaign && a.campaignPrice ? a.campaignPrice : a.originalPrice || 0;
          const priceB = b.isCampaign && b.campaignPrice ? b.campaignPrice : b.originalPrice || 0;
          return priceA - priceB;
        });
        break;
      case "price-desc":
        result.sort((a, b) => {
          const priceA = a.isCampaign && a.campaignPrice ? a.campaignPrice : a.originalPrice || 0;
          const priceB = b.isCampaign && b.campaignPrice ? b.campaignPrice : b.originalPrice || 0;
          return priceB - priceA;
        });
        break;
      case "name-asc":
        result.sort((a, b) => a.title.localeCompare(b.title, "tr"));
        break;
      case "name-desc":
        result.sort((a, b) => b.title.localeCompare(a.title, "tr"));
        break;
    }

    return result;
  }, [products, filters]);

  // Aktif filtre sayısı
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.query.trim()) count++;
    if (filters.categories.length > 0) count++;
    if (filters.priceMin !== null || filters.priceMax !== null) count++;
    if (filters.inStockOnly) count++;
    if (filters.campaignOnly) count++;
    return count;
  }, [filters]);

  return {
    filters,
    setFilters,
    updateFilter,
    resetFilters,
    toggleCategory,
    filteredProducts,
    activeFilterCount,
    totalCount: products.length,
    resultCount: filteredProducts.length,
  };
}

