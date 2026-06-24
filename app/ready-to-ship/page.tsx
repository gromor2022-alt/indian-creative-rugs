export default function ReadyToShipPage() {
  return (
    <main className="bg-[#F4F0E8] min-h-screen">

      {/* Hero */}

      <section className="max-w-6xl mx-auto px-8 pt-24 pb-20 text-center">

        <p className="uppercase tracking-[4px] text-[#B89B5E] text-sm mb-6">
          Available Now
        </p>

        <h1 className="font-instrument text-[80px] leading-none text-[#22304A] mb-10">
          Ready To Ship Rugs
        </h1>

        <p className="max-w-3xl mx-auto text-xl leading-10 text-[#22304A]/80">
          Discover handcrafted rugs available for immediate dispatch.
          No production wait time. Carefully selected pieces ready to
          elevate your space.
        </p>

      </section>

      {/* Featured Grid */}

      <section className="max-w-7xl mx-auto px-8 pb-24">

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">

          <div className="bg-white overflow-hidden">
            <img
              src="/images/rugs1.jpg"
              alt="Ready To Ship Rug"
              className="w-full h-[450px] object-cover"
            />

            <div className="p-6">
              <h3 className="font-instrument text-3xl text-[#22304A] mb-3">
                Ivory Heritage Rug
              </h3>

              <p className="text-[#22304A]/70 mb-4">
                Hand Knotted • Wool
              </p>

              <p className="text-2xl text-[#22304A]">
                $899
              </p>
            </div>
          </div>

          <div className="bg-white overflow-hidden">
            <img
              src="/images/rugs2.jpg"
              alt="Ready To Ship Rug"
              className="w-full h-[450px] object-cover"
            />

            <div className="p-6">
              <h3 className="font-instrument text-3xl text-[#22304A] mb-3">
                Royal Persian Blue
              </h3>

              <p className="text-[#22304A]/70 mb-4">
                Wool & Silk
              </p>

              <p className="text-2xl text-[#22304A]">
                $1099
              </p>
            </div>
          </div>

          <div className="bg-white overflow-hidden">
            <img
              src="/images/rugs3.jpg"
              alt="Ready To Ship Rug"
              className="w-full h-[450px] object-cover"
            />

            <div className="p-6">
              <h3 className="font-instrument text-3xl text-[#22304A] mb-3">
                Vintage Kashan
              </h3>

              <p className="text-[#22304A]/70 mb-4">
                Premium Wool
              </p>

              <p className="text-2xl text-[#22304A]">
                $949
              </p>
            </div>
          </div>

        </div>

      </section>

    </main>
  );
}