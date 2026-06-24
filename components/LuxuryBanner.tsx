import Image from "next/image";

export default function LuxuryBanner() {
  return (
    <section className="relative h-[700px] w-full overflow-hidden">
      <Image
        src="/images/luxury.jpg"
        alt="Luxury Rugs"
        fill
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
        <p className="tracking-[6px] uppercase text-white text-sm mb-4">
          Crafted By Master Artisans
        </p>

        <h2 className="text-white text-5xl md:text-7xl font-light max-w-5xl">
          Every Rug Tells A Story
        </h2>

        <p className="text-white/90 text-xl mt-8 max-w-3xl">
          Premium wool, exceptional craftsmanship and timeless designs created
          for luxury interiors.
        </p>

        <button className="mt-10 border border-white text-white px-8 py-4 uppercase tracking-wide hover:bg-white hover:text-black transition">
          Explore Collection
        </button>
      </div>
    </section>
  );
}