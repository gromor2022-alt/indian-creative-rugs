"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
const router = useRouter();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  setLoading(true);
  setError("");

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (!data.success) {
      setError(data.message);
      setLoading(false);
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));

    router.push("/account");

  } catch (error) {
    setError("Unable to login.");
  }

  setLoading(false);
};

  return (
    <main className="bg-[#F4F0E8] min-h-screen">
      <div className="max-w-md mx-auto px-8 py-20">

        <h1 className="font-instrument text-6xl text-[#22304A] text-center">
          Login
        </h1>

        <p className="text-center text-gray-600 mt-4 mb-12">
          Welcome back. Sign in to access your account.
        </p>

        <form
  onSubmit={handleLogin}
  className="bg-white rounded-2xl shadow-sm p-10 space-y-6"
>

          <div>
            <label className="block mb-2 text-sm text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#22304A]"
           />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#22304A]"
           />
          </div>
           {error && (
  <p className="text-red-600 text-sm text-center">
    {error}
  </p>
)}           
 
          <button
  type="submit"
  disabled={loading}
  className="w-full bg-[#22304A] text-white py-3 rounded-full hover:bg-[#1B273B] transition disabled:opacity-50"
>
  {loading ? "Signing In..." : "Login"}
</button>

          <div className="text-center">
            <Link
              href="/account/register"
              className="text-[#22304A] hover:underline"
            >
              New customer? Create an account
            </Link>
          </div>

        </form>

      </div>
    </main>
  );
}