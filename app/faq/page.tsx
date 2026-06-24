import FAQItem from "../../components/FAQItem";

export default function FAQPage() {
  return (
    <main className="bg-[#F4F0E8] min-h-screen">

      {/* Hero */}

      <section className="max-w-5xl mx-auto px-8 pt-24 pb-16 text-center">

        <p className="uppercase tracking-[4px] text-[#B89B5E] text-sm mb-4">
          Support
        </p>

        <h1 className="font-instrument text-4xl md:text-5xl text-[#22304A] mb-4">
          Frequently Asked Questions
        </h1>

        <p className="text-base text-[#22304A]/70">
          Everything you need to know about our rugs,
          customization, shipping and care.
        </p>

      </section>

      {/* FAQ */}

      <section className="max-w-4xl mx-auto px-8 pb-24">

        <FAQItem
          question="Rug Care Guide"
          answer={`All rugs are professionally cleaned and arrive ready for use.

• Vacuum using suction only (no beater bars)

• Rotate every 6–12 months

• Blot spills immediately with a dry cloth

• Use mild soap and water for stains

• Avoid harsh chemicals

• Professional cleaning recommended`}
        />

        <FAQItem
          question="Custom & Personalized Orders"
          answer={`We create bespoke rugs tailored to your vision.

• Any size and shape available

• Choose colors and designs

• CAD/mockup shared before production

• Production time: 20–40 days

• Progress updates provided

Custom rugs are non-returnable as they are made specifically for you.`}
        />

        <FAQItem
          question="Sizing Details"
          answer={`All sizes are measured edge-to-edge excluding fringes.

Handmade rugs may vary slightly by 1–3 inches, which is part of their unique character.

Contact us if you require exact dimensions.`}
        />

        <FAQItem
          question="Gift Wrapping & Packaging"
          answer={`All rugs are packed securely using multiple protective layers.

Gift wrapping is available upon request.

Custom gift messages and special packaging can also be arranged.`}
        />

        <FAQItem
          question="Wholesale Availability"
          answer={`We welcome retailers, interior designers and resellers worldwide.

• Bulk order discounts available

• Custom production available

• Private label opportunities

Contact us directly for wholesale pricing and collaboration opportunities.`}
        />

      </section>

    </main>
  );
}