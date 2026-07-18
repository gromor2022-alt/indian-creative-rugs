import Image from "next/image";

const collections = [
  {
    name: "Tufted",
    description: "Soft vintage elegance inspired by timeless Anatolian designs.",
    image: "/images/collections/oushak.jpg",
    link: "/collections/tufted",
  },
  {
    name: "Persian",
    description: "Intricate motifs and rich heritage for sophisticated interiors.",
    image: "/images/collections/persian.jpg",
    link: "/collections/persian",
  },
  {
    name: "Modern",
    description: "Clean lines and contemporary patterns for today's homes.",
    image: "/images/collections/modern.jpg",
    link: "/collections/modern",
  },
  {
    name: "Heritage",
    description: "Classic craftsmanship celebrating traditional artistry.",
    image: "/images/collections/heritage.jpg",
    link: "/collections/heritage",
  },
  {
    name: "Vintage",
    description: "Bold shapes and structured designs with modern character.",
    image: "/images/collections/geometric.jpg",
    link: "/collections/vintage",
  },
  {
    name: "Hand Knotted",
    description: "Creative expressions that become statement pieces.",
    image: "/images/collections/abstract.jpg",
    link: "/collections/hand-knotted",
  },
];

export default function CollectionsGrid() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mb-16 text-center">

          <p className="uppercase tracking-[0.35em] text-[#234B36] text-sm font-semibold">
            Explore Our Collections
          </p>

          <h2 className="mt-4 font-serif text-4xl md:text-6xl text-[#234B36]">
            Crafted for Every Style
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#5B6B5F]">
            Discover handcrafted rug collections thoughtfully designed to
            complement every interior, from timeless classics to contemporary
            living spaces.
          </p>

        </div>

        {/* Grid */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {collections.map((collection) => (

            <a
              key={collection.name}
              href={collection.link}
              className="group overflow-hidden rounded-3xl border border-[#E9E4DC] bg-white transition duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >

              <div className="relative h-80 overflow-hidden">

                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

              </div>

              <div className="p-8">

                <h3 className="font-serif text-3xl text-[#234B36]">
                  {collection.name}
                </h3>

                <p className="mt-4 leading-7 text-[#6B7280]">
                  {collection.description}
                </p>

                <div className="mt-8 font-medium text-[#234B36] group-hover:translate-x-1 transition">
                  Discover Collection →
                </div>

              </div>

            </a>

          ))}

        </div>

        {/* Button */}

        <div className="mt-16 text-center">

          <a
            href="/collections"
            className="inline-flex rounded-full bg-[#234B36] px-10 py-4 text-white transition hover:bg-[#1A3A2B]"
          >
            View All Collections
          </a>

        </div>

      </div>
    </section>
  );
}