"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminNav from "@/components/AdminNav";
import { useStore } from "@/lib/store";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAdmin } = useStore();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (!isAdmin && path !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [isAdmin, path, router]);

  if (path === "/admin/login") return <>{children}</>;

  if (!isAdmin) return null;

  return (
    <div className="md:flex bg-gray-50 min-h-screen">
      <AdminNav />
      <div className="flex-1 p-4 md:p-8">{children}</div>
    </div>
  );
} 
