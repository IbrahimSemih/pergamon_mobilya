import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { CategoryInfo } from "@/types";

interface CategoryCardProps {
  category: CategoryInfo;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link 
      href={`/urunler/${category.slug}`}
      className="group relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-amber-100 overflow-hidden"
    >
      {/* Arka plan deseni */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/30 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
      
      {/* İkon */}
      <div className="relative text-5xl mb-4">{category.icon}</div>
      
      {/* İçerik */}
      <div className="relative">
        <h3 className="font-bold text-xl text-gray-900 group-hover:text-amber-700 transition-colors">
          {category.name}
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          {category.description}
        </p>
        
        {/* Link göstergesi */}
        <div className="mt-4 flex items-center gap-1 text-amber-700 font-medium text-sm">
          <span>Ürünleri Gör</span>
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

