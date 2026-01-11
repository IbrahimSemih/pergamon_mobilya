"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/lib/useFavorites";
import { motion, AnimatePresence } from "framer-motion";

interface FavoriteButtonProps {
  productId: string;
  variant?: "icon" | "full";
  className?: string;
}

export function FavoriteButton({ productId, variant = "icon", className = "" }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, mounted } = useFavorites();
  
  const isActive = mounted && isFavorite(productId);

  const handleClick = () => {
    toggleFavorite(productId);
  };

  if (variant === "icon") {
    return (
      <button
        onClick={handleClick}
        className={`relative p-3 rounded-full transition-all duration-300 ${
          isActive 
            ? "bg-red-50 text-red-500" 
            : "bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-red-500"
        } ${className}`}
        aria-label={isActive ? "Favorilerden çıkar" : "Favorilere ekle"}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isActive ? "filled" : "empty"}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Heart 
              size={20} 
              fill={isActive ? "currentColor" : "none"} 
              strokeWidth={2}
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Pulse animation when adding */}
        <AnimatePresence>
          {isActive && (
            <motion.span
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 rounded-full bg-red-400"
            />
          )}
        </AnimatePresence>
      </button>
    );
  }

  // Full variant with text
  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
        isActive 
          ? "bg-red-50 text-red-500 border border-red-200" 
          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
      } ${className}`}
      aria-label={isActive ? "Favorilerden çıkar" : "Favorilere ekle"}
    >
      <Heart 
        size={18} 
        fill={isActive ? "currentColor" : "none"} 
        strokeWidth={2}
      />
      <span className="hidden sm:inline">
        {isActive ? "Favorilerde" : "Favorilere Ekle"}
      </span>
    </button>
  );
}

