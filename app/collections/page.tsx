import Link from "next/link";

const collections = [
  {
    name: "Persian",
    slug: "persian",
  },
  {
    name: "Heritage",
    slug: "heritage",
  },
  {
    name: "Vintage",
    slug: "vintage",
  },
  {
    name: "Modern",
    slug: "modern",
  },
  {
    name: "Hand Knotted",
    slug: "hand-knotted",
  },
];

export default function CollectionsPage() {
  return (
    <main className="bg-[#F4F0E8] min-h-screen">

      <div className="max-w-7xl mx-auto px-8 py-20">

        <h1 className="font-instrument text-[72px] text-center text-[#22304A] mb-6">
          Collections
        </h1>

        <p className="text-center text-gray-600 mb-20">
          Discover our curated luxury rug collections.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

          {collections.map((collection) => (
            <Link
              key={collection.slug}
              href={`/collections/${collection.slug}`}
              className="bg-white p-12 hover:shadow-xl transition"
            >
              <h2 className="font-instrument text-[42px] text-[#22304A]">
                {collection.name}
              </h2>

              <p className="mt-4 text-gray-600">
                Explore Collection →
              </p>
            </Link>
          ))}

        </div>

      </div>

    </main>
  );
}