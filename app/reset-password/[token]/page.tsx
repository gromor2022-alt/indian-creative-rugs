"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const params = useParams();
  const router = useRouter();

  const token = params.token as string;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        password,
      }),
    });

    const data = await res.json();

    setMessage(data.message);

    setLoading(false);

    if (res.ok) {
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F3EC] p-6">

      <div className="w-full max-w-md rounded-[28px] bg-white p-10 shadow-lg">

        <h1 className="font-instrument text-4xl text-[#2F4F2F]">
          Reset Password
        </h1>

        <p className="mt-3 text-[#7B7468]">
          Choose a new password for your account.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          <input
            type="password"
            required
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-[#DDD] p-4"
          />

          <input
            type="password"
            required
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-xl border border-[#DDD] p-4"
          />

          <button
            disabled={loading}
            className="w-full rounded-xl bg-[#556B2F] py-4 text-white font-semibold hover:bg-[#445622]"
          >
            {loading ? "Updating..." : "Update Password"}
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