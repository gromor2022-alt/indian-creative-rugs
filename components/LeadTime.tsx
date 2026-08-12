import Image from "next/image";
import Link from "next/link";

const deliveryOptions = [
  {
    title: "Ready To Ship",
    days: "01–03",
    label: "Days",
    description:
      "Browse our in-stock handcrafted rugs, carefully curated and ready for immediate dispatch worldwide.",
    image: "/images/collections/ready-to-ship.jpg",
    href: "/rugs",
    button: "Explore Ready To Ship",
  },
  {
    title: "Quick Ship",
    days: "28–35",
    label: "Days",
    description:
      "Choose from our made-to-order collection, handcrafted by master artisans and delivered within 28–35 days.",
    image: "/images/collections/custom-rugs.jpg",
    href: "/rugs",
    button: "Explore Quick Ship",
  },
];

export default function LeadTime() {
  return (
    <section className="bg-[#F7EADF] py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mb-10 text-center md:mb-16">
          <h2 className="font-instrument text-[46px] text-[#556B2F] md:text-[68px]">
            Choose Your Delivery Timeline
          </h2>

          <div className="my-6 flex justify-center">
            <div className="h-[2px] w-20 rounded-full bg-[#D4AF37]" />
          </div>

          <p className="mx-auto max-w-3xl text-lg leading-8 text-[#7B7468]">
            Whether you need a rug immediately or wish to commission a
            handcrafted masterpiece, we offer delivery options tailored to
            your project.
          </p>
        </div>

        {/* Mobile swipe hint */}
        <div className="mb-3 flex items-center justify-end gap-2 text-[#556B2F] md:hidden">
          <span className="text-[11px] font-medium uppercase tracking-[0.18em]">
            Swipe
          </span>

          <span
            aria-hidden="true"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-[#556B2F]/30 text-lg leading-none"
          >
            →
          </span>
        </div>

        {/* Delivery Cards */}
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

            lg:grid
            lg:grid-cols-2
            lg:gap-10
            lg:overflow-visible
            lg:pb-0
            lg:snap-none
          "
        >
          {deliveryOptions.map((item) => (
            <div
              key={item.title}
              className="
                group
                flex-none
                w-[86vw]
                snap-start
                overflow-hidden
                rounded-[30px]
                bg-white
                shadow-sm
                transition-all
                duration-500
                hover:shadow-2xl

                lg:w-auto
              "
            >
              {/* Image */}
              <div className="relative h-[360px] overflow-hidden sm:h-[420px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="
                    (max-width: 767px) 86vw,
                    (max-width: 1023px) 70vw,
                    50vw
                  "
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute bottom-8 left-8">
                  <h3 className="font-instrument text-4xl text-white">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-10">
                <div className="leading-none">
                  <span className="font-instrument text-[58px] text-[#556B2F] md:text-[68px]">
                    {item.days}
                  </span>

                  <div className="mt-2 text-sm uppercase tracking-[5px] text-[#B68A35]">
                    {item.label}
                  </div>
                </div>

                <p className="mt-7 leading-8 text-[#6B6B6B]">
                  {item.description}
                </p>

                <Link
                  href={item.href}
                  className="
                    mt-8
                    inline-flex
                    items-center
                    rounded-full
                    bg-[#556B2F]
                    px-7
                    py-4
                    font-medium
                    text-white
                    transition-all
                    duration-300
                    hover:bg-[#B68A35]

                    md:mt-10
                  "
                >
                  {item.button}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}