import Image from "next/image";

export default function Hero() {
  return (
    <section className="icr-hero grid min-h-[calc(100svh-80px)] w-full grid-cols-1 md:grid-cols-2">
      <a href="/rugs" className="icr-hero-panel group relative min-h-[50svh] overflow-hidden md:min-h-[calc(100svh-80px)]">
        <Image
          src="/images/collections/hero.jpg"
          alt="Shop All Indian Creative Rugs"
          fill
          priority
          className="icr-hero-media object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/20" />
        <div className="absolute inset-x-0 bottom-12 z-10 flex justify-center">
          <span className="rounded-full bg-white px-8 py-4 font-semibold uppercase tracking-[2px] text-[#234B36] shadow-lg transition duration-300 group-hover:bg-[#234B36] group-hover:text-white">
            Shop All
          </span>
        </div>
      </a>

      <a href="#best-sellers" className="icr-hero-panel group relative min-h-[50svh] overflow-hidden md:min-h-[calc(100svh-80px)]">
        <video autoPlay loop muted playsInline className="icr-hero-media absolute inset-0 h-full w-full object-cover">
          <source src="/images/collections/rug.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/20" />
        <div className="absolute inset-x-0 bottom-12 z-10 flex justify-center">
          <span className="rounded-full bg-white px-8 py-4 font-semibold uppercase tracking-[2px] text-[#234B36] shadow-lg transition duration-300 group-hover:bg-[#234B36] group-hover:text-white">
            Shop Our Best Sellers
          </span>
        </div>
      </a>
    </section>
  );
}
