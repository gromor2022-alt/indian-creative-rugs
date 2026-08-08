"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AccountPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadCustomer = async () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (!token || !storedUser) return;

      const localUser = JSON.parse(storedUser);
      setLoggedIn(true);

      try {
        const guestFavorites = JSON.parse(
          localStorage.getItem("icr_guest_favorites") || "[]"
        );

        if (localUser.email && Array.isArray(guestFavorites) && guestFavorites.length > 0) {
          await Promise.all(
            guestFavorites.map((productId: number) =>
              fetch("/api/favorites", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email: localUser.email,
                  productId,
                }),
              }).catch(() => null)
            )
          );

          localStorage.removeItem("icr_guest_favorites");
        }
      } catch (error) {
        console.error("Guest favorites merge error:", error);
      }

      try {
        const res = await fetch(
          `/api/account/me?email=${encodeURIComponent(localUser.email)}`
        );
        const data = await res.json();
        setUser(data.success ? data.customer : localUser);
      } catch {
        setUser(localUser);
      }
    };

    loadCustomer();
  }, []);

  if (!loggedIn) {
    return (
      <main className="min-h-screen bg-[#F8F6F2] px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#B89B5E]">
              Indian Creative Rugs
            </p>
            <h1 className="mt-2 font-instrument text-4xl text-[#22304A] sm:text-5xl">
              My Account
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#6F685E]">
              Sign in to view your orders, favorites and account details.
            </p>
          </div>

          <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#E8E2D9] bg-white p-5 shadow-sm sm:p-6">
              <h2 className="font-instrument text-2xl text-[#22304A]">
                Existing Customer
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#6F685E]">
                Sign in to access your account.
              </p>
              <Link
                href="/account/login"
                className="mt-5 inline-flex rounded-full bg-[#22304A] px-5 py-2.5 text-sm font-semibold text-white"
              >
                Login
              </Link>
            </div>

            <div className="rounded-2xl border border-[#E8E2D9] bg-white p-5 shadow-sm sm:p-6">
              <h2 className="font-instrument text-2xl text-[#22304A]">
                New Customer
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#6F685E]">
                Create an account for faster checkout.
              </p>
              <Link
                href="/account/register"
                className="mt-5 inline-flex rounded-full border border-[#22304A] px-5 py-2.5 text-sm font-semibold text-[#22304A]"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const cards = [
    {
      href: "/account/orders",
      icon: "📦",
      title: "My Orders",
      text: "View your order history.",
    },
    {
      href: "/account/favorites",
      icon: "❤️",
      title: "My Favorites",
      text: "View your saved rugs.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8F6F2] px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <header>
          <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#B89B5E]">
            Customer Portal
          </p>
          <h1 className="mt-1 font-instrument text-4xl text-[#22304A] sm:text-5xl">
            Welcome Back {user?.first_name || user?.name || "Customer"} 👋
          </h1>
          <p className="mt-2 text-sm text-[#6F685E]">
            Welcome to your Indian Creative Rugs family.
          </p>
        </header>

        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="rounded-2xl border border-[#E8E2D9] bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5"
            >
              <div className="text-2xl">{card.icon}</div>
              <h3 className="mt-3 text-sm font-semibold text-[#22304A] sm:text-base">
                {card.title}
              </h3>
              <p className="mt-1 text-xs leading-5 text-[#7B7468]">
                {card.text}
              </p>
            </Link>
          ))}

          <button className="rounded-2xl border border-[#E8E2D9] bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5">
            <div className="text-2xl">🏠</div>
            <h3 className="mt-3 text-sm font-semibold text-[#22304A] sm:text-base">
              Addresses
            </h3>
            <p className="mt-1 text-xs leading-5 text-[#7B7468]">
              Billing &amp; shipping.
            </p>
          </button>

          <button className="rounded-2xl border border-[#E8E2D9] bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5">
            <div className="text-2xl">👤</div>
            <h3 className="mt-3 text-sm font-semibold text-[#22304A] sm:text-base">
              Account
            </h3>
            <p className="mt-1 text-xs leading-5 text-[#7B7468]">
              Update profile details.
            </p>
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/account";
            }}
            className="rounded-2xl border border-[#E8E2D9] bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5"
          >
            <div className="text-2xl">🚪</div>
            <h3 className="mt-3 text-sm font-semibold text-[#22304A] sm:text-base">
              Logout
            </h3>
            <p className="mt-1 text-xs leading-5 text-[#7B7468]">
              Sign out securely.
            </p>
          </button>
        </div>
      </div>
    </main>
  );
}
