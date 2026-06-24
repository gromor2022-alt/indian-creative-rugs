import Link from "next/link";

export default function LeadTime() {
  return (
    <section className="bg-[#F8F5EF] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        <div className="text-center mb-16">
          <h2 className="font-instrument text-[44px] md:text-[58px] text-[#22304A] mb-4">
            Shop By Lead Time
          </h2>

          <p className="text-lg text-[#5B6472]">
            Choose the delivery timeline that best suits your project.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Ready To Ship */}

          <Link
            href="/ready-to-ship"
            className="group rounded-2xl overflow-hidden relative min-h-[320px] flex items-center justify-center text-center"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('/images/ready-to-ship.jpg')",
              }}
            />

            <div className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition" />

            <div className="relative z-10 p-10">
              <h3 className="font-instrument text-[42px] text-white mb-4">
                Ready To Ship
              </h3>

              <p className="text-[22px] font-medium text-[#F4D58D] mb-4">
                1–3 Days
              </p>

              <p className="text-white max-w-md mx-auto leading-7">
                In-stock luxury rugs available for immediate dispatch worldwide.
              </p>
            </div>
          </Link>

          {/* Quick Ship */}

          <Link
            href="/collections"
            className="group rounded-2xl overflow-hidden relative min-h-[320px] flex items-center justify-center text-center"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('/images/quick-ship.jpg')",
              }}
            />

            <div className="absolute inset-0 bg-[#22304A]/60 group-hover:bg-[#22304A]/70 transition" />

            <div className="relative z-10 p-10">
              <h3 className="font-instrument text-[42px] text-white mb-4">
                Quick Ship
              </h3>

              <p className="text-[22px] font-medium text-[#F4D58D] mb-4">
                28–35 Days
              </p>

              <p className="text-white max-w-md mx-auto leading-7">
                Popular handcrafted designs produced and delivered on an accelerated schedule.
              </p>
            </div>
          </Link>

        </div>

      </div>
    </section>
  );
}