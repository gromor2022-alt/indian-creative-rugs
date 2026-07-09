import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100svh-80px)] md:h-screen w-full overflow-hidden">
      
      {/* Background Image */}
      <Image
        src="/images/hero.png"
        alt="Indian Creative Rugs"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45 transition-all duration-700" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5 sm:px-6 py-12">

       <div className="flex flex-col md:flex-row gap-3 sm:gap-4 mt-7 md:mt-12 w-full max-w-[320px] sm:max-w-md md:max-w-none justify-center">

  <a
    href="#best-sellers"
    className="bg-[#D4AF37] text-[#556B2F] px-8 py-4 rounded-full font-semibold uppercase tracking-[2px] transition-all duration-300 hover:bg-[#556B2F] hover:text-white hover:scale-105 hover:shadow-xl"
  >
    Shop Our Best Sellers
  </a>

  <a
    href="/rugs"
    className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold uppercase tracking-[2px] transition-all duration-300 hover:bg-white hover:text-[#556B2F] hover:scale-105 hover:shadow-xl"
  >
    Shop All Rugs
  </a>

</div>

      </div>

    </section>
  );
}
