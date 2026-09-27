"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { useStore } from "@/lib/store";
import { formatUGX, formatPhone, generateBookingRef } from "@/lib/format";
import { paymentMethods } from "@/lib/data";

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const { zones, addBooking } = useStore();
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState<"delivery" | "pickup">("delivery");
  const [zone, setZone] = useState(zones[0]?.name || "Kampala Central");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [payment, setPayment] = useState(paymentMethods[0].id);
  const [submitting, setSubmitting] = useState(false);

  const selectedZone = zones.find((z) => z.name === zone);
  const deliveryFee = type === "delivery" ? (selectedZone?.fee || 0) : 0;
  const total = subtotal + deliveryFee;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) return alert("Your cart is empty.");
    if (!name || !phone) return alert("Please enter your name and phone.");
    setSubmitting(true);

    const ref = generateBookingRef();
    const booking = {
      id: crypto.randomUUID(),
      ref,
      name,
      phone: formatPhone(phone),
      email,
      type,
      zone,
      address,
      date,
      time,
      notes,
      payment,
      items: items.map((i) => ({ productId: i.productId, name: i.name, price: i.price, qty: i.qty, unit: i.unit })),
      subtotal,
      deliveryFee,
      total,
      status: "Pending" as const,
      createdAt: new Date().toISOString(),
    };

    addBooking(booking);

    // 📢 Notification placeholder — replace with real email/SMS/WhatsApp later
    console.log("📢 Booking created:", booking);

    localStorage.setItem("ffu_last_ref", ref);
    clear();
    router.push("/confirmation");
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-extrabold">Your cart is empty</h1>
        <p className="mt-2 text-gray-500">Add items before checking out.</p>
        <Link href="/shop" className="btn btn-primary mt-6 inline-flex">Go to Shop</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-extrabold">Checkout</h1>
      <p className="text-gray-500 mt-1">Confirm your details and place your order.</p>

      <form onSubmit={submit} className="mt-6 grid gap-6 md:grid-cols-5">
        <div className="md:col-span-3 space-y-4">
          <div className="card p-4 space-y-3">
            <h2 className="font-bold">Your details</h2>
            <input className="input" placeholder="Full name *" value={name} onChange={(e) => setName(e.target.value)} required />
            <input className="input" placeholder="Phone (+256...) *" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            <input className="input" type="email" placeholder="Email (optional)" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="card p-4 space-y-3">
            <h2 className="font-bold">Delivery or Pickup</h2>
            <div className="flex gap-3">
              <button type="button" onClick={() => setType("delivery")} className={`btn flex-1 ${type === "delivery" ? "btn-primary" : "btn-outline"}`}>Delivery</button>
              <button type="button" onClick={() => setType("pickup")} className={`btn flex-1 ${type === "pickup" ? "btn-primary" : "btn-outline"}`}>Pickup</button>
            </div>

            {type === "delivery" && (
              <>
                <select className="input" value={zone} onChange={(e) => setZone(e.target.value)}>
                  {zones.map((z) => (
                    <option key={z.id} value={z.name}>{z.name} — {z.fee === 0 ? "Free" : formatUGX(z.fee)}</option>
                  ))}
                </select>
                <input className="input" placeholder="Delivery address" value={address} onChange={(e) => setAddress(e.target.value)} />
              </>
            )}

            <div className="grid grid-cols-2 gap-3">
              <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              <input className="input" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
          </div>

          <div className="card p-4 space-y-3">
            <h2 className="font-bold">Payment method</h2>
            {paymentMethods.map((m) => (
              <label key={m.id} className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:bg-gray-50">
                <input type="radio" name="payment" value={m.id} checked={payment === m.id} onChange={() => setPayment(m.id)} />
                <span>{m.label}</span>
              </label>
            ))}
          </div>

          <div className="card p-4 space-y-2">
            <h2 className="font-bold">Order notes (optional)</h2>
            <textarea className="input" rows={3} placeholder="Any special requests?" value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="card p-4 sticky top-20">
            <h2 className="font-bold">Order summary</h2>
            <div className="mt-3 space-y-2 text-sm">
              {items.map((i) => (
                <div key={i.productId} className="flex justify-between">
                  <span className="truncate pr-2">{i.qty} × {i.name}</span>
                  <span className="font-semibold whitespace-nowrap">{formatUGX(i.price * i.qty)}</span>
                </div>
              ))}
            </div>
            <hr className="my-3" />
            <div className="space-y-1 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatUGX(subtotal)}</span></div>
              <div className="flex justify-between"><span>Delivery</span><span>{formatUGX(deliveryFee)}</span></div>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between text-lg font-extrabold">
              <span>Total</span>
              <span className="text-green-700">{formatUGX(total)}</span>
            </div>
            <button type="submit" disabled={submitting} className="btn btn-primary w-full mt-4 disabled:opacity-50">
              {submitting ? "Placing order..." : "Place Order"}
            </button>
            <p className="mt-3 text-xs text-gray-500 text-center">
              We&apos;ll confirm by phone/WhatsApp shortly after you order.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
} 
