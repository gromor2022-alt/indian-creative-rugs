import Image from "next/image";

export default function SignatureSpaces() {
  return (
    <section className="bg-[#FAF8F4] py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <p className="uppercase tracking-[0.35em] text-[#234B36] text-sm font-semibold">
            Signature Spaces
          </p>

          <h2 className="mt-4 font-serif text-4xl md:text-6xl text-[#234B36]">
            Find the Perfect Rug
            <br />
            for Every Room
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#5B6B5F]">
            Curated interiors showcasing handcrafted rugs that elevate
            living spaces with warmth, elegance and timeless craftsmanship.
          </p>
        </div>

        {/* Two Cards */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

          {/* Living Room */}
          <a
            href="/collections/living-room"
            className="group relative overflow-hidden rounded-3xl"
          >
            <div className="relative h-[600px]">

              <Image
                src="/images/living-room.jpg"
                alt="Living Room Rugs"
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              <div className="absolute bottom-10 left-10">

                <h3 className="font-serif text-4xl text-white">
                  Living Spaces
                </h3>

                <p className="mt-3 text-white/90">
                  Explore Collection →
                </p>

              </div>

            </div>
          </a>

          {/* Bedroom */}
          <a
            href="/collections/bedroom"
            className="group relative overflow-hidden rounded-3xl"
          >
            <div className="relative h-[600px]">

              <Image
                src="/images/bedroom.jpg"
                alt="Bedroom Rugs"
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              <div className="absolute bottom-10 left-10">

                <h3 className="font-serif text-4xl text-white">
                  Bedroom Retreats
                </h3>

                <p className="mt-3 text-white/90">
                  Explore Collection →
                </p>

              </div>

            </div>
          </a>

        </div>

      </div>
    </section>
  );
}