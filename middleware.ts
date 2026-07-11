import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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
  matcher: ["/dashboard/:path*", "/login"],
};