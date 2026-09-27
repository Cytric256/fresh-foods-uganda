"use client";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { formatUGX } from "@/lib/format";
import { ChevronDown, ChevronUp, Phone, MapPin, CreditCard } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  Pending: "bg-orange-100 text-orange-700",
  Confirmed: "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const STATUSES = ["Pending", "Confirmed", "Delivered", "Cancelled"] as const;

export default function AdminBookingsPage() {
  const { bookings, updateBookingStatus } = useStore();
  const [filter, setFilter] = useState<string>("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = filter === "All" ? bookings : bookings.filter((b) => b.status === filter);

  const counts = {
    All: bookings.length,
    Pending: bookings.filter((b) => b.status === "Pending").length,
    Confirmed: bookings.filter((b) => b.status === "Confirmed").length,
    Delivered: bookings.filter((b) => b.status === "Delivered").length,
    Cancelled: bookings.filter((b) => b.status === "Cancelled").length,
  };

  return (
    <div>
      <h1 className="text-3xl font-extrabold">Bookings</h1>
      <p className="text-gray-500 mt-1">Manage all customer orders</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {(["All", ...STATUSES] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              filter === s ? "bg-green-600 text-white" : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {s} ({counts[s as keyof typeof counts]})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 card p-8 text-center text-gray-500">
          <p>No {filter !== "All" ? filter.toLowerCase() : ""} bookings yet.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {filtered.map((b) => {
            const open = expanded === b.id;
            return (
              <div key={b.id} className="card overflow-hidden">
                <button
                  onClick={() => setExpanded(open ? null : b.id)}
                  className="w-full p-4 text-left hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-extrabold text-green-700">{b.ref}</span>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_COLORS[b.status]}`}>
                          {b.status}
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-semibold">{b.name}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(b.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-extrabold text-green-700">{formatUGX(b.total)}</p>
                      <p className="text-xs text-gray-500">{b.items.length} items</p>
                    </div>
                    {open ? <ChevronUp className="h-5 w-5 flex-shrink-0" /> : <ChevronDown className="h-5 w-5 flex-shrink-0" />}
                  </div>
                </button>

                {open && (
                  <div className="border-t bg-gray-50 p-4 space-y-4 text-sm">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <Phone className="h-4 w-4 mt-0.5 text-gray-400" />
                          <div>
                            <p className="font-semibold">{b.phone}</p>
                            {b.email && <p className="text-gray-500">{b.email}</p>}
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 mt-0.5 text-gray-400" />
                          <div>
                            <p className="font-semibold capitalize">{b.type}</p>
                            <p className="text-gray-500">{b.zone}{b.address ? ` · ${b.address}` : ""}</p>
                            {b.date && <p className="text-gray-500">{b.date} {b.time}</p>}
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <CreditCard className="h-4 w-4 mt-0.5 text-gray-400" />
                          <div>
                            <p className="font-semibold uppercase">{b.payment}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="font-semibold mb-2">Items</p>
                        <div className="space-y-1">
                          {b.items.map((it) => (
                            <div key={it.productId} className="flex justify-between text-sm">
                              <span>{it.qty} × {it.name}</span>
                              <span className="font-semibold">{formatUGX(it.price * it.qty)}</span>
                            </div>
                          ))}
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between text-sm">
                          <span>Subtotal</span>
                          <span>{formatUGX(b.subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Delivery</span>
                          <span>{formatUGX(b.deliveryFee)}</span>
                        </div>
                        <div className="flex justify-between font-extrabold text-green-700 mt-1">
                          <span>Total</span>
                          <span>{formatUGX(b.total)}</span>
                        </div>
                      </div>
                    </div>

                    {b.notes && (
                      <div className="rounded-lg bg-white p-3 border">
                        <p className="text-xs font-semibold text-gray-500">Order notes</p>
                        <p>{b.notes}</p>
                      </div>
                    )}

                    <div>
                      <p className="text-xs font-semibold text-gray-500 mb-2">Update status</p>
                      <div className="flex flex-wrap gap-2">
                        {STATUSES.map((s) => (
                          <button
                            key={s}
                            onClick={() => updateBookingStatus(b.id, s)}
                            disabled={b.status === s}
                            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                              b.status === s
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : "bg-white border border-gray-200 hover:bg-gray-100"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}