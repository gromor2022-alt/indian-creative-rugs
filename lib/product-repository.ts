import WooCommerce from "@/lib/woocommerce";

export interface ProductLookup {
  id: number;
  name: string;
  image: string;
  slug: string;
}

export async function getProductMap(): Promise<Map<number, ProductLookup>> {
  const response = await WooCommerce.get("products", {
    per_page: 100,
    status: "publish",
  });

  const map = new Map<number, ProductLookup>();

  response.data.forEach((product: any) => {
    map.set(product.id, {
      id: product.id,
      name: product.name,
      slug: product.slug,
      image:
        product.images?.[0]?.src ??
        "/images/persian/rugs1.jpg",
    });
  });

  return map;
}