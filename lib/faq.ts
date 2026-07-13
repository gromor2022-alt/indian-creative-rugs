export interface FAQItem {
  question: string;
  answer: string;
}

export function faqSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export const rugFAQs: FAQItem[] = [
  {
    question: "What is an Oushak Rug?",
    answer:
      "An Oushak rug is a traditional handmade rug inspired by Turkish craftsmanship, known for its elegant floral patterns, soft colors and luxurious appearance.",
  },
  {
    question: "Do you export handmade rugs internationally?",
    answer:
      "Yes. Indian Creative Rugs exports premium handmade rugs to customers, interior designers, retailers and hospitality projects worldwide.",
  },
  {
    question: "Can I order a custom size rug?",
    answer:
      "Yes. Custom sizes, colors and designs are available for residential and commercial projects.",
  },
  {
    question: "What materials are used in your rugs?",
    answer:
      "Our rugs are crafted using premium wool, silk, cotton and blended natural fibers depending on the collection.",
  },
  {
    question: "How do I maintain a handmade rug?",
    answer:
      "Regular vacuuming, occasional professional cleaning and avoiding prolonged direct sunlight will help preserve the beauty and longevity of your handmade rug.",
  },
];