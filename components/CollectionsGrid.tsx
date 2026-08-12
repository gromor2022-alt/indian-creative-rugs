import Image from "next/image";

const collections = [
  {
    name: "Persian",
    description:
      "Intricate motifs and rich heritage for sophisticated interiors.",
    image: "/images/collections/persian.jpg",
    link: "/collections/persian",
  },
  {
    name: "Modern",
    description:
      "Clean lines and contemporary patterns for today's homes.",
    image: "/images/collections/modern.jpg",
    link: "/collections/modern",
  },
  {
    name: "Heritage",
    description:
      "Classic craftsmanship celebrating traditional artistry.",
    image: "/images/collections/heritage.jpg",
    link: "/collections/heritage",
  },
  {
    name: "Vintage",
    description:
      "Bold shapes and structured designs with modern character.",
    image: "/images/collections/geometric.jpg",
    link: "/collections/vintage",
  },
  {
    name: "Hand Knotted",
    description:
      "Creative expressions that become statement pieces.",
    image: "/images/collections/abstract.jpg",
    link: "/collections/hand-knotted",
  },
];

export default function CollectionsGrid() {
  return (
    <section className="icr-collections bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="icr-collection-heading mb-12 text-center md:mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#234B36]">
            Explore Our Collections
          </p>

          <h2 className="mt-4 font-serif text-4xl text-[#234B36] md:text-6xl">
            Crafted for Every Style
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#5B6B5F]">
            Discover handcrafted rug collections thoughtfully designed to
            complement every interior, from timeless classics to contemporary
            living spaces.
          </p>
        </div>

        {/* Mobile swipe hint */}
        <div className="mb-3 flex items-center justify-end gap-2 text-[#234B36] md:hidden">
          <span className="text-[11px] font-medium uppercase tracking-[0.18em]">
            Swipe
          </span>

          <span
            aria-hidden="true"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-[#234B36]/30 text-lg leading-none"
          >
            →
          </span>
        </div>

        {/* Collections */}
        <div
          className="
            flex
            gap-5
            overflow-x-auto
            overscroll-x-contain
            pb-5
            snap-x
            snap-mandatory
            scrollbar-hide

            md:grid
            md:grid-cols-2
            md:gap-8
            md:overflow-visible
            md:pb-0
            md:snap-none

            xl:grid-cols-3
          "
        >
          {collections.map((collection, index) => (
            <a
              key={collection.name}
              href={collection.link}
              className="
                icr-collection-card
                group
                block
                flex-none
                w-[82vw]
                snap-start
                overflow-hidden
                rounded-3xl
                border
                border-[#E9E4DC]
                bg-white
                transition
                duration-500
                hover:-translate-y-2
                hover:shadow-2xl

                md:w-auto
              "
              style={
                {
                  "--icr-delay": `${index * 80}ms`,
                } as React.CSSProperties
              }
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden sm:h-80">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  sizes="
                    (max-width: 767px) 82vw,
                    (max-width: 1279px) 50vw,
                    33vw
                  "
                  className="
                    object-cover
                    transition
                    duration-700
                    group-hover:scale-105
                  "
                />
              </div>

              {/* Content */}
              <div className="p-7 md:p-8">
                <h3 className="font-serif text-3xl text-[#234B36]">
                  {collection.name}
                </h3>

                <p className="mt-4 leading-7 text-[#6B7280]">
                  {collection.description}
                </p>

                <div className="mt-7 font-medium text-[#234B36] transition group-hover:translate-x-1">
                  Discover Collection →
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* View All */}
        <div className="mt-12 text-center md:mt-16">
          <a
            href="/collections"
            className="
              inline-flex
              rounded-full
              bg-[#234B36]
              px-10
              py-4
              text-white
              transition
              hover:bg-[#1A3A2B]
            "
          >
            View All Collections
          </a>
        </div>
      </div>
    </section>
  );
}