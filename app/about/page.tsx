"use client";
import Image from "next/image";
import Link from "next/link";
import { Leaf, Heart, Truck, Users } from "lucide-react";
import { useStore } from "@/lib/store";

export default function AboutPage() {
  const { settings } = useStore();

  return (
    <div>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1600" alt="Farm" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="mx-auto max-w-4xl px-4 py-20 text-white text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">About {settings.businessName}</h1>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
            Fresh local foods, sourced from Ugandan farmers, delivered to your door.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12">
        <h2 className="text-2xl font-extrabold">Our Story</h2>
        <p className="mt-3 text-gray-700 leading-relaxed">
          {settings.businessName} started with a simple idea: make fresh, local food easy to access
          for every household in Uganda. We work directly with farmers around Kampala, Masaka, and
          Mbale to bring you the best matooke, cassava, sweet potatoes, greens, fruits, and eggs — at fair prices.
        </p>
        <p className="mt-3 text-gray-700 leading-relaxed">
          Every morning, our team selects the freshest produce from local markets and farms.
          Orders are packed carefully, then delivered the same day in Kampala or sent upcountry overnight.
        </p>
      </section>

      <section className="bg-green-50">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <h2 className="text-2xl font-extrabold text-center">What we stand for</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {[
              { icon: Leaf, t: "Freshness first", d: "Sourced daily — never stored longer than 24 hours." },
              { icon: Heart, t: "Fair prices", d: "Direct-from-farm pricing that works for both sides." },
              { icon: Truck, t: "Reliable delivery", d: "Same-day Kampala, next-day upcountry." },
              { icon: Users, t: "Supporting farmers", d: "We buy from small local farms — your order helps them grow." },
            ].map((x) => {
              const Icon = x.icon;
              return (
                <div key={x.t} className="card p-5 flex gap-3">
                  <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-green-600 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">{x.t}</h3>
                    <p className="mt-1 text-sm text-gray-600">{x.d}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12">
        <h2 className="text-2xl font-extrabold">Visit us</h2>
        <div className="mt-4 card p-6">
          <p><strong>Address:</strong> {settings.address}</p>
          <p className="mt-2"><strong>Phone:</strong> {settings.phone}</p>
          <p className="mt-2"><strong>Email:</strong> {settings.email}</p>
          <p className="mt-2"><strong>Hours:</strong> {settings.hours}</p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/shop" className="btn btn-primary">Shop Now</Link>
          <Link href="/contact" className="btn btn-outline">Contact Us</Link>
        </div>
      </section>
    </div>
  );
} 
