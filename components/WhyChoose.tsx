import Image from "next/image";

const features = [
  {
    title: "Handcrafted by Master Artisans",
    text: "Every rug is meticulously woven by skilled artisans from Bhadohi, preserving techniques perfected over generations.",
  },
  {
    title: "Premium Natural Materials",
    text: "We use carefully selected wool, silk and premium fibres to ensure exceptional beauty, comfort and durability.",
  },
  {
    title: "Custom Made for Your Space",
    text: "From bespoke sizes to personalised colours, every rug can be crafted to complement your interior perfectly.",
  },
  {
    title: "Worldwide Delivery",
    text: "Safely delivered across the globe with careful packaging and dedicated customer support from order to delivery.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-[#F7EADF] py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT IMAGE */}

          <div className="overflow-hidden rounded-[30px]">

            <Image
              src="/images/collections/story-rugs.jpg"
              alt="Indian Creative Rugs"
              width={900}
              height={900}
              className="w-full h-[700px] object-cover transition duration-700 hover:scale-105"
            />

          </div>

          {/* RIGHT CONTENT */}

          <div>

            <h2 className="font-instrument text-[46px] md:text-[64px] text-[#556B2F]">
              Why Choose
              <br />
              Indian Creative Rugs
            </h2>

            <div className="w-20 h-[2px] bg-[#D4AF37] rounded-full my-6"></div>

            <p className="text-lg leading-8 text-[#7B7468] mb-12">
              Every rug we create is a reflection of generations of craftsmanship,
              uncompromising quality, and a passion for timeless design.
            </p>

            <div className="space-y-10">

              {features.map((item) => (

                <div key={item.title}>

                  <h3 className="font-instrument text-[30px] text-[#556B2F]">
                    {item.title}
                  </h3>

                  <p className="mt-3 leading-8 text-[#6B6B6B]">
                    {item.text}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}