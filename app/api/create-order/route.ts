import WooCommerce from "@/lib/woocommerce";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const customerResponse = await WooCommerce.get("customers", {
  email: body.email,
});
const customer = customerResponse.data[0];


    const order = {
     customer_id: customer ? Number(customer.id) : 0,  
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

      line_items: body.items.map((item: any) => ({
        product_id: Number(item.productId),
        quantity: Number(item.quantity),
      })),
    };

    const response = await WooCommerce.post(
      "orders",
      order
    );

    const orderId = response.data.id;

    const paymentUrl =
      `${process.env.NEXT_PUBLIC_WORDPRESS_URL}` +
      `/checkout/order-pay/${orderId}/?pay_for_order=true&key=${response.data.order_key}`;
   
   console.log("ORDER ID:", orderId);
   console.log("ORDER KEY:", response.data.order_key);
   console.log("PAYMENT URL:", paymentUrl);

    return NextResponse.json({
      success: true,
      orderId,
      paymentUrl,
    });
  } catch (error: any) {
    console.error("ORDER ERROR:", error?.response?.data || error);

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