import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl mb-6">🔍</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Sayfa Bulunamadı
        </h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir. 
          Ana sayfaya dönerek alışverişe devam edebilirsiniz.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            <Home size={20} />
            <span>Ana Sayfaya Dön</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Geri Git</span>
          </button>
        </div>
      </div>
    </div>
  );
}

