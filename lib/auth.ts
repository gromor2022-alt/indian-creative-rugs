import { SignJWT, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET!);

export async function createSession(user: {
  id: number;
  name: string;
  email: string;
}) {
  return await new SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifySession(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as {
      id: number;
      name: string;
      email: string;
    };
  } catch {
    return null;
  }
}

export type AdminSession = {
  id: number;
  name: string;
  email: string;
};

/**
 * Server-side admin authorization for dashboard API routes.
 *
 * Reads the existing admin `session` httpOnly cookie and validates it with
 * `verifySession`. Returns a 401 response when the session is missing or
 * invalid so the caller can early-return WITHOUT parsing the request body
 * or calling WooCommerce. This uses the admin session cookie only — never
 * the customer WooCommerce JWT/localStorage token.
 */
export async function requireAdmin(
  req: NextRequest
): Promise<
  | { ok: true; session: AdminSession }
  | { ok: false; response: NextResponse }
> {
  const token = req.cookies.get("session")?.value;

  if (!token) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      ),
    };
  }

  const session = await verifySession(token);

  if (!session) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      ),
    };
  }

  return { ok: true, session };
}
