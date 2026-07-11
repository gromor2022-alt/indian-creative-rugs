"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
const router = useRouter();

async function handleLogout() {
  await fetch("/api/logout", {
    method: "POST",
  });

  router.push("/login");
  router.refresh();
}
  return (
    <div className="p-10">

      {/* Header */}

      <div className="mb-10">

        <h1 className="font-instrument text-5xl text-[#2F4F2F]">
          Settings
        </h1>

        <p className="mt-3 text-[#7B7468]">
          Manage your dashboard preferences and system information.
        </p>

      </div>

      <div className="grid gap-8 lg:grid-cols-2">

        {/* Admin Profile */}

        <div className="rounded-[24px] bg-white p-8 shadow-sm">

          <h2 className="mb-6 font-instrument text-3xl text-[#2F4F2F]">
            👤 Admin Profile
          </h2>

          <div className="space-y-4">

            <p>
              <strong>Name:</strong> ICR Administrator
            </p>

            <p>
              <strong>Email:</strong> hello@indiancreativerugs.com
            </p>

          </div>

        </div>

        {/* Security */}

        <div className="rounded-[24px] bg-white p-8 shadow-sm">

          <h2 className="mb-6 font-instrument text-3xl text-[#2F4F2F]">
            🔐 Security
          </h2>

          <div className="space-y-4">

            <Link
              href="/forgot-password"
              className="block rounded-xl border border-[#EEE6DA] p-4 hover:bg-[#F9F7F2]"
            >
              Change Password
            </Link>

            <button
  onClick={handleLogout}
  className="w-full rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-700 transition"
>
  Logout
</button>

          </div>

        </div>

        {/* SMTP */}

        <div className="rounded-[24px] bg-white p-8 shadow-sm">

          <h2 className="mb-6 font-instrument text-3xl text-[#2F4F2F]">
            📧 Email Service
          </h2>

          <p className="text-green-700 font-medium">
            ✅ SMTP Configured
          </p>

        </div>

        {/* Database */}

        <div className="rounded-[24px] bg-white p-8 shadow-sm">

          <h2 className="mb-6 font-instrument text-3xl text-[#2F4F2F]">
            🗄 Database
          </h2>

          <p className="text-green-700 font-medium">
            ✅ PostgreSQL Connected
          </p>

        </div>

        {/* WooCommerce */}

        <div className="rounded-[24px] bg-white p-8 shadow-sm">

          <h2 className="mb-6 font-instrument text-3xl text-[#2F4F2F]">
            🛒 WooCommerce
          </h2>

          <p className="text-green-700 font-medium">
            ✅ API Connected
          </p>

        </div>

        {/* System */}

        <div className="rounded-[24px] bg-white p-8 shadow-sm">

          <h2 className="mb-6 font-instrument text-3xl text-[#2F4F2F]">
            ℹ️ System
          </h2>

          <div className="space-y-2">

            <p>
              <strong>Application:</strong> Indian Creative Rugs ERP Lite
            </p>

            <p>
              <strong>Version:</strong> 1.0
            </p>

            <p>
              <strong>Developed By:</strong> AffiNexa AI Automations
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}