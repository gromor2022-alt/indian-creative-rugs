import Link from "next/link";

export default function AllRugs() {
  return (
    <section className="bg-[#F7EADF] py-16 md:py-24">

      <div className="max-w-7xl mx-auto text-center px-5 sm:px-8">

       <Link
  href="/rugs"
  className="inline-flex items-center justify-center px-8 py-4 bg-[#D4AF37] text-[#5A2D82] font-semibold uppercase tracking-[2px] rounded-md transition-all duration-300 hover:brightness-95"
>
  Shop All Rugs
</Link>

      </div>

    </section>
  );
}
