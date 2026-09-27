"use client";
import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { useCart } from "@/lib/cart";
import { formatUGX } from "@/lib/format";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { products } = useStore();
  const { add } = useCart();
  const router = useRouter();
  const [qty, setQty] = useState(1);

  const p = products.find((x) => x.id === id);

  if (!p) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h1 className="text-2xl font-extrabold">Product not found</h1>
        <Link href="/shop" className="btn btn-primary mt-6 inline-flex">Back to Shop</Link>
      </div>
    );
  }

  const total = p.price * qty;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link href="/shop" className="text-sm text-green-700 hover:underline">← Back to Shop</Link>

      <div className="mt-4 grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
          <Image src={p.image} alt={p.name} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" priority />
          {!p.available && (
            <span className="absolute top-3 left-3 rounded bg-red-500 px-3 py-1 text-sm font-semibold text-white">
              Out of stock
            </span>
          )}
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-orange-600 font-bold">{p.category}</p>
          <h1 className="mt-1 text-3xl font-extrabold">{p.name}</h1>
          <p className="mt-3 text-gray-600">{p.description}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-green-700">{formatUGX(p.price)}</span>
            <span className="text-sm text-gray-500">per {p.unit}</span>
          </div>

          <p className="mt-2 text-sm text-gray-500">
            {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
          </p>

          <div className="mt-6 flex items-center gap-4">
            <span className="font-semibold">Quantity:</span>
            <div className="flex items-center rounded-full border border-gray-300">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-2 text-lg font-bold hover:bg-gray-100" aria-label="Decrease">−</button>
              <span className="px-6 font-bold">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-4 py-2 text-lg font-bold hover:bg-gray-100" aria-label="Increase">+</button>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-green-50 p-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{qty} × {formatUGX(p.price)}</span>
              <span>Total</span>
            </div>
            <div className="mt-1 flex justify-between text-2xl font-extrabold text-green-700">
              <span></span>
              <span>{formatUGX(total)}</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => add(p, qty)}
              disabled={!p.available}
              className="btn btn-primary disabled:opacity-50"
            >
              Add to Cart
            </button>
            <button
              onClick={() => { add(p, qty); router.push("/checkout"); }}
              disabled={!p.available}
              className="btn btn-accent disabled:opacity-50"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 
