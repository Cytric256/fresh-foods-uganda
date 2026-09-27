"use client";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { Check, X, Eye, EyeOff } from "lucide-react";

export default function AdminQuestionsPage() {
  const { questions, answerQuestion } = useStore();
  const [answering, setAnswering] = useState<string | null>(null);
  const [answerText, setAnswerText] = useState("");

  function saveAnswer(id: string, published: boolean) {
    if (!answerText.trim()) return;
    answerQuestion(id, answerText, published);
    setAnswering(null);
    setAnswerText("");
  }

  return (
    <div>
      <h1 className="text-3xl font-extrabold">Questions</h1>
      <p className="text-gray-500 mt-1">Answer customer questions — published answers appear on the FAQ page.</p>

      {questions.length === 0 ? (
        <div className="mt-8 card p-8 text-center text-gray-500">
          <p>No questions yet.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {questions.map((q) => (
            <div key={q.id} className="card p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold">{q.question}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    {q.name} · {q.phone} {q.email && `· ${q.email}`}
                  </p>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${q.answer && q.published ? "bg-green-100 text-green-700" : q.answer ? "bg-gray-100 text-gray-600" : "bg-orange-100 text-orange-700"}`}>
                  {q.answer && q.published ? "Published" : q.answer ? "Draft" : "Unanswered"}
                </span>
              </div>

              {q.answer && answering !== q.id && (
                <div className="mt-3 rounded-lg bg-green-50 p-3">
                  <p className="text-xs font-semibold text-green-800">Your answer</p>
                  <p className="text-sm">{q.answer}</p>
                  <div className="mt-2 flex gap-3">
                    <button
                      onClick={() => answerQuestion(q.id, q.answer!, !q.published)}
                      className="text-xs font-semibold text-green-700 hover:underline flex items-center gap-1"
                    >
                      {q.published ? <><EyeOff className="h-3 w-3" /> Unpublish</> : <><Eye className="h-3 w-3" /> Publish</>}
                    </button>
                    <button
                      onClick={() => { setAnswering(q.id); setAnswerText(q.answer || ""); }}
                      className="text-xs font-semibold text-gray-600 hover:underline"
                    >
                      Edit answer
                    </button>
                  </div>
                </div>
              )}

              {answering === q.id ? (
                <div className="mt-3 space-y-2">
                  <textarea
                    rows={3}
                    className="input"
                    placeholder="Type your answer..."
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button onClick={() => saveAnswer(q.id, true)} className="btn btn-primary text-sm">
                      <Check className="h-4 w-4 mr-1" /> Save & Publish
                    </button>
                    <button onClick={() => saveAnswer(q.id, false)} className="btn btn-outline text-sm">
                      Save as Draft
                    </button>
                    <button onClick={() => { setAnswering(null); setAnswerText(""); }} className="btn btn-outline text-sm">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ) : (
                !q.answer && (
                  <button
                    onClick={() => { setAnswering(q.id); setAnswerText(""); }}
                    className="mt-3 btn btn-primary text-sm"
                  >
                    Write Answer
                  </button>
                )
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}