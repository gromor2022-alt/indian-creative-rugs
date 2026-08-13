import { NextRequest, NextResponse } from "next/server";
import WooCommerce from "@/lib/woocommerce";
import { logger } from "@/lib/logger";
import { requireAdmin } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.ok) {
    return auth.response;
  }

  try {
    const body = await req.json();

    const {
      orderId,
      status,
      shipDate,
      carrier,
      trackingNumber,
      pickupDate,
      buyerNote,
      refundStatus,
      refundReason,
      refundRequestedAt,
    } = body;

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: "Order ID is required." },
        { status: 400 }
      );
    }

    const meta_data: { key: string; value: string }[] = [];

    const addMeta = (key: string, value: unknown) => {
      if (value !== undefined && value !== null && String(value).trim() !== "") {
        meta_data.push({ key, value: String(value) });
      }
    };

    addMeta("_icr_ship_date", shipDate);
    addMeta("_icr_carrier", carrier);
    addMeta("_icr_tracking_number", trackingNumber);
    addMeta("_icr_pickup_date", pickupDate);
    addMeta("_icr_buyer_note", buyerNote);
    addMeta("_icr_refund_status", refundStatus);
    addMeta("_icr_refund_reason", refundReason);
    addMeta("_icr_refund_requested_at", refundRequestedAt);

    const payload: any = {};

    if (status) {
      payload.status = status;
    }

    if (meta_data.length > 0) {
      payload.meta_data = meta_data;
    }

    // Keep the buyer message attached to the WooCommerce order as a customer note.
    // This does not create a second email system; the existing WooCommerce email setup remains untouched.
    if (buyerNote) {
      payload.customer_note = String(buyerNote);
    }

    const response = await WooCommerce.put(`orders/${orderId}`, payload);

    return NextResponse.json({
      success: true,
      order: response.data,
    });
  } catch (error: any) {
    logger.error("Order update failed", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to update order.",
      },
      { status: 500 }
    );
  }
}
