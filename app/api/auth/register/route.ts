import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    const username = email.split("@")[0];

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WP_API_URL}/wp-json/wc/v3/customers`,
      {
        method: "POST",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
            ).toString("base64"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          first_name: name,
          username,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        message: data.message || "Unable to create account.",
      });
    }

    return NextResponse.json({
      success: true,
      customer: data,
    });
  } catch (err: any) {
  console.error("REGISTER ERROR:", err);

  return NextResponse.json({
    success: false,
    message: err?.message || "Server Error",
  });
}
}