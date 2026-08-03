
import FavoriteButton from "@/components/FavoriteButton";
import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/getProducts";

export default async function RugsPage() {
  const products = await getProducts();
 


  return (
    <main className="bg-[#F7EADF] min-h-screen">

      {/* Hero */}

      <section className="text-center py-20">

        <h1 className="font-instrument text-[72px] text-[#22304A] mb-4">
          All Rugs
        </h1>

        <p className="text-lg text-gray-600">
          Explore our handcrafted luxury rug collection.
        </p>

      </section>

      {/* Categories */}

      <div className="mb-10 flex flex-wrap justify-center gap-4">

  <Link href="/rugs" className="rounded-full border border-[#355E3B] px-6 py-2 text-sm font-semibold tracking-wide text-[#355E3B] transition-all duration-300 hover:bg-[#355E3B] hover:text-white">
    All
  </Link>

  <Link href="/collections/persian" className="border px-5 py-2 hover:bg-[#22304A] hover:text-white transition">
    Persian
  </Link>

  <Link href="/collections/heritage" className="border px-5 py-2 hover:bg-[#22304A] hover:text-white transition">
    Heritage
  </Link>

  <Link href="/collections/vintage" className="border px-5 py-2 hover:bg-[#22304A] hover:text-white transition">
    Vintage
  </Link>

  <Link href="/collections/modern" className="border px-5 py-2 hover:bg-[#22304A] hover:text-white transition">
    Modern
  </Link>

</div>

     

      {/* Products */}

      <section className="max-w-7xl mx-auto px-8 pb-24">

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">

          {products.map((product: any) => (
            <Link
              key={product.id}
              href={`/rugs/${product.slug}`}
              className="group"
            >
              <div className="relative overflow-hidden">

  <FavoriteButton />

  <Image
    src={product.image}
    alt={product.name}
    width={500}
    height={700}
    className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition duration-700"
  />

</div>

              <h3 className="font-instrument text-3xl text-[#22304A] mt-5">
                {product.name}
              </h3>

              <p className="text-gray-500 mt-1">
                {product.collection}
              </p>

             
            </Link>
          ))}

        </div>

      </section>

    </main>
  );
}