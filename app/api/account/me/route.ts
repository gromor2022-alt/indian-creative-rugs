import { NextRequest, NextResponse } from "next/server";
import WooCommerce from "@/lib/woocommerce";
import { requireCustomer } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const auth = await requireCustomer(req);

    if (!auth.ok) {
      return auth.response;
    }

    const response = await WooCommerce.get(
      `customers/${auth.session.customerId}`
    );

    const customer = response.data;

    if (!customer) {
      return NextResponse.json({
        success: false,
        message: "Customer not found.",
      });
    }

    return NextResponse.json({
      success: true,
      customer,
    });

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
