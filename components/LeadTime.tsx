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

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-16">

          <h2 className="font-instrument text-[46px] md:text-[68px] text-[#556B2F]">
            Choose Your Delivery Timeline
          </h2>

          <div className="flex justify-center my-6">
            <div className="w-20 h-[2px] bg-[#D4AF37] rounded-full"></div>
          </div>

          <p className="max-w-3xl mx-auto text-lg leading-8 text-[#7B7468]">
            Whether you need a rug immediately or wish to commission a handcrafted masterpiece,
            we offer delivery options tailored to your project.
          </p>

        </div>

        {/* Cards */}

        <div className="grid lg:grid-cols-2 gap-10">

          {deliveryOptions.map((item) => (

            <div
              key={item.title}
              className="group overflow-hidden rounded-[30px] bg-white shadow-sm hover:shadow-2xl transition-all duration-500"
            >

              <div className="relative h-[420px] overflow-hidden">

                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute bottom-8 left-8">

                  <h3 className="font-instrument text-4xl text-white">
                    {item.title}
                  </h3>

                </div>

              </div>

              <div className="p-10">

                <div className="leading-none">

                  <span className="font-instrument text-[68px] text-[#556B2F]">
                    {item.days}
                  </span>

                  <div className="uppercase tracking-[5px] text-sm text-[#B68A35] mt-2">
                    {item.label}
                  </div>

                </div>

                <p className="mt-8 text-[#6B6B6B] leading-8">
                  {item.description}
                </p>

                <Link
                  href={item.href}
                  className="inline-flex items-center mt-10 px-7 py-4 rounded-full bg-[#556B2F] text-white font-medium transition-all duration-300 hover:bg-[#B68A35]"
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