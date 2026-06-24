import Image from "next/image";
import Link from "next/link";

const collections = [
  {
    name: "Persian",
    image: "/images/persian/rugs1.jpg",
    slug: "persian",
  },
  {
    name: "Vintage",
    image: "/images/vintage/rugs1.jpg",
    slug: "vintage",
  },
  {
    name: "Modern",
    image: "/images/modern/rugs1.jpg",
    slug: "modern",
  },
  {
    name: "Heritage",
    image: "/images/heritage/rugs1.jpg",
    slug: "heritage",
  },
];

export default function Collections() {
  return (
    <section className="py-32 bg-[#F4F0E8]">

      <div className="max-w-7xl mx-auto px-8">

        <h2 className="font-instrument text-[64px] text-[#22304A] text-center mb-6">
          Shop By Collection
        </h2>

        <p className="text-center text-xl text-gray-600 mb-20">
          Discover timeless styles crafted for every interior.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {collections.map((collection) => (

            <Link
              key={collection.slug}
              href={`/rugs?collection=${collection.slug}`}
              className="group"
            >

              <div className="relative overflow-hidden">

                <Image
                  src={collection.image}
                  alt={collection.name}
                  width={600}
                  height={800}
                  className="w-full h-[420px] object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition" />

                <div className="absolute inset-0 flex items-center justify-center">

                  <h3 className="font-instrument text-white text-[48px]">
                    {collection.name}
                  </h3>

                </div>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </section>
  );
}