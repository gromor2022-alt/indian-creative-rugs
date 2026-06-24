import Link from "next/link";

export default function AllRugs() {
  return (
    <section className="bg-[#F4F0E8] py-16 md:py-24">

      <div className="max-w-7xl mx-auto text-center px-5 sm:px-8">

        <h2 className="font-instrument text-[40px] md:text-[54px] text-[#22304A] mb-5 md:mb-6">
          Shop All Rugs
        </h2>

        <p className="text-gray-600 mb-8 md:mb-10">
          Explore our complete collection of handcrafted luxury rugs.
        </p>

        <Link
          href="/rugs"
          className="inline-flex min-h-12 items-center justify-center bg-[#22304A] text-white px-8 sm:px-10 py-4 uppercase tracking-[2px] text-sm"
        >
          View All Rugs
        </Link>

      </div>

    </section>
  );
}
