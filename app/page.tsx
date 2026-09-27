"use client";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { useStore } from "@/lib/store";
import { formatUGX } from "@/lib/format";

export default function HomePage() {
  const { products, zones } = useStore();
  const featured = products.filter((p) => p.featured).slice(0, 4);

  return (
    <div>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600"
            alt="Fresh produce"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        </div>
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-32 text-white">
          <span className="inline-block rounded-full bg-orange-500 px-4 py-1 text-xs font-bold">
            FRESH · LOCAL · UGANDA
          </span>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold max-w-2xl leading-tight">
            Fresh foods from Ugandan farms, delivered to your door.
          </h1>
          <p className="mt-4 max-w-xl text-white/90">
            Matooke, cassava, sweet potatoes, greens, fruits, vegetables and eggs — order online, pay on delivery or by mobile money.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shop" className="btn btn-primary">Shop Now</Link>
            <Link href="/checkout" className="btn btn-accent">Book Now</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl md:text-3xl font-extrabold">Featured Products</h2>
          <Link href="/shop" className="text-sm font-semibold text-green-700 hover:underline">View all →</Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      <section className="bg-green-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center">How it works</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {[
              { n: 1, t: "Browse", d: "Explore fresh fruits, vegetables and local foods." },
              { n: 2, t: "Book", d: "Add items to cart and place your order." },
              { n: 3, t: "Confirm", d: "We call/WhatsApp to confirm your order." },
              { n: 4, t: "Delivery / Pickup", d: "Get it delivered or pick up at our shop." },
            ].map((s) => (
              <div key={s.n} className="card p-5">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-green-600 text-white font-bold">
                  {s.n}
                </div>
                <h3 className="mt-3 font-bold">{s.t}</h3>
                <p className="mt-1 text-sm text-gray-600">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl md:text-3xl font-extrabold">Delivery zones & fees</h2>
        <p className="text-gray-600 mt-2">We deliver across Uganda. Fees depend on your zone.</p>
        <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {zones.map((z) => (
            <div key={z.id} className="card p-4 flex items-center justify-between">
              <span className="text-sm font-medium">{z.name}</span>
              <span className="text-sm font-bold text-green-700">
                {z.fee === 0 ? "Free" : formatUGX(z.fee)}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-orange-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center">Why customers trust us</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { t: "Farm-fresh daily", d: "Sourced directly from local farmers every morning." },
              { t: "Fair prices", d: "Honest UGX prices — no hidden fees." },
              { t: "Reliable delivery", d: "Same-day in Kampala, next-day upcountry." },
            ].map((x) => (
              <div key={x.t} className="card p-6">
                <h3 className="font-bold text-lg">{x.t}</h3>
                <p className="mt-1 text-sm text-gray-600">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}