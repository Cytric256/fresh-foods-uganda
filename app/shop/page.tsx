"use client";
import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { useStore } from "@/lib/store";
import { categories } from "@/lib/data";

export default function ShopPage() {
  const { products } = useStore();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState<"featured" | "low" | "high" | "name">("featured");

  const list = useMemo(() => {
    let r = products.filter(
      (p) =>
        (cat === "All" || p.category === cat) &&
        p.name.toLowerCase().includes(q.toLowerCase())
    );
    if (sort === "low") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "high") r = [...r].sort((a, b) => b.price - a.price);
    if (sort === "name") r = [...r].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "featured") r = [...r].sort((a, b) => Number(b.featured) - Number(a.featured));
    return r;
  }, [products, q, cat, sort]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-extrabold">Shop Fresh Foods</h1>
      <p className="text-gray-600 mt-1">All prices in UGX. Fresh from Ugandan farms.</p>

      {/* Search + Filters */}
      <div className="mt-6 space-y-3">
        <input
          type="text"
          placeholder="Search products..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="input"
        />

        <div className="flex flex-wrap gap-3">
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="input max-w-[220px]"
          >
            <option value="All">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            className="input max-w-[220px]"
          >
            <option value="featured">Featured first</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
            <option value="name">Name (A–Z)</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="mt-4 text-sm text-gray-500">
        {list.length} {list.length === 1 ? "product" : "products"} found
      </p>

      {/* Grid */}
      {list.length === 0 ? (
        <div className="mt-10 text-center text-gray-500">
          <p>No products match your search.</p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      )}
    </div>
  );
}