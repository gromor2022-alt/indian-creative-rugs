import WooCommerce from "@/lib/woocommerce";
import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

const rectanglePrices: Record<string, number> = {
  "2x3": 199,
  "3x5": 399,
  "4x6": 499,
  "5x7": 599,
  "5x8": 799,
  "6x9": 899,
  "8x10": 1249,
  "8x11": 1349,
  "9x12": 1699,
  "10x13": 1799,
  "10x14": 1899,
  "12x15": 2499,
  "12x18": 2999,
};

const squarePrices: Record<string, number> = {
  "5x5": 499,
  "6x6": 699,
  "7x7": 849,
  "8x8": 999,
  "9x9": 1199,
  "10x10": 1499,
  "11x11": 1699,
  "12x12": 1999,
};

const runnerPrices: Record<string, number> = {
  "2.5x6": 399,
  "2.5x7": 449,
  "2.5x8": 499,
  "2.5x9": 549,
  "2.5x10": 599,
  "2.5x11": 649,
  "2.5x12": 699,
};

function getValidPrice(
  shape: string,
  size: string
): number | null {
  if (shape === "Rectangle") {
    return rectanglePrices[size] ?? null;
  }

  if (shape === "Square") {
    return squarePrices[size] ?? null;
  }

  if (shape === "Runner") {
    return runnerPrices[size] ?? null;
  }

  return null;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

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
      const unitPrice = getValidPrice(shape, size);

      if (unitPrice === null) {
        throw new Error(
          `Invalid size/shape combination: ${shape} / ${size}`
        );
      }

      const lineTotal = unitPrice * quantity;

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