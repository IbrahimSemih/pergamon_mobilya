"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  variant?: "default" | "compact" | "header";
  defaultValue?: string;
  autoFocus?: boolean;
}

export function SearchBar({ 
  onSearch, 
  placeholder = "Ürün ara...", 
  variant = "default",
  defaultValue = "",
  autoFocus = false
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query.trim());
      } else {
        router.push(`/ara?q=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  if (variant === "header") {
    return (
      <form onSubmit={handleSubmit} className="relative">
        <div className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-200 ${
          isFocused 
            ? "bg-white shadow-lg ring-2 ring-amber-500/20" 
            : "bg-gray-100 hover:bg-gray-200"
        }`}>
          <Search size={18} className="text-gray-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="bg-transparent outline-none text-sm font-medium text-gray-700 placeholder-gray-400 w-32 focus:w-48 transition-all duration-300"
          />
          <AnimatePresence>
            {query && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                type="button"
                onClick={handleClear}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X size={14} className="text-gray-400" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </form>
    );
  }

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
        />
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={16} className="text-gray-400" />
          </button>
        )}
      </form>
    );
  }

  // Default variant - büyük arama kutusu
  return (
    <form onSubmit={handleSubmit} className="relative group">
      <div className={`flex items-center gap-3 px-6 py-4 bg-white border-2 rounded-2xl transition-all duration-300 shadow-sm ${
        isFocused 
          ? "border-amber-500 shadow-lg shadow-amber-500/10" 
          : "border-gray-200 hover:border-gray-300"
      }`}>
        <Search size={24} className={`flex-shrink-0 transition-colors ${
          isFocused ? "text-amber-600" : "text-gray-400"
        }`} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-lg font-medium text-gray-700 placeholder-gray-400"
        />
        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              type="button"
              onClick={handleClear}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-400" />
            </motion.button>
          )}
        </AnimatePresence>
        <button
          type="submit"
          className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-200 active:scale-95"
        >
          <span className="hidden sm:inline">Ara</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </form>
  );
}

