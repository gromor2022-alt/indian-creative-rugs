import FAQItem from "../../components/FAQItem";

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-[#F4F0E8] min-h-screen">

      <section className="max-w-5xl mx-auto px-8 pt-24 pb-16 text-center">

        <p className="uppercase tracking-[4px] text-[#B89B5E] text-sm mb-4">
          Information
        </p>

        <h1 className="font-instrument text-4xl md:text-5xl text-[#22304A] mb-4">
          Privacy Policy
        </h1>

        <p className="text-base text-[#22304A]/70">
          We respect your privacy and are committed to protecting your information.
        </p>

      </section>

      <section className="max-w-4xl mx-auto px-8 pb-24">

        <FAQItem
          question="Information We Collect"
          answer={`We may collect your name, email address, phone number, shipping address and order details when you place an order or contact us.`}
        />

        <FAQItem
          question="How We Use Your Information"
          answer={`Your information is used solely to process orders, provide customer support, communicate order updates and improve our services.`}
        />

        <FAQItem
          question="Payment Security"
          answer={`Payment transactions are processed through secure payment providers. We do not store your payment card information on our servers.`}
        />

        <FAQItem
          question="Third-Party Services"
          answer={`We may use trusted third-party services for payment processing, shipping, analytics and customer communication.`}
        />

        <FAQItem
          question="Contact Information"
          answer={`If you have questions regarding our privacy practices, please contact Indian Creative Rugs directly through our Contact page.`}
        />

      </section>

    </main>
  );
}