import FAQItem from "../../components/FAQItem";

export default function ReturnsPolicyPage() {
  return (
    <main className="bg-[#F4F0E8] min-h-screen">

      <section className="max-w-5xl mx-auto px-8 pt-24 pb-16 text-center">

        <p className="uppercase tracking-[4px] text-[#B89B5E] text-sm mb-4">
          Information
        </p>

        <h1 className="font-instrument text-4xl md:text-5xl text-[#22304A] mb-4">
          Returns & Exchanges
        </h1>

        <p className="text-base text-[#22304A]/70">
          Please review our return, exchange and cancellation policies.
        </p>

      </section>

      <section className="max-w-4xl mx-auto px-8 pb-24">

        <FAQItem
          question="Cancellation Policy"
          answer={`Orders may be cancelled before production or shipment begins.

Once production has started on custom rugs, cancellation requests may not be accepted.`}
        />

        <FAQItem
          question="Returns Policy"
          answer={`Ready-to-ship rugs may be eligible for return subject to approval and product condition.

Customers must contact us immediately upon receiving the product if there is any concern.`}
        />

        <FAQItem
          question="Exchange Policy"
          answer={`Exchange requests are reviewed on a case-by-case basis.

Products must be unused and in original condition.`}
        />

        <FAQItem
          question="Custom & Personalized Rugs"
          answer={`Custom-made and personalized rugs are non-returnable and non-exchangeable because they are produced specifically according to customer requirements.`}
        />

        <FAQItem
          question="Damaged Shipments"
          answer={`If your rug arrives damaged, please contact us within 48 hours and provide photographs of the packaging and product so we can assist you promptly.`}
        />

      </section>

    </main>
  );
}