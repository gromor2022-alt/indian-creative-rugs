import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Please fill all required fields." },
        { status: 400 }
      );
    }

    // 📩 Email to Indian Creative Rugs

    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: "hello@indiancreativerugs.com",
      subject: `New Contact Form Submission - ${subject || "Website Inquiry"}`,
      html: `
        <h2>New Contact Form Submission</h2>

        <p><strong>Name:</strong> ${name}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Phone:</strong> ${phone || "-"}</p>

        <p><strong>Subject:</strong> ${subject || "-"}</p>

        <hr/>

        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    // 📩 Auto Reply to Customer

    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: email,
      subject: "Thank you for contacting Indian Creative Rugs",
      html: `
        <h2>Dear ${name},</h2>

        <p>
          Thank you for contacting
          <strong>Indian Creative Rugs.</strong>
        </p>

        <p>
          We have received your enquiry and our team
          will get back to you within one business day.
        </p>

        <p>
          We truly appreciate your interest in our handcrafted rugs.
        </p>

        <br/>

        <p>
          Warm Regards,
          <br/>
          <strong>Indian Creative Rugs</strong>
        </p>
      `,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to send email.",
      },
      { status: 500 }
    );
  }
}