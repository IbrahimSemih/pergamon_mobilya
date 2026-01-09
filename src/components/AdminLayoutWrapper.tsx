"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useState, useEffect } from "react";
import { Header, Footer, WhatsAppButton } from "@/components";

interface AdminLayoutWrapperProps {
  children: ReactNode;
}

export function AdminLayoutWrapper({ children }: AdminLayoutWrapperProps) {
  const pathname = usePathname();
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsAdminRoute(pathname?.startsWith("/admin") ?? false);
  }, [pathname]);

  // Hydration sırasında tutarlılık için mounted kontrolü
  if (!mounted) {
    // İlk render'da her zaman normal layout göster (hydration mismatch'i önlemek için)
    return (
      <>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </>
    );
  }

  // Admin rotalarında sadece children'ı render et (Header, Footer, WhatsAppButton olmadan)
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // Normal rotalarda Header, Footer ve WhatsAppButton ile birlikte render et
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

