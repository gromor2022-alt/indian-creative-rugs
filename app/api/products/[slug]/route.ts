import WooCommerce from "@/lib/woocommerce";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const response = await WooCommerce.get("products", {
      slug,
    });

    return NextResponse.json(response.data[0]);
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}