"use client";

import { useState } from "react";
import { 
  Filter, 
  X, 
  ChevronDown, 
  Check, 
  RotateCcw,
  Package,
  Tag,
  ArrowUpDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES, type ProductCategory } from "@/types";
import type { FilterState, SortOption } from "@/lib/useSearch";

interface FilterPanelProps {
  filters: FilterState;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  toggleCategory: (category: ProductCategory) => void;
  resetFilters: () => void;
  activeFilterCount: number;
  resultCount: number;
  totalCount: number;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "En Yeni" },
  { value: "oldest", label: "En Eski" },
  { value: "price-asc", label: "Fiyat: Düşükten Yükseğe" },
  { value: "price-desc", label: "Fiyat: Yüksekten Düşüğe" },
  { value: "name-asc", label: "İsim: A-Z" },
  { value: "name-desc", label: "İsim: Z-A" },
];

export function FilterPanel({
  filters,
  updateFilter,
  toggleCategory,
  resetFilters,
  activeFilterCount,
  resultCount,
  totalCount,
}: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>("categories");

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors w-full justify-center"
        >
          <Filter size={18} />
          Filtrele
          {activeFilterCount > 0 && (
            <span className="bg-amber-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 overflow-y-auto lg:hidden"
            >
              <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between">
                <h2 className="font-bold text-lg">Filtreler</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-4">
                <FilterContent
                  filters={filters}
                  updateFilter={updateFilter}
                  toggleCategory={toggleCategory}
                  resetFilters={resetFilters}
                  activeFilterCount={activeFilterCount}
                  openSection={openSection}
                  toggleSection={toggleSection}
                />
              </div>
              <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl font-bold transition-colors"
                >
                  {resultCount} Ürün Göster
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Filter Panel */}
      <div className="hidden lg:block bg-white rounded-2xl border border-gray-200 p-6 sticky top-32">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-lg text-gray-900 flex items-center gap-2">
            <Filter size={20} />
            Filtreler
          </h2>
          {activeFilterCount > 0 && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-amber-600 transition-colors"
            >
              <RotateCcw size={14} />
              Temizle
            </button>
          )}
        </div>
        
        <FilterContent
          filters={filters}
          updateFilter={updateFilter}
          toggleCategory={toggleCategory}
          resetFilters={resetFilters}
          activeFilterCount={activeFilterCount}
          openSection={openSection}
          toggleSection={toggleSection}
        />
        
        <div className="mt-6 pt-4 border-t border-gray-100 text-center text-sm text-gray-500">
          {resultCount} / {totalCount} ürün
        </div>
      </div>
    </>
  );
}

interface FilterContentProps {
  filters: FilterState;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  toggleCategory: (category: ProductCategory) => void;
  resetFilters: () => void;
  activeFilterCount: number;
  openSection: string | null;
  toggleSection: (section: string) => void;
}

function FilterContent({
  filters,
  updateFilter,
  toggleCategory,
  openSection,
  toggleSection,
}: FilterContentProps) {
  return (
    <div className="space-y-4">
      {/* Sıralama */}
      <FilterSection
        title="Sıralama"
        icon={<ArrowUpDown size={16} />}
        isOpen={openSection === "sort"}
        onToggle={() => toggleSection("sort")}
      >
        <div className="space-y-2">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => updateFilter("sortBy", option.value)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                filters.sortBy === option.value
                  ? "bg-amber-50 text-amber-700 font-medium"
                  : "hover:bg-gray-50 text-gray-600"
              }`}
            >
              {option.label}
              {filters.sortBy === option.value && <Check size={16} />}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Kategoriler */}
      <FilterSection
        title="Kategoriler"
        icon={<Package size={16} />}
        isOpen={openSection === "categories"}
        onToggle={() => toggleSection("categories")}
        badge={filters.categories.length > 0 ? filters.categories.length : undefined}
      >
        <div className="space-y-2">
          {CATEGORIES.map((category) => (
            <button
              key={category.slug}
              onClick={() => toggleCategory(category.slug)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                filters.categories.includes(category.slug)
                  ? "bg-amber-50 text-amber-700 font-medium"
                  : "hover:bg-gray-50 text-gray-600"
              }`}
            >
              <span className="flex items-center gap-2">
                <span>{category.icon}</span>
                {category.name}
              </span>
              {filters.categories.includes(category.slug) && <Check size={16} />}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Fiyat Aralığı */}
      <FilterSection
        title="Fiyat Aralığı"
        icon={<Tag size={16} />}
        isOpen={openSection === "price"}
        onToggle={() => toggleSection("price")}
        badge={filters.priceMin !== null || filters.priceMax !== null ? 1 : undefined}
      >
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">Min (₺)</label>
              <input
                type="number"
                value={filters.priceMin ?? ""}
                onChange={(e) => updateFilter("priceMin", e.target.value ? Number(e.target.value) : null)}
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">Max (₺)</label>
              <input
                type="number"
                value={filters.priceMax ?? ""}
                onChange={(e) => updateFilter("priceMax", e.target.value ? Number(e.target.value) : null)}
                placeholder="∞"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
          {/* Hızlı seçimler */}
          <div className="flex flex-wrap gap-2">
            {[
              { min: 0, max: 5000, label: "0-5K" },
              { min: 5000, max: 15000, label: "5K-15K" },
              { min: 15000, max: 50000, label: "15K-50K" },
              { min: 50000, max: null, label: "50K+" },
            ].map((range) => (
              <button
                key={range.label}
                onClick={() => {
                  updateFilter("priceMin", range.min);
                  updateFilter("priceMax", range.max);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                  filters.priceMin === range.min && filters.priceMax === range.max
                    ? "bg-amber-600 text-white border-amber-600"
                    : "border-gray-200 hover:border-amber-600 hover:text-amber-600"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </FilterSection>

      {/* Diğer Filtreler */}
      <FilterSection
        title="Diğer"
        icon={<Filter size={16} />}
        isOpen={openSection === "other"}
        onToggle={() => toggleSection("other")}
        badge={(filters.inStockOnly ? 1 : 0) + (filters.campaignOnly ? 1 : 0) || undefined}
      >
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(e) => updateFilter("inStockOnly", e.target.checked)}
              className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500 cursor-pointer"
            />
            <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
              Sadece Stokta Olanlar
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.campaignOnly}
              onChange={(e) => updateFilter("campaignOnly", e.target.checked)}
              className="w-5 h-5 text-red-600 rounded focus:ring-red-500 cursor-pointer"
            />
            <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
              Sadece Kampanyalı Ürünler
            </span>
          </label>
        </div>
      </FilterSection>
    </div>
  );
}

interface FilterSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  badge?: number;
}

function FilterSection({ title, icon, children, isOpen, onToggle, badge }: FilterSectionProps) {
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <span className="flex items-center gap-2 font-medium text-gray-700">
          {icon}
          {title}
          {badge && (
            <span className="bg-amber-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {badge}
            </span>
          )}
        </span>
        <ChevronDown
          size={18}
          className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-white">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

