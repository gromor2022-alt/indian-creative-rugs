import Link from "next/link";
import Image from "next/image";

const collections = [
  {
    name: "Persian",
    slug: "persian",
    image: "/images/collections/persian.jpg",
    description: "Timeless Persian masterpieces with intricate detailing.",
  },
  {
    name: "Heritage",
    slug: "heritage",
    image: "/images/collections/heritage.jpg",
    description: "Traditional craftsmanship inspired by generations.",
  },
  {
    name: "Vintage",
    slug: "vintage",
    image: "/images/collections/vintage.jpg",
    description: "Classic rugs with an elegant aged appearance.",
  },
  {
    name: "Modern",
    slug: "modern",
    image: "/images/collections/modern.jpg",
    description: "Contemporary designs for sophisticated interiors.",
  },
  {
    name: "Hand Knotted",
    slug: "hand-knotted",
    image: "/images/collections/hand-knotted.jpg",
    description: "Handcrafted luxury rugs woven by skilled artisans.",
  },
];

export default function CollectionsPage() {
  return (
    <main className="bg-[#F4F0E8] min-h-screen">

      {/* Hero */}
      <section className="py-24 text-center">
        <h1 className="font-instrument text-6xl md:text-7xl text-[#22304A]">
          Our Collections
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-gray-600 text-lg">
          Explore timeless craftsmanship across our carefully curated rug
          collections, where tradition meets contemporary luxury.
        </p>
      </section>

      {/* Cards */}
      <section className="max-w-7xl mx-auto px-8 pb-24">

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">

          {collections.map((collection) => (
            <Link
              key={collection.slug}
              href={`/collections/${collection.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition duration-500"
            >

              <div className="relative h-72 overflow-hidden">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-700"
                />
              </div>

              <div className="p-8">

                <h2 className="font-instrument text-4xl text-[#22304A]">
                  {collection.name}
                </h2>

                <p className="mt-4 text-gray-600 leading-relaxed">
                  {collection.description}
                </p>

                <div className="mt-8 flex items-center text-[#22304A] font-medium group-hover:translate-x-2 transition">
                  Explore Collection
                  <span className="ml-2">→</span>
                </div>

              </div>

            </Link>
          ))}

        </div>

      </section>

    </main>
  );
}