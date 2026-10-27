import WooCommerce from "@/lib/woocommerce";
import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import {
  activeSalePercent,
  getRegularPrice,
  getSalePrice,
} from "@/lib/pricing";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Read the sale once so every line in this order uses the same percent.
    const salePercent = activeSalePercent();

    if (!body.email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required.",
        },
        { status: 400 }
      );
    }

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Cart is empty.",
        },
        { status: 400 }
      );
    }

    /*
     * Find existing WooCommerce customer
     */
    
    /*
     * Build validated line items
     */
    const lineItems = body.items.map((item: any) => {
      const productId = Number(item.productId);
      const quantity = Number(item.quantity);

      if (!productId || !quantity || quantity < 1) {
        throw new Error("Invalid product or quantity.");
      }

      const shape = String(item.shape || "");
      const size = String(item.size || "");

      /*
       * IMPORTANT:
       * Price is calculated again on the server.
       * We do NOT trust the browser price.
       */
      const regularPrice = getRegularPrice(shape, size);
      const unitPrice = getSalePrice(shape, size);

      if (unitPrice === null || regularPrice === null) {
        throw new Error(
          `Invalid size/shape combination: ${shape} / ${size}`
        );
      }

      // Work in cents so totals like 149.25 × 3 stay exact.
      const lineTotal = (Math.round(unitPrice * 100) * quantity) / 100;

      return {
        product_id: productId,
        quantity,

        /*
         * WooCommerce line-item pricing
         */
        subtotal: lineTotal.toFixed(2),
        total: lineTotal.toFixed(2),

        /*
         * Store selected rug configuration
         */
        meta_data: [
          {
            key: "Size",
            value: size,
          },
          {
            key: "Shape",
            value: shape,
          },
          {
            key: "Custom Unit Price",
            value: unitPrice.toFixed(2),
          },
          ...(salePercent > 0
            ? [
                {
                  key: "Regular Unit Price",
                  value: regularPrice.toFixed(2),
                },
                {
                  key: "Sale",
                  value: `${salePercent}% off`,
                },
              ]
            : []),
        ],
      };
    });

    /*
     * Create WooCommerce order
     */
    const order = {
      customer_id: 0,

      payment_method: "ppcp-gateway",
      payment_method_title: "PayPal",
      set_paid: false,

      billing: {
        first_name: body.firstName,
        last_name: body.lastName,
        email: body.email,
        phone: body.phone,
        address_1: body.address,
        city: body.city,
        state: body.state,
        postcode: body.zipCode,
        country: body.country || "US",
      },

      shipping: {
        first_name: body.firstName,
        last_name: body.lastName,
        address_1: body.address,
        city: body.city,
        state: body.state,
        postcode: body.zipCode,
        country: body.country || "US",
      },

      line_items: lineItems,
    };

    const response = await WooCommerce.post(
      "orders",
      order
    );

    const orderId = response.data.id;

    const paymentUrl =
      `${process.env.NEXT_PUBLIC_WORDPRESS_URL}` +
      `/checkout/order-pay/${orderId}/?pay_for_order=true&key=${response.data.order_key}`;

    logger.debug("ORDER ID:", orderId);
    logger.debug("ORDER TOTAL:", response.data.total);

    return NextResponse.json({
      success: true,
      orderId,
      orderTotal: response.data.total,
      paymentUrl,
    });
  } catch (error: any) {
    logger.error("Order creation failed", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error?.response?.data?.message ||
          error?.message ||
          "Order creation failed",
      },
      { status: 500 }
    );
  }
}