"use client";
import { useState } from "react";
import { Plus, Trash2, Save, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatUGX } from "@/lib/format";
import type { DeliveryZone } from "@/lib/data";

export default function AdminZonesPage() {
  const { zones, saveZone, deleteZone } = useStore();
  const [editing, setEditing] = useState<DeliveryZone | null>(null);

  function newZone() {
    setEditing({ id: "z" + Date.now(), name: "", fee: 0 });
  }

  function handleSave() {
    if (!editing) return;
    if (!editing.name) {
      alert("Please enter a zone name.");
      return;
    }
    saveZone(editing);
    setEditing(null);
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this zone?")) return;
    deleteZone(id);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">Delivery Zones</h1>
          <p className="text-gray-500 mt-1">Manage zones and delivery fees (UGX)</p>
        </div>
        <button onClick={newZone} className="btn btn-primary">
          <Plus className="h-4 w-4 mr-1" /> Add Zone
        </button>
      </div>

      <div className="mt-6 card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="p-3">Zone</th>
              <th className="p-3">Delivery Fee</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {zones.map((z) => (
              <tr key={z.id} className="border-t">
                <td className="p-3 font-semibold">{z.name}</td>
                <td className="p-3 font-bold text-green-700">
                  {z.fee === 0 ? "Free" : formatUGX(z.fee)}
                </td>
                <td className="p-3 text-right">
                  <button onClick={() => setEditing({ ...z })} className="rounded-lg px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 mr-2">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(z.id)} className="rounded-lg p-2 text-red-500 hover:bg-red-50" aria-label="Delete">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" onClick={() => setEditing(null)}>
          <div className="card w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold">
                {zones.find((z) => z.id === editing.id) ? "Edit Zone" : "Add Zone"}
              </h2>
              <button onClick={() => setEditing(null)} className="rounded-full p-2 hover:bg-gray-100" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Zone name *</label>
                <input
                  className="input"
                  placeholder="e.g. Kampala Central"
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Delivery fee (UGX)</label>
                <input
                  type="number"
                  className="input"
                  placeholder="5000"
                  value={editing.fee || ""}
                  onChange={(e) => setEditing({ ...editing, fee: Number(e.target.value) })}
                />
                <p className="mt-1 text-xs text-gray-500">Set 0 for free delivery (e.g. pickup).</p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => setEditing(null)} className="btn btn-outline">Cancel</button>
                <button onClick={handleSave} className="btn btn-primary">
                  <Save className="h-4 w-4 mr-1" /> Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}