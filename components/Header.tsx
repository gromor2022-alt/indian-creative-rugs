"use client";

import Link from "next/link";
import { User, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import StatusBar from "@/components/StatusBar";

export default function Header() {
  const { cart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
    <StatusBar />
    
    <header className="sticky top-0 z-50 bg-[#F7EADF]/95 backdrop-blur-md border-b border-[#D8CCBE] transition-all duration-500">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">

        <div className="flex items-center h-24">

          {/* Logo */}

         <Link
  href="/"
  className="font-instrument text-[22px] leading-none sm:text-[36px] md:text-[40px] text-[#556B2F] shrink-0"
>
  Indian Creative Rugs
</Link>

          {/* Desktop Navigation */}
<nav
  aria-label="Primary navigation"
  className="hidden lg:flex items-center ml-auto gap-12 xl:gap-16 text-[14px] xl:text-[15px] uppercase tracking-[3px] xl:tracking-[4px] text-[#556B2F]"
>
<Link
  href="/about"
  className="relative whitespace-nowrap transition-colors duration-300 hover:text-[#B68A35] after:absolute after:left-1/2 after:-bottom-2 after:h-[2px] after:w-0 after:bg-[#B68A35] after:transition-all after:duration-300 after:-translate-x-1/2 hover:after:w-full"
>
  Our Story
</Link>

  <Link
  href="/rugs"
  className="relative whitespace-nowrap transition-colors duration-300 hover:text-[#B68A35] after:absolute after:left-1/2 after:-bottom-2 after:h-[2px] after:w-0 after:bg-[#B68A35] after:transition-all after:duration-300 after:-translate-x-1/2 hover:after:w-full"
>
  Shop
</Link>

  <Link
  href="/collections"
  className="relative whitespace-nowrap transition-colors duration-300 hover:text-[#B68A35] after:absolute after:left-1/2 after:-bottom-2 after:h-[2px] after:w-0 after:bg-[#B68A35] after:transition-all after:duration-300 after:-translate-x-1/2 hover:after:w-full"
>
  Collections
</Link>

  <Link
  href="/ready-to-ship"
  className="relative whitespace-nowrap transition-colors duration-300 hover:text-[#B68A35] after:absolute after:left-1/2 after:-bottom-2 after:h-[2px] after:w-0 after:bg-[#B68A35] after:transition-all after:duration-300 after:-translate-x-1/2 hover:after:w-full"
>
  Ready To Ship
</Link>

  {false && (
  <Link href="/account">
    <User size={22} />
  </Link>
)}

<Link
  href="/cart"
  className="relative inline-flex items-center justify-center whitespace-nowrap hover:text-[#B68A35] transition-colors duration-300"
  aria-label="Shopping Cart"

>
  <ShoppingBag
  className="relative whitespace-nowrap transition-all duration-300 hover:text-[#B68A35]"
/>

  {cartCount > 0 && (
    <span className="absolute -top-2 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#B68A35] text-[10px] font-semibold text-white shadow-md">
      {cartCount}
    </span>
  )}
</Link>
</nav>
          {/* Mobile Menu Button */}

          <div className="lg:hidden ml-auto flex items-center gap-3">

            <Link
              href="/cart"
              className="min-h-11 inline-flex items-center text-[#556B2F] text-sm"
              aria-label={`View cart with ${cartCount} items`}
            >
              Cart ({cartCount})
            </Link>

            <button
              type="button"
              onClick={() =>
                setMobileMenuOpen(!mobileMenuOpen)
              }
              className="min-h-11 min-w-11 inline-flex items-center justify-center text-3xl text-[#556B2F]"
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
  className="flex flex-col p-4 sm:p-6 text-[#556B2F] uppercase tracking-[3px] text-sm"
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
    </>
  );
}
