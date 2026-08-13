import { NextRequest, NextResponse } from "next/server";
import WooCommerce from "@/lib/woocommerce";
import { getProductMap } from "@/lib/product-repository";
import { transformOrder } from "@/lib/order-transformer";
import { logger } from "@/lib/logger";

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email");

    if (!email) {
      return NextResponse.json({
        success: false,
        message: "Email is required.",
      });
    }

    // Fetch customer
    const customerResponse = await WooCommerce.get("customers", {
      email,
    });

    const customer = customerResponse.data[0];

    if (!customer) {
      return NextResponse.json({
        success: true,
        orders: [],
      });
    }

    // Fetch orders & products in parallel
    const [ordersResponse, productMap] = await Promise.all([
      WooCommerce.get("orders", {
        customer: customer.id,
        per_page: 100,
      }),
      getProductMap(),
    ]);

    const orders = ordersResponse.data.map((order: any) =>
      transformOrder(order, productMap)
    );

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error: any) {
    logger.error("Fetch customer orders failed", error);

    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}