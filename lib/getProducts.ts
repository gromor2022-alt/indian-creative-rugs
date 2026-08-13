import WooCommerce from "@/lib/woocommerce";
import { logger } from "./logger";

export async function getProducts() {
  try {
    const response = await WooCommerce.get("products", {
      per_page: 100,
      status: "publish",
    });

    return response.data.map((product: any) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price || "",
      image:
        product.images?.[0]?.src || "/images/persian/rugs1.jpg",
      images: product.images || [],
      collection: product.categories?.[0]?.name || "Luxury Rugs",

collections:
  product.categories?.map((cat: any) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
  })) || [],
    }));
  } catch (error) {
    logger.error("WooCommerce Error", error);
    return [];
  }
}