"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Header, Footer, WhatsAppButton } from "@/components";

interface AdminLayoutWrapperProps {
  children: ReactNode;
}

export function AdminLayoutWrapper({ children }: AdminLayoutWrapperProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

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

