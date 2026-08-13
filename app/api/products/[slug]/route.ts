import WooCommerce from "@/lib/woocommerce";
import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  logger.debug("API SLUG =", slug);

  try {
    const response = await WooCommerce.get("products", {
      slug,
    });

return NextResponse.json(
  JSON.parse(JSON.stringify(response.data[0]))
);
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}