"use client";

import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    const form = new FormData(e.currentTarget);

    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      window.location.href = "/dashboard";
      return;
    }

    alert("Invalid email or password.");
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#F7EADF] flex items-center justify-center p-6">

      <div className="w-full max-w-md rounded-[32px] bg-white p-10 shadow-xl">

        <div className="text-center">

          <h1 className="font-instrument text-5xl text-[#2F4F2F]">
            Admin Login
          </h1>

          <p className="mt-4 text-[#7B7468]">
            Indian Creative Rugs Dashboard
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6"
        >

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            required
            className="w-full rounded-xl border border-[#DDD6CC] px-5 py-4 outline-none focus:border-[#556B2F]"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full rounded-xl border border-[#DDD6CC] px-5 py-4 outline-none focus:border-[#556B2F]"
          />

          <button
            disabled={loading}
            className="w-full rounded-xl bg-[#556B2F] py-4 font-semibold text-white transition hover:bg-[#6C8442] disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </form>

      </div>

    </main>
  );
}