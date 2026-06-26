import WooCommerce from "@/lib/woocommerce";

export async function getProducts() {
  const response = await WooCommerce.get("products", {
    per_page: 100,
  });

  return response.data.map((product: any) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    image:
      product.images?.[0]?.src ||
      "/images/persian/rugs1.jpg",
    collection:
      product.categories?.[0]?.name || "Luxury Rugs",
  }));
}