"use client";
import { useState } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { useStore } from "@/lib/store";

export default function ContactPage() {
  const { settings } = useStore();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !message) return alert("Please enter your name and message.");
    setSent(true);
    setName(""); setPhone(""); setMessage("");
  }

  const whatsappUrl = `https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-3xl font-extrabold">Contact Us</h1>
      <p className="text-gray-600 mt-1">We&apos;d love to hear from you.</p>

      <div className="mt-8 grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="card p-5 space-y-4">
            <div className="flex gap-3">
              <Phone className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Phone</p>
                <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="text-sm text-gray-600 hover:text-green-700">{settings.phone}</a>
              </div>
            </div>
            <div className="flex gap-3">
              <Mail className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Email</p>
                <a href={`mailto:${settings.email}`} className="text-sm text-gray-600 hover:text-green-700">{settings.email}</a>
              </div>
            </div>
            <div className="flex gap-3">
              <MapPin className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Address</p>
                <p className="text-sm text-gray-600">{settings.address}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Business Hours</p>
                <p className="text-sm text-gray-600">{settings.hours}</p>
              </div>
            </div>
          </div>

          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full">Chat on WhatsApp</a>

          <div className="card overflow-hidden">
            <iframe title="Map" src="https://www.google.com/maps?q=Nakasero+Market+Kampala&output=embed" className="w-full h-64 border-0" loading="lazy" />
          </div>
        </div>

        <div>
          {sent ? (
            <div className="card p-8 text-center">
              <CheckCircle2 className="mx-auto h-14 w-14 text-green-600" />
              <h2 className="mt-4 text-xl font-extrabold">Message sent!</h2>
              <p className="mt-2 text-sm text-gray-600">We&apos;ll get back to you as soon as possible.</p>
              <button onClick={() => setSent(false)} className="btn btn-primary mt-6">Send another message</button>
            </div>
          ) : (
            <form onSubmit={submit} className="card p-6 space-y-4">
              <h2 className="font-bold text-lg">Send us a message</h2>
              <div>
                <label className="block text-sm font-semibold mb-1">Your Name *</label>
                <input className="input" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Phone</label>
                <input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+256..." />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Message *</label>
                <textarea rows={5} className="input" value={message} onChange={(e) => setMessage(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-primary w-full">
                <Send className="h-4 w-4 mr-2" /> Send Message
              </button>
            </form>
          )}
          <div className="mt-4 text-center">
            <Link href="/ask" className="text-sm text-green-700 hover:underline">Or ask a public question →</Link>
          </div>
        </div>
      </div>
    </div>
  );
} 
