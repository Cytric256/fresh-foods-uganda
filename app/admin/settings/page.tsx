"use client";
import { useState, useEffect } from "react";
import { Save, CheckCircle2 } from "lucide-react";
import { useStore } from "@/lib/store";
import type { Settings } from "@/lib/data";

export default function AdminSettingsPage() {
  const { settings, updateSettings } = useStore();
  const [form, setForm] = useState<Settings>(settings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  function handleSave() {
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-extrabold">Settings</h1>
      <p className="text-gray-500 mt-1">Business information shown across the site</p>

      <div className="mt-6 card p-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Business Name</label>
          <input className="input" value={form.businessName} onChange={(e) => setForm({ ...form, businessName: e.target.value })} />
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold mb-1">Phone</label>
            <input className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+256 700 123 456" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">WhatsApp</label>
            <input className="input" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} placeholder="+256700123456" />
            <p className="mt-1 text-xs text-gray-500">No spaces or + — used in the WhatsApp link</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input className="input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Address</label>
          <input className="input" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Shop 12, Nakasero Market, Kampala" />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Business Hours</label>
          <input className="input" value={form.hours} onChange={(e) => setForm({ ...form, hours: e.target.value })} />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button onClick={handleSave} className="btn btn-primary">
            <Save className="h-4 w-4 mr-1" /> Save Settings
          </button>
          {saved && (
            <span className="flex items-center gap-1 text-green-700 font-semibold">
              <CheckCircle2 className="h-5 w-5" /> Saved!
            </span>
          )}
        </div>
      </div>
    </div>
  );
}