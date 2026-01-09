"use client";

import Link from "next/link";
import { ChevronRight, Sparkle } from "lucide-react";
import type { CategoryInfo } from "@/types";
import { motion } from "framer-motion";

interface CategoryCardProps {
  category: CategoryInfo;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link 
        href={`/urunler/${category.slug}`}
        className="group relative block aspect-[16/9] md:aspect-square lg:aspect-[16/10] bg-[#1e293b] rounded-3xl p-8 overflow-hidden shadow-xl"
      >
        {/* Decorative Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 rounded-full blur-[80px] -mr-32 -mt-32 transition-all duration-700 group-hover:bg-amber-600/20" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-600/10 rounded-full blur-[60px] -ml-24 -mb-24" />
          <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h1v1H0V0zm15 15h1v1h-1v-1z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")` }} />
        </div>
        
        {/* Category Icon/Emoji */}
        <motion.div 
          initial={{ rotate: 0 }}
          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
          className="relative z-10 text-6xl mb-6 inline-block drop-shadow-2xl"
        >
          {category.icon}
        </motion.div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          <div className="mt-auto">
            <div className="flex items-center gap-2 mb-2">
              <Sparkle size={12} className="text-amber-500 fill-amber-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500/80">Kategori</span>
            </div>
            
            <h3 className="font-black text-3xl text-white tracking-tight mb-3 group-hover:text-amber-400 transition-colors">
              {category.name}
            </h3>
            
            <p className="text-gray-400 text-sm leading-relaxed max-w-[240px] mb-6 font-medium">
              {category.description}
            </p>
            
            {/* Button */}
            <div className="inline-flex items-center gap-3 text-white">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-amber-600 group-hover:border-amber-600 group-hover:w-32">
                <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap px-4">
                  <span className="text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Keşfet</span>
                  <ChevronRight size={20} className="flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Shine Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
      </Link>
    </motion.div>
  );
}
