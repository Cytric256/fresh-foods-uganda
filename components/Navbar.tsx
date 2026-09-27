"use client";
import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-green-600 text-white font-bold">F</span>
          <span className="font-extrabold text-lg">Fresh Foods <span className="text-orange-500">Uganda</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-green-700">{l.label}</Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/cart" className="relative rounded-full p-2 hover:bg-gray-100" aria-label="Cart">
            <ShoppingCart className="h-6 w-6" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-orange-500 px-1 text-xs font-bold text-white">{count}</span>
            )}
          </Link>
          <button className="md:hidden rounded-full p-2 hover:bg-gray-100" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t bg-white px-4 py-3 flex flex-col gap-2">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2 font-medium">
              {l.label}
            </Link>
          ))}
          <Link href="/admin/login" onClick={() => setOpen(false)} className="py-2 text-sm text-gray-500">
            Admin
          </Link>
        </nav>
      )}
    </header>
  );
}