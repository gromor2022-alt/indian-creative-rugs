"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
 
const router = useRouter();

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();

  setLoading(true);
  setError("");

  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
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

    const loginRes = await fetch("/api/auth/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email,
    password,
  }),
});

const loginData = await loginRes.json();

if (loginData.success) {
  localStorage.setItem("token", loginData.token);
  localStorage.setItem("user", JSON.stringify(loginData));

  router.push("/account");
} else {
  router.push("/account/login");
}
  } catch (error) {
    setError("Unable to create account.");
  }

  setLoading(false);
};

 return (
    <main className="bg-[#F4F0E8] min-h-screen">
      <div className="max-w-md mx-auto px-8 py-20">

        <h1 className="font-instrument text-6xl text-[#22304A] text-center">
          Create Account
        </h1>

        <p className="text-center text-gray-600 mt-4 mb-12">
          Create your account to track orders and enjoy a faster checkout.
        </p>

        <form
  onSubmit={handleRegister}
  className="bg-white rounded-2xl shadow-sm p-10 space-y-6"
>

          <div>
            <label className="block mb-2 text-sm text-gray-700">
              Full Name
            </label>

            <input
  type="text"
  placeholder="John Doe"
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#22304A]"
/>
          </div>

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
  <p className="text-red-600 text-center text-sm">
    {error}
  </p>
)}

          <button
  type="submit"
  disabled={loading}
  className="w-full bg-[#22304A] text-white py-3 rounded-full hover:bg-[#1B273B] transition disabled:opacity-50"
>
  {loading ? "Creating Account..." : "Create Account"}
</button>

          <div className="text-center">
            <Link
              href="/account/login"
              className="text-[#22304A] hover:underline"
            >
              Already have an account? Login
            </Link>
          </div>

        </form>

      </div>
    </main>
  );
}