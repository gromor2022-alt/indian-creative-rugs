import Image from "next/image";

export default function ReadyToShipPage() {
  return (
    <main className="bg-[#F4F0E8] min-h-screen">

      {/* Hero */}

      <section className="max-w-6xl mx-auto px-8 pt-24 pb-16 text-center">

        <p className="uppercase tracking-[4px] text-[#B89B5E] text-sm mb-6">
          Worldwide Delivery
        </p>

        <h1 className="font-instrument text-[72px] text-[#22304A] mb-8">
          Shipping Options
        </h1>

        <p className="max-w-3xl mx-auto text-lg leading-9 text-[#22304A]/80">
          Every rug is handcrafted with exceptional attention to detail.
          Choose the delivery option that best suits your project timeline.
        </p>

      </section>

      {/* Shipping Options */}

      <section className="max-w-7xl mx-auto px-8 pb-24">

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Ready To Ship */}

          <div className="bg-white overflow-hidden shadow-sm hover:shadow-xl transition duration-500">

            <Image
              src="/images/shipping/ready-to-ship.jpg"
              alt="Ready To Ship"
              width={1200}
              height={900}
              className="w-full h-[520px] object-cover"
            />

            <div className="p-8">

              <span className="inline-block bg-[#D8C59F] text-[#22304A] px-4 py-2 text-sm tracking-wide uppercase rounded-full mb-5">
                Immediate Dispatch
              </span>

              <h2 className="font-instrument text-[42px] text-[#22304A] mb-4">
                Ready To Ship
              </h2>

              <p className="text-[#22304A]/75 leading-8 mb-6">
                Selected rugs already completed and available in stock.
                Orders are dispatched within <strong>1–3 business days</strong>.
              </p>

              <p className="text-[#B89B5E] text-xl font-medium">
                Delivery Time: 1–3 Days
              </p>

            </div>

          </div>

          {/* Quick Ship */}

          <div className="bg-white overflow-hidden shadow-sm hover:shadow-xl transition duration-500">

            <Image
              src="/images/shipping/quick-ship.jpg"
              alt="Quick Ship"
              width={1200}
              height={900}
              className="w-full h-[520px] object-cover"
            />

            <div className="p-8">

              <span className="inline-block bg-[#D8C59F] text-[#22304A] px-4 py-2 text-sm tracking-wide uppercase rounded-full mb-5">
                Made To Order
              </span>

              <h2 className="font-instrument text-[42px] text-[#22304A] mb-4">
                Quick Ship
              </h2>

              <p className="text-[#22304A]/75 leading-8 mb-6">
                Crafted especially for you using our standard production
                schedule while maintaining the same premium quality and
                craftsmanship.
              </p>

              <p className="text-[#B89B5E] text-xl font-medium">
                Delivery Time: 28–35 Days
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}