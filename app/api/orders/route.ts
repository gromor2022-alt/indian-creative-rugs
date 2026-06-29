import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization");

    if (!token) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userResponse = await fetch(
      `${process.env.NEXT_PUBLIC_WP_API_URL}/wp-json/wp/v2/users/me`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    const user = await userResponse.json();

    return NextResponse.json({
      success: true,
      user,
    });

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}