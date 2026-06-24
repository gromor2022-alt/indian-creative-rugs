import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/getProducts";

export default async function RugsPage() {
  const products = await getProducts();
  console.log("PRODUCTS:", products);

  return (
    <main className="bg-[#F4F0E8] min-h-screen">

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

      <section className="max-w-7xl mx-auto px-8 mb-12">

        <div className="flex flex-wrap gap-4 justify-center">

          <button className="border px-5 py-2">
            All
          </button>

          <button className="border px-5 py-2">
            Persian
          </button>

          <button className="border px-5 py-2">
            Heritage
          </button>

          <button className="border px-5 py-2">
            Vintage
          </button>

          <button className="border px-5 py-2">
            Modern
          </button>

        </div>

      </section>

      {/* Products */}

      <section className="max-w-7xl mx-auto px-8 pb-24">

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">

          {products.map((product: any) => (
            <Link
              key={product.id}
              href={`/rugs/${product.slug}`}
              className="group"
            >
              <div className="overflow-hidden">

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