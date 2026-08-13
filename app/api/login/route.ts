import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";
import { logger } from "@/lib/logger";

export async function POST(req: Request) {
  try {
   const { email, password } = await req.json();

const admin = await prisma.admin.findUnique({
  where: {
    email,
  },
});

    if (!admin) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(
      password,
      admin.password
    );

    if (!valid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = await createSession({
  id: admin.id,
  name: admin.name,
  email: admin.email,
});

    const response = NextResponse.json({
      success: true,
    });

    response.cookies.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    logger.error("Admin login failed", error);

    return NextResponse.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}