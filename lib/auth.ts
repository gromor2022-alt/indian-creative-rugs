import { SignJWT, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET!);

export async function createSession(user: {
  id: number;
  name: string;
  email: string;
}) {
  return await new SignJWT({
    id: user.id,
    name: user.name,
    email: user.email,
    scope: "admin",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

/**
 * Verifies an ADMIN session token. Customer tokens are signed with the same
 * secret, so the scope check is what keeps a customer token from being
 * accepted as an admin session. Tokens without scope "admin" (including
 * admin tokens issued before this check existed) are rejected.
 */
export async function verifySession(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });

    if (payload.scope !== "admin") {
      return null;
    }

    return {
      id: payload.id as number,
      name: payload.name as string,
      email: payload.email as string,
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

export type CustomerSession = {
  customerId: number;
  email: string;
  name: string;
  scope: "customer";
};

export const CUSTOMER_SESSION_COOKIE = "customer_session";

/**
 * Server-side customer session for customer-facing API routes.
 *
 * Mints a signed JWT (jose HS256, same AUTH_SECRET) containing ONLY the
 * minimum customer identity — never the raw WooCommerce JWT. Bound to a
 * separate `customer_session` cookie (distinct from the admin `session`
 * cookie) and tagged with scope: "customer".
 */
export async function createCustomerSession(customer: {
  customerId: number;
  email: string;
  name: string;
}) {
  return await new SignJWT({
    customerId: customer.customerId,
    email: customer.email,
    name: customer.name,
    scope: "customer",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyCustomerSession(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);

    if (payload.scope !== "customer") {
      return null;
    }

    return payload as CustomerSession;
  } catch {
    return null;
  }
}

/**
 * Server-side customer authorization for customer-facing API routes.
 *
 * Reads the `customer_session` httpOnly cookie and validates it with
 * `verifyCustomerSession`. Returns a 401 response when the session is
 * missing or invalid so the caller can early-return WITHOUT parsing the
 * request body or touching WooCommerce.
 */
export async function requireCustomer(
  req: NextRequest
): Promise<
  | { ok: true; session: CustomerSession }
  | { ok: false; response: NextResponse }
> {
  const token = req.cookies.get(CUSTOMER_SESSION_COOKIE)?.value;

  if (!token) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      ),
    };
  }

  const session = await verifyCustomerSession(token);

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
