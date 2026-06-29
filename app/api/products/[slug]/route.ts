import WooCommerce from "@/lib/woocommerce";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  console.log("API SLUG =", slug);

  try {
    const response = await WooCommerce.get("products", {
      slug,
    });

    console.log(response.data[0]);

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