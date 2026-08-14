import { NextRequest, NextResponse } from "next/server";
import WooCommerce from "@/lib/woocommerce";
import { getProductMap } from "@/lib/product-repository";
import { transformOrder } from "@/lib/order-transformer";
import { logger } from "@/lib/logger";
import { requireCustomer } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const auth = await requireCustomer(req);

    if (!auth.ok) {
      return auth.response;
    }

    // Fetch orders & products in parallel
    const [ordersResponse, productMap] = await Promise.all([
      WooCommerce.get("orders", {
        customer: auth.session.customerId,
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
