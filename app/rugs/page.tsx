import FavoriteButton from "@/components/FavoriteButton";
import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/getProducts";

export default async function RugsPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-[#F7EADF]">

      {/* Hero */}
      <section className="py-20 text-center">
        <h1 className="mb-4 font-instrument text-[52px] text-[#22304A] md:text-[72px]">
          All Rugs
        </h1>

        <p className="text-lg text-gray-600">
          Explore our handcrafted luxury rug collection.
        </p>
      </section>

      {/* Categories */}
      <div className="mb-10 flex flex-wrap justify-center gap-4 px-6">

        <Link
          href="/rugs"
          className="
            rounded-full
            border
            border-[#355E3B]
            px-6
            py-2
            text-sm
            font-semibold
            tracking-wide
            text-[#355E3B]
            transition-all
            duration-300
            hover:bg-[#355E3B]
            hover:text-white
          "
        >
          All
        </Link>

        <Link
          href="/collections/persian"
          className="
            border
            px-5
            py-2
            transition
            hover:bg-[#22304A]
            hover:text-white
          "
        >
          Persian
        </Link>

        <Link
          href="/collections/heritage"
          className="
            border
            px-5
            py-2
            transition
            hover:bg-[#22304A]
            hover:text-white
          "
        >
          Heritage
        </Link>

        <Link
          href="/collections/vintage"
          className="
            border
            px-5
            py-2
            transition
            hover:bg-[#22304A]
            hover:text-white
          "
        >
          Vintage
        </Link>

        <Link
          href="/collections/modern"
          className="
            border
            px-5
            py-2
            transition
            hover:bg-[#22304A]
            hover:text-white
          "
        >
          Modern
        </Link>

      </div>

      {/* Products */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-8">

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-4 lg:gap-10">

          {products.map((product: any) => (

            <article
              key={product.id}
              className="group"
            >

              {/* Product Image + Favorite */}
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[20px]
                  bg-[#FCF8F2]
                  shadow-sm
                "
              >

                {/* Favorite Button */}
                <div className="absolute right-4 top-4 z-20">
                  <FavoriteButton productId={product.id} />
                </div>

                {/* Product Link */}
                <Link
                  href={`/rugs/${product.slug}`}
                  className="block"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={500}
                    height={700}
                    className="
                      aspect-[4/5]
                      w-full
                      object-cover
                      transition
                      duration-700
                      group-hover:scale-105
                    "
                  />
                </Link>

              </div>

              {/* Product Information */}
              <Link
                href={`/rugs/${product.slug}`}
                className="block"
              >
                <h3
                  className="
                    mt-5
                    font-instrument
                    text-xl
                    text-[#22304A]
                    transition-colors
                    duration-300
                    group-hover:text-[#B68A35]
                    md:text-2xl
                    lg:text-3xl
                  "
                >
                  {product.name}
                </h3>

                <p className="mt-1 text-sm text-gray-500 md:text-base">
                  {product.collection}
                </p>
              </Link>

            </article>

          ))}

        </div>

      </section>

    </main>
  );
}