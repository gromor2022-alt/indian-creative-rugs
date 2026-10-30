import type { Metadata } from "next";
import FAQItem from "../../components/FAQItem";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "Returns and Exchanges Policy",
  description:
    "Review the 7-day return and exchange policy for ready-to-ship rugs, including return shipping, unused-item requirements and custom-order exclusions.",
  url: "/returns-policy",
});

export default function ReturnsPolicyPage() {
  return (
    <main className="bg-[#F4F0E8] min-h-screen">
      <section className="max-w-5xl mx-auto px-8 pt-24 pb-16 text-center">
        <p className="uppercase tracking-[4px] text-[#B89B5E] text-sm mb-4">
          Information
        </p>

        <h1 className="font-instrument text-4xl md:text-5xl text-[#22304A] mb-4">
          Returns &amp; Exchanges
        </h1>

        <p className="text-base text-[#22304A]/70">
          Please review the terms below before requesting a return or exchange.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-8 pb-24">
        <FAQItem
          question="Returns for Ready-to-Ship Rugs"
          answer={`Eligible ready-to-ship rugs may be returned within 7 days of delivery. You must contact us within this 7-day period and receive instructions before sending a rug back.

Returned rugs must be unused. We may ask for details or photographs to review the request before authorising the return.`}
        />

        <FAQItem
          question="Return Shipping Costs"
          answer={`The buyer is responsible for the cost of shipping the rug back to us. Please contact us before arranging return shipping so we can provide the next steps.`}
        />

        <FAQItem
          question="Refunds and Exchanges"
          answer={`We do not offer cash refunds. Any return approved under this policy will be handled through an exchange rather than a cash refund.

Exchange requests are discussed and reviewed on a case-by-case basis. Please contact us with your order details and the rug you would like to exchange for before sending anything back.`}
        />

        <FAQItem
          question="Custom-Made and Made-to-Order Rugs"
          answer={`Custom-made, made-to-order and personalised rugs are not eligible for return. These rugs are created to the customer's specific requirements.`}
        />

        <FAQItem
          question="Damaged Shipments"
          answer={`If your rug arrives damaged, please contact us within 48 hours of delivery and provide photographs of the packaging and product. We will review the issue and assist you with the next steps.`}
        />

        <FAQItem
          question="Cancellation Policy"
          answer={`Orders may be cancelled before production or shipment begins.

Once production has started on a custom or made-to-order rug, cancellation requests may not be accepted. If you need to cancel an order, contact us as soon as possible.`}
        />
      </section>
    </main>
  );
}
