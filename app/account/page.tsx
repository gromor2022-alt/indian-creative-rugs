"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AccountPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setLoggedIn(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!loggedIn) {
    return (
      <main className="bg-[#F4F0E8] min-h-screen">
        <div className="max-w-5xl mx-auto px-8 py-20">

          <h1 className="font-instrument text-6xl text-[#22304A] text-center">
            My Account
          </h1>

          <p className="text-center text-gray-600 mt-4 mb-12">
            Sign in to view your orders, addresses and account details.
          </p>

          <div className="grid md:grid-cols-2 gap-10">

            <div className="bg-white rounded-2xl p-10 shadow-sm">
              <h2 className="font-instrument text-4xl text-[#22304A] mb-6">
                Existing Customer
              </h2>

              <p className="text-gray-600 mb-8">
                Sign in to access your account.
              </p>

              <Link
                href="/account/login"
                className="inline-block bg-[#22304A] text-white px-8 py-3 rounded-full"
              >
                Login
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-10 shadow-sm">
              <h2 className="font-instrument text-4xl text-[#22304A] mb-6">
                New Customer
              </h2>

              <p className="text-gray-600 mb-8">
                Create an account for faster checkout.
              </p>

              <Link
                href="/account/register"
                className="inline-block border border-[#22304A] px-8 py-3 rounded-full"
              >
                Create Account
              </Link>
            </div>

          </div>

        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#F4F0E8] min-h-screen">
      <div className="max-w-5xl mx-auto px-8 py-20">

        <h1 className="font-instrument text-6xl text-[#22304A] mb-4">
          Welcome Back 👋
        </h1>

        <p className="text-lg text-gray-600 mb-10">
          You are successfully logged in.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

 <Link
  href="/account/orders"
  className="bg-white rounded-2xl shadow-sm p-8 hover:shadow-lg transition block text-left"
>
  <div className="text-4xl mb-4">📦</div>

  <h3 className="font-instrument text-3xl text-[#22304A]">
    My Orders
  </h3>

  <p className="text-gray-500 mt-2">
    View your order history.
  </p>
</Link>

  <button
    className="bg-white rounded-2xl shadow-sm p-8 hover:shadow-lg transition text-left"
  >
    <div className="text-4xl mb-4">🏠</div>

    <h3 className="font-instrument text-3xl text-[#22304A]">
      Addresses
    </h3>

    <p className="text-gray-500 mt-2">
      Billing & Shipping.
    </p>
  </button>

  <button
    className="bg-white rounded-2xl shadow-sm p-8 hover:shadow-lg transition text-left"
  >
    <div className="text-4xl mb-4">👤</div>

    <h3 className="font-instrument text-3xl text-[#22304A]">
      Account
    </h3>

    <p className="text-gray-500 mt-2">
      Update profile details.
    </p>
  </button>

  <button
    onClick={() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/account";
    }}
    className="bg-white rounded-2xl shadow-sm p-8 hover:shadow-lg transition text-left"
  >
    <div className="text-4xl mb-4">🚪</div>

    <h3 className="font-instrument text-3xl text-[#22304A]">
      Logout
    </h3>

    <p className="text-gray-500 mt-2">
      Sign out securely.
    </p>
  </button>

</div>

      </div>
    </main>
  );
}