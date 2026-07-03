import WooCommerce from "@/lib/woocommerce";

export async function getFeaturedProducts() {
  const response = await WooCommerce.get("products", {
    featured: true,
    per_page: 10,
    status: "publish",
  });

  return response.data;
}