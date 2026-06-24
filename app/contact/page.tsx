export default function ContactPage() {
  return (
    <main className="bg-[#F4F0E8] min-h-screen">
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-16">

        {/* Header */}

        <div className="text-center mb-14">
          <p className="uppercase tracking-[4px] text-[#B89B5E] text-sm mb-3">
            Get In Touch
          </p>

          <h1 className="font-instrument text-4xl md:text-5xl text-[#22304A] mb-4">
            Let's Create Something Beautiful
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            Whether you're sourcing custom rugs, furnishing luxury interiors
            or exploring trade partnerships, we'd love to hear from you.
          </p>
        </div>

        {/* Content */}

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Contact Form */}

          <div className="bg-white p-8 rounded-2xl shadow-sm">

            <h2 className="font-instrument text-3xl text-[#22304A] mb-6">
              Send An Inquiry
            </h2>

            <form className="space-y-5">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#0F766E]"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#0F766E]"
              />

              <input
                type="text"
                placeholder="Phone Number"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#0F766E]"
              />

              <textarea
                rows={6}
                placeholder="Tell us about your requirement..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#0F766E]"
              />

              <button
                type="submit"
                className="bg-[#22304A] hover:bg-[#0F766E] text-white px-8 py-3 rounded-lg transition"
              >
                Send Inquiry
              </button>

            </form>

          </div>

          {/* Contact Information */}

          <div>

            <h2 className="font-instrument text-3xl text-[#22304A] mb-6">
              Contact Information
            </h2>

            <div className="space-y-5">

              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <p className="text-sm uppercase tracking-[3px] text-[#B89B5E] mb-2">
                  Email
                </p>

                <a
                  href="mailto:info@indiancreativerugs.com"
                  className="text-lg text-[#22304A] hover:text-[#0F766E]"
                >
                  info@indiancreativerugs.com
                </a>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <p className="text-sm uppercase tracking-[3px] text-[#B89B5E] mb-2">
                  Phone
                </p>

                <a
                  href="tel:+91XXXXXXXXXX"
                  className="text-lg text-[#22304A] hover:text-[#0F766E]"
                >
                  +91 XXXXX XXXXX
                </a>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <p className="text-sm uppercase tracking-[3px] text-[#B89B5E] mb-2">
                  Location
                </p>

                <p className="text-lg text-[#22304A]">
                  Bhadohi, Uttar Pradesh, India
                </p>
              </div>

              <a
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition"
              >
                WhatsApp Us
              </a>

              <div className="bg-white p-6 rounded-2xl shadow-sm mt-6">
                <p className="text-gray-600 leading-7">
                  Handmade rugs crafted in Bhadohi by skilled artisans and
                  exported worldwide for luxury interiors, hospitality
                  projects and custom design requirements.
                </p>

                <p className="mt-4 text-[#22304A] font-medium">
                  Serving Interior Designers, Architects, Hospitality Projects
                  and Luxury Homes Worldwide.
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>
    </main>
  );
}