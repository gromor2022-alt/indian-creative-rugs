import { NextResponse } from "next/server";
import WooCommerce from "@/lib/woocommerce";
import {
  createCustomerSession,
  CUSTOMER_SESSION_COOKIE,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const wpResponse = await fetch(
      "https://backend.indiancreativerugs.com/wp-json/jwt-auth/v1/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password,
        }),
      }
    );

    const data = await wpResponse.json();

    if (!wpResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Invalid login credentials",
        },
        { status: 401 }
      );
    }

    // Step 2 - Resolve the authoritative WooCommerce customer by the
    // WP-validated email (proven pattern from /api/account/me & /api/orders).
    const customerResponse = await WooCommerce.get("customers", {
      email: data.user_email,
    });

    const customer = customerResponse.data?.[0];

    // No WooCommerce customer record -> do NOT mint a session. Generic
    // message avoids leaking that WP auth succeeded but WC has no customer.
    if (!customer) {
      return NextResponse.json(
        { success: false, message: "Unable to complete login." },
        { status: 401 }
      );
    }

    // Step 3 - Mint the httpOnly customer session cookie. The raw WC JWT is
    // never returned to the browser.
    const sessionToken = await createCustomerSession({
      customerId: customer.id,
      email: data.user_email,
      name: data.user_display_name,
    });

    const response = NextResponse.json({
      success: true,
      email: data.user_email,
      name: data.user_display_name,
      username: data.user_nicename,
    });

    response.cookies.set(CUSTOMER_SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}