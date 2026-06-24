export default function AboutPage() {
  return (
    <main className="bg-[#F4F0E8] min-h-screen">

      {/* Hero */}

      <section className="max-w-6xl mx-auto px-8 pt-24 pb-20 text-center">

        <p className="uppercase tracking-[4px] text-[#B89B5E] text-sm mb-6">
          Since 1980 • Crafted In Bhadohi
        </p>

        <h1 className="font-instrument text-5xl md:text-7xl leading-[1.4]">
  Crafted In India.
  <br />
  Admired Worldwide.
</h1>

        <p className="max-w-4xl mx-auto text-xl leading-10 text-[#22304A]/80">
          Indian Creative Rugs has been creating handcrafted rugs since 1980,
          blending traditional Indian craftsmanship with contemporary luxury.
          From custom-made masterpieces to ready-to-ship collections, our rugs
          are designed for homes, designers and hospitality projects across
          the world.
        </p>

      </section>

      {/* Story */}

      <section className="max-w-7xl mx-auto px-8 py-20">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          <div>

            <h2 className="font-instrument text-6xl text-[#22304A] mb-8">
              Our Story
            </h2>

            <p className="text-lg leading-9 text-[#22304A]/80 mb-6">
              Founded in 1980 in Bhadohi, India's renowned carpet city,
              Indian Creative Rugs has spent decades perfecting the art of
              handcrafted rug making.
            </p>

            <p className="text-lg leading-9 text-[#22304A]/80 mb-6">
              Under the leadership of Shadab Alam, our company
              combines traditional weaving expertise with modern design
              sensibilities to create rugs that elevate interiors around
              the world.
            </p>

            <p className="text-lg leading-9 text-[#22304A]/80">
              From luxurious hand-knotted masterpieces to hand-tufted rugs,
              dhurries and fully customized creations, every piece reflects
              generations of craftsmanship and a commitment to exceptional quality.
            </p>

          </div>

          <div className="overflow-hidden rounded-sm">

            <img
              src="/images/about-workshop.jpg"
              alt="Indian Creative Rugs Workshop"
              className="w-full h-[550px] object-cover rounded-sm shadow-lg"
            />

          </div>

        </div>

      </section>

      {/* Why Choose Us */}

      <section className="max-w-7xl mx-auto px-8 py-20">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

  <div className="bg-[#E8DCC7] p-10 rounded-lg shadow-sm">
    <h3 className="text-2xl text-[#22304A] mb-4">
      Since 1980
    </h3>

    <p className="text-[#22304A]/80 leading-8">
      Over four decades of expertise in handcrafted rug manufacturing.
    </p>
  </div>

  <div className="bg-[#DCE8E4] p-10 rounded-lg shadow-sm">
    <h3 className="text-2xl text-[#22304A] mb-4">
      Custom Rugs
    </h3>

    <p className="text-[#22304A]/80 leading-8">
      Tailor-made rugs created to match your exact dimensions,
      colors and design preferences.
    </p>
  </div>

  <div className="bg-[#E6E1F3] p-10 rounded-lg shadow-sm">
    <h3 className="text-2xl text-[#22304A] mb-4">
      Artisan Crafted
    </h3>

    <p className="text-[#22304A]/80 leading-8">
      Hand-knotted, hand-tufted and dhurrie rugs made by
      experienced artisans.
    </p>
  </div>

  <div className="bg-[#F2E0D8] p-10 rounded-lg shadow-sm">
    <h3 className="text-2xl text-[#22304A] mb-4">
      Global Shipping
    </h3>

    <p className="text-[#22304A]/80 leading-8">
      Delivering premium handmade rugs to customers across
      the United States and worldwide.
    </p>
  </div>

</div>

      </section>

      {/* CTA */}

      <section className="max-w-5xl mx-auto px-8 py-24 text-center">

        <h2 className="font-instrument text-6xl text-[#22304A] mb-8">
          Let's Create Something Beautiful
        </h2>

        <p className="text-lg text-[#22304A]/70 mb-10">
          Explore our collections or discuss a custom rug project with our team.
        </p>

        <div className="flex justify-center gap-4">

          <a
            href="/rugs"
            className="bg-[#22304A] text-white px-10 py-4 uppercase tracking-[2px]"
          >
            Shop Rugs
          </a>

          <a
            href="/contact"
            className="border border-[#22304A] text-[#22304A] px-10 py-4 uppercase tracking-[2px]"
          >
            Contact Us
          </a>

        </div>

      </section>

    </main>
  );
}