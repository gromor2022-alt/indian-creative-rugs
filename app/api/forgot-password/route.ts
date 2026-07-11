import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/mailer";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const admin = await prisma.admin.findUnique({
      where: {
        email,
      },
    });

    // Always return the same response
    if (!admin) {
      return NextResponse.json({
        message:
          "If an account exists for this email, a password reset link has been sent.",
      });
    }

    // Generate secure token
    const token = crypto.randomBytes(32).toString("hex");

    // Store only SHA256 hash
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const expiry = new Date(Date.now() + 30 * 60 * 1000);

    await prisma.admin.update({
      where: {
        id: admin.id,
      },
      data: {
        resetToken: hashedToken,
        resetTokenExpiry: expiry,
      },
    });

    const resetLink = `${process.env.APP_URL}/reset-password/${token}`;

    await sendPasswordResetEmail(email, resetLink);

    return NextResponse.json({
      message:
        "If an account exists for this email, a password reset link has been sent.",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}