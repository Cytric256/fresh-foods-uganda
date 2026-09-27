"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, Calendar, MessageSquare, Settings, LogOut, MapPin } from "lucide-react";
import { useStore } from "@/lib/store";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/bookings", label: "Bookings", icon: Calendar },
  { href: "/admin/questions", label: "Questions", icon: MessageSquare },
  { href: "/admin/zones", label: "Zones", icon: MapPin },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminNav() {
  const path = usePathname();
  const router = useRouter();
  const { logout, settings } = useStore();

  function handleLogout() {
    logout();
    router.push("/admin/login");
  }

  return (
    <aside className="md:w-64 md:flex-shrink-0 md:h-screen md:sticky md:top-0 border-b md:border-b-0 md:border-r bg-white">
      <div className="p-4">
        <p className="text-xs uppercase tracking-wide text-gray-400">Admin</p>
        <p className="font-extrabold text-lg">{settings.businessName}</p>
      </div>

      <nav className="flex md:flex-col overflow-x-auto md:overflow-visible gap-1 px-2 pb-2 md:pb-4">
        {links.map((l) => {
          const active = path === l.href;
          const Icon = l.icon;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium ${
                active ? "bg-green-100 text-green-800" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon className="h-4 w-4" /> {l.label}
            </Link>
          );
        })}

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </nav>
    </aside>
  );
} 
