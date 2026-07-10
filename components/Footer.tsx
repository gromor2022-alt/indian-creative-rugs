import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#2F4F2F] border-t border-[#D9D1C7] mt-16 md:mt-24">

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 md:py-16">

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16">

          {/* Brand */}

          <div>
            <h3 className="font-instrument text-3xl md:text-4xl text-[#F8F3EC] mb-5 md:mb-6">
              Indian Creative Rugs
            </h3>

            <p className="text-[#F8F3EC]/75 leading-8">
              Luxury handmade rugs crafted in Bhadohi, India since 1980.
            </p>
<div className="flex gap-4 mt-8">

  <a
    href="#"
    aria-label="Facebook"
    className="w-11 h-11 rounded-full border border-[#D4AF37]
    flex items-center justify-center
    text-[#F8F3EC]
    transition-all duration-300
    hover:bg-[#D4AF37]
    hover:text-[#2F4F2F]
    hover:-translate-y-1"
  >
    <FaFacebookF />
  </a>

  <a
    href="#"
    aria-label="Instagram"
    className="w-11 h-11 rounded-full border border-[#D4AF37]
    flex items-center justify-center
    text-[#F8F3EC]
    transition-all duration-300
    hover:bg-[#D4AF37]
    hover:text-[#2F4F2F]
    hover:-translate-y-1"
  >
    <FaInstagram />
  </a>

  <a
    href="#"
    aria-label="Pinterest"
    className="w-11 h-11 rounded-full border border-[#D4AF37]
    flex items-center justify-center
    text-[#F8F3EC]
    transition-all duration-300
    hover:bg-[#D4AF37]
    hover:text-[#2F4F2F]
    hover:-translate-y-1"
  >
    <FaPinterestP />
  </a>

  <a
    href="#"
    aria-label="YouTube"
    className="w-11 h-11 rounded-full border border-[#D4AF37]
    flex items-center justify-center
    text-[#F8F3EC]
    transition-all duration-300
    hover:bg-[#D4AF37]
    hover:text-[#2F4F2F]
    hover:-translate-y-1"
  >
    <FaYoutube />
  </a>

  <a
    href="https://wa.me/919984109883"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="WhatsApp"
    className="w-11 h-11 rounded-full border border-[#D4AF37]
    flex items-center justify-center
    text-[#F8F3EC]
    transition-all duration-300
    hover:bg-[#D4AF37]
    hover:text-[#2F4F2F]
    hover:-translate-y-1"
  >
    <FaWhatsapp />
  </a>

</div>
          </div>

          {/* Shop */}

          <div>

            <h4 className="uppercase tracking-[3px] text-sm text-[#F8F3EC] mb-6">
              Shop
            </h4>

            <ul className="space-y-3 text-[#F8F3EC]/80">

              <li>
                <Link href="/rugs">All Rugs</Link>
              </li>

              <li>
                <Link href="/collections">Collections</Link>
              </li>

              <li>
                <Link href="/ready-to-ship">Ready To Ship</Link>
              </li>

              <li>
                <Link href="/custom-rugs">Custom Rugs</Link>
              </li>

            </ul>

          </div>

          {/* Company */}

          <div>

            <h4 className="uppercase tracking-[3px] text-sm text-[#F8F3EC] mb-6">
              Company
            </h4>

            <ul className="space-y-3 text-[#F8F3EC]/80">

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

            <h4 className="uppercase tracking-[3px] text-sm text-[#F8F3EC] mb-6">
              Policies
            </h4>

            <ul className="space-y-3 text-[#F8F3EC]/80">

              <li>
                <Link href="/shipping-policy">
                  Shipping Policy
                </Link>
              </li>

              <li>
                <Link href="/returns-policy">
                  Returns Policy
                </Link>
              </li>

              <li>
                <Link href="/privacy-policy">
                  Privacy Policy
                </Link>
              </li>

            </ul>

          </div>

        </div>

        <div className="mt-16 border-t border-[#4D694D] pt-8">

  <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 text-center">
  
    <p className="text-sm text-[#D8D2C8]">
      © {new Date().getFullYear()} Indian Creative Rugs. All Rights Reserved.
    </p>

    <p className="text-sm text-[#D8D2C8]">
      Crafted with Pride in Bhadohi, India 🇮🇳
    </p>

    <p className="text-sm text-[#D8D2C8]">

      Designed &amp; Powered by{" "}

      <a
        href="https://www.affinexa.net"
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-[#D4AF37] transition-all duration-300 hover:text-white hover:underline"
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

