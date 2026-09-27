"use client";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { formatUGX } from "@/lib/format";
import { Package, Calendar, MessageSquare, AlertTriangle, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const { products, bookings, questions } = useStore();

  const totalSales = bookings.filter((b) => b.status !== "Cancelled").reduce((s, b) => s + b.total, 0);
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((b) => b.status === "Pending").length;
  const unansweredQuestions = questions.filter((q) => !q.answer).length;
  const lowStock = products.filter((p) => p.stock <= 10);

  const stats = [
    { label: "Total Sales", value: formatUGX(totalSales), icon: TrendingUp, color: "bg-green-100 text-green-700" },
    { label: "Total Bookings", value: totalBookings, icon: Calendar, color: "bg-blue-100 text-blue-700" },
    { label: "Pending Bookings", value: pendingBookings, icon: Package, color: "bg-orange-100 text-orange-700" },
    { label: "Unanswered Qs", value: unansweredQuestions, icon: MessageSquare, color: "bg-purple-100 text-purple-700" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-extrabold">Dashboard</h1>
      <p className="text-gray-500 mt-1">Overview of your business</p>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card p-4">
              <div className={`grid h-10 w-10 place-items-center rounded-full ${s.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-3 text-sm text-gray-500">{s.label}</p>
              <p className="text-2xl font-extrabold">{s.value}</p>
            </div>
          );
        })}
      </div>

      {lowStock.length > 0 && (
        <div className="mt-6 card p-4 border-orange-200 bg-orange-50">
          <div className="flex items-center gap-2 text-orange-700 font-bold">
            <AlertTriangle className="h-5 w-5" /> Low Stock Warning
          </div>
          <ul className="mt-2 text-sm space-y-1">
            {lowStock.map((p) => (
              <li key={p.id} className="flex justify-between">
                <span>{p.name}</span>
                <span className="font-bold">{p.stock} left</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 card p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">Recent Bookings</h2>
          <Link href="/admin/bookings" className="text-sm text-green-700 hover:underline">View all →</Link>
        </div>
        {bookings.length === 0 ? (
          <p className="mt-3 text-sm text-gray-500">No bookings yet.</p>
        ) : (
          <div className="mt-3 space-y-2">
            {bookings.slice(0, 5).map((b) => (
              <div key={b.id} className="flex justify-between border-b py-2 text-sm">
                <div>
                  <p className="font-semibold">{b.ref}</p>
                  <p className="text-gray-500">{b.name} · {b.phone}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-700">{formatUGX(b.total)}</p>
                  <p className="text-xs text-gray-500">{b.status}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 
