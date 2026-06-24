import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100svh-80px)] md:h-screen w-full overflow-hidden">
      
      {/* Background Image */}
      <Image
        src="/images/hero.jpg"
        alt="Indian Creative Rugs"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5 sm:px-6 py-12">

        <p
          className="uppercase tracking-[3px] sm:tracking-[4px] md:tracking-[10px] text-xs sm:text-sm md:text-base font-medium text-[#E8D9B5] mb-5 md:mb-8"
          style={{
            textShadow: "0 1px 8px rgba(0,0,0,0.45)",
          }}
        >
          Handcrafted In India
        </p>

        <h1 className="font-instrument text-white text-[38px] min-[390px]:text-[44px] sm:text-[52px] md:text-[96px] leading-[1.05] md:leading-[1] max-w-6xl px-1">
          Luxury Handmade Rugs
          <br />
          For Modern Living Spaces
        </h1>

        <p className="text-white text-base md:text-xl max-w-2xl leading-relaxed mt-5 md:mt-10 px-2 sm:px-4">
          Timeless craftsmanship, contemporary design, and artisan-made rugs
          for elegant homes.
        </p>

        <div className="flex flex-col md:flex-row gap-3 sm:gap-4 mt-7 md:mt-12 w-full max-w-[320px] sm:max-w-md md:max-w-none justify-center">

  <a
    href="#best-sellers"
    className="w-full md:w-auto bg-white text-[#22304A] px-6 sm:px-12 py-4 sm:py-5 uppercase tracking-[2px] text-sm hover:bg-[#F4F0E8] transition text-center"
  >
    Shop Our Best Sellers
  </a>

  <a
    href="/rugs"
    className="w-full md:w-auto border border-white text-white px-6 sm:px-12 py-4 sm:py-5 uppercase tracking-[2px] text-sm hover:bg-white hover:text-[#22304A] transition text-center"
  >
    Shop All Rugs
  </a>

</div>

      </div>

    </section>
  );
}
