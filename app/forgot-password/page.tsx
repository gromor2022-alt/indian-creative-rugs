"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const res = await fetch("/api/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    setMessage(data.message);

    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F3EC] p-6">

      <div className="w-full max-w-md rounded-[28px] bg-white p-10 shadow-lg">

        <h1 className="font-instrument text-4xl text-[#2F4F2F]">
          Forgot Password
        </h1>

        <p className="mt-3 text-[#7B7468]">
          Enter your registered email address and we'll send you a password reset link.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >

          <input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-[#DDD] p-4 outline-none focus:border-[#556B2F]"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#556B2F] py-4 font-semibold text-white hover:bg-[#445622]"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

        </form>

        {message && (
          <p className="mt-6 text-center text-sm text-[#2F4F2F]">
            {message}
          </p>
        )}

      </div>

    </div>
  );
}