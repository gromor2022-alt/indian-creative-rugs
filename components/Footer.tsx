import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaWhatsapp,
} from "react-icons/fa";

const paymentMethods = [
  {
    name: "PayPal",
    src: "/images/payment-logos/paypal.webp",
    width: 72,
    height: 32,
  },
  {
    name: "Visa",
    src: "/images/payment-logos/visa.jpg",
    width: 72,
    height: 32,
  },
  {
    name: "Mastercard",
    src: "/images/payment-logos/mastercard.webp",
    width: 72,
    height: 32,
  },
  {
    name: "Discover",
    src: "/images/payment-logos/discover.jpg",
    width: 72,
    height: 32,
  },
  {
    name: "Apple Pay",
    src: "/images/payment-logos/apple-pay.webp",
    width: 72,
    height: 32,
  },
  {
    name: "Klarna",
    src: "/images/payment-logos/klarna.webp",
    width: 72,
    height: 32,
  },
];

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-[#D9D1C7] bg-[#2F4F2F] md:mt-16">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">

          {/* Brand */}
          <div>
            <h3 className="font-instrument text-2xl text-[#F8F3EC] sm:text-3xl">
              Indian Creative Rugs
            </h3>

            <p className="mt-3 max-w-sm text-sm leading-6 text-[#F8F3EC]/75">
              Luxury handmade rugs crafted in India since 1980.
            </p>

            <div className="mt-6 flex gap-2.5">
              <a
                href="https://www.facebook.com/indiancreativerugs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37] text-sm text-[#F8F3EC] transition hover:bg-[#D4AF37] hover:text-[#2F4F2F]"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://www.instagram.com/indiancreativerugs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37] text-sm text-[#F8F3EC] transition hover:bg-[#D4AF37] hover:text-[#2F4F2F]"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.pinterest.com/indiancreativerugs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37] text-sm text-[#F8F3EC] transition hover:bg-[#D4AF37] hover:text-[#2F4F2F]"
              >
                <FaPinterestP />
              </a>

              <a
                href="https://wa.me/919984109883"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37] text-sm text-[#F8F3EC] transition hover:bg-[#D4AF37] hover:text-[#2F4F2F]"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[2px] text-[#F8F3EC]">
              Shop
            </h4>

            <ul className="mt-4 space-y-2 text-sm text-[#F8F3EC]/80">
              <li>
                <Link href="/rugs">All Rugs</Link>
              </li>

              <li>
                <Link href="/collections">Collections</Link>
              </li>

              <li>
                <Link href="/ready-to-ship">Ready To Ship</Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[2px] text-[#F8F3EC]">
              Company
            </h4>

            <ul className="mt-4 space-y-2 text-sm text-[#F8F3EC]/80">
              <li>
                <Link href="/about">About Us</Link>
              </li>

              <li>
                <Link href="/trade-program">Trade Program</Link>
              </li>

              <li>
                <Link href="/contact">Contact</Link>
              </li>

              <li>
                <Link href="/faq">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[2px] text-[#F8F3EC]">
              Policies
            </h4>

            <ul className="mt-4 space-y-2 text-sm text-[#F8F3EC]/80">
              <li>
                <Link href="/shipping-policy">Shipping Policy</Link>
              </li>

              <li>
                <Link href="/returns-policy">Returns Policy</Link>
              </li>

              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment methods */}
        <div className="mt-9 border-t border-[#4D694D] pt-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[1.8px] text-[#D8D2C8]">
                Secure Payment Options
              </p>

              <p className="mt-1 text-xs text-[#F8F3EC]/60">
                Payments are securely processed at checkout.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {paymentMethods.map((payment) => (
                <div
                  key={payment.name}
                  title={payment.name}
                  aria-label={payment.name}
                  className="
                    flex
                    h-10
                    min-w-[58px]
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-md
                    border
                    border-[#D8D2C8]/30
                    bg-white
                    px-2.5
                    shadow-sm
                  "
                >
                  <Image
                    src={payment.src}
                    alt={payment.name}
                    width={payment.width}
                    height={payment.height}
                    className="h-7 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-7 border-t border-[#4D694D] pt-6">
          <div className="flex flex-col items-center justify-center gap-2 text-center text-xs text-[#D8D2C8] lg:flex-row lg:gap-8">

            <p>
              © {new Date().getFullYear()} Indian Creative Rugs. All Rights
              Reserved.
            </p>

            <p>Crafted with Pride in India 🇮🇳</p>

            <p>
              Designed &amp; Powered by{" "}
              <a
                href="https://www.affinexa.net"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#D4AF37] hover:text-white hover:underline"
              >
                AffiNexa AI Automations
              </a>
            </p>

          </div>
        </div>
      </div>
    </footer>
  );
}