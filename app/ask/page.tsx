"use client";
import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { useStore } from "@/lib/store";

export default function AskPage() {
  const { addQuestion } = useStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [question, setQuestion] = useState("");
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !question) return alert("Please enter your name and question.");
    addQuestion({
      id: "q" + Date.now(),
      name, email, phone, question,
      published: false,
      createdAt: new Date().toISOString(),
    });
    setSent(true);
    setName(""); setEmail(""); setPhone(""); setQuestion("");
  }

  if (sent) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-green-600" />
        <h1 className="mt-4 text-2xl font-extrabold">Question received!</h1>
        <p className="mt-2 text-gray-600">We&apos;ll answer as soon as possible.</p>
        <button onClick={() => setSent(false)} className="btn btn-primary mt-6">Ask another question</button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-3xl font-extrabold">Ask a Question</h1>
      <p className="text-gray-600 mt-1">Have a question? Send it — we&apos;ll reply and publish the answer.</p>
      <form onSubmit={submit} className="mt-6 card p-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Your Name *</label>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Phone</label>
            <input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+256..." />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Your Question *</label>
          <textarea rows={5} className="input" value={question} onChange={(e) => setQuestion(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          <Send className="h-4 w-4 mr-2" /> Send Question
        </button>
      </form>
    </div>
  );
} 
