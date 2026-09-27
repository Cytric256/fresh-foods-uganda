"use client";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatUGX } from "@/lib/format";

export default function CartPage() {
  const { items, remove, setQty, subtotal, clear } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-gray-300" />
        <h1 className="mt-4 text-2xl font-extrabold">Your cart is empty</h1>
        <p className="mt-2 text-gray-500">Add fresh foods from the shop to get started.</p>
        <Link href="/shop" className="btn btn-primary mt-6 inline-flex">Go to Shop</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-extrabold">Your Cart</h1>
      <p className="text-gray-500 mt-1">{items.length} {items.length === 1 ? "item" : "items"}</p>

      <div className="mt-6 space-y-3">
        {items.map((it) => (
          <div key={it.productId} className="card p-3 flex gap-3">
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
              <Image src={it.image} alt={it.name} fill className="object-cover" sizes="80px" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{it.name}</p>
              <p className="text-xs text-gray-500 capitalize">{it.unit}</p>
              <p className="mt-1 font-bold text-green-700">{formatUGX(it.price)}</p>
            </div>
            <div className="flex flex-col items-end justify-between">
              <button onClick={() => remove(it.productId)} className="rounded-full p-2 text-red-500 hover:bg-red-50" aria-label="Remove">
                <Trash2 className="h-4 w-4" />
              </button>
              <div className="flex items-center rounded-full border border-gray-300">
                <button onClick={() => setQty(it.productId, it.qty - 1)} className="px-3 py-1 font-bold hover:bg-gray-100">−</button>
                <span className="px-3 font-semibold text-sm">{it.qty}</span>
                <button onClick={() => setQty(it.productId, it.qty + 1)} className="px-3 py-1 font-bold hover:bg-gray-100">+</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 card p-4">
        <div className="flex justify-between text-lg">
          <span>Subtotal</span>
          <span className="font-bold">{formatUGX(subtotal)}</span>
        </div>
        <p className="mt-1 text-xs text-gray-500">Delivery fee added at checkout based on your zone.</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/checkout" className="btn btn-primary flex-1 text-center">Proceed to Checkout</Link>
        <button onClick={clear} className="btn btn-outline">Clear Cart</button>
      </div>
    </div>
  );
} 
