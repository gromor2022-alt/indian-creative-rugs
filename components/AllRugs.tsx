import Image from "next/image";
import Link from "next/link";

const collections = [
  {
    title: "Heritage",
    image: "/images/collections/heritage-rugs.jpg",
    href: "/rugs",
  },
  {
    title: "Oushak",
    image: "/images/collections/oushak-rugs.jpg",
    href: "/rugs",
  },
  {
    title: "Contemporary",
    image: "/images/collections/contemporary-rugs.jpg",
    href: "/rugs",
  },
  {
    title: "Modern",
    image: "/images/collections/modern-rugs.jpg",
    href: "/rugs",
  },
  {
    title: "Custom Rugs",
    image: "/images/collections/custom-rugs.jpg",
    href: "/rugs",
  },
  {
    title: "Ready To Ship",
    image: "/images/collections/ready-to-ship.jpg",
    href: "/rugs",
  },
];

export default function AllRugs() {
  return (
    <section className="bg-[#F7EADF] py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <h2 className="font-instrument text-[46px] md:text-[68px] text-[#556B2F]">
            Our Collections
          </h2>

          <div className="flex justify-center my-6">
            <div className="w-20 h-[2px] bg-[#D4AF37] rounded-full"></div>
          </div>

          <p className="max-w-3xl mx-auto text-[#7B7468] text-lg leading-8">
            Explore handcrafted collections inspired by timeless traditions,
            contemporary interiors, and bespoke craftsmanship from Bhadohi.
          </p>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {collections.map((collection) => (

            <Link
              key={collection.title}
              href={collection.href}
              className="group"
            >

              <div className="relative overflow-hidden rounded-[30px]">

                <Image
                  src={collection.image}
                  alt={collection.title}
                  width={900}
                  height={700}
                  className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                <div className="absolute bottom-8 left-8">

                  <h3 className="font-instrument text-4xl text-white transition duration-300 group-hover:text-[#F3D27A]">
                    {collection.title}
                  </h3>

                  <p className="mt-2 text-sm tracking-[3px] uppercase text-[#F5F2EB]">
                    Explore Collection
                  </p>

                </div>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </section>
  );
}