import { NextRequest, NextResponse } from "next/server";
import WooCommerce from "@/lib/woocommerce";

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email");

    if (!email) {
      return NextResponse.json({
        success: false,
        message: "Email is required.",
      });
    }

    const response = await WooCommerce.get("customers", {
      email,
    });

    const customer = response.data[0];

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