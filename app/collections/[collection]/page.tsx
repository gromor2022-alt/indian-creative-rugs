import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/getProducts";
import { notFound } from "next/navigation";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
const { collection } = await params;  
const allProducts = await getProducts();

const collectionProducts = allProducts.filter(
  (product: any) =>
    product.category?.toLowerCase().replace(/\s+/g, "-") === collection
);

  if (collectionProducts.length === 0) {
    notFound();
  }

  return (
    <main className="bg-[#F4F0E8] min-h-screen">

      <div className="max-w-7xl mx-auto px-8 py-16">

        <h1 className="font-instrument text-[64px] text-[#22304A] text-center mb-4">
          {collection.replace(/-/g, " ")}
        </h1>

        <p className="text-center text-gray-600 mb-16">
          Explore our handcrafted luxury rug collection.
        </p>

        <div className="grid md:grid-cols-3 gap-10">

          {collectionProducts.map((product: any) => (
            <Link
              key={product.slug}
              href={`/rugs/${product.slug}`}
              className="group"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={800}
                className="w-full h-[500px] object-cover group-hover:opacity-90 transition"
              />

              <h2 className="font-instrument text-[34px] text-[#22304A] mt-6">
                {product.name}
              </h2>

              <p className="text-[#22304A] mt-2">
                {product.price}
              </p>
            </Link>
          ))}

        </div>

      </div>

    </main>
  );
}