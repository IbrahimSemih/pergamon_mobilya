"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Package, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components";
import { SearchBar } from "@/components/SearchBar";
import { FilterPanel } from "@/components/FilterPanel";
import { useSearch } from "@/lib/useSearch";
import { getAllProducts } from "@/lib/api";
import { isFirebaseConfigured } from "@/lib/firebase";
import type { Product } from "@/types";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const {
    filters,
    updateFilter,
    toggleCategory,
    resetFilters,
    filteredProducts,
    activeFilterCount,
    resultCount,
    totalCount,
  } = useSearch(products);

  // URL'den gelen aramayı uygula
  useEffect(() => {
    if (initialQuery) {
      updateFilter("query", initialQuery);
    }
  }, [initialQuery]);

  // Ürünleri yükle
  useEffect(() => {
    async function loadProducts() {
      if (!isFirebaseConfigured) {
        setLoading(false);
        return;
      }

      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Ürünler yüklenirken hata:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const handleSearch = (query: string) => {
    updateFilter("query", query);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 md:pt-32">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              <Search size={16} />
              ÜRÜN ARA
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-2">
              Aradığınızı Bulun
            </h1>
            <p className="text-gray-600">
              {totalCount} ürün arasından arayın ve filtreleyin
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <SearchBar 
              onSearch={handleSearch} 
              defaultValue={filters.query}
              placeholder="Ürün adı veya açıklama ile arayın..."
              autoFocus
            />
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Sidebar */}
            <div className="lg:w-72 flex-shrink-0">
              <FilterPanel
                filters={filters}
                updateFilter={updateFilter}
                toggleCategory={toggleCategory}
                resetFilters={resetFilters}
                activeFilterCount={activeFilterCount}
                resultCount={resultCount}
                totalCount={totalCount}
              />
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <h2 className="font-bold text-gray-900">
                    {filters.query ? (
                      <>
                        &quot;{filters.query}&quot; için{" "}
                        <span className="text-amber-600">{resultCount}</span> sonuç
                      </>
                    ) : (
                      <>
                        <span className="text-amber-600">{resultCount}</span> ürün bulundu
                      </>
                    )}
                  </h2>
                </div>
              </div>

              {/* Loading State */}
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="w-10 h-10 animate-spin text-amber-600 mb-4" />
                  <p className="text-gray-500">Ürünler yükleniyor...</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                /* Empty State */
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20 bg-white rounded-2xl border border-gray-100"
                >
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Package size={32} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Ürün Bulunamadı
                  </h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    Arama kriterlerinize uygun ürün bulunamadı. Filtreleri değiştirmeyi deneyin.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                  >
                    Filtreleri Temizle
                  </button>
                </motion.div>
              ) : (
                /* Products Grid */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Suspense wrapper for useSearchParams
export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 pt-24 md:pt-32 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-amber-600" />
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}

