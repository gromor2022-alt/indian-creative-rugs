const SITE_URL = "https://indiancreativerugs.com";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",

    name: "Indian Creative Rugs",

    url: SITE_URL,

    logo: `${SITE_URL}/logo.png`,

    image: `${SITE_URL}/og-image.jpg`,

    description:
      "Indian Creative Rugs is a premium manufacturer and exporter of handmade luxury rugs from India, specializing in Persian, Oushak, Moroccan, Vintage, Modern and Custom rugs.",

    email: "info@indiancreativerugs.com",

    brand: "Indian Creative Rugs",

    areaServed: "Worldwide",

    knowsAbout: [
      "Handmade Rugs",
      "Luxury Rugs",
      "Hand Knotted Rugs",
      "Oushak Rugs",
      "Persian Rugs",
      "Moroccan Rugs",
      "Vintage Rugs",
      "Custom Rugs",
    ],

    sameAs: [
      "https://facebook.com/",
      "https://instagram.com/",
      "https://linkedin.com/",
      "https://pinterest.com/",
    ],
  };
}
export function productSchema(product: any) {
  return {
    "@context": "https://schema.org",

    "@type": "Product",

    name: product.name,

    image: product.images?.map((img: any) => img.src),

    description:
      product.short_description?.replace(/<[^>]*>/g, "") ||
      "",

    sku: product.sku,

    brand: {
      "@type": "Brand",
      name: "Indian Creative Rugs",
    },

    offers: {
      "@type": "Offer",

      price: product.price,

      priceCurrency: "USD",

      availability:
        product.stock_quantity > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",

      url: `${SITE_URL}/rugs/${product.slug}`,
    },
  };
}