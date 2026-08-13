import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect dashboard API routes (defense-in-depth; route handlers also
  // enforce admin authorization via requireAdmin). Returns a 401 JSON
  // response so API callers are not redirected to an HTML login page.
  if (pathname.startsWith("/api/dashboard")) {
    const token = request.cookies.get("session")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const session = await verifySession(token);

    if (!session) {
      const response = NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );

      response.cookies.delete("session");

      return response;
    }
  }

  // Protect dashboard routes
  if (pathname.startsWith("/dashboard")) {
    const token = request.cookies.get("session")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const session = await verifySession(token);

    if (!session) {
      const response = NextResponse.redirect(
        new URL("/login", request.url)
      );

      response.cookies.delete("session");

      return response;
    }
  }

  // Prevent logged-in users from visiting /login again
  if (pathname === "/login") {
    const token = request.cookies.get("session")?.value;

    if (token) {
      const session = await verifySession(token);

      if (session) {
        return NextResponse.redirect(
          new URL("/dashboard", request.url)
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/dashboard/:path*", "/login"],
};
