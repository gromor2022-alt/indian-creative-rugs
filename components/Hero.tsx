import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100svh-80px)] overflow-hidden">

      {/* Background Image */}
      <Image
        src="/images/hero.png"
        alt="Indian Creative Rugs"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[calc(100svh-80px)] flex-col items-center justify-center px-6 text-center">

        <p className="mb-4 uppercase tracking-[0.4em] text-[#D4AF37] text-sm font-semibold">
          Indian Creative Rugs
        </p>

        <h1 className="max-w-5xl font-serif text-5xl leading-tight text-white md:text-7xl">
          Handcrafted Rugs for
          <br />
          Timeless Interiors
        </h1>

        <p className="mt-8 max-w-3xl text-lg leading-8 text-white/90">
          Luxury handmade rugs crafted with timeless artistry,
          bringing warmth, elegance and heritage into every home.
        </p>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row">

          <a
            href="/rugs"
            className="rounded-full bg-[#D4AF37] px-8 py-4 font-semibold uppercase tracking-[2px] text-[#234B36] transition hover:scale-105 hover:shadow-xl"
          >
            Shop All
          </a>

          <a
            href="#best-sellers"
            className="rounded-full border-2 border-white px-8 py-4 font-semibold uppercase tracking-[2px] text-white transition hover:bg-white hover:text-[#234B36]"
          >
            Shop Best Sellers
          </a>

        </div>

      </div>

    </section>
  );
}