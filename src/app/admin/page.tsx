"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { LogIn, Loader2, AlertCircle, Info } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, user, loading: authLoading, isDemo } = useAuth();
  const router = useRouter();

  // Kullanıcı zaten giriş yapmışsa dashboard'a yönlendir
  if (!authLoading && user) {
    router.push("/admin/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signIn(email, password);
      router.push("/admin/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);
      if (err.code === "auth/invalid-credential") {
        setError("E-posta veya şifre hatalı.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Çok fazla başarısız deneme. Lütfen daha sonra tekrar deneyin.");
      } else {
        setError("Giriş yapılırken bir hata oluştu.");
      }
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail("demo@pergamon.com");
    setPassword("demo123");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">P</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Paneli</h1>
          <p className="text-gray-400 mt-1">Pergamon Mobilya Yönetim Sistemi</p>
        </div>

        {/* Demo Mode Banner */}
        {isDemo && (
          <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-4 mb-4">
            <div className="flex items-start gap-3">
              <Info size={20} className="text-blue-400 mt-0.5" />
              <div>
                <p className="text-blue-200 text-sm font-medium">Demo Modu Aktif</p>
                <p className="text-blue-300/70 text-xs mt-1">
                  Firebase yapılandırması bulunamadı. Demo bilgileriyle giriş yapabilirsiniz.
                </p>
                <button
                  type="button"
                  onClick={fillDemoCredentials}
                  className="mt-2 text-xs text-blue-400 hover:text-blue-300 underline"
                >
                  Demo bilgilerini doldur
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 bg-red-50 text-red-700 p-4 rounded-lg text-sm">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                E-posta
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder={isDemo ? "demo@pergamon.com" : "admin@pergamon.com"}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Şifre
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder={isDemo ? "demo123" : "••••••••"}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Giriş Yapılıyor...</span>
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  <span>Giriş Yap</span>
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          © {new Date().getFullYear()} Pergamon Mobilya
        </p>
      </div>
    </div>
  );
}

