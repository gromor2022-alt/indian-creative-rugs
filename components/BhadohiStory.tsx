import Image from "next/image";

export default function BhadohiStory() {
  return (
    <section className="py-32 bg-[#F4F0E8]">

      <div className="max-w-7xl mx-auto px-8">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Image */}

          <div className="overflow-hidden">

            <Image
              src="/images/bhadohi.jpg"
              alt="Artisan Weaving Rug"
              width={1000}
              height={1000}
              className="w-full h-[700px] object-center"
            />

          </div>

          {/* Content */}

          <div>

            <p className="uppercase tracking-[6px] text-[#B89B5E] text-sm mb-6">
              Handcrafted In Bhadohi
            </p>

            <h2 className="font-instrument text-[64px] leading-[1] text-[#22304A] mb-8">
              Where Tradition Meets Timeless Design
            </h2>

            <p className="text-lg text-gray-700 leading-9 mb-8">
              For over four decades, Indian Creative Rugs has been creating
              handmade rugs that combine traditional craftsmanship with
              contemporary design.
            </p>

            <p className="text-lg text-gray-700 leading-9 mb-10">
              Every piece is woven by skilled artisans in Bhadohi, India's
              carpet capital, preserving techniques passed down through
              generations while creating rugs for modern interiors around
              the world.
            </p>

            <div className="flex items-center gap-8">

              <div>
                <h3 className="font-instrument text-[48px] text-[#22304A]">
                  40+
                </h3>

                <p className="text-gray-600">
                  Years Of Experience
                </p>
              </div>

              <div>
                <h3 className="font-instrument text-[48px] text-[#22304A]">
                  10000+
                </h3>

                <p className="text-gray-600">
                  Rugs Crafted
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}