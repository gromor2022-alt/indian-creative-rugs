import { NextRequest, NextResponse } from "next/server";
import WooCommerce from "@/lib/woocommerce";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      orderId,
      status,
      shipDate,
      carrier,
      trackingNumber,
    } = body;

    const meta_data = [];

    if (shipDate) {
      meta_data.push({
        key: "_icr_ship_date",
        value: shipDate,
      });
    }

    if (carrier) {
      meta_data.push({
        key: "_icr_carrier",
        value: carrier,
      });
    }

    if (trackingNumber) {
      meta_data.push({
        key: "_icr_tracking_number",
        value: trackingNumber,
      });
    }

    const payload: any = {};

    if (status) {
      payload.status = status;
    }

    if (meta_data.length > 0) {
      payload.meta_data = meta_data;
    }

    const response = await WooCommerce.put(
      `orders/${orderId}`,
      payload
    );
console.log("WooCommerce Response:", response.data);
    return NextResponse.json({
      success: true,
      order: response.data,
    });

  } catch (error: any) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );

  }
}