"use client";
import Link from "next/link";
import { useStore } from "@/lib/store";

export default function Footer() {
  const { settings } = useStore();
  return (
    <footer className="mt-16 border-t bg-gray-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-4">
        <div>
          <h3 className="font-extrabold text-lg">{settings.businessName}</h3>
          <p className="mt-2 text-sm text-gray-600">
            Fresh local foods delivered across Uganda. Farm to your door.
          </p>
        </div>
        <div>
          <h4 className="font-semibold">Shop</h4>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            <li><Link href="/shop">All Products</Link></li>
            <li><Link href="/cart">Cart</Link></li>
            <li><Link href="/checkout">Checkout</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Help</h4>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/ask">Ask a Question</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Contact</h4>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            <li>{settings.phone}</li>
            <li>{settings.email}</li>
            <li>{settings.address}</li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} {settings.businessName}. All prices in UGX.
      </div>
    </footer>
  );
}