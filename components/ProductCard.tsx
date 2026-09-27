"use client";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/data";
import { formatUGX } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { useRouter } from "next/navigation";

export default function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  const router = useRouter();

  return (
    <div className="card overflow-hidden flex flex-col">
      <Link href={`/product/${p.id}`} className="relative aspect-square block bg-gray-100">
        <Image
          src={p.image}
          alt={p.name}
          fill
          className="object-cover"
          sizes="(max-width:768px) 50vw, 25vw"
        />
        {!p.available && (
          <span className="absolute top-2 left-2 rounded bg-red-500 px-2 py-1 text-xs font-semibold text-white">
            Out of stock
          </span>
        )}
      </Link>
      <div className="p-3 flex flex-col flex-1">
        <Link href={`/product/${p.id}`} className="font-semibold text-sm line-clamp-2 hover:text-green-700">
          {p.name}
        </Link>
        <p className="text-xs text-gray-500 mt-0.5 capitalize">{p.unit}</p>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="font-bold text-green-700">{formatUGX(p.price)}</span>
          <span className="text-xs text-gray-500">{p.stock > 0 ? `${p.stock} in stock` : "Sold out"}</span>
        </div>
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => add(p)}
            disabled={!p.available}
            className="btn btn-primary flex-1 text-sm disabled:opacity-50"
          >
            Add
          </button>
          <button
            onClick={() => { add(p); router.push("/checkout"); }}
            disabled={!p.available}
            className="btn btn-accent flex-1 text-sm disabled:opacity-50"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
}