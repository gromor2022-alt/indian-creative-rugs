import nodemailer from "nodemailer";
import { logger } from "./logger";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_NOREPLY_USER,
    pass: process.env.SMTP_NOREPLY_PASS,
  },
});

export async function sendPasswordResetEmail(
  email: string,
  resetLink: string
) {
  logger.debug("Sending password reset email");
  const info = await transporter.sendMail({
    from: `"Indian Creative Rugs" <${process.env.SMTP_NOREPLY_USER}>`,
    to: email,
    subject: "Reset your password",
    html: `
      <div style="max-width:600px;margin:auto;font-family:Arial,sans-serif;padding:30px;border:1px solid #e5e5e5;border-radius:12px">
        <h2 style="color:#2F4F2F;margin-bottom:10px;">Indian Creative Rugs</h2>

        <p>Hello,</p>

        <p>We received a request to reset your password.</p>

        <p style="margin:30px 0;">
          <a
            href="${resetLink}"
            style="
              background:#556B2F;
              color:white;
              padding:14px 24px;
              text-decoration:none;
              border-radius:8px;
              display:inline-block;
            "
          >
            Reset Password
          </a>
        </p>

        <p>This link will expire in <strong>30 minutes</strong>.</p>

        <p>If you didn't request this password reset, you can safely ignore this email.</p>

        <hr style="margin:30px 0;" />

        <p style="font-size:12px;color:#777;">
          Indian Creative Rugs ERP Lite<br/>
          Powered by AffiNexa AI Automations
        </p>
      </div>
    `,
  });
  logger.debug("Email sent:", info.messageId);
  logger.debug(info.response);
}