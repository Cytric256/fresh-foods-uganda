"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatUGX } from "@/lib/format";

export default function ConfirmationPage() {
  const { bookings } = useStore();
  const [ref, setRef] = useState<string | null>(null);

  useEffect(() => {
    const r = localStorage.getItem("ffu_last_ref");
    setRef(r);
  }, []);

  const booking = bookings.find((b) => b.ref === ref);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="text-center">
        <CheckCircle2 className="mx-auto h-20 w-20 text-green-600" />
        <h1 className="mt-4 text-3xl font-extrabold">Order confirmed!</h1>
        <p className="mt-2 text-gray-600">
          Thank you. We&apos;ll contact you shortly to confirm your order.
        </p>
      </div>

      {ref && (
        <div className="mt-8 card p-6">
          <div className="flex justify-between items-baseline">
            <span className="text-sm text-gray-500">Booking reference</span>
            <span className="font-extrabold text-green-700 text-lg">{ref}</span>
          </div>

          {booking && (
            <>
              <hr className="my-4" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Name</span><span className="font-semibold">{booking.name}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Phone</span><span className="font-semibold">{booking.phone}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Type</span><span className="font-semibold capitalize">{booking.type}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Zone</span><span className="font-semibold">{booking.zone}</span></div>
                {booking.date && <div className="flex justify-between"><span className="text-gray-500">Date</span><span className="font-semibold">{booking.date} {booking.time}</span></div>}
                <div className="flex justify-between"><span className="text-gray-500">Payment</span><span className="font-semibold uppercase">{booking.payment}</span></div>
              </div>

              <hr className="my-4" />

              <div className="space-y-2">
                {booking.items.map((it) => (
                  <div key={it.productId} className="flex justify-between text-sm">
                    <span>{it.qty} × {it.name}</span>
                    <span className="font-semibold">{formatUGX(it.price * it.qty)}</span>
                  </div>
                ))}
              </div>

              <hr className="my-4" />
              <div className="space-y-1 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>{formatUGX(booking.subtotal)}</span></div>
                <div className="flex justify-between"><span>Delivery</span><span>{formatUGX(booking.deliveryFee)}</span></div>
              </div>
              <div className="mt-3 flex justify-between text-lg font-extrabold">
                <span>Total</span>
                <span className="text-green-700">{formatUGX(booking.total)}</span>
              </div>
            </>
          )}
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <Link href="/shop" className="btn btn-primary">Continue Shopping</Link>
        <Link href="/" className="btn btn-outline">Back to Home</Link>
      </div>
    </div>
  );
} 
