import WooCommerce from "@/lib/woocommerce";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await WooCommerce.get("products", {
      per_page: 100,
    });

    const products = response.data.map((product: any) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image:
        product.images?.[0]?.src ||
        "/images/persian/rugs1.jpg",
      category:
        product.categories?.[0]?.name || "Uncategorized",
    }));

    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}