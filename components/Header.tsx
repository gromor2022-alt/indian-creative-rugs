"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { cart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="bg-[#F4F0E8] border-b border-[#D9D1C7] sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">

        <div className="flex items-center h-24">

          {/* Logo */}

         <Link
  href="/"
  className="font-instrument text-[19px] leading-none sm:text-[24px] md:text-[34px] text-[#5D5A3D] shrink-0"
>
  Indian Creative Rugs
</Link>

          {/* Desktop Navigation */}
<nav
  aria-label="Primary navigation"
  className="hidden lg:flex items-center ml-auto gap-10 xl:gap-12 text-[14px] xl:text-[15px] uppercase tracking-[3px] xl:tracking-[4px] text-[#5D5A3D]"
>
  <Link href="/about" className="whitespace-nowrap hover:text-black transition-colors">
    Our Story
  </Link>

  <Link href="/rugs" className="whitespace-nowrap hover:text-black transition-colors">
    Shop
  </Link>

  <Link href="/collections" className="whitespace-nowrap hover:text-black transition-colors">
    Collections
  </Link>

  <Link href="/ready-to-ship" className="whitespace-nowrap hover:text-black transition-colors">
    Ready To Ship
  </Link>

  <Link href="/account" className="whitespace-nowrap hover:text-black transition-colors">
    My Account
  </Link>

  <Link href="/cart" className="whitespace-nowrap hover:text-black transition-colors">
    Cart ({cartCount})
  </Link>
</nav>
          {/* Mobile Menu Button */}

          <div className="lg:hidden ml-auto flex items-center gap-3">

            <Link
              href="/cart"
              className="min-h-11 inline-flex items-center text-[#5D5A3D] text-sm"
              aria-label={`View cart with ${cartCount} items`}
            >
              Cart ({cartCount})
            </Link>

            <button
              type="button"
              onClick={() =>
                setMobileMenuOpen(!mobileMenuOpen)
              }
              className="min-h-11 min-w-11 inline-flex items-center justify-center text-3xl text-[#5D5A3D]"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <span aria-hidden="true">☰</span>
            </button>

          </div>

        </div>

      </div>

      {/* Mobile Menu */}

      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="lg:hidden bg-[#F4F0E8] border-t border-[#D9D1C7]"
        >

          <nav
  aria-label="Mobile navigation"
  className="flex flex-col p-4 sm:p-6 text-[#5D5A3D] uppercase tracking-[3px] text-sm"
>
  <Link
    href="/about"
    onClick={() => setMobileMenuOpen(false)}
    className="min-h-12 flex items-center border-b border-[#D9D1C7]/60"
  >
    About
  </Link>

  <Link
    href="/rugs"
    onClick={() => setMobileMenuOpen(false)}
    className="min-h-12 flex items-center border-b border-[#D9D1C7]/60"
  >
    Shop
  </Link>

  <Link
    href="/collections"
    onClick={() => setMobileMenuOpen(false)}
    className="min-h-12 flex items-center border-b border-[#D9D1C7]/60"
  >
    Collections
  </Link>

  <Link
    href="/ready-to-ship"
    onClick={() => setMobileMenuOpen(false)}
    className="min-h-12 flex items-center border-b border-[#D9D1C7]/60"
  >
    Ready To Ship
  </Link>

  <Link
    href="/account"
    onClick={() => setMobileMenuOpen(false)}
    className="min-h-12 flex items-center border-b border-[#D9D1C7]/60"
  >
    My Account
  </Link>

  <Link
    href="/cart"
    onClick={() => setMobileMenuOpen(false)}
    className="min-h-12 flex items-center"
  >
    Cart ({cartCount})
  </Link>
</nav>

        </div>
      )}

    </header>
  );
}
