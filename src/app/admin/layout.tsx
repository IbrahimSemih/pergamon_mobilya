"use client";

import { AuthProvider } from "@/lib/auth-context";
import "../globals.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Admin paneli için header ve footer olmadan render et
  return (
    <AuthProvider>
      <div className="min-h-screen">{children}</div>
    </AuthProvider>
  );
}

