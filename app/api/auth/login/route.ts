import { NextResponse } from "next/server";

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

    return NextResponse.json({
  success: true,
  token: data.token,

  email: data.user_email,

  name: data.user_display_name,

  username: data.user_nicename,
});

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