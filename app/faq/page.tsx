"use client";
import Link from "next/link";
import { HelpCircle, MessageCircleQuestion } from "lucide-react";
import { useStore } from "@/lib/store";

export default function FAQPage() {
  const { questions } = useStore();
  const published = questions.filter((q) => q.answer && q.published);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="text-center">
        <HelpCircle className="mx-auto h-12 w-12 text-green-600" />
        <h1 className="mt-3 text-3xl font-extrabold">Frequently Asked Questions</h1>
        <p className="text-gray-600 mt-2">Answers to questions our customers often ask.</p>
      </div>

      {published.length === 0 ? (
        <div className="mt-10 card p-8 text-center text-gray-500">
          <p>No published questions yet. Be the first to ask!</p>
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          {published.map((q) => (
            <details key={q.id} className="card p-4">
              <summary className="cursor-pointer font-semibold flex items-start gap-2 list-none">
                <MessageCircleQuestion className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>{q.question}</span>
              </summary>
              <p className="mt-3 pl-7 text-gray-700">{q.answer}</p>
              <p className="mt-2 pl-7 text-xs text-gray-400">— asked by {q.name}</p>
            </details>
          ))}
        </div>
      )}

      <div className="mt-10 card p-6 text-center bg-green-50 border-green-100">
        <h2 className="font-bold text-lg">Didn&apos;t find your answer?</h2>
        <p className="text-sm text-gray-600 mt-1">Send us your question and we&apos;ll reply.</p>
        <Link href="/ask" className="btn btn-primary mt-4 inline-flex">Ask a Question</Link>
      </div>
    </div>
  );
} 
