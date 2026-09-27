"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { useStore } from "@/lib/store";

export default function AdminLoginPage() {
  const { login, isAdmin } = useStore();
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (isAdmin) router.push("/admin/dashboard");
  }, [isAdmin, router]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (login(pw)) {
      router.push("/admin/dashboard");
    } else {
      setError("Wrong password");
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="card p-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-green-600 text-white">
          <Lock className="h-7 w-7" />
        </div>
        <h1 className="mt-4 text-2xl font-extrabold">Admin Login</h1>
        <p className="mt-1 text-sm text-gray-500">Enter your admin password</p>

        <form onSubmit={submit} className="mt-6 space-y-3 text-left">
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            autoFocus
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" className="btn btn-primary w-full">Login</button>
        </form>

       
      </div>
    </div>
  );
}