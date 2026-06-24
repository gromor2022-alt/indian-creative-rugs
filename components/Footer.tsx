import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#F4F0E8] border-t border-[#D9D1C7] mt-16 md:mt-24">

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 md:py-16">

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16">

          {/* Brand */}

          <div>
            <h3 className="font-instrument text-3xl md:text-4xl text-[#22304A] mb-5 md:mb-6">
              Indian Creative Rugs
            </h3>

            <p className="text-[#22304A]/75 leading-8">
              Luxury handmade rugs crafted in Bhadohi, India since 1980.
            </p>
          </div>

          {/* Shop */}

          <div>

            <h4 className="uppercase tracking-[3px] text-sm text-[#22304A] mb-6">
              Shop
            </h4>

            <ul className="space-y-3 text-[#22304A]/80">

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

            <h4 className="uppercase tracking-[3px] text-sm text-[#22304A] mb-6">
              Company
            </h4>

            <ul className="space-y-3 text-[#22304A]/80">

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

            <h4 className="uppercase tracking-[3px] text-sm text-[#22304A] mb-6">
              Policies
            </h4>

            <ul className="space-y-3 text-[#22304A]/80">

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

        <div className="border-t border-[#D9D1C7] mt-10 md:mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">

          <p className="text-[#22304A]/70 text-sm">
            © 2026 Indian Creative Rugs. All Rights Reserved.
          </p>

          <p className="text-[#22304A]/70 text-sm">
            Powered by AffiNexa AI Automations
          </p>

        </div>

      </div>

    </footer>
  );
}
