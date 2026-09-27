"use client";
import { useState } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, X, Upload } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatUGX } from "@/lib/format";
import { categories } from "@/lib/data";
import type { Product } from "@/lib/data";

export default function AdminProductsPage() {
  const { products, saveProduct, deleteProduct } = useStore();
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  function newProduct() {
    setEditing({
      id: "p" + Date.now(),
      name: "",
      category: categories[0],
      description: "",
      price: 0,
      unit: "kg",
      stock: 0,
      image: "",
      available: true,
      featured: false,
    });
    setShowForm(true);
  }

  function editProduct(p: Product) {
    setEditing({ ...p });
    setShowForm(true);
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this product?")) return;
    deleteProduct(id);
  }

  function handleSave() {
    if (!editing) return;
    if (!editing.name || editing.price <= 0) {
      alert("Please enter a name and a price.");
      return;
    }
    saveProduct(editing);
    setShowForm(false);
    setEditing(null);
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Image too large. Please use a photo under 2MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setEditing({ ...editing, image: reader.result as string });
    };
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">Products</h1>
          <p className="text-gray-500 mt-1">{products.length} products · manage your shop</p>
        </div>
        <button onClick={newProduct} className="btn btn-primary">
          <Plus className="h-4 w-4 mr-1" /> Add Product
        </button>
      </div>

      <div className="mt-6 card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3 hidden md:table-cell">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3 hidden md:table-cell">Stock</th>
              <th className="p-3 hidden md:table-cell">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded bg-gray-100">
                      {p.image ? (
                        <Image src={p.image} alt={p.name} fill className="object-cover" sizes="40px" />
                      ) : (
                        <div className="grid h-full place-items-center text-xs text-gray-400">?</div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold truncate">{p.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{p.unit}</p>
                    </div>
                  </div>
                </td>
                <td className="p-3 hidden md:table-cell text-gray-600">{p.category}</td>
                <td className="p-3 font-bold text-green-700">{formatUGX(p.price)}</td>
                <td className="p-3 hidden md:table-cell">
                  <span className={p.stock <= 10 ? "text-orange-600 font-bold" : ""}>{p.stock}</span>
                </td>
                <td className="p-3 hidden md:table-cell">
                  {p.available ? (
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">Available</span>
                  ) : (
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-500">Hidden</span>
                  )}
                </td>
                <td className="p-3 text-right">
                  <button onClick={() => editProduct(p)} className="rounded-lg p-2 hover:bg-gray-100" aria-label="Edit">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="rounded-lg p-2 text-red-500 hover:bg-red-50" aria-label="Delete">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" onClick={() => setShowForm(false)}>
          <div className="card w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold">
                {products.find((p) => p.id === editing.id) ? "Edit Product" : "Add Product"}
              </h2>
              <button onClick={() => setShowForm(false)} className="rounded-full p-2 hover:bg-gray-100" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Product Image</label>
                <div className="flex items-center gap-4">
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    {editing.image ? (
                      <Image src={editing.image} alt="Preview" fill className="object-cover" sizes="96px" />
                    ) : (
                      <div className="grid h-full place-items-center text-xs text-gray-400">No image</div>
                    )}
                  </div>
                  <label className="btn btn-outline cursor-pointer">
                    <Upload className="h-4 w-4 mr-1" /> Upload
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
                <p className="mt-1 text-xs text-gray-500">Or paste an image URL below.</p>
                <input
                  className="input mt-2"
                  placeholder="https://..."
                  value={editing.image.startsWith("data:") ? "" : editing.image}
                  onChange={(e) => setEditing({ ...editing, image: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Name *</label>
                <input className="input" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold mb-1">Category</label>
                  <select className="input" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })}>
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Unit</label>
                  <select className="input" value={editing.unit} onChange={(e) => setEditing({ ...editing, unit: e.target.value })}>
                    {["kg", "bunch", "piece", "sack", "crate", "tray"].map((u) => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold mb-1">Price (UGX) *</label>
                  <input type="number" className="input" value={editing.price || ""} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Stock</label>
                  <input type="number" className="input" value={editing.stock || ""} onChange={(e) => setEditing({ ...editing, stock: Number(e.target.value) })} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Description</label>
                <textarea rows={3} className="input" value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
              </div>

              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={editing.available} onChange={(e) => setEditing({ ...editing, available: e.target.checked })} />
                  <span className="text-sm">Available for sale</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} />
                  <span className="text-sm">Featured on home page</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => setShowForm(false)} className="btn btn-outline">Cancel</button>
                <button onClick={handleSave} className="btn btn-primary">Save Product</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
